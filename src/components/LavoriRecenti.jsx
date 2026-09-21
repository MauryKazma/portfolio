import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { FEATURED_WORK_IDS, WORK_COVERS } from "../data/siteDefault"
import { useSite } from "../context/SiteContentProvider"
import { isPlaceholderImage, readImageFile } from "../utils/image"
import ShotImage from "./ShotImage"
import { navigateTo } from "../utils/route"
import { EditableText, InlineEdit, TagEditor } from "./EditableText"
import SiteSection from "./SiteSection"

function projectLead(project) {
  const teaser = String(project?.teaser ?? "").trim()
  if (teaser) return teaser
  const role = String(project?.role ?? "").trim()
  const outcome = String(project?.deliverable ?? "").trim()
  if (role && outcome) return `${role}. ${outcome}.`
  return role || outcome || String(project?.description ?? "").trim()
}

function coverSrc(project) {
  const image = String(project?.image ?? "").trim()
  if (image && !isPlaceholderImage(image)) return image
  return WORK_COVERS[project?.id] ?? ""
}

export function projectShots(project) {
  const cover = {
    src: coverSrc(project),
    caption: project.client || project.category || "Pezzo",
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
  const [broken, setBroken] = useState(false)

  useEffect(() => {
    setRatio(null)
    setBroken(false)
  }, [src])

  const empty = placeholder || broken

  return (
    <div
      className={`project-frame${empty ? " is-placeholder" : ""}${
        lockRatio ? " is-locked" : frameClass(frame)
      } ${className}`.trim()}
      style={!lockRatio && !empty && ratio ? { aspectRatio: ratio } : undefined}
    >
      {empty ? (
        <div className="project-shot-empty">
          <span className="project-shot-empty-title">{caption}</span>
          <span className="project-shot-empty-meta">Foto in arrivo</span>
        </div>
      ) : (
        <ShotImage
          src={src}
          alt={alt}
          width={lockRatio || frame !== "portrait" ? 800 : 600}
          height={lockRatio || frame !== "portrait" ? 600 : 800}
          sizes="(min-width: 900px) 640px, 100vw"
          eager={eager}
          onError={() => setBroken(true)}
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

function WorkCover({ src, caption, eager = false }) {
  const missing = !String(src ?? "").trim() || isPlaceholderImage(src)
  const [broken, setBroken] = useState(false)

  useEffect(() => {
    setBroken(false)
  }, [src])

  const empty = missing || broken

  return (
    <span className={`work-card-cover${empty ? " is-placeholder" : ""}`}>
      {empty ? (
        <span className="project-shot-empty">
          <span className="project-shot-empty-title">{caption}</span>
          <span className="project-shot-empty-meta">Foto in arrivo</span>
        </span>
      ) : (
        <ShotImage
          src={src}
          alt=""
          width={960}
          height={720}
          sizes="(min-width: 1100px) 360px, (min-width: 768px) 45vw, 100vw"
          eager={eager}
          onError={() => setBroken(true)}
        />
      )}
    </span>
  )
}

function openCase(event, id) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
  event.preventDefault()
  navigateTo(`/lavori/${id}`)
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
  const featuredIds = (display.lavori.featured ?? FEATURED_WORK_IDS).filter(Boolean)
  const featured = featuredIds
    .map((id) => projects.find((project) => project.id === id))
    .filter(Boolean)
    .slice(0, 5)
  const featuredSet = new Set(featured.map((project) => project.id))
  const rest = projects.filter((project) => !featuredSet.has(project.id))
  const [activeId, setActiveId] = useState(featured[0]?.id ?? projects[0]?.id ?? "")
  const [shotIdx, setShotIdx] = useState(0)

  const active = projects.find((project) => project.id === activeId) ?? featured[0] ?? projects[0]
  const shots = active ? projectShots(active) : []
  const safeShot = shots.length === 0 ? 0 : Math.min(shotIdx, shots.length - 1)
  const currentShot = shots[safeShot]

  useEffect(() => {
    setShotIdx(0)
  }, [active?.id])

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

  if (!projects.length) return null

  const extras = Array.isArray(active?.gallery) ? active.gallery : []
  const editTeaser = active?.teaser || active?.description || ""
  const grid = featured.length ? featured : projects.slice(0, 5)

  const selectProject = (id) => {
    setActiveId(id)
    setShotIdx(0)
  }

  return (
    <SiteSection id="lavori" className="scroll-mt-24" wash aria-labelledby="lavori-title">
      <div className="site-content">
        <div className="work-copy">
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
          <EditableText
            className="site-body"
            value={display.lavori.body ?? ""}
            editing={editing}
            multiline
            onChange={(value) => setLavori("body", value)}
            ariaLabel="Testo lavori"
          />
        </div>

        {grid.length > 0 ? (
          <ul className="work-grid">
            {grid.map((project, index) => {
              const line = projectLead(project)
              const src = coverSrc(project)
              return (
                <li key={project.id}>
                  {editing ? (
                    <button
                      type="button"
                      className={`work-card${project.id === active?.id ? " is-current" : ""}`}
                      aria-current={project.id === active?.id ? true : undefined}
                      onClick={() => selectProject(project.id)}
                    >
                      <WorkCover src={src} caption={project.category} eager={index < 2} />
                      <span className="work-card-copy">
                        <span className="site-eyebrow">{project.category}</span>
                        <span className="work-card-title">{project.title}</span>
                        {line ? <span className="work-card-line">{line}</span> : null}
                        <span className="work-card-cta">
                          {display.lavori.cta}
                          <ArrowUpRight size={16} aria-hidden />
                        </span>
                      </span>
                    </button>
                  ) : (
                    <a
                      className="work-card"
                      href={`/lavori/${project.id}`}
                      onClick={(event) => openCase(event, project.id)}
                    >
                      <WorkCover src={src} caption={project.category} eager={index < 2} />
                      <span className="work-card-copy">
                        <span className="site-eyebrow">{project.category}</span>
                        <span className="work-card-title">{project.title}</span>
                        {line ? <span className="work-card-line">{line}</span> : null}
                        <span className="work-card-cta">
                          {display.lavori.cta}
                          <ArrowUpRight size={16} aria-hidden />
                        </span>
                      </span>
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        ) : null}

        {rest.length > 0 ? (
          <div className="work-archive">
            <p className="site-eyebrow">Altri lavori</p>
            <ul className="work-index">
              {rest.map((project) => (
                <li key={project.id}>
                  {editing ? (
                    <button
                      type="button"
                      aria-current={project.id === active?.id ? true : undefined}
                      onClick={() => selectProject(project.id)}
                    >
                      <span>{project.title}</span>
                      {project.client && project.client !== project.title ? (
                        <span>{project.client}</span>
                      ) : null}
                    </button>
                  ) : (
                    <a href={`/lavori/${project.id}`} className="work-index-link" onClick={(event) => openCase(event, project.id)}>
                      <span>{project.title}</span>
                      {project.client && project.client !== project.title ? (
                        <span>{project.client}</span>
                      ) : null}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {editing && active ? (
          <article className="work-edit" id={`lavoro-${active.id}`}>
            <ProjectShot
              src={currentShot?.src}
              caption={currentShot?.caption}
              frame="landscape"
              lockRatio
              alt={
                isPlaceholderImage(currentShot?.src) || !currentShot?.src
                  ? `Spazio riservato alla foto: ${currentShot?.caption}`
                  : `${currentShot?.caption}, ${active.title}`
              }
            />
            <label className="hero-portrait-change">
              <input type="file" accept="image/*" onChange={onCoverFile} />
              {isPlaceholderImage(active.image) && !coverSrc(active)
                ? "Inserisci foto principale"
                : "Cambia foto principale"}
            </label>
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
                        <ShotImage
                          src={shot.src}
                          alt=""
                          width={240}
                          height={180}
                          sizes="120px"
                        />
                      ) : (
                        <span className="project-gallery-empty">{shot.caption}</span>
                      )}
                    </button>
                    {index > 0 ? (
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
            <EditableText
              as="h3"
              className="project-title"
              value={active.title}
              editing
              onChange={(value) => setProject(active.id, "title", value)}
              ariaLabel="Titolo progetto selezionato"
            />
            <EditableText
              className="site-body project-teaser"
              value={editTeaser}
              editing
              multiline
              onChange={(value) => setProject(active.id, "teaser", value)}
              ariaLabel="Teaser del progetto"
            />
            <input
              className="site-edit-field"
              value={active.client ?? ""}
              aria-label="Cliente"
              placeholder="Cliente"
              onChange={(event) => setProject(active.id, "client", event.target.value)}
            />
            <dl className="project-meta">
              <div>
                <dt>Ruolo</dt>
                <dd>
                  <InlineEdit
                    value={active.role}
                    editing
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
                    editing
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
                    editing
                    onChange={(value) => setProject(active.id, "deliverable", value)}
                    ariaLabel="Deliverable del progetto"
                  />
                </dd>
              </div>
            </dl>
            <TagEditor
              tags={active.tags}
              editing
              listClassName="chip-list"
              addLabel="Nuovo tag"
              onRename={(index, value) => setProjectTag(active.id, index, value)}
              onAdd={(label) => addProjectTag(active.id, label)}
              onRemove={(index) => removeProjectTag(active.id, index)}
            />
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
              placeholder="Tipo di pezzo"
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
          </article>
        ) : null}
      </div>
    </SiteSection>
  )
}
