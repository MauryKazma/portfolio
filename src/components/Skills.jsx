import { useEffect, useRef, useState } from "react"
import { Plus, X } from "lucide-react"
import { clampSkillPercent, skillGrade } from "../data/siteDefault"
import { useSite } from "../context/SiteContentProvider"
import { EditableText, InlineEdit } from "./EditableText"
import SiteSection from "./SiteSection"

const RING_RADIUS = 36
const RING_LENGTH = 2 * Math.PI * RING_RADIUS

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

function useSkillReveal(instant, counts) {
  const ref = useRef(null)
  const [hot, setHot] = useState(instant)
  const [motion, setMotion] = useState({ tools: [], supports: [], crafts: [] })
  const toolCount = counts.tools
  const supportCount = counts.supports
  const craftCount = counts.crafts

  useEffect(() => {
    const roll = () => ({
      tools: Array.from({ length: toolCount }, () => ({
        delay: randomBetween(40, 420),
        duration: randomBetween(880, 1480),
      })),
      supports: Array.from({ length: supportCount }, () => ({
        delay: randomBetween(80, 480),
        duration: randomBetween(900, 1400),
      })),
      crafts: Array.from({ length: craftCount }, () => ({
        delay: randomBetween(140, 560),
        duration: randomBetween(920, 1480),
      })),
    })

    if (instant || prefersReducedMotion()) {
      setMotion(roll())
      setHot(true)
      return undefined
    }

    const el = ref.current
    if (!el) return undefined

    const start = () => {
      setMotion(roll())
      setHot(true)
    }

    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      start()
      return undefined
    }

    setHot(false)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        start()
        observer.disconnect()
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [craftCount, instant, supportCount, toolCount])

  return [ref, hot, motion]
}

