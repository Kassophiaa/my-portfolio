import { useEffect, useRef } from 'react'
import Icon from './Icon.jsx'
import { certImage } from '../lib/certificates.js'

// Full-size view of one certificate (picture only; ← → keys flip through the rest).
// Native <dialog>: focus is trapped, Escape closes, and focus returns to the card.
export default function CertificateViewer({ items, index, onChange, onClose }) {
  const ref = useRef(null)
  const item = index === null ? null : items[index]

  useEffect(() => {
    const dialog = ref.current
    if (item && !dialog.open) dialog.showModal()
    if (!item && dialog.open) dialog.close()
  }, [item])

  const go = (step) => onChange((index + step + items.length) % items.length)

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') go(1)
    if (event.key === 'ArrowLeft') go(-1)
  }

  return (
    <dialog
      ref={ref}
      className="cert-viewer"
      aria-labelledby="cert-viewer-title"
      onClose={onClose}
      onKeyDown={item ? onKeyDown : undefined}
      onClick={(event) => event.target === ref.current && onClose()}
    >
      {item && (
        <div className="cert-viewer__inner">
          <button type="button" className="icon-button cert-viewer__close" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>

          <figure className="cert-viewer__figure">
            <img
              key={item.slug}
              src={certImage(item, 'full')}
              alt={`Certificate: ${item.name}, ${item.issuer}, ${item.date}`}
              width="1600"
              height="1100"
            />
          </figure>

          {/* Just the certificate on screen; the title stays for screen readers */}
          <h3 id="cert-viewer-title" className="visually-hidden">
            {item.name}, {item.issuer}, {item.date}
          </h3>
        </div>
      )}
    </dialog>
  )
}
