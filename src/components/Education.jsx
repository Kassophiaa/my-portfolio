import { useRef } from 'react'
import Icon from './Icon.jsx'
import SectionHeading from './SectionHeading.jsx'
import { useScrollFill } from '../hooks/useScrollFill.js'
import './Education.css'

export default function Education({ education, index }) {
  const timelineRef = useRef(null)
  useScrollFill(timelineRef)
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

        {education.credentials.length > 0 && (
          <div className="credentials">
            <h3 className="credentials__title mono">Certificates &amp; activities</h3>
            <ul className="credentials__list" data-reveal data-stagger>
              {education.credentials.map((item) => (
                <li key={`${item.type}-${item.name}`} className="credential glass">
                  <p className="credential__type mono">{item.type}</p>
                  <h4 className="credential__name">
                    {item.href ? (
                      <a className="text-link" href={item.href} target="_blank" rel="noreferrer">
                        {item.name}
                        <Icon name="external" size={14} />
                        <span className="visually-hidden"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      item.name
                    )}
                  </h4>
                  <p className="credential__meta">
                    {[item.issuer, item.date].filter(Boolean).join(' · ')}
                  </p>
                  {item.skills?.length > 0 && (
                    <ul className="project-card__tech">
                      {item.skills.map((skill) => (
                        <li key={skill} className="chip">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
