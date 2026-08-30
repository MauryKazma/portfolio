import { useEffect, useState } from "react"
import { Mail } from "lucide-react"
import { useSite } from "../context/SiteContentProvider"

export default function ContactDock() {
  const { display } = useSite()
  const { email, cta } = display.footer
  const [idle, setIdle] = useState(false)

  useEffect(() => {
    const footer = document.getElementById("contatti")
    if (!footer) {
      setIdle(false)
      return undefined
    }
    const io = new IntersectionObserver(([entry]) => setIdle(entry.isIntersecting), {
      threshold: 0.18,
    })
    io.observe(footer)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("is-dock-idle", idle)
    return () => document.documentElement.classList.remove("is-dock-idle")
  }, [idle])

  if (!email) return null

  return (
    <aside className="contact-dock" aria-hidden={idle || undefined} aria-label="Contatto rapido">
      <a href={`mailto:${email}`} className="btn-primary">
        <Mail size={16} aria-hidden />
        {cta}
      </a>
    </aside>
  )
}
