function prefersLiteMotion() {
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(prefers-reduced-data: reduce)").matches ||
    Boolean(navigator.connection?.saveData)
  )
}

function syncLiteMotion() {
  document.documentElement.classList.toggle("is-lite", prefersLiteMotion())
}

export function applyLook() {
  document.documentElement.dataset.look = "clean"
  syncLiteMotion()
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
  const data = window.matchMedia("(prefers-reduced-data: reduce)")
  motion.addEventListener("change", syncLiteMotion)
  data.addEventListener("change", syncLiteMotion)
  navigator.connection?.addEventListener?.("change", syncLiteMotion)
  try {
    localStorage.removeItem("site-look")
  } catch {
    /* ignore quota / private mode */
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", "#ffffff")
}
