import { useEffect, useRef, useState } from 'react'
import BadgeCard from './BadgeCard.jsx'
import './Badge.css'

// Lightweight 2D rope + pendulum simulation (Verlet integration, fixed timestep).
// Particles 0..SEGMENTS form the strap (0 is pinned at the anchor); the last strap
// particle is the card's ring, and one extra particle is the card's bottom edge.
const SEGMENTS = 10
const ITERATIONS = 16
const GRAVITY = 2400
const STEP = 1 / 60
const MAX_SPEED = 30 // px per step, keeps throws from launching the card
const CLICK_SLOP = 6

const readPx = (el, name, fallback) =>
  parseFloat(getComputedStyle(el).getPropertyValue(name)) || fallback

export default function LanyardBadge(props) {
  const stageRef = useRef(null)
  const badgeRef = useRef(null)
  const tiltRef = useRef(null)
  const pathRef = useRef(null)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    const stage = stageRef.current
    const badge = badgeRef.current
    const tilt = tiltRef.current
    const path = pathRef.current
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const wide = window.matchMedia('(min-width: 960px)')

    // Touch devices get heavier damping and a smaller idle sway.
    const damping = coarse ? 0.955 : 0.972
    const swayAccel = coarse ? 60 : 110

    let points = []
    let segLen = 0
    let cardLen = 0
    let ringR = 0
    let badgeW = 0
    let bounds = { min: 0, max: 0 }
    const drag = { active: false, id: null, f: 1, ox: 0, oy: 0, tx: 0, ty: 0, sx: 0, sy: 0, moved: false, at: 0 }
    let lastInteraction = -10
    let time = 0
    let raf = 0
    let last = 0
    let acc = 0
    let visible = true

    // CSS sizes only change at breakpoints, so read them once per media change.
    let css = null
    const readCss = () => {
      css = { clipY: readPx(stage, '--clip-y', 48), ringR: readPx(stage, '--ring-r', 9) }
    }
    let lastKey = ''

    function layout(force = false) {
      const rect = stage.getBoundingClientRect()
      const pageTop = rect.top + window.scrollY
      // Skip when nothing that affects the rope changed (e.g. unrelated reflows).
      const key = `${rect.width}|${pageTop}|${wide.matches}`
      if (!force && key === lastKey) return
      lastKey = key
      if (!css) readCss()
      const cx = rect.width / 2
      const clipY = css.clipY
      // The strap hangs from the top of the page (the badge is first on phones, beside the intro on desktop).
      const anchorY = -pageTop
      ringR = css.ringR
      badgeW = badge.offsetWidth
      cardLen = badge.offsetHeight - ringR
      segLen = (clipY - anchorY) / SEGMENTS
      bounds = { min: -rect.left + 12, max: window.innerWidth - rect.left - 12 }

      points = []
      for (let i = 0; i <= SEGMENTS + 1; i++) {
        const y = i <= SEGMENTS ? anchorY + segLen * i : clipY + cardLen
        points.push({ x: cx, y, px: cx, py: y, inv: i === 0 ? 0 : i >= SEGMENTS ? 0.35 : 1 })
      }
      // A small sideways nudge so the badge swings in on load (desktop only: on
      // narrow screens the short strap would swing the card past the screen edge).
      if (wide.matches) points[SEGMENTS + 1].px -= coarse ? 4 : 9
      render()
    }

    function constrain(a, b, len, slackOnly) {
      const dx = b.x - a.x
      const dy = b.y - a.y
      const dist = Math.hypot(dx, dy) || 0.0001
      if (slackOnly && dist <= len) return
      const w = a.inv + b.inv
      if (!w) return
      const diff = (dist - len) / dist / w
      a.x += dx * diff * a.inv
      a.y += dy * diff * a.inv
      b.x -= dx * diff * b.inv
      b.y -= dy * diff * b.inv
    }

    function step() {
      time += STEP
      const idle = !drag.active && time - lastInteraction > 1.2
      for (let i = 1; i < points.length; i++) {
        const p = points[i]
        let vx = (p.x - p.px) * damping
        let vy = (p.y - p.py) * damping
        const speed = Math.hypot(vx, vy)
        if (speed > MAX_SPEED) {
          vx *= MAX_SPEED / speed
          vy *= MAX_SPEED / speed
        }
        p.px = p.x
        p.py = p.y
        p.x += vx
        p.y += vy + GRAVITY * STEP * STEP
      }
      if (idle) {
        const bottom = points[SEGMENTS + 1]
        bottom.x += Math.sin(time * 1.3) * Math.sin(time * 0.37) * swayAccel * STEP * STEP
      }

      const ring = points[SEGMENTS]
      const bottom = points[SEGMENTS + 1]
      for (let k = 0; k < ITERATIONS; k++) {
        for (let i = 1; i <= SEGMENTS; i++) constrain(points[i - 1], points[i], segLen, true)
        constrain(ring, bottom, cardLen, false)
        if (drag.active) {
          // Pin the grabbed point (somewhere along the card's axis) to the pointer.
          const gx = ring.x + (bottom.x - ring.x) * drag.f
          const gy = ring.y + (bottom.y - ring.y) * drag.f
          const dx = drag.tx - gx
          const dy = drag.ty - gy
          ring.x += dx * (1 - drag.f)
          ring.y += dy * (1 - drag.f)
          bottom.x += dx * drag.f
          bottom.y += dy * drag.f
        }
      }
    }

    function render() {
      const ring = points[SEGMENTS]
      const bottom = points[SEGMENTS + 1]
      const angle = -Math.atan2(bottom.x - ring.x, bottom.y - ring.y) * (180 / Math.PI)
      badge.style.transform = `translate3d(${ring.x - badgeW / 2}px, ${ring.y - ringR}px, 0) rotate(${angle}deg)`

      // Smooth strap: quadratic curves through segment midpoints.
      let d = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`
      for (let i = 1; i < SEGMENTS; i++) {
        const p = points[i]
        const n = points[i + 1]
        d += ` Q${p.x.toFixed(1)} ${p.y.toFixed(1)} ${((p.x + n.x) / 2).toFixed(1)} ${((p.y + n.y) / 2).toFixed(1)}`
      }
      d += ` L${ring.x.toFixed(1)} ${ring.y.toFixed(1)}`
      path.setAttribute('d', d)
      path.nextSibling?.setAttribute('d', d)
    }

    function frame(now) {
      raf = 0
      if (!visible || document.hidden) return
      const delta = Math.min((now - (last || now)) / 1000, 0.1)
      last = now
      acc += delta
      while (acc >= STEP) {
        step()
        acc -= STEP
      }
      render()
      raf = requestAnimationFrame(frame)
    }

    function start() {
      if (raf || !visible || document.hidden) return
      last = 0
      raf = requestAnimationFrame(frame)
    }

    function stop() {
      cancelAnimationFrame(raf)
      raf = 0
    }

    // ---- Pointer: drag, click-to-flip, hover tilt ----
    function local(event) {
      const rect = stage.getBoundingClientRect()
      return { x: event.clientX - rect.left, y: event.clientY - rect.top }
    }

    function onDown(event) {
      if (event.button !== 0 || event.target.closest('a, button')) return
      event.preventDefault()
      const p = local(event)
      const ring = points[SEGMENTS]
      const bottom = points[SEGMENTS + 1]
      const ax = bottom.x - ring.x
      const ay = bottom.y - ring.y
      const len2 = ax * ax + ay * ay || 1
      drag.f = Math.min(1, Math.max(0.1, ((p.x - ring.x) * ax + (p.y - ring.y) * ay) / len2))
      const gx = ring.x + ax * drag.f
      const gy = ring.y + ay * drag.f
      Object.assign(drag, { active: true, id: event.pointerId, ox: p.x - gx, oy: p.y - gy, tx: gx, ty: gy })
      Object.assign(drag, { sx: event.clientX, sy: event.clientY, moved: false, at: performance.now() })
      badge.setPointerCapture(event.pointerId)
      badge.classList.add('is-dragging')
      resetTilt()
    }

    function onMove(event) {
      if (drag.active && event.pointerId === drag.id) {
        const p = local(event)
        drag.tx = Math.min(bounds.max, Math.max(bounds.min, p.x - drag.ox))
        drag.ty = p.y - drag.oy
        if (Math.hypot(event.clientX - drag.sx, event.clientY - drag.sy) > CLICK_SLOP) drag.moved = true
        return
      }
      if (!canHover) return
      const rect = tilt.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      tilt.style.setProperty('--rx', `${((0.5 - y) * 14).toFixed(2)}deg`)
      tilt.style.setProperty('--ry', `${((x - 0.5) * 16).toFixed(2)}deg`)
      tilt.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
      tilt.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
    }

    function onUp(event) {
      if (!drag.active || event.pointerId !== drag.id) return
      drag.active = false
      lastInteraction = time
      badge.classList.remove('is-dragging')
      if (badge.hasPointerCapture(event.pointerId)) badge.releasePointerCapture(event.pointerId)
      const quick = performance.now() - drag.at < 450
      if (event.type === 'pointerup' && !drag.moved && quick) setFlipped((value) => !value)
    }

    function resetTilt() {
      tilt.style.setProperty('--rx', '0deg')
      tilt.style.setProperty('--ry', '0deg')
      tilt.style.setProperty('--mx', '50%')
      tilt.style.setProperty('--my', '30%')
    }

    const onVisibility = () => (document.hidden ? stop() : start())
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    // Coalesce resize bursts (e.g. several fonts swapping in) into one layout per frame.
    let pending = 0
    const scheduleLayout = () => {
      if (!pending) pending = requestAnimationFrame(() => ((pending = 0), layout()))
    }
    const onMedia = () => {
      readCss()
      layout(true)
    }
    const ro = new ResizeObserver(scheduleLayout)

    layout(true)
    io.observe(stage)
    ro.observe(stage.closest('section') ?? stage)
    wide.addEventListener('change', onMedia)
    document.addEventListener('visibilitychange', onVisibility)
    badge.addEventListener('pointerdown', onDown)
    badge.addEventListener('pointermove', onMove)
    badge.addEventListener('pointerup', onUp)
    badge.addEventListener('pointercancel', onUp)
    badge.addEventListener('pointerleave', resetTilt)
    stage.dataset.physics = 'on'
    start()

    return () => {
      stop()
      cancelAnimationFrame(pending)
      io.disconnect()
      ro.disconnect()
      wide.removeEventListener('change', onMedia)
      document.removeEventListener('visibilitychange', onVisibility)
      badge.removeEventListener('pointerdown', onDown)
      badge.removeEventListener('pointermove', onMove)
      badge.removeEventListener('pointerup', onUp)
      badge.removeEventListener('pointercancel', onUp)
      badge.removeEventListener('pointerleave', resetTilt)
    }
  }, [])

  return (
    <div className="lanyard" ref={stageRef}>
      <svg className="lanyard__svg" aria-hidden="true" focusable="false">
        <defs>
          {/* userSpaceOnUse: a near-vertical path has a zero-width bounding box */}
          <linearGradient id="strap-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="-500" x2="0" y2="120">
            <stop offset="0%" style={{ stopColor: 'var(--violet)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--pink)' }} />
          </linearGradient>
        </defs>
        <path ref={pathRef} className="lanyard__strap" />
        <path className="lanyard__stitch" />
      </svg>
      <div className="badge" ref={badgeRef} role="group" aria-label="ID badge — drag to swing, click to flip">
        <span className="badge__ring" aria-hidden="true" />
        <span className="badge__clip" aria-hidden="true" />
        <div className="badge__tilt" ref={tiltRef}>
          <BadgeCard {...props} flipped={flipped} onFlip={() => setFlipped((value) => !value)} />
        </div>
      </div>
    </div>
  )
}
