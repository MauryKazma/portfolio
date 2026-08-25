export function applyLook() {
  document.documentElement.dataset.look = "clean"
  try {
    localStorage.removeItem("site-look")
  } catch {
    /* ignore quota / private mode */
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", "#ffffff")
}
