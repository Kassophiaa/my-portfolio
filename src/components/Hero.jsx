import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import Field from './Field.jsx'
import Icon from './Icon.jsx'
import StaticLanyard from './badge/StaticLanyard.jsx'
import { isMissing } from '../lib/content.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import './Hero.css'

// Physics code is split into its own chunk and loaded after the hero renders.
const LanyardBadge = lazy(() => import('./badge/LanyardBadge.jsx'))

// Soft glow that follows the cursor across the hero (desktop, motion allowed).
function useCursorGlow(ref, enabled) {
  useEffect(() => {
    const el = ref.current
    if (!enabled || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let frame = 0
    const onMove = (event) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--gx', `${event.clientX - rect.left}px`)
        el.style.setProperty('--gy', `${event.clientY - rect.top}px`)
        el.classList.add('has-glow')
      })
    }
    const onLeave = () => el.classList.remove('has-glow')
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [ref, enabled])
}

// True once the page has loaded and the browser is idle, so the physics chunk
// never competes with the first render.
function useAfterLoadIdle() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let idle = 0
    const go = () => {
      idle = window.requestIdleCallback
        ? window.requestIdleCallback(() => setReady(true), { timeout: 2000 })
        : window.setTimeout(() => setReady(true), 300)
    }
    if (document.readyState === 'complete') go()
    else window.addEventListener('load', go, { once: true })
    return () => {
      window.removeEventListener('load', go)
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
    }
  }, [])
  return ready
}

export default function Hero({ profile, skills }) {
  const hasResume = !isMissing(profile.resume)
  const reduced = useReducedMotion()
  const physicsReady = useAfterLoadIdle()
  const ref = useRef(null)
  useCursorGlow(ref, !reduced)

  const badgeProps = { profile, skills }

  return (
    <section id="top" className="hero" aria-labelledby="hero-title" ref={ref}>
      <div className="hero__inner container">
        <div className="hero__copy">
          <p className="hero__status" data-reveal>
            <span className="pulse-dot" aria-hidden="true" />
            {profile.availability}
          </p>

          <h1 id="hero-title" className="hero__title" data-reveal style={{ '--delay': 1 }}>
            <span className="hero__hello">Hi, I’m</span>{' '}
            <span className="hero__name">
              <Field value={profile.name} />
            </span>
          </h1>

          <p className="hero__tagline" data-reveal style={{ '--delay': 2 }}>
            {profile.role.split('·')[0].trim()} <em className="accent-serif">ready to learn</em>{' '}
            by building real software.
          </p>

          <p className="hero__intro" data-reveal style={{ '--delay': 3 }}>
            {profile.intro}
          </p>

          <div className="hero__actions" data-reveal style={{ '--delay': 4 }}>
            <a className="btn btn--primary" href="#projects">
              View projects <Icon name="arrow" className="icon--shift" />
            </a>
            <a className="btn btn--ghost" href="#contact">
              Get in touch
            </a>
            {hasResume && (
              <a className="btn btn--ghost" href={profile.resume} download>
                <Icon name="download" /> Résumé
              </a>
            )}
          </div>

          <p className="hero__meta mono" data-reveal style={{ '--delay': 5 }}>
            <Icon name="pin" size={16} />
            <Field value={profile.location} />
          </p>
        </div>

        <div className="hero__visual">
          {reduced || !physicsReady ? (
            <StaticLanyard {...badgeProps} />
          ) : (
            <Suspense fallback={<StaticLanyard {...badgeProps} />}>
              <LanyardBadge {...badgeProps} />
            </Suspense>
          )}
          <p className="hero__hint mono" aria-hidden="true">
            {reduced ? (
              'use “Flip” to see the back'
            ) : (
              <>
                drag the badge · <span className="hint-fine">click</span>
                <span className="hint-touch">tap</span> to flip
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  )
}
