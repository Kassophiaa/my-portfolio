import { useRef, useState } from 'react'
import CertificateViewer from './CertificateViewer.jsx'
import { certImage } from '../lib/certificates.js'
import SectionHeading from './SectionHeading.jsx'
import { useCardRow } from '../hooks/useCardRow.js'
import { useScrollFill } from '../hooks/useScrollFill.js'
import './Education.css'

// A card grows on hover. Near either end of the row it grows away from that end,
// so the enlarged card isn't cut off by the row's edge.
function growInward(event) {
  const card = event.currentTarget
  const row = card.closest('.card-row')
  if (!row) return
  const c = card.getBoundingClientRect()
  const r = row.getBoundingClientRect()
  const room = c.width * 0.15
  const x = c.left - r.left < room ? 'left' : r.right - c.right < room ? 'right' : 'center'
  card.style.transformOrigin = `${x} center`
}

// One certificate: just its picture, as a button that opens the viewer (where the
// name and details are). The name stays in the label for screen readers.
// `focusable` is false on the extra copies used for looping.
function Credential({ item, onOpen, focusable }) {
  return (
    <button
      type="button"
      className="credential"
      onClick={onOpen}
      onPointerEnter={growInward}
      onFocus={growInward}
      aria-haspopup="dialog"
      aria-label={`${item.name}, ${item.issuer}, ${item.date}`}
      tabIndex={focusable ? undefined : -1}
    >
      <img src={certImage(item, 'thumbs')} alt="" loading="lazy" decoding="async" width="800" height="560" />
    </button>
  )
}

export default function Education({ education, index }) {
  const timelineRef = useRef(null)
  useScrollFill(timelineRef)
  const certRow = useCardRow(education.credentials.length)
  const [viewing, setViewing] = useState(null)
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
              education.credentials.map((item, i) => (
                <li key={`${copy}-${item.type}-${item.name}`} aria-hidden={copy === 1 ? undefined : 'true'}>
                  <Credential item={item} onOpen={() => setViewing(i)} focusable={copy === 1} />
                </li>
              )),
            )}
          </ul>
          <CertificateViewer
            items={education.credentials}
            index={viewing}
            onChange={setViewing}
            onClose={() => setViewing(null)}
          />
        </div>
      )}
    </section>
  )
}