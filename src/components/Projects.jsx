import { useMemo, useState } from 'react'
import SectionHeading from './SectionHeading.jsx'
import ProjectCard from './ProjectCard.jsx'
import ProjectDialog from './ProjectDialog.jsx'
import './Projects.css'

const ALL = { kind: 'all', value: 'All' }

const matches = (project, filter) => {
  if (filter.kind === 'category') return project.category === filter.value
  if (filter.kind === 'tech') return project.tech.includes(filter.value)
  return true
}

const sameFilter = (a, b) => a.kind === b.kind && a.value === b.value

export default function Projects({ projects, index }) {
  const [filter, setFilter] = useState(ALL)
  const [openId, setOpenId] = useState(null)

  const filters = useMemo(() => {
    const categories = [...new Set(projects.map((p) => p.category))]
    const tech = [...new Set(projects.flatMap((p) => p.tech))]
    return [
      ALL,
      ...categories.map((value) => ({ kind: 'category', value })),
      ...tech.map((value) => ({ kind: 'tech', value })),
    ]
  }, [projects])

  const visible = projects.filter((project) => matches(project, filter))
  const openProject = projects.find((project) => project.id === openId) ?? null
  const realCount = projects.filter((project) => !project.draft).length

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading index={index} label="Projects" id="projects-title" title="Things I’ve built">
          Academic and personal work. Open a project for details, technologies, and links.
        </SectionHeading>

        <div className="filters" role="group" aria-label="Filter projects" data-reveal>
          {filters.map((item) => {
            const count = projects.filter((project) => matches(project, item)).length
            const selected = sameFilter(item, filter)
            return (
              <button
                key={`${item.kind}-${item.value}`}
                type="button"
                className={`filter filter--${item.kind}`}
                aria-pressed={selected}
                onClick={() => setFilter(item)}
              >
                {item.kind === 'tech' && <span aria-hidden="true">#</span>}
                {item.value}
                <span className="filter__count" aria-label={`${count} projects`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <p className="visually-hidden" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
          {filter.kind === 'all' ? '' : ` for ${filter.value}`}
        </p>

        {visible.length > 0 ? (
          <ul className="project-grid" key={`${filter.kind}-${filter.value}`}>
            {visible.map((project, i) => (
              <li
                key={project.id}
                className={project.featured && visible.length > 1 ? 'is-featured' : undefined}
                style={{ '--i': i }}
              >
                <ProjectCard project={project} onOpen={() => setOpenId(project.id)} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="projects-empty">
            <p>No projects use {filter.value} yet.</p>
            <button type="button" className="btn btn--ghost" onClick={() => setFilter(ALL)}>
              Show all projects
            </button>
          </div>
        )}

        {realCount < 2 && (
          <p className="projects-note mono">
            More projects are being added — dashed cards are placeholders.
          </p>
        )}
      </div>

      <ProjectDialog project={openProject} onClose={() => setOpenId(null)} />
    </section>
  )
}
