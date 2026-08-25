import { useEffect, useState } from "react"
import { useSite } from "../context/SiteContentProvider"
import { isPlaceholderImage, readImageFile } from "../utils/image"
import { navigateTo } from "../utils/route"
import { EditableText, InlineEdit, TagEditor } from "./EditableText"
import SiteSection from "./SiteSection"

export function projectShots(project) {
  const cover = {
    src: project.image ?? "",
    caption: project.category || "Pezzo",
  }
  const extras = Array.isArray(project.gallery) ? project.gallery : []
  return [cover, ...extras]
}

export function frameClass(frame) {
  return frame === "portrait" ? " is-portrait" : ""
}

export function ProjectShot({
  src,
  alt,
  caption,
  className = "",
  eager = false,
  frame = "landscape",
  lockRatio = false,
}) {
  const missing = !String(src ?? "").trim()
  const placeholder = missing || isPlaceholderImage(src)
  const [ratio, setRatio] = useState(null)

  useEffect(() => {
    setRatio(null)
  }, [src])

  return (
    <div
      className={`project-frame${placeholder ? " is-placeholder" : ""}${
        lockRatio ? " is-locked" : frameClass(frame)
      } ${className}`.trim()}
      style={!lockRatio && ratio ? { aspectRatio: ratio } : undefined}
    >
      {missing ? (
        <div className="project-shot-empty">
          <span className="project-shot-empty-title">{caption}</span>
          <span className="project-shot-empty-meta">Foto in arrivo</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={lockRatio || frame !== "portrait" ? 800 : 600}
          height={lockRatio || frame !== "portrait" ? 600 : 800}
          sizes="(min-width: 900px) 640px, 100vw"
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding="async"
          onLoad={(event) => {
            if (placeholder || lockRatio) return
            const { naturalWidth: width, naturalHeight: height } = event.currentTarget
            if (width > 0 && height > 0) setRatio(`${width} / ${height}`)
          }}
        />
      )}
      {caption ? <span className="project-frame-chip">{caption}</span> : null}
    </div>
  )
}

