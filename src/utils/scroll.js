import { navigateTo, parsePath } from "./route"

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

let pendingSection = null

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  })
}

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  })
}

export function goToSection(id) {
  if (parsePath().name !== "home") {
    pendingSection = id
    navigateTo("/")
    return
  }
  scrollToId(id)
}

export function goHome() {
  if (parsePath().name !== "home") {
    pendingSection = "__top__"
    navigateTo("/")
    return
  }
  scrollToTop()
}

export function consumePendingScroll() {
  const id = pendingSection
  pendingSection = null
  if (!id) return false
  if (id === "__top__") scrollToTop()
  else scrollToId(id)
  return true
}
