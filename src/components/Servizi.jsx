import { useSite } from "../context/SiteContentProvider"
import { EditableText, InlineEdit } from "./EditableText"
import SiteSection from "./SiteSection"

export default function Servizi() {
  const { display, editing, setServizi, setPhase } = useSite()
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
          {phases.map((phase) => (
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
              </article>
            </li>
          ))}
        </ul>
      </div>
    </SiteSection>
  )
}
