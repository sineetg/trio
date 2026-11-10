import { CtaSection } from "@/components/content/CtaSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import type { ServicePillar } from "@/lib/services";

type ServiceDetailPageProps = { service: ServicePillar };

export function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  return (
    <main>
      <section className="service-detail-hero">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]} />
          <div className="service-detail-hero__content">
            <span className="eyebrow">Service pillar</span>
            <h1>{service.title}</h1>
            <p>{service.description}</p>
            <Button href="#service-offerings" variant="secondary">Explore what&apos;s included</Button>
          </div>
        </Container>
      </section>

      <section className="section" aria-labelledby="service-problem-title">
        <Container>
          <div className="service-problem">
            <span className="eyebrow">The business problem</span>
            <h2 id="service-problem-title">Start with what is getting in the way.</h2>
            <p>{service.problem}</p>
          </div>
          <div className="service-detail-grid">
            <div className="service-detail-list" id="service-offerings">
              <span className="eyebrow">What we can help with</span>
              <h2>Services and support</h2>
              <ul className="service-offerings-list">{service.offerings.map((offering) => <li key={offering}>{offering}</li>)}</ul>
            </div>
            <div className="service-deliverables">
              <span className="eyebrow">A useful output</span>
              <h2>Typical deliverables</h2>
              <p>The exact scope is shaped around your goals, current setup, and priorities.</p>
              <ul className="compact-list">{service.deliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}</ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section--soft" aria-labelledby="service-examples-title">
        <Container>
          <div className="service-examples">
            <span className="eyebrow">Relevant examples</span>
            <h2 id="service-examples-title">No verified case studies to show yet.</h2>
            <p>We will add service-specific examples when approved project information is available. The service descriptions above explain capabilities and are not claims about completed client work or results.</p>
            <Button href="/services" variant="secondary">Back to all services</Button>
          </div>
        </Container>
      </section>

      <CtaSection
        eyebrow="Next step"
        title="Make the next move with a clear plan."
        description="Tell us what you are working toward, and we can discuss whether this service is a good fit."
        href="/#contact"
        actionLabel={service.cta}
      />
    </main>
  );
}
