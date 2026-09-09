import { useLayoutEffect, useRef } from "react"

export default function SiteSection({
  as: Tag = "section",
  id,
  className = "",
  band = false,
  wash = false,
  field = false,
  tone,
  eager = false,
  children,
  ...rest
}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const inView = el.getBoundingClientRect().top < window.innerHeight * 0.88

    if (reduce || eager || inView) {
      el.classList.add("is-visible")
      return undefined
    }

    el.classList.add("is-pending")
    /*
     * Soglia zero con un margine inferiore negativo, non `threshold: 0.16`.
     * Una percentuale del bersaglio è irraggiungibile se la sezione è più alta
     * dello schermo diviso la soglia: i Lavori su telefono sono tredici schede
     * in colonna e restavano invisibili per sempre. Così invece la sezione si
     * rivela appena il suo bordo alto ha superato l'ultimo 12% di viewport.
     */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.classList.remove("is-pending")
        el.classList.add("is-visible")
        observer.disconnect()
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const classes = [
    "site-section",
    "reveal",
    band ? "site-section--band" : "",
    wash ? "site-section--wash" : "",
    field ? "site-section--field" : "",
    tone ? `site-section--${tone}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <Tag ref={ref} id={id} className={classes} {...rest}>
      {children}
    </Tag>
  )
}
