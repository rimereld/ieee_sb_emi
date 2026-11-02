import { useState, type FormEvent } from "react"
import { ArrowRight, Mail, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ClubLayout } from "@/components/ClubShell"
import { MotionItem, MotionReveal } from "@/components/MotionReveal"
import { supabase } from "@/lib/supabase"

const fieldClass = "mt-2 w-full border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20"

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const values = new FormData(form)
    setStatus("sending")
    setErrorMessage("")
    if (!supabase) {
      setStatus("error")
      setErrorMessage("The form isn’t connected yet. Please try again later.")
      return
    }
    const { error } = await supabase.from("contact_messages").insert({
      id: crypto.randomUUID(),
      full_name: String(values.get("full_name") || "").trim(),
      email: String(values.get("email") || "").trim(),
      subject: String(values.get("subject") || "").trim() || null,
      message: String(values.get("message") || "").trim(),
    })
    if (error) {
      setStatus("error")
      setErrorMessage("We couldn’t send your message just now. Please try again.")
      return
    }
    form.reset()
    setStatus("success")
  }

  return <ClubLayout><main className="pt-28">
    <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-12 md:gap-16 md:px-8 md:py-24">
      <MotionReveal className="md:col-span-5"><MotionItem><p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Contact the branch</p><h1 className="text-5xl leading-tight md:text-6xl">Have a question? Start here.</h1><p className="mt-6 leading-7 text-muted-foreground">Ask about the club, a project, or how to get involved. Leave us a message and the branch team can follow up.</p></MotionItem><MotionItem><div className="mt-10 space-y-0 border-y border-border"><div className="flex items-center gap-4 border-b border-border py-5"><Mail className="text-primary" size={19} /><div><p className="font-medium">Send a message</p><p className="mt-1 text-sm text-muted-foreground">Use the form and include the best email to reach you.</p></div></div><div className="flex items-center gap-4 py-5"><Radio className="text-primary" size={19} /><div><p className="font-medium">IEEE Student Branch EMI</p><p className="mt-1 text-sm text-muted-foreground">A student community for engineering ideas.</p></div></div></div></MotionItem></MotionReveal>
      <MotionReveal className="md:col-span-7"><MotionItem><form onSubmit={submitMessage} className="border-y border-border py-8 md:px-8">
        <h2 className="font-display text-2xl">Write to us</h2><p className="mt-2 text-sm text-muted-foreground">Fields marked with * are required.</p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-medium">Your name *<input className={fieldClass} name="full_name" autoComplete="name" required maxLength={120} /></label>
          <label className="text-sm font-medium">Email address *<input className={fieldClass} name="email" type="email" autoComplete="email" required maxLength={254} /></label>
          <label className="text-sm font-medium sm:col-span-2">Subject<input className={fieldClass} name="subject" maxLength={160} /></label>
          <label className="text-sm font-medium sm:col-span-2">Message *<textarea className={`${fieldClass} min-h-40 resize-y`} name="message" required maxLength={4000} /></label>
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-4"><Button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message"}<ArrowRight size={16} /></Button><p className="text-xs text-muted-foreground">We’ll use your email only to respond to your message.</p></div>
        {status === "success" && <p role="status" className="mt-5 border-l-2 border-primary pl-4 text-sm text-primary">Your message has been received. Thank you for reaching out.</p>}
        {status === "error" && <p role="alert" className="mt-5 border-l-2 border-destructive pl-4 text-sm text-destructive">{errorMessage}</p>}
      </form></MotionItem></MotionReveal>
    </section>
  </main></ClubLayout>
}
