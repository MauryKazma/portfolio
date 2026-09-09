import { useEffect, useState } from "react"
import { Mail } from "lucide-react"
import { useSite } from "../context/SiteContentProvider"

/**
 * Pillola di contatto per il telefono.
 *
 * Non è una barra fissa: quella rubava una striscia di schermo a ogni sezione
 * e ripeteva il pulsante che nell'hero si vede già. Compare quando l'hero è
 * uscito di scena e si ritira quando arrivano i contatti veri, dove il
 * pulsante grande c'è comunque.
 */
export default function ContactDock() {
  const { display, editing } = useSite()
  const { email, cta } = display.footer
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.querySelector(".site-section--band")
    const contatti = document.getElementById("contatti")
    if (!hero && !contatti) return undefined

    let heroInView = Boolean(hero)
    let contattiInView = false
    const sync = () => setVisible(!heroInView && !contattiInView)

    const observers = []
    if (hero) {
      const io = new IntersectionObserver(
        ([entry]) => {
          heroInView = entry.isIntersecting
          sync()
        },
        { threshold: 0.12 }
      )
      io.observe(hero)
      observers.push(io)
    }
    if (contatti) {
      const io = new IntersectionObserver(
        ([entry]) => {
          contattiInView = entry.isIntersecting
          sync()
        },
        { threshold: 0.12 }
      )
      io.observe(contatti)
      observers.push(io)
    }

    sync()
    return () => observers.forEach((io) => io.disconnect())
  }, [])

  if (!email || editing || !visible) return null

  return (
    <a href={`mailto:${email}`} className="contact-dock" aria-label={`${cta} via email`}>
      <Mail size={16} aria-hidden />
      <span className="contact-dock-label">{cta}</span>
    </a>
  )
}
