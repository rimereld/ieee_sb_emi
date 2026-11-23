import { ArrowRight, Mail } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ClubLayout } from "@/components/ClubShell"
import { MotionItem, MotionReveal } from "@/components/MotionReveal"

// Official sponsors. To show a real logo, put the file in public/assets/sponsors/
// and set `logo` (e.g. "/assets/sponsors/onivo.png"); add `url` for their website.
const officialSponsors: { name: string; logo?: string; url?: string; since: string }[] = [
  { name: "Onivo Imprimerie", logo: "/assets/sponsors/onivo.png", since: "2026–2027" },
]

// What a sponsor's support goes into: the branch's four missions for the year.
const supports = [
  { title: "Technical workshops", text: "Microcontrollers, hardware hacking, radio and machine learning, all year long." },
  { title: "NASA Space Apps", text: "Teams turning a challenge into a working prototype in 48 hours." },
  { title: "Hult Prize", text: "Students turning a prototype into a social venture and a pitch." },
  { title: "Research paper", text: "From literature review to a conference submission." },
]

function SponsorMark({ name, logo }: { name: string; logo?: string }) {
  if (logo) return <img src={logo} alt={name} className="h-auto w-full max-w-[440px] object-contain" />
  return <span className="font-display text-5xl font-extrabold uppercase tracking-tight text-ieee-navy md:text-6xl">{name}</span>
}

export default function Sponsors() {
  return <ClubLayout><main className="pt-28">
    {/* Intro */}
    <section className="on-brand brand-band tech-grid border-b border-border/70"><div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
      <MotionReveal><MotionItem>
        <p className="mb-5 font-display text-xs font-bold uppercase tracking-[0.18em] text-white">Sponsors</p>
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <h1 className="text-5xl leading-[1.02] md:col-span-7 md:text-7xl">The partners who help us <span className="shine-type text-shine">shine.</span></h1>
          <p className="max-w-lg leading-7 text-muted-foreground md:col-span-5">Our sponsors make the year’s missions possible: the workshops, the hackathon, the venture and the research. Thank you for believing in what students can build.</p>
        </div>
      </MotionItem></MotionReveal>
    </div></section>

    {/* Official sponsor */}
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28"><MotionReveal>
      <MotionItem><p className="mb-4 text-center font-display text-xs font-bold uppercase tracking-[0.2em] text-ieee-teal">Official sponsor · 2026–2027</p></MotionItem>
      {officialSponsors.map((s) => (
        <MotionItem key={s.name}>
          <article className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-primary/25 bg-card p-10 text-center shadow-lg md:p-14">
            <div aria-hidden="true" className="flare-line absolute inset-x-0 top-0" />
            <div className="flex min-h-[120px] items-center justify-center"><SponsorMark name={s.name} logo={s.logo} /></div>
            <p className="mx-auto mt-6 max-w-xl leading-7 text-muted-foreground">{s.name} is the official sponsor of the IEEE Student Branch at Ecole Mohammadia d’Ingénieurs for the {s.since} season.</p>
            {s.url && <a href={s.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-primary hover:text-ieee-navy">Visit {s.name} <ArrowRight size={15} /></a>}
          </article>
        </MotionItem>
      ))}
    </MotionReveal></section>

    {/* What support goes into */}
    <section className="border-y border-border bg-muted py-20 md:py-28"><div className="mx-auto max-w-6xl px-5 md:px-8"><MotionReveal>
      <MotionItem><div className="grid gap-6 md:grid-cols-12 md:items-end"><div className="md:col-span-7"><p className="mb-4 font-display text-xs font-bold uppercase tracking-[0.18em] text-ieee-teal">Where your support goes</p><h2 className="text-4xl leading-tight md:text-5xl">One year. Four missions.</h2></div><p className="leading-7 text-muted-foreground md:col-span-5">Sponsorship funds the branch’s 2026–2027 program, from first workshop to final paper.</p></div></MotionItem>
      <MotionItem><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {supports.map((s, i) => <div key={s.title} className="rounded-lg border border-border bg-card p-6 shadow-sm"><p className="font-display text-sm font-bold text-ieee-teal">0{i + 1}</p><h3 className="mt-2 text-xl">{s.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{s.text}</p></div>)}
      </div></MotionItem>
      <MotionItem><Link to="/projects" className="mt-8 inline-flex items-center gap-2 font-display text-sm font-semibold text-primary hover:text-ieee-navy">See the missions in detail <ArrowRight size={15} /></Link></MotionItem>
    </MotionReveal></div></section>

    {/* Become a sponsor */}
    <section className="on-brand brand-band py-20 md:py-24"><MotionReveal className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 md:flex-row md:items-center md:px-8">
      <MotionItem><p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white">Become a sponsor</p><h2 className="mt-3 text-3xl md:text-4xl">Want to help the next idea shine?</h2><p className="mt-3 max-w-xl text-muted-foreground">Talk to our sponsoring cell about partnering with the branch this year.</p></MotionItem>
      <MotionItem><div className="flex flex-wrap items-center gap-4"><Button asChild size="lg"><Link to="/contact">Contact us <ArrowRight size={16} /></Link></Button><a href="mailto:contact@ieee-emi.com" className="inline-flex items-center gap-2 font-display text-sm font-semibold text-white hover:opacity-80"><Mail size={16} />contact@ieee-emi.com</a></div></MotionItem>
    </MotionReveal></section>
  </main></ClubLayout>
}
