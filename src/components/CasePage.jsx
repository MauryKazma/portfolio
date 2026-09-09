import { useEffect, useLayoutEffect, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useSite } from "../context/SiteContentProvider"
import { isPlaceholderImage } from "../utils/image"
import { glueItalianWrap } from "../utils/typography"
import { navigateTo } from "../utils/route"
import { goToSection } from "../utils/scroll"
import { ProjectShot, frameClass, projectShots } from "./LavoriRecenti"
import ShotImage from "./ShotImage"
import SiteSection from "./SiteSection"

function isHttpHref(href) {
  return typeof href === "string" && /^https?:\/\//i.test(href)
}

/** Progetto precedente e successivo, seguendo l'ordine dell'elenco Lavori. */
function useSiblings(projects, project) {
  const index = projects.findIndex((item) => item.id === project.id)
  if (index === -1) return { previous: null, next: null, index: 0, total: projects.length }
  return {
    previous: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
    index,
    total: projects.length,
  }
}

function CaseNav({ previous, next, index, total }) {
  if (!previous && !next) return null

  return (
    <nav className="case-nav" aria-label="Naviga tra i progetti">
      {previous ? (
        <button
          type="button"
          className="case-nav-link case-nav-link--prev"
          onClick={() => navigateTo(`/lavori/${previous.id}`)}
        >
          <span className="site-eyebrow">
            <ArrowLeft size={14} aria-hidden />
            Precedente
          </span>
          <span className="case-nav-title">{previous.title}</span>
        </button>
      ) : (
        <span className="case-nav-link is-empty" aria-hidden="true" />
      )}

      <p className="case-nav-count">
        {index + 1} / {total}
      </p>

      {next ? (
        <button
          type="button"
          className="case-nav-link case-nav-link--next"
          onClick={() => navigateTo(`/lavori/${next.id}`)}
        >
          <span className="site-eyebrow">
            Successivo
            <ArrowRight size={14} aria-hidden />
          </span>
          <span className="case-nav-title">{next.title}</span>
        </button>
      ) : (
        <span className="case-nav-link is-empty" aria-hidden="true" />
      )}
    </nav>
  )
}

export default function CasePage({ project }) {
  const { display } = useSite()
  const [shotIdx, setShotIdx] = useState(0)
  const shots = projectShots(project)
  const safeShot = shots.length === 0 ? 0 : Math.min(shotIdx, shots.length - 1)
  const current = shots[safeShot]
  const email = display.footer?.email?.trim()
  const external = isHttpHref(project.href)
  const siblings = useSiblings(display.lavori?.projects ?? [], project)

  useLayoutEffect(() => {
    setShotIdx(0)
  }, [project.id])

  // Frecce della tastiera per sfogliare, come in una galleria.
  useEffect(() => {
    const onKey = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const tag = document.activeElement?.tagName
      if (tag === "INPUT" || tag === "TEXTAREA" || document.activeElement?.isContentEditable) return
      if (event.key === "ArrowLeft" && siblings.previous) {
        navigateTo(`/lavori/${siblings.previous.id}`)
      } else if (event.key === "ArrowRight" && siblings.next) {
        navigateTo(`/lavori/${siblings.next.id}`)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [siblings.next, siblings.previous])

  if (!current) return null

  return (
    <SiteSection as="article" className="case-page scroll-mt-24" tone="ink" aria-labelledby="case-title">
      <div className="site-content">
        <button type="button" className="case-back" onClick={() => goToSection("lavori")}>
          <ArrowLeft size={16} aria-hidden />
          Tutti i lavori
        </button>

        <p className="site-eyebrow">
          {[project.client, project.category].filter(Boolean).join(" · ")}
        </p>
        <h1 className="site-headline" id="case-title">
          {project.title}
        </h1>

        <div className="case-layout">
          <div className="case-media">
            <ProjectShot
              key={`${project.id}-${safeShot}`}
              src={current.src}
              caption={current.caption}
              frame={project.frame}
              eager
              alt={
                isPlaceholderImage(current.src) || !current.src
                  ? `Spazio riservato alla foto: ${current.caption}`
                  : `${current.caption}, ${project.title}`
              }
            />
            {shots.length > 1 ? (
              <ul className="project-gallery">
                {shots.map((shot, index) => (
                  <li key={`${project.id}-shot-${index}`}>
                    <button
                      type="button"
                      className={`project-gallery-btn${frameClass(project.frame)}`}
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
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="case-copy">
            <dl className="project-meta">
              <div>
                <dt>Ruolo</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Anno</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>Deliverable</dt>
                <dd>{project.deliverable}</dd>
              </div>
            </dl>
            <p className="site-body project-case">{glueItalianWrap(project.description)}</p>
            {Array.isArray(project.tags) && project.tags.length > 0 ? (
              <ul className="chip-list">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            ) : null}
            {external ? (
              <p className="case-external">
                <a href={project.href} target="_blank" rel="noreferrer noopener">
                  Pezzo online
                </a>
              </p>
            ) : null}
            {email ? (
              <div className="project-cta">
                <a className="btn-primary" href={`mailto:${email}`}>
                  {display.footer.cta}
                </a>
              </div>
            ) : null}
          </div>
        </div>

        <CaseNav {...siblings} />
      </div>
    </SiteSection>
  )
}

export function CaseNotFound() {
  return (
    <SiteSection as="article" className="case-page scroll-mt-24" tone="ink" aria-labelledby="case-missing">
      <div className="site-content">
        <p className="site-eyebrow">Portfolio</p>
        <h1 className="site-headline" id="case-missing">
          Progetto non trovato.
        </h1>
        <p className="site-body">Questo progetto non è in elenco. Torna ai lavori.</p>
        <div className="project-cta">
          <button type="button" className="btn-primary" onClick={() => navigateTo("/")}>
            Torna alla home
          </button>
        </div>
      </div>
    </SiteSection>
  )
}
