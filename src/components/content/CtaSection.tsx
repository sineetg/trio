import { Button } from "@/components/ui/Button";

type CtaSectionProps = { eyebrow: string; title: string; description: string; href: string; actionLabel: string; id?: string; contactNote?: string };

export function CtaSection({ eyebrow, title, description, href, actionLabel, id, contactNote }: CtaSectionProps) {
  return (
    <section className="section" id={id} aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-panel">
          <div><span className="eyebrow">{eyebrow}</span><h2 id="cta-title">{title}</h2><p>{description}</p></div>
          <div className="cta-panel__action"><Button href={href} variant="light">{actionLabel}</Button></div>
        </div>
        {contactNote && <p id="contact-details" tabIndex={-1} className="cta-contact-note">{contactNote}</p>}
      </div>
    </section>
  );
}
