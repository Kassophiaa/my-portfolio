import { useState } from 'react'
import Icon from './Icon.jsx'

// Shown while profile data still contains sample text (SAMPLE_CONTENT in src/data/profile.js),
// so the site is never mistaken for finished, real information.
export default function SampleNotice() {
  const [open, setOpen] = useState(true)
  if (!open) return null

  return (
    <aside className="sample-notice" aria-label="Sample content notice">
      <span className="sample-notice__dot" aria-hidden="true" />
      <p>
        <strong>Sample content.</strong>
        <span className="sample-notice__more"> Names, projects, and details are placeholders.</span>
      </p>
      <button
        type="button"
        className="sample-notice__close"
        onClick={() => setOpen(false)}
        aria-label="Dismiss sample content notice"
      >
        <Icon name="close" size={14} />
      </button>
    </aside>
  )
}
