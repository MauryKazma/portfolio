export const SITE_CONTENT_REVISION = 14

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
    title: "GDO, brand, digitale.",
    body: "Grafico editoriale per la grande distribuzione. Faccio volantini, POP, cartellonistica e video, anche per lo Stadio Olimpico. In GDO seguo la lavorazione per intero: analisi delle liste prodotti, etichette con processi di automazione, composizione delle pagine del volantino, poi POP, cartellonistica e video. Identità visive e tool digitali con Cursor e Antigravity. Dal 2023 sono in Mandarino Agency.",
    cta: "Guarda i miei lavori",
    availability: "Disponibile per nuovi incarichi.",
    portraitName: "Maurizio Pecutari",
    portraitSrc: "",
  },
  ticker: {
    items: [
      "Editoria GDO",
      "Volantini",
      "POP",
      "Brand identity",
      "Video stadio",
      "Vibe coding",
      "Cursor",
      "CUBOT",
    ],
  },
  skills: {
    eyebrow: "Skill",
    title: "Strumenti e mestiere.",
    body: "InDesign e Adobe per i volantini e le identità. Premiere per i video in negozio e allo stadio. Cursor e Antigravity per il vibe coding. Se esce uno strumento nuovo, lo provo e lo porto nel lavoro.",
    toolsEyebrow: "Software",
    tools: [
      { id: "tool-id", mark: "Id", name: "InDesign", level: 94 },
      { id: "tool-ai", mark: "Ai", name: "Illustrator", level: 92 },
      { id: "tool-ps", mark: "Ps", name: "Photoshop", level: 90 },
      { id: "tool-pr", mark: "Pr", name: "Premiere Pro", level: 80 },
      { id: "tool-cu", mark: "Cu", name: "Cursor", level: 78 },
      { id: "tool-ag", mark: "Ag", name: "Antigravity", level: 74 },
      { id: "tool-fg", mark: "Fg", name: "Figma", level: 70 },
      { id: "tool-ae", mark: "Ae", name: "After Effects", level: 68 },
    ],
    supportsEyebrow: "Supporti",
    supports: [
      { id: "support-carta", name: "Carta", level: 94 },
      { id: "support-schermo", name: "Schermo", level: 82 },
      { id: "support-spazio", name: "Spazio / OOH", level: 80 },
    ],
    craftsEyebrow: "Mestiere",
    crafts: [
      { id: "craft-gdo", name: "Editoria GDO", level: 92 },
      { id: "craft-impaginazione", name: "Impaginazione", level: 90 },
      { id: "craft-identita", name: "Identità visiva", level: 88 },
      { id: "craft-tipografia", name: "Tipografia", level: 84 },
      { id: "craft-comunicazione", name: "Comunicazione", level: 82 },
      { id: "craft-video", name: "Video", level: 80 },
      { id: "craft-stampa", name: "Pre-stampa", level: 78 },
      { id: "craft-vibe", name: "Vibe coding", level: 76 },
    ],
  },
  chiSono: {
    eyebrow: "Chi sono",
    title: "Dalle liste al punto vendita.",
    body1:
      "Sono un graphic designer, formato come grafico pubblicitario. In Mandarino Agency lavoro su Risparmio Casa. Prima, in Stratego, ho seguito Portobello. In GDO seguo la lavorazione per intero: parto dalle liste prodotti, creo le etichette con processi di automazione, compongo le pagine del volantino e chiudo con POP, cartellonistica e video. Se il flusso è lento o pieno di giri, lo smonto e lo ottimizo.",
    body2:
      "Faccio anche identità visive: Tracina Beach, Landaway, Industrialtech, Kitaku. E tool interni. CUBOT è il gestionale del flusso volantini, costruito in vibe coding con Antigravity e Cursor.",
    studiosEyebrow: "Studi",
    studios: [
      { name: "Mandarino Agency", role: "Grafico editoriale", period: "2023–oggi" },
      { name: "Stratego", role: "Grafico editoriale", period: "2022–2023" },
    ],
    toolkitEyebrow: "Il mio mestiere",
    toolkit: [
      "Liste prodotti",
      "Automazione",
      "Volantini",
      "POP",
      "Video",
      "Brand",
      "Cursor",
      "InDesign",
    ],
  },
  lavori: {
    eyebrow: "Portfolio",
    title: "Lavori.",
    body: "Volantini, POP, cartellonistica, video, identità e CUBOT. In GDO seguo la lavorazione per intero: liste prodotti, etichette in automazione, pagine del volantino, poi i pezzi in store e fuori.",
    cta: "Apri il case",
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
          "Pagine di rete, prezzi e prodotti. Prima delle pagine ci sono le liste e le etichette in automazione.",
        description:
          "In Mandarino chiudo i volantini di Risparmio Casa. Parto dalle liste prodotti: le analizzo, genero le etichette con processi di automazione, poi compongo le pagine (anche 24 facciate) e le versioni di rete. Offertissime, Prezzo bomba, Fidelity Card. Da qui ripartono POP, cartelloni e video.",
        tags: ["Liste", "Automazione", "InDesign"],
        href: "",
        image: "/works/rc-volantino.jpg",
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
          "Locandine e stopper a scaffale, dopo che il volantino è chiuso.",
        description:
          "Il POP arriva quando le pagine del volantino sono ferme. Stesso prodotto, stesso prezzo, formato da corsia: locandina 70×100, stopper, A4. Tre versioni (Rete, PRZ+BSS, ANC+BSS). Stesso giro della lavorazione GDO, portato in corsia.",
        tags: ["Locandina", "Stopper", "A4"],
        href: "",
        image: "/works/rc-locandina.jpg",
        frame: "portrait",
        gallery: [
          { src: "/works/rc-stopper.jpg", caption: "Stopper a scaffale" },
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
          "Affissione di rete e Coupon Days a Pescara. Si legge dal marciapiede.",
        description:
          "Cartelloni 4×3, 6×3, 75×150, striscione e Coupon Days (Pescara, via Socrate). Stessa campagna del volantino, portata fuori dal negozio. Arriva in coda alla lavorazione, quando liste e pagine sono già chiuse.",
        tags: ["4×3", "75×150", "Coupon Days"],
        href: "",
        image: "/works/rc-ooh-4x3.jpg",
        frame: "landscape",
        gallery: [
          { src: "/works/rc-coupon.jpg", caption: "Coupon Days, Pescara" },
          { src: "/works/rc-poster-75.jpg", caption: "Affissione 75×150" },
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
          "Foliazioni da maggio 2022 in poi. Mamma che offerte, sottoprezzo, calendario promozionale.",
        description:
          "In Stratego ho chiuso i volantini web di Portobello. Stesso mestiere: liste prodotti, etichette, pagine, poi il resto della campagna. Teal del brand, prezzo in evidenza, date di validità in chiaro.",
        tags: ["Foliazione", "Prezzo", "InDesign"],
        href: "",
        image: "/works/pb-volantino.jpg",
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
          "Brief, bozze, correzioni. Il volantino in mail, con CTA per il negozio.",
        description:
          "Tre newsletter di maggio 2022: copertina, volantino sfogliabile, pulsante «trova il negozio». Brief, giri di bozze e correzioni. Stesso giro del volantino, in mail.",
        tags: ["Mail", "Bozze", "CTA"],
        href: "",
        image: "/works/pb-nl-page.jpg",
        frame: "landscape",
        gallery: [
          { src: "/works/pb-nl-cover.jpg", caption: "Copertina" },
          { src: "/works/pb-nl-intro.jpg", caption: "Apertura" },
          { src: "/works/pb-nl-cta.jpg", caption: "CTA negozio" },
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
          "Panasonic 50” e United 32”. Prodotto, prezzo, max 1 pz.",
        description:
          "POP in store per le offerte del volantino. Stesso teal, stesso periodo, formato da corsia. Liste e pagine prima, poi il pezzo che sta accanto al prodotto.",
        tags: ["Store", "Prezzo", "Prodotto"],
        href: "",
        image: "/works/pb-pop-50.jpg",
        frame: "portrait",
        gallery: [
          { src: "/works/pb-pop-32.jpg", caption: "United 32”" },
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
          "Maxischermo 1095×645 e strisce LED di girocampo. L’offerta si legge in un passaggio.",
        description:
          "Video per lo Stadio Olimpico: maxischermo HD (app, Pasqua, promo di rete) e girocampo LED, da 1152×96 fino a 5760×96. È l’ultimo tratto della lavorazione GDO, lo stesso messaggio del volantino portato sul campo. Montaggio in Premiere, testo grosso, pochi secondi.",
        tags: ["Maxischermo", "Girocampo", "Premiere"],
        href: "",
        image: "/works/stadio-app.jpg",
        frame: "landscape",
        gallery: [
          { src: "/works/stadio-promo.jpg", caption: "Aria di Pasqua" },
          { src: "/works/stadio-girocampo.jpg", caption: "Girocampo LED" },
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
          "Tre formati: 528×880, 1000×1500, 1080×1920. Versioni per Udine e San Benedetto.",
        description:
          "Video del volantino per totem e stories. Stesso layout, adattato al verticale. Tre tagli e versioni di rete. In GDO il video arriva dopo le pagine.",
        tags: ["Totem", "Stories", "Premiere"],
        href: "",
        image: "/works/pb-video-cover.jpg",
        frame: "portrait",
        gallery: [
          { src: "/works/pb-video-stories.jpg", caption: "1080×1920 rete" },
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
          "Natale rete e ranking scuola. Packshot e prezzo in movimento.",
        description:
          "Video prodotto per la rete: Natale e ranking scuola. Parte dalle stesse liste e dallo stesso volantino. Premiere, packshot, pochi secondi, si capisce anche da fermo.",
        tags: ["Packshot", "Rete", "Premiere"],
        href: "",
        image: "/works/rc-video-natale.jpg",
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
          "Marchio geometrico, polaroid, palette da spiaggia. Applicazioni social.",
        description:
          "Identità per Tracina Beach. Marchio a blocchi, sole e fasce magenta, arancio e cielo. Polaroid, varianti del logo, post. Un sistema da applicare su carta e social.",
        tags: ["Marchio", "Palette", "Social"],
        href: "",
        image: "/works/tracina-polaroid.jpg",
        frame: "portrait",
        gallery: [
          { src: "/works/tracina-logo.jpg", caption: "Marchio" },
          { src: "/works/tracina-ig5.jpg", caption: "Applicazione" },
          { src: "/works/tracina-ig7.jpg", caption: "Social" },
          { src: "/works/tracina-ig11.jpg", caption: "Tavola" },
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
          "Stress, lavoro, ansia. Tipografia nera su bianco.",
        description:
          "Tavola per Landaway. Parole ripetute in nero, griglia stretta, un «annoiato?» al centro. Identità fatta di tipo, senza illustrazione.",
        tags: ["Tipografia", "Tavola"],
        href: "",
        image: "/works/landaway.jpg",
        frame: "landscape",
        gallery: [],
      },
      {
        id: "industrialtech",
        group: "brand",
        client: "Industrialtech",
        title: "Industrialtech",
        category: "Brand identity",
        role: "Grafico",
        year: "2022–2024",
        deliverable: "Marchio",
        teaser:
          "Lente, navy e blu. Marchio per un brand tecnico.",
        description:
          "Marchio Industrialtech: occhio/lente, navy e blu, wordmark a due pesi. Presentazione logo in tavola.",
        tags: ["Marchio", "Presentazione"],
        href: "",
        image: "/works/industrialtech.jpg",
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
          "Marchio Kitaku. Lettere chiuse tra loro, taglio da insegna. Un segno solo, da tenere pulito.",
        tags: ["Wordmark"],
        href: "",
        image: "/works/kitaku.jpg",
        frame: "landscape",
        gallery: [],
      },
      {
        id: "cubot",
        group: "digital",
        client: "CUBOT",
        title: "CUBOT",
        category: "Digitale",
        role: "Progetto e vibe coding",
        year: "2025–2026",
        deliverable: "Workflow hub",
        teaser:
          "Gestionale del flusso volantini. Costruito in vibe coding con Antigravity e Cursor.",
        description:
          "CUBOT tiene insieme il lavoro GDO che faccio a mano: liste, scadenze, varianti di rete, OK stampa. L’ho costruito in vibe coding, prima con Antigravity e poi con Cursor. Python, FastAPI, Vue. Serve a chi chiude i volantini.",
        tags: ["Cursor", "Antigravity", "Vibe coding"],
        href: "",
        image: "/works/cubot-login.png",
        frame: "landscape",
        gallery: [],
      },
    ],
  },
  servizi: {
    eyebrow: "Servizi",
    title: "Cosa faccio.",
    phases: [
      {
        id: "gdo",
        number: "01",
        title: "Lavorazione GDO",
        body: "Oltre ai file, penso al processo e lo ottimizzo. Seguo la struttura di una lavorazione GDO per intero: analisi delle liste prodotti, etichette con processi di automazione, composizione delle pagine del volantino, poi POP, cartellonistica e video.",
      },
      {
        id: "identita",
        number: "02",
        title: "Identità visiva",
        body: "Marchio, palette, tipografia e tavole. Un sistema da applicare su carta e schermo.",
      },
      {
        id: "video",
        number: "03",
        title: "Video",
        body: "Punto vendita, stories e, per Risparmio Casa, maxischermo e girocampo LED dello Stadio Olimpico. Stesso messaggio del volantino, formato giusto.",
      },
      {
        id: "digitale",
        number: "04",
        title: "Digitale e vibe coding",
        body: "Tool interni e interfacce. CUBOT e questo sito. Lavoro con Cursor e Antigravity.",
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
    title: "Hai un lavoro da chiudere?",
    body: "Volantino, identità, video o un tool interno. Sono disponibile per nuovi incarichi.",
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
  return { id: uid("tool"), mark: "Ps", name: "Photoshop", level: 72 }
}

export function emptySkillSupport() {
  return { id: uid("support"), name: "Supporto", level: 72 }
}

export function emptySkillCraft() {
  return { id: uid("craft"), name: "Competenza", level: 72 }
}

export function skillGrade(percent) {
  const n = clampSkillPercent(percent)
  if (n >= 88) return "Esperto"
  if (n >= 75) return "Avanzato"
  if (n >= 60) return "Solido"
  return "In crescita"
}

function isPlaceholderSkills(skills) {
  const tools = skills?.tools
  if (!Array.isArray(tools) || tools.length === 0) return true
  const generic = tools.filter((item) => {
    const name = String(item?.name ?? "").trim()
    const mark = String(item?.mark ?? "").trim()
    return /^strumento$/i.test(name) || /^(aa|bb|cc|dd)$/i.test(mark)
  })
  return generic.length === tools.length
}

export function clampSkillPercent(value) {
  const n = Number(value)
  if (!Number.isFinite(n)) return 72
  if (Number.isInteger(n) && n >= 0 && n <= 5) return n * 20
  return Math.max(0, Math.min(100, Math.round(n)))
}

export const clampSkillLevel = clampSkillPercent

function normalizeSkillItems(saved, fallback, kind) {
  if (!Array.isArray(saved) || saved.length === 0) return fallback
  return saved.map((item, index) => ({
    id: typeof item?.id === "string" && item.id ? item.id : `${kind}-${index + 1}`,
    name: typeof item?.name === "string" ? item.name : fallback[0]?.name ?? "",
    level: clampSkillPercent(item?.level),
    ...(kind === "tool"
      ? { mark: typeof item?.mark === "string" && item.mark.trim() ? item.mark.slice(0, 3) : "Ps" }
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
    /work-(identita|editoria|comunicazione)\.svg$/.test(image) ||
    ["nexus", "aura", "shift", "mono", "identita", "editoria", "comunicazione", "risparmiocasa", "portobello", "video-retail", "brand-identity"].includes(id)
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
      eyebrow: needsMigration
        ? base.hero.eyebrow
        : nonempty(saved.hero?.eyebrow, base.hero.eyebrow),
      title: needsMigration ? base.hero.title : nonempty(saved.hero?.title, base.hero.title),
      body: needsMigration ? base.hero.body : nonempty(saved.hero?.body, base.hero.body),
      cta: needsMigration ? base.hero.cta : nonempty(saved.hero?.cta, base.hero.cta),
      availability: needsMigration
        ? base.hero.availability
        : nonempty(saved.hero?.availability, base.hero.availability),
    },
    ticker: needsMigration
      ? base.ticker
      : {
          items: Array.isArray(saved.ticker?.items)
            ? saved.ticker.items.filter((item) => typeof item === "string")
            : base.ticker.items,
        },
    chiSono,
    skills:
      needsMigration || isPlaceholderSkills(saved.skills)
        ? base.skills
        : {
            ...base.skills,
            ...saved.skills,
            tools: normalizeSkillItems(saved.skills?.tools, base.skills.tools, "tool"),
            supports: normalizeSkillItems(saved.skills?.supports, base.skills.supports, "support"),
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
              group: project.group || fallback?.group || "",
              client: project.client || fallback?.client || "",
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
