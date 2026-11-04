import { ArrowRight, ArrowUpRight, Cpu, FileText, Instagram, Lightbulb, Rocket, Satellite, type LucideIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ClubLayout } from "@/components/ClubShell"
import { MotionItem, MotionReveal } from "@/components/MotionReveal"
import { Spark } from "@/components/Spark"

type Mission = {
  id: string
  number: string
  verb: string
  title: string
  period: string
  tagline: string
  icon: LucideIcon
}

const missions: Mission[] = [
  { id: "learn", number: "01", verb: "Learn", title: "Technical workshops", period: "All year", tagline: "Get the hard skills it takes to start.", icon: Cpu },
  { id: "build", number: "02", verb: "Build", title: "NASA Space Apps", period: "Oct – Nov 2026", tagline: "Turn a challenge into a working prototype.", icon: Satellite },
  { id: "launch", number: "03", verb: "Launch", title: "Hult Prize", period: "Dec 2026 – Sep 2027", tagline: "Turn the prototype into a venture.", icon: Rocket },
  { id: "publish", number: "04", verb: "Publish", title: "Research paper", period: "Oct 2026 – Jun 2027", tagline: "Turn the work into scientific knowledge.", icon: FileText },
]

const workshops = [
  { title: "Microcontrollers", text: "Program real hardware, from blinking LEDs to sensors." },
  { title: "Hardware hacking", text: "Open it up, probe it, understand how it works." },
  { title: "Radio amateur", text: "Antennas, signals and talking across the air." },
  { title: "Machine learning", text: "Teach small models to run on small devices." },
]

const spaceApps = [
  { date: "Oct 3", step: "Choose our challenges" },
  { date: "Oct 5–10", step: "Organize teams and plan" },
  { date: "Oct 11–27", step: "Build the core prototype" },
  { date: "Nov 8", step: "Prototype v1 tested" },
  { date: "Nov 14–15", step: "Hackathon", highlight: true },
]

const hult = ["Real-world problem", "Business model + UN Sustainable Development Goal", "Pitch + venture"]

const research = [
  { month: "Oct", step: "Topic, authors, literature review" },
  { month: "Dec", step: "Conference selection, experiments, data" },
  { month: "Jan", step: "Complete first draft" },
  { month: "Mar", step: "Target submission" },
  { month: "Jun", step: "Camera-ready target" },
]

function MissionHeader({ mission, onBrand = false }: { mission: Mission; onBrand?: boolean }) {
  const Icon = mission.icon
  return (
    <div className="grid gap-6 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8">
        <p className={`mb-4 flex items-center gap-3 font-display text-xs font-bold uppercase tracking-[0.18em] ${onBrand ? "text-white" : "text-ieee-teal"}`}>
          <span className={`flex h-9 w-9 items-center justify-center rounded-md ${onBrand ? "bg-white text-ieee-blue" : "bg-ieee-navy text-white"}`}><Icon size={18} /></span>
          Mission {mission.number} · {mission.verb} <span className={onBrand ? "text-white/70" : "text-muted-foreground"}>/ {mission.period}</span>
        </p>
        <h2 className="text-4xl leading-tight md:text-6xl">{mission.title}</h2>
      </div>
      <p className="text-lg leading-8 text-muted-foreground md:col-span-4">{mission.tagline}</p>
    </div>
  )
}

