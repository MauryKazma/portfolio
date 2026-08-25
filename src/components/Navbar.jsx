import { useEffect, useRef, useState } from "react"
import { Menu, X } from "lucide-react"
import { useCV } from "../context/CVProvider"
import { useSite } from "../context/SiteContentProvider"
import { useEditorAccess } from "../hooks/useEditorAccess"
import { useRoute } from "../hooks/useRoute"
import { goHome, goToSection } from "../utils/scroll"
import { InlineEdit } from "./EditableText"

export default function Navbar() {
  const { guardNavigation: guardCV, expand } = useCV()
  const {
    display,
    editing,
    status,
    startEdit,
    requestCancel,
    save,
    guardNavigation: guardSite,
    setNavLabel,
    setLogo,
  } = useSite()
  const canEdit = useEditorAccess()
  const route = useRoute()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef(null)
  const panelRef = useRef(null)
  const links = display.nav
  const mainLinks = links.filter((link) => link.id !== "contatti")
  const contactLink = links.find((link) => link.id === "contatti")

  useEffect(() => {
    const ids = links.map((link) => link.id)
    let ticking = false

    const update = () => {
      ticking = false
      setScrolled(window.scrollY > 12)
      const probe = Math.round(window.innerHeight * 0.4)
      let current = route.name === "case" ? "lavori" : ""
      if (route.name === "home") {
        ids.forEach((id) => {
          const el = document.getElementById(id)
          if (!el) return
          if (el.getBoundingClientRect().top <= probe) current = id
        })
      }
      setActive(current)
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [links, route.name])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const panel = panelRef.current
    const toggle = toggleRef.current
    const focusables = panel?.querySelectorAll("button, [href], input, textarea")
    const list = focusables ? [...focusables] : []
    list[0]?.focus()

    const onKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault()
        setOpen(false)
        toggle?.focus()
        return
      }
      if (event.key !== "Tab" || list.length === 0) return
      const index = list.indexOf(document.activeElement)
      if (event.shiftKey && (index <= 0)) {
        event.preventDefault()
        list[list.length - 1].focus()
      } else if (!event.shiftKey && index === list.length - 1) {
        event.preventDefault()
        list[0].focus()
      }
    }

    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  const guarded = (fn) => {
    guardSite(() => guardCV(fn))
  }

  const go = (id) => {
    guarded(() => {
      setOpen(false)
      if (id === "curriculum") expand()
      requestAnimationFrame(() => goToSection(id))
    })
  }

  return (
    <header className={`site-nav${scrolled ? " is-scrolled" : ""}`}>
      <nav className="site-nav-inner" aria-label="Navigazione principale">
        <button
          type="button"
          className="site-nav-brand"
          onClick={() => guarded(() => goHome())}
        >
          <InlineEdit
            value={display.logo}
            editing={editing}
            onChange={setLogo}
            ariaLabel="Nome in navigazione"
          />
        </button>
        <ul className="site-nav-links">
          {mainLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => go(link.id)}
                aria-current={active === link.id ? "location" : undefined}
              >
                <InlineEdit
                  value={link.label}
                  editing={editing}
                  onChange={(value) => setNavLabel(link.id, value)}
                  ariaLabel={`Voce di menu ${link.label}`}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="site-nav-end">
          {contactLink ? (
            <button
              type="button"
              className="site-nav-contact"
              onClick={() => go(contactLink.id)}
              aria-current={active === contactLink.id ? "location" : undefined}
            >
              <InlineEdit
                value={contactLink.label}
                editing={editing}
                onChange={(value) => setNavLabel(contactLink.id, value)}
                ariaLabel={`Voce di menu ${contactLink.label}`}
              />
            </button>
          ) : null}
          {canEdit ? (
            <div className="site-nav-actions">
              {editing ? (
                <>
                  <button type="button" className="btn-secondary" onClick={requestCancel}>
                    Annulla
                  </button>
                  <button type="button" className="btn-primary" onClick={save}>
                    Salva
                  </button>
                </>
              ) : (
                <button type="button" className="btn-secondary" onClick={startEdit}>
                  Modifica
                </button>
              )}
              {status === "saved" ? (
                <p className="site-nav-status" aria-live="polite">
                  Salvato.
                </p>
              ) : null}
            </div>
          ) : null}

          <button
            ref={toggleRef}
            type="button"
            className="site-nav-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Chiudi menu" : "Apri menu"}
          >
            {open ? <X size={16} aria-hidden /> : <Menu size={16} aria-hidden />}
          </button>
        </div>
      </nav>

      {open ? (
        <div
          ref={panelRef}
          id="menu-mobile"
          className="site-nav-mobile md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <ul>
            {links.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => go(link.id)}
                  aria-current={active === link.id ? "location" : undefined}
                >
                  <InlineEdit
                    value={link.label}
                    editing={editing}
                    onChange={(value) => setNavLabel(link.id, value)}
                    ariaLabel={`Voce di menu ${link.label}`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  )
}
