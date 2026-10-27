import { useEffect } from 'react'

// Adds `is-visible` to every [data-reveal] element as it scrolls into view, and
// `is-inview` to each page section (draws its divider line). [data-stagger]
// elements also number their children (--i) so they can animate in one by one.
// CSS keeps content visible when motion is reduced or this never runs.
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement
    const items = document.querySelectorAll('[data-reveal], main > .section')
    if (!('IntersectionObserver' in window)) return

    root.classList.add('reveal-ready')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target
          if (el.hasAttribute('data-stagger')) {
            Array.from(el.children).forEach((child, i) => child.style.setProperty('--i', i))
          }
          el.classList.add(el.hasAttribute('data-reveal') ? 'is-visible' : 'is-inview')
          observer.unobserve(el)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
}
