import { isMissing } from '../lib/content.js'

// Renders a content value, or a clearly marked placeholder when it is missing.
export default function Field({ value, label }) {
  if (!isMissing(value)) return value
  const text = value?.label ?? label ?? 'Not added yet'
  return (
    <span className="todo" title="Placeholder — update in src/data">
      <span className="todo__tag" aria-hidden="true">TODO</span>
      {text}
    </span>
  )
}
