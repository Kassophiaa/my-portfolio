import { useCallback, useEffect, useRef, useState } from 'react'

function legacyCopy(text) {
  const area = document.createElement('textarea')
  area.value = text
  area.setAttribute('readonly', '')
  area.style.position = 'fixed'
  area.style.opacity = '0'
  document.body.appendChild(area)
  area.select()
  const ok = document.execCommand('copy')
  area.remove()
  return ok
}

// Copies text to the clipboard; status is 'idle' | 'copied' | 'error' and resets after a moment.
export function useCopy(resetMs = 2200) {
  const [status, setStatus] = useState('idle')
  const timer = useRef()

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = useCallback(
    async (text) => {
      let ok
      try {
        await navigator.clipboard.writeText(text)
        ok = true
      } catch {
        try {
          ok = legacyCopy(text)
        } catch {
          ok = false
        }
      }
      setStatus(ok ? 'copied' : 'error')
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setStatus('idle'), resetMs)
    },
    [resetMs],
  )

  return { status, copy }
}
