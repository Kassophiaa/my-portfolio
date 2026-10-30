import Field from '../Field.jsx'
import Icon from '../Icon.jsx'
import { isMissing, textOf } from '../../lib/content.js'

function initialsOf(name) {
  const text = textOf(name, '')
  const parts = text.split(/\s+/).filter(Boolean)
  return parts.length ? (parts[0][0] + (parts.at(-1)[0] ?? '')).toUpperCase() : null
}

function FlipButton({ onFlip, children }) {
  return (
    <button type="button" className="badge__flip-btn" onClick={onFlip}>
      <Icon name="flip" size={14} />
      {children}
    </button>
  )
}

// OJT rows on the back of the badge (same data as the About section)
const OJT_ROWS = [
  ['hours', 'Hours'],
  ['start', 'Available'],
  ['setup', 'Setup'],
]

// The two faces of the ID badge. Purely presentational; motion lives in LanyardBadge.
export default function BadgeCard({ profile, flipped, onFlip }) {
  const initials = initialsOf(profile.name)
  const links = profile.links.filter((link) => !isMissing(link.href) && link.badge !== false)
  const ojtRows = OJT_ROWS.filter(([key]) => !isMissing(profile.ojt?.[key]))

  return (
    <div className={`badge__flipper${flipped ? ' is-flipped' : ''}`}>
      <div className="badge__face badge__face--front" inert={flipped}>
        <div className="badge__top">
          <span className="badge__slot" aria-hidden="true" />
        </div>

        <div className="badge__photo">
          {profile.photo ? (
            <img src={profile.photo} alt={`Photo of ${textOf(profile.name, 'me')}`} width="240" height="240" />
          ) : (
            <span className="badge__monogram" aria-hidden="true">
              {initials ?? <Icon name="user" size={44} />}
            </span>
          )}
        </div>

        <div className="badge__info">
          <p className="badge__name">
            <Field value={profile.name} />
          </p>
          <p className="badge__role">{profile.badgeRole ?? profile.role.split('·')[0].trim()}</p>
        </div>

        <div className="badge__footer">
          <p className="badge__status">
            <span className="pulse-dot" aria-hidden="true" />
            Available for OJT
          </p>
          <FlipButton onFlip={onFlip}>
            Flip<span className="visually-hidden"> badge to see OJT details and links</span>
          </FlipButton>
        </div>
      </div>

      <div className="badge__face badge__face--back" inert={!flipped}>
        <div className="badge__top">
          <span className="badge__slot" aria-hidden="true" />
        </div>

        <div className="badge__back-body">
          {ojtRows.length > 0 && (
            <>
              <p className="badge__label">OJT details</p>
              <dl className="badge__ojt">
                {ojtRows.map(([key, label]) => (
                  <div key={key}>
                    <dt>{label}</dt>
                    <dd>{profile.ojt[key]}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}

          <p className="badge__label">Find me</p>
          {links.length > 0 ? (
            <ul className="badge__links">
              {links.map((link) => (
                <li key={link.id}>
                  <a href={link.href} target="_blank" rel="noreferrer">
                    <Icon name={link.id} size={16} />
                    {link.label}
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
              {!isMissing(profile.resume) && (
                <li>
                  <a href={profile.resume} download>
                    <Icon name="download" size={16} />
                    Résumé
                  </a>
                </li>
              )}
            </ul>
          ) : (
            <Field label="Add your links" />
          )}
        </div>

        <div className="badge__footer">
          <a className="badge__contact" href="#contact">
            Get in touch
          </a>
          <FlipButton onFlip={onFlip}>
            Back<span className="visually-hidden"> to the front of the badge</span>
          </FlipButton>
        </div>
      </div>
    </div>
  )
}
