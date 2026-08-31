import { useEffect, useId, useLayoutEffect, useRef, useState } from "react"

const SCORE_KEY = "portfolio-about-play"
const SPARKS = [
  { x: 14, y: 22, delay: "0s" },
  { x: 82, y: 16, delay: "0.45s" },
  { x: 68, y: 38, delay: "1.1s" },
  { x: 22, y: 58, delay: "0.2s" },
  { x: 90, y: 62, delay: "0.8s" },
  { x: 8, y: 78, delay: "1.4s" },
  { x: 48, y: 12, delay: "0.65s" },
  { x: 38, y: 84, delay: "1.7s" },
]

function randomSpot(avoid) {
  for (let i = 0; i < 18; i += 1) {
    const next = {
      x: 12 + Math.random() * 76,
      y: 18 + Math.random() * 64,
    }
    if (!avoid || Math.hypot(next.x - avoid.x, next.y - avoid.y) > 34) return next
  }
  return { x: 50, y: 42 }
}

function PlayMallet() {
  return (
    <svg className="about-play-mallet-svg" viewBox="0 0 48 48" aria-hidden="true">
      <rect x="21" y="18" width="6" height="26" rx="3" fill="#1e3a8a" />
      <rect x="10" y="6" width="28" height="16" rx="5" fill="#1e3a8a" />
      <rect x="13" y="9" width="14" height="5" rx="2" fill="#38bdf8" opacity="0.45" />
    </svg>
  )
}

