import { useEffect, useRef, useState } from 'react'
import SectionHeading from './SectionHeading.jsx'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import './About.css'

// Counts from 0 up to `target` the first time the element scrolls into view.
function useCountUp(target, reduced) {
  const ref = useRef(null)
  const [value, setValue] = useState(reduced ? target : 0)

  useEffect(() => {
    const el = ref.current
    if (reduced || !el) return
    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const t = Math.min((now - start) / 1100, 1)
          setValue(Math.round(target * (1 - (1 - t) ** 3)))
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target, reduced])

  return [ref, reduced ? target : value]
}

function Stat({ value, label, reduced }) {
  const [ref, shown] = useCountUp(value, reduced)
  return (
    <div className="about__stat" ref={ref}>
      <dt>{label}</dt>
      <dd>
        {/* The final number is what assistive tech reads; the count-up is visual only */}
        <span aria-hidden="true">{shown}</span>
        <span className="visually-hidden">{value}</span>
      </dd>
    </div>
  )
}

export default function About({ profile, stats = [], index }) {
  const reduced = useReducedMotion()
  const [lead, ...rest] = profile.about

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container about">
        <SectionHeading
          index={index}
          label="About me"
          id="about-title"
          title={
            <>
              Curious, hands&#8209;on, and <em className="accent-serif">eager to learn.</em>
            </>
          }
        />

        <div className="about__grid">
          <div className="about__main">
            <div className="about__story" data-reveal data-stagger>
              <p className="about__lead">{lead}</p>
              {rest.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {stats.length > 0 && (
              <dl className="about__stats" data-reveal data-stagger style={{ '--delay': 1 }}>
                {stats.map((stat) => (
                  <Stat key={stat.label} {...stat} reduced={reduced} />
                ))}
              </dl>
            )}
          </div>

          <dl className="about__facts glass" data-reveal style={{ '--delay': 2 }}>
            <div className="about__fact">
              <dt className="mono">Interested in</dt>
              <dd>
                <ul className="about__chips" data-reveal data-stagger>
                  {profile.interests.map((item) => (
                    <li key={item} className="chip about__chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="about__fact">
              <dt className="mono">Looking for</dt>
              <dd>
                <ul className="tick-list tick-list--check" data-reveal data-stagger>
                  {profile.seeking.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
