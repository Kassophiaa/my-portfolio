import { useState } from 'react'
import SectionHeading from './SectionHeading.jsx'
import ProjectCard from './ProjectCard.jsx'
import ProjectDialog from './ProjectDialog.jsx'
import { useCardRow } from '../hooks/useCardRow.js'
import './Projects.css'
export default function Projects({ projects, index }) {
  const [openId, setOpenId] = useState(null)

  const openProject = projects.find((project) => project.id === openId) ?? null
  const realCount = projects.filter((project) => !project.draft).length
  // Copy 1 is the real list; copies 0 and 2 sit either side of it for looping
  const { copies, rowProps } = useCardRow(projects.length)

  return (
    <section id="projects" className="section section--glow" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          index={index}
          label="Featured projects"
          id="projects-title"
          title={
            <>
              Things I’ve <em className="accent-serif">built</em>
            </>
          }
        />
      </div>

      {/* Outside .container so the row can run to the screen edges */}
      {projects.length > 0 && (
        <>
          <ul
            {...rowProps}
            className={`${rowProps.className} project-track`}
            aria-label="Projects (scroll sideways, drag, or use the arrow keys)"
          >
            {copies.map((copy) =>
              projects.map((project, i) => (
                <li
                  key={`${copy}-${project.id}`}
                  style={{ '--i': i }}
                  // The extra copies are only there for looping: hidden from screen
                  // readers and the Tab order, but still clickable
                  aria-hidden={copy === 1 ? undefined : 'true'}
                >
                  <ProjectCard
                    project={project}
                    onOpen={() => setOpenId(project.id)}
                    focusable={copy === 1}
                  />
                </li>
              )),
            )}
          </ul>

          {projects.some((project) => project.draft) && realCount < 2 && (
            <div className="container">
              <p className="projects-note mono">
                More projects are being added — dashed cards are placeholders.
              </p>
            </div>
          )}
        </>
      )}

      <ProjectDialog project={openProject} onClose={() => setOpenId(null)} />
    </section>
  )
}
