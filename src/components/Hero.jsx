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

// True once the page has loaded, web fonts have swapped in, and the browser is idle,
// so the physics chunk never competes with first render or font reflows.
function useAfterLoadIdle() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let idle = 0
    let cancelled = false
    const go = async () => {
      await document.fonts?.ready
      if (cancelled) return
      idle = window.requestIdleCallback
        ? window.requestIdleCallback(() => setReady(true), { timeout: 4000 })
        : window.setTimeout(() => setReady(true), 300)
    }
    if (document.readyState === 'complete') go()
    else window.addEventListener('load', go, { once: true })
    return () => {
      cancelled = true
      window.removeEventListener('load', go)
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
    }
  }, [])
  return ready
}

// Cycles through `words` every few seconds; the first word only under reduced motion.
function useRotatingWord(words, enabled, delay = 2600) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (!enabled || words.length < 2) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), delay)
    return () => window.clearInterval(id)
  }, [words, enabled, delay])
  return enabled ? words[index % words.length] : words[0]
}

export default function Hero({ profile }) {
  const hasResume = !isMissing(profile.resume)
  const links = profile.links.filter((link) => !isMissing(link.href))
  const builds = profile.builds ?? []
  const reduced = useReducedMotion()
  const physicsReady = useAfterLoadIdle()
  const ref = useRef(null)
  useCursorGlow(ref, !reduced)
  const word = useRotatingWord(builds, !reduced)

  const badgeProps = { profile }

  return (
    <section id="top" className="hero" aria-labelledby="hero-title" ref={ref}>
      <div className="hero__orbs" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="hero__inner container">
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title" data-reveal style={{ '--delay': 1 }}>
            <span className="hero__hello">Hi, I’m</span>{' '}
            <span className="hero__name">
              <Field value={profile.heroName ?? profile.name} />
            </span>
          </h1>

          {builds.length > 0 ? (
            <p className="hero__tagline" data-reveal style={{ '--delay': 2 }}>
              {profile.role.split('·')[0].trim()} who builds{' '}
              {/* Screen readers get the whole list once instead of a changing word */}
              <span className="visually-hidden">{builds.join(', ')}.</span>
              {/* Every phrase sits in the same grid cell, so the line is always as tall as
                  the longest one and the copy below never jumps */}
              <span className="hero__rotator" aria-hidden="true">
                {builds.map((item) => (
                  <em
                    key={item}
                    className={`accent-serif hero__word${item === word ? ' is-active' : ''}`}
                  >
                    {item}
                  </em>
                ))}
              </span>
            </p>
          ) : (
            <p className="hero__tagline" data-reveal style={{ '--delay': 2 }}>
              {profile.role.split('·')[0].trim()} <em className="accent-serif">ready to learn</em>{' '}
              by building real software.
            </p>
          )}

          <p className="hero__intro" data-reveal style={{ '--delay': 3 }}>
            {profile.intro}
          </p>

          <div className="hero__actions" data-reveal data-stagger style={{ '--delay': 4 }}>
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
            {links.length > 0 && (
              <ul className="hero__links" aria-label="Profiles">
                {links.map((link) => (
                  <li key={link.id}>
                    <a
                      className="icon-button hero__link"
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      title={link.label}
                    >
                      <Icon name={link.id} size={20} />
                      <span className="visually-hidden">{link.label} (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="hero__visual">
          {reduced || !physicsReady ? (
            <StaticLanyard {...badgeProps} />
          ) : (
            <Suspense fallback={<StaticLanyard {...badgeProps} />}>
              <LanyardBadge {...badgeProps} />
            </Suspense>
          )}
        </div>
      </div>

      <a className="hero__scroll" href="#about">
        <span className="hero__scroll-mouse" aria-hidden="true" />
        <span className="mono">Scroll</span>
        <span className="visually-hidden"> to About</span>
      </a>
    </section>
  )
}
