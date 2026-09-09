import SITE_PUBLISHED from "./siteContent.json"

/**
 * Contenuti pubblicati, versionati nel repo.
 * Si aggiornano sostituendo siteContent.json con l'export dell'editor:
 * Modifica -> Esporta JSON -> sovrascrivi src/data/siteContent.json -> commit.
 */
export const SITE_DEFAULT = SITE_PUBLISHED

export const SITE_CONTENT_REVISION = SITE_DEFAULT.contentRevision

export function cloneSite(data) {
  return JSON.parse(JSON.stringify(data))
}

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

export function emptySkillTool() {
  return { id: uid("tool"), mark: "Ps", name: "Photoshop", level: 72, icon: "" }
}

export function clampSkillPercent(value) {
  const n = Number(value)
  if (!Number.isFinite(n)) return 72
  if (Number.isInteger(n) && n >= 0 && n <= 5) return n * 20
  return Math.max(0, Math.min(100, Math.round(n)))
}

/** Strumenti ritirati: non tornano anche se restano in un salvataggio vecchio. */
const OBSOLETE_TOOL_IDS = new Set(["tool-ae"])

function normalizeSkillTools(saved, fallback) {
  if (!Array.isArray(saved) || saved.length === 0) return fallback
  const bySaved = new Map(saved.filter((item) => item?.id).map((item) => [item.id, item]))
  const known = new Set(fallback.map((item) => item.id))
  const merged = fallback.map((base) => {
    const item = bySaved.get(base.id)
    const icon = base.icon
      ? base.icon
      : typeof item?.icon === "string" && item.icon.trim()
        ? item.icon.trim()
        : ""
    return {
      id: base.id,
      name: typeof item?.name === "string" ? item.name : base.name,
      mark: typeof item?.mark === "string" && item.mark.trim() ? item.mark.slice(0, 3) : base.mark,
      icon,
      level: clampSkillPercent(item?.level ?? base.level),
    }
  })
  saved.forEach((item) => {
    if (!item?.id || known.has(item.id) || OBSOLETE_TOOL_IDS.has(item.id)) return
    merged.push({
      id: item.id,
      name: typeof item.name === "string" ? item.name : "",
      mark: typeof item.mark === "string" && item.mark.trim() ? item.mark.slice(0, 3) : "Ps",
      icon: typeof item.icon === "string" ? item.icon : "",
      level: clampSkillPercent(item.level),
    })
  })
  return merged
}

function normalizeDisciplines(saved, fallback) {
  if (!Array.isArray(saved) || saved.length === 0) return fallback
  const byId = new Map(saved.map((item) => [item.id, item]))
  return fallback.map((item) => {
    const extra = byId.get(item.id)
    if (!extra || typeof extra !== "object") return item
    const tools = Array.isArray(extra.tools)
      ? extra.tools.filter((tool) => typeof tool === "string" && tool.trim())
      : item.tools
    return {
      ...item,
      title: polishCopy(nonempty(extra.title, item.title)).trim(),
      body: polishDisciplineBody(typeof extra.body === "string" ? extra.body : item.body),
      tools: tools.length ? tools : item.tools,
    }
  })
}

function mergeById(saved, base) {
  if (!Array.isArray(saved) || saved.length === 0) return base
  const byId = new Map(saved.map((item) => [item.id, item]))
  const merged = base.map((item) => ({ ...item, ...byId.get(item.id) }))
  const known = new Set(base.map((item) => item.id))
  saved.forEach((item) => {
    if (item?.id && !known.has(item.id)) merged.push(item)
  })
  return merged
}

function isStockProject(project) {
  const image = String(project?.image ?? "")
  const id = String(project?.id ?? "")
  return (
    image.includes("unsplash.com") ||
    /work-(identita|editoria|comunicazione)\.svg$/.test(image) ||
    ["nexus", "aura", "shift", "mono", "identita", "editoria", "comunicazione", "risparmiocasa", "portobello", "video-retail", "brand-identity", "industrialtech"].includes(id)
  )
}

function isStaleAboutToolkit(item) {
  const toolkit = item?.toolkit ?? []
  return (
    toolkit.includes("Battute in studio") ||
    toolkit.includes("Tool nuovi") ||
    toolkit.includes("Prototipi")
  )
}

function isStockAboutNotes(notes) {
  const titles = (notes ?? []).map((item) => String(item?.title ?? ""))
  return (
    titles.includes("Tool nuovi") ||
    titles.includes("Ironia in corsia") ||
    titles.includes("Supporti veri")
  )
}

function isLegacyChiSono(item) {
  const toolkit = item?.toolkit ?? []
  return (
    item?.title === "Designer." ||
    toolkit.includes("Liste prodotti") ||
    toolkit.includes("Volantini") ||
    /Mandarino Agency/.test(item?.body1 ?? "")
  )
}

