export const EDITOR_SESSION = "site-editor"

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
