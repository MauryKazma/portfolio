import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { useEditorAccess } from "../hooks/useEditorAccess"
import { readImageFile } from "../utils/image"
import { goToSection } from "../utils/scroll"
import { useSite } from "../context/SiteContentProvider"
import { EditableText, InlineEdit } from "./EditableText"
import ShotImage from "./ShotImage"
import SiteSection from "./SiteSection"

function reduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function canThrowCard() {
  return window.matchMedia("(min-width: 768px) and (pointer: fine)").matches
}

function HeroPortrait() {
  const { display, editing, setHero, persistPortrait } = useSite()
  const canEdit = useEditorAccess()
  const { hero } = display
  const portraitSrc = hero.portraitSrc?.trim()
  const stageRef = useRef(null)
  const moverRef = useRef(null)
  const phys = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    tx: 0,
    ty: 0,
    tilt: 0,
    grabbing: false,
    home: false,
    originX: 0,
    originY: 0,
    pointerX: 0,
    pointerY: 0,
    samples: [],
    raf: 0,
    last: 0,
  })
  const [dragging, setDragging] = useState(false)
  const [live, setLive] = useState(false)
  const [throwable, setThrowable] = useState(canThrowCard)

  const paint = () => {
    const node = moverRef.current
    if (!node) return
    const { x, y, tilt } = phys.current
    node.style.transform = `translate(${x}px, ${y}px) rotate(${tilt}deg)`
  }

  const stopLoop = () => {
    const p = phys.current
    if (p.raf) cancelAnimationFrame(p.raf)
    p.raf = 0
    setLive(false)
  }

  const loop = (now) => {
    const p = phys.current
    const dt = Math.min(2, (now - (p.last || now)) / 16.67)
    p.last = now
    const reduce = reduceMotion()

    if (p.grabbing) {
      const follow = reduce ? 1 : 1 - Math.pow(0.7, dt)
      p.x += (p.tx - p.x) * follow
      p.y += (p.ty - p.y) * follow
    } else if (p.home) {
      const pull = reduce ? 1 : 0.16
      p.vx += (0 - p.x) * pull * dt
      p.vy += (0 - p.y) * pull * dt
      const damp = Math.pow(0.8, dt)
      p.vx *= damp
      p.vy *= damp
      p.x += p.vx * dt
      p.y += p.vy * dt
      if (Math.hypot(p.x, p.y) < 0.5 && Math.hypot(p.vx, p.vy) < 0.25) {
        p.x = 0
        p.y = 0
        p.vx = 0
        p.vy = 0
        p.tilt = 0
        p.home = false
        paint()
        stopLoop()
        return
      }
    } else {
      const dist = Math.hypot(p.x, p.y)
      const pull = reduce ? 0.28 : 0.006 + Math.min(dist, 520) * 0.00001
      p.vx += -p.x * pull * dt
      p.vy += -p.y * pull * dt
      const damp = Math.pow(reduce ? 0.7 : 0.94, dt)
      p.vx *= damp
      p.vy *= damp
      p.x += p.vx * dt
      p.y += p.vy * dt
      if (dist < 0.7 && Math.hypot(p.vx, p.vy) < 0.2) {
        p.x = 0
        p.y = 0
        p.vx = 0
        p.vy = 0
        p.tilt = 0
        paint()
        stopLoop()
        return
      }
    }

    const targetTilt = reduce ? 0 : Math.max(-8, Math.min(8, p.vx * 0.32))
    p.tilt += (targetTilt - p.tilt) * (reduce ? 1 : Math.min(1, 0.22 * dt))
    paint()
    p.raf = requestAnimationFrame(loop)
  }

  const ensureLoop = () => {
    setLive(true)
    if (phys.current.raf) return
    phys.current.last = performance.now()
    phys.current.raf = requestAnimationFrame(loop)
  }

  useEffect(() => () => stopLoop(), [])

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)")
    const sync = () => setThrowable(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    window.addEventListener("resize", sync)
    return () => {
      mq.removeEventListener("change", sync)
      window.removeEventListener("resize", sync)
    }
  }, [])

  useEffect(() => {
    if (throwable) return
    const p = phys.current
    p.grabbing = false
    p.home = false
    p.x = 0
    p.y = 0
    p.vx = 0
    p.vy = 0
    p.tilt = 0
    setDragging(false)
    stopLoop()
    const node = moverRef.current
    if (node) node.style.transform = ""
  }, [throwable])

  const onPointerDown = (event) => {
    if (!throwable) return
    if (event.button !== 0) return
    if (event.target.closest("input, textarea, button, label, a, [contenteditable='true']")) return
    event.currentTarget.setPointerCapture(event.pointerId)
    const p = phys.current
    p.grabbing = true
    p.home = false
    p.originX = p.x
    p.originY = p.y
    p.pointerX = event.clientX
    p.pointerY = event.clientY
    p.tx = p.x
    p.ty = p.y
    p.samples = [{ t: event.timeStamp, x: event.clientX, y: event.clientY }]
    setDragging(true)
    ensureLoop()
  }

  const onPointerMove = (event) => {
    const p = phys.current
    if (!p.grabbing) return
    p.tx = p.originX + (event.clientX - p.pointerX)
    p.ty = p.originY + (event.clientY - p.pointerY)
    p.samples.push({ t: event.timeStamp, x: event.clientX, y: event.clientY })
    if (p.samples.length > 6) p.samples.shift()
  }

  const endDrag = (event) => {
    const p = phys.current
    if (!p.grabbing) return
    p.grabbing = false
    setDragging(false)
    const samples = p.samples
    if (!reduceMotion() && samples.length >= 2) {
      const first = samples[0]
      const last = samples[samples.length - 1]
      const ms = Math.max(16, last.t - first.t)
      p.vx = ((last.x - first.x) / ms) * 16.67 * 1.2
      p.vy = ((last.y - first.y) / ms) * 16.67 * 1.2
      const max = 48
      const speed = Math.hypot(p.vx, p.vy)
      if (speed > max) {
        p.vx *= max / speed
        p.vy *= max / speed
      }
    } else {
      p.vx = 0
      p.vy = 0
    }
    p.samples = []
    const node = event.currentTarget
    if (node.hasPointerCapture?.(event.pointerId)) {
      node.releasePointerCapture(event.pointerId)
    }
    ensureLoop()
  }

  const onFile = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ""
    if (!file) return
    try {
      persistPortrait(await readImageFile(file))
    } catch {
      /* ignore invalid files */
    }
  }

  return (
    <div
      ref={stageRef}
      className={`hero-portrait-stage${dragging ? " is-dragging" : ""}${live ? " is-live" : ""}`}
    >
      <div ref={moverRef} className="hero-portrait-mover">
        <div className="hero-portrait-glow" aria-hidden="true" />
        <figure
          className={`hero-portrait${dragging ? " is-dragging" : ""}${throwable ? "" : " is-static"}`}
          aria-label={
            throwable
              ? "Ritratto. Trascina per spostare, doppio clic per riportarlo a posto."
              : "Ritratto."
          }
          onPointerDown={throwable ? onPointerDown : undefined}
          onPointerMove={throwable ? onPointerMove : undefined}
          onPointerUp={throwable ? endDrag : undefined}
          onPointerCancel={throwable ? endDrag : undefined}
          onLostPointerCapture={throwable ? endDrag : undefined}
          onDoubleClick={
            throwable
              ? () => {
                  const p = phys.current
                  p.grabbing = false
                  p.home = true
                  setDragging(false)
                  ensureLoop()
                }
              : undefined
          }
        >
          <div className="hero-portrait-frame">
            {portraitSrc ? (
              <ShotImage
                src={portraitSrc}
                alt={hero.portraitName || "Ritratto"}
                width={360}
                height={480}
                sizes="(min-width: 900px) 360px, 280px"
                eager
                draggable={false}
              />
            ) : (
              <div className="hero-portrait-add is-idle">
                <span className="hero-portrait-monogram" aria-hidden="true">
                  {(hero.portraitName || "MP")
                    .split(" ")
                    .filter(Boolean)
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <figcaption className="hero-portrait-caption">
            <EditableText
              className="hero-portrait-name"
              value={hero.portraitName}
              editing={editing}
              onChange={(value) => setHero("portraitName", value)}
              ariaLabel="Nome nel ritratto"
            />
            {canEdit ? (
              <label className="hero-portrait-change">
                <input type="file" accept="image/*" onChange={onFile} />
                {portraitSrc ? "Cambia foto" : "Inserisci foto"}
              </label>
            ) : null}
            {editing ? (
              <input
                className="site-edit-field hero-portrait-src"
                value={hero.portraitSrc ?? ""}
                aria-label="URL immagine ritratto"
                placeholder="URL foto, oppure usa Inserisci foto"
                onChange={(event) => persistPortrait(event.target.value)}
              />
            ) : null}
          </figcaption>
        </figure>
      </div>
    </div>
  )
}

export default function Hero() {
  const { display, editing, setHero } = useSite()
  const { hero } = display
  const email = display.footer?.email?.trim()

  return (
    <SiteSection
      className="scroll-mt-24"
      band
      tone="ink"
      eager
      aria-labelledby="hero-title"
    >
      <div className="site-content">
        <div className="hero-grid">
          <div className="hero-copy">
            <EditableText
              className="site-eyebrow"
              value={hero.eyebrow}
              editing={editing}
              onChange={(value) => setHero("eyebrow", value)}
              ariaLabel="Sottotitolo hero"
            />
            <EditableText
              as="h1"
              id="hero-title"
              className="site-headline"
              value={hero.title}
              editing={editing}
              onChange={(value) => setHero("title", value)}
              ariaLabel="Titolo principale"
            />
            <EditableText
              className="site-body"
              value={hero.body}
              editing={editing}
              multiline
              onChange={(value) => setHero("body", value)}
              ariaLabel="Testo hero"
            />
            {hero.availability || editing ? (
              <EditableText
                className="hero-availability"
                value={hero.availability}
                editing={editing}
                onChange={(value) => setHero("availability", value)}
                ariaLabel="Disponibilità"
              />
            ) : null}
            {email ? (
              <a className="hero-email" href={`mailto:${email}`}>
                {email}
              </a>
            ) : null}
            <div className="hero-cta">
              <button
                type="button"
                onClick={() => goToSection("lavori")}
                className="btn-primary"
              >
                <InlineEdit
                  value={hero.cta}
                  editing={editing}
                  onChange={(value) => setHero("cta", value)}
                  ariaLabel="Testo pulsante hero"
                />
                <ArrowUpRight size={16} aria-hidden />
              </button>
            </div>
          </div>

          <HeroPortrait />
        </div>
      </div>
    </SiteSection>
  )
}
