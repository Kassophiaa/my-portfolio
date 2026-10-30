import { useState } from 'react'
import BadgeCard from './BadgeCard.jsx'
import { STRAP_PRINT } from './strap.js'
import './Badge.css'

// Motionless badge: shown while the physics chunk loads and for reduced-motion users.
export default function StaticLanyard(props) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="lanyard is-static">
      <span className="lanyard__strap-static" aria-hidden="true">
        <span className="lanyard__strap-print">{STRAP_PRINT}</span>
      </span>
      <div className="badge" role="group" aria-label="ID badge">
        <span className="badge__ring" aria-hidden="true" />
        <span className="badge__clip" aria-hidden="true" />
        <div className="badge__tilt">
          <BadgeCard {...props} flipped={flipped} onFlip={() => setFlipped((value) => !value)} />
        </div>
      </div>
    </div>
  )
}
