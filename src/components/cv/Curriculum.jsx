import { lazy, Suspense } from "react"
import { useCV } from "../../context/CVProvider"
import { useSite } from "../../context/SiteContentProvider"
import { useEditorAccess } from "../../hooks/useEditorAccess"
import { byOrder, formatPeriod } from "../../utils/cv"
import { EditableText } from "../EditableText"
import SiteSection from "../SiteSection"
import { PrimaryButton, SecondaryButton } from "./cvUi"

const CVFull = lazy(() => import("./CVFull"))

function ExperiencePeek({ item }) {
  return (
    <article className="cv-entry">
      <p className="cv-eyebrow">{formatPeriod(item.startDate, item.endDate, item.current)}</p>
      <h3 className="cv-entry-title">{item.company || item.role}</h3>
      <p className="cv-entry-meta">{item.role}</p>
    </article>
  )
}

export default function Curriculum() {
  const {
    display,
    editing,
    dirty,
    status,
    errors,
    expanded,
    expand,
    collapse,
    startEdit,
    requestCancel,
    save,
    requestRestore,
  } = useCV()
  const { display: site, editing: siteEditing, setCv } = useSite()
  const canEdit = useEditorAccess()
  const errorCount = Object.keys(errors).length
  const showFull = expanded || editing
  const peek = byOrder(display.experiences).slice(0, 2)
  const openLabel = site.cv?.openLabel ?? "Apri curriculum"
  const closeLabel = site.cv?.closeLabel ?? "Chiudi curriculum"

  const openAndEdit = () => {
    expand()
    startEdit()
  }

  return (
    <SiteSection
      id="curriculum"
      className="cv-section scroll-mt-24"
      field
      aria-labelledby="cv-title"
    >
      <div className="site-content">
        <header className="cv-hero">
          <EditableText
            className="site-eyebrow"
            value={site.cv?.eyebrow ?? "Curriculum vitae"}
            editing={siteEditing}
            onChange={(value) => setCv("eyebrow", value)}
            ariaLabel="Etichetta curriculum"
          />
          <EditableText
            as="h2"
            id="cv-title"
            className="site-headline"
            value={site.cv?.title ?? "Studi e agenzie."}
            editing={siteEditing}
            onChange={(value) => setCv("title", value)}
            ariaLabel="Titolo curriculum"
          />
          <div className="cv-toolbar">
            {editing ? (
              <>
                <PrimaryButton onClick={save}>Salva</PrimaryButton>
                <SecondaryButton onClick={requestCancel}>Annulla</SecondaryButton>
                <SecondaryButton onClick={requestRestore}>Ripristina</SecondaryButton>
              </>
            ) : (
              <>
                {showFull ? (
                  <SecondaryButton onClick={collapse}>{closeLabel}</SecondaryButton>
                ) : (
                  <PrimaryButton onClick={expand}>{openLabel}</PrimaryButton>
                )}
                {canEdit ? (
                  showFull ? (
                    <PrimaryButton onClick={startEdit}>Modifica CV</PrimaryButton>
                  ) : (
                    <SecondaryButton onClick={openAndEdit}>Modifica CV</SecondaryButton>
                  )
                ) : null}
              </>
            )}
          </div>
          {siteEditing ? (
            <div className="site-tag-add">
              <input
                className="site-tag-add-input"
                value={openLabel}
                aria-label="Testo apri curriculum"
                onChange={(event) => setCv("openLabel", event.target.value)}
              />
              <input
                className="site-tag-add-input"
                value={closeLabel}
                aria-label="Testo chiudi curriculum"
                onChange={(event) => setCv("closeLabel", event.target.value)}
              />
            </div>
          ) : null}
          <div className="cv-status" aria-live="polite">
            {status === "saved" ? <p className="cv-status-ok">Curriculum salvato.</p> : null}
            {status === "error" ? (
              <p className="cv-error">
                Controlla i campi evidenziati. {errorCount}{" "}
                {errorCount === 1 ? "errore da correggere" : "errori da correggere"}.
              </p>
            ) : null}
            {editing && dirty ? <p className="cv-status-hint">Ci sono modifiche non salvate.</p> : null}
          </div>
        </header>

        {showFull ? (
          <Suspense
            fallback={
              <p className="site-body" aria-busy="true">
                Caricamento curriculum…
              </p>
            }
          >
            <CVFull />
          </Suspense>
        ) : (
          <div className="cv-summary">
            <div className="cv-stack">
              {peek.map((item) => (
                <ExperiencePeek key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </SiteSection>
  )
}
