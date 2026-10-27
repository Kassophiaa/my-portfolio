import { useState } from 'react'
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

// No backend: the form composes the message and opens the visitor's email app (mailto).
function ContactForm({ email }) {
  const [sent, setSent] = useState(false)
  const enabled = !isMissing(email)

  const onSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = data.get('name').trim()
    const org = data.get('org').trim()
    const subject = `Internship / OJT inquiry from ${name}${org ? ` (${org})` : ''}`
    const body = `${data.get('message').trim()}\n\n— ${name}${org ? `, ${org}` : ''}`
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <form className="contact-form glass" onSubmit={onSubmit} data-reveal>
      <fieldset disabled={!enabled}>
        <legend className="contact-form__legend">Send a message</legend>
        <div className="contact-form__row">
          <label className="field">
            <span className="field__label">Your name</span>
            <input name="name" type="text" autoComplete="name" required maxLength={80} />
          </label>
          <label className="field">
            <span className="field__label">
              Company <span className="field__optional">(optional)</span>
            </span>
            <input name="org" type="text" autoComplete="organization" maxLength={80} />
          </label>
        </div>
        <label className="field">
          <span className="field__label">Message</span>
          <textarea
            name="message"
            rows={5}
            required
            maxLength={2000}
            placeholder="Hi! We have an internship opening for…"
          />
        </label>
        <div className="contact-form__actions">
          <button type="submit" className="btn btn--primary">
            Send message <Icon name="send" className="icon--shift" />
          </button>
          <p className="contact-form__note">
            {enabled
              ? 'Opens your email app with the message ready to send.'
              : 'The form turns on once an email address is added.'}
          </p>
        </div>
      </fieldset>
      <p className="contact-form__status" role="status">
        {sent && `Your email app should open now. If it doesn’t, write to ${email}.`}
      </p>
    </form>
  )
}

export default function Contact({ profile, index }) {
  const { status, copy } = useCopy()
  const hasEmail = !isMissing(profile.email)
  const hasResume = !isMissing(profile.resume)

  return (
    <section id="contact" className="section section--glow contact" aria-labelledby="contact-title">
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
        />

        <div className="contact__grid">
          <ContactForm email={profile.email} />

          <div className="contact__side">
            <div className="contact-card glass" data-reveal style={{ '--delay': 1 }}>
              <p className="contact-card__label">Email</p>
              {hasEmail ? (
                <a className="contact-email__address" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              ) : (
                <p className="contact-email__address">
                  <Field value={profile.email} />
                </p>
              )}
              <div className="contact-card__actions">
                {hasEmail ? (
                  <button
                    type="button"
                    className={`btn btn--ghost copy-btn is-${status}`}
                    onClick={() => copy(profile.email)}
                  >
                    <Icon name={status === 'copied' ? 'check' : 'copy'} />
                    <span>{copyLabels[status]}</span>
                  </button>
                ) : (
                  <span className="btn btn--ghost" aria-disabled="true">
                    <Icon name="copy" /> Copy email
                  </span>
                )}
                {hasResume ? (
                  <a className="btn btn--ghost" href={profile.resume} download>
                    <Icon name="download" /> Résumé
                  </a>
                ) : (
                  <span className="btn btn--ghost" aria-disabled="true">
                    <Icon name="download" /> Résumé soon
                  </span>
                )}
              </div>
              <p className="visually-hidden" aria-live="polite">
                {status === 'copied' ? 'Email address copied to clipboard' : ''}
                {status === 'error' ? 'Could not copy the email address' : ''}
              </p>
            </div>

            <div className="contact-card glass" data-reveal style={{ '--delay': 2 }}>
              <p className="contact-card__label">Elsewhere</p>
              <ul className="contact-links">
                {profile.links.map((link) => (
                  <ContactLink key={link.id} link={link} />
                ))}
              </ul>
              <p className="contact__location">
                <Icon name="pin" size={16} />
                <span>
                  Based in: <Field value={profile.location} />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
