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

export function applySeo({ title, path, image = "/og.png" } = {}) {
  const origin = window.location.origin
  const cleanPath = path || window.location.pathname.replace(/\/+$/, "") || "/"
  const pageUrl = `${origin}${cleanPath === "/" ? "/" : cleanPath}`
  const imageUrl = image.startsWith("http") ? image : `${origin}${image}`

  if (title) document.title = title
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", pageUrl)
  document.querySelector('meta[property="og:url"]')?.setAttribute("content", pageUrl)
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", title ?? document.title)
  document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", title ?? document.title)
  document.querySelector('meta[property="og:image"]')?.setAttribute("content", imageUrl)
  document.querySelector('meta[name="twitter:image"]')?.setAttribute("content", imageUrl)
}
