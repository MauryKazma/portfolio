import { useSite } from "../context/SiteContentProvider"
import { EditableText, InlineEdit, TagEditor } from "./EditableText"
import SiteSection from "./SiteSection"

export default function Servizi() {
  const {
    display,
    editing,
    setServizi,
    setPhase,
    setPhaseDeliverable,
    addPhaseDeliverable,
    removePhaseDeliverable,
  } = useSite()
  const phases = display.servizi.phases

  return (
    <SiteSection id="servizi" className="scroll-mt-24" field aria-labelledby="servizi-title">
      <div className="site-content service-board">
        <EditableText
          className="site-eyebrow"
          value={display.servizi.eyebrow}
          editing={editing}
          onChange={(value) => setServizi("eyebrow", value)}
          ariaLabel="Etichetta metodo"
        />
        <EditableText
          as="h2"
          id="servizi-title"
          className="site-headline"
          value={display.servizi.title}
          editing={editing}
          onChange={(value) => setServizi("title", value)}
          ariaLabel="Titolo servizi"
        />

        <ul className="phase-list">
          {phases.map((phase) => {
            const deliverables = phase.deliverables ?? []
            return (
              <li key={phase.id}>
                <article className="phase-card" id={`fase-${phase.id}`}>
                  <p className="site-eyebrow">
                    <InlineEdit
                      value={phase.number}
                      editing={editing}
                      onChange={(value) => setPhase(phase.id, "number", value)}
                      ariaLabel={`Numero offerta ${phase.title}`}
                    />
                  </p>
                  <h3 className="phase-title">
                    <InlineEdit
                      value={phase.title}
                      editing={editing}
                      onChange={(value) => setPhase(phase.id, "title", value)}
                      ariaLabel={`Titolo offerta ${phase.number}`}
                    />
                  </h3>
                  <EditableText
                    className="site-body"
                    value={phase.body}
                    editing={editing}
                    multiline
                    onChange={(value) => setPhase(phase.id, "body", value)}
                    ariaLabel={`Testo offerta ${phase.title}`}
                  />
                  {deliverables.length || editing ? (
                    <div className="phase-deliverables">
                      <p className="site-eyebrow">Cosa consegno</p>
                      <TagEditor
                        tags={deliverables}
                        editing={editing}
                        listClassName="chip-list"
                        addLabel="Nuovo deliverable"
                        onRename={(index, value) =>
                          setPhaseDeliverable(phase.id, index, value)
                        }
                        onAdd={(label) => addPhaseDeliverable(phase.id, label)}
                        onRemove={(index) => removePhaseDeliverable(phase.id, index)}
                      />
                    </div>
                  ) : null}
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </SiteSection>
  )
}
