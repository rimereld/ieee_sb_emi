import { useRef, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion"

/**
 * ScrollStory — the cinematic opening of the home page.
 *
 * A tall section whose inner screen stays pinned while you scroll:
 *   1. "One year. Three missions." — a star sits on the light streak and
 *      slides down as you scroll ("scroll to follow the light").
 *   2. The title dissolves with a ghost-trail echo and "Three opportunities."
 *      rises in: the star now hangs under the title and casts two beams onto
 *      the three mission cards, with the all-year workshops pill below.
 * A thin progress line at the top fills as you go.
 *
 * With prefers-reduced-motion, both screens are simply shown one after the other.
 */

const missions = [
  { n: 1, verb: "Build", title: "NASA Space Apps", text: "Turn a challenge into a working prototype.", href: "/projects#build" },
  { n: 2, verb: "Launch", title: "Hult Prize", text: "Turn the prototype into a venture.", href: "/projects#launch" },
  { n: 3, verb: "Publish", title: "Research paper", text: "Turn the work into scientific knowledge.", href: "/projects#publish" },
]

/* ── Ghost-trail echo: faded copies of the text that spread out while it moves ── */
function EchoCopy({ children, spread, index, direction }: { children: ReactNode; spread: MotionValue<number>; index: number; direction: 1 | -1 }) {
  const y = useTransform(spread, (v) => v * (index + 1) * 16 * direction)
  const opacity = useTransform(spread, (v) => v * (0.42 - index * 0.11))
  return <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none" style={{ y, opacity }}>{children}</motion.div>
}

function Echo({ children, spread, direction }: { children: ReactNode; spread: MotionValue<number>; direction: 1 | -1 }) {
  return (
    <div className="relative">
      {[0, 1, 2].map((i) => <EchoCopy key={i} index={i} spread={spread} direction={direction}>{children}</EchoCopy>)}
      <div className="relative">{children}</div>
    </div>
  )
}

/* ── The star: white core, flare streaks and a halo ── */
function Star({ size = "lg" }: { size?: "lg" | "md" }) {
  return (
    <span className={`story-star ${size === "md" ? "story-star--md" : ""}`} aria-hidden="true">
      <span className="story-star__halo" />
      <span className="story-star__streak" />
      <span className="story-star__streak story-star__streak--tilt" />
      <span className="story-star__core" />
    </span>
  )
}

/* ── Screen 1 ── */
function ScreenOne({ titleTag: Title = "h1" }: { titleTag?: "h1" | "h2" }) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center px-5 text-center">
      <p className="flex items-center gap-3 font-display text-[10px] font-bold uppercase tracking-[0.3em] text-ieee-shine/90 md:text-xs">
        <span className="h-px w-8 bg-ieee-shine/50" />Mission 2026–2027<span className="h-px w-8 bg-ieee-shine/50" />
      </p>
      <Title className="story-title mt-5 text-[clamp(2.6rem,7.4vw,6.4rem)] uppercase leading-[0.95]">
        One year.<br />Three missions.
      </Title>
    </div>
  )
}

function Slogan() {
  return <p className="relative font-display text-xs font-bold uppercase tracking-[0.42em] text-white md:text-base">Let’s give it a shine</p>
}

/* ── Screen 2 ── */
function ScreenTwo() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 text-center md:px-8">
      <p className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-ieee-shine/90 md:text-xs">The plan</p>
      <h2 className="story-title mt-3 text-[clamp(2rem,5.2vw,4.2rem)] uppercase leading-none">Three opportunities.</h2>
    </div>
  )
}

function MissionCard({ m }: { m: (typeof missions)[number] }) {
  return (
    <Link to={m.href} className="story-card group relative block h-full overflow-hidden rounded-xl p-4 text-left md:p-6">
      <p className="flex items-center gap-2 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-ieee-shine">
        <span className="text-white/60">{m.n}</span><span className="h-px w-4 bg-white/30" />{m.verb}
      </p>
      <h3 className="mt-2 text-lg text-white md:mt-4 md:text-2xl">{m.title}</h3>
      <p className="mt-1 text-sm leading-6 text-white/70 md:mt-2">{m.text}</p>
      <p className="mt-3 hidden font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 md:mt-8 md:block">Mission {m.n} <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span></p>
      <span aria-hidden="true" className="absolute bottom-2 right-4 font-display text-5xl font-extrabold text-white/[0.06] md:text-7xl">0{m.n}</span>
    </Link>
  )
}

function WorkshopsPill() {
  return (
    <Link to="/projects#learn" className="mx-auto mt-4 inline-flex max-w-[calc(100vw-2.5rem)] flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs text-white/75 backdrop-blur transition-colors hover:border-ieee-shine/50 md:mt-6 md:text-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-ieee-shine shadow-[0_0_8px_hsl(var(--ieee-shine))]" />
      <span className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-ieee-shine md:text-xs">Workshops</span>
      <span>All year long, we train for every mission.</span>
    </Link>
  )
}

/* Lamp row: the star hanging under the title, casting two beams onto the cards */
function Lamp({ beams, glow }: { beams?: MotionValue<number>; glow?: MotionValue<number> }) {
  return (
    <div className="relative mx-auto h-14 w-full max-w-5xl md:h-24" aria-hidden="true">
      <motion.div className="story-cone" style={{ opacity: glow }} />
      <div className="absolute left-1/2 top-2">
        <motion.span className="story-beam story-beam--right hidden md:block" style={{ scaleX: beams, opacity: beams }} />
        <motion.span className="story-beam story-beam--left hidden md:block" style={{ scaleX: beams, opacity: beams }} />
        <Star size="md" />
      </div>
    </div>
  )
}

