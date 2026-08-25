import { useCV } from "../../context/CVProvider"
import { byOrder } from "../../utils/cv"
import { AddButton, CVField, ListToolbar, useSortable } from "./cvUi"

const LEVEL_FIELDS = [
  ["listening", "Ascolto"],
  ["reading", "Lettura"],
  ["speaking", "Produzione orale"],
  ["interaction", "Interazione orale"],
  ["writing", "Scrittura"],
]

function LanguageView({ item }) {
  const levels = LEVEL_FIELDS.map(([key, label]) =>
    item[key] ? `${label} ${item[key]}` : null
  ).filter(Boolean)

  return (
    <article className="cv-entry">
      <h4 className="cv-entry-title">{item.name}</h4>
      {levels.length ? <p className="cv-body">{levels.join(" · ")}</p> : null}
    </article>
  )
}

function LanguageEdit({ item, index, total }) {
  const { errors, updateLanguage, removeLanguage, moveLanguage, setDialog } = useCV()
  const sortable = useSortable(index, moveLanguage)
  const err = (field) => errors[`languages.${item.id}.${field}`]

  return (
    <article className="cv-card" {...sortable.itemProps}>
      <div className="cv-card-head">
        <p className="cv-card-kicker">Lingua {index + 1}</p>
        <ListToolbar
          dragHandleProps={sortable.handleProps}
          onMoveUp={() => moveLanguage(index, index - 1)}
          onMoveDown={() => moveLanguage(index, index + 1)}
          disableUp={index === 0}
          disableDown={index === total - 1}
          removeLabel="Elimina lingua"
          onRemove={() =>
            setDialog({
              title: "Eliminare questa lingua?",
              message: "La competenza linguistica verrà rimossa.",
              confirmLabel: "Elimina",
              onConfirm: () => removeLanguage(item.id),
            })
          }
        />
      </div>
      <div className="cv-form-grid">
        <CVField
          id={`${item.id}-name`}
          label="Lingua"
          required
          value={item.name}
          error={err("name")}
          onChange={(value) => updateLanguage(item.id, "name", value)}
        />
        {LEVEL_FIELDS.map(([key, label]) => (
          <CVField
            key={key}
            id={`${item.id}-${key}`}
            label={label}
            optional
            value={item[key]}
            onChange={(value) => updateLanguage(item.id, key, value)}
          />
        ))}
      </div>
    </article>
  )
}

export default function CVLanguages() {
  const { display, editing, addLanguage } = useCV()
  const items = byOrder(display.languages)

  return (
    <section className="cv-block" aria-labelledby="cv-lang-title">
      <div className="cv-block-head">
        <h3 id="cv-lang-title" className="cv-block-title">
          Competenze linguistiche
        </h3>
        {editing ? <AddButton onClick={addLanguage}>Aggiungi lingua</AddButton> : null}
      </div>
      {items.length === 0 ? (
        <p className="cv-empty">Nessuna lingua inserita.</p>
      ) : (
        <div className="cv-stack">
          {items.map((item, index) =>
            editing ? (
              <LanguageEdit key={item.id} item={item} index={index} total={items.length} />
            ) : (
              <LanguageView key={item.id} item={item} />
            )
          )}
        </div>
      )}
    </section>
  )
}