function PlayFace({ mood }) {
  const uid = useId().replace(/:/g, "")
  const wow = mood === "wow"
  const tongue = mood === "tongue"

  return (
    <svg className="about-play-svg" viewBox="0 0 128 128" aria-hidden="true">
      <defs>
        <radialGradient id={`${uid}-skin`} cx="38%" cy="30%" r="72%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="62%" stopColor="#f5f8fb" />
          <stop offset="100%" stopColor="#e8eef5" />
        </radialGradient>
        <linearGradient id={`${uid}-lens`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="28%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#152a66" />
        </linearGradient>
      </defs>
      <circle cx="64" cy="64" r="58" fill={`url(#${uid}-skin)`} stroke="#1e3a8a" strokeWidth="3.6" />
      <circle cx="36" cy="86" r="13" fill="#38bdf8" opacity="0.2" />
      <circle cx="92" cy="84" r="12" fill="#38bdf8" opacity="0.16" />
      <g className="about-play-glasses">
        <path
          d="M8 50c0-9 7-16 22-16h20c8 0 12 4 12 12v18c0 11-8 17-24 17H30c-14 0-22-8-22-17V50Z"
          fill={`url(#${uid}-lens)`}
        />
        <path
          d="M66 46c0-9 7-16 22-16h20c15 0 22 7 22 16v22c0 11-8 17-24 17H88c-16 0-22-6-22-17V46Z"
          fill={`url(#${uid}-lens)`}
        />
        <path
          d="M60 56l6 9 6-9"
          fill="none"
          stroke="#1e3a8a"
          strokeWidth="5.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path d="M18 48h16" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
        <path d="M76 46h16" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
      </g>
      {wow ? (
        <ellipse cx="64" cy="98" rx="8" ry="10" fill="#1e3a8a" />
      ) : (
        <g fill="none" stroke="#1b2430" strokeWidth="5.2" strokeLinecap="round">
          <path d="M46 94c12 12 32 10 40-2" />
          <path d="M86 90v10" />
        </g>
      )}
      {tongue ? <path d="M70 100c2 11 13 10 11-2" fill="#1e3a8a" /> : null}
    </svg>
  )
}

export default function AboutPlay({ open = false }) {
  const arenaRef = useRef(null)
  const lastHit = useRef(0)
  const lockUntil = useRef(0)
  const [score, setScore] = useState(() => {
    try {
      return Number(sessionStorage.getItem(SCORE_KEY)) || 0
    } catch {
      return 0
    }
  })
  const [pos, setPos] = useState({ x: 50, y: 100 })
  const [risen, setRisen] = useState(false)
  const [mood, setMood] = useState("idle")
  const [combo, setCombo] = useState(0)
  const [popping, setPopping] = useState(false)
  const [pops, setPops] = useState([])
  const [dots, setDots] = useState([])
  const [lockedHeight, setLockedHeight] = useState(0)
  const [mallet, setMallet] = useState(null)
  const [swing, setSwing] = useState(false)
  const [freezePlay, setFreezePlay] = useState(false)
  const swingTimer = useRef(0)

  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const coarsePointer = () => window.matchMedia("(hover: none)").matches
  const phoneLayout = () => window.matchMedia("(max-width: 767px)").matches
  const keepFaceUp = () => coarsePointer() || reduceMotion() || phoneLayout()
  const allowMallet = () => !reduceMotion()
  const isTouchLike = (event) => event.pointerType === "touch" || event.pointerType === "pen"

  const placeMallet = (event) => {
    if (!allowMallet()) return
    const arena = arenaRef.current
    if (!arena) return
    const rect = arena.getBoundingClientRect()
    const lift = isTouchLike(event) ? -40 : 0
    setMallet({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top + lift,
    })
  }

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)")
    const sync = () => setFreezePlay(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  useLayoutEffect(() => {
    const el = arenaRef.current
    if (!el || open) return undefined
    const measure = () => {
      const height = el.getBoundingClientRect().height
      if (height > 0) {
        setLockedHeight(height)
      }
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [open])

  useEffect(() => {
    try {
      sessionStorage.setItem(SCORE_KEY, String(score))
    } catch {
      /* ignore quota */
    }
  }, [score])

  useEffect(() => {
    if (keepFaceUp()) {
      setRisen(true)
      setPos(randomSpot())
    }
  }, [])

  useEffect(() => () => window.clearTimeout(swingTimer.current), [])

  const rise = (event) => {
    setRisen(true)
    setMood("idle")
    lockUntil.current = performance.now() + 180
    setPos((current) => (current.y > 90 ? randomSpot() : current))
    if (event) placeMallet(event)
  }

  const hide = () => {
    if (keepFaceUp()) return
    setRisen(false)
    setMood("idle")
    setPos({ x: 50, y: 100 })
    setMallet(null)
  }

  const swingMallet = () => {
    if (!allowMallet()) return
    setSwing(true)
    window.clearTimeout(swingTimer.current)
    swingTimer.current = window.setTimeout(() => setSwing(false), 200)
  }

  const dodge = (event) => {
    if (!risen || reduceMotion()) return
    const arena = arenaRef.current
    if (!arena) return
    const rect = arena.getBoundingClientRect()
    const px = ((event.clientX - rect.left) / rect.width) * 100
    const py = ((event.clientY - rect.top) / rect.height) * 100
    placeMallet(event)
    if (performance.now() < lockUntil.current) return
    const reach = isTouchLike(event) ? 24 : 28
    if (Math.hypot(px - pos.x, py - pos.y) < reach) {
      lockUntil.current = performance.now() + 160
      setMood("wow")
      setPos(randomSpot(pos))
    }
  }

  const missSwing = (event) => {
    if (event.target.closest(".about-play-face")) return
    event.currentTarget.setPointerCapture?.(event.pointerId)
    placeMallet(event)
    swingMallet()
    dodge(event)
  }

  const endMallet = (event) => {
    if (!isTouchLike(event)) return
    window.setTimeout(() => setMallet(null), 200)
  }

  const catchFace = (event) => {
    event.preventDefault()
    event.stopPropagation()
    placeMallet(event)
    swingMallet()
    const now = performance.now()
    const nextCombo = now - lastHit.current < 1000 ? combo + 1 : 1
    lastHit.current = now
    const gain = nextCombo >= 3 ? 3 : nextCombo
    const arena = arenaRef.current
    const rect = arena?.getBoundingClientRect()
    const x = rect ? ((event.clientX - rect.left) / rect.width) * 100 : pos.x
    const y = rect ? ((event.clientY - rect.top) / rect.height) * 100 : pos.y
    const burstId = now
    lockUntil.current = now + 140
    setRisen(true)
    setCombo(nextCombo)
    setScore((value) => value + gain)
    setMood(nextCombo >= 2 ? "tongue" : "wow")
    setPopping(true)
    setPops((list) => [...list.slice(-4), { id: burstId, x, y, gain }])
    setDots(
      Array.from({ length: 8 }, (_, index) => ({
        id: `${burstId}-${index}`,
        x,
        y,
        angle: index * 45 + Math.random() * 16,
        sky: index % 2 === 0,
      })),
    )
    setPos(randomSpot(pos))
    window.setTimeout(() => {
      setPops((list) => list.filter((item) => item.id !== burstId))
      setDots((list) => list.filter((item) => !String(item.id).startsWith(String(burstId))))
      setMood("idle")
      setPopping(false)
    }, 620)
  }

  return (
    <div
      ref={arenaRef}
      className={`about-play${risen ? " is-live" : ""}${open && freezePlay ? " is-frozen" : ""}${mallet ? " has-mallet" : ""}`}
      style={
        open && freezePlay && lockedHeight
          ? { height: `${lockedHeight}px`, minHeight: `${lockedHeight}px` }
          : undefined
      }
      onPointerEnter={rise}
      onPointerLeave={hide}
      onPointerMove={dodge}
      onPointerDown={missSwing}
      onPointerUp={endMallet}
      onPointerCancel={endMallet}
    >
      <span className="sr-only">
        Mini gioco: tocca o passa sul riquadro e colpisci la faccina con la mazza. Punteggio {score}.
      </span>
      <span className="about-play-blob about-play-blob--a" aria-hidden="true" />
      <span className="about-play-blob about-play-blob--b" aria-hidden="true" />
      <span className="about-play-blob about-play-blob--c" aria-hidden="true" />
      {SPARKS.map((spark) => (
        <span
          key={`${spark.x}-${spark.y}`}
          className="about-play-spark"
          style={{ left: `${spark.x}%`, top: `${spark.y}%`, animationDelay: spark.delay }}
          aria-hidden="true"
        />
      ))}
      {score > 0 ? (
        <span className="about-play-score" aria-live="polite">
          {score}
        </span>
      ) : null}
      {pops.map((pop) => (
        <span
          key={pop.id}
          className="about-play-gain"
          style={{ left: `${pop.x}%`, top: `${pop.y}%` }}
        >
          +{pop.gain}
        </span>
      ))}
      {dots.map((dot) => (
        <span
          key={dot.id}
          className={dot.sky ? "about-play-dot is-sky" : "about-play-dot"}
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            "--a": `${dot.angle}deg`,
          }}
          aria-hidden="true"
        />
      ))}
      <button
        type="button"
        className={`about-play-face${risen ? " is-up" : ""}${popping ? " is-hit" : ""}`}
        style={{ left: `${pos.x}%`, top: risen ? `${pos.y}%` : "100%" }}
        onPointerDown={catchFace}
        aria-label={`Colpisci la faccina con la mazza. Punteggio ${score}`}
      >
        <PlayFace mood={mood} />
      </button>
      {mallet ? (
        <span
          className={swing ? "about-play-mallet is-swing" : "about-play-mallet"}
          style={{ left: `${mallet.x}px`, top: `${mallet.y}px` }}
          aria-hidden="true"
        >
          <PlayMallet />
        </span>
      ) : null}
    </div>
  )
}
