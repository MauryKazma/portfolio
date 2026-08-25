import { useEffect, useId, useRef } from "react"
import { ChevronDown, ChevronUp, GripVertical, Plus, Trash2, X } from "lucide-react"

export function CVField({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  type = "text",
  placeholder,
  optional = false,
  disabled = false,
}) {
  const errorId = `${id}-error`
  const describedBy = error ? errorId : undefined

  return (
    <div className="cv-field">
      <label htmlFor={id} className="cv-label">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
        {optional ? <span className="cv-optional"> opzionale</span> : null}
      </label>
      <input
        id={id}
        type={type}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="cv-input"
      />
      {error ? (
        <p id={errorId} className="cv-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function CVTextarea({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  optional = false,
  rows = 4,
  placeholder,
}) {
  const errorId = `${id}-error`

  return (
    <div className="cv-field">
      <label htmlFor={id} className="cv-label">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
        {optional ? <span className="cv-optional"> opzionale</span> : null}
      </label>
      <textarea
        id={id}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="cv-input cv-textarea"
      />
      {error ? (
        <p id={errorId} className="cv-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function CVCheckbox({ id, label, checked, onChange }) {
  return (
    <label htmlFor={id} className="cv-check">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>{label}</span>
    </label>
  )
}

export function PrimaryButton({ children, ref, ...props }) {
  return (
    <button type="button" className="cv-btn-primary" ref={ref} {...props}>
      {children}
    </button>
  )
}

export function SecondaryButton({ children, ...props }) {
  return (
    <button type="button" className="cv-btn-secondary" {...props}>
      {children}
    </button>
  )
}

export function IconButton({ label, children, danger = false, ...props }) {
  return (
    <button
      type="button"
      className={danger ? "cv-icon-btn cv-icon-btn-danger" : "cv-icon-btn"}
      aria-label={label}
      title={label}
      {...props}
    >
      {children}
    </button>
  )
}

export function ListToolbar({
  onMoveUp,
  onMoveDown,
  onRemove,
  disableUp,
  disableDown,
  dragHandleProps,
  removeLabel,
}) {
  return (
    <div className="cv-list-toolbar">
      <button
        type="button"
        className="cv-icon-btn cv-drag-handle"
        aria-label="Trascina per riordinare"
        title="Trascina per riordinare"
        {...dragHandleProps}
      >
        <GripVertical size={16} aria-hidden />
      </button>
      <IconButton label="Sposta su" onClick={onMoveUp} disabled={disableUp}>
        <ChevronUp size={16} aria-hidden />
      </IconButton>
      <IconButton label="Sposta giù" onClick={onMoveDown} disabled={disableDown}>
        <ChevronDown size={16} aria-hidden />
      </IconButton>
      <IconButton label={removeLabel} danger onClick={onRemove}>
        <Trash2 size={16} aria-hidden />
      </IconButton>
    </div>
  )
}

export function AddButton({ children, onClick }) {
  return (
    <button type="button" className="cv-btn-add" onClick={onClick}>
      <Plus size={16} aria-hidden />
      {children}
    </button>
  )
}

export function useSortable(index, onMove) {
  const dragIndex = useRef(null)

  return {
    handleProps: {
      draggable: true,
      onDragStart: (event) => {
        dragIndex.current = index
        event.dataTransfer.effectAllowed = "move"
        event.dataTransfer.setData("text/plain", String(index))
      },
      onDragEnd: () => {
        dragIndex.current = null
      },
    },
    itemProps: {
      onDragOver: (event) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = "move"
      },
      onDrop: (event) => {
        event.preventDefault()
        const from = Number(event.dataTransfer.getData("text/plain"))
        if (Number.isNaN(from) || from === index) return
        onMove(from, index)
      },
    },
  }
}

export function ConfirmDialog({ dialog, onClose }) {
  const titleId = useId()
  const descId = useId()
  const confirmRef = useRef(null)

  useEffect(() => {
    if (!dialog) return undefined
    confirmRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (event) => {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", onKey)
    }
  }, [dialog, onClose])

  if (!dialog) return null

  return (
    <div className="cv-dialog-backdrop" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="cv-dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cv-dialog-head">
          <h3 id={titleId} className="cv-dialog-title">
            {dialog.title}
          </h3>
          <IconButton label="Chiudi" onClick={onClose}>
            <X size={16} aria-hidden />
          </IconButton>
        </div>
        <p id={descId} className="cv-dialog-body">
          {dialog.message}
        </p>
        <div className="cv-dialog-actions">
          <SecondaryButton onClick={onClose}>Annulla</SecondaryButton>
          <PrimaryButton
            ref={confirmRef}
            onClick={() => {
              dialog.onConfirm?.()
              onClose()
            }}
          >
            {dialog.confirmLabel ?? "Conferma"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}
