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

const WEB3FORMS_URL = 'https://api.web3forms.com/submit'

// With a Web3Forms access key, messages are delivered straight to the owner's inbox.
// Without one, the form falls back to opening the visitor's email app (mailto).
function ContactForm({ email, formKey }) {
  // idle | sending | sent | opened | error
  const [state, setState] = useState('idle')
  const direct = !isMissing(formKey)
  const enabled = direct || !isMissing(email)

  const onSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = data.get('name').trim()
    const from = data.get('email').trim()
    const org = data.get('org').trim()
    const message = data.get('message').trim()
    const subject = `Internship / OJT inquiry from ${name}${org ? ` (${org})` : ''}`

    if (!direct) {
      const body = `${message}\n\n— ${name}${org ? `, ${org}` : ''}\n${from}`
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setState('opened')
      return
    }

    setState('sending')
    // Sent as plain form data (no custom headers) so the browser skips the CORS preflight.
    const payload = new FormData()
    Object.entries({
      access_key: formKey,
      subject,
      from_name: 'Portfolio contact form',
      name,
      email: from,
      company: org || '—',
      message,
      // Hidden honeypot: bots fill it in, people don't
      botcheck: data.get('botcheck') ? 'true' : '',
    }).forEach(([key, value]) => payload.append(key, value))
    try {
      const response = await fetch(WEB3FORMS_URL, { method: 'POST', body: payload })
      const result = await response.json()
      if (!result.success) throw new Error(result.message)
      form.reset()
      setState('sent')
    } catch {
      setState('error')
    }
  }

  const status = {
    sent: 'Thanks! Your message was sent. I’ll reply to the email you gave.',
    opened: `Your email app should open now. If it doesn’t, write to ${email}.`,
    error: `Sorry, the message couldn’t be sent. Please try again or email ${email}.`,
  }[state]

  return (
    <form className="contact-form glass" onSubmit={onSubmit} data-reveal>
      <fieldset disabled={!enabled || state === 'sending'}>
        <legend className="contact-form__legend">Send a message</legend>
        <div className="contact-form__row">
          <label className="field">
            <span className="field__label">Your name</span>
            <input name="name" type="text" autoComplete="name" required maxLength={80} />
          </label>
          <label className="field">
            <span className="field__label">Your email</span>
            <input name="email" type="email" autoComplete="email" required maxLength={120} />
          </label>
        </div>
        <label className="field">
          <span className="field__label">
            Company <span className="field__optional">(optional)</span>
          </span>
          <input name="org" type="text" autoComplete="organization" maxLength={80} />
        </label>
        <input
          className="visually-hidden"
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
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
            {state === 'sending' ? 'Sending…' : 'Send message'}{' '}
            <Icon name="send" className="icon--shift" />
          </button>
          {!(enabled && direct) && (
            <p className="contact-form__note">
              {!enabled
                ? 'The form turns on once an email address is added.'
                : 'Opens your email app with the message ready to send.'}
            </p>
          )}
        </div>
      </fieldset>
      <p className={`contact-form__status is-${state}`} role="status">
        {status}
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
          <ContactForm email={profile.email} formKey={profile.contactFormKey} />

          <div className="contact__side">
            <div className="contact-card glass" data-reveal style={{ '--delay': 1 }}>
              <p className="contact-card__label">Email</p>
              {hasEmail ? (
                <a className="contact-email__address" href={`mailto:${profile.email}`}>
                  {/* If the address has to wrap, wrap it before the "@", not mid-word */}
                  {profile.email.split('@')[0]}
                  <wbr />@{profile.email.split('@')[1]}
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
                {hasResume && (
                  <a className="btn btn--ghost" href={profile.resume} download>
                    <Icon name="download" /> Résumé
                  </a>
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