function useCountUp(target, hot, delay, duration, instant) {
  const [value, setValue] = useState(() => (instant || hot ? target : 0))

  useEffect(() => {
    if (instant || prefersReducedMotion()) {
      setValue(target)
      return undefined
    }
    if (!hot) {
      setValue(0)
      return undefined
    }

    setValue(0)
    let frame = 0
    let start = 0

    const tick = (now) => {
      if (!start) start = now + delay
      if (now < start) {
        frame = requestAnimationFrame(tick)
        return
      }
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - t) ** 3
      setValue(Math.round(target * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [delay, duration, hot, instant, target])

  return value
}

function SkillPercentField({ name, value, onChange }) {
  return (
    <label className="skill-pct-field">
      <span className="sr-only">Percentuale {name}</span>
      <input
        className="skill-pct-range"
        type="range"
        min="0"
        max="100"
        value={value}
        aria-label={`Livello ${name}`}
        onChange={(event) => onChange(clampSkillPercent(event.target.value))}
      />
      <input
        className="site-edit-field skill-pct-input"
        type="number"
        min="0"
        max="100"
        value={value}
        aria-label={`Percentuale ${name}`}
        onChange={(event) => onChange(clampSkillPercent(event.target.value))}
      />
      <span aria-hidden="true">%</span>
    </label>
  )
}

function SkillRing({ mark, percent, hot, delay, duration, instant }) {
  const shown = useCountUp(percent, hot, delay, duration, instant)
  const rest = RING_LENGTH * (1 - percent / 100)

  return (
    <div
      className={`skill-ring${hot ? " is-hot" : ""}`}
      style={{ "--skill-delay": `${delay}ms`, "--skill-duration": `${duration}ms` }}
    >
      <svg viewBox="0 0 100 100" className="skill-ring-svg" aria-hidden="true">
        <circle className="skill-ring-track" cx="50" cy="50" r={RING_RADIUS} />
        <circle
          className="skill-ring-value"
          cx="50"
          cy="50"
          r={RING_RADIUS}
          strokeDasharray={RING_LENGTH}
          strokeDashoffset={hot ? rest : RING_LENGTH}
          transform="rotate(-90 50 50)"
          style={{
            transitionDelay: `${delay}ms`,
            transitionDuration: `${duration}ms`,
          }}
        />
      </svg>
      <span className="skill-ring-core">
        <span className="skill-ring-plate">{mark}</span>
      </span>
      <span className="sr-only">{shown}%</span>
    </div>
  )
}

function ToolCard({ tool, hot, delay, duration, editing, onMark, onName, onLevel, onRemove }) {
  const percent = clampSkillPercent(tool.level)
  const shown = useCountUp(percent, hot, delay, duration, editing)

  return (
    <li className="skill-tool" aria-label={editing ? undefined : `${tool.name}: ${percent}%`}>
      <SkillRing
        mark={tool.mark || "Ps"}
        percent={percent}
        hot={hot}
        delay={delay}
        duration={duration}
        instant={editing}
      />
      {editing ? (
        <>
          <input
            className="site-edit-field skill-mark-input"
            value={tool.mark}
            maxLength={3}
            aria-label={`Sigla ${tool.name}`}
            onChange={(event) => onMark(event.target.value)}
          />
          <input
            className="site-edit-field"
            value={tool.name}
            aria-label={`Nome strumento ${tool.mark}`}
            onChange={(event) => onName(event.target.value)}
          />
          <SkillPercentField name={tool.name} value={percent} onChange={onLevel} />
          <button
            type="button"
            className="site-tag-remove"
            aria-label={`Rimuovi ${tool.name || "strumento"}`}
            onClick={onRemove}
          >
            <X size={14} aria-hidden />
          </button>
        </>
      ) : (
        <>
          <p className="skill-tool-name">{tool.name}</p>
          <p className="skill-ring-pct">{shown}%</p>
        </>
      )}
    </li>
  )
}

function MeterRow({
  item,
  hot,
  delay,
  duration,
  editing,
  onName,
  onLevel,
  onRemove,
  compact = false,
}) {
  const percent = clampSkillPercent(item.level)
  const shown = useCountUp(percent, hot, delay, duration, editing)
  const grade = skillGrade(percent)

  return (
    <li className={`skill-craft${compact ? " is-support" : ""}`}>
      <div className="skill-craft-head">
        {editing ? (
          <InlineEdit
            value={item.name}
            editing
            onChange={onName}
            ariaLabel={compact ? "Nome supporto" : "Nome competenza"}
          />
        ) : (
          <span className="skill-craft-name">{item.name}</span>
        )}
        {editing ? (
          <button
            type="button"
            className="site-tag-remove"
            aria-label={`Rimuovi ${item.name || (compact ? "supporto" : "competenza")}`}
            onClick={onRemove}
          >
            <X size={14} aria-hidden />
          </button>
        ) : (
          <span className="skill-craft-meta">
            {compact ? null : <span className="skill-grade">{grade}</span>}
            <span className="skill-bar-pct">{shown}%</span>
          </span>
        )}
      </div>
      {editing ? (
        <SkillPercentField name={item.name} value={percent} onChange={onLevel} />
      ) : (
        <div
          className={`skill-bar-track${hot ? " is-hot" : ""}`}
          role="progressbar"
          aria-label={item.name}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={shown}
        >
          <span
            className="skill-bar-fill"
            style={{
              "--skill-pct": `${percent}%`,
              "--skill-delay": `${delay}ms`,
              "--skill-duration": `${duration}ms`,
            }}
          />
        </div>
      )}
    </li>
  )
}

export default function Skills() {
  const {
    display,
    editing,
    setSkills,
    setSkillTool,
    addSkillTool,
    removeSkillTool,
    setSkillSupport,
    addSkillSupport,
    removeSkillSupport,
    setSkillCraft,
    addSkillCraft,
    removeSkillCraft,
  } = useSite()
  const skills = display.skills ?? { tools: [], supports: [], crafts: [] }
  const tools = skills.tools ?? []
  const supports = skills.supports ?? []
  const crafts = skills.crafts ?? []
  const body = skills.body ?? ""
  const [boardRef, hot, motion] = useSkillReveal(editing, {
    tools: tools.length,
    supports: supports.length,
    crafts: crafts.length,
  })

  const beat = (group, index) => motion[group]?.[index] ?? { delay: 0, duration: 1000 }

  return (
    <SiteSection id="skill" className="scroll-mt-24" aria-labelledby="skill-title">
      <div className="site-content skill-board">
        <EditableText
          className="site-eyebrow"
          value={skills.eyebrow}
          editing={editing}
          onChange={(value) => setSkills("eyebrow", value)}
          ariaLabel="Etichetta skill"
        />
        <EditableText
          as="h2"
          id="skill-title"
          className="site-headline"
          value={skills.title}
          editing={editing}
          onChange={(value) => setSkills("title", value)}
          ariaLabel="Titolo skill"
        />
        {body || editing ? (
          <EditableText
            className="site-body skill-intro"
            value={body}
            editing={editing}
            multiline
            onChange={(value) => setSkills("body", value)}
            ariaLabel="Introduzione skill"
          />
        ) : null}

        <div ref={boardRef} className={`skill-panel${hot ? " is-hot" : ""}`}>
          <div className="skill-block">
            <EditableText
              className="site-eyebrow"
              value={skills.toolsEyebrow}
              editing={editing}
              onChange={(value) => setSkills("toolsEyebrow", value)}
              ariaLabel="Etichetta software"
            />
            {tools.length ? (
              <ul className={`skill-tools${editing ? " is-editing" : ""}`}>
                {tools.map((tool, index) => {
                  const timing = beat("tools", index)
                  return (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      hot={hot}
                      delay={timing.delay}
                      duration={timing.duration}
                      editing={editing}
                      onMark={(value) => setSkillTool(tool.id, "mark", value)}
                      onName={(value) => setSkillTool(tool.id, "name", value)}
                      onLevel={(value) => setSkillTool(tool.id, "level", value)}
                      onRemove={() => removeSkillTool(tool.id)}
                    />
                  )
                })}
              </ul>
            ) : (
              <p className="skill-empty">Nessuno strumento inserito.</p>
            )}
            {editing ? (
              <button type="button" className="btn-secondary skill-add" onClick={addSkillTool}>
                <Plus size={16} aria-hidden />
                Aggiungi strumento
              </button>
            ) : null}
          </div>

          <div className="skill-block">
            <EditableText
              className="site-eyebrow"
              value={skills.supportsEyebrow}
              editing={editing}
              onChange={(value) => setSkills("supportsEyebrow", value)}
              ariaLabel="Etichetta supporti"
            />
            {supports.length ? (
              <ul className={`skill-supports${editing ? " is-editing" : ""}`}>
                {supports.map((item, index) => {
                  const timing = beat("supports", index)
                  return (
                    <MeterRow
                      key={item.id}
                      item={item}
                      hot={hot}
                      delay={timing.delay}
                      duration={timing.duration}
                      editing={editing}
                      compact
                      onName={(value) => setSkillSupport(item.id, "name", value)}
                      onLevel={(value) => setSkillSupport(item.id, "level", value)}
                      onRemove={() => removeSkillSupport(item.id)}
                    />
                  )
                })}
              </ul>
            ) : (
              <p className="skill-empty">Nessun supporto inserito.</p>
            )}
            {editing ? (
              <button type="button" className="btn-secondary skill-add" onClick={addSkillSupport}>
                <Plus size={16} aria-hidden />
                Aggiungi supporto
              </button>
            ) : null}
          </div>

          <div className="skill-block">
            <EditableText
              className="site-eyebrow"
              value={skills.craftsEyebrow}
              editing={editing}
              onChange={(value) => setSkills("craftsEyebrow", value)}
              ariaLabel="Etichetta mestiere"
            />
            {crafts.length ? (
              <ul className={`skill-crafts${editing ? " is-editing" : ""}`}>
                {crafts.map((craft, index) => {
                  const timing = beat("crafts", index)
                  return (
                    <MeterRow
                      key={craft.id}
                      item={craft}
                      hot={hot}
                      delay={timing.delay}
                      duration={timing.duration}
                      editing={editing}
                      onName={(value) => setSkillCraft(craft.id, "name", value)}
                      onLevel={(value) => setSkillCraft(craft.id, "level", value)}
                      onRemove={() => removeSkillCraft(craft.id)}
                    />
                  )
                })}
              </ul>
            ) : (
              <p className="skill-empty">Nessuna competenza inserita.</p>
            )}
            {editing ? (
              <button type="button" className="btn-secondary skill-add" onClick={addSkillCraft}>
                <Plus size={16} aria-hidden />
                Aggiungi competenza
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </SiteSection>
  )
}
