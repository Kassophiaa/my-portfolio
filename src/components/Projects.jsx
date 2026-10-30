import { useCallback, useEffect, useRef, useState } from 'react'
import SectionHeading from './SectionHeading.jsx'
import ProjectCard from './ProjectCard.jsx'
import ProjectDialog from './ProjectDialog.jsx'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import './Projects.css'

// Width of one card plus the gap, i.e. one "step" of the row
function stepOf(el) {
  const card = el.firstElementChild
  return card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || 0) : 0
}

// With this many projects or more, the row loops: it holds three copies of the list
// and starts on the middle one, so there is always more to scroll to on both sides.
const LOOP_MIN = 4

// Tracks whether the row can scroll further either way (drives the edge fades).
// When looping, once the row comes to rest it jumps by exactly one copy of the list
// back into the middle copy. Every card looks the same in each copy, so the jump
// can't be seen, and the row never runs out on either side.
function useCarousel(count, loop) {
  const ref = useRef(null)
  const [state, setState] = useState({ start: true, end: true })

  const measure = useCallback(() => {
    const el = ref.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const start = loop ? false : el.scrollLeft <= 2
    const end = loop ? false : el.scrollLeft >= max - 2
    setState((prev) => (prev.start === start && prev.end === end ? prev : { start, end }))
  }, [loop])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const setWidth = () => stepOf(el) * count

    // Keep the scroll position inside the middle copy (no-op when not looping)
    const recentre = () => {
      const set = setWidth()
      if (!loop || !set || el.classList.contains('is-dragging')) return
      if (el.scrollLeft < set * 0.5) el.scrollLeft += set
      else if (el.scrollLeft >= set * 1.5) el.scrollLeft -= set
    }

    el.scrollLeft = loop ? setWidth() : 0
    let frame = 0
    let settle = 0
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(() => ((frame = 0), measure()))
      clearTimeout(settle)
      settle = setTimeout(recentre, 140)
    }
    // Card widths change with the window: stay on the same card
    const onResize = () => {
      const step = stepOf(el)
      if (loop && step) el.scrollLeft = (count + (Math.round(el.scrollLeft / step) % count)) * step
      measure()
    }
    measure()
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(settle)
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [measure, count, loop])

  return [ref, state]
}

// Mouse users can grab the row and drag it sideways (touch and trackpads already
// scroll it natively). A drag never counts as a click on the card underneath.
function useDragScroll(ref, smooth) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let drag = null

    const onMove = (event) => {
      if (!drag) return
      const dx = event.clientX - drag.x
      if (!drag.moved && Math.abs(dx) < 6) return
      drag.moved = true
      el.classList.add('is-dragging')
      el.scrollLeft = drag.left - dx
    }

    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      if (!drag?.moved) return (drag = null)
      el.classList.remove('is-dragging')
      // Swallow the click that follows the drag, then settle on the nearest card
      const swallow = (event) => {
        event.preventDefault()
        event.stopPropagation()
      }
      el.addEventListener('click', swallow, { capture: true, once: true })
      setTimeout(() => el.removeEventListener('click', swallow, { capture: true }), 0)
      const step = stepOf(el)
      if (step) el.scrollTo({ left: Math.round(el.scrollLeft / step) * step, behavior: smooth ? 'smooth' : 'auto' })
      drag = null
    }

    const onDown = (event) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return
      if (el.scrollWidth <= el.clientWidth) return
      drag = { x: event.clientX, left: el.scrollLeft, moved: false }
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
      window.addEventListener('pointercancel', onUp)
    }

    // Stop the browser from dragging card images instead of the row
    const onDragStart = (event) => event.preventDefault()

    el.addEventListener('pointerdown', onDown)
    el.addEventListener('dragstart', onDragStart)
    return () => {
      onUp()
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('dragstart', onDragStart)
    }
  }, [ref, smooth])
}

export default function Projects({ projects, index }) {
  const [openId, setOpenId] = useState(null)

  const openProject = projects.find((project) => project.id === openId) ?? null
  const realCount = projects.filter((project) => !project.draft).length
  const loop = projects.length >= LOOP_MIN
  const [trackRef, carousel] = useCarousel(projects.length, loop)
  const reduced = useReducedMotion()
  const scrollable = loop || !(carousel.start && carousel.end)
  // Copy 1 is the real list; copies 0 and 2 sit either side of it for looping
  const copies = loop ? [0, 1, 2] : [1]
  useDragScroll(trackRef, !reduced)

  // Move by one card (arrow keys on the focused row)
  const step = (direction) => {
    const el = trackRef.current
    const size = el && stepOf(el)
    if (!size) return
    el.scrollBy({ left: direction * size, behavior: reduced ? 'auto' : 'smooth' })
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
            className={`project-track${scrollable ? ' is-scrollable' : ''}${carousel.start ? '' : ' can-left'}${carousel.end ? '' : ' can-right'}`}
            tabIndex={scrollable ? 0 : undefined}
            aria-label="Projects (scroll sideways, drag, or use the arrow keys)"
            onKeyDown={onTrackKey}
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
