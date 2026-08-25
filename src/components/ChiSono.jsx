import { useSite } from "../context/SiteContentProvider"
import { EditableText, TagEditor } from "./EditableText"
import SiteSection from "./SiteSection"

export default function ChiSono() {
  const {
    display,
    editing,
    setChiSono,
    setStudio,
    setToolkitTag,
    addToolkitTag,
    removeToolkitTag,
  } = useSite()
  const { chiSono } = display

  return (
    <SiteSection id="chi-sono" className="scroll-mt-24" aria-labelledby="chi-sono-title">
      <div className="site-content split-grid about-grid">
        <div className="about-copy">
          <EditableText
            className="site-eyebrow"
            value={chiSono.eyebrow}
            editing={editing}
            onChange={(value) => setChiSono("eyebrow", value)}
            ariaLabel="Etichetta Chi sono"
          />
          <EditableText
            as="h2"
            id="chi-sono-title"
            className="site-headline"
            value={chiSono.title}
            editing={editing}
            onChange={(value) => setChiSono("title", value)}
            ariaLabel="Titolo Chi sono"
          />
          <EditableText
            className="site-body"
            value={chiSono.body1}
            editing={editing}
            multiline
            onChange={(value) => setChiSono("body1", value)}
            ariaLabel="Primo paragrafo Chi sono"
          />
          <EditableText
            className="site-body"
            value={chiSono.body2}
            editing={editing}
            multiline
            onChange={(value) => setChiSono("body2", value)}
            ariaLabel="Secondo paragrafo Chi sono"
          />
          <div className="studio-list">
            <EditableText
              className="site-eyebrow"
              value={chiSono.studiosEyebrow}
              editing={editing}
              onChange={(value) => setChiSono("studiosEyebrow", value)}
              ariaLabel="Etichetta studi"
            />
            {(chiSono.studios ?? []).map((studio, index) => (
              <article className="studio-card" key={`${studio.name}-${index}`}>
                <EditableText
                  as="h3"
                  className="studio-name"
                  value={studio.name}
                  editing={editing}
                  onChange={(value) => setStudio(index, "name", value)}
                  ariaLabel={`Nome studio ${index + 1}`}
                />
                <p className="studio-meta">
                  <EditableText
                    as="span"
                    value={studio.role}
                    editing={editing}
                    onChange={(value) => setStudio(index, "role", value)}
                    ariaLabel={`Ruolo studio ${index + 1}`}
                  />
                  <span aria-hidden="true"> · </span>
                  <EditableText
                    as="span"
                    value={studio.period}
                    editing={editing}
                    onChange={(value) => setStudio(index, "period", value)}
                    ariaLabel={`Periodo studio ${index + 1}`}
                  />
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="toolkit-panel">
          <EditableText
            className="site-eyebrow"
            value={chiSono.toolkitEyebrow}
            editing={editing}
            onChange={(value) => setChiSono("toolkitEyebrow", value)}
            ariaLabel="Etichetta toolkit"
          />
          <TagEditor
            tags={chiSono.toolkit}
            editing={editing}
            listClassName="toolkit-list"
            addLabel="Nuovo tag toolkit"
            onRename={setToolkitTag}
            onAdd={addToolkitTag}
            onRemove={removeToolkitTag}
          />
        </div>
      </div>
    </SiteSection>
  )
}
