/**
 * Ponte fra l'editor del sito e il repo.
 *
 * "Salva" scrive nel localStorage del browser: resta privato, non viaggia col deploy.
 * "Esporta JSON" produce il file da mettere in `src/data/siteContent.json` e committare:
 * è quello il momento in cui un contenuto diventa pubblico.
 */

export const CONTENT_FILE_NAME = "siteContent.json"

export function downloadSiteContent(data) {
  const payload = `${JSON.stringify(data, null, 2)}\n`
  const url = URL.createObjectURL(new Blob([payload], { type: "application/json" }))
  const link = document.createElement("a")
  link.href = url
  link.download = CONTENT_FILE_NAME
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export function readSiteContentFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result))
        if (!parsed || typeof parsed !== "object" || !parsed.hero || !parsed.lavori?.projects) {
          reject(new Error("Il file non sembra un contenuto del sito."))
          return
        }
        resolve(parsed)
      } catch {
        reject(new Error("JSON non valido."))
      }
    }
    reader.onerror = () => reject(new Error("Lettura del file non riuscita."))
    reader.readAsText(file)
  })
}
