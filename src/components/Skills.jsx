import Field from './Field.jsx'
import SectionHeading from './SectionHeading.jsx'
import './Skills.css'

// Simple line glyphs (not brand logos). Unknown skills fall back to their initials.
const glyphs = {
  html: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12" />,
  css: (
    <>
      <path d="M9 4L7 20M17 4l-2 16" />
      <path d="M4.5 9h16M3.5 15h16" />
    </>
  ),
  javascript: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M11 9v6.2a2 2 0 0 1-3.6 1.2M17 10a2 2 0 0 0-3.4.4c-.6 1.6 3.6 1.5 3.4 3.6a2 2 0 0 1-3.8.5" />
    </>
  ),
  react: (
    <>
      <circle cx="12" cy="12" r="1.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
    </>
  ),
  'git & github': (
    <>
      <circle cx="6.5" cy="5.5" r="2" />
      <circle cx="6.5" cy="18.5" r="2" />
      <circle cx="17.5" cy="8.5" r="2" />
      <path d="M6.5 7.5v9M17.5 10.5c0 4-5 3.5-9.5 6.5" />
    </>
  ),
  'vs code': (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M3.5 8.5h17M9 12.5l-2 2 2 2M13 16.5h3" />
    </>
  ),
  vite: <path d="M13 3L6 13.5h5L10 21l8-11.5h-5.5L13 3z" />,
  php: (
    <>
      <ellipse cx="12" cy="12" rx="9.5" ry="6" />
      <path d="M7 14.5l1-5h2a1.3 1.3 0 0 1 0 2.6H8.5M12 8.5l-1.2 6M11.4 11.5h2.2a1 1 0 0 1 1 1.2l-.4 1.8M16 14.5l1-5h2a1.3 1.3 0 0 1 0 2.6h-1.5" />
    </>
  ),
  mysql: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.8" />
      <path d="M5 6v12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8" />
    </>
  ),
  figma: (
    <>
      <path d="M12 3H9a3 3 0 0 0 0 6h3V3zM12 3h3a3 3 0 0 1 0 6h-3V3zM12 9H9a3 3 0 0 0 0 6h3V9zM12 15H9a3 3 0 1 0 3 3v-3z" />
      <circle cx="15" cy="12" r="3" />
    </>
  ),
  typescript: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M7.5 10.5h5M10 10.5V17M18 11a2 2 0 0 0-3.4.4c-.6 1.6 3.6 1.5 3.4 3.6a2 2 0 0 1-3.8.5" />
    </>
  ),
  'node.js': (
    <>
      <path d="M12 2.8l8 4.6v9.2l-8 4.6-8-4.6V7.4l8-4.6z" />
      <path d="M10 9.5v5.2a1.5 1.5 0 0 1-2.6 1M16 10.3a1.8 1.8 0 0 0-3 .3c-.4 1.3 3.2 1.2 3 3a1.8 1.8 0 0 1-3.3.4" />
    </>
  ),
  testing: (
    <>
      <path d="M9 3h6M10 3v6L4.8 18a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 9V3" />
      <path d="M9 15l2 2 4-4" />
    </>
  ),
  npm: (
    <>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M4 7.5l8 4.5 8-4.5M12 12v9" />
    </>
  ),
}

function SkillGlyph({ name }) {
  const glyph = glyphs[name.toLowerCase()]
  if (!glyph) {
    return <span className="skill__initials">{name.slice(0, 2)}</span>
  }
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {glyph}
    </svg>
  )
}

export default function Skills({ groups, index }) {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          index={index}
          label="Skills & tools"
          id="skills-title"
          title={
            <>
              What I <em className="accent-serif">work with</em>
            </>
          }
        >
          An honest snapshot — no percentage bars, just what I’ve actually used and what I’m
          learning next.
        </SectionHeading>

        <div className="skills">
          {groups.map((group, i) => (
            <div
              key={group.id}
              className={`skill-group glass${group.live ? ' skill-group--live' : ''}`}
              data-reveal
              style={{ '--delay': i }}
            >
              <div className="skill-group__head">
                <h3 className="skill-group__label">
                  {group.live && <span className="pulse-dot" aria-hidden="true" />}
                  {group.label}
                </h3>
                <p className="skill-group__note">{group.note}</p>
              </div>
              {group.items.length > 0 ? (
                <ul className="skill-group__items">
                  {group.items.map((item) => (
                    <li key={item} className="skill">
                      <span className="skill__icon">
                        <SkillGlyph name={item} />
                      </span>
                      <span className="skill__name">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  <Field label="Add what you are currently learning" />
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
