import { useEffect, useRef, useState } from "react"
import { Plus, X } from "lucide-react"
import { clampSkillPercent } from "../data/siteDefault"
import { useSite } from "../context/SiteContentProvider"
import { EditableText, InlineEdit, TagEditor } from "./EditableText"
import SiteSection from "./SiteSection"

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function useMeterReveal(instant) {
  const ref = useRef(null)
  const [hot, setHot] = useState(instant)

  useEffect(() => {
    if (instant || prefersReducedMotion()) {
      setHot(true)
      return undefined
    }

    const el = ref.current
    if (!el) return undefined

    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      setHot(true)
      return undefined
    }

    setHot(false)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setHot(true)
        observer.disconnect()
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [instant])

  return [ref, hot]
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

function ToolIcon({ tool }) {
  if (tool.icon) {
    return (
      <span className="skill-meter-icon">
        <img src={tool.icon} alt="" width={36} height={36} decoding="async" />
      </span>
    )
  }
  return <span className="skill-meter-sigla">{tool.mark || "—"}</span>
}

function ToolMeter({ tool, hot, delay, editing, onMark, onName, onLevel, onRemove }) {
  const percent = clampSkillPercent(tool.level)

  if (editing) {
    return (
      <li className="skill-meter skill-meter--edit">
        <div className="skill-meter-edit">
          <ToolIcon tool={tool} />
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
          <button
            type="button"
            className="site-tag-remove"
            aria-label={`Rimuovi ${tool.name || "strumento"}`}
            onClick={onRemove}
          >
            <X size={14} aria-hidden />
          </button>
        </div>
        <SkillPercentField name={tool.name} value={percent} onChange={onLevel} />
      </li>
    )
  }

  return (
    <li className="skill-meter">
      <ToolIcon tool={tool} />
      <div className="skill-meter-copy">
        <div className="skill-meter-head">
          <span className="skill-meter-name">{tool.name}</span>
          <span className="skill-meter-pct">{percent}%</span>
        </div>
        <div
          className={`skill-meter-track${hot ? " is-hot" : ""}`}
          role="progressbar"
          aria-label={tool.name}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
        >
          <span
            className="skill-meter-fill"
            style={{
              "--skill-pct": `${percent}%`,
              "--skill-delay": `${delay}ms`,
            }}
          />
        </div>
      </div>
    </li>
  )
}

export default function Skills() {
  const {
    display,
    editing,
    setSkills,
    setSkillDiscipline,
    setSkillTool,
    addSkillTool,
    removeSkillTool,
    setSkillTrait,
    addSkillTrait,
    removeSkillTrait,
  } = useSite()
  const skills = display.skills ?? { disciplines: [], tools: [], traits: [] }
  const disciplines = skills.disciplines ?? []
  const tools = skills.tools ?? []
  const traits = skills.traits ?? []
  const body = skills.body ?? ""
  const [metersRef, hot] = useMeterReveal(editing)

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

        <div className="skill-panel skill-split">
          <div className="skill-split-craft">
            <EditableText
              className="site-eyebrow"
              value={skills.craftEyebrow ?? "Mestiere"}
              editing={editing}
              onChange={(value) => setSkills("craftEyebrow", value)}
              ariaLabel="Etichetta mestiere"
            />
            {disciplines.length ? (
              <ul className="skill-rows">
                {disciplines.map((item) => (
                  <li key={item.id} className="skill-row">
                    {editing ? (
                      <InlineEdit
                        as="h3"
                        className="skill-row-title"
                        value={item.title}
                        editing
                        onChange={(value) => setSkillDiscipline(item.id, "title", value)}
                        ariaLabel={`Titolo riga ${item.title}`}
                      />
                    ) : (
                      <h3 className="skill-row-title">{item.title}</h3>
                    )}
                    <EditableText
                      className="site-body skill-row-body"
                      value={item.body}
                      editing={editing}
                      multiline
                      onChange={(value) => setSkillDiscipline(item.id, "body", value)}
                      ariaLabel={`Testo riga ${item.title}`}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="skill-empty">Nessuna competenza inserita.</p>
            )}
          </div>

          <div className="skill-split-tools">
            <EditableText
              className="site-eyebrow"
              value={skills.toolsEyebrow ?? "Software"}
              editing={editing}
              onChange={(value) => setSkills("toolsEyebrow", value)}
              ariaLabel="Etichetta software"
            />
            {tools.length ? (
              <ul ref={metersRef} className={`skill-meters${hot ? " is-hot" : ""}`}>
                {tools.map((tool, index) => (
                  <ToolMeter
                    key={tool.id}
                    tool={tool}
                    hot={hot}
                    delay={index * 70}
                    editing={editing}
                    onMark={(value) => setSkillTool(tool.id, "mark", value)}
                    onName={(value) => setSkillTool(tool.id, "name", value)}
                    onLevel={(value) => setSkillTool(tool.id, "level", value)}
                    onRemove={() => removeSkillTool(tool.id)}
                  />
                ))}
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

            {traits.length || editing ? (
              <div className="skill-traits">
                <EditableText
                  className="site-eyebrow"
                  value={skills.traitsEyebrow ?? "In studio"}
                  editing={editing}
                  onChange={(value) => setSkills("traitsEyebrow", value)}
                  ariaLabel="Etichetta tratti"
                />
                <TagEditor
                  tags={traits}
                  editing={editing}
                  listClassName="toolkit-list"
                  addLabel="Nuovo tratto"
                  onRename={setSkillTrait}
                  onAdd={addSkillTrait}
                  onRemove={removeSkillTrait}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </SiteSection>
  )
}
