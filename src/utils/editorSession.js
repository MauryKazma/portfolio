export const EDITOR_SESSION = "site-editor"
export const EDITOR_GRANTED = "site-editor-granted"

/**
 * L'editor gira solo nel browser, quindi non può custodire un vero segreto:
 * chiunque legga il bundle vede questo digest. Serve a due cose concrete —
 * la password non è più in chiaro nel sorgente pubblico, e `?edit=1` non
 * apre più niente da solo. Quello che l'editor tocca è comunque soltanto il
 * localStorage di chi lo usa: per pubblicare serve un commit del JSON.
 */
const UNLOCK_SALT = "pulita.editor.v1"
const UNLOCK_DIGEST = "3738ce1a69f2bf9187d8fbcdcdce15dfc840acac0323b4d2314be92e64b9a363"

export function isEditorSession() {
  try {
    return sessionStorage.getItem(EDITOR_SESSION) === "1"
  } catch {
    return false
  }
}

/** `?edit=1` chiede la password, non la salta. */
export function wantsEditor() {
  try {
    return new URLSearchParams(window.location.search).get("edit") === "1"
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

async function sha256Hex(value) {
  const bytes = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest("SHA-256", bytes)
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("")
}

export async function checkEditorPassword(value) {
  const candidate = String(value ?? "")
  if (!candidate) return false
  try {
    return (await sha256Hex(UNLOCK_SALT + candidate)) === UNLOCK_DIGEST
  } catch {
    return false
  }
}
