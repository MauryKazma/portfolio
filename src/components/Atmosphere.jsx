/**
 * Sfondo decorativo: cerchi e macchie blu che vagano piano.
 *
 * Ogni elemento qui è un livello che il browser compone a ogni fotogramma,
 * per sempre. Erano 23: i dodici puntini centrali e i sei granelli da 4px
 * al 18% di opacità non si vedevano e costavano quanto gli altri. Restano
 * i tredici che fanno davvero l'atmosfera lungo i bordi.
 */
export default function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <span className="atmosphere-orb atmosphere-orb--a" />
      <span className="atmosphere-orb atmosphere-orb--b" />
      <span className="atmosphere-orb atmosphere-orb--c" />
      <span className="atmosphere-smear atmosphere-smear--a" />
      <span className="atmosphere-smear atmosphere-smear--b" />
      <span className="atmosphere-dot atmosphere-dot--1" />
      <span className="atmosphere-dot atmosphere-dot--2" />
      <span className="atmosphere-dot atmosphere-dot--3" />
      <span className="atmosphere-dot atmosphere-dot--4" />
      <span className="atmosphere-dot atmosphere-dot--5" />
      <span className="atmosphere-dot atmosphere-dot--6" />
      <span className="atmosphere-dot atmosphere-dot--7" />
      <span className="atmosphere-dot atmosphere-dot--8" />
    </div>
  )
}
