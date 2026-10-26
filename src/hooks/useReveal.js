import { useEffect } from 'react'

// Adds `is-visible` to every [data-reveal] element as it scrolls into view.
// CSS keeps content visible when motion is reduced or this never runs.
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement
    const items = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) return

    root.classList.add('reveal-ready')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
}
