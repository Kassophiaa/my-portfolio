import Field from './Field.jsx'
import Icon from './Icon.jsx'
import { isMissing, textOf } from '../lib/content.js'

const CARD_TECH = 3

export function ProjectCover({ project, large = false }) {
  if (project.image) {
    return (
      <div className={`cover${large ? ' cover--large' : ''}`}>
        <img
          src={project.image}
          alt={project.imageAlt ?? ''}
          loading="lazy"
          decoding="async"
          width="1280"
          height="800"
        />
        {project.video && !large && (
          <span className="cover__badge mono">
            <Icon name="play" size={12} /> Video demo
          </span>
        )}
      </div>
    )
  }

  // Generated cover when no screenshot exists yet.
  const title = textOf(project.title, project.category)
  return (
    <div
      className={`cover cover--generated${project.draft ? ' cover--draft' : ''}${large ? ' cover--large' : ''}`}
      data-category={project.category}
      aria-hidden="true"
    >
      <span className="cover__glyph">{project.draft ? '+' : title.charAt(0)}</span>
      <span className="cover__label mono">
        {project.draft ? 'screenshot pending' : 'no screenshot yet'}
      </span>
    </div>
  )
}

export default function ProjectCard({ project, onOpen, focusable = true }) {
  const titleText = textOf(project.title, 'Untitled project')

  return (
    <article className={`project-card glass${project.draft ? ' project-card--draft' : ''}`}>
      <ProjectCover project={project} />
      <div className="project-card__body">
        <p className="project-card__meta mono">
          <span>{project.category}</span>
          {!isMissing(project.year) && <span>{project.year}</span>}
          {project.draft && <span className="project-card__draft">Draft slot</span>}
        </p>
        <h3 className="project-card__title">
          <Field value={project.title} />
        </h3>
        <p className="project-card__summary">
          <Field value={project.summary} />
        </p>
        {project.tech.length > 0 && (
          // Cards show the first few; the full list is in the details window.
          <ul className="project-card__tech" aria-label="Technologies">
            {project.tech.slice(0, CARD_TECH).map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
            {project.tech.length > CARD_TECH && (
              <li className="chip chip--more">
                +{project.tech.length - CARD_TECH}
                <span className="visually-hidden"> more</span>
              </li>
            )}
          </ul>
        )}
        <button
          type="button"
          className="project-card__open"
          onClick={onOpen}
          tabIndex={focusable ? undefined : -1}
          aria-haspopup="dialog"
          aria-label={`View details: ${titleText}`}
        >
          <span>View details</span>
          <span className="project-card__arrow" aria-hidden="true">
            <Icon name="arrow" size={18} />
          </span>
        </button>
      </div>
    </article>
  )
}