function isStaleDigitalePhase(phase) {
  const title = String(phase?.title ?? "").trim()
  const body = String(phase?.body ?? "")
  return (
    phase?.id === "digitale" &&
    (title === "Tool interni" || /CUBOT e questo sito/i.test(body))
  )
}

function isLegacyServizi(servizi) {
  const title = servizi?.title ?? ""
  const phases = servizi?.phases
  return (
    /sito web/i.test(title) ||
    (Array.isArray(phases) &&
      phases.some((phase) => ["briefing", "prototipazione", "sviluppo"].includes(phase.id)))
  )
}

/** I vecchi testi dei servizi aprivano con una definizione da dizionario. */
function isDictionaryPhaseBody(phase) {
  return /^(È il processo|È l’insieme|È l'insieme|Processo di|Il montaggio video è)/i.test(
    String(phase?.body ?? "").trim()
  )
}

function normalizeServiziPhases(savedPhases, fallbackPhases, migrating = false) {
  const phases = Array.isArray(savedPhases) && savedPhases.length ? savedPhases : fallbackPhases
  const byId = new Map(fallbackPhases.map((item) => [item.id, item]))
  return phases.map((phase) => {
    const base = byId.get(phase?.id)
    if (migrating && base && (isStaleDigitalePhase(phase) || isDictionaryPhaseBody(phase))) {
      return { ...base }
    }
    const deliverables = Array.isArray(phase?.deliverables) && phase.deliverables.length
      ? phase.deliverables.filter((item) => typeof item === "string" && item.trim())
      : (base?.deliverables ?? [])
    return {
      ...phase,
      title: polishCopy(typeof phase?.title === "string" ? phase.title.trim() : phase?.title),
      body: polishPhaseBody(phase?.body),
      deliverables,
    }
  })
}

function nonempty(value, fallback) {
  return typeof value === "string" && value.trim() ? value : fallback
}

const COPY_FIXES = {
  "InDesign per l’editoria e le identità. Premiere per i video in store e allo stadio. Cursor e Antigravity per i tool interni.":
    "Dall’impaginazione editoriale al pensiero creativo, il passo è breve!",
  "Chi sono": "Profilo",
  "Dall'impaginazione editoriale al pensiero creativo il passo è breve!":
    "Dall’impaginazione editoriale al pensiero creativo, il passo è breve!",
  "Dall’impaginazione editoriale al pensiero creativo il passo è breve!":
    "Dall’impaginazione editoriale al pensiero creativo, il passo è breve!",
  "Integrazione strumenti AI": "Integrazione di strumenti AI",
  "Materiale POP da corsia, allineato al volantino: locandina 70×100, stopper, A4. Tre versioni, Rete, PRZ+BSS e ANC+BSS.":
    "Materiale POP da corsia, allineato al volantino: locandina 70×100, stopper, A4. Tre versioni: Rete, PRZ+BSS e ANC+BSS.",
  "Video prodotto per la rete Risparmio Casa. Premiere, packshot, durata breve, lettura anche da fermo.":
    "Video di prodotto per la rete Risparmio Casa. Premiere, packshot, durata breve, lettura anche da fermo.",
  "Tavola per Landaway. Parole ripetute in nero su bianco, un «annoiato?» al centro. Identità costruita solo di tipo.":
    "Tavola per Landaway. Parole ripetute in nero su bianco, un «annoiato?» al centro. Identità costruita solo di tipografia.",
}

function polishCopy(value) {
  if (typeof value !== "string") return value
  return COPY_FIXES[value] ?? value
}

function polishDisciplineBody(value) {
  const next = polishCopy(value)
  return typeof next === "string" ? next.replace(", e sperimento", " e sperimento") : next
}

