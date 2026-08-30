import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./looks/fonts.css"
import "./index.css"
import "./looks/clean.css"
import "./looks/chrome.css"
import { applyLook } from "./looks/applyLook"
import { applySeo } from "./utils/route"
import App from "./App.jsx"

applyLook()
applySeo()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
)
