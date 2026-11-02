import { useState, type FormEvent } from "react"
import { ArrowRight, CheckCircle2, CircuitBoard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ClubLayout } from "@/components/ClubShell"
import { MotionItem, MotionReveal } from "@/components/MotionReveal"
import { supabase } from "@/lib/supabase"

const fieldClass = "mt-2 w-full border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20"

export default function Join() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
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
    const { error } = await supabase.from("join_applications").insert({
      id: crypto.randomUUID(),
      full_name: String(values.get("full_name") || "").trim(),
      email: String(values.get("email") || "").trim(),
      phone: String(values.get("phone") || "").trim() || null,
      department: String(values.get("department") || "").trim() || null,
      study_year: String(values.get("study_year") || "").trim() || null,
      interests: String(values.get("interests") || "").trim() || null,
      motivation: String(values.get("motivation") || "").trim() || null,
    })
    if (error) {
      setStatus("error")
      setErrorMessage("We couldn’t send your application just now. Please try again.")
      return
    }
    form.reset()
    setStatus("success")
  }

  return <ClubLayout><main className="pt-28">
    <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-12 md:gap-16 md:px-8 md:py-24">
      <MotionReveal className="md:col-span-5"><MotionItem><p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Join IEEE Student Branch EMI</p><h1 className="text-5xl leading-tight md:text-6xl">There’s a place for your next idea.</h1><p className="mt-6 leading-7 text-muted-foreground">Tell us a little about yourself and what you’d like to explore. You don’t need to have a finished project or a perfect plan to get started.</p></MotionItem><MotionItem><div className="mt-10 border-y border-border"><div className="flex gap-4 border-b border-border py-5"><CircuitBoard className="mt-1 text-primary" size={19} /><div><h2 className="font-display text-lg">Bring your curiosity</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">Share the topics, questions, or skills you want to develop.</p></div></div><div className="flex gap-4 py-5"><CheckCircle2 className="mt-1 text-primary" size={19} /><div><h2 className="font-display text-lg">Start where you are</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">Beginners and experienced makers are both welcome to reach out.</p></div></div></div></MotionItem></MotionReveal>
      <MotionReveal className="md:col-span-7"><MotionItem><form onSubmit={submitApplication} className="border-y border-border py-8 md:px-8">
        <h2 className="font-display text-2xl">Your application</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Fields marked with * are required.</p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-medium">Full name *<input className={fieldClass} name="full_name" autoComplete="name" required maxLength={120} /></label>
          <label className="text-sm font-medium">Email address *<input className={fieldClass} name="email" type="email" autoComplete="email" required maxLength={254} /></label>
          <label className="text-sm font-medium">Phone (optional)<input className={fieldClass} name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
          <label className="text-sm font-medium">Department or program<input className={fieldClass} name="department" maxLength={120} /></label>
          <label className="text-sm font-medium sm:col-span-2">Year of study<input className={fieldClass} name="study_year" maxLength={60} /></label>
          <label className="text-sm font-medium sm:col-span-2">What are you interested in?<textarea className={`${fieldClass} min-h-24 resize-y`} name="interests" maxLength={1000} /></label>
          <label className="text-sm font-medium sm:col-span-2">What would you like to explore with the club?<textarea className={`${fieldClass} min-h-28 resize-y`} name="motivation" maxLength={2000} /></label>
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-4"><Button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send application"}<ArrowRight size={16} /></Button><p className="text-xs text-muted-foreground">Your details are shared with the club team for follow-up.</p></div>
        {status === "success" && <p role="status" className="mt-5 border-l-2 border-primary pl-4 text-sm text-primary">Thanks for reaching out. Your application has been received.</p>}
        {status === "error" && <p role="alert" className="mt-5 border-l-2 border-destructive pl-4 text-sm text-destructive">{errorMessage}</p>}
      </form></MotionItem></MotionReveal>
    </section>
  </main></ClubLayout>
}
