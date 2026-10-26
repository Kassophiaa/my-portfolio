export default function SectionHeading({ index, label, title, id, children }) {
  return (
    <header className="section-head" data-reveal>
      <p className="eyebrow">
        <span className="eyebrow__num">{String(index).padStart(2, '0')}</span>
        {label}
      </p>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {children && <p className="section-lede">{children}</p>}
    </header>
  )
}
