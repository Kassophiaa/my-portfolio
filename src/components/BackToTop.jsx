import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'
import './BackToTop.css'

// Floating "back to top" button, shown once the hero is mostly out of view.
// The ring around it fills with scroll progress (--scroll from useScrollProgress).
export default function BackToTop() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      className={`to-top${shown ? ' is-shown' : ''}`}
      href="#top"
      aria-label="Back to top"
      title="Back to top"
    >
      <svg className="to-top__ring" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <circle cx="24" cy="24" r="22" pathLength="100" />
        <circle className="to-top__fill" cx="24" cy="24" r="22" pathLength="100" />
      </svg>
      <Icon name="arrow" size={18} className="to-top__icon" />
    </a>
  )
}
