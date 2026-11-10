type SectionHeadingProps = { eyebrow: string; title: string; description?: string; id?: string };

export function SectionHeading({ eyebrow, title, description, id }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div><span className="eyebrow">{eyebrow}</span><h2 id={id}>{title}</h2></div>
      {description && <p>{description}</p>}
    </div>
  );
}
