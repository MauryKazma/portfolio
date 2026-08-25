import { Mail } from "lucide-react"
import { useCV } from "../context/CVProvider"
import { useSite } from "../context/SiteContentProvider"
import { scrollToId } from "../utils/scroll"
import { EditableText, InlineEdit } from "./EditableText"
import SiteSection from "./SiteSection"

function isLiveHref(href) {
  const value = href?.trim()
  return Boolean(value) && value !== "#"
}

export default function Footer() {
  const { guardNavigation: guardCV, expand } = useCV()
  const { display, editing, setFooter, setMenuLabel, setSocial, guardNavigation: guardSite } =
    useSite()
  const { footer } = display
  const socialItems = editing
    ? footer.social
    : footer.social.filter((item) => isLiveHref(item.href))
  const legal = [footer.privacy, footer.cookie].map((item) => item?.trim()).filter(Boolean)

  const go = (id) => {
    guardSite(() =>
      guardCV(() => {
        if (id === "curriculum") expand()
        requestAnimationFrame(() => scrollToId(id))
      })
    )
  }

  return (
    <SiteSection as="footer" id="contatti" className="scroll-mt-24" tone="ink">
      <div className="site-content">
        <div className="footer-grid">
          <div className="contact-lead">
            <EditableText
              className="site-eyebrow"
              value={footer.eyebrow}
              editing={editing}
              onChange={(value) => setFooter("eyebrow", value)}
              ariaLabel="Etichetta contatti"
            />
            <EditableText
              as="h2"
              className="site-headline"
              value={footer.title}
              editing={editing}
              onChange={(value) => setFooter("title", value)}
              ariaLabel="Titolo contatti"
            />
            <EditableText
              className="site-body"
              value={footer.body}
              editing={editing}
              multiline
              onChange={(value) => setFooter("body", value)}
              ariaLabel="Testo contatti"
            />
            {editing ? (
              <div className="site-tag-add">
                <input
                  className="site-tag-add-input"
                  type="email"
                  value={footer.email}
                  aria-label="Indirizzo email"
                  onChange={(event) => setFooter("email", event.target.value)}
                />
              </div>
            ) : (
              <p className="contact-email">{footer.email}</p>
            )}
            <div className="project-cta">
              <a href={`mailto:${footer.email}`} className="btn-primary">
                <Mail size={16} aria-hidden />
                <InlineEdit
                  value={footer.cta}
                  editing={editing}
                  onChange={(value) => setFooter("cta", value)}
                  ariaLabel="Testo pulsante email"
                />
              </a>
            </div>
          </div>

          <div className="contact-directories split-grid">
            <div>
              <EditableText
                className="site-eyebrow"
                value={footer.menuEyebrow}
                editing={editing}
                onChange={(value) => setFooter("menuEyebrow", value)}
                ariaLabel="Etichetta menu footer"
              />
              <ul className="link-list">
                {footer.menu.map((item) => (
                  <li key={item.id}>
                    <button type="button" onClick={() => go(item.id)}>
                      <InlineEdit
                        value={item.label}
                        editing={editing}
                        onChange={(value) => setMenuLabel(item.id, value)}
                        ariaLabel={`Voce menu ${item.label}`}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {socialItems.length > 0 || editing ? (
              <div>
                <EditableText
                  className="site-eyebrow"
                  value={footer.socialEyebrow}
                  editing={editing}
                  onChange={(value) => setFooter("socialEyebrow", value)}
                  ariaLabel="Etichetta social"
                />
                <ul className="link-list">
                  {footer.social.map((item, index) => {
                    if (!editing && !isLiveHref(item.href)) return null
                    return (
                      <li key={`${item.label}-${index}`}>
                        {editing ? (
                          <div className="site-social-edit">
                            <input
                              className="site-edit-field"
                              value={item.label}
                              aria-label={`Nome social ${index + 1}`}
                              onChange={(event) => setSocial(index, "label", event.target.value)}
                            />
                            <input
                              className="site-edit-field"
                              value={item.href}
                              aria-label={`Link social ${item.label}`}
                              onChange={(event) => setSocial(index, "href", event.target.value)}
                            />
                          </div>
                        ) : (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            {item.label}
                          </a>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        <div className="footer-meta">
          <EditableText
            as="p"
            value={footer.copyright}
            editing={editing}
            onChange={(value) => setFooter("copyright", value)}
            ariaLabel="Copyright"
          />
          {editing || legal.length > 0 ? (
            <div>
              {editing ? (
                <>
                  <input
                    className="site-edit-field"
                    value={footer.privacy}
                    aria-label="Testo privacy"
                    placeholder="Privacy"
                    onChange={(event) => setFooter("privacy", event.target.value)}
                  />
                  <span> · </span>
                  <input
                    className="site-edit-field"
                    value={footer.cookie}
                    aria-label="Testo cookie"
                    placeholder="Cookie"
                    onChange={(event) => setFooter("cookie", event.target.value)}
                  />
                </>
              ) : (
                legal.join(" · ")
              )}
            </div>
          ) : null}
        </div>
      </div>
    </SiteSection>
  )
}
