import { Plus, X } from "lucide-react"
import { useSite } from "../context/SiteContentProvider"
import { EditableText, InlineEdit } from "./EditableText"
import SiteSection from "./SiteSection"

const RING_RADIUS = 34
const RING_LENGTH = 2 * Math.PI * RING_RADIUS

function SkillRing({ mark, level }) {
  const pct = Math.max(0, Math.min(level, 5)) / 5
  const dash = `${RING_LENGTH * pct} ${RING_LENGTH}`

  return (
    <div className="skill-ring" aria-hidden="true">
      <svg viewBox="0 0 88 88" className="skill-ring-svg">
        <circle className="skill-ring-track" cx="44" cy="44" r={RING_RADIUS} />
        <circle
          className="skill-ring-value"
          cx="44"
          cy="44"
          r={RING_RADIUS}
          strokeDasharray={dash}
          transform="rotate(-90 44 44)"
        />
      </svg>
      <span className="skill-ring-mark">{mark}</span>
    </div>
  )
}

function SkillMeter({ name, level, editing, onChange }) {
  return (
    <div
      className="skill-meter"
      role={editing ? "group" : "img"}
      aria-label={`${name}: ${level} su 5`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const value = index + 1
        const on = value <= level
        if (!editing) {
          return <span key={value} className={`skill-dot${on ? " is-on" : ""}`} />
        }
        return (
          <button
            key={value}
            type="button"
            className={`skill-dot${on ? " is-on" : ""}`}
            aria-label={`Livello ${value} su 5`}
            aria-pressed={level === value}
            onClick={() => onChange(level === value ? 0 : value)}
          />
        )
      })}
    </div>
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
    setSkillCraft,
    addSkillCraft,
    removeSkillCraft,
  } = useSite()
  const skills = display.skills ?? { tools: [], crafts: [] }
  const tools = skills.tools ?? []
  const crafts = skills.crafts ?? []
  const body = skills.body ?? ""

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

        <div className="skill-panel">
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
                {tools.map((tool) => (
                  <li
                    key={tool.id}
                    className="skill-tool"
                    aria-label={editing ? undefined : `${tool.name}: ${tool.level} su 5`}
                  >
                    <SkillRing mark={tool.mark || "Aa"} level={tool.level} />
                    {editing ? (
                      <>
                        <input
                          className="site-edit-field skill-mark-input"
                          value={tool.mark}
                          maxLength={3}
                          aria-label={`Sigla ${tool.name}`}
                          onChange={(event) => setSkillTool(tool.id, "mark", event.target.value)}
                        />
                        <input
                          className="site-edit-field"
                          value={tool.name}
                          aria-label={`Nome strumento ${tool.mark}`}
                          onChange={(event) => setSkillTool(tool.id, "name", event.target.value)}
                        />
                        <SkillMeter
                          name={tool.name}
                          level={tool.level}
                          editing
                          onChange={(value) => setSkillTool(tool.id, "level", value)}
                        />
                        <button
                          type="button"
                          className="site-tag-remove"
                          aria-label={`Rimuovi ${tool.name || "strumento"}`}
                          onClick={() => removeSkillTool(tool.id)}
                        >
                          <X size={14} aria-hidden />
                        </button>
                      </>
                    ) : (
                      <p className="skill-tool-name">{tool.name}</p>
                    )}
                  </li>
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
                {crafts.map((craft) => (
                  <li key={craft.id} className="skill-craft">
                    {editing ? (
                      <>
                        <InlineEdit
                          value={craft.name}
                          editing
                          onChange={(value) => setSkillCraft(craft.id, "name", value)}
                          ariaLabel="Nome competenza"
                        />
                        <SkillMeter
                          name={craft.name}
                          level={craft.level}
                          editing
                          onChange={(value) => setSkillCraft(craft.id, "level", value)}
                        />
                        <button
                          type="button"
                          className="site-tag-remove"
                          aria-label={`Rimuovi ${craft.name || "competenza"}`}
                          onClick={() => removeSkillCraft(craft.id)}
                        >
                          <X size={14} aria-hidden />
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="skill-craft-name">{craft.name}</span>
                        <SkillMeter name={craft.name} level={craft.level} editing={false} />
                      </>
                    )}
                  </li>
                ))}
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