function SchoolLine() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <p className="font-display text-[9px] font-bold uppercase tracking-[0.3em] text-white/55 md:text-[11px]">École Mohammadia d’Ingénieurs · Student Branch</p>
      <img src="/assets/ieee-diamond-white.png" alt="" className="h-7 w-7 opacity-70" />
    </div>
  )
}

export function ScrollStory() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] })

  // Screen 1 out
  const oneOpacity = useTransform(p, [0.3, 0.46], [1, 0])
  const oneY = useTransform(p, [0.28, 0.46], [0, -90])
  const oneSpread = useTransform(p, [0.26, 0.4, 0.46], [0, 1, 1])
  const oneBlur = useTransform(p, [0.32, 0.46], ["blur(0px)", "blur(6px)"])
  const onePointer = useTransform(oneOpacity, (v) => (v > 0.2 ? "auto" : "none"))
  const hintOpacity = useTransform(p, [0, 0.12], [1, 0])
  // The star follows the scroll down the streak, then fades as the screens swap
  const starY = useTransform(p, [0, 0.3], ["0vh", "18vh"])
  const starOpacity = useTransform(p, [0.28, 0.4], [1, 0])
  const streakOpacity = useTransform(p, [0.2, 0.36], [1, 0])

  // Screen 2 in
  const twoOpacity = useTransform(p, [0.42, 0.56], [0, 1])
  const twoY = useTransform(p, [0.42, 0.58], [90, 0])
  const twoSpread = useTransform(p, [0.42, 0.48, 0.6], [1, 1, 0])
  const twoBlur = useTransform(p, [0.42, 0.54], ["blur(6px)", "blur(0px)"])
  const twoPointer = useTransform(twoOpacity, (v) => (v > 0.5 ? "auto" : "none"))
  const lampOpacity = useTransform(p, [0.5, 0.6], [0, 1])
  const beams = useTransform(p, [0.54, 0.68], [0, 1])
  const glow = useTransform(p, [0.56, 0.72], [0, 1])
  const c0o = useTransform(p, [0.58, 0.68], [0, 1]); const c0y = useTransform(p, [0.58, 0.68], [40, 0])
  const c1o = useTransform(p, [0.61, 0.71], [0, 1]); const c1y = useTransform(p, [0.61, 0.71], [40, 0])
  const c2o = useTransform(p, [0.64, 0.74], [0, 1]); const c2y = useTransform(p, [0.64, 0.74], [40, 0])
  const pillOpacity = useTransform(p, [0.7, 0.8], [0, 1])
  const cards = [{ opacity: c0o, y: c0y }, { opacity: c1o, y: c1y }, { opacity: c2o, y: c2y }]

  if (reduced) {
    return (
      <section id="home-story" className="story-bg on-brand">
        <div className="flex min-h-[100svh] flex-col items-center justify-center gap-10 pt-20"><div className="flex flex-col items-center gap-7"><ScreenOne /><Slogan /></div><SchoolLine /></div>
        <div className="flex min-h-[100svh] flex-col items-center justify-center pb-16 pt-20">
          <ScreenTwo />
          <Lamp />
          <div className="mx-auto grid w-full max-w-5xl gap-3 px-5 md:grid-cols-3 md:gap-4 md:px-8">{missions.map((m) => <MissionCard key={m.n} m={m} />)}</div>
          <WorkshopsPill />
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} id="home-story" className="story-bg on-brand relative h-[320vh]" aria-label="Mission 2026–2027">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div aria-hidden="true" className="absolute inset-x-0 top-0 z-20 h-[2px] origin-left bg-gradient-to-r from-ieee-shine/40 via-ieee-shine to-white shadow-[0_0_10px_hsl(var(--ieee-shine))]" style={{ scaleX: p }} />
        <div aria-hidden="true" className="story-grain pointer-events-none absolute inset-0" />

        {/* Screen 1 */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center pt-16" style={{ opacity: oneOpacity, y: oneY, filter: oneBlur, pointerEvents: onePointer }}>
          <Echo spread={oneSpread} direction={1}><ScreenOne /></Echo>
          {/* slogan on the light streak; the star starts here and slides down as you scroll */}
          <div className="relative mt-7 flex w-full justify-center">
            <motion.span aria-hidden="true" className="story-streak absolute left-1/2 top-full mt-3 -translate-x-1/2" style={{ opacity: streakOpacity }} />
            <Echo spread={oneSpread} direction={1}><Slogan /></Echo>
            <motion.div aria-hidden="true" className="absolute left-1/2 top-full mt-[13px] z-10" style={{ y: starY, opacity: starOpacity }}><Star /></motion.div>
          </div>
          <motion.p className="mt-[12vh] font-display text-[9px] font-semibold uppercase tracking-[0.35em] text-white/60 md:text-[10px]" style={{ opacity: hintOpacity }}>
            Scroll to follow the light
          </motion.p>
          <div className="absolute inset-x-0 bottom-8 md:bottom-10"><SchoolLine /></div>
        </motion.div>

        {/* Screen 2 */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center pb-6 pt-20" style={{ opacity: twoOpacity, pointerEvents: twoPointer }}>
          <motion.div className="w-full" style={{ y: twoY, filter: twoBlur }}><Echo spread={twoSpread} direction={-1}><ScreenTwo /></Echo></motion.div>
          <motion.div className="w-full" style={{ opacity: lampOpacity }}><Lamp beams={beams} glow={glow} /></motion.div>
          <div className="mx-auto grid w-full max-w-5xl gap-2.5 px-5 md:grid-cols-3 md:gap-4 md:px-8">
            {missions.map((m, i) => <motion.div key={m.n} style={cards[i]}><MissionCard m={m} /></motion.div>)}
          </div>
          <motion.div style={{ opacity: pillOpacity }}><WorkshopsPill /></motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ScrollStory
