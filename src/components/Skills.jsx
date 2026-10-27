import { useRef, useState } from 'react'
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
}

// Skills that share another skill's glyph.
const aliases = {
  github: 'git',
  'github desktop': 'git',
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

function SkillList({ items, compact }) {
  if (compact) {
    return (
      <ul className="project-card__tech">
        {items.map((item, i) => (
          <li key={item.name} className="chip" style={{ '--i': i }}>
            {item.name}
          </li>
        ))}
      </ul>
    )
  }
  return (
    <ul className="skill-group__items">
      {items.map((item, i) => (
        <li key={item.name} className="skill" style={{ '--i': i }}>
          <span className="skill__icon">
            <SkillGlyph name={item.name} />
          </span>
          <span className="skill__name">{item.name}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Skills({ groups, levels, index }) {
  const [activeId, setActiveId] = useState(groups[0]?.id)
  const tabRefs = useRef([])
  const activeIndex = Math.max(
    0,
    groups.findIndex((group) => group.id === activeId),
  )
  const group = groups[activeIndex]

  // Arrow keys move between tabs (works for the vertical rail and the mobile row).
  const onKeyDown = (event) => {
    const last = groups.length - 1
    const next = {
      ArrowDown: activeIndex === last ? 0 : activeIndex + 1,
      ArrowRight: activeIndex === last ? 0 : activeIndex + 1,
      ArrowUp: activeIndex === 0 ? last : activeIndex - 1,
      ArrowLeft: activeIndex === 0 ? last : activeIndex - 1,
      Home: 0,
      End: last,
    }[event.key]
    if (next === undefined) return
    event.preventDefault()
    setActiveId(groups[next].id)
    tabRefs.current[next]?.focus()
  }

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
          An honest snapshot — no percentage bars. Each group shows what I’ve used in projects,
          what I’m familiar with, and what I’m currently learning.
        </SectionHeading>

        <div className="skills" data-reveal>
          <div
            className="skill-tabs"
            role="tablist"
            aria-label="Skill groups"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
          >
            {groups.map((item, i) => {
              const selected = i === activeIndex
              return (
                <button
                  key={item.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`skill-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls="skill-panel"
                  tabIndex={selected ? 0 : -1}
                  className="skill-tab"
                  onClick={() => setActiveId(item.id)}
                >
                  <span className="skill-tab__label">{item.label}</span>
                  <span className="filter__count" aria-label={`${item.items.length} skills`}>
                    {item.items.length}
                  </span>
                </button>
              )
            })}
          </div>

          {group && (
            <div
              id="skill-panel"
              className="skill-group glass"
              role="tabpanel"
              aria-labelledby={`skill-tab-${group.id}`}
            >
              {/* Keyed so the content replays its entrance when the tab changes */}
              <div key={group.id} className="skill-group__body">
                <div className="skill-group__head">
                  <h3 className="skill-group__label">{group.label}</h3>
                  {group.note && <p className="skill-group__note">{group.note}</p>}
                </div>
                {group.items.length > 0 ? (
                  levels.map((level) => {
                    const items = group.items.filter((item) => item.level === level.id)
                    if (items.length === 0) return null
                    return (
                      <div key={level.id} className={`skill-level skill-level--${level.id}`}>
                        <h4 className="skill-level__label mono">
                          {level.live && <span className="pulse-dot" aria-hidden="true" />}
                          {level.label}
                        </h4>
                        <SkillList items={items} compact={group.compact} />
                      </div>
                    )
                  })
                ) : (
                  <p>
                    <Field label="Add skills for this group" />
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
