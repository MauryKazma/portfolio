const LOOK_KEY = "site-look"

export function getLook() {
  const query = new URLSearchParams(window.location.search).get("look")
  if (query === "ink" || query === "clean") {
    try {
      localStorage.setItem(LOOK_KEY, query)
    } catch {
      /* ignore quota / private mode */
    }
    return query
  }
  try {
    const stored = localStorage.getItem(LOOK_KEY)
    if (stored === "ink" || stored === "clean") return stored
  } catch {
    /* ignore */
  }
  return "clean"
}

export function setLook(look) {
  const next = look === "ink" ? "ink" : "clean"
  try {
    localStorage.setItem(LOOK_KEY, next)
  } catch {
    /* ignore */
  }
  document.documentElement.dataset.look = next
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", next === "ink" ? "#121212" : "#ffffff")
}

export function applyLook() {
  setLook(getLook())
}