export default function LavoriRecenti() {
  const {
    display,
    editing,
    setLavori,
    setProject,
    setProjectTag,
    addProjectTag,
    removeProjectTag,
    setProjectGalleryItem,
  } = useSite()
  const projects = display.lavori.projects
  const [activeIdx, setActiveIdx] = useState(0)
  const [shotIdx, setShotIdx] = useState(0)
  const safeIdx = projects.length === 0 ? 0 : Math.min(activeIdx, projects.length - 1)
  const active = projects[safeIdx]
  const shots = active ? projectShots(active) : []
  const safeShot = shots.length === 0 ? 0 : Math.min(shotIdx, shots.length - 1)
  const currentShot = shots[safeShot]

  useEffect(() => {
    setShotIdx(0)
  }, [active?.id])

  const selectProject = (index) => {
    if (index === safeIdx) return
    setActiveIdx(index)
    setShotIdx(0)
  }

  const onListKeyDown = (event) => {
    if (!projects.length) return
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault()
      selectProject((safeIdx + 1) % projects.length)
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault()
      selectProject((safeIdx - 1 + projects.length) % projects.length)
    }
  }

  const onCoverFile = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ""
    if (!file || !active) return
    try {
      setProject(active.id, "image", await readImageFile(file))
    } catch {
      /* ignore invalid files */
    }
  }

  const onGalleryFile = async (index, event) => {
    const file = event.target.files?.[0]
    event.target.value = ""
    if (!file || !active) return
    try {
      setProjectGalleryItem(active.id, index, "src", await readImageFile(file))
    } catch {
      /* ignore invalid files */
    }
  }

  if (!active || !currentShot) return null

  const extras = Array.isArray(active.gallery) ? active.gallery : []
  const teaser = active.teaser || active.description

  return (
    <SiteSection id="lavori" className="scroll-mt-24" tone="ink" aria-labelledby="lavori-title">
      <div className="site-content">
        <EditableText
          className="site-eyebrow"
          value={display.lavori.eyebrow}
          editing={editing}
          onChange={(value) => setLavori("eyebrow", value)}
          ariaLabel="Etichetta portfolio"
        />
        <EditableText
          as="h2"
          id="lavori-title"
          className="site-headline"
          value={display.lavori.title}
          editing={editing}
          onChange={(value) => setLavori("title", value)}
          ariaLabel="Titolo lavori"
        />

        <div className="project-board">
          <ul className="project-list" onKeyDown={onListKeyDown}>
            {projects.map((project, index) => (
              <li key={project.id}>
                <button
                  type="button"
                  onClick={() => selectProject(index)}
                  aria-current={index === safeIdx ? true : undefined}
                  aria-controls={index === safeIdx ? `lavoro-${project.id}` : undefined}
                >
                  <span className="site-eyebrow">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <InlineEdit
                      value={project.title}
                      editing={editing}
                      onChange={(value) => setProject(project.id, "title", value)}
                      ariaLabel={`Titolo progetto ${index + 1}`}
                    />
                    <InlineEdit
                      as="span"
                      className="site-body"
                      value={project.year || project.category}
                      editing={editing}
                      onChange={(value) => setProject(project.id, "year", value)}
                      ariaLabel={`Anno progetto ${index + 1}`}
                    />
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <article className="project-stage" id={`lavoro-${active.id}`} tabIndex={-1} aria-live="polite">
            <ProjectShot
              src={currentShot.src}
              caption={currentShot.caption}
              frame="landscape"
              lockRatio
              eager={safeIdx === 0 && safeShot === 0}
              alt={
                isPlaceholderImage(currentShot.src) || !currentShot.src
                  ? `Spazio riservato alla foto: ${currentShot.caption}`
                  : `${currentShot.caption} — ${active.title}`
              }
            />

            {shots.length > 1 ? (
              <ul className="project-gallery">
                {shots.map((shot, index) => (
                  <li key={`${active.id}-shot-${index}`}>
                    <button
                      type="button"
                      className="project-gallery-btn"
                      onClick={() => setShotIdx(index)}
                      aria-current={index === safeShot ? true : undefined}
                      aria-label={`Mostra ${shot.caption || `immagine ${index + 1}`}`}
                    >
                      {String(shot.src ?? "").trim() ? (
                        <img src={shot.src} alt="" width={240} height={180} decoding="async" />
                      ) : (
                        <span className="project-gallery-empty">{shot.caption}</span>
                      )}
                    </button>
                    {editing && index > 0 ? (
                      <label className="hero-portrait-change project-gallery-add">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) => onGalleryFile(index - 1, event)}
                        />
                        {shot.src ? "Cambia" : "Inserisci"}
                      </label>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}

            {editing ? (
              <label className="hero-portrait-change">
                <input type="file" accept="image/*" onChange={onCoverFile} />
                {isPlaceholderImage(active.image) ? "Inserisci foto principale" : "Cambia foto principale"}
              </label>
            ) : null}

            <dl className="project-meta">
              <div>
                <dt>Ruolo</dt>
                <dd>
                  <InlineEdit
                    value={active.role}
                    editing={editing}
                    onChange={(value) => setProject(active.id, "role", value)}
                    ariaLabel="Ruolo nel progetto"
                  />
                </dd>
              </div>
              <div>
                <dt>Anno</dt>
                <dd>
                  <InlineEdit
                    value={active.year}
                    editing={editing}
                    onChange={(value) => setProject(active.id, "year", value)}
                    ariaLabel="Anno del progetto"
                  />
                </dd>
              </div>
              <div>
                <dt>Deliverable</dt>
                <dd>
                  <InlineEdit
                    value={active.deliverable}
                    editing={editing}
                    onChange={(value) => setProject(active.id, "deliverable", value)}
                    ariaLabel="Deliverable del progetto"
                  />
                </dd>
              </div>
            </dl>

            <p className="site-eyebrow">{`${String(safeIdx + 1).padStart(2, "0")} — ${String(projects.length).padStart(2, "0")}`}</p>
            <EditableText
              as="h3"
              className="project-title"
              value={active.title}
              editing={editing}
              onChange={(value) => setProject(active.id, "title", value)}
              ariaLabel="Titolo progetto selezionato"
            />
            <EditableText
              className="site-body project-teaser"
              value={teaser}
              editing={editing}
              multiline
              onChange={(value) => setProject(active.id, "teaser", value)}
              ariaLabel="Teaser del progetto"
            />
            <TagEditor
              tags={active.tags}
              editing={editing}
              listClassName="chip-list"
              addLabel="Nuovo deliverable"
              onRename={(index, value) => setProjectTag(active.id, index, value)}
              onAdd={(label) => addProjectTag(active.id, label)}
              onRemove={(index) => removeProjectTag(active.id, index)}
            />
            {editing ? (
              <>
                <EditableText
                  className="site-body project-case"
                  value={active.description}
                  editing
                  multiline
                  onChange={(value) => setProject(active.id, "description", value)}
                  ariaLabel="Racconto completo del progetto"
                />
                <input
                  className="site-edit-field"
                  value={active.category ?? ""}
                  aria-label="Tipo di pezzo"
                  placeholder="Tipo di pezzo (identità, editoria…)"
                  onChange={(event) => setProject(active.id, "category", event.target.value)}
                />
                {extras.map((item, index) => (
                  <input
                    key={`cap-${index}`}
                    className="site-edit-field"
                    value={item.caption ?? ""}
                    aria-label={`Didascalia foto ${index + 2}`}
                    placeholder={`Didascalia foto ${index + 2}`}
                    onChange={(event) =>
                      setProjectGalleryItem(active.id, index, "caption", event.target.value)
                    }
                  />
                ))}
                <input
                  className="site-edit-field project-href"
                  value={active.href ?? ""}
                  aria-label="Link del progetto"
                  placeholder="https://…"
                  onChange={(event) => setProject(active.id, "href", event.target.value)}
                />
              </>
            ) : null}
            <div className="project-cta">
              <button
                type="button"
                className="btn-primary"
                onClick={() => navigateTo(`/lavori/${active.id}`)}
              >
                <InlineEdit
                  value={display.lavori.cta}
                  editing={editing}
                  onChange={(value) => setLavori("cta", value)}
                  ariaLabel="Testo pulsante progetto"
                />
              </button>
            </div>
          </article>
        </div>
      </div>
    </SiteSection>
  )
}
