import { useRef } from 'react'
import Field from './Field.jsx'
import Icon from './Icon.jsx'
import SectionHeading from './SectionHeading.jsx'
import { useScrollFill } from '../hooks/useScrollFill.js'
import './Education.css'

export default function Education({ education, index }) {
  const timelineRef = useRef(null)
  useScrollFill(timelineRef)

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

        <ol className="timeline" ref={timelineRef}>
          <li className="timeline__item" data-reveal>
            <p className="timeline__period mono">
              <Field value={education.period} />
            </p>
            <div className="timeline__body glass">
              <h3 className="timeline__title">
                <Field value={education.degree} />
              </h3>
              <p className="timeline__school">
                <Field value={education.school} />
              </p>
              <p className="timeline__details">
                <Field value={education.details} />
              </p>
              {education.coursework.length > 0 && (
                <div className="timeline__group">
                  <h4>Relevant coursework</h4>
                  <ul className="project-card__tech">
                    {education.coursework.map((course) => (
                      <li key={course} className="chip">
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>

          {education.certifications.map((cert) => (
            <li key={cert.name} className="timeline__item" data-reveal>
              <p className="timeline__period mono">{cert.year}</p>
              <div className="timeline__body glass">
                <h3 className="timeline__title timeline__title--small">
                  {cert.href ? (
                    <a className="text-link" href={cert.href} target="_blank" rel="noreferrer">
                      {cert.name}
                      <Icon name="external" size={15} />
                    </a>
                  ) : (
                    cert.name
                  )}
                </h3>
                <p className="timeline__school">{cert.issuer}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
