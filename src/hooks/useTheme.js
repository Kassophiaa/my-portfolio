import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'portfolio-theme'

function readStored() {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function systemTheme() {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

// The initial theme is applied by an inline script in index.html to avoid a flash;
// this hook keeps React, <html data-theme>, and localStorage in sync afterwards.
export function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || readStored() || systemTheme(),
  )

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.style.colorScheme = theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0d0818' : '#f6f2fc')
  }, [theme])

  // Follow the OS setting until the visitor makes an explicit choice.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => {
      if (!readStored()) setTheme(media.matches ? 'light' : 'dark')
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Storage unavailable (private mode) — theme still switches for this visit.
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
