import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import './Header.css'

export default function Header({ sections, active, theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [indicator, setIndicator] = useState(null)
  const listRef = useRef(null)
  const menuButtonRef = useRef(null)
  const panelRef = useRef(null)

  const close = useCallback((restoreFocus = false) => {
    setOpen(false)
    if (restoreFocus) menuButtonRef.current?.focus()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Position the sliding pill under the active desktop link.
  useLayoutEffect(() => {
    const measure = () => {
      const link = listRef.current?.querySelector(`[data-id="${active}"]`)
      setIndicator(link ? { left: link.offsetLeft, width: link.offsetWidth } : null)
    }
    measure()
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [active])

  // Mobile menu: Escape closes, focus moves into the panel, page stops scrolling.
  useEffect(() => {
    if (!open) return
    const onKey = (event) => {
      if (event.key === 'Escape') close(true)
    }
    const desktop = window.matchMedia('(min-width: 860px)')
    const onResize = () => desktop.matches && close()
    document.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    document.documentElement.classList.add('menu-open')
    panelRef.current?.querySelector('a')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
      document.documentElement.classList.remove('menu-open')
    }
  }, [open, close])

  const nextTheme = theme === 'dark' ? 'light' : 'dark'
  const current = sections.find((section) => section.id === active)

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="site-header__bar container">
        <a className="brand" href="#top" onClick={() => close()} title="Back to top">
          <span className="brand__text">kassy</span>
          {/* Phones: the collapsed nav can't show where you are, so the path does */}
          {current && (
            <span key={current.id} className="brand__section" aria-hidden="true">
              <span className="brand__sep">/</span>
              {current.id}
            </span>
          )}
        </a>

        <nav className="nav" aria-label="Primary">
          {indicator && (
            <span
              className="nav__indicator"
              aria-hidden="true"
              style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
            />
          )}
          <ul className="nav__list" ref={listRef}>
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  data-id={section.id}
                  className={`nav__link${active === section.id ? ' is-active' : ''}`}
                  aria-current={active === section.id ? 'location' : undefined}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <button
            type="button"
            className="icon-button theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${nextTheme} theme`}
            title={`Switch to ${nextTheme} theme`}
          >
            <span className="theme-toggle__icon" data-theme-icon={theme}>
              <Icon name="moon" />
              <Icon name="sun" />
            </span>
          </button>
          <button
            ref={menuButtonRef}
            type="button"
            className="icon-button menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      <span className="site-header__progress" aria-hidden="true" />

      <div
        id="mobile-menu"
        className="mobile-menu"
        ref={panelRef}
        hidden={!open}
        onClick={(event) => event.target === event.currentTarget && close()}
      >
        <nav className="mobile-menu__panel container" aria-label="Mobile">
          <ol className="mobile-menu__list">
            {sections.map((section, index) => (
              <li key={section.id} style={{ '--i': index }}>
                <a
                  href={`#${section.id}`}
                  className={active === section.id ? 'is-active' : undefined}
                  aria-current={active === section.id ? 'location' : undefined}
                  onClick={() => close()}
                >
                  <span className="mobile-menu__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {section.label}
                  <Icon name="arrow" className="mobile-menu__arrow" />
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </header>
  )
}
