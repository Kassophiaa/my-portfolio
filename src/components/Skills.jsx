import Field from './Field.jsx'
import SectionHeading from './SectionHeading.jsx'
import './Skills.css'

export default function Skills({ groups, index }) {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading index={index} label="Skills" id="skills-title" title="What I work with">
          An honest snapshot — no percentage bars, just what I’ve actually used and what I’m
          learning next.
        </SectionHeading>

        <div className="skills">
          {groups.map((group, i) => (
            <div
              key={group.id}
              className={`skill-row${group.live ? ' skill-row--live' : ''}`}
              data-reveal
              style={{ '--delay': i }}
            >
              <div className="skill-row__head">
                <h3 className="skill-row__label">
                  {group.live && <span className="pulse-dot" aria-hidden="true" />}
                  {group.label}
                </h3>
                <p className="skill-row__note">{group.note}</p>
              </div>
              {group.items.length > 0 ? (
                <ul className="skill-row__items">
                  {group.items.map((item) => (
                    <li key={item} className="skill">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="skill-row__items">
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
