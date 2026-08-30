import { useCV } from "../../context/CVProvider"
import { byOrder, formatPeriod } from "../../utils/cv"
import { glueItalianWrap } from "../../utils/typography"
import { TagEditor } from "../EditableText"
import {
  AddButton,
  CVCheckbox,
  CVField,
  CVTextarea,
  ListToolbar,
  useSortable,
} from "./cvUi"

function ExperienceView({ item }) {
  const tags = (item.tags ?? []).filter((tag) => String(tag).trim())

  return (
    <article className="cv-entry">
      <p className="cv-eyebrow">
        {formatPeriod(item.startDate, item.endDate, item.current)}
      </p>
      <h4 className="cv-entry-title">{item.role}</h4>
      <p className="cv-entry-meta">
        {[item.company, item.location].filter(Boolean).join(" · ")}
      </p>
      {item.description ? (
        <p className="cv-body">{glueItalianWrap(item.description)}</p>
      ) : null}
      {tags.length ? (
        <ul className="cv-chip-list" aria-label="Programmi usati">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}

function ExperienceEdit({ item, index, total }) {
  const {
    errors,
    updateExperience,
    removeExperience,
    moveExperience,
    setExperienceTag,
    addExperienceTag,
    removeExperienceTag,
    setDialog,
  } = useCV()
  const sortable = useSortable(index, moveExperience)
  const err = (field) => errors[`experiences.${item.id}.${field}`]

  return (
    <article className="cv-card" {...sortable.itemProps}>
      <div className="cv-card-head">
        <p className="cv-card-kicker">Esperienza {index + 1}</p>
        <ListToolbar
          dragHandleProps={sortable.handleProps}
          onMoveUp={() => moveExperience(index, index - 1)}
          onMoveDown={() => moveExperience(index, index + 1)}
          disableUp={index === 0}
          disableDown={index === total - 1}
          removeLabel="Elimina esperienza"
          onRemove={() =>
            setDialog({
              title: "Eliminare questa esperienza?",
              message: `L’esperienza ${item.role ? `di ${item.role}` : ""} ${
                item.company ? `presso ${item.company}` : ""
              } verrà rimossa. L’azione è definitiva dopo il salvataggio.`.replace(
                /\s+/g,
                " "
              ),
              confirmLabel: "Elimina",
              onConfirm: () => removeExperience(item.id),
            })
          }
        />
      </div>
      <div className="cv-form-grid">
        <CVField
          id={`${item.id}-role`}
          label="Ruolo"
          required
          value={item.role}
          error={err("role")}
          onChange={(value) => updateExperience(item.id, "role", value)}
        />
        <CVField
          id={`${item.id}-company`}
          label="Azienda"
          required
          value={item.company}
          error={err("company")}
          onChange={(value) => updateExperience(item.id, "company", value)}
        />
        <CVField
          id={`${item.id}-start`}
          label="Data di inizio"
          type="date"
          required
          value={item.startDate}
          error={err("startDate")}
          onChange={(value) => updateExperience(item.id, "startDate", value)}
        />
        <CVField
          id={`${item.id}-end`}
          label="Data di fine"
          type="date"
          optional
          disabled={item.current}
          value={item.current ? "" : item.endDate}
          error={err("endDate")}
          onChange={(value) => updateExperience(item.id, "endDate", value)}
        />
        <CVField
          id={`${item.id}-location`}
          label="Località"
          optional
          placeholder="Non specificata"
          value={item.location}
          onChange={(value) => updateExperience(item.id, "location", value)}
        />
        <div className="cv-field cv-field-check">
          <CVCheckbox
            id={`${item.id}-current`}
            label="Posizione attuale"
            checked={item.current}
            onChange={(value) => updateExperience(item.id, "current", value)}
          />
        </div>
      </div>
      <CVTextarea
        id={`${item.id}-desc`}
        label="Mansione svolta"
        optional
        placeholder="Indica cosa hai fatto in questo posto. Lascia vuoto se non vuoi indicarlo."
        value={item.description}
        onChange={(value) => updateExperience(item.id, "description", value)}
      />
      <div className="cv-field">
        <p className="cv-label" id={`${item.id}-tags-label`}>
          Programmi usati
          <span className="cv-optional"> opzionale</span>
        </p>
        <TagEditor
          tags={item.tags ?? []}
          editing
          onRename={(tagIndex, value) => setExperienceTag(item.id, tagIndex, value)}
          onAdd={(label) => addExperienceTag(item.id, label)}
          onRemove={(tagIndex) => removeExperienceTag(item.id, tagIndex)}
          listClassName="cv-chip-list"
          addLabel="Aggiungi programma"
        />
      </div>
    </article>
  )
}

export default function CVExperience() {
  const { display, editing, addExperience } = useCV()
  const items = byOrder(display.experiences)

  return (
    <section className="cv-block" aria-labelledby="cv-exp-title">
      <div className="cv-block-head">
        <h3 id="cv-exp-title" className="cv-block-title">
          Esperienza lavorativa
        </h3>
        {editing ? (
          <AddButton onClick={addExperience}>Aggiungi esperienza</AddButton>
        ) : null}
      </div>
      {items.length === 0 ? (
        <p className="cv-empty">Nessuna esperienza inserita.</p>
      ) : (
        <div className="cv-stack">
          {items.map((item, index) =>
            editing ? (
              <ExperienceEdit
                key={item.id}
                item={item}
                index={index}
                total={items.length}
              />
            ) : (
              <ExperienceView key={item.id} item={item} />
            )
          )}
        </div>
      )}
    </section>
  )
}
