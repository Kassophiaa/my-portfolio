import Field from './Field.jsx'
import Icon from './Icon.jsx'
import SectionHeading from './SectionHeading.jsx'
import { useCopy } from '../hooks/useCopy.js'
import { isMissing } from '../lib/content.js'
import './Contact.css'

const copyLabels = {
  idle: 'Copy email',
  copied: 'Copied!',
  error: 'Copy failed — select the address instead',
}

function ContactLink({ link }) {
  const missing = isMissing(link.href)
  const content = (
    <>
      <span className="contact-link__icon">
        <Icon name={link.id} size={20} />
      </span>
      <span className="contact-link__text">
        <span className="contact-link__label">{link.label}</span>
        <span className="contact-link__href mono">
          {missing ? 'Not added yet' : link.href.replace(/^https?:\/\/(www\.)?/, '')}
        </span>
      </span>
      <Icon name={missing ? 'close' : 'arrow'} className="contact-link__arrow" />
    </>
  )

  if (missing) {
    return (
      <li className="contact-link is-unavailable">
        {content}
        <span className="visually-hidden">(link not available yet)</span>
      </li>
    )
  }
  return (
    <li>
      <a className="contact-link" href={link.href} target="_blank" rel="noreferrer">
        {content}
        <span className="visually-hidden">(opens in a new tab)</span>
      </a>
    </li>
  )
}

export default function Contact({ profile, index }) {
  const { status, copy } = useCopy()
  const hasEmail = !isMissing(profile.email)
  const hasResume = !isMissing(profile.resume)

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading
          index={index}
          label="Contact"
          id="contact-title"
          title={
            <>
              Let’s talk about an <em className="accent-serif">internship.</em>
            </>
          }
        >
          I’m looking for internship and OJT opportunities. The quickest way to reach me is by
          email.
        </SectionHeading>

        <div className="contact__grid">
          <div className="contact-email" data-reveal>
            <p className="contact-email__label mono">Email</p>
            {hasEmail ? (
              <a className="contact-email__address" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            ) : (
              <p className="contact-email__address">
                <Field value={profile.email} />
              </p>
            )}

            <div className="contact-email__actions">
              {hasEmail ? (
                <>
                  <a className="btn btn--primary" href={`mailto:${profile.email}`}>
                    <Icon name="mail" /> Send an email
                  </a>
                  <button
                    type="button"
                    className={`btn btn--ghost copy-btn is-${status}`}
                    onClick={() => copy(profile.email)}
                  >
                    <Icon name={status === 'copied' ? 'check' : 'copy'} />
                    <span>{copyLabels[status]}</span>
                  </button>
                </>
              ) : (
                <>
                  <span className="btn btn--primary" aria-disabled="true">
                    <Icon name="mail" /> Send an email
                  </span>
                  <span className="btn btn--ghost" aria-disabled="true">
                    <Icon name="copy" /> Copy email
                  </span>
                </>
              )}
              {hasResume ? (
                <a className="btn btn--ghost" href={profile.resume} download>
                  <Icon name="download" /> Download résumé
                </a>
              ) : (
                <span className="btn btn--ghost" aria-disabled="true">
                  <Icon name="download" /> Résumé coming soon
                </span>
              )}
            </div>
            <p className="visually-hidden" aria-live="polite">
              {status === 'copied' ? 'Email address copied to clipboard' : ''}
              {status === 'error' ? 'Could not copy the email address' : ''}
            </p>
          </div>

          <div className="contact__side" data-reveal style={{ '--delay': 1 }}>
            <p className="contact-email__label mono">Elsewhere</p>
            <ul className="contact-links">
              {profile.links.map((link) => (
                <ContactLink key={link.id} link={link} />
              ))}
            </ul>
            <p className="contact__location">
              <Icon name="pin" size={16} />
              <span>
                Based in <Field value={profile.location} /> — open to on-site or hybrid work
                nearby.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
