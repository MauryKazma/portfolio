import { Fragment, useState } from "react"
import { X } from "lucide-react"
import { useSite } from "../context/SiteContentProvider"

function TickerTrack({ items }) {
  const loop = [...items, ...items]

  return (
    <div className="ink-ticker-track">
      {loop.map((label, index) => (
        <Fragment key={`${label}-${index}`}>
          <span className="ink-ticker-item">{label}</span>
          <span className="ink-ticker-sep" aria-hidden="true">
            —
          </span>
        </Fragment>
      ))}
    </div>
  )
}

export default function InkTicker() {
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
      <div className="ink-ticker is-editing">
        <div className="site-content">
          <p className="ink-ticker-edit-label">Testi in scorrimento</p>
          <ul className="ink-ticker-edit-list">
            {items.map((item, index) => (
              <Fragment key={`edit-${index}`}>
                {index > 0 ? (
                  <li className="ink-ticker-sep" aria-hidden="true">
                    —
                  </li>
                ) : null}
                <li className="ink-ticker-edit-item">
                  <input
                    className="site-tag-input"
                    value={item}
                    aria-label={`Voce ticker ${index + 1}`}
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
              aria-label="Nuova voce del ticker"
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
    <div className="ink-ticker" aria-hidden="true">
      <TickerTrack items={phrases} />
    </div>
  )
}
