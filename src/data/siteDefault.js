export const SITE_CONTENT_REVISION = 8

export const SITE_DEFAULT = {
  contentRevision: SITE_CONTENT_REVISION,
  logo: "Maurizio Pecutari",
  skipLink: "Salta al contenuto",
  nav: [
    { id: "skill", label: "Skill" },
    { id: "lavori", label: "Lavori" },
    { id: "chi-sono", label: "Chi sono" },
    { id: "servizi", label: "Servizi" },
    { id: "curriculum", label: "CV" },
    { id: "contatti", label: "Contatti" },
  ],
  hero: {
    eyebrow: "Graphic designer",
    title: "Identità e editoria.",
    body: "Progetto sistemi visivi, volumi e comunicazione grafica per chi deve farsi riconoscere su carta, schermo e spazio. Dal 2023 sono grafico in Mandarino Agency.",
    cta: "Guarda i miei lavori",
    availability: "Disponibile per nuovi incarichi.",
    portraitName: "Maurizio Pecutari",
    portraitSrc: "",
  },
  ticker: {
    items: [
      "Identità visiva",
      "Editoria",
      "Comunicazione",
      "Brand",
      "Impaginazione",
      "Art direction",
    ],
  },
  skills: {
    eyebrow: "Skill",
    title: "Strumenti e mestiere.",
    body: "Sostituisci i placeholder con i software e le competenze che vuoi mostrare prima dei lavori.",
    toolsEyebrow: "Software",
    tools: [
      { id: "tool-1", mark: "Aa", name: "Strumento", level: 4 },
      { id: "tool-2", mark: "Bb", name: "Strumento", level: 3 },
      { id: "tool-3", mark: "Cc", name: "Strumento", level: 4 },
      { id: "tool-4", mark: "Dd", name: "Strumento", level: 3 },
    ],
    craftsEyebrow: "Mestiere",
    crafts: [
      { id: "craft-1", name: "Competenza", level: 4 },
      { id: "craft-2", name: "Competenza", level: 4 },
      { id: "craft-3", name: "Competenza", level: 3 },
      { id: "craft-4", name: "Competenza", level: 3 },
      { id: "craft-5", name: "Competenza", level: 4 },
      { id: "craft-6", name: "Competenza", level: 3 },
    ],
  },
  chiSono: {
    eyebrow: "Chi sono",
    title: "Progettare con uno scopo.",
    body1:
      "Sono un graphic designer con formazione professionale. Unisco identità visiva, editoria e progettazione grafica per costruire comunicazioni che restano chiare anche quando il problema è complesso. Ogni decisione parte dal messaggio da far arrivare, non dall’effetto per l’effetto.",
    body2:
      "Dal 2022 al 2023 ho lavorato come grafico in Stratego. Dal 2023 sono grafico in Mandarino Agency. Definisco sistemi visivi coerenti, impaginazioni misurate e materiali che rendono il brand riconoscibile. Design e tecnica viaggiano insieme: pezzi utili, distintivi e duraturi.",
    studiosEyebrow: "Studi",
    studios: [
      { name: "Mandarino Agency", role: "Grafico", period: "2023–oggi" },
      { name: "Stratego", role: "Grafico", period: "2022–2023" },
    ],
    toolkitEyebrow: "Il mio mestiere",
    toolkit: [
      "Identità visiva",
      "Editoria",
      "Comunicazione",
      "Logo",
      "Impaginazione",
      "Art direction",
      "Illustrator",
      "InDesign",
    ],
  },
  lavori: {
    eyebrow: "Portfolio",
    title: "Lavori",
    cta: "Apri il case",
    waitLabel: "Disponibile su richiesta",
    projects: [
      {
        id: "identita",
        title: "Un sistema che tiene",
        category: "Identità visiva",
        role: "Grafico",
        year: "2023–oggi",
        deliverable: "Marchio, palette, applicazioni",
        teaser:
          "Un sistema che sta su carta, insegna e schermo senza rifare il marchio a ogni stagione.",
        description:
          "Il brief, quando arriva un’identità, è far stare un brand su più supporti senza rifare il marchio a ogni stagione. Carta, insegna, schermo: lo stesso sistema, non tre versioni. Il vincolo in agenzia è il tempo e i formati già in produzione — non un mondo parallelo da inventare. La mia parte è chiudere segno, palette e regole d’uso in poche decisioni, poi applicarle. L’esito che cerco è riconoscibilità senza rumore: i materiali si tengono tra loro e nessuno deve «aggiustare» il logo sul nuovo formato. Quando le foto del pezzo saranno qui, vedrai marchio, carta intestata, insegna e una pagina di linee guida — il sistema, non il segno isolato.",
        tags: ["Marchio", "Palette", "Applicazioni"],
        href: "",
        image: "/work-identita.svg",
        frame: "landscape",
        gallery: [
          { src: "", caption: "Carta intestata" },
          { src: "", caption: "Insegna" },
          { src: "", caption: "Linee guida" },
        ],
      },
      {
        id: "editoria",
        title: "Pagine che si tengono",
        category: "Editoria",
        role: "Grafico",
        year: "2022–oggi",
        deliverable: "Copertina, spread, dorso",
        teaser:
          "Un volume è un ritmo: gerarchia, bianco e una copertina che annuncia il dentro.",
        description:
          "Un volume non è una sequenza di pagine belle: è un ritmo che deve durare. Il brief è far leggere un contenuto lungo senza perdere il lettore a metà. Il vincolo è concreto — formato, carta, margini, dorso: la pagina ha un bordo vero, non uno schermo infinito. La mia parte è la gerarchia tipografica, la griglia e una copertina che annuncia il dentro invece di coprirlo. L’esito è un oggetto che si tiene in mano: aperture che respirano, bianco misurato, testo che corre. Qui arriveranno copertina, due o tre spread e il dorso nominato. Fino ad allora lo spazio resta pulito: niente mockup di libreria altrui.",
        tags: ["Copertina", "Spread", "Tipografia"],
        href: "",
        image: "/work-editoria.svg",
        frame: "landscape",
        gallery: [
          { src: "", caption: "Spread" },
          { src: "", caption: "Dorso" },
          { src: "", caption: "Carta e formato" },
        ],
      },
      {
        id: "comunicazione",
        title: "Il pezzo a tre metri",
        category: "Comunicazione",
        role: "Grafico",
        year: "2018–oggi",
        deliverable: "Manifesto, stampa, affissione",
        teaser: "Il pezzo deve funzionare a tre metri — manifesto, stampa, affissione.",
        description:
          "Il pezzo di comunicazione deve funzionare a tre metri, non in un mockup. Il brief è un messaggio da far arrivare in un passaggio — manifesto, punto vendita, campagna. Il vincolo è la stampa vera: luce, carta, affissione. Ho lavorato anche sul lato che va in strada, dove l’immagine o regge o sparisce. La mia parte è tradurre il messaggio in un’immagine chiara, allineata all’identità, senza effetto per l’effetto. L’esito è un pezzo riconoscibile da fermo, che non chiede di essere spiegato. Qui arriverà la foto del manifesto o del materiale in contesto — stampa reale, non stock.",
        tags: ["Manifesto", "Stampa", "Affissione"],
        href: "",
        image: "/work-comunicazione.svg",
        frame: "portrait",
        gallery: [
          { src: "", caption: "Punto vendita" },
          { src: "", caption: "Stampa" },
          { src: "", caption: "Affissione" },
        ],
      },
    ],
  },
  servizi: {
    eyebrow: "Offerte",
    title: "Identità, editoria, comunicazione.",
    phases: [
      {
        id: "identita",
        number: "01",
        title: "Identità visiva",
        body: "Marchio, palette, tipografia e regole d’uso. Un sistema che rende riconoscibile il brand su carta, schermo e spazio, senza inseguire l’effetto per l’effetto.",
      },
      {
        id: "editoria",
        number: "02",
        title: "Editoria",
        body: "Libri, cataloghi, riviste e impaginati. Misuro gerarchia, bianco e ritmo perché il testo si legga e le immagini tengano, dalla copertina all’ultima pagina.",
      },
      {
        id: "comunicazione",
        number: "03",
        title: "Comunicazione grafica",
        body: "Manifesti, campagne, social e materiali per il punto vendita. Traduco il messaggio in un’immagine chiara, utile e memorabile, allineata all’identità.",
      },
    ],
  },
  cv: {
    eyebrow: "Curriculum",
    title: "Studi e agenzie.",
    openLabel: "Apri curriculum",
    closeLabel: "Chiudi curriculum",
  },
  footer: {
    eyebrow: "Contatti",
    title: "Un progetto da mettere a fuoco?",
    body: "Sono disponibile per nuovi incarichi. Hai un’idea, un brand o un pezzo grafico che merita una direzione più chiara? Scrivimi: partiamo dal messaggio, poi dall’immagine.",
    cta: "Scrivimi un’email",
    email: "mauriziopecutari98@gmail.com",
    menuEyebrow: "Menu",
    menu: [
      { id: "skill", label: "Skill" },
      { id: "lavori", label: "Lavori" },
      { id: "servizi", label: "Servizi" },
      { id: "curriculum", label: "Curriculum" },
    ],
    socialEyebrow: "Social",
    social: [
      { href: "", label: "LinkedIn" },
      { href: "", label: "Behance" },
      { href: "", label: "Instagram" },
    ],
    copyright: "© 2026 Maurizio Pecutari. Tutti i diritti riservati.",
    privacy: "",
    cookie: "",
  },
}

