import { CVProvider, useCV } from "./context/CVProvider"
import { SiteContentProvider, useSite } from "./context/SiteContentProvider"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import ChiSono from "./components/ChiSono"
import LavoriRecenti from "./components/LavoriRecenti"
import Servizi from "./components/Servizi"
import Curriculum from "./components/cv/Curriculum"
import Footer from "./components/Footer"
import InkTicker from "./components/InkTicker"
import LookSwitch from "./components/LookSwitch"
import BackToTop from "./components/BackToTop"
import { ConfirmDialog } from "./components/cv/cvUi"

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
    <a href="#contenuto" className="skip-link">
      {display.skipLink}
    </a>
  )
}

export default function App() {
  return (
    <CVProvider>
      <SiteContentProvider>
        <div className="page">
          <SkipLink />
          <Navbar />
          <main id="contenuto">
            <Hero />
            <InkTicker />
            <ChiSono />
            <LavoriRecenti />
            <Servizi />
            <Curriculum />
          </main>
          <Footer />
          <LookSwitch />
          <BackToTop />
          <DialogHost />
        </div>
      </SiteContentProvider>
    </CVProvider>
  )
}
