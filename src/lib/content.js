// Marks a piece of personal content the owner still needs to provide.
// Components render these as visible "missing" placeholders instead of fake data.
export const todo = (label) => ({ todo: true, label })

export const isMissing = (value) =>
  value == null || value === '' || (typeof value === 'object' && value.todo === true)

export const textOf = (value, fallback = '') => (isMissing(value) ? fallback : value)
