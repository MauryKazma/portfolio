import { copyFileSync, existsSync } from "node:fs"
import { resolve } from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

function spaNotFound() {
  return {
    name: "spa-404",
    closeBundle() {
      const index = resolve(process.cwd(), "dist/index.html")
      const notFound = resolve(process.cwd(), "dist/404.html")
      if (existsSync(index)) copyFileSync(index, notFound)
    },
  }
}

export default defineConfig({
  appType: "spa",
  plugins: [react(), tailwindcss(), spaNotFound()],
})
