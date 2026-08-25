import { useSite } from "../context/SiteContentProvider"
import { EditableText, TagEditor } from "./EditableText"
import SiteSection from "./SiteSection"

export default function ChiSono() {
  const {
    display,
    editing,
    setChiSono,
    setStat,
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
          <div className="stat-row">
            {chiSono.stats.map((stat, index) => (
              <div className="stat-card" key={index}>
                <EditableText
                  className="stat-value"
                  value={stat.value}
                  editing={editing}
                  onChange={(value) => setStat(index, "value", value)}
                  ariaLabel={`Valore statistica ${index + 1}`}
                />
                <EditableText
                  className="site-body"
                  value={stat.label}
                  editing={editing}
                  onChange={(value) => setStat(index, "label", value)}
                  ariaLabel={`Etichetta statistica ${index + 1}`}
                />
              </div>
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