export default function Projects() {
  const [learn, build, launch, publish] = missions
  return <ClubLayout><main className="pt-28">
    {/* Intro */}
    <section className="on-brand brand-band tech-grid border-b border-border/70"><div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
      <MotionReveal><MotionItem><p className="mb-5 font-display text-xs font-bold uppercase tracking-[0.18em] text-white">Mission 2026–2027</p><div className="grid gap-8 md:grid-cols-12 md:items-end"><h1 className="text-5xl leading-[1.02] md:col-span-7 md:text-7xl">One year. <span className="shine-type text-shine">Four missions.</span></h1><p className="max-w-lg leading-7 text-muted-foreground md:col-span-5">Learn the skills, build a prototype, turn it into a venture, and publish what we discover. Here’s what the branch is working on this year.</p></div></MotionItem>
        <MotionItem><div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{missions.map((m) => { const Icon = m.icon; return <a key={m.id} href={`#${m.id}`} className="group rounded-lg border border-white/20 bg-white p-5 text-ieee-navy shadow-lg transition-transform hover:-translate-y-1"><div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-md bg-ieee-navy text-white"><Icon size={20} /></span><ArrowRight size={16} className="text-ieee-teal transition-transform group-hover:translate-x-1" /></div><p className="mt-5 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-ieee-teal">{m.number} · {m.verb}</p><h3 className="mt-1 text-xl text-ieee-navy">{m.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{m.tagline}</p></a> })}</div></MotionItem>
      </MotionReveal>
    </div></section>

    {/* 01 Learn */}
    <section id="learn" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28"><MotionReveal>
      <MotionItem><MissionHeader mission={learn} /></MotionItem>
      <MotionItem><div className="mt-12 grid gap-4 md:grid-cols-3">
        {workshops.map((w, i) => <div key={w.title} className="rounded-lg border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/50"><p className="font-display text-sm font-bold text-ieee-teal">0{i + 1}</p><h3 className="mt-2 text-xl">{w.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{w.text}</p></div>)}
        <div className="flex flex-col justify-between rounded-lg bg-ieee-navy p-6 text-white shadow-md md:col-span-2"><div><p className="font-display text-sm font-bold text-ieee-shine">+</p><h3 className="mt-2 text-xl text-white">And more…</h3><p className="mt-2 text-sm leading-6 text-white/80">Tell us what you want to learn next.</p></div><Link to="/contact" className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-white hover:text-ieee-shine">Suggest a workshop <ArrowUpRight size={15} /></Link></div>
      </div></MotionItem>
    </MotionReveal></section>

    {/* 02 Build */}
    <section id="build" className="scroll-mt-24 border-y border-border bg-muted py-20 md:py-28"><div className="mx-auto max-w-6xl px-5 md:px-8"><MotionReveal>
      <MotionItem><MissionHeader mission={build} /></MotionItem>
      <MotionItem><ol className="mt-12 grid gap-3">
        {spaceApps.map((s) => <li key={s.date} className={`grid grid-cols-[110px_1fr] items-center gap-4 rounded-lg px-5 py-4 md:grid-cols-[160px_1fr] ${s.highlight ? "bg-ieee-navy text-white shadow-glow" : "bg-card shadow-sm"}`}><span className={`font-display text-base font-extrabold ${s.highlight ? "text-ieee-shine" : "text-ieee-teal"}`}>{s.date}</span><span className={s.highlight ? "shine-type text-lg text-white" : "text-base"}>{s.step}</span></li>)}
      </ol></MotionItem>
      <MotionItem><p className="mt-8 font-display text-lg font-bold text-ieee-blue">Arrive with something we can demonstrate.</p><p className="mt-2 text-xs text-muted-foreground">Dates are plan targets; the NASA submission cutoff is to be confirmed.</p></MotionItem>
    </MotionReveal></div></section>

    {/* 03 Launch */}
    <section id="launch" className="relative scroll-mt-24 on-brand brand-band py-20 md:py-28"><Spark id="projects-launch" className="bottom-14 right-[8%]" /><div className="mx-auto max-w-6xl px-5 md:px-8"><MotionReveal>
      <MotionItem><MissionHeader mission={launch} onBrand /></MotionItem>
      <MotionItem><p className="mt-10 font-display text-2xl font-extrabold text-white md:text-3xl">A prototype is a beginning.</p></MotionItem>
      <MotionItem><div className="mt-8 grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {hult.map((step, i) => <div key={step} className="contents"><div className="rounded-lg bg-white p-6 text-ieee-navy shadow-lg"><p className="font-display text-3xl font-extrabold text-ieee-teal">{i + 1}</p><p className="mt-3 font-display text-lg font-bold">{step}</p></div>{i < hult.length - 1 && <div className="hidden items-center justify-center text-white md:flex"><ArrowRight size={26} /></div>}</div>)}
      </div></MotionItem>
      <MotionItem><p className="mt-8 font-display text-lg font-bold text-white">Internal target: pitch deck + 4-minute pitch video by January 15.</p></MotionItem>
    </MotionReveal></div></section>

    {/* 04 Publish */}
    <section id="publish" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28"><MotionReveal>
      <MotionItem><MissionHeader mission={publish} /></MotionItem>
      <MotionItem><p className="mt-10 font-display text-2xl font-extrabold md:text-3xl">Become researchers.</p></MotionItem>
      <MotionItem><div className="relative mt-8"><div aria-hidden="true" className="flare-line absolute left-0 right-0 top-7 hidden md:block" /><ol className="relative grid gap-4 md:grid-cols-5">
        {research.map((r) => <li key={r.month} className="rounded-lg border border-border bg-card p-5 shadow-sm"><p className="shine-type text-3xl text-ieee-teal">{r.month}</p><p className="mt-3 text-sm leading-6">{r.step}</p></li>)}
      </ol></div></MotionItem>
      <MotionItem><p className="mt-6 text-xs text-muted-foreground">March 1 is a placeholder until the conference is chosen.</p></MotionItem>
    </MotionReveal></section>

    {/* Your turn */}
    <section className="border-y border-border bg-secondary py-20 md:py-28"><div className="mx-auto max-w-6xl px-5 md:px-8"><MotionReveal>
      <MotionItem><p className="mb-4 font-display text-xs font-bold uppercase tracking-[0.18em] text-ieee-teal">Your turn</p><h2 className="max-w-3xl text-4xl leading-tight md:text-5xl">You have one idea. What do you do?</h2></MotionItem>
      <MotionItem><div className="mt-10 grid gap-4 md:grid-cols-3">
        {[["A", "Build it", "NASA Space Apps", "#build"], ["B", "Launch it", "Hult Prize", "#launch"], ["C", "Prove it", "Research paper", "#publish"]].map(([letter, verb, mission, href]) => <a key={letter} href={href} className="group rounded-lg bg-card p-7 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"><p className="font-display text-6xl font-extrabold text-ieee-teal">{letter}</p><p className="mt-4 font-display text-2xl font-extrabold uppercase">{verb}</p><p className="mt-1 inline-flex items-center gap-2 font-display font-semibold text-ieee-blue">{mission} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></p></a>)}
      </div></MotionItem>
    </MotionReveal></div></section>

    {/* Join */}
    <section className="mx-auto grid max-w-6xl gap-8 px-5 py-24 md:grid-cols-12 md:items-center md:px-8 md:py-28"><MotionReveal className="md:col-span-8"><MotionItem><p className="mb-4 flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-ieee-teal"><Lightbulb size={15} /> From idea to impact</p><h2 className="text-4xl md:text-5xl">Join the crew.</h2><p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">Build something real. Explore its potential. Contribute to knowledge. The most valuable thing we build might be a team.</p></MotionItem></MotionReveal><MotionReveal className="md:col-span-4 md:justify-self-end"><MotionItem><div className="flex flex-col items-start gap-4"><Button asChild size="lg"><Link to="/join">Apply to join <ArrowRight size={16} /></Link></Button><a href="https://www.instagram.com/ieeesbemi/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-display text-sm font-semibold text-ieee-blue hover:text-ieee-navy"><Instagram size={17} /> @ieeesbemi</a></div></MotionItem></MotionReveal></section>
  </main></ClubLayout>
}
