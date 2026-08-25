import { useState } from "react"
import { flushSync } from "react-dom"
import { ArrowUpRight } from "lucide-react"
import { useSite } from "../context/SiteContentProvider"
import { scrollToId } from "../utils/scroll"
import { EditableText, InlineEdit, TagEditor } from "./EditableText"
import SiteSection from "./SiteSection"

function isHttpHref(href) {
  return typeof href === "string" && /^https?:\/\//i.test(href)
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
  } = useSite()
  const projects = display.lavori.projects
  const [activeIdx, setActiveIdx] = useState(0)
  const safeIdx = projects.length === 0 ? 0 : Math.min(activeIdx, projects.length - 1)
  const active = projects[safeIdx]
  const projectHref = active?.href?.trim()
  const external = isHttpHref(projectHref)

  const selectProject = (index) => {
    if (index === safeIdx) return
    const apply = () => setActiveIdx(index)
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!reduceMotion && typeof document.startViewTransition === "function") {
      document.startViewTransition(() => {
        flushSync(apply)
      })
      return
    }
    apply()
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

  if (!active) return null

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
                      value={project.category}
                      editing={editing}
                      onChange={(value) => setProject(project.id, "category", value)}
                      ariaLabel={`Categoria progetto ${index + 1}`}
                    />
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <article className="project-stage" id={`lavoro-${active.id}`} tabIndex={-1} aria-live="polite">
            <div className="project-frame">
              <img
                key={active.id}
                src={active.image}
                alt={`Anteprima del progetto ${active.title}`}
                width={800}
                height={500}
                sizes="(min-width: 900px) 640px, 100vw"
                loading={safeIdx === 0 ? "eager" : "lazy"}
                fetchPriority={safeIdx === 0 ? "high" : "auto"}
                decoding="async"
              />
              <span className="project-frame-chip">{active.category}</span>
            </div>
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
              className="site-body"
              value={active.description}
              editing={editing}
              multiline
              onChange={(value) => setProject(active.id, "description", value)}
              ariaLabel="Descrizione progetto"
            />
            <TagEditor
              tags={active.tags}
              editing={editing}
              listClassName="chip-list"
              addLabel="Nuovo tag progetto"
              onRename={(index, value) => setProjectTag(active.id, index, value)}
              onAdd={(label) => addProjectTag(active.id, label)}
              onRemove={(index) => removeProjectTag(active.id, index)}
            />
            {editing ? (
              <input
                className="site-edit-field project-href"
                value={active.href ?? ""}
                aria-label="Link del progetto"
                placeholder="https://…"
                onChange={(event) => setProject(active.id, "href", event.target.value)}
              />
            ) : null}
            {projectHref && external ? (
              <div className="project-cta">
                <a
                  href={projectHref}
                  className="btn-primary"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <InlineEdit
                    value={display.lavori.cta}
                    editing={editing}
                    onChange={(value) => setLavori("cta", value)}
                    ariaLabel="Testo pulsante progetto"
                  />
                  <ArrowUpRight size={16} aria-hidden />
                </a>
              </div>
            ) : editing ? (
              <p className="site-body">Aggiungi un URL per mostrare il pulsante del progetto.</p>
            ) : (
              <div className="project-cta">
                <button type="button" className="btn-primary" onClick={() => scrollToId("contatti")}>
                  {display.lavori.cta}
                  <ArrowUpRight size={16} aria-hidden />
                </button>
              </div>
            )}
          </article>
        </div>
      </div>
    </SiteSection>
  )
}
