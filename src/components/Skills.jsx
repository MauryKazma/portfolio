import { Plus, X } from "lucide-react"
import { clampSkillPercent } from "../data/siteDefault"
import { useSite } from "../context/SiteContentProvider"
import { EditableText, InlineEdit, TagEditor } from "./EditableText"
import SiteSection from "./SiteSection"

/**
 * In vetrina gli strumenti sono un elenco. Il livello resta un dato
 * d'editor: regola la barra solo in `?edit=1`.
 */
function skillLevel(percent) {
  if (percent >= 85) return "Esperto"
  if (percent >= 70) return "Avanzato"
  if (percent >= 55) return "Buono"
  return "Base"
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

function ToolChip({ tool }) {
  return (
    <li className="skill-tool">
      <ToolIcon tool={tool} />
      <span className="skill-tool-name">{tool.name}</span>
    </li>
  )
}

function ToolMeter({ tool, editing, onMark, onName, onLevel, onRemove }) {
  const percent = clampSkillPercent(tool.level)
  const level = skillLevel(percent)

  if (!editing) return <ToolChip tool={tool} />

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
      <p className="skill-meter-level">{level}</p>
      <SkillPercentField name={tool.name} value={percent} onChange={onLevel} />
    </li>
  )
}

function SkillTagGroup({
  eyebrow,
  tags,
  editing,
  onEyebrow,
  onRename,
  onAdd,
  onRemove,
  eyebrowLabel,
  addLabel,
  alwaysShow,
}) {
  if (!tags.length && !editing && !alwaysShow) return null

  return (
    <div className="skill-traits">
      <EditableText
        className="site-eyebrow"
        value={eyebrow}
        editing={editing}
        onChange={onEyebrow}
        ariaLabel={eyebrowLabel}
      />
      <TagEditor
        tags={tags}
        editing={editing}
        listClassName="toolkit-list"
        addLabel={addLabel}
        onRename={onRename}
        onAdd={onAdd}
        onRemove={onRemove}
      />
    </div>
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
    setSkillUseful,
    addSkillUseful,
    removeSkillUseful,
  } = useSite()
  const skills = display.skills ?? { disciplines: [], tools: [], traits: [], useful: [] }
  const disciplines = skills.disciplines ?? []
  const tools = skills.tools ?? []
  const traits = skills.traits ?? []
  const useful = skills.useful ?? []
  const body = skills.body ?? ""

  return (
    <SiteSection id="skill" className="scroll-mt-24" wash aria-labelledby="skill-title">
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
              <ul className={editing ? "skill-meters" : "skill-tools"}>
                {tools.map((tool) => (
                  <ToolMeter
                    key={tool.id}
                    tool={tool}
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

            <SkillTagGroup
              eyebrow={skills.usefulEyebrow ?? "Competenze utili"}
              tags={useful}
              editing={editing}
              alwaysShow
              onEyebrow={(value) => setSkills("usefulEyebrow", value)}
              onRename={setSkillUseful}
              onAdd={addSkillUseful}
              onRemove={removeSkillUseful}
              eyebrowLabel="Etichetta competenze utili"
              addLabel="Nuova competenza"
            />

            <SkillTagGroup
              eyebrow={skills.traitsEyebrow ?? "Attitudine al lavoro"}
              tags={traits}
              editing={editing}
              onEyebrow={(value) => setSkills("traitsEyebrow", value)}
              onRename={setSkillTrait}
              onAdd={addSkillTrait}
              onRemove={removeSkillTrait}
              eyebrowLabel="Etichetta attitudine"
              addLabel="Nuovo tratto"
            />
          </div>
        </div>
      </div>
    </SiteSection>
  )
}
