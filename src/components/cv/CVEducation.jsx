import { useCV } from "../../context/CVProvider"
import { byOrder, formatPeriod } from "../../utils/cv"
import { glueItalianWrap } from "../../utils/typography"
import { TagEditor } from "../EditableText"
import { AddButton, CVField, CVTextarea, ListToolbar, useSortable } from "./cvUi"

function EducationView({ item }) {
  const tags = (item.tags ?? []).filter((tag) => String(tag).trim())

  return (
    <article className="cv-entry">
      <p className="cv-eyebrow">{formatPeriod(item.startDate, item.endDate, false)}</p>
      <h4 className="cv-entry-title">{item.title}</h4>
      <p className="cv-entry-meta">
        {[item.institute, item.location].filter(Boolean).join(" · ")}
      </p>
      {item.fieldOfStudy ? (
        <p className="cv-body">Campo di studio: {item.fieldOfStudy}</p>
      ) : null}
      {item.description ? <p className="cv-body">{glueItalianWrap(item.description)}</p> : null}
      {item.link ? (
        <p className="cv-body">
          <a href={item.link} target="_blank" rel="noreferrer">
            {item.link}
          </a>
        </p>
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

function EducationEdit({ item, index, total }) {
  const {
    errors,
    updateEducation,
    removeEducation,
    moveEducation,
    setEducationTag,
    addEducationTag,
    removeEducationTag,
    setDialog,
  } = useCV()
  const sortable = useSortable(index, moveEducation)
  const err = (field) => errors[`education.${item.id}.${field}`]

  return (
    <article className="cv-card" {...sortable.itemProps}>
      <div className="cv-card-head">
        <p className="cv-card-kicker">Percorso {index + 1}</p>
        <ListToolbar
          dragHandleProps={sortable.handleProps}
          onMoveUp={() => moveEducation(index, index - 1)}
          onMoveDown={() => moveEducation(index, index + 1)}
          disableUp={index === 0}
          disableDown={index === total - 1}
          removeLabel="Elimina percorso formativo"
          onRemove={() =>
            setDialog({
              title: "Eliminare questo percorso formativo?",
              message: "Il titolo verrà rimosso. L’azione è definitiva dopo il salvataggio.",
              confirmLabel: "Elimina",
              onConfirm: () => removeEducation(item.id),
            })
          }
        />
      </div>
      <div className="cv-form-grid">
        <CVField
          id={`${item.id}-title`}
          label="Titolo o qualifica"
          required
          value={item.title}
          error={err("title")}
          onChange={(value) => updateEducation(item.id, "title", value)}
        />
        <CVField
          id={`${item.id}-institute`}
          label="Istituto"
          required
          value={item.institute}
          error={err("institute")}
          onChange={(value) => updateEducation(item.id, "institute", value)}
        />
        <CVField
          id={`${item.id}-start`}
          label="Data di inizio"
          type="date"
          optional
          value={item.startDate}
          error={err("startDate")}
          onChange={(value) => updateEducation(item.id, "startDate", value)}
        />
        <CVField
          id={`${item.id}-end`}
          label="Data di fine"
          type="date"
          optional
          value={item.endDate}
          error={err("endDate")}
          onChange={(value) => updateEducation(item.id, "endDate", value)}
        />
        <CVField
          id={`${item.id}-location`}
          label="Località"
          optional
          value={item.location}
          onChange={(value) => updateEducation(item.id, "location", value)}
        />
        <CVField
          id={`${item.id}-field`}
          label="Campo di studio"
          optional
          value={item.fieldOfStudy}
          onChange={(value) => updateEducation(item.id, "fieldOfStudy", value)}
        />
        <CVField
          id={`${item.id}-link`}
          label="Link"
          type="url"
          optional
          value={item.link}
          error={err("link")}
          onChange={(value) => updateEducation(item.id, "link", value)}
        />
      </div>
      <CVTextarea
        id={`${item.id}-desc`}
        label="Descrizione"
        optional
        value={item.description}
        onChange={(value) => updateEducation(item.id, "description", value)}
      />
      <div className="cv-field">
        <p className="cv-label" id={`${item.id}-tags-label`}>
          Programmi usati
          <span className="cv-optional"> opzionale</span>
        </p>
        <TagEditor
          tags={item.tags ?? []}
          editing
          onRename={(tagIndex, value) => setEducationTag(item.id, tagIndex, value)}
          onAdd={(label) => addEducationTag(item.id, label)}
          onRemove={(tagIndex) => removeEducationTag(item.id, tagIndex)}
          listClassName="cv-chip-list"
          addLabel="Aggiungi programma"
        />
      </div>
    </article>
  )
}

export default function CVEducation() {
  const { display, editing, addEducation } = useCV()
  const items = byOrder(display.education)

  return (
    <section className="cv-block" aria-labelledby="cv-edu-title">
      <div className="cv-block-head">
        <h3 id="cv-edu-title" className="cv-block-title">
          Istruzione e formazione
        </h3>
        {editing ? (
          <AddButton onClick={addEducation}>Aggiungi percorso</AddButton>
        ) : null}
      </div>
      {items.length === 0 ? (
        <p className="cv-empty">Nessun percorso formativo inserito.</p>
      ) : (
        <div className="cv-stack">
          {items.map((item, index) =>
            editing ? (
              <EducationEdit
                key={item.id}
                item={item}
                index={index}
                total={items.length}
              />
            ) : (
              <EducationView key={item.id} item={item} />
            )
          )}
        </div>
      )}
    </section>
  )
}
