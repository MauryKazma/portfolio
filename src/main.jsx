import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import "./looks/clean.css"
import "./looks/chrome.css"
import { applyLook } from "./looks/applyLook"
import App from "./App.jsx"

applyLook()

function absolutizeSeo() {
  const origin = window.location.origin
  const pageUrl = `${origin}/`
  const imageUrl = `${origin}/hero-portrait.svg`

  const canonical = document.querySelector('link[rel="canonical"]')
  if (canonical) canonical.setAttribute("href", pageUrl)

  document.querySelector('meta[property="og:url"]')?.setAttribute("content", pageUrl)
  document.querySelector('meta[property="og:image"]')?.setAttribute("content", imageUrl)
  document.querySelector('meta[name="twitter:image"]')?.setAttribute("content", imageUrl)
}

absolutizeSeo()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
)
