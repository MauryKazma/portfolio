import { Fragment, useState } from "react"
import { X } from "lucide-react"
import { useSite } from "../context/SiteContentProvider"

export default function SiteTicker() {
  const { display, editing, setTickerItem, addTickerItem, removeTickerItem } = useSite()
  const [draft, setDraft] = useState("")
  const items = display.ticker?.items ?? []
  const phrases = items.map((item) => item.trim()).filter(Boolean)

  const add = () => {
    addTickerItem(draft)
    setDraft("")
  }

  if (editing) {
    return (
      <div className="site-ticker is-editing">
        <div className="site-content">
          <p className="site-ticker-edit-label">Mestieri</p>
          <ul className="site-ticker-edit-list">
            {items.map((item, index) => (
              <Fragment key={`edit-${index}`}>
                {index > 0 ? (
                  <li className="site-ticker-sep" aria-hidden="true">
                    ·
                  </li>
                ) : null}
                <li className="site-ticker-edit-item">
                  <input
                    className="site-tag-input"
                    value={item}
                    aria-label={`Voce mestiere ${index + 1}`}
                    onChange={(event) => setTickerItem(index, event.target.value)}
                  />
                  <button
                    type="button"
                    className="site-tag-remove"
                    aria-label={`Rimuovi ${item || "voce"}`}
                    onClick={() => removeTickerItem(index)}
                  >
                    <X size={14} aria-hidden />
                  </button>
                </li>
              </Fragment>
            ))}
          </ul>
          <div className="site-tag-add">
            <input
              className="site-tag-add-input"
              value={draft}
              placeholder="Nuova voce"
              aria-label="Nuova voce mestieri"
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault()
                  add()
                }
              }}
            />
            <button type="button" className="btn-secondary" onClick={add}>
              Aggiungi voce
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!phrases.length) return null

  return (
    <div className="site-ticker">
      <ul className="site-ticker-track">
        {phrases.map((label, index) => (
          <li key={`${label}-${index}`} className="site-ticker-item">
            {label}
          </li>
        ))}
      </ul>
    </div>
  )
}
