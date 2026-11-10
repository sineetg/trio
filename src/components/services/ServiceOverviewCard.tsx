import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ServicePillar } from "@/lib/services";

type ServiceOverviewCardProps = { service: ServicePillar; index: number };

export function ServiceOverviewCard({ service, index }: ServiceOverviewCardProps) {
  return (
    <article className="service-overview-card" id={service.slug}>
      <div className="service-overview-card__top">
        <span className="service-overview-card__index">0{index + 1}</span>
        <span className="eyebrow">{service.shortTitle}</span>
      </div>
      <h2>{service.title}</h2>
      <p className="service-overview-card__description">{service.description}</p>
      <div className="service-overview-card__details">
        <div>
          <h3>The challenge</h3>
          <p>{service.problem}</p>
        </div>
        <div>
          <h3>Key offerings</h3>
          <ul className="compact-list">{service.offerings.map((offering) => <li key={offering}>{offering}</li>)}</ul>
        </div>
        <div>
          <h3>Typical deliverables</h3>
          <ul className="compact-list">{service.deliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}</ul>
        </div>
        <p className="service-overview-card__portfolio">No verified service-specific case studies are available yet.</p>
      </div>
      <Link className="service-card__link" href={`/services/${service.slug}`}>Explore {service.shortTitle}<ArrowUpRight aria-hidden="true" size={15} /></Link>
    </article>
  );
}
