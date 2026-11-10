import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  examples?: string[];
  href?: string;
  linkLabel?: string;
};

export function ServiceCard({ icon: Icon, title, description, examples, href, linkLabel = "Explore this capability" }: ServiceCardProps) {
  return (
    <article className="service-card">
      <span className="service-card__icon"><Icon aria-hidden="true" size={22} strokeWidth={1.7} /></span>
      <h3>{title}</h3>
      <p>{description}</p>
      {examples && <ul className="service-card__examples">{examples.map((example) => <li key={example}>{example}</li>)}</ul>}
      {href && <Link className="service-card__link" href={href}>{linkLabel}<ArrowUpRight aria-hidden="true" size={15} /></Link>}
    </article>
  );
}