export function cloneSite(data) {
  return JSON.parse(JSON.stringify(data))
}

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

export function emptySkillTool() {
  return { id: uid("tool"), mark: "Aa", name: "Strumento", level: 3 }
}

export function emptySkillCraft() {
  return { id: uid("craft"), name: "Competenza", level: 3 }
}

export function clampSkillLevel(value) {
  const n = Number(value)
  if (!Number.isFinite(n)) return 3
  return Math.max(0, Math.min(5, Math.round(n)))
}

function normalizeSkillItems(saved, fallback, kind) {
  if (!Array.isArray(saved) || saved.length === 0) return fallback
  return saved.map((item, index) => ({
    id: typeof item?.id === "string" && item.id ? item.id : `${kind}-${index + 1}`,
    name: typeof item?.name === "string" ? item.name : fallback[0]?.name ?? "",
    level: clampSkillLevel(item?.level),
    ...(kind === "tool"
      ? { mark: typeof item?.mark === "string" && item.mark.trim() ? item.mark.slice(0, 3) : "Aa" }
      : {}),
  }))
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
    ["nexus", "aura", "shift", "mono"].includes(id)
  )
}

function isLegacyServizi(servizi) {
  const title = servizi?.title ?? ""
  const phases = servizi?.phases
  return (
    /sito web/i.test(title) ||
    (Array.isArray(phases) && phases.length > 3) ||
    (Array.isArray(phases) &&
      phases.some((phase) => ["briefing", "prototipazione", "sviluppo"].includes(phase.id)))
  )
}

