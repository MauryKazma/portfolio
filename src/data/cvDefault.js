/** @typedef {import('../utils/cv.js').CVData} CVData */

export const CV_CONTENT_REVISION = 8

/** @type {CVData} */
export const CV_DEFAULT = {
  contentRevision: CV_CONTENT_REVISION,
  personalInfo: {
    fullName: "Maurizio Pecutari",
    birthDate: "1998-10-05",
    nationality: "Italiana",
    sex: "Maschile",
    phone: "+39 3396007752",
    whatsapp: "3396007752",
    email: "mauriziopecutari98@gmail.com",
    address: "Doganella di Ninfa",
  },
  presentation:
    "Grafico editoriale, formato come grafico pubblicitario. Mi occupo di comunicazione per la GDO: volantini, POP, cartellonistica, newsletter e video, compreso maxischermo e girocampo LED dello Stadio Olimpico. Seguo la lavorazione dall’analisi delle liste prodotti alla chiusura della campagna. Progetto anche identità visive e tool interni, con Cursor e Antigravity.",
  experiences: [
    {
      id: "exp-mandarino",
      startDate: "2023-10-02",
      endDate: "",
      current: true,
      company: "Mandarino Agency",
      role: "Grafico editoriale",
      location: "Latina",
      description:
        "Produzioni GDO per grandi clienti: realizzazione di volantini stampati e web, newsletter, materiali POP in store, video per totem e social e PED. Progettazione di brand identity e creazione di contenuti per i canali social. Attività affiancata dallo studio e dall’applicazione di nuove tecnologie AI, con sviluppo di interfacce e micro-tool tramite programmi di agent AI per ottimizzare flussi e processi creativi.",
      tags: [
        "InDesign",
        "Photoshop",
        "Illustrator",
        "Premiere Pro",
        "After Effects",
        "Cursor",
        "Antigravity",
      ],
      order: 0,
    },
    {
      id: "exp-stratego",
      startDate: "2022-01-17",
      endDate: "2023-09-29",
      current: false,
      company: "Stratego",
      role: "Grafico editoriale",
      location: "Latina",
      description:
        "Produzioni GDO per grandi clienti: realizzazione di volantini stampati e web, newsletter, materiali POP in store, video per totem e social e PED. Progettazione di brand identity e creazione di contenuti per i canali social.",
      tags: ["InDesign", "Photoshop", "Premiere Pro", "Illustrator"],
      order: 1,
    },
  ],
  education: [
    {
      id: "edu-einaudi",
      startDate: "2018-09-09",
      endDate: "2020-06-12",
      title: "Diploma di maturità professionale di operatore grafico pubblicitario",
      institute: "Istituto Einaudi",
      location: "Latina, Italia",
      description: "Diploma di maturità come grafico pubblicitario.",
      fieldOfStudy: "Grafico pubblicitario",
      link: "http://www.mattei-einaudi.it/",
      tags: [],
      order: 0,
    },
    {
      id: "edu-lfl",
      startDate: "2016-10-05",
      endDate: "2018-06-16",
      title: "Attestato professionale di grafico pubblicitario",
      institute: "Latina Formazione Lavoro",
      location: "Latina",
      description:
        "Percorso professionale a Latina Formazione Lavoro, dove ho appreso le basi del mestiere, facendo esercitazioni grafiche e video basilari.",
      fieldOfStudy: "Grafico pubblicitario",
      link: "https://www.latinaformazione.it/",
      tags: [],
      order: 1,
    },
  ],
  languages: [
    {
      id: "lang-it",
      name: "Italiano",
      listening: "Madrelingua",
      reading: "Madrelingua",
      speaking: "Madrelingua",
      interaction: "Madrelingua",
      writing: "Madrelingua",
      order: 0,
    },
    {
      id: "lang-en",
      name: "Inglese",
      listening: "C1",
      reading: "C1",
      speaking: "B2",
      interaction: "B2",
      writing: "B2",
      order: 1,
    },
    {
      id: "lang-es",
      name: "Spagnolo",
      listening: "B2",
      reading: "B2",
      speaking: "B1",
      interaction: "B1",
      writing: "B1",
      order: 2,
    },
  ],
  digitalSkills: [
    {
      id: "skillcat-adobe",
      name: "Pacchetto Adobe",
      description: "",
      items: [
        { id: "skill-id", name: "InDesign", order: 0 },
        { id: "skill-ai", name: "Illustrator", order: 1 },
        { id: "skill-ps", name: "Photoshop", order: 2 },
        { id: "skill-pr", name: "Premiere Pro", order: 3 },
        { id: "skill-ae", name: "After Effects", order: 4 },
      ],
      order: 0,
    },
    {
      id: "skillcat-vibe",
      name: "Sviluppo e prototipazione",
      description: "Costruisco tool interni e interfacce con Cursor e Antigravity.",
      items: [
        { id: "skill-cursor", name: "Cursor", order: 0 },
        { id: "skill-antigravity", name: "Antigravity", order: 1 },
        { id: "skill-figma", name: "Figma", order: 2 },
        { id: "skill-vibe", name: "Prototipazione", order: 3 },
        { id: "skill-canva", name: "Canva", order: 4 },
        { id: "skill-genai", name: "Intelligenza artificiale", order: 5 },
      ],
      order: 1,
    },
    {
      id: "skillcat-office",
      name: "Pacchetto Office",
      description: "",
      items: [
        { id: "skill-word", name: "Word", order: 0 },
        { id: "skill-xls", name: "Excel", order: 1 },
        { id: "skill-ppt", name: "PowerPoint", order: 2 },
      ],
      order: 2,
    },
    {
      id: "skillcat-google",
      name: "Strumenti Google",
      description: "",
      items: [
        { id: "skill-chrome", name: "Chrome", order: 0 },
        { id: "skill-drive", name: "Drive", order: 1 },
        { id: "skill-docs", name: "Docs", order: 2 },
        { id: "skill-class", name: "Classroom", order: 3 },
        { id: "skill-meet", name: "Meet", order: 4 },
      ],
      order: 3,
    },
    {
      id: "skillcat-it",
      name: "Conoscenze informatiche",
      description: "",
      items: [
        { id: "skill-hwsw", name: "Hardware e software", order: 0 },
        { id: "skill-hwsw-fix", name: "Assistenza tecnica", order: 1 },
        { id: "skill-web", name: "Browser", order: 2 },
        { id: "skill-mail-it", name: "Posta elettronica", order: 3 },
        { id: "skill-social", name: "Social media", order: 4 },
      ],
      order: 4,
    },
  ],
  drivingLicence: "B",
  hobbies:
    "Videogiochi, anime, manga, informatica e computer. Meme e tendenze web, serate goliardiche e una birra dopo il lavoro con amici e colleghi. Ironia e autoironia, anche in studio.",
  interpersonalSkills: [
    {
      id: "inter-coop",
      name: "Gestione lavorativa e cooperazione",
      description:
        "Ottima capacità di lavorare in team, anche sotto pressione, sempre disponibile all’ascolto e aperto a nuove opzioni lavorative. In grado di sdrammatizzare o ironizzare durante sessioni lavorative particolarmente stressanti.",
      items: [],
      order: 0,
    },
    {
      id: "inter-tech",
      name: "Aggiornamento sulle nuove tecnologie",
      description:
        "Mi tengo sempre aggiornato sulle ultime tecnologie o su tecnologie sperimentali, e tento di applicarle nei processi che eseguo ogni giorno, per tentare di ottimizzare o migliorare i processi lavorativi.",
      items: [],
      order: 1,
    },
  ],
}
