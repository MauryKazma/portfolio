import { useEffect, useRef, useState } from "react"
import { Beer, Clapperboard, Cpu, Gamepad2, Sparkles } from "lucide-react"
import { useSite } from "../context/SiteContentProvider"
import { ABOUT_OPEN } from "../utils/aboutFold"
import { glueItalianWrap } from "../utils/typography"
import AboutPlay from "./AboutPlay"
import { EditableText, TagEditor } from "./EditableText"
import SiteSection from "./SiteSection"

const FOLD_MS = 680

const HOBBY_ICONS = {
  games: Gamepad2,
  anime: Clapperboard,
  web: Sparkles,
  hw: Cpu,
  beer: Beer,
}

function HobbyPanel({
  chiSono,
  editing,
  foldOpen,
  fullMounted,
  setChiSono,
  setHobby,
  setToolkitTag,
  addToolkitTag,
  removeToolkitTag,
}) {
  const hobbies = chiSono.hobbies ?? []
  const tags = chiSono.toolkit ?? []

  return (
    <aside className="toolkit-panel about-hobby">
      <div className={foldOpen ? "about-hobby-frame is-open" : "about-hobby-frame"}>
        <AboutPlay open={fullMounted} />
        <div
          id="about-hobby-fold"
          className={foldOpen ? "about-hobby-fold is-open" : "about-hobby-fold"}
          aria-hidden={!foldOpen}
          {...(!foldOpen ? { inert: true } : {})}
        >
          <div className="about-hobby-fold-clip">
            {fullMounted ? (
              <div className="about-hobby-sheet">
                <EditableText
                  className="site-eyebrow"
                  value={chiSono.toolkitEyebrow}
                  editing={editing}
                  onChange={(value) => setChiSono("toolkitEyebrow", value)}
                  ariaLabel="Etichetta passioni"
                />
                <EditableText
                  className="site-body about-hobby-copy"
                  value={chiSono.toolkitBody}
                  editing={editing}
                  multiline
                  onChange={(value) => setChiSono("toolkitBody", value)}
                  ariaLabel="Testo passioni"
                />
                {hobbies.length ? (
                  <ul className="about-hobby-list">
                    {hobbies.map((item, index) => {
                      const Icon = HOBBY_ICONS[item.id] ?? Sparkles
                      return (
                        <li key={item.id || item.label}>
                          <span className="about-hobby-mark" aria-hidden="true">
                            <Icon size={18} strokeWidth={1.75} />
                          </span>
                          <EditableText
                            className="about-hobby-label"
                            value={item.label}
                            editing={editing}
                            onChange={(value) => setHobby(index, value)}
                            ariaLabel={`Passione ${index + 1}`}
                          />
                        </li>
                      )
                    })}
                  </ul>
                ) : null}
                <TagEditor
                  tags={tags}
                  editing={editing}
                  listClassName="toolkit-list"
                  addLabel="Nuovo tag"
                  onRename={setToolkitTag}
                  onAdd={addToolkitTag}
                  onRemove={removeToolkitTag}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default function ChiSono() {
  const {
    display,
    editing,
    setChiSono,
    setNote,
    setHobby,
    setToolkitTag,
    addToolkitTag,
    removeToolkitTag,
  } = useSite()
  const { chiSono } = display
  const [expanded, setExpanded] = useState(
    () => typeof window !== "undefined" && window.location.hash === "#chi-sono",
  )
  const open = expanded || editing
  const [fullMounted, setFullMounted] = useState(open)
  const [foldOpen, setFoldOpen] = useState(open)
  const closeTimer = useRef(null)
  const notes = chiSono.notes ?? []
  const openLabel = chiSono.openLabel || "Apri il foglio"
  const closeLabel = chiSono.closeLabel || "Chiudi il foglio"
  const peek = chiSono.peek || ""
  const hobbyProps = {
    chiSono,
    editing,
    foldOpen,
    fullMounted,
    setChiSono,
    setHobby,
    setToolkitTag,
    addToolkitTag,
    removeToolkitTag,
  }

  useEffect(() => {
    const onOpen = () => setExpanded(true)
    const onHash = () => {
      if (window.location.hash === "#chi-sono") setExpanded(true)
    }
    window.addEventListener(ABOUT_OPEN, onOpen)
    window.addEventListener("hashchange", onHash)
    return () => {
      window.removeEventListener(ABOUT_OPEN, onOpen)
      window.removeEventListener("hashchange", onHash)
    }
  }, [])

  useEffect(() => {
    if (open) {
      clearTimeout(closeTimer.current)
      setFullMounted(true)
      return
    }
    setFoldOpen(false)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    closeTimer.current = setTimeout(() => setFullMounted(false), reduce ? 0 : FOLD_MS)
    return () => clearTimeout(closeTimer.current)
  }, [open])

  useEffect(() => {
    if (!open || !fullMounted) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setFoldOpen(true)
      return
    }
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setFoldOpen(true))
    })
    return () => cancelAnimationFrame(id)
  }, [open, fullMounted])

  const closeFold = () => {
    setExpanded(false)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    document.getElementById("chi-sono")?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    })
  }

  return (
    <SiteSection id="chi-sono" className="scroll-mt-24" wash aria-labelledby="chi-sono-title">
      <div className="site-content about-grid about-layout">
        <div className="about-main">
          <header className="about-hero">
            <EditableText
              className="site-eyebrow"
              value={chiSono.eyebrow}
              editing={editing}
              onChange={(value) => setChiSono("eyebrow", value)}
              ariaLabel="Etichetta profilo"
            />
            <EditableText
              as="h2"
              id="chi-sono-title"
              className="site-headline"
              value={chiSono.title}
              editing={editing}
              onChange={(value) => setChiSono("title", value)}
              ariaLabel="Titolo profilo"
            />
            {editing ? null : (
              <div className="about-toolbar">
                {open ? (
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={closeFold}
                    aria-expanded="true"
                    aria-controls="about-fold about-hobby-fold"
                  >
                    {closeLabel}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setExpanded(true)}
                    aria-expanded="false"
                    aria-controls="about-fold about-hobby-fold"
                  >
                    {openLabel}
                  </button>
                )}
              </div>
            )}
            {editing ? (
              <div className="site-tag-add">
                <input
                  className="site-tag-add-input"
                  value={openLabel}
                  aria-label="Testo apri foglio"
                  onChange={(event) => setChiSono("openLabel", event.target.value)}
                />
                <input
                  className="site-tag-add-input"
                  value={closeLabel}
                  aria-label="Testo chiudi foglio"
                  onChange={(event) => setChiSono("closeLabel", event.target.value)}
                />
                <input
                  className="site-tag-add-input"
                  value={peek}
                  aria-label="Testo anteprima profilo"
                  onChange={(event) => setChiSono("peek", event.target.value)}
                />
              </div>
            ) : null}
          </header>

          <div id="about-fold" className={foldOpen ? "about-fold is-open" : "about-fold"}>
            <div className="about-fold-peek" aria-hidden={foldOpen}>
              <div className="about-fold-clip">
                <div className="about-peek">
                  {peek ? <p className="about-peek-line">{glueItalianWrap(peek)}</p> : null}
                  {notes.length ? (
                    <ul className="about-peek-chips">
                      {notes.map((note) => (
                        <li key={note.title}>
                          <span className="about-peek-chip">{note.title}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className="about-fold-full"
              aria-hidden={!foldOpen}
              {...(!foldOpen ? { inert: true } : {})}
            >
              <div className="about-fold-clip">
                {fullMounted ? (
                  <div className="about-fold-inner about-copy">
                    <EditableText
                      className="site-body"
                      value={chiSono.body1}
                      editing={editing}
                      multiline
                      onChange={(value) => setChiSono("body1", value)}
                      ariaLabel="Primo paragrafo profilo"
                    />
                    <EditableText
                      className="site-body"
                      value={chiSono.body2}
                      editing={editing}
                      multiline
                      onChange={(value) => setChiSono("body2", value)}
                      ariaLabel="Secondo paragrafo profilo"
                    />
                    <div className="studio-list">
                      <EditableText
                        className="site-eyebrow"
                        value={chiSono.notesEyebrow}
                        editing={editing}
                        onChange={(value) => setChiSono("notesEyebrow", value)}
                        ariaLabel="Etichetta note profilo"
                      />
                      {notes.map((note, index) => (
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
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <HobbyPanel {...hobbyProps} />
      </div>
    </SiteSection>
  )
}
