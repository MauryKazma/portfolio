import { useLayoutEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useSite } from "../context/SiteContentProvider"
import { isPlaceholderImage } from "../utils/image"
import { navigateTo } from "../utils/route"
import { goToSection } from "../utils/scroll"
import { ProjectShot, frameClass, projectShots } from "./LavoriRecenti"
import SiteSection from "./SiteSection"

function isHttpHref(href) {
  return typeof href === "string" && /^https?:\/\//i.test(href)
}

export default function CasePage({ project }) {
  const { display } = useSite()
  const [shotIdx, setShotIdx] = useState(0)
  const shots = projectShots(project)
  const safeShot = shots.length === 0 ? 0 : Math.min(shotIdx, shots.length - 1)
  const current = shots[safeShot]
  const email = display.footer?.email?.trim()
  const external = isHttpHref(project.href)

  useLayoutEffect(() => {
    setShotIdx(0)
  }, [project.id])

  if (!current) return null

  return (
    <SiteSection as="article" className="case-page scroll-mt-24" tone="ink" aria-labelledby="case-title">
      <div className="site-content">
        <button type="button" className="case-back" onClick={() => goToSection("lavori")}>
          <ArrowLeft size={16} aria-hidden />
          Tutti i lavori
        </button>

        <p className="site-eyebrow">{project.category}</p>
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
                  : `${current.caption} — ${project.title}`
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
                        <img src={shot.src} alt="" width={240} height={180} decoding="async" />
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
            <p className="site-body project-case">{project.description}</p>
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
          Pezzo non trovato.
        </h1>
        <p className="site-body">Quel case non è in elenco. Torna ai lavori.</p>
        <div className="project-cta">
          <button type="button" className="btn-primary" onClick={() => navigateTo("/")}>
            Torna alla home
          </button>
        </div>
      </div>
    </SiteSection>
  )
}
