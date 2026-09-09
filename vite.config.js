import { copyFileSync, existsSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import site from "./src/data/siteContent.json" with { type: "json" }

const SITE_URL = "https://portfolio-production-cb03.up.railway.app"

/** La sitemap si rigenera dai contenuti a ogni build, così non invecchia. */
function sitemap() {
  return {
    name: "sitemap",
    closeBundle() {
      const today = new Date().toISOString().slice(0, 10)
      const paths = ["/", ...(site.lavori?.projects ?? []).map((p) => `/lavori/${p.id}`)]
      const urls = paths
        .map(
          (path) =>
            `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${today}</lastmod>\n` +
            `    <priority>${path === "/" ? "1.0" : "0.7"}</priority>\n  </url>`
        )
        .join("\n")
      writeFileSync(
        resolve(process.cwd(), "dist/sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
      )
    },
  }
}

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
  plugins: [react(), tailwindcss(), preloadLatinFonts(), sitemap(), spaNotFound()],
})
