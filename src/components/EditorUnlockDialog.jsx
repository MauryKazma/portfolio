import { useEffect, useId, useRef, useState } from "react"
import { X } from "lucide-react"
import { useEditorUnlock } from "../hooks/useEditorAccess"
import { IconButton } from "./cv/cvUi"

export default function EditorUnlockDialog() {
  const { unlockOpen, closeUnlock, submitUnlock } = useEditorUnlock()
  const titleId = useId()
  const descId = useId()
  const errorId = useId()
  const inputRef = useRef(null)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (!unlockOpen) {
      setPassword("")
      setError("")
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 20)
    const onKey = (event) => {
      if (event.key === "Escape") closeUnlock()
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", onKey)
      window.clearTimeout(focusTimer)
    }
  }, [closeUnlock, unlockOpen])

  if (!unlockOpen) return null

  const submit = (event) => {
    event.preventDefault()
    if (submitUnlock(password)) return
    setError("Password non corretta.")
    inputRef.current?.select()
  }

  return (
    <div className="cv-dialog-backdrop" onClick={closeUnlock}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="cv-dialog editor-unlock-dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cv-dialog-head">
          <h3 id={titleId} className="cv-dialog-title">
            Modifica testi
          </h3>
          <IconButton label="Chiudi" onClick={closeUnlock}>
            <X size={16} aria-hidden />
          </IconButton>
        </div>
        <p id={descId} className="cv-dialog-body">
          Inserisci la password per modificare i testi del sito.
        </p>
        <form className="editor-unlock-form" onSubmit={submit}>
          <label htmlFor="editor-unlock-password" className="cv-label">
            Password
          </label>
          <input
            ref={inputRef}
            id="editor-unlock-password"
            className="cv-input"
            type="password"
            name="password"
            autoComplete="off"
            value={password}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            onChange={(event) => {
              setPassword(event.target.value)
              if (error) setError("")
            }}
          />
          {error ? (
            <p id={errorId} className="cv-error" role="alert">
              {error}
            </p>
          ) : null}
          <div className="cv-dialog-actions">
            <button type="button" className="btn-secondary" onClick={closeUnlock}>
              Annulla
            </button>
            <button type="submit" className="btn-primary">
              Entra
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
