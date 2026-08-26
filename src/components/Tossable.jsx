import { useEffect, useRef, useState } from "react"

function canToss() {
  return window.matchMedia("(min-width: 768px) and (pointer: fine)").matches
}

function reduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export default function Tossable({
  className = "",
  href,
  ariaLabel,
  ariaCurrent,
  onActivate,
  onEngage,
  onRelease,
  children,
}) {
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
    originX: 0,
    originY: 0,
    pointerX: 0,
    pointerY: 0,
    samples: [],
    raf: 0,
    last: 0,
    startX: 0,
    startY: 0,
  })
  const [dragging, setDragging] = useState(false)
  const [tossable, setTossable] = useState(canToss)

  const paint = () => {
    const node = moverRef.current
    if (!node) return
    const { x, y, tilt } = phys.current
    node.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${tilt}deg)`
  }

  const stopLoop = () => {
    const p = phys.current
    if (p.raf) cancelAnimationFrame(p.raf)
    p.raf = 0
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
    if (phys.current.raf) return
    phys.current.last = performance.now()
    phys.current.raf = requestAnimationFrame(loop)
  }

  useEffect(() => () => stopLoop(), [])

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)")
    const sync = () => setTossable(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (tossable) return
    const p = phys.current
    p.grabbing = false
    p.x = 0
    p.y = 0
    p.vx = 0
    p.vy = 0
    p.tilt = 0
    setDragging(false)
    stopLoop()
    const node = moverRef.current
    if (node) node.style.transform = ""
  }, [tossable])

  const onPointerDown = (event) => {
    if (!tossable) return
    if (event.button !== 0) return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    const p = phys.current
    p.grabbing = true
    p.originX = p.x
    p.originY = p.y
    p.pointerX = event.clientX
    p.pointerY = event.clientY
    p.startX = event.clientX
    p.startY = event.clientY
    p.tx = p.x
    p.ty = p.y
    p.samples = [{ t: event.timeStamp, x: event.clientX, y: event.clientY }]
    setDragging(true)
    onEngage?.()
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
    const dragDist = Math.hypot(event.clientX - p.startX, event.clientY - p.startY)
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
    onRelease?.()
    if (dragDist < 12) onActivate?.()
  }

  const onClick = (event) => {
    event.preventDefault()
    if (dragging) return
    if (tossable) return
    onActivate?.()
  }

  return (
    <div className={`${className}${dragging ? " is-dragging" : ""}`.trim()}>
      <div ref={moverRef} className="work-deck-toss">
        <a
          href={href}
          className={`work-deck-face${tossable ? "" : " is-static"}`}
          aria-label={ariaLabel}
          aria-current={ariaCurrent}
          draggable={false}
          onClick={onClick}
          onPointerDown={tossable ? onPointerDown : undefined}
          onPointerMove={tossable ? onPointerMove : undefined}
          onPointerUp={tossable ? endDrag : undefined}
          onPointerCancel={tossable ? endDrag : undefined}
          onLostPointerCapture={tossable ? endDrag : undefined}
        >
          {children}
        </a>
      </div>
    </div>
  )
}
