import { useCV } from "../../context/CVProvider"
import { byOrder } from "../../utils/cv"
import { glueItalianWrap } from "../../utils/typography"
import { AddButton, CVField, CVTextarea, ListToolbar, useSortable } from "./cvUi"

function InterpersonalEdit({ item, index, total }) {
  const {
    errors,
    updateInterpersonal,
    removeInterpersonal,
    moveInterpersonal,
    setDialog,
  } = useCV()
  const sortable = useSortable(index, moveInterpersonal)

  return (
    <article className="cv-card" {...sortable.itemProps}>
      <div className="cv-card-head">
        <p className="cv-card-kicker">Competenza {index + 1}</p>
        <ListToolbar
          dragHandleProps={sortable.handleProps}
          onMoveUp={() => moveInterpersonal(index, index - 1)}
          onMoveDown={() => moveInterpersonal(index, index + 1)}
          disableUp={index === 0}
          disableDown={index === total - 1}
          removeLabel="Elimina competenza interpersonale"
          onRemove={() =>
            setDialog({
              title: "Eliminare questa competenza?",
              message: "La voce verrà rimossa.",
              confirmLabel: "Elimina",
              onConfirm: () => removeInterpersonal(item.id),
            })
          }
        />
      </div>
      <CVField
        id={`${item.id}-name`}
        label="Categoria"
        required
        value={item.name}
        error={errors[`interpersonalSkills.${item.id}.name`]}
        onChange={(value) => updateInterpersonal(item.id, "name", value)}
      />
      <CVTextarea
        id={`${item.id}-desc`}
        label="Descrizione"
        optional
        value={item.description}
        onChange={(value) => updateInterpersonal(item.id, "description", value)}
      />
    </article>
  )
}

export default function CVOther() {
  const { display, editing, updateSimple, addInterpersonal } = useCV()
  const items = byOrder(display.interpersonalSkills)

  return (
    <>
      <section className="cv-block" aria-labelledby="cv-licence-title">
        <h3 id="cv-licence-title" className="cv-block-title">
          Patente di guida
        </h3>
        {editing ? (
          <CVField
            id="cv-licence"
            label="Categoria"
            optional
            value={display.drivingLicence}
            onChange={(value) => updateSimple("drivingLicence", value)}
          />
        ) : display.drivingLicence ? (
          <p className="cv-body">Categoria {display.drivingLicence}</p>
        ) : (
          <p className="cv-empty">Nessuna patente indicata.</p>
        )}
      </section>

      <section className="cv-block" aria-labelledby="cv-inter-title">
        <div className="cv-block-head">
          <h3 id="cv-inter-title" className="cv-block-title">
            Competenze comunicative e interpersonali
          </h3>
          {editing ? (
            <AddButton onClick={addInterpersonal}>Aggiungi competenza</AddButton>
          ) : null}
        </div>
        {items.length === 0 ? (
          <p className="cv-empty">Nessuna competenza inserita.</p>
        ) : editing ? (
          <div className="cv-stack">
            {items.map((item, index) => (
              <InterpersonalEdit
                key={item.id}
                item={item}
                index={index}
                total={items.length}
              />
            ))}
          </div>
        ) : (
          <div className="cv-stack">
            {items.map((item) => (
              <article key={item.id} className="cv-entry">
                <h4 className="cv-entry-title">{item.name}</h4>
                {item.description ? (
                  <p className="cv-prose">{glueItalianWrap(item.description)}</p>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
