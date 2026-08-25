import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

export function EditableText({
  as = "p",
  className = "",
  value,
  onChange,
  editing,
  multiline = false,
  id,
  ariaLabel,
}) {
  const Tag = as

  if (!editing) {
    return (
      <Tag id={id} className={className}>
        {value}
      </Tag>
    )
  }

  const shared = {
    id,
    className: `${className} site-edit-field`.trim(),
    value: value ?? "",
    onChange: (event) => onChange(event.target.value),
    "aria-label": ariaLabel,
  }

  if (multiline) {
    const rows = Math.min(8, Math.max(3, Math.ceil((value?.length || 0) / 56)))
    return <textarea {...shared} rows={rows} />
  }

  return <input type="text" {...shared} />
}

export function InlineEdit({ value, onChange, editing, className = "", as = "span", ariaLabel }) {
  const ref = useRef(null)
  const Tag = as

  useEffect(() => {
    if (!ref.current) return
    if (document.activeElement === ref.current) return
    if (ref.current.textContent !== value) ref.current.textContent = value ?? ""
  }, [value])

  if (!editing) {
    return <Tag className={className}>{value}</Tag>
  }

  return (
    <Tag
      ref={ref}
      className={`${className} site-edit-inline`.trim()}
      contentEditable
      role="textbox"
      aria-label={ariaLabel}
      suppressContentEditableWarning
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => {
        event.stopPropagation()
        if (event.key === "Enter") {
          event.preventDefault()
          event.currentTarget.blur()
        }
      }}
      onBlur={(event) => onChange(event.currentTarget.textContent ?? "")}
    >
      {value}
    </Tag>
  )
}

export function TagEditor({ tags, editing, onRename, onAdd, onRemove, listClassName, addLabel }) {
  const [draft, setDraft] = useState("")

  const add = () => {
    const label = draft.trim()
    if (!label) return
    onAdd(label)
    setDraft("")
  }

  return (
    <div>
      <ul className={listClassName}>
        {tags.map((tag, index) => (
          <li key={`${tag}-${index}`}>
            {editing ? (
              <>
                <input
                  className="site-tag-input"
                  value={tag}
                  aria-label={`Tag ${index + 1}`}
                  onChange={(event) => onRename(index, event.target.value)}
                />
                <button
                  type="button"
                  className="site-tag-remove"
                  aria-label={`Rimuovi tag ${tag}`}
                  onClick={() => onRemove(index)}
                >
                  <X size={14} aria-hidden />
                </button>
              </>
            ) : (
              tag
            )}
          </li>
        ))}
      </ul>
      {editing ? (
        <div className="site-tag-add">
          <input
            className="site-tag-add-input"
            value={draft}
            placeholder={addLabel}
            aria-label={addLabel}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault()
                add()
              }
            }}
          />
          <button type="button" className="btn-secondary" onClick={add}>
            Aggiungi tag
          </button>
        </div>
      ) : null}
    </div>
  )
}
