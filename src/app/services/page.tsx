import type { Metadata } from "next";
import Link from "next/link";
import { CtaSection } from "@/components/content/CtaSection";
import { ServiceOverviewCard } from "@/components/services/ServiceOverviewCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { servicePillars } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Digital Marketing, Web & Branding Services",
  description: "Explore marketing strategy, business website development, conversion optimization, creative, and brand identity services from Trio Digitals.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main>
      <section className="service-detail-hero services-overview-hero">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
          <div className="services-overview-hero__content">
            <span className="eyebrow">Connected services</span>
            <h1>Three capabilities. One connected direction.</h1>
            <p>Bring together marketing strategy, digital infrastructure, and creative execution around the needs of your business.</p>
            <Link className="text-link" href="#service-pillars">Explore the service pillars</Link>
          </div>
        </Container>
      </section>

      <section className="section" id="service-pillars" aria-label="Our service pillars">
        <Container className="service-overview-list">
          {servicePillars.map((service, index) => <ServiceOverviewCard key={service.slug} service={service} index={index} />)}
        </Container>
      </section>

      <CtaSection
        eyebrow="Find your starting point"
        title="Not sure which piece to start with?"
        description="Share what your business is working toward. We can talk through the priorities and where an integrated approach may help."
        href="/#contact"
        actionLabel="Let's Talk About Your Growth"
      />
    </main>
  );
}
