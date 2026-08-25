import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { useSite } from "../context/SiteContentProvider"
import { EditableText, InlineEdit } from "./EditableText"
import SiteSection from "./SiteSection"

export default function Servizi() {
  const { display, editing, setServizi, setPhase } = useSite()
  const phases = display.servizi.phases
  const [openId, setOpenId] = useState(null)

  const toggle = (id) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <SiteSection id="servizi" className="scroll-mt-24" tone="spot" aria-labelledby="servizi-title">
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
            const isOpen = editing || openId === phase.id

            return (
              <li key={phase.id}>
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(phase.id)}
                    aria-expanded={isOpen}
                    aria-controls={`fase-${phase.id}`}
                  >
                    <InlineEdit
                      className="site-eyebrow"
                      value={phase.number}
                      editing={editing}
                      onChange={(value) => setPhase(phase.id, "number", value)}
                      ariaLabel={`Numero fase ${phase.title}`}
                    />
                    <InlineEdit
                      value={phase.title}
                      editing={editing}
                      onChange={(value) => setPhase(phase.id, "title", value)}
                      ariaLabel={`Titolo fase ${phase.number}`}
                    />
                    <span className="phase-icon">
                      {isOpen ? (
                        <Minus size={16} aria-hidden />
                      ) : (
                        <Plus size={16} aria-hidden />
                      )}
                    </span>
                  </button>
                </h3>
                <div
                  id={`fase-${phase.id}`}
                  role="region"
                  className={`phase-panel${isOpen ? " is-open" : ""}`}
                  inert={!isOpen ? true : undefined}
                >
                  <div className="phase-panel-inner">
                    <EditableText
                      className="site-body"
                      value={phase.body}
                      editing={editing}
                      multiline
                      onChange={(value) => setPhase(phase.id, "body", value)}
                      ariaLabel={`Testo fase ${phase.title}`}
                    />
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </SiteSection>
  )
}
