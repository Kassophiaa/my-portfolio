import { useCallback, useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import SectionHeading from './SectionHeading.jsx'
import ProjectCard from './ProjectCard.jsx'
import ProjectDialog from './ProjectDialog.jsx'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import './Projects.css'

// Tracks a horizontal scroller: which card is first in view, how far along it is,
// and whether it can scroll further either way. Re-measures when `resetKey` changes.
function useCarousel(resetKey) {
  const ref = useRef(null)
  const [state, setState] = useState({ index: 0, progress: 0, start: true, end: true })

  const measure = useCallback(() => {
    const el = ref.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const first = el.firstElementChild
    const step = first ? first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || 0) : 1
    setState({
      index: Math.round(el.scrollLeft / step),
      progress: max > 0 ? el.scrollLeft / max : 1,
      start: el.scrollLeft <= 2,
      end: el.scrollLeft >= max - 2,
    })
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.scrollLeft = 0
    let frame = 0
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(() => ((frame = 0), measure()))
    }
    measure()
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [measure, resetKey])

  return [ref, state]
}

export default function Projects({ projects, index }) {
  const [openId, setOpenId] = useState(null)

  const openProject = projects.find((project) => project.id === openId) ?? null
  const realCount = projects.filter((project) => !project.draft).length
  const [trackRef, carousel] = useCarousel(projects.length)
  const reduced = useReducedMotion()
  const scrollable = !(carousel.start && carousel.end)

  // Move by one card (prev/next buttons and arrow keys on the track)
  const step = (direction) => {
    const el = trackRef.current
    const card = el?.firstElementChild
    if (!card) return
    const gap = parseFloat(getComputedStyle(el).columnGap || 0)
    el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: reduced ? 'auto' : 'smooth' })
  }

  const onTrackKey = (event) => {
    if (event.target !== event.currentTarget) return
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault()
      step(event.key === 'ArrowRight' ? 1 : -1)
    }
  }

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
            ref={trackRef}
            className="project-track"
            tabIndex={scrollable ? 0 : undefined}
            aria-label="Projects (scroll sideways or use the arrow keys)"
            onKeyDown={onTrackKey}
          >
            {projects.map((project, i) => (
              <li key={project.id} style={{ '--i': i }}>
                <ProjectCard project={project} onOpen={() => setOpenId(project.id)} />
              </li>
            ))}
          </ul>

          <div className="container">
            <div className={`project-controls${scrollable ? '' : ' is-static'}`}>
              <span className="project-controls__bar" aria-hidden="true">
                <span style={{ transform: `scaleX(${Math.max(carousel.progress, 0.04)})` }} />
              </span>
              <span className="project-controls__count mono" aria-hidden="true">
                {String(Math.min(carousel.index + 1, projects.length)).padStart(2, '0')} /{' '}
                {String(projects.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                className="icon-button project-controls__btn"
                onClick={() => step(-1)}
                disabled={carousel.start}
                aria-label="Previous project"
              >
                <Icon name="arrow" size={18} />
              </button>
              <button
                type="button"
                className="icon-button project-controls__btn"
                onClick={() => step(1)}
                disabled={carousel.end}
                aria-label="Next project"
              >
                <Icon name="arrow" size={18} />
              </button>
            </div>

            {projects.some((project) => project.draft) && realCount < 2 && (
              <p className="projects-note mono">
                More projects are being added — dashed cards are placeholders.
              </p>
            )}
          </div>
        </>
      )}

      <ProjectDialog project={openProject} onClose={() => setOpenId(null)} />
    </section>
  )
}
