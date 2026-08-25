export const SITE_CONTENT_REVISION = 2

export const SITE_DEFAULT = {
  contentRevision: SITE_CONTENT_REVISION,
  logo: "Maurizio Pecutari",
  skipLink: "Salta al contenuto",
  nav: [
    { id: "lavori", label: "Lavori" },
    { id: "chi-sono", label: "Chi sono" },
    { id: "servizi", label: "Servizi" },
    { id: "curriculum", label: "CV" },
    { id: "contatti", label: "Contatti" },
  ],
  hero: {
    eyebrow: "Graphic Designer",
    title: "Esperienze visive.",
    body: "Progetto identità visive, editoria e comunicazione grafica, unendo strategia, design e tecnica per trasformare idee complesse in immagini chiare, utili e memorabili.",
    cta: "Guarda i miei lavori",
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
  chiSono: {
    eyebrow: "Chi sono",
    title: "Progettare con uno scopo.",
    body1:
      "Sono un graphic designer con formazione professionale. Unisco identità visiva, editoria e progettazione grafica per costruire comunicazioni che restano chiare anche quando il problema è complesso. Ogni decisione parte dal messaggio da far arrivare, non dall’effetto per l’effetto.",
    body2:
      "Lavoro a cavallo tra strategia e immagine: definisco sistemi visivi coerenti, impaginazioni misurate e materiali che rendono il brand riconoscibile. Design e tecnica viaggiano insieme, con un unico obiettivo: pezzi utili, distintivi e duraturi.",
    stats: [
      { value: "2018", label: "Primo incarico" },
      { value: "Oggi", label: "Grafico in agenzia" },
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
    cta: "Vedi il progetto",
    waitLabel: "Disponibile su richiesta",
    projects: [
      {
        id: "identita",
        title: "Identità visiva",
        category: "Sistema di marca",
        description:
          "Qui arriverà un pezzo di identità: marchio, palette e applicazioni. Per ora lo spazio è tenuto pulito, in attesa della foto del lavoro.",
        tags: ["Brand", "Logo", "Sistema visivo"],
        href: "",
        image: "/work-identita.svg",
      },
      {
        id: "editoria",
        title: "Editoria",
        category: "Pubblicazione",
        description:
          "Qui arriverà un pezzo editoriale: ritmo tipografico, impaginazione e presenza sulla carta. La foto del volume o del layout prenderà il posto di questo riquadro.",
        tags: ["Editorial", "Tipografia", "Impaginazione"],
        href: "",
        image: "/work-editoria.svg",
      },
      {
        id: "comunicazione",
        title: "Comunicazione",
        category: "Campagna",
        description:
          "Qui arriverà un pezzo di comunicazione grafica: manifesto, social o materiale per il punto vendita. Un’immagine vera, non uno stock.",
        tags: ["Print", "Campagna", "Art direction"],
        href: "",
        image: "/work-comunicazione.svg",
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
    eyebrow: "Curriculum vitae",
    openLabel: "Apri curriculum",
    closeLabel: "Chiudi curriculum",
  },
  footer: {
    eyebrow: "Contatti",
    title: "Un progetto da mettere a fuoco?",
    body: "Hai un’idea, un brand o un pezzo grafico che merita una direzione più chiara? Scrivimi: partiamo dal messaggio, poi dall’immagine.",
    cta: "Scrivimi un’email",
    email: "mauriziopecutari98@gmail.com",
    menuEyebrow: "Menu",
    menu: [
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
    stats: saved.chiSono?.stats ?? base.chiSono.stats,
    toolkit: saved.chiSono?.toolkit ?? base.chiSono.toolkit,
  }
  if (
    needsMigration ||
    chiSono.stats?.some((stat) => /impegno/i.test(stat.label) || stat.value === "100%")
  ) {
    chiSono.stats = base.chiSono.stats
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
    },
    ticker: needsMigration
      ? base.ticker
      : {
          items: Array.isArray(saved.ticker?.items)
            ? saved.ticker.items.filter((item) => typeof item === "string")
            : base.ticker.items,
        },
    chiSono,
    lavori: {
      ...(needsMigration ? base.lavori : { ...base.lavori, ...saved.lavori }),
      waitLabel:
        needsMigration || !saved.lavori?.waitLabel
          ? base.lavori.waitLabel
          : saved.lavori.waitLabel,
      projects: replaceProjects
        ? base.lavori.projects
        : savedProjects.map((project) => ({
            href: "",
            ...project,
          })),
    },
    servizi,
    cv: { ...base.cv, ...saved.cv },
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
