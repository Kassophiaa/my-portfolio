import { useEffect } from 'react'

// Writes how far the page has been scrolled (0–1) to --scroll on <html>, once per
// frame. CSS reads it for the header progress bar and the back-to-top ring.
export function useScrollProgress() {
  useEffect(() => {
    const root = document.documentElement
    let frame = 0
    const update = () => {
      frame = 0
      const max = root.scrollHeight - window.innerHeight
      root.style.setProperty('--scroll', max > 0 ? Math.min(window.scrollY / max, 1).toFixed(4) : '0')
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
  }, [])
}
