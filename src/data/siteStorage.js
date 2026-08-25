const STORAGE_KEY = "portfolio-site-content"

export const siteStorage = {
  key: STORAGE_KEY,

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw)
      if (!parsed || typeof parsed !== "object") return null
      if (!parsed.hero || !parsed.lavori?.projects || !parsed.chiSono) return null
      return parsed
    } catch {
      return null
    }
  },

  save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  },
}
