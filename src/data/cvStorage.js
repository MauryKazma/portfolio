const STORAGE_KEY = "portfolio-cv-data"

function isQuotaError(error) {
  return error?.name === "QuotaExceededError" || error?.code === 22 || error?.code === 1014
}

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
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      return { ok: true }
    } catch (error) {
      return { ok: false, quota: isQuotaError(error) }
    }
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY)
  },
}