export function hydrateSite(saved) {
  const base = cloneSite(SITE_DEFAULT)
  if (!saved || typeof saved !== "object") return base

  const needsMigration = saved.contentRevision !== SITE_CONTENT_REVISION
  const savedProjects = Array.isArray(saved.lavori?.projects)
    ? saved.lavori.projects
    : base.lavori.projects
  const savedLogo = typeof saved.logo === "string" ? saved.logo.trim() : ""
  const savedPortrait = saved.hero?.portraitSrc
  const placeholderPortrait =
    typeof savedPortrait !== "string" ||
    !savedPortrait.trim() ||
    savedPortrait.endsWith("hero-portrait.svg")

  const replaceProjects = needsMigration || savedProjects.some(isStockProject)
  const chiSono = {
    ...base.chiSono,
    ...saved.chiSono,
    toolkit: saved.chiSono?.toolkit ?? base.chiSono.toolkit,
    studios: Array.isArray(saved.chiSono?.studios)
      ? saved.chiSono.studios
      : base.chiSono.studios,
  }
  if (needsMigration) {
    chiSono.body1 = base.chiSono.body1
    chiSono.body2 = base.chiSono.body2
    chiSono.studios = base.chiSono.studios
    chiSono.studiosEyebrow = base.chiSono.studiosEyebrow
  }
  if (needsMigration || (Array.isArray(chiSono.toolkit) && chiSono.toolkit.length > 8)) {
    chiSono.toolkit = base.chiSono.toolkit
    chiSono.toolkitEyebrow = base.chiSono.toolkitEyebrow
  }

  const servizi = isLegacyServizi(saved.servizi) || needsMigration
    ? base.servizi
    : {
        ...base.servizi,
        ...saved.servizi,
        phases: saved.servizi?.phases ?? base.servizi.phases,
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
    nav: mergeById(saved.nav, base.nav),
    hero: {
      ...base.hero,
      ...saved.hero,
      portraitSrc: placeholderPortrait ? "" : savedPortrait,
      ...(needsMigration
        ? {
            eyebrow: base.hero.eyebrow,
            title: base.hero.title,
            body: base.hero.body,
            availability: base.hero.availability,
          }
        : {
            availability: saved.hero?.availability ?? base.hero.availability,
          }),
    },
    ticker: needsMigration
      ? base.ticker
      : {
          items: Array.isArray(saved.ticker?.items)
            ? saved.ticker.items.filter((item) => typeof item === "string")
            : base.ticker.items,
        },
    chiSono,
    skills: {
      ...base.skills,
      ...saved.skills,
      tools: normalizeSkillItems(saved.skills?.tools, base.skills.tools, "tool"),
      crafts: normalizeSkillItems(saved.skills?.crafts, base.skills.crafts, "craft"),
    },
    lavori: {
      ...(needsMigration ? base.lavori : { ...base.lavori, ...saved.lavori }),
      waitLabel:
        needsMigration || !saved.lavori?.waitLabel
          ? base.lavori.waitLabel
          : saved.lavori.waitLabel,
      projects: replaceProjects
        ? base.lavori.projects
        : savedProjects.map((project) => {
            const fallback = base.lavori.projects.find((item) => item.id === project.id)
            const gallery =
              Array.isArray(project.gallery) && project.gallery.length > 0
                ? project.gallery
                : (fallback?.gallery ?? [])
            return {
              role: fallback?.role ?? "",
              year: fallback?.year ?? "",
              deliverable: fallback?.deliverable ?? "",
              href: "",
              ...project,
              gallery,
              teaser: project.teaser || fallback?.teaser || "",
              frame: project.frame || fallback?.frame || "landscape",
            }
          }),
    },
    servizi,
    cv: {
      ...base.cv,
      ...saved.cv,
      ...(needsMigration
        ? { title: base.cv.title, eyebrow: base.cv.eyebrow }
        : {}),
    },
    footer: needsMigration
      ? {
          ...base.footer,
          email: saved.footer?.email ?? base.footer.email,
        }
      : {
          ...base.footer,
          ...saved.footer,
          menu: mergeById(saved.footer?.menu, base.footer.menu),
          social: saved.footer?.social ?? base.footer.social,
          privacy: footerPrivacy,
          cookie: footerCookie,
        },
  }
}