function polishPhaseBody(value) {
  if (typeof value !== "string") return value
  let next = value.replace(/\s*\n\s*/g, " ").trim()
  if (/^l[’']insieme/i.test(next)) {
    next = `È ${next.charAt(0).toLowerCase()}${next.slice(1)}`
  } else if (/^Processo di /i.test(next)) {
    next = `È il ${next.charAt(0).toLowerCase()}${next.slice(1)}`
  } else if (/^Il montaggio video è /i.test(next)) {
    next = `È ${next.slice("Il montaggio video è ".length)}`
  }
  return polishCopy(next)
}

const OBSOLETE_PROJECT_IDS = new Set([
  "nexus",
  "aura",
  "shift",
  "mono",
  "identita",
  "editoria",
  "comunicazione",
  "industrialtech",
])

export function hydrateSite(saved) {
  const base = cloneSite(SITE_DEFAULT)
  if (!saved || typeof saved !== "object") return base

  const savedRevision = Number(saved.contentRevision) || 0
  const migrating = savedRevision < SITE_CONTENT_REVISION

  const savedProjects = Array.isArray(saved.lavori?.projects)
    ? saved.lavori.projects
    : base.lavori.projects
  const savedLogo = typeof saved.logo === "string" ? saved.logo.trim() : ""
  const savedPortrait = saved.hero?.portraitSrc
  const placeholderPortrait =
    typeof savedPortrait !== "string" ||
    !savedPortrait.trim() ||
    savedPortrait.endsWith("hero-portrait.svg")

  const savedChiSono = saved.chiSono ?? {}
  const chiSono = {
    ...base.chiSono,
    ...savedChiSono,
    notes:
      Array.isArray(savedChiSono.notes) && savedChiSono.notes.length
        ? savedChiSono.notes
        : base.chiSono.notes,
    toolkit: Array.isArray(savedChiSono.toolkit)
      ? savedChiSono.toolkit
      : base.chiSono.toolkit,
    hobbies:
      Array.isArray(savedChiSono.hobbies) && savedChiSono.hobbies.length
        ? savedChiSono.hobbies
        : base.chiSono.hobbies,
  }
  if (migrating && (isLegacyChiSono(savedChiSono) || isStaleAboutToolkit(chiSono))) {
    chiSono.title = isLegacyChiSono(savedChiSono) ? base.chiSono.title : chiSono.title
    chiSono.body1 = isLegacyChiSono(savedChiSono) ? base.chiSono.body1 : chiSono.body1
    chiSono.body2 = isLegacyChiSono(savedChiSono) ? base.chiSono.body2 : chiSono.body2
    chiSono.notes = isLegacyChiSono(savedChiSono) ? base.chiSono.notes : chiSono.notes
    chiSono.notesEyebrow = isLegacyChiSono(savedChiSono)
      ? base.chiSono.notesEyebrow
      : chiSono.notesEyebrow
    chiSono.toolkit = base.chiSono.toolkit
    chiSono.toolkitEyebrow = base.chiSono.toolkitEyebrow
    chiSono.toolkitBody = base.chiSono.toolkitBody
    chiSono.hobbies = base.chiSono.hobbies
  }
  // I tag duplicavano l'elenco delle passioni: dalla revisione 29 non si mostrano più.
  if (migrating) chiSono.toolkit = base.chiSono.toolkit
  if (isStockAboutNotes(chiSono.notes)) chiSono.notes = base.chiSono.notes
  if (isStaleAboutToolkit(chiSono)) {
    chiSono.toolkit = base.chiSono.toolkit
    chiSono.toolkitEyebrow = base.chiSono.toolkitEyebrow
    chiSono.toolkitBody = base.chiSono.toolkitBody
  }
  if (chiSono.toolkitEyebrow === "Fuori dall’orario" || chiSono.toolkitEyebrow === "Fuori dall'orario") {
    chiSono.toolkitEyebrow = base.chiSono.toolkitEyebrow
  }
  chiSono.hobbies = (chiSono.hobbies ?? []).map((item) =>
    item?.label === "Una birra dopo" ? { ...item, label: "Serate goliardiche" } : item
  )
  chiSono.eyebrow = polishCopy(chiSono.eyebrow)
  chiSono.openLabel = nonempty(chiSono.openLabel, base.chiSono.openLabel)
  chiSono.closeLabel = nonempty(chiSono.closeLabel, base.chiSono.closeLabel)
  chiSono.peek = nonempty(chiSono.peek, base.chiSono.peek)
  if (chiSono.peek === "C’è ironia, carta e qualche prototipo serale.") {
    chiSono.peek = base.chiSono.peek
  }
  if (
    chiSono.body1 ===
      "Sono curioso e un po’ ironico. Quando esce uno strumento nuovo lo apro, anche la sera. I prototipi nascono così, non da un brief." ||
    chiSono.body1 ===
      "Appassionato di videogiochi, anime, manga, informatica e computer, sempre aggiornato sulle tendenze web e i meme di tendenza."
  ) {
    chiSono.body1 = ""
  }
  if (
    chiSono.body2 ===
      "Fuori dall’orario resto attaccato a come le cose stanno nello spazio: carta, LED, store. In corsia preferisco una battuta a una call in più." ||
    chiSono.body2 ===
      "Persona socievole e ironica, con una spiccata dose di autoironia, amo condividere questi interessi con amici e colleghi, tra serate goliardiche e una birra dopo il lavoro."
  ) {
    chiSono.body2 = ""
  }
  chiSono.toolkitBody =
    typeof chiSono.toolkitBody === "string" ? chiSono.toolkitBody : base.chiSono.toolkitBody
  if (
    chiSono.toolkitBody ===
      "Videogiochi, anime e manga: seguo le uscite, i meme e le mode del web. Computer e hardware, da citare in gruppo. Dopo il lavoro una birra con amici o colleghi." ||
    chiSono.toolkitBody ===
      "Videogiochi, anime e manga. Seguo le novità, i meme e l’hardware. Dopo il lavoro, una birra con amici o colleghi."
  ) {
    chiSono.toolkitBody = ""
  }

  const servizi =
    migrating && isLegacyServizi(saved.servizi)
      ? base.servizi
      : {
          ...base.servizi,
          ...saved.servizi,
          phases: normalizeServiziPhases(saved.servizi?.phases, base.servizi.phases, migrating),
        }

  const footerPrivacy =
    !saved.footer?.privacy || saved.footer.privacy === "Privacy" ? "" : saved.footer.privacy
  const footerCookie =
    !saved.footer?.cookie || saved.footer.cookie === "Cookie" ? "" : saved.footer.cookie

  return {
    ...base,
    ...saved,
    contentRevision: SITE_CONTENT_REVISION,
    logo: !savedLogo || savedLogo === "Maurizio." ? base.logo : saved.logo,
    nav: mergeById(saved.nav, base.nav).map((item) => ({
      ...item,
      label: polishCopy(item.label),
    })),
    hero: {
      ...base.hero,
      ...saved.hero,
      portraitSrc: placeholderPortrait ? "" : savedPortrait,
      eyebrow: nonempty(saved.hero?.eyebrow, base.hero.eyebrow),
      title:
        saved.hero?.title === "Impagino. Firmo. Gioco con l’AI."
          ? base.hero.title
          : nonempty(saved.hero?.title, base.hero.title),
      body: nonempty(saved.hero?.body, base.hero.body),
      cta: nonempty(saved.hero?.cta, base.hero.cta),
      availability: nonempty(saved.hero?.availability, base.hero.availability),
    },
    ticker: {
      items: Array.isArray(saved.ticker?.items) && saved.ticker.items.length
        ? saved.ticker.items.filter((item) => typeof item === "string")
        : base.ticker.items,
    },
    chiSono,
    skills: {
      eyebrow: nonempty(saved.skills?.eyebrow, base.skills.eyebrow),
      title: nonempty(saved.skills?.title, base.skills.title),
      body: polishCopy(typeof saved.skills?.body === "string" ? saved.skills.body : base.skills.body),
      craftEyebrow: nonempty(saved.skills?.craftEyebrow, base.skills.craftEyebrow),
      toolsEyebrow: nonempty(saved.skills?.toolsEyebrow, base.skills.toolsEyebrow),
      traitsEyebrow: polishCopy(nonempty(saved.skills?.traitsEyebrow, base.skills.traitsEyebrow)),
      traits: Array.isArray(saved.skills?.traits)
        ? saved.skills.traits.filter((item) => typeof item === "string")
        : base.skills.traits,
      usefulEyebrow: nonempty(saved.skills?.usefulEyebrow, base.skills.usefulEyebrow),
      useful: Array.isArray(saved.skills?.useful)
        ? saved.skills.useful.filter((item) => typeof item === "string").map(polishCopy)
        : base.skills.useful,
      tools: normalizeSkillTools(saved.skills?.tools, base.skills.tools),
      disciplines: normalizeDisciplines(saved.skills?.disciplines, base.skills.disciplines),
    },
    lavori: {
      ...base.lavori,
      ...saved.lavori,
      waitLabel: saved.lavori?.waitLabel || base.lavori.waitLabel,
      projects: (() => {
        const mapped = savedProjects
          .filter((project) => project?.id && !OBSOLETE_PROJECT_IDS.has(project.id))
          .map((project) => {
            const fallback = base.lavori.projects.find((item) => item.id === project.id)
            const gallery =
              Array.isArray(project.gallery) && project.gallery.length > 0
                ? project.gallery
                : (fallback?.gallery ?? [])
            const image =
              isStockProject(project) && fallback?.image
                ? fallback.image
                : (project.image || fallback?.image || "")
            return {
              role: fallback?.role ?? "",
              year: fallback?.year ?? "",
              deliverable: fallback?.deliverable ?? "",
              href: "",
              ...project,
              image,
              gallery,
              group: project.group || fallback?.group || "",
              client: project.client || fallback?.client || "",
              teaser: project.teaser || fallback?.teaser || "",
              description: polishCopy(project.description || fallback?.description || ""),
              frame: project.frame || fallback?.frame || "landscape",
            }
          })
        return mapped.length ? mapped : base.lavori.projects
      })(),
    },
    servizi,
    cv: {
      ...base.cv,
      ...saved.cv,
    },
    footer: {
      ...base.footer,
      ...saved.footer,
      menu: mergeById(saved.footer?.menu, base.footer.menu).map((item) => ({
        ...item,
        label: polishCopy(item.label),
      })),
      social: saved.footer?.social ?? base.footer.social,
      privacy: footerPrivacy,
      cookie: footerCookie,
    },
  }
}
