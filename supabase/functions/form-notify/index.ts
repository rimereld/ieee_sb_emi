// form-notify: emails each new Join / Contact form entry to the branch inbox.
//
// Called by a database trigger with {table, id}. It never trusts the caller's
// data: it loads the row itself with the service role and atomically claims it
// (notified_at IS NULL -> now()), so each entry is emailed at most once and
// random calls to this public URL can't send anything new.
//
// Secrets (Supabase → Edge Functions → Secrets):
//   RESEND_API_KEY  required — from resend.com
//   MAIL_FROM       optional — e.g. "IEEE EMI Website <website@ieee-emi.com>" once the domain is verified in Resend
//   NOTIFY_TO       optional — defaults to contact@ieee-emi.com
// Deployed with verify_jwt = false (the trigger calls it without a user session).
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const TO = Deno.env.get("NOTIFY_TO") ?? "contact@ieee-emi.com";
const FROM = Deno.env.get("MAIL_FROM") ?? "IEEE EMI Website <onboarding@resend.dev>";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const TABLES = {
  join_applications: {
    label: "New membership application",
    fields: [
      ["full_name", "Full name"], ["email", "Email"], ["phone", "Phone"],
      ["department", "Department / program"], ["study_year", "Year of study"],
      ["interests", "Interests"], ["motivation", "What they want to explore"],
    ],
  },
  contact_messages: {
    label: "New contact message",
    fields: [["full_name", "Name"], ["email", "Email"], ["subject", "Subject"], ["message", "Message"]],
  },
} as const;

type TableName = keyof typeof TABLES;

const esc = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method !== "POST") return json(405, { error: "method not allowed" });

  let payload: { table?: string; id?: string };
  try {
    payload = await req.json();
  } catch {
    return json(400, { error: "invalid json" });
  }
  const table = payload.table as TableName;
  const id = payload.id;
  if (!table || !(table in TABLES) || !id || !/^[0-9a-f-]{36}$/i.test(id)) {
    return json(400, { error: "invalid table or id" });
  }
  if (!RESEND_API_KEY) return json(500, { error: "RESEND_API_KEY is not set" });

  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  // Claim the row: only the first call for an un-notified entry gets it back.
  const { data: row, error: claimError } = await db
    .from(table)
    .update({ notified_at: new Date().toISOString() })
    .eq("id", id)
    .is("notified_at", null)
    .select()
    .maybeSingle();
  if (claimError) return json(500, { error: claimError.message });
  if (!row) return json(200, { skipped: "already notified or not found" });

  const cfg = TABLES[table];
  const name = row.full_name || "Someone";
  const subject = table === "contact_messages"
    ? `Website message from ${name}${row.subject ? `: ${row.subject}` : ""}`
    : `New member application: ${name}`;

  const rows = cfg.fields
    .filter(([key]) => row[key])
    .map(([key, label]) =>
      `<tr><td style="padding:8px 12px;color:#4a6274;font-weight:600;vertical-align:top;white-space:nowrap">${esc(label)}</td>` +
      `<td style="padding:8px 12px;color:#0a2c45;white-space:pre-wrap">${esc(row[key])}</td></tr>`)
    .join("");

  const html = `<div style="font-family:Inter,Arial,sans-serif;max-width:600px">
  <div style="background:linear-gradient(135deg,#0197B2,#00679F 55%,#013D5F);color:#fff;padding:20px 24px;border-radius:8px 8px 0 0">
    <div style="font-size:12px;letter-spacing:.15em;text-transform:uppercase;opacity:.85">IEEE EMI Student Branch</div>
    <div style="font-size:20px;font-weight:800;margin-top:4px">${esc(cfg.label)}</div>
  </div>
  <table style="width:100%;border-collapse:collapse;border:1px solid #d5e3ec;border-top:0">${rows}</table>
  <p style="color:#4a6274;font-size:12px;margin-top:12px">Sent from the website form on ${esc(new Date(row.created_at).toUTCString())}. Reply to this email to answer ${esc(name)} directly.</p>
</div>`;

  const text = cfg.fields.filter(([k]) => row[k]).map(([k, label]) => `${label}: ${row[k]}`).join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [TO], reply_to: row.email, subject, html, text }),
  });

  if (!res.ok) {
    const detail = await res.text();
    // Release the claim so the entry can be retried.
    await db.from(table).update({ notified_at: null }).eq("id", id);
    console.error("resend error", res.status, detail);
    return json(502, { error: "email failed", status: res.status, detail });
  }
  return json(200, { sent: true });
});
