import { useCV } from "../../context/CVProvider"
import { byOrder } from "../../utils/cv"
import { glueItalianWrap } from "../../utils/typography"
import { AddButton, CVField, IconButton, ListToolbar, useSortable } from "./cvUi"
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react"

function SkillItemEdit({ category, item, index, total }) {
  const { errors, updateSkillItem, removeSkillItem, moveSkillItem, setDialog } = useCV()
  const error = errors[`digitalSkills.${category.id}.items.${item.id}.name`]

  return (
    <li className="cv-skill-row">
      <CVField
        id={`${item.id}-name`}
        label={`Competenza ${index + 1}`}
        required
        value={item.name}
        error={error}
        onChange={(value) => updateSkillItem(category.id, item.id, value)}
      />
      <div className="cv-skill-row-actions">
        <IconButton
          label="Sposta su"
          disabled={index === 0}
          onClick={() => moveSkillItem(category.id, index, index - 1)}
        >
          <ChevronUp size={16} aria-hidden />
        </IconButton>
        <IconButton
          label="Sposta giù"
          disabled={index === total - 1}
          onClick={() => moveSkillItem(category.id, index, index + 1)}
        >
          <ChevronDown size={16} aria-hidden />
        </IconButton>
        <IconButton
          label="Elimina competenza"
          danger
          onClick={() =>
            setDialog({
              title: "Eliminare questa competenza?",
              message: "La competenza verrà rimossa dalla categoria.",
              confirmLabel: "Elimina",
              onConfirm: () => removeSkillItem(category.id, item.id),
            })
          }
        >
          <Trash2 size={16} aria-hidden />
        </IconButton>
      </div>
    </li>
  )
}

function CategoryEdit({ category, index, total }) {
  const {
    errors,
    updateSkillCategory,
    removeSkillCategory,
    moveSkillCategory,
    addSkillItem,
    setDialog,
  } = useCV()
  const sortable = useSortable(index, moveSkillCategory)
  const items = byOrder(category.items)

  return (
    <article className="cv-card" {...sortable.itemProps}>
      <div className="cv-card-head">
        <p className="cv-card-kicker">Categoria {index + 1}</p>
        <ListToolbar
          dragHandleProps={sortable.handleProps}
          onMoveUp={() => moveSkillCategory(index, index - 1)}
          onMoveDown={() => moveSkillCategory(index, index + 1)}
          disableUp={index === 0}
          disableDown={index === total - 1}
          removeLabel="Elimina categoria"
          onRemove={() =>
            setDialog({
              title: "Eliminare questa categoria?",
              message: "La categoria e tutte le competenze contenute verranno rimosse.",
              confirmLabel: "Elimina",
              onConfirm: () => removeSkillCategory(category.id),
            })
          }
        />
      </div>
      <CVField
        id={`${category.id}-name`}
        label="Nome categoria"
        required
        value={category.name}
        error={errors[`digitalSkills.${category.id}.name`]}
        onChange={(value) => updateSkillCategory(category.id, "name", value)}
      />
      <ul className="cv-skill-edit-list">
        {items.map((item, itemIndex) => (
          <SkillItemEdit
            key={item.id}
            category={category}
            item={item}
            index={itemIndex}
            total={items.length}
          />
        ))}
      </ul>
      <button type="button" className="cv-btn-add" onClick={() => addSkillItem(category.id)}>
        <Plus size={16} aria-hidden />
        Aggiungi competenza
      </button>
    </article>
  )
}

export default function CVSkills() {
  const { display, editing, addSkillCategory } = useCV()
  const categories = byOrder(display.digitalSkills)

  return (
    <section className="cv-block" aria-labelledby="cv-skills-title">
      <div className="cv-block-head">
        <h3 id="cv-skills-title" className="cv-block-title">
          Competenze digitali
        </h3>
        {editing ? (
          <AddButton onClick={addSkillCategory}>Aggiungi categoria</AddButton>
        ) : null}
      </div>
      {categories.length === 0 ? (
        <p className="cv-empty">Nessuna competenza inserita.</p>
      ) : editing ? (
        <div className="cv-stack">
          {categories.map((category, index) => (
            <CategoryEdit
              key={category.id}
              category={category}
              index={index}
              total={categories.length}
            />
          ))}
        </div>
      ) : (
        <div className="cv-skill-groups">
          {categories.map((category) => (
            <div key={category.id} className="cv-skill-group">
              <h4 className="cv-entry-title">{category.name}</h4>
              {category.description ? (
                <p className="cv-body">{glueItalianWrap(category.description)}</p>
              ) : null}
              {byOrder(category.items).length ? (
                <ul className="cv-chip-list">
                  {byOrder(category.items).map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="cv-empty">Nessuna competenza in questa categoria.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
