import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import {
  checkEditorPassword,
  EDITOR_GRANTED,
  EDITOR_SESSION,
  grantEditorSession,
  isEditorSession,
} from "../utils/editorSession"

const EditorAccessContext = createContext(null)

export function EditorAccessProvider({ children }) {
  const [allowed, setAllowed] = useState(isEditorSession)
  const [unlockOpen, setUnlockOpen] = useState(false)

  useEffect(() => {
    const sync = () => setAllowed(isEditorSession())

    if (new URLSearchParams(window.location.search).get("edit") === "1") {
      try {
        sessionStorage.setItem(EDITOR_SESSION, "1")
      } catch {
        /* ignore quota / private mode */
      }
      setAllowed(true)
    }

    window.addEventListener(EDITOR_GRANTED, sync)
    return () => window.removeEventListener(EDITOR_GRANTED, sync)
  }, [])

  const requestUnlock = useCallback(() => {
    if (isEditorSession()) {
      setAllowed(true)
      return
    }
    setUnlockOpen(true)
  }, [])

  const closeUnlock = useCallback(() => setUnlockOpen(false), [])

  const submitUnlock = useCallback((password) => {
    if (!checkEditorPassword(password)) return false
    grantEditorSession()
    setAllowed(true)
    setUnlockOpen(false)
    return true
  }, [])

  const value = useMemo(
    () => ({
      allowed,
      unlockOpen,
      requestUnlock,
      closeUnlock,
      submitUnlock,
    }),
    [allowed, closeUnlock, requestUnlock, submitUnlock, unlockOpen]
  )

  return <EditorAccessContext.Provider value={value}>{children}</EditorAccessContext.Provider>
}

export function useEditorAccess() {
  const ctx = useContext(EditorAccessContext)
  if (!ctx) throw new Error("useEditorAccess deve essere usato dentro EditorAccessProvider")
  return ctx.allowed
}

export function useEditorUnlock() {
  const ctx = useContext(EditorAccessContext)
  if (!ctx) throw new Error("useEditorUnlock deve essere usato dentro EditorAccessProvider")
  return ctx
}
