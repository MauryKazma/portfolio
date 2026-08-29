import { useSite } from "../context/SiteContentProvider"
import { EditableText, TagEditor } from "./EditableText"
import SiteSection from "./SiteSection"

export default function ChiSono() {
  const {
    display,
    editing,
    setChiSono,
    setNote,
    setToolkitTag,
    addToolkitTag,
    removeToolkitTag,
  } = useSite()
  const { chiSono } = display

  return (
    <SiteSection id="chi-sono" className="scroll-mt-24" wash aria-labelledby="chi-sono-title">
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
              value={chiSono.notesEyebrow}
              editing={editing}
              onChange={(value) => setChiSono("notesEyebrow", value)}
              ariaLabel="Etichetta note Chi sono"
            />
            {(chiSono.notes ?? []).map((note, index) => (
              <article className="studio-card" key={`${note.title}-${index}`}>
                <EditableText
                  as="h3"
                  className="studio-name"
                  value={note.title}
                  editing={editing}
                  onChange={(value) => setNote(index, "title", value)}
                  ariaLabel={`Titolo nota ${index + 1}`}
                />
                <EditableText
                  className="studio-meta"
                  value={note.body}
                  editing={editing}
                  multiline
                  onChange={(value) => setNote(index, "body", value)}
                  ariaLabel={`Testo nota ${index + 1}`}
                />
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
            ariaLabel="Etichetta passioni"
          />
          <TagEditor
            tags={chiSono.toolkit}
            editing={editing}
            listClassName="toolkit-list"
            addLabel="Nuovo tag passione"
            onRename={setToolkitTag}
            onAdd={addToolkitTag}
            onRemove={removeToolkitTag}
          />
        </div>
      </div>
    </SiteSection>
  )
}
