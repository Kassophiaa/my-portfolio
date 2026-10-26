import Field from './Field.jsx'
import Icon from './Icon.jsx'
import { isMissing } from '../lib/content.js'
import './Hero.css'

const str = (value) => <span className="tok-str">&apos;{value}&apos;</span>

function CodeCard({ profile }) {
  const location = isMissing(profile.location) ? null : profile.location
  const lines = [
    <>
      <span className="tok-kw">const</span> <span className="tok-var">me</span> = {'{'}
    </>,
    <>
      {'  '}role: {str('IT Student')},
    </>,
    <>
      {'  '}lookingFor: [{str('Internship')}, {str('OJT')}],
    </>,
    <>
      {'  '}location: {location ? str(location) : <span className="tok-todo">/* TODO */</span>},
    </>,
    <>
      {'  '}interests: [
    </>,
    ...profile.interests.map((item) => (
      <>
        {'    '}
        {str(item)},
      </>
    )),
    <>{'  '}],</>,
    <>
      {'  '}
      <span className="tok-fn">learn</span>: () =&gt; <span className="tok-kw">true</span>,
    </>,
    <>{'}'}</>,
  ]

  return (
    <figure className="code-card" aria-label="Code snippet summarizing my profile">
      <div className="code-card__bar" aria-hidden="true">
        <span className="code-card__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="code-card__file mono">about-me.js</span>
      </div>
      <pre className="code-card__body mono">
        <code>
          {lines.map((line, index) => (
            <span className="code-line" key={index} style={{ '--line': index }}>
              <span className="code-line__num" aria-hidden="true">
                {index + 1}
              </span>
              <span className="code-line__text">{line}</span>
            </span>
          ))}
          <span className="code-line" style={{ '--line': lines.length }}>
            <span className="code-line__num" aria-hidden="true">
              {lines.length + 1}
            </span>
            <span className="code-line__text">
              <span className="caret" aria-hidden="true" />
            </span>
          </span>
        </code>
      </pre>
      <figcaption className="code-card__status mono">
        <span className="code-card__branch" aria-hidden="true">main</span> {profile.role}
      </figcaption>
    </figure>
  )
}

export default function Hero({ profile }) {
  const hasResume = !isMissing(profile.resume)

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__inner container">
        <div className="hero__copy">
          <p className="hero__status" data-reveal>
            <span className="pulse-dot" aria-hidden="true" />
            {profile.availability}
          </p>

          <h1 id="hero-title" className="hero__title" data-reveal style={{ '--delay': 1 }}>
            <span className="hero__hello">Hi, I’m</span>{' '}
            <span className="hero__name">
              <Field value={profile.name} />
            </span>
          </h1>

          <p className="hero__tagline" data-reveal style={{ '--delay': 2 }}>
            {profile.role.split('·')[0].trim()} <em className="accent-serif">ready to learn</em>{' '}
            by building real software.
          </p>

          <p className="hero__intro" data-reveal style={{ '--delay': 3 }}>
            {profile.intro}
          </p>

          <div className="hero__actions" data-reveal style={{ '--delay': 4 }}>
            <a className="btn btn--primary" href="#projects">
              View projects <Icon name="arrow" className="icon--shift" />
            </a>
            <a className="btn btn--ghost" href="#contact">
              Get in touch
            </a>
            {hasResume && (
              <a className="btn btn--ghost" href={profile.resume} download>
                <Icon name="download" /> Résumé
              </a>
            )}
          </div>

          <p className="hero__meta mono" data-reveal style={{ '--delay': 5 }}>
            <Icon name="pin" size={16} />
            <Field value={profile.location} />
          </p>
        </div>

        <div className="hero__visual" data-reveal style={{ '--delay': 3 }}>
          <CodeCard profile={profile} />
        </div>
      </div>
    </section>
  )
}
