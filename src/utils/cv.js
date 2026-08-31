/**
 * @typedef {object} PersonalInfo
 * @property {string} fullName
 * @property {string} birthDate
 * @property {string} nationality
 * @property {string} sex
 * @property {string} phone
 * @property {string} whatsapp
 * @property {string} email
 * @property {string} address
 *
 * @typedef {object} WorkExperience
 * @property {string} id
 * @property {string} startDate
 * @property {string} endDate
 * @property {boolean} current
 * @property {string} company
 * @property {string} role
 * @property {string} location
 * @property {string} description
 * @property {string[]} [tags]
 * @property {number} order
 *
 * @typedef {object} EducationItem
 * @property {string} id
 * @property {string} startDate
 * @property {string} endDate
 * @property {string} title
 * @property {string} institute
 * @property {string} location
 * @property {string} description
 * @property {string} fieldOfStudy
 * @property {string} link
 * @property {string[]} [tags]
 * @property {number} order
 *
 * @typedef {object} LanguageSkill
 * @property {string} id
 * @property {string} name
 * @property {string} listening
 * @property {string} reading
 * @property {string} speaking
 * @property {string} interaction
 * @property {string} writing
 * @property {number} order
 *
 * @typedef {object} SkillItem
 * @property {string} id
 * @property {string} name
 * @property {number} order
 *
 * @typedef {object} SkillCategory
 * @property {string} id
 * @property {string} name
 * @property {string} [description]
 * @property {SkillItem[]} items
 * @property {number} order
 *
 * @typedef {object} CVData
 * @property {number} [contentRevision]
 * @property {PersonalInfo} personalInfo
 * @property {string} presentation
 * @property {WorkExperience[]} experiences
 * @property {EducationItem[]} education
 * @property {LanguageSkill[]} languages
 * @property {SkillCategory[]} digitalSkills
 * @property {string} [drivingLicence]
 * @property {string} [hobbies]
 * @property {SkillCategory[]} [interpersonalSkills]
 */

export function cloneCV(data) {
  return JSON.parse(JSON.stringify(data))
}

export function uniqueTag(list, label) {
  const next = String(label ?? "").trim()
  if (!next) return list
  if ((list ?? []).some((item) => String(item).toLowerCase() === next.toLowerCase())) return list
  return [...(list ?? []), next]
}

function mergeTaggedEntries(saved, fallback, emptyItem) {
  if (!Array.isArray(saved) || saved.length === 0) return fallback
  const byId = new Map(fallback.map((item) => [item.id, item]))
  return saved.map((item, index) => {
    const base = (item?.id && byId.get(item.id)) || fallback[index] || emptyItem()
    const savedTags = Array.isArray(item?.tags)
      ? item.tags.filter((tag) => typeof tag === "string" && tag.trim())
      : []
    const tags = savedTags.length ? savedTags : Array.isArray(base.tags) ? base.tags : []
    return {
      ...base,
      ...item,
      tags,
    }
  })
}

function digitalSkillsNeedRefresh(saved) {
  const names = (saved ?? [])
    .flatMap((category) => category.items ?? [])
    .map((item) => String(item.name ?? "").toLowerCase())
  return names.some(
    (name) =>
      name.includes("firefox") ||
      name.includes("microsoft edge") ||
      name.includes("utilizzo del pc") ||
      name.includes("lightroom")
  )
}

export function hydrateCV(saved, fallback) {
  const base = cloneCV(fallback)
  if (!saved || typeof saved !== "object") return base
  const savedRevision = Number(saved.contentRevision) || 0
  const currentRevision = Number(fallback.contentRevision) || 0
  const migrating = savedRevision < currentRevision
  return {
    ...base,
    ...saved,
    contentRevision: currentRevision,
    personalInfo: { ...base.personalInfo, ...(saved.personalInfo ?? {}) },
    experiences: mergeTaggedEntries(saved.experiences, base.experiences, emptyExperience),
    education: mergeTaggedEntries(saved.education, base.education, emptyEducation),
    languages: Array.isArray(saved.languages) && saved.languages.length ? saved.languages : base.languages,
    digitalSkills:
      migrating && digitalSkillsNeedRefresh(saved.digitalSkills)
        ? base.digitalSkills
        : Array.isArray(saved.digitalSkills) && saved.digitalSkills.length
          ? saved.digitalSkills
          : base.digitalSkills,
    interpersonalSkills:
      Array.isArray(saved.interpersonalSkills) && saved.interpersonalSkills.length
        ? saved.interpersonalSkills
        : base.interpersonalSkills,
    hobbies:
      typeof saved.hobbies === "string" && saved.hobbies.trim()
        ? saved.hobbies ===
          "Videogiochi, anime e manga, meme e hardware. Serate goliardiche con una birra dopo il lavoro, amici e colleghi. Ironia al primo posto, anche in studio."
          ? base.hobbies
          : saved.hobbies
        : base.hobbies,
  }
}

export function createId(prefix) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function byOrder(list) {
  return [...(list ?? [])].sort((a, b) => a.order - b.order)
}

export function reindex(list) {
  return list.map((item, index) => ({ ...item, order: index }))
}

export function moveItem(list, fromIndex, toIndex) {
  if (toIndex < 0 || toIndex >= list.length) return list
  const next = [...list]
  const [item] = next.splice(fromIndex, 1)
  next.splice(toIndex, 0, item)
  return reindex(next)
}

export function formatDateIT(iso) {
  if (!iso) return ""
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!match) return iso
  return `${match[3]}/${match[2]}/${match[1]}`
}

