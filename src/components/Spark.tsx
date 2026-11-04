import { useEffect, useRef, useState } from "react"
import { collectSpark, useSparks, type SparkId } from "@/lib/sparks"

/**
 * A hidden spark. Sweep the shine light over it (or tap / press Enter) to catch it.
 * Place it inside a `relative` container and position it with className,
 * e.g. <Spark id="footer" className="right-[8%] top-10" />.
 */

const CATCH_RADIUS = 56 // px between the pointer and the spark's centre

// Only catchable while actually visible (not inside a faded-out screen).
function isShown(el: HTMLElement) {
  const r = el.getBoundingClientRect()
  if (r.bottom < 0 || r.top > innerHeight || r.width === 0) return false
  let opacity = 1
  for (let n: HTMLElement | null = el; n; n = n.parentElement) {
    const s = getComputedStyle(n)
    if (s.visibility === "hidden" || s.display === "none") return false
    opacity *= parseFloat(s.opacity || "1")
    if (opacity < 0.5) return false
  }
  return true
}

export function Spark({ id, className = "" }: { id: SparkId; className?: string }) {
  const collected = useSparks()
  const ref = useRef<HTMLButtonElement>(null)
  const alreadyCaught = collected.includes(id)
  const [bursting, setBursting] = useState(false)

  const catchIt = () => {
    if (alreadyCaught || bursting) return
    setBursting(true)
    collectSpark(id)
    window.setTimeout(() => setBursting(false), 700)
  }

  useEffect(() => {
    if (alreadyCaught) return
    const onMove = (e: PointerEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      if (dx * dx + dy * dy < CATCH_RADIUS * CATCH_RADIUS && isShown(el)) catchIt()
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  })

  if (alreadyCaught && !bursting) return null

  return (
    <button
      ref={ref}
      type="button"
      onClick={catchIt}
      aria-label="Hidden spark — catch it"
      title="A hidden spark!"
      className={`spark absolute z-30 ${bursting ? "spark--burst" : ""} ${className}`}
    >
      <span className="spark__glow" />
      <span className="spark__ray" />
      <span className="spark__ray spark__ray--v" />
      <span className="spark__core" />
      {bursting && <span className="spark__ring" />}
    </button>
  )
}

export default Spark
