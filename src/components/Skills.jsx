import Field from './Field.jsx'
import SectionHeading from './SectionHeading.jsx'
import './Skills.css'

// Simple line glyphs (not brand logos). Unknown skills fall back to their initials.
const glyphs = {
  html5: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12" />,
  css3: (
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
  git: (
    <>
      <circle cx="6.5" cy="5.5" r="2" />
      <circle cx="6.5" cy="18.5" r="2" />
      <circle cx="17.5" cy="8.5" r="2" />
      <path d="M6.5 7.5v9M17.5 10.5c0 4-5 3.5-9.5 6.5" />
    </>
  ),
  'visual studio code': (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M3.5 8.5h17M9 12.5l-2 2 2 2M13 16.5h3" />
    </>
  ),
  vite: <path d="M13 3L6 13.5h5L10 21l8-11.5h-5.5L13 3z" />,
  c: (
    <>
      <path d="M12 2.8l8 4.6v9.2l-8 4.6-8-4.6V7.4l8-4.6z" />
      <path d="M14.8 9.4a3.6 3.6 0 1 0 0 5.2" />
    </>
  ),
  preact: (
    <>
      <path d="M12 2.8l8 4.6v9.2l-8 4.6-8-4.6V7.4l8-4.6z" />
      <ellipse cx="12" cy="12" rx="5.5" ry="2.2" transform="rotate(-35 12 12)" />
      <ellipse cx="12" cy="12" rx="5.5" ry="2.2" transform="rotate(35 12 12)" />
    </>
  ),
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
      <rect x="2.5" y="7" width="19" height="10" rx="2" />
      <path d="M6 14.5V9.5h4v5M8 9.5v5M12.5 16V9.5h4v4h-2" />
    </>
  ),
  'responsive web design': (
    <>
      <rect x="2.5" y="4.5" width="14" height="10" rx="1.5" />
      <path d="M6.5 18.5h6M9.5 14.5v4" />
      <rect x="15.5" y="9.5" width="6" height="10" rx="1.5" />
    </>
  ),
  'rest api fundamentals': (
    <path d="M8 4.5c-2 0-2.5 1-2.5 2.5v2.5c0 1.2-.8 2-2 2.5 1.2.5 2 1.3 2 2.5V17c0 1.5.5 2.5 2.5 2.5M16 4.5c2 0 2.5 1 2.5 2.5v2.5c0 1.2.8 2 2 2.5-1.2.5-2 1.3-2 2.5V17c0 1.5-.5 2.5-2.5 2.5" />
  ),
  laravel: (
    <>
      <path d="M12 3l7.5 4.2v8.6L12 20l-7.5-4.2V7.2L12 3z" />
      <path d="M4.5 7.2L12 11.5l7.5-4.3M12 11.5V20" />
    </>
  ),
  supabase: <path d="M13.5 3v8.5H20L10.5 21v-8.5H4L13.5 3z" />,
  firebase: (
    <>
      <path d="M12 21c-3.9 0-6.5-2.6-6.5-6 0-4 3.5-6 4.5-11 3 2 4 4.5 3.5 7 1-.5 1.8-1.5 2-2.5 1.6 1.8 3 4 3 6.5 0 3.4-2.6 6-6.5 6z" />
      <path d="M12 21c-1.7 0-3-1.2-3-2.8 0-1.9 1.6-2.7 2.2-4.7 1.7 1.2 3.8 2.4 3.8 4.7 0 1.6-1.3 2.8-3 2.8z" />
    </>
  ),
  wordpress: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M6.5 8.5l3.8 9.5 1.7-5.2M10 8.5l4.2 9.5 3.3-9.5M5.5 8.5h3M13.5 8.5h3" />
    </>
  ),
  flutterflow: (
    <>
      <path d="M14.5 3.5L5 13l3 3L20.5 3.5h-6z" />
      <path d="M14 13.5L10.5 17l3.5 3.5h5L15.5 17l3.5-3.5h-5z" />
    </>
  ),
  excel: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M3.5 9h17M3.5 14.5h17M9.5 9v11.5" />
    </>
  ),
  python: (
    <>
      <path d="M12 3c-3.5 0-4 1.5-4 3v2.5h4.5V9.5H6c-1.8 0-3 1.4-3 4s1.2 4 3 4h2V15c0-1.4 1.1-2.5 2.5-2.5h4c1.4 0 2.5-1.1 2.5-2.5V6c0-1.5-1.5-3-5-3z" />
      <path d="M12 21c3.5 0 4-1.5 4-3v-2.5h-4.5v-1H18c1.8 0 3-1.4 3-4s-1.2-4-3-4h-2V9" />
      <path d="M10.5 5.6v.01M13.5 18.4v.01" />
    </>
  ),
  postman: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 16l2-4.5 6-4-4 6L8 16zM12 13.5l-1.5-2" />
    </>
  ),
  'basic bookkeeping': (
    <>
      <path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z" />
      <path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3M9 7.5h6M9 11h6M9 14.5h3" />
    </>
  ),
  xampp: (
    <>
      <rect x="4" y="4" width="16" height="6.5" rx="1.5" />
      <rect x="4" y="13.5" width="16" height="6.5" rx="1.5" />
      <path d="M7.5 7.25h.01M7.5 16.75h.01M11 7.25h5.5M11 16.75h5.5" />
    </>
  ),
}

// Skills that share another skill's glyph.
const aliases = {
  github: 'git',
  'github desktop': 'git',
  'vs code': 'visual studio code',
  sql: 'mysql',
  'database design': 'mysql',
}

function SkillGlyph({ name }) {
  const key = name.toLowerCase()
  const glyph = glyphs[aliases[key] ?? key]
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
  const items = groups.flatMap((group) => group.items)

  return (
    <section id="skills" className="section skills-section" aria-labelledby="skills-title">
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
        />

        <div className="skills-stage">
          <div className="skills-stage__orb" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          {items.length > 0 ? (
            <ul className="skills-grid" data-reveal data-stagger>
              {items.map((name) => (
                <li key={name} className="skill">
                  <span className="skill__icon">
                    <SkillGlyph name={name} />
                  </span>
                  <span className="skill__name">{name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <Field label="Add your skills in src/data/skills.js" />
            </p>
          )}
        </div>
      </div>
    </section>
  )
}