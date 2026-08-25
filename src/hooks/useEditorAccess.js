import { useEffect, useState } from "react"
import { EDITOR_SESSION, isEditorSession } from "../utils/editorSession"

export function useEditorAccess() {
  const [allowed, setAllowed] = useState(isEditorSession)

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("edit") !== "1") return
    try {
      sessionStorage.setItem(EDITOR_SESSION, "1")
    } catch {
      /* ignore quota / private mode */
    }
    setAllowed(true)
  }, [])

  return allowed
}
