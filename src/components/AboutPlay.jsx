import { useCallback, useEffect, useRef, useState } from "react"
import { RotateCcw } from "lucide-react"

/**
 * Pong: una racchetta, una pallina, poi due, poi tre.
 *
 * Ogni pochi secondi ne entra un’altra. Perdi quando una sola passa
 * sotto la racchetta. Dito, mouse, frecce.
 */

const BEST_KEY = "portfolio-about-pong-best"
const MAX_BALLS = 7
const PADDLE_H = 10
const BALL_R = 7
const SPAWN_MS = 4200

function readBest() {
  try {
    return Number(sessionStorage.getItem(BEST_KEY)) || 0
  } catch {
    return 0
  }
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function makeBall(w, h, speed) {
  const dir = Math.random() > 0.5 ? 1 : -1
  return {
    x: w * (0.3 + Math.random() * 0.4),
    y: h * 0.28,
    vx: dir * speed * (0.7 + Math.random() * 0.5),
    vy: speed * (0.75 + Math.random() * 0.35),
  }
}

export default function AboutPlay() {
  const arenaRef = useRef(null)
  const paddleRef = useRef(null)
  const layerRef = useRef(null)
  const phys = useRef({
    running: false,
    w: 0,
    h: 0,
    paddleX: 0.5,
    paddleW: 86,
    balls: [],
    last: 0,
    spawnAt: 0,
    raf: 0,
    pointer: null,
    keys: 0,
  })
  const scoreRef = useRef(0)
  const [phase, setPhase] = useState("idle")
  const [score, setScore] = useState(0)
  const [count, setCount] = useState(1)
  const [best, setBest] = useState(readBest)

  const paint = useCallback(() => {
    const p = phys.current
    const paddle = paddleRef.current
    const layer = layerRef.current
    if (!paddle || !layer) return
    const left = p.paddleX * p.w - p.paddleW / 2
    paddle.style.transform = `translate3d(${left}px, 0, 0)`
    paddle.style.width = `${p.paddleW}px`

    const nodes = layer.children
    p.balls.forEach((ball, i) => {
      let node = nodes[i]
      if (!node) {
        node = document.createElement("span")
        node.className = "about-play-ball"
        node.setAttribute("aria-hidden", "true")
        layer.appendChild(node)
      }
      node.style.transform = `translate3d(${ball.x - BALL_R}px, ${ball.y - BALL_R}px, 0)`
    })
    while (layer.children.length > p.balls.length) {
      layer.lastElementChild.remove()
    }
  }, [])

  const stopLoop = useCallback(() => {
    window.cancelAnimationFrame(phys.current.raf)
    phys.current.raf = 0
    phys.current.running = false
  }, [])

  const miss = useCallback(() => {
    stopLoop()
    const finalScore = scoreRef.current
    setScore(finalScore)
    setPhase("miss")
    if (finalScore > best) {
      setBest(finalScore)
      try {
        sessionStorage.setItem(BEST_KEY, String(finalScore))
      } catch {
        /* ignore */
      }
    }
  }, [best, stopLoop])

  const measure = useCallback(() => {
    const box = arenaRef.current?.getBoundingClientRect()
    if (!box) return
    phys.current.w = box.width
    phys.current.h = box.height
    phys.current.paddleW = Math.max(64, Math.min(110, box.width * 0.28))
  }, [])

  const loop = useCallback(
    (now) => {
      const p = phys.current
      if (!p.running) return
      const dt = Math.min(0.032, (now - p.last) / 1000)
      p.last = now

      if (p.pointer != null) {
        p.paddleX += (p.pointer - p.paddleX) * Math.min(1, dt * 14)
      } else if (p.keys) {
        p.paddleX += p.keys * dt * 1.6
      }
      const half = p.paddleW / 2 / p.w
      p.paddleX = Math.max(half, Math.min(1 - half, p.paddleX))

      if (now >= p.spawnAt && p.balls.length < MAX_BALLS) {
        const speed = 210 + p.balls.length * 18
        p.balls.push(makeBall(p.w, p.h, speed))
        p.spawnAt = now + Math.max(2200, SPAWN_MS - p.balls.length * 280)
        setCount(p.balls.length)
      }

      const floor = p.h - 18
      const paddleTop = floor - PADDLE_H
      const paddleL = p.paddleX * p.w - p.paddleW / 2
      const paddleR = paddleL + p.paddleW

      for (const ball of p.balls) {
        ball.x += ball.vx * dt
        ball.y += ball.vy * dt

        if (ball.x < BALL_R) {
          ball.x = BALL_R
          ball.vx = Math.abs(ball.vx)
        } else if (ball.x > p.w - BALL_R) {
          ball.x = p.w - BALL_R
          ball.vx = -Math.abs(ball.vx)
        }

        if (ball.y < BALL_R) {
          ball.y = BALL_R
          ball.vy = Math.abs(ball.vy)
        }

        const onPaddle =
          ball.vy > 0 &&
          ball.y + BALL_R >= paddleTop &&
          ball.y + BALL_R <= floor + 6 &&
          ball.x >= paddleL - 4 &&
          ball.x <= paddleR + 4

        if (onPaddle) {
          const hit = (ball.x - (paddleL + p.paddleW / 2)) / (p.paddleW / 2)
          ball.y = paddleTop - BALL_R
          ball.vy = -Math.abs(ball.vy) * 1.03
          ball.vx += hit * 140
          const cap = 360 + p.balls.length * 20
          ball.vx = Math.max(-cap, Math.min(cap, ball.vx))
          scoreRef.current += 1
          setScore(scoreRef.current)
        } else if (ball.y - BALL_R > p.h) {
          paint()
          miss()
          return
        }
      }

      paint()
      p.raf = window.requestAnimationFrame(loop)
    },
    [miss, paint]
  )

  const start = useCallback(() => {
    measure()
    const p = phys.current
    scoreRef.current = 0
    setScore(0)
    setCount(1)
    p.running = true
    p.paddleX = 0.5
    p.balls = [makeBall(p.w, p.h, 230)]
    p.last = performance.now()
    p.spawnAt = p.last + SPAWN_MS
    setPhase("live")
    paint()
    window.cancelAnimationFrame(p.raf)
    p.raf = window.requestAnimationFrame(loop)
  }, [loop, measure, paint])

  const onPointer = (event) => {
    const box = arenaRef.current?.getBoundingClientRect()
    if (!box) return
    phys.current.pointer = (event.clientX - box.left) / box.width
    if (!phys.current.running) start()
  }

  const restart = () => {
    stopLoop()
    scoreRef.current = 0
    setScore(0)
    setCount(1)
    setPhase("idle")
    measure()
    const p = phys.current
    p.balls = []
    p.paddleX = 0.5
    paint()
  }

  useEffect(() => {
    measure()
    paint()
    const onMove = (event) => {
      const box = arenaRef.current?.getBoundingClientRect()
      if (!box) return
      phys.current.pointer = (event.clientX - box.left) / box.width
    }
    const onUp = () => {
      phys.current.pointer = null
    }
    const arena = arenaRef.current
    arena?.addEventListener("pointermove", onMove)
    arena?.addEventListener("pointerup", onUp)
    arena?.addEventListener("pointerleave", onUp)
    window.addEventListener("resize", measure)
    return () => {
      arena?.removeEventListener("pointermove", onMove)
      arena?.removeEventListener("pointerup", onUp)
      arena?.removeEventListener("pointerleave", onUp)
      window.removeEventListener("resize", measure)
      stopLoop()
    }
  }, [measure, paint, stopLoop])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
        phys.current.keys = -1
        if (!phys.current.running) start()
        event.preventDefault()
      } else if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
        phys.current.keys = 1
        if (!phys.current.running) start()
        event.preventDefault()
      } else if (event.code === "Space" && !phys.current.running) {
        event.preventDefault()
        start()
      }
    }
    const onUp = (event) => {
      if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === "a" ||
        event.key === "A" ||
        event.key === "d" ||
        event.key === "D"
      ) {
        phys.current.keys = 0
      }
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("keyup", onUp)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("keyup", onUp)
    }
  }, [start])

  const reduced = typeof window !== "undefined" && prefersReducedMotion()
  const hint =
    phase === "miss"
      ? `${score} ${score === 1 ? "colpo" : "colpi"}, ${count} ${count === 1 ? "pallina" : "palline"}. Tocca per un altro set.`
      : phase === "live"
        ? `${count} ${count === 1 ? "pallina" : "palline"} in campo.`
        : reduced
          ? "Tocca per iniziare. Muovi la racchetta."
          : "Tocca e muovi la racchetta. Ogni tanto entra un’altra pallina."

  return (
    <div className="about-play">
      <div className="about-play-head">
        <p className="about-play-prompt">Pong</p>
        <p className="about-play-tally">
          <span className="about-play-streak">{phase === "idle" ? 0 : score}</span>
          {best ? <span className="about-play-best">record {best}</span> : null}
        </p>
      </div>

      <div
        ref={arenaRef}
        className={`about-play-arena is-${phase}`}
        onPointerDown={onPointer}
        role="application"
        tabIndex={0}
        aria-label="Pong. Muovi la racchetta, le palline aumentano."
      >
        <div ref={layerRef} className="about-play-balls" aria-hidden="true" />
        <span ref={paddleRef} className="about-play-paddle" aria-hidden="true" />
      </div>

      <p className="about-play-status" role="status">
        {hint}
      </p>

      {phase === "miss" ? (
        <button type="button" className="about-play-reset" onClick={restart}>
          <RotateCcw size={13} aria-hidden />
          Ricomincia
        </button>
      ) : null}
    </div>
  )
}
