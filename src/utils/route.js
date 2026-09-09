export function parsePath(pathname = window.location.pathname) {
  const path = pathname.replace(/\/+$/, "") || "/"
  const match = path.match(/^\/lavori\/([^/]+)$/)
  if (match) return { name: "case", id: decodeURIComponent(match[1]) }
  if (path === "/") return { name: "home" }
  return { name: "unknown" }
}

function withEditParam(path) {
  const url = new URL(path, window.location.origin)
  const edit = new URLSearchParams(window.location.search).get("edit")
  if (edit) url.searchParams.set("edit", edit)
  return `${url.pathname}${url.search}`
}

export function navigateTo(path) {
  const next = withEditParam(path)
  const current = `${window.location.pathname}${window.location.search}`
  if (next === current) {
    window.dispatchEvent(new Event("app:route"))
    return
  }
  window.history.pushState({}, "", next)
  window.dispatchEvent(new Event("app:route"))
}

function setMeta(selector, value) {
  if (!value) return
  document.querySelector(selector)?.setAttribute("content", value)
}

/**
 * Aggiorna titolo, canonical, descrizione e anteprima social della pagina corrente.
 *
 * Il sito è una SPA: senza questo, ogni progetto condiviso su WhatsApp o
 * LinkedIn mostrerebbe titolo, testo e immagine della home.
 */
export function applySeo({ title, path, description, image = "/og.png", noindex = false } = {}) {
  const origin = window.location.origin
  const cleanPath = path || window.location.pathname.replace(/\/+$/, "") || "/"
  const pageUrl = `${origin}${cleanPath === "/" ? "/" : cleanPath}`
  const rawImage = String(image || "/og.png")
  // Un'immagine caricata nell'editor è un data URL: come anteprima non serve a nulla.
  const safeImage = rawImage.startsWith("data:") ? "/og.png" : rawImage
  const imageUrl = safeImage.startsWith("http") ? safeImage : `${origin}${safeImage}`

  if (title) document.title = title
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", pageUrl)
  setMeta('meta[property="og:url"]', pageUrl)
  setMeta('meta[property="og:title"]', title ?? document.title)
  setMeta('meta[name="twitter:title"]', title ?? document.title)
  setMeta('meta[property="og:image"]', imageUrl)
  setMeta('meta[name="twitter:image"]', imageUrl)
  if (description) {
    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[name="twitter:description"]', description)
  }
  document
    .querySelector('meta[property="og:type"]')
    ?.setAttribute("content", cleanPath === "/" ? "website" : "article")

  const robots = document.querySelector('meta[name="robots"]')
  if (robots) robots.setAttribute("content", noindex ? "noindex, follow" : "index, follow")
}

/** Dati strutturati della pagina: Person sulla home, CreativeWork sui progetti. */
export function applyStructuredData(data) {
  const tag = document.getElementById("ld-page")
  if (!tag) return
  tag.textContent = JSON.stringify(data)
}
