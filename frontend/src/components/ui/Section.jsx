export default function Section({ id, eyebrow, title, subtitle, children, className = "" }) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="container">
        {(eyebrow || title) && (
          <div className="section-head">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
