import { useEffect, useState, type ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spark } from "@/components/Spark"

const links = [
  { label: "Home", to: "/" },
  { label: "About us", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
]

function ClubHeader() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isHome = location.pathname === "/"
  const transparent = isHome && !scrolled && !menuOpen

  useEffect(() => {
    // Stay transparent over the home page's dark scroll story, solid after it.
    const update = () => {
      const story = document.getElementById("home-story")
      setScrolled(story ? story.getBoundingClientRect().bottom <= 72 : window.scrollY > 24)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [location.pathname])

  useEffect(() => setMenuOpen(false), [location.pathname])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${transparent ? "on-brand bg-transparent" : "border-b border-border bg-background/95 shadow-sm backdrop-blur-xl"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link to="/" aria-label="IEEE EMI Student Branch home" className="flex shrink-0 items-center transition-opacity hover:opacity-85">
          <img src={transparent ? "/assets/emi-lockup-top-white.png" : "/assets/emi-lockup-top-blue.png"} alt="IEEE · Ecole Mohammadia d’Ingénieurs student branch" className="h-8 w-auto md:h-10" />
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {links.map((link) => {
            const active = location.pathname === link.to
            return (
              <Link key={link.to} to={link.to} className={`relative py-1 font-display text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:text-primary ${active ? "text-primary" : "text-foreground"}`}>
                {link.label}
                {active && <span className="flare-line absolute -bottom-1 left-0 right-0" />}
              </Link>
            )
          })}
          <Button asChild size="sm"><Link to="/join">Join the branch <ArrowUpRight size={15} /></Link></Button>
        </nav>
        <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground md:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
      </div>
      {menuOpen && <nav aria-label="Mobile navigation" className="border-t border-border bg-background px-5 py-4 md:hidden"><div className="mx-auto flex max-w-6xl flex-col gap-1">{links.map((link) => <Link key={link.to} to={link.to} className={`py-3 font-display text-sm font-semibold transition-colors hover:text-primary ${location.pathname === link.to ? "text-primary" : "text-foreground"}`}>{link.label}</Link>)}<Button asChild className="mt-2"><Link to="/join">Join the branch <ArrowUpRight size={15} /></Link></Button></div></nav>}
    </header>
  )
}

function ClubFooter() {
  return (
    <footer className="on-brand brand-band relative overflow-hidden">
      <div aria-hidden="true" className="flare-line absolute inset-x-0 top-0" />
      <Spark id="footer" className="right-[7%] top-10" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1fr_auto] md:items-end md:px-8">
        <div>
          <Link to="/" className="inline-flex transition-opacity hover:opacity-90"><img src="/assets/emi-lockup-white.png" alt="IEEE · Ecole Mohammadia d’Ingénieurs student branch" className="h-16 w-auto md:h-20" /></Link>
          <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">A place to learn by making, share what you discover, and meet people who care about engineering.</p>
          <p className="shine-type mt-4 text-sm text-white/90">Let’s give it a shine</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 font-display text-sm font-semibold"><Link className="text-white/85 transition-colors hover:text-white" to="/about">About us</Link><Link className="text-white/85 transition-colors hover:text-white" to="/projects">Projects</Link><Link className="text-white/85 transition-colors hover:text-white" to="/join">Join us</Link><Link className="text-white/85 transition-colors hover:text-white" to="/contact">Contact</Link></div>
        <div className="border-t border-white/25 pt-5 text-xs text-muted-foreground md:col-span-2">© 2026 IEEE EMI Student Branch · Ecole Mohammadia d’Ingénieurs</div>
      </div>
    </footer>
  )
}

export function ClubLayout({ children }: { children: ReactNode }) {
  return <><ClubHeader />{children}<ClubFooter /></>
}
