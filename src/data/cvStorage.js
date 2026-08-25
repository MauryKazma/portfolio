const STORAGE_KEY = "portfolio-cv-data"

export const cvStorage = {
  key: STORAGE_KEY,

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw)
      if (!parsed || typeof parsed !== "object") return null
      if (!parsed.personalInfo || !Array.isArray(parsed.experiences)) return null
      return parsed
    } catch {
      return null
    }
  },

  save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY)
  },
}
