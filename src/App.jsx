import { CVProvider, useCV } from "./context/CVProvider"
import { SiteContentProvider, useSite } from "./context/SiteContentProvider"
import { EditorAccessProvider } from "./context/EditorAccessProvider"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import ChiSono from "./components/ChiSono"
import Skills from "./components/Skills"
import LavoriRecenti from "./components/LavoriRecenti"
import Servizi from "./components/Servizi"
import Curriculum from "./components/cv/Curriculum"
import Footer from "./components/Footer"
import SiteTicker from "./components/SiteTicker"
import BackToTop from "./components/BackToTop"
import ContactDock from "./components/ContactDock"
import Atmosphere from "./components/Atmosphere"
import CasePage, { CaseNotFound } from "./components/CasePage"
import EditorUnlockDialog from "./components/EditorUnlockDialog"
import { ConfirmDialog } from "./components/cv/cvUi"
import { useRoute } from "./hooks/useRoute"
import { applySeo, applyStructuredData } from "./utils/route"
import { consumePendingScroll, scrollToId } from "./utils/scroll"
import { useEffect, useLayoutEffect } from "react"

const HOME_TITLE = "Maurizio Pecutari | Designer"
const SITE_URL = "https://portfolio-production-cb03.up.railway.app"

function personSchema(display) {
  const social = (display.footer?.social ?? [])
    .map((item) => item.href?.trim())
    .filter((href) => href && href !== "#")
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Maurizio Pecutari",
    jobTitle: "Graphic Designer",
    email: `mailto:${display.footer?.email ?? ""}`,
    telephone: display.footer?.phone || undefined,
    url: `${SITE_URL}/`,
    knowsAbout: (display.servizi?.phases ?? []).map((phase) => phase.title),
    sameAs: social.length ? social : undefined,
  }
}

/**
 * `year` è un campo libero: a volte è "2024", a volte "2025–2026".
 * schema.org accetta solo una data, quindi un intervallo va scartato.
 */
function schemaYear(year) {
  const match = /^\s*(\d{4})\s*$/.exec(String(year ?? ""))
  return match ? match[1] : undefined
}

function projectSchema(project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    abstract: project.description,
    url: `${SITE_URL}/lavori/${project.id}`,
    dateCreated: schemaYear(project.year),
    keywords: Array.isArray(project.tags) && project.tags.length ? project.tags : undefined,
    creator: { "@type": "Person", name: "Maurizio Pecutari", url: `${SITE_URL}/` },
  }
}

function DialogHost() {
  const { dialog: cvDialog, setDialog: setCvDialog } = useCV()
  const { dialog: siteDialog, setDialog: setSiteDialog } = useSite()
  const dialog = siteDialog ?? cvDialog
  const onClose = () => {
    if (siteDialog) setSiteDialog(null)
    else setCvDialog(null)
  }
  return <ConfirmDialog dialog={dialog} onClose={onClose} />
}

function SkipLink() {
  const { display } = useSite()
  return (
    <a
      href="#contenuto"
      className="skip-link"
      onClick={(event) => {
        event.preventDefault()
        const main = document.getElementById("contenuto")
        if (!main) return
        main.focus({ preventScroll: true })
        scrollToId("contenuto")
      }}
    >
      {display.skipLink}
    </a>
  )
}

function AppShell() {
  const route = useRoute()
  const { display } = useSite()
  const projects = display.lavori?.projects ?? []
  const project = route.name === "case" ? projects.find((item) => item.id === route.id) : null
  const home = route.name === "home"

  useLayoutEffect(() => {
    if (home) {
      if (!consumePendingScroll()) {
        const hash = window.location.hash.replace(/^#/, "")
        if (hash) scrollToId(hash)
      }
      return
    }
    window.scrollTo(0, 0)
  }, [home, route.id, route.name])

  useEffect(() => {
    if (route.name === "case" && project) {
      applySeo({
        title: `${project.title} | Maurizio Pecutari`,
        path: `/lavori/${project.id}`,
        description: project.description,
        image: project.image,
      })
      applyStructuredData(projectSchema(project))
      return
    }
    if (route.name === "case" || route.name === "unknown") {
      applySeo({
        title: "Progetto non trovato | Maurizio Pecutari",
        path: window.location.pathname.replace(/\/+$/, "") || "/",
        noindex: true,
      })
      return
    }
    applySeo({ title: HOME_TITLE, path: "/" })
    applyStructuredData(personSchema(display))
  }, [display, project, route])

  return (
    <div className="page">
      <Atmosphere />
      <SkipLink />
      <Navbar />
      <main id="contenuto" tabIndex={-1}>
        {home ? (
          <>
            <Hero />
            <SiteTicker />
            <Skills />
            <Servizi />
            <LavoriRecenti />
            <Curriculum />
            <ChiSono />
          </>
        ) : project ? (
          <CasePage project={project} />
        ) : (
          <CaseNotFound />
        )}
      </main>
      <Footer />
      <ContactDock />
      <BackToTop />
      <DialogHost />
      <EditorUnlockDialog />
    </div>
  )
}

export default function App() {
  return (
    <CVProvider>
      <SiteContentProvider>
        <EditorAccessProvider>
          <AppShell />
        </EditorAccessProvider>
      </SiteContentProvider>
    </CVProvider>
  )
}
