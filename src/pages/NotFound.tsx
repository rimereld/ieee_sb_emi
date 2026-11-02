import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ClubLayout } from "@/components/ClubShell"

const NotFound = () => {
  const location = useLocation()

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname)
  }, [location.pathname])

  return (
    <ClubLayout>
      <main className="flex min-h-[70vh] items-center justify-center px-5 pt-28">
        <div className="text-center">
          <p className="shine-type text-shine text-8xl md:text-9xl">404</p>
          <div className="flare-line mx-auto mt-2 w-64" />
          <p className="mt-6 text-xl text-muted-foreground">This page hasn’t been built yet.</p>
          <Button asChild className="mt-8"><Link to="/">Back to home <ArrowRight size={16} /></Link></Button>
        </div>
      </main>
    </ClubLayout>
  )
}

export default NotFound
