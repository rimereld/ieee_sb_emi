import { useEffect, useRef } from "react"

/**
 * ShineCursor — a "Let's give it a shine" light that trails the mouse.
 *
 * A soft blue halo, a bright star core and a lens-flare streak follow the
 * pointer with a little lag. The layer uses `mix-blend-mode: screen`, so the
 * light glows over the blue/navy sections and fades to nothing on white ones.
 *
 * Only runs on devices with a real mouse and when the visitor hasn't asked for
 * reduced motion; touch screens never see it.
 */
export function ShineCursor() {
  const lightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = lightRef.current
    if (!el) return
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!finePointer || reducedMotion) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let x = targetX
    let y = targetY
    let frame = 0
    let visible = false

    const render = () => {
      // Ease toward the pointer so the light trails it smoothly.
      x += (targetX - x) * 0.16
      y += (targetY - y) * 0.16
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.3 ? requestAnimationFrame(render) : 0
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== "mouse") return
      targetX = e.clientX
      targetY = e.clientY
      if (!visible) {
        // Appear where the mouse is, without sliding in from the centre.
        x = targetX
        y = targetY
        visible = true
        el.style.opacity = "1"
      }
      if (!frame) frame = requestAnimationFrame(render)
    }

    const hide = () => {
      visible = false
      el.style.opacity = "0"
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", hide)
    window.addEventListener("blur", hide)
    return () => {
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", hide)
      window.removeEventListener("blur", hide)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div aria-hidden="true" className="shine-cursor-layer">
      <div ref={lightRef} className="shine-cursor">
        <span className="shine-cursor__halo" />
        <span className="shine-cursor__streak" />
        <span className="shine-cursor__streak shine-cursor__streak--tilt" />
        <span className="shine-cursor__core" />
      </div>
    </div>
  )
}

export default ShineCursor
