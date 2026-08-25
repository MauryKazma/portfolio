import { useCV } from "../../context/CVProvider"
import { formatDateIT, telHref, whatsappHref } from "../../utils/cv"
import { CVField } from "./cvUi"

function InfoRow({ label, children }) {
  if (!children) return null
  return (
    <div className="cv-info-row">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}

export default function CVPersonal() {
  const { display, editing, errors, updatePersonal } = useCV()
  const info = display.personalInfo
  const err = (field) => errors[`personalInfo.${field}`]

  if (!editing) {
    const phoneHref = telHref(info.phone)
    const waHref = whatsappHref(info.whatsapp)

    return (
      <section className="cv-block" aria-labelledby="cv-anagrafica-title">
        <h3 id="cv-anagrafica-title" className="cv-block-title">
          Dati personali
        </h3>
        <dl className="cv-info-grid">
          <InfoRow label="Nome">{info.fullName}</InfoRow>
          <InfoRow label="Data di nascita">{formatDateIT(info.birthDate)}</InfoRow>
          <InfoRow label="Nazionalità">{info.nationality}</InfoRow>
          <InfoRow label="Sesso">{info.sex}</InfoRow>
          <InfoRow label="Telefono">
            {phoneHref ? <a href={phoneHref}>{info.phone}</a> : info.phone}
          </InfoRow>
          <InfoRow label="WhatsApp">
            {waHref ? (
              <a href={waHref} target="_blank" rel="noreferrer">
                {info.whatsapp}
              </a>
            ) : (
              info.whatsapp
            )}
          </InfoRow>
          <InfoRow label="Email">
            {info.email ? <a href={`mailto:${info.email}`}>{info.email}</a> : null}
          </InfoRow>
          <InfoRow label="Indirizzo">{info.address}</InfoRow>
        </dl>
      </section>
    )
  }

  return (
    <section className="cv-block" aria-labelledby="cv-anagrafica-title">
      <h3 id="cv-anagrafica-title" className="cv-block-title">
        Dati personali
      </h3>
      <div className="cv-form-grid">
        <CVField
          id="cv-name"
          label="Nome"
          required
          value={info.fullName}
          error={err("fullName")}
          onChange={(value) => updatePersonal("fullName", value)}
        />
        <CVField
          id="cv-birth"
          label="Data di nascita"
          type="date"
          optional
          value={info.birthDate}
          error={err("birthDate")}
          onChange={(value) => updatePersonal("birthDate", value)}
        />
        <CVField
          id="cv-nationality"
          label="Nazionalità"
          optional
          value={info.nationality}
          onChange={(value) => updatePersonal("nationality", value)}
        />
        <CVField
          id="cv-sex"
          label="Sesso"
          optional
          value={info.sex}
          onChange={(value) => updatePersonal("sex", value)}
        />
        <CVField
          id="cv-phone"
          label="Telefono"
          type="tel"
          optional
          value={info.phone}
          onChange={(value) => updatePersonal("phone", value)}
        />
        <CVField
          id="cv-whatsapp"
          label="WhatsApp"
          optional
          value={info.whatsapp}
          onChange={(value) => updatePersonal("whatsapp", value)}
        />
        <CVField
          id="cv-email"
          label="Email"
          type="email"
          optional
          value={info.email}
          error={err("email")}
          onChange={(value) => updatePersonal("email", value)}
        />
        <CVField
          id="cv-address"
          label="Indirizzo"
          optional
          value={info.address}
          onChange={(value) => updatePersonal("address", value)}
        />
      </div>
    </section>
  )
}
