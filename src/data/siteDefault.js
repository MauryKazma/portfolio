export const SITE_CONTENT_REVISION = 20

export const SITE_DEFAULT = {
  contentRevision: SITE_CONTENT_REVISION,
  logo: "Maurizio Pecutari",
  skipLink: "Salta al contenuto",
  nav: [
    { id: "skill", label: "Skill" },
    { id: "servizi", label: "Servizi" },
    { id: "lavori", label: "Lavori" },
    { id: "curriculum", label: "CV" },
    { id: "chi-sono", label: "Chi sono" },
    { id: "contatti", label: "Contatti" },
  ],
  hero: {
    eyebrow: "Graphic designer",
    title: "Impagino. Progetto. Gioco con l’AI.",
    body: "Ottimizzo processi di impaginazione e postproduzione per lavorazioni GDO complesse, progetto identità visive coerenti e creo contenuti digitali che supportano la crescita del tuo brand. Integro strumenti di intelligenza artificiale nel flusso creativo per pensare, produrre e sviluppare soluzioni efficaci a problemi concreti.",
    cta: "Vedi i lavori",
    availability: "Disponibile per nuove collaborazioni.",
    portraitName: "Maurizio Pecutari",
    portraitSrc: "",
  },
  ticker: {
    items: [
      "STUDIO DEI PROCESSI",
      "Editoria GDO",
      "Identità visive",
      "montaggio video",
      "Strumenti AI",
      "Vibe coding",
    ],
  },
  skills: {
    eyebrow: "Skill",
    title: "Strumenti di lavoro.",
    body: "Dall’impaginazione editoriale al pensiero creativo, il passo è breve!",
    craftEyebrow: "Mestiere",
    toolsEyebrow: "Software",
    traitsEyebrow: "Attitudine al lavoro",
    traits: ["Curioso dei tool", "Ironia al primo posto", "Massimo impegno"],
    usefulEyebrow: "Competenze utili",
    useful: ["Pacchetto Office", "Conoscenza hardware", "Integrazione di strumenti AI", "Canva"],
    tools: [
      { id: "tool-id", mark: "Id", name: "InDesign", level: 90, icon: "/icons/indesign.svg" },
      { id: "tool-ai", mark: "Ai", name: "Illustrator", level: 75, icon: "/icons/illustrator.svg" },
      { id: "tool-ps", mark: "Ps", name: "Photoshop", level: 75, icon: "/icons/photoshop.svg" },
      { id: "tool-pr", mark: "Pr", name: "Premiere Pro", level: 70, icon: "/icons/premiere.svg" },
      { id: "tool-ae", mark: "Ae", name: "After Effects", level: 50, icon: "/icons/after-effects.svg" },
      { id: "tool-fg", mark: "Fg", name: "Figma", level: 60, icon: "/icons/figma.svg?v=12" },
      { id: "tool-cu", mark: "Cu", name: "Cursor", level: 80, icon: "/icons/cursor.png" },
      { id: "tool-ag", mark: "Ag", name: "Antigravity", level: 70, icon: "/icons/antigravity.png" },
      { id: "tool-genai", mark: "AI", name: "Intelligenza Artificiale", level: 85, icon: "/icons/ai.svg?v=2" },
    ],
    disciplines: [
      {
        id: "disc-gdo",
        title: "Impaginatore editoriale & GDO",
        body: "Anni di esperienza in produzioni frenetiche e complesse: leggo la struttura di una lavorazione, organizzo gli elementi con criterio e progetto processi che ottimizzano tempi e qualità. So lavorare in team su progetti di grande scala, coordinandomi con altre figure creative e tecniche per mantenere coerenza, efficienza e rispetto delle scadenze anche in contesti ad alta pressione.",
        tools: ["InDesign", "Photoshop", "Illustrator"],
      },
      {
        id: "disc-identita",
        title: "Identità visiva",
        body: "Ascolto l’idea e gli obiettivi del cliente per costruire identità visive coerenti con i valori, la personalità e la direzione del brand. Traduco questa visione in un sistema grafico riconoscibile e funzionale, supportando l’attività con materiali di comunicazione grafici e video pensati per raccontare il brand in modo efficace.",
        tools: ["Illustrator", "InDesign", "Figma"],
      },
      {
        id: "disc-video",
        title: "Montaggio video",
        body: "Do vita alle tue idee attraverso il montaggio video: lavoro principalmente su Adobe Premiere per strutturare ritmi, narrazione e coerenza visiva dei tuoi contenuti. Mi muovo con flessibilità nell’ecosistema Adobe, integrando quando serve effetti e animazioni per completare il progetto in modo coerente e professionale.",
        tools: ["Premiere Pro", "After Effects", "Photoshop"],
      },
      {
        id: "disc-tools",
        title: "Tool alternativi",
        body: "Sviluppo e adozione di strumenti innovativi per gestire e ottimizzare flussi di produzione complessi. Creazione di interfacce, gestionali e micro-applicativi con Cursor e Antigravity per automatizzare attività e costruire soluzioni personalizzate che migliorano efficienza e qualità del lavoro.",
        tools: ["Cursor", "Antigravity", "Figma"],
      },
    ],
  },
  chiSono: {
    eyebrow: "Chi sono",
    title: "Fuori dal foglio.",
    body1:
      "Sono curioso e un po’ ironico. Quando esce uno strumento nuovo lo apro, anche la sera. I prototipi nascono così, non da un brief.",
    body2:
      "Fuori dall’orario resto attaccato a come le cose stanno nello spazio: carta, LED, store. In corsia preferisco una battuta a una call in più.",
    notesEyebrow: "Cose che mi tengono acceso",
    notes: [
      {
        title: "Tool nuovi",
        body: "Li provo subito. Se reggono il flusso, restano. Altrimenti li lascio.",
      },
      {
        title: "Ironia in corsia",
        body: "Una battuta mentre si chiude un volantino vale più di una call in più.",
      },
      {
        title: "Supporti veri",
        body: "Carta, LED, store. Fuori dall’ufficio resto attaccato a come le cose stanno nello spazio.",
      },
    ],
    toolkitEyebrow: "Fuori dall’orario",
    toolkit: ["Tool nuovi", "Battute in studio", "Carta", "Schermo", "Prototipi"],
  },
  lavori: {
    eyebrow: "Portfolio",
    title: "Lavori.",
    body: "Una selezione di editoria GDO, video, identità visive e CUBOT.",
    cta: "Apri il progetto",
    waitLabel: "Disponibile su richiesta",
    filters: [
      { id: "all", label: "Tutti" },
      { id: "gdo", label: "GDO" },
      { id: "video", label: "Video" },
      { id: "brand", label: "Brand" },
      { id: "digital", label: "Digitale" },
    ],
    projects: [
      {
        id: "rc-volantino",
        group: "gdo",
        client: "Risparmio Casa",
        title: "Volantino rete",
        category: "Volantino",
        role: "Grafico editoriale, Mandarino Agency",
        year: "2023–oggi",
        deliverable: "Foliazioni web e stampa",
        teaser:
          "Foliazioni di rete per Risparmio Casa. Prezzi, prodotti, fino a 24 facciate.",
        description:
          "Volantini di rete per Risparmio Casa, in Mandarino Agency. Analisi delle liste, etichette in automazione, impaginazione e versioni web. Linee Offertissime, Prezzo bomba, Fidelity Card.",
        tags: ["Liste", "Automazione", "InDesign"],
        href: "",
        image: "",
        frame: "portrait",
        gallery: [],
      },
      {
        id: "rc-pop",
        group: "gdo",
        client: "Risparmio Casa",
        title: "POP in corsia",
        category: "POP",
        role: "Grafico editoriale, Mandarino Agency",
        year: "2023–oggi",
        deliverable: "Locandine 70×100, stopper, A4",
        teaser:
          "Locandine 70×100, stopper e A4 a scaffale.",
        description:
          "Materiale POP da corsia, allineato al volantino: locandina 70×100, stopper, A4. Tre versioni: Rete, PRZ+BSS e ANC+BSS.",
        tags: ["Locandina", "Stopper", "A4"],
        href: "",
        image: "",
        frame: "portrait",
        gallery: [
          { src: "", caption: "Stopper a scaffale" },
        ],
      },
      {
        id: "rc-cartellonistica",
        group: "gdo",
        client: "Risparmio Casa",
        title: "Cartellonistica",
        category: "OOH",
        role: "Grafico editoriale, Mandarino Agency",
        year: "2023–oggi",
        deliverable: "4×3, 75×150, Coupon Days",
        teaser:
          "Affissione di rete e Coupon Days a Pescara.",
        description:
          "Cartelloni 4×3, 6×3, 75×150, striscione e Coupon Days in via Socrate a Pescara. La campagna del volantino portata all’esterno.",
        tags: ["4×3", "75×150", "Coupon Days"],
        href: "",
        image: "",
        frame: "landscape",
        gallery: [
          { src: "", caption: "Coupon Days, Pescara" },
          { src: "", caption: "Affissione 75×150" },
        ],
      },
      {
        id: "pb-volantino",
        group: "gdo",
        client: "Portobello",
        title: "Volantino web",
        category: "Volantino",
        role: "Grafico editoriale, Stratego",
        year: "2022–2023",
        deliverable: "Foliazioni web",
        teaser:
          "Foliazioni web da maggio 2022. Calendario promozionale Portobello.",
        description:
          "Volantini web per Portobello, in Stratego. Liste, etichette, pagine e declinazioni di campagna. Teal di brand, prezzo in evidenza, date di validità.",
        tags: ["Foliazione", "Prezzo", "InDesign"],
        href: "",
        image: "",
        frame: "portrait",
        gallery: [],
      },
      {
        id: "pb-newsletter",
        group: "gdo",
        client: "Portobello",
        title: "Newsletter",
        category: "Newsletter",
        role: "Grafico editoriale, Stratego",
        year: "2022",
        deliverable: "Tre uscite di maggio",
        teaser:
          "Tre uscite di maggio 2022, dal brief alla mail.",
        description:
          "Newsletter Portobello: copertina, volantino sfogliabile, pulsante «trova il negozio». Brief, bozze e correzioni.",
        tags: ["Mail", "Bozze", "CTA"],
        href: "",
        image: "",
        frame: "landscape",
        gallery: [
          { src: "", caption: "Copertina" },
          { src: "", caption: "Apertura" },
          { src: "", caption: "CTA negozio" },
        ],
      },
      {
        id: "pb-pop",
        group: "gdo",
        client: "Portobello",
        title: "POP prodotto",
        category: "POP",
        role: "Grafico editoriale, Stratego",
        year: "2022",
        deliverable: "Materiale in store",
        teaser:
          "Panasonic 50” e United 32”. Prodotto, prezzo, pezzo unico.",
        description:
          "POP in store sulle offerte del volantino. Stesso periodo, stesso teal, formato da corsia.",
        tags: ["Store", "Prezzo", "Prodotto"],
        href: "",
        image: "",
        frame: "portrait",
        gallery: [
          { src: "", caption: "United 32”" },
        ],
      },
      {
        id: "stadio-olimpico",
        group: "video",
        client: "Risparmio Casa",
        title: "Stadio Olimpico",
        category: "Video",
        role: "Video, Mandarino Agency",
        year: "2025–2026",
        deliverable: "Maxischermo e girocampo LED",
        teaser:
          "Maxischermo 1095×645 e girocampo LED. L’offerta si legge in un passaggio.",
        description:
          "Video per lo Stadio Olimpico: maxischermo HD e strisce LED di girocampo, da 1152×96 a 5760×96. Montaggio in Premiere, testo di lettura rapida.",
        tags: ["Maxischermo", "Girocampo", "Premiere"],
        href: "",
        image: "",
        frame: "landscape",
        gallery: [
          { src: "", caption: "Aria di Pasqua" },
          { src: "", caption: "Girocampo LED" },
        ],
      },
      {
        id: "pb-video",
        group: "video",
        client: "Portobello",
        title: "Video in store",
        category: "Video",
        role: "Video, Stratego",
        year: "2022",
        deliverable: "Totem e stories",
        teaser:
          "Totem e stories. Tre formati, versioni Udine e San Benedetto.",
        description:
          "Video del volantino Portobello per totem e stories. Layout verticale, tre tagli: 528×880, 1000×1500, 1080×1920.",
        tags: ["Totem", "Stories", "Premiere"],
        href: "",
        image: "",
        frame: "portrait",
        gallery: [
          { src: "", caption: "1080×1920 rete" },
        ],
      },
      {
        id: "rc-video",
        group: "video",
        client: "Risparmio Casa",
        title: "Video prodotti",
        category: "Video",
        role: "Video, Mandarino Agency",
        year: "2023–oggi",
        deliverable: "Video di rete",
        teaser:
          "Natale di rete e ranking scuola. Packshot e prezzo.",
        description:
          "Video di prodotto per la rete Risparmio Casa. Premiere, packshot, durata breve, lettura anche da fermo.",
        tags: ["Packshot", "Rete", "Premiere"],
        href: "",
        image: "",
        frame: "landscape",
        gallery: [],
      },
      {
        id: "tracina",
        group: "brand",
        client: "Tracina Beach",
        title: "Tracina Beach",
        category: "Brand identity",
        role: "Grafico",
        year: "2024",
        deliverable: "Marchio e applicazioni",
        teaser:
          "Marchio, polaroid, palette. Sistema per carta e social.",
        description:
          "Identità visiva per Tracina Beach. Marchio a blocchi, sole e fasce magenta, arancio e cielo. Polaroid, varianti, applicazioni social.",
        tags: ["Marchio", "Palette", "Social"],
        href: "",
        image: "",
        frame: "portrait",
        gallery: [
          { src: "", caption: "Marchio" },
          { src: "", caption: "Applicazione" },
          { src: "", caption: "Social" },
          { src: "", caption: "Tavola" },
        ],
      },
      {
        id: "landaway",
        group: "brand",
        client: "Landaway",
        title: "Landaway",
        category: "Brand identity",
        role: "Grafico",
        year: "2022–2024",
        deliverable: "Tavola tipografica",
        teaser:
          "Tavola tipografica. Griglia stretta, parole in nero.",
        description:
          "Tavola per Landaway. Parole ripetute in nero su bianco, un «annoiato?» al centro. Identità costruita solo di tipografia.",
        tags: ["Tipografia", "Tavola"],
        href: "",
        image: "",
        frame: "landscape",
        gallery: [],
      },
      {
        id: "kitaku",
        group: "brand",
        client: "Kitaku",
        title: "Kitaku",
        category: "Brand identity",
        role: "Grafico",
        year: "2022–2024",
        deliverable: "Wordmark",
        teaser:
          "Wordmark geometrico, nero su bianco.",
        description:
          "Marchio Kitaku. Lettere ravvicinate, taglio da insegna. Un segno unico, da tenere pulito.",
        tags: ["Wordmark"],
        href: "",
        image: "",
        frame: "landscape",
        gallery: [],
      },
      {
        id: "cubot",
        group: "digital",
        client: "CUBOT",
        title: "CUBOT",
        category: "Digitale",
        role: "Progetto e sviluppo",
        year: "2025–2026",
        deliverable: "Gestionale interno",
        teaser:
          "Gestionale del flusso volantini. Antigravity e Cursor.",
        description:
          "CUBOT coordina liste, scadenze, varianti di rete e OK stampa. Realizzato con Antigravity e Cursor. Python, FastAPI, Vue.",
        tags: ["Cursor", "Antigravity", "Sviluppo"],
        href: "",
        image: "",
        frame: "landscape",
        gallery: [],
      },
    ],
  },
  servizi: {
    eyebrow: "Servizi",
    title: "Aree di lavoro.",
    phases: [
      {
        id: "gdo",
        number: "01",
        title: "Impaginazione",
        body: "È il processo di organizzazione di testi, immagini e elementi grafici all’interno di una o più pagine, per rendere il contenuto chiaro, leggibile ed esteticamente coerente. Definisce gerarchie visive, allineamenti, spaziature e griglie, guidando l’occhio del lettore e valorizzando il messaggio. È fondamentale nella produzione editoriale, nei cataloghi, nei volantini e in qualsiasi materiale destinato alla stampa o al digitale.",
      },
      {
        id: "identita",
        number: "02",
        title: "Identità visiva",
        body: "È l’insieme coordinato di elementi grafici (logo, colori, tipografia, icone, immagini) che definiscono e rendono riconoscibile un brand. Traduce i valori, la personalità e il posizionamento del brand in un sistema visivo coerente, applicato su tutti i touchpoint: sito, social, stampa, packaging, video e materiali di comunicazione.",
      },
      {
        id: "video",
        number: "03",
        title: "Montaggio video",
        body: "È il processo di selezione, organizzazione e assemblaggio di riprese, audio ed effetti per dare ritmo, narrazione e coerenza a un contenuto video. Si applica a qualsiasi formato e scala: dai video brevi per social e web, fino a produzioni complesse come maxischermi, girocampo da stadio e contenuti per grandi eventi.",
      },
      {
        id: "digitale",
        number: "04",
        title: "Tool interni",
        body: "Interfacce e gestionali di produzione. CUBOT e questo sito, con Cursor e Antigravity.",
      },
    ],
  },
  cv: {
    eyebrow: "Curriculum",
    title: "Lavoro e formazione.",
    openLabel: "Apri curriculum",
    closeLabel: "Chiudi curriculum",
  },
  footer: {
    eyebrow: "Contatti",
    title: "Un progetto da avviare?",
    body: "Editoria GDO, identità visiva, video o un tool interno. Sono disponibile per nuove collaborazioni.",
    cta: "Scrivimi",
    email: "mauriziopecutari98@gmail.com",
    menuEyebrow: "Menu",
    menu: [
      { id: "skill", label: "Skill" },
      { id: "servizi", label: "Servizi" },
      { id: "lavori", label: "Lavori" },
      { id: "curriculum", label: "Curriculum" },
      { id: "chi-sono", label: "Chi sono" },
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
  return { id: uid("tool"), mark: "Ps", name: "Photoshop", level: 72, icon: "" }
}

export function clampSkillPercent(value) {
  const n = Number(value)
  if (!Number.isFinite(n)) return 72
  if (Number.isInteger(n) && n >= 0 && n <= 5) return n * 20
  return Math.max(0, Math.min(100, Math.round(n)))
}

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
    if (!item?.id || known.has(item.id)) return
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

function isLegacyChiSono(item) {
  const toolkit = item?.toolkit ?? []
  return (
    item?.title === "Designer." ||
    toolkit.includes("Liste prodotti") ||
    toolkit.includes("Volantini") ||
    /Mandarino Agency/.test(item?.body1 ?? "")
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

function nonempty(value, fallback) {
  return typeof value === "string" && value.trim() ? value : fallback
}

const COPY_FIXES = {
  "InDesign per l’editoria e le identità. Premiere per i video in store e allo stadio. Cursor e Antigravity per i tool interni.":
    "Dall’impaginazione editoriale al pensiero creativo, il passo è breve!",
  "Tool Alternativi": "Tool alternativi",
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

export function hydrateSite(saved) {
  const base = cloneSite(SITE_DEFAULT)
  if (!saved || typeof saved !== "object") return base

  const savedProjects = Array.isArray(saved.lavori?.projects)
    ? saved.lavori.projects
    : base.lavori.projects
  const savedLogo = typeof saved.logo === "string" ? saved.logo.trim() : ""
  const savedPortrait = saved.hero?.portraitSrc
  const placeholderPortrait =
    typeof savedPortrait !== "string" ||
    !savedPortrait.trim() ||
    savedPortrait.endsWith("hero-portrait.svg")

  const replaceProjects = savedProjects.some(isStockProject)
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
  }
  if (isLegacyChiSono(savedChiSono)) {
    chiSono.title = base.chiSono.title
    chiSono.body1 = base.chiSono.body1
    chiSono.body2 = base.chiSono.body2
    chiSono.notes = base.chiSono.notes
    chiSono.notesEyebrow = base.chiSono.notesEyebrow
    chiSono.toolkit = base.chiSono.toolkit
    chiSono.toolkitEyebrow = base.chiSono.toolkitEyebrow
  }

  const servizi = isLegacyServizi(saved.servizi)
    ? base.servizi
    : {
        ...base.servizi,
        ...saved.servizi,
        phases: (saved.servizi?.phases ?? base.servizi.phases).map((phase) => ({
          ...phase,
          title: typeof phase?.title === "string" ? phase.title.trim() : phase?.title,
          body: polishPhaseBody(phase?.body),
        })),
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
      projects: replaceProjects
        ? base.lavori.projects
        : savedProjects
            .filter((project) => project?.id !== "industrialtech")
            .map((project) => {
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
              group: project.group || fallback?.group || "",
              client: project.client || fallback?.client || "",
              teaser: project.teaser || fallback?.teaser || "",
              description: polishCopy(project.description || fallback?.description || ""),
              frame: project.frame || fallback?.frame || "landscape",
            }
          }),
    },
    servizi,
    cv: {
      ...base.cv,
      ...saved.cv,
    },
    footer: {
      ...base.footer,
      ...saved.footer,
      menu: mergeById(saved.footer?.menu, base.footer.menu),
      social: saved.footer?.social ?? base.footer.social,
      privacy: footerPrivacy,
      cookie: footerCookie,
    },
  }
}
