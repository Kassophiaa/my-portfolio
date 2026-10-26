import { useEffect } from 'react'

// Sets --fill (0–1) on the element as it scrolls past ~75% of the viewport height.
// With reduced motion the line is simply shown full.
export function useScrollFill(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--fill', '1')
      return
    }
    let frame = 0
    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const progress = (window.innerHeight * 0.75 - rect.top) / Math.max(rect.height, 1)
      el.style.setProperty('--fill', Math.min(1, Math.max(0, progress)).toFixed(3))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref])
}
