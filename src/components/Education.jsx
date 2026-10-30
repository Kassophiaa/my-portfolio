import { useRef } from 'react'
import Icon from './Icon.jsx'
import SectionHeading from './SectionHeading.jsx'
import { useCardRow } from '../hooks/useCardRow.js'
import { useScrollFill } from '../hooks/useScrollFill.js'
import './Education.css'

// One certificate card: preview image, type, title link, issuer · date, skills.
// `focusable` is false on the extra copies used for looping.
function Credential({ item, focusable }) {
  const tab = focusable ? undefined : -1
  return (
    <article className="credential glass">
      {item.image && (
        // Decorative duplicate of the title link, so it's skipped by Tab and screen readers
        <a
          className="credential__thumb"
          href={item.href ?? item.image}
          target="_blank"
          rel="noreferrer"
          tabIndex={-1}
          aria-hidden="true"
        >
          <img src={item.image} alt="" loading="lazy" decoding="async" width="800" height="560" />
        </a>
      )}
      <div className="credential__body">
        <p className="credential__type mono">{item.type}</p>
        <h4 className="credential__name">
          {item.href ? (
            <a className="text-link" href={item.href} target="_blank" rel="noreferrer" tabIndex={tab}>
              {item.name}
              <Icon name="external" size={14} />
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          ) : (
            item.name
          )}
        </h4>
        <p className="credential__meta">{[item.issuer, item.date].filter(Boolean).join(' · ')}</p>
        {item.skills?.length > 0 && (
          <ul className="project-card__tech">
            {item.skills.map((skill) => (
              <li key={skill} className="chip">
                {skill}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

export default function Education({ education, index }) {
  const timelineRef = useRef(null)
  useScrollFill(timelineRef)
  const certRow = useCardRow(education.credentials.length)
  const last = education.years.length - 1

  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="container">
        <SectionHeading
          index={index}
          label="Education"
          id="education-title"
          title={
            <>
              Where I’m <em className="accent-serif">learning</em>
            </>
          }
        />

        <div className="edu-school glass" data-reveal>
          <span className="edu-school__icon" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 9L12 4.5 21.5 9 12 13.5 2.5 9z" />
              <path d="M6.5 11v4.5c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3V11M21.5 9v5" />
            </svg>
          </span>
          <div className="edu-school__text">
            <h3 className="edu-school__degree">{education.degree}</h3>
            <p className="edu-school__name">{education.school}</p>
          </div>
          <p className="edu-school__status mono">
            <span className="pulse-dot" aria-hidden="true" />
            {education.status}
          </p>
        </div>

        <ol className="timeline" ref={timelineRef}>
          {education.years.map((year, i) => (
            <li
              key={year.period}
              className={`timeline__item${i === last ? ' is-current' : ''}`}
              data-reveal
            >
              <p className="timeline__period mono">
                {year.period}
                {i === last && <span className="timeline__now">Now</span>}
              </p>
              <div className="timeline__body glass">
                <h3 className="timeline__title">{year.title}</h3>
                <p className="timeline__details">{year.text}</p>
                {year.topics.length > 0 && (
                  <ul className="project-card__tech" data-reveal data-stagger>
                    {year.topics.map((topic) => (
                      <li key={topic} className="chip">
                        {topic}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Outside .container so the row can run to the screen edges, like Projects */}
      {education.credentials.length > 0 && (
        <div className="credentials">
          <div className="container credentials__head">
            <h3 className="credentials__title mono">Certificates</h3>
            <span className="credentials__count mono">{education.credentials.length}</span>
          </div>
          <ul
            {...certRow.rowProps}
            className={`${certRow.rowProps.className} credentials__list`}
            aria-label="Certificates (scroll sideways, drag, or use the arrow keys)"
          >
            {certRow.copies.map((copy) =>
              education.credentials.map((item) => (
                <li key={`${copy}-${item.type}-${item.name}`} aria-hidden={copy === 1 ? undefined : 'true'}>
                  <Credential item={item} focusable={copy === 1} />
                </li>
              )),
            )}
          </ul>
        </div>
      )}
    </section>
  )
}