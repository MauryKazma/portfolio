import { useCV } from "../../context/CVProvider"
import { CVTextarea } from "./cvUi"

export default function CVPresentation() {
  const { display, editing, updatePresentation } = useCV()

  return (
    <section className="cv-block" aria-labelledby="cv-presentation-title">
      <h3 id="cv-presentation-title" className="cv-block-title">
        Presentazione
      </h3>
      {editing ? (
        <CVTextarea
          id="cv-presentation"
          label="Testo di presentazione"
          optional
          rows={6}
          value={display.presentation}
          onChange={updatePresentation}
        />
      ) : display.presentation ? (
        <p className="cv-prose">{display.presentation}</p>
      ) : (
        <p className="cv-empty">Nessuna presentazione inserita.</p>
      )}
    </section>
  )
}
