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

function preloadLatinFonts() {
  const critical = ["instrument-serif-latin-400-italic", "geist-latin-400-normal"]
  return {
    name: "preload-latin-fonts",
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle) return html
      const links = Object.values(ctx.bundle)
        .filter(
          (asset) =>
            asset.type === "asset" &&
            typeof asset.fileName === "string" &&
            asset.fileName.endsWith(".woff2") &&
            critical.some((name) => asset.fileName.includes(name))
        )
        .map(
          (asset) =>
            `    <link rel="preload" href="/${asset.fileName}" as="font" type="font/woff2" crossorigin />`
        )
      if (!links.length) return html
      return html.replace("</title>", `</title>\n${links.join("\n")}`)
    },
  }
}

export default defineConfig({
  appType: "spa",
  plugins: [react(), tailwindcss(), preloadLatinFonts(), spaNotFound()],
})