export function formatPeriod(startDate, endDate, current) {
  const start = formatDateIT(startDate) || "Data inizio non indicata"
  if (current) return `${start} — Attuale`
  const end = formatDateIT(endDate)
  return end ? `${start} — ${end}` : start
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/

function isValidIsoDate(value) {
  if (!ISO_DATE_RE.test(value)) return false
  const [year, month, day] = value.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}

function dateToNumber(iso) {
  return iso ? Number(iso.replaceAll("-", "")) : 0
}

/**
 * @param {CVData} data
 * @returns {Record<string, string>}
 */
export function validateCV(data) {
  /** @type {Record<string, string>} */
  const errors = {}
  const info = data.personalInfo ?? {}

  if (!info.fullName?.trim()) {
    errors["personalInfo.fullName"] = "Il nome è obbligatorio."
  }
  if (info.email?.trim() && !EMAIL_RE.test(info.email.trim())) {
    errors["personalInfo.email"] = "Inserisci un indirizzo email valido."
  }
  if (info.birthDate && !isValidIsoDate(info.birthDate)) {
    errors["personalInfo.birthDate"] = "La data di nascita non è valida."
  }

  byOrder(data.experiences).forEach((item) => {
    if (!item.role?.trim()) {
      errors[`experiences.${item.id}.role`] = "Il ruolo è obbligatorio."
    }
    if (!item.company?.trim()) {
      errors[`experiences.${item.id}.company`] = "L’azienda è obbligatoria."
    }
    if (!item.startDate) {
      errors[`experiences.${item.id}.startDate`] = "La data di inizio è obbligatoria."
    } else if (!isValidIsoDate(item.startDate)) {
      errors[`experiences.${item.id}.startDate`] = "La data di inizio non è valida."
    }
    if (!item.current && item.endDate) {
      if (!isValidIsoDate(item.endDate)) {
        errors[`experiences.${item.id}.endDate`] = "La data di fine non è valida."
      } else if (item.startDate && dateToNumber(item.endDate) < dateToNumber(item.startDate)) {
        errors[`experiences.${item.id}.endDate`] =
          "La data di fine non può precedere la data di inizio."
      }
    }
  })

  byOrder(data.education).forEach((item) => {
    if (!item.title?.trim()) {
      errors[`education.${item.id}.title`] = "Il titolo è obbligatorio."
    }
    if (!item.institute?.trim()) {
      errors[`education.${item.id}.institute`] = "L’istituto è obbligatorio."
    }
    if (item.startDate && !isValidIsoDate(item.startDate)) {
      errors[`education.${item.id}.startDate`] = "La data di inizio non è valida."
    }
    if (item.endDate && !isValidIsoDate(item.endDate)) {
      errors[`education.${item.id}.endDate`] = "La data di fine non è valida."
    }
    if (
      item.startDate &&
      item.endDate &&
      isValidIsoDate(item.startDate) &&
      isValidIsoDate(item.endDate) &&
      dateToNumber(item.endDate) < dateToNumber(item.startDate)
    ) {
      errors[`education.${item.id}.endDate`] =
        "La data di fine non può precedere la data di inizio."
    }
    if (item.link?.trim()) {
      try {
        const url = new URL(item.link.trim())
        if (!["http:", "https:"].includes(url.protocol)) {
          errors[`education.${item.id}.link`] = "Il link deve iniziare con http o https."
        }
      } catch {
        errors[`education.${item.id}.link`] = "Inserisci un link valido."
      }
    }
  })

  byOrder(data.languages).forEach((item) => {
    if (!item.name?.trim()) {
      errors[`languages.${item.id}.name`] = "La lingua è obbligatoria."
    }
  })

  byOrder(data.digitalSkills).forEach((category) => {
    if (!category.name?.trim()) {
      errors[`digitalSkills.${category.id}.name`] = "Il nome della categoria è obbligatorio."
    }
    byOrder(category.items).forEach((skill) => {
      if (!skill.name?.trim()) {
        errors[`digitalSkills.${category.id}.items.${skill.id}.name`] =
          "Il nome della competenza è obbligatorio."
      }
    })
  })

  byOrder(data.interpersonalSkills).forEach((category) => {
    if (!category.name?.trim()) {
      errors[`interpersonalSkills.${category.id}.name`] =
        "Il nome della categoria è obbligatorio."
    }
  })

  return errors
}

export function emptyExperience() {
  return {
    id: createId("exp"),
    startDate: "",
    endDate: "",
    current: false,
    company: "",
    role: "",
    location: "",
    description: "",
    tags: [],
    order: 0,
  }
}

export function emptyEducation() {
  return {
    id: createId("edu"),
    startDate: "",
    endDate: "",
    title: "",
    institute: "",
    location: "",
    description: "",
    fieldOfStudy: "",
    link: "",
    tags: [],
    order: 0,
  }
}

export function emptyLanguage() {
  return {
    id: createId("lang"),
    name: "",
    listening: "",
    reading: "",
    speaking: "",
    interaction: "",
    writing: "",
    order: 0,
  }
}

export function emptySkillCategory() {
  return {
    id: createId("skillcat"),
    name: "",
    description: "",
    items: [],
    order: 0,
  }
}

export function emptySkillItem() {
  return {
    id: createId("skill"),
    name: "",
    order: 0,
  }
}

export function whatsappHref(number) {
  const digits = String(number ?? "").replace(/\D/g, "")
  if (!digits) return ""
  const withCountry = digits.startsWith("39") ? digits : `39${digits}`
  return `https://wa.me/${withCountry}`
}

export function telHref(phone) {
  const digits = String(phone ?? "").replace(/[^\d+]/g, "")
  return digits ? `tel:${digits}` : ""
}
