import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { useSite } from "../context/SiteContentProvider"
import { isPlaceholderImage, readImageFile } from "../utils/image"
import { navigateTo } from "../utils/route"
import { EditableText, InlineEdit, TagEditor } from "./EditableText"
import SiteSection from "./SiteSection"
import Tossable from "./Tossable"

function deckSlice(list, start, size = 3) {
  if (!list.length) return []
  const count = Math.min(size, list.length)
  return Array.from({ length: count }, (_, offset) => list[(start + offset) % list.length])
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduce(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])
  return reduce
}

export function projectShots(project) {
  const cover = {
    src: project.image ?? "",
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
  const filters = display.lavori.filters ?? [
    { id: "all", label: "Tutti" },
    { id: "gdo", label: "GDO" },
    { id: "video", label: "Video" },
    { id: "brand", label: "Brand" },
    { id: "digital", label: "Digitale" },
  ]
  const [filter, setFilter] = useState("all")
  const [activeIdx, setActiveIdx] = useState(0)
  const [shotIdx, setShotIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const holdingRef = useRef(false)
  const reduceMotion = usePrefersReducedMotion()
  const visible =
    filter === "all" ? projects : projects.filter((project) => project.group === filter)
  const safeIdx = visible.length === 0 ? 0 : Math.min(activeIdx, visible.length - 1)
  const active = visible[safeIdx]
  const shots = active ? projectShots(active) : []
  const safeShot = shots.length === 0 ? 0 : Math.min(shotIdx, shots.length - 1)
  const currentShot = shots[safeShot]

  useEffect(() => {
    setActiveIdx(0)
    setShotIdx(0)
  }, [filter])

  useEffect(() => {
    setShotIdx(0)
  }, [active?.id])

  useEffect(() => {
    if (paused || reduceMotion || editing || visible.length < 2) return
    const timer = window.setInterval(() => {
      setActiveIdx((current) => (current + 1) % visible.length)
    }, 8000)
    return () => window.clearInterval(timer)
  }, [paused, reduceMotion, editing, visible.length])

  const selectProject = (index) => {
    if (index === safeIdx) return
    setActiveIdx(index)
    setShotIdx(0)
  }

  const onListKeyDown = (event) => {
    if (!editing || !visible.length) return
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault()
      selectProject((safeIdx + 1) % visible.length)
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault()
      selectProject((safeIdx - 1 + visible.length) % visible.length)
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

  if (!projects.length) return null

  const extras = Array.isArray(active?.gallery) ? active.gallery : []
  const teaser = active?.teaser || active?.description || ""
  const deck = deckSlice(visible, safeIdx)
  const slotNames = ["front", "mid", "back"]

  const openProject = (index) => {
    const project = visible[index]
    if (!project) return
    if (editing) {
      selectProject(index)
      return
    }
    navigateTo(`/lavori/${project.id}`)
  }

  const openActive = () => {
    if (!active) return
    openProject(safeIdx)
  }

  return (
    <SiteSection id="lavori" className="scroll-mt-24" tone="ink" aria-labelledby="lavori-title">
      <div className="site-content">
        <div
          className="work-split"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            if (!holdingRef.current) setPaused(false)
          }}
          onFocus={() => setPaused(true)}
          onBlur={(event) => {
            if (event.currentTarget.contains(event.relatedTarget)) return
            if (!holdingRef.current) setPaused(false)
          }}
        >
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

            {filters.length > 1 ? (
              <div className="project-filters" role="group" aria-label="Filtra i lavori">
                {filters.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="project-filter"
                    aria-pressed={filter === item.id}
                    onClick={() => setFilter(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ) : null}

            {visible.length === 0 ? (
              <p className="site-body work-empty">Nessun lavoro in questa categoria.</p>
            ) : (
              <ul className="work-index" onKeyDown={onListKeyDown}>
                {visible.map((project, index) => (
                  <li key={project.id}>
                    <button
                      type="button"
                      aria-current={index === safeIdx ? true : undefined}
                      onClick={() => selectProject(index)}
                    >
                      <span>{project.title}</span>
                      {project.client && project.client !== project.title ? (
                        <span>{project.client}</span>
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {active ? (
              <div className="work-cta">
                <button type="button" className="btn-primary" onClick={openActive}>
                  <InlineEdit
                    value={display.lavori.cta}
                    editing={editing}
                    onChange={(value) => setLavori("cta", value)}
                    ariaLabel="Testo pulsante progetto"
                  />
                  <ArrowUpRight size={16} aria-hidden />
                </button>
              </div>
            ) : null}
          </div>

          {deck.length > 0 ? (
            <div className="work-stage">
              <div className="work-stage-glow" aria-hidden="true" />
              <div className="work-deck" aria-live="polite">
                {deck.map((project, slot) => {
                  const cover = project.image ?? ""
                  const missing = !String(cover).trim() || isPlaceholderImage(cover)
                  const index = visible.findIndex((item) => item.id === project.id)
                  return (
                    <Tossable
                      key={project.id}
                      href={`/lavori/${project.id}`}
                      className={`work-deck-card is-${slotNames[slot] ?? "back"}`}
                      ariaCurrent={index === safeIdx ? true : undefined}
                      ariaLabel={`${project.title}${project.client ? `, ${project.client}` : ""}`}
                      onEngage={() => {
                        holdingRef.current = true
                        setPaused(true)
                      }}
                      onRelease={() => {
                        holdingRef.current = false
                      }}
                      onActivate={() => openProject(index)}
                    >
                      <span className="work-deck-frame">
                        {missing ? (
                          <span className="project-shot-empty">
                            <span className="project-shot-empty-title">{project.category}</span>
                          </span>
                        ) : (
                          <img
                            src={cover}
                            alt=""
                            width={640}
                            height={800}
                            loading={slot === 0 ? "eager" : "lazy"}
                            decoding="async"
                            draggable={false}
                          />
                        )}
                      </span>
                      <span className="work-deck-caption">
                        <span className="site-eyebrow">{project.category}</span>
                        <span className="work-deck-title">{project.title}</span>
                        <span className="work-deck-meta">
                          {[project.client !== project.title ? project.client : null, project.year]
                            .filter(Boolean)
                            .join(" · ")}
                        </span>
                      </span>
                    </Tossable>
                  )
                })}
              </div>
              {visible.length > 1 ? (
                <p className="work-deck-count">
                  {String(safeIdx + 1).padStart(2, "0")}
                  <span aria-hidden="true"> · </span>
                  {String(visible.length).padStart(2, "0")}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

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
              {isPlaceholderImage(active.image) ? "Inserisci foto principale" : "Cambia foto principale"}
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
                        <img src={shot.src} alt="" width={240} height={180} decoding="async" />
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
              value={teaser}
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
