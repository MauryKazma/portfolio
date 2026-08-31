export const ABOUT_OPEN = "portfolio:about-open"

export function openAboutFold() {
  window.dispatchEvent(new Event(ABOUT_OPEN))
}
