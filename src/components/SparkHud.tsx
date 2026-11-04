import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { SPARKS, TOTAL_SPARKS, markCelebrated, resetSparks, useSparks, wasCelebrated } from "@/lib/sparks"

/** Spark counter (bottom-left), hint panel, and the "you gave it a shine" finale. */
export function SparkHud() {
  const collected = useSparks()
  const count = collected.length
  const done = count === TOTAL_SPARKS
  const [open, setOpen] = useState(false)
  const [finale, setFinale] = useState(false)
  const [bump, setBump] = useState(false)

  // Little bounce on each catch
  useEffect(() => {
    const onCatch = () => {
      setBump(true)
      window.setTimeout(() => setBump(false), 500)
    }
    window.addEventListener("spark:collected", onCatch)
    return () => window.removeEventListener("spark:collected", onCatch)
  }, [])

  useEffect(() => {
    if (done && !wasCelebrated()) {
      markCelebrated()
      const t = window.setTimeout(() => setFinale(true), 600)
      return () => window.clearTimeout(t)
    }
  }, [done])

  useEffect(() => {
    if (!finale) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFinale(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [finale])

  return (
    <>
      <div className="fixed bottom-4 left-4 z-[55] font-display">
        {open && (
          <div id="spark-panel" className="spark-panel mb-2 w-64 rounded-xl p-4 text-white shadow-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ieee-shine">Catch the sparks</p>
            <p className="mt-1.5 text-xs leading-5 text-white/75">Sparks are hiding across the site. Sweep your light over them (or tap them) to catch them all.</p>
            <ul className="mt-3 space-y-1.5 text-xs">
              {SPARKS.map((s) => {
                const got = collected.includes(s.id)
                return (
                  <li key={s.id} className={`flex items-center gap-2 ${got ? "text-white" : "text-white/45"}`}>
                    <span className={`h-2 w-2 rounded-full ${got ? "bg-ieee-shine shadow-[0_0_8px_hsl(var(--ieee-shine))]" : "border border-white/40"}`} />
                    {got ? s.where : `Hidden somewhere ${s.where.startsWith("The") ? "at the bottom of every page" : `on ${s.where.split(" · ")[0]}`}…`}
                  </li>
                )
              })}
            </ul>
            {count > 0 && <button type="button" onClick={resetSparks} className="mt-3 text-[11px] font-semibold text-white/60 underline-offset-2 hover:text-white hover:underline">Start over</button>}
          </div>
        )}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="spark-panel"
          aria-label={`Sparks caught: ${count} of ${TOTAL_SPARKS}. Show hints`}
          className={`spark-pill flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-bold text-white shadow-lg transition-transform ${bump ? "scale-110" : ""}`}
        >
          <span className={`spark-pill__icon ${done ? "spark-pill__icon--done" : ""}`} aria-hidden="true" />
          <span aria-live="polite">{count}<span className="text-white/50"> / {TOTAL_SPARKS}</span></span>
          <span className="hidden text-white/70 sm:inline">{done ? "All caught" : "sparks"}</span>
        </button>
      </div>

      {finale && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[hsl(213_70%_4%/0.7)] p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="finale-title" onClick={() => setFinale(false)}>
          <div className="spark-finale relative w-full max-w-md overflow-hidden rounded-2xl p-8 text-center text-white" onClick={(e) => e.stopPropagation()}>
            <div className="spark-finale__burst" aria-hidden="true" />
            <p className="relative font-display text-[11px] font-bold uppercase tracking-[0.3em] text-ieee-shine">All {TOTAL_SPARKS} sparks caught</p>
            <h2 id="finale-title" className="relative mt-3 font-display text-3xl font-extrabold uppercase italic leading-tight">You gave it<br />a shine.</h2>
            <p className="relative mt-4 text-sm leading-6 text-white/75">That’s the curiosity we look for. Bring it to the branch and build something real with us.</p>
            <div className="relative mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link to="/join" onClick={() => setFinale(false)} className="rounded-md bg-white px-5 py-2.5 font-display text-sm font-bold text-ieee-blue shadow-glow transition-transform hover:-translate-y-0.5">Join the crew →</Link>
              <button type="button" onClick={() => { resetSparks(); setFinale(false) }} className="rounded-md border border-white/30 px-5 py-2.5 font-display text-sm font-semibold text-white hover:bg-white/10">Play again</button>
            </div>
            <button type="button" onClick={() => setFinale(false)} aria-label="Close" className="absolute right-4 top-3 text-xl text-white/60 hover:text-white">×</button>
          </div>
        </div>
      )}
    </>
  )
}

export default SparkHud
