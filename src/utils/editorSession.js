export const EDITOR_SESSION = "site-editor"
export const EDITOR_GRANTED = "site-editor-granted"

const UNLOCK_SECRET = "SAMAEL666"

export function isEditorSession() {
  try {
    return (
      sessionStorage.getItem(EDITOR_SESSION) === "1" ||
      new URLSearchParams(window.location.search).get("edit") === "1"
    )
  } catch {
    return false
  }
}

export function grantEditorSession() {
  try {
    sessionStorage.setItem(EDITOR_SESSION, "1")
  } catch {
    /* ignore quota / private mode */
  }
  window.dispatchEvent(new Event(EDITOR_GRANTED))
}

export function checkEditorPassword(value) {
  return String(value ?? "") === UNLOCK_SECRET
}
