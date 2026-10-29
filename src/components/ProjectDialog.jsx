import { useEffect, useRef, useState } from 'react'
import Field from './Field.jsx'
import Icon from './Icon.jsx'
import { ProjectCover } from './ProjectCard.jsx'
import { isMissing } from '../lib/content.js'

// Shows the screenshot with a play button; the video file only downloads once it's pressed.
function DemoVideo({ project }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div className="cover cover--large cover--video">
        <video src={project.video} poster={project.image ?? undefined} controls autoPlay playsInline>
          Your browser can’t play this video.
        </video>
      </div>
    )
  }

  return (
    <div className="demo-poster">
      <ProjectCover project={project} large />
      <button type="button" className="demo-poster__play" onClick={() => setPlaying(true)}>
        <span className="demo-poster__icon" aria-hidden="true">
          <Icon name="play" size={22} />
        </span>
        <span className="demo-poster__label">Watch demo</span>
      </button>
    </div>
  )
}

function ProjectLink({ href, label, icon }) {
  // null means "doesn't apply" (e.g. a desktop app with no web demo): no button at all.
  if (href === null) return null
  if (isMissing(href)) {
    return (
      <span className="btn btn--ghost" aria-disabled="true">
        <Icon name={icon} /> {label}
        <span className="visually-hidden"> (not available yet)</span>
        <span className="link-unavailable mono" aria-hidden="true">
          soon
        </span>
      </span>
    )
  }
  return (
    <a className="btn btn--ghost" href={href} target="_blank" rel="noreferrer">
      <Icon name={icon} /> {label}
      <Icon name="external" size={15} className="icon--shift" />
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  )
}

// Uses the native <dialog> element: focus is trapped, Escape closes,
// and focus returns to the button that opened it.
export default function ProjectDialog({ project, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (project && !dialog.open) dialog.showModal()
    if (!project && dialog.open) dialog.close()
  }, [project])

  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onClick={(event) => event.target === ref.current && onClose()}
    >
      {project && (
        <div className="project-dialog__inner">
          <button
            type="button"
            className="icon-button project-dialog__close"
            onClick={onClose}
            aria-label="Close project details"
          >
            <Icon name="close" />
          </button>

          {project.video ? (
            <DemoVideo key={project.id} project={project} />
          ) : (
            <ProjectCover project={project} large />
          )}

          <div className="project-dialog__content">
            <p className="project-card__meta mono">
              <span>{project.category}</span>
              {!isMissing(project.year) && <span>{project.year}</span>}
              {project.draft && <span className="project-card__draft">Draft slot</span>}
            </p>
            <h3 id="project-dialog-title" className="project-dialog__title">
              <Field value={project.title} />
            </h3>
            <p className="project-dialog__summary">
              <Field value={project.summary} />
            </p>

            {project.description.map((paragraph, i) => (
              <p key={i} className="project-dialog__text">
                {paragraph}
              </p>
            ))}

            <dl className="project-dialog__facts">
              {!isMissing(project.status) && (
                <div>
                  <dt className="mono">Status</dt>
                  <dd>{project.status}</dd>
                </div>
              )}
              <div>
                <dt className="mono">Role</dt>
                <dd>
                  <Field value={project.role} />
                </dd>
              </div>
              <div>
                <dt className="mono">Built with</dt>
                <dd>
                  {project.tech.length > 0 ? (
                    <ul className="project-card__tech">
                      {project.tech.map((tech) => (
                        <li key={tech} className="chip">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Field label="Technologies used" />
                  )}
                </dd>
              </div>
            </dl>

            {project.highlights.length > 0 && (
              <div className="project-dialog__highlights">
                <h4 className="mono">Key features</h4>
                <ul className="tick-list tick-list--check">
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.next?.length > 0 && (
              <div className="project-dialog__highlights">
                <h4 className="mono">What’s next</h4>
                <ul className="tick-list">
                  {project.next.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="project-dialog__links">
              <ProjectLink href={project.links.live} label="Live demo" icon="link" />
              <ProjectLink href={project.links.repo} label="Source code" icon="github" />
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
