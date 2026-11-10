import type { Metadata } from "next";
import { CtaSection } from "@/components/content/CtaSection";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { getProjectListings } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Hospitality Portfolio & Project Concepts", description: "Explore visual concepts and approved project stories from Trio Digitals across hospitality, strategy, digital systems, and creative work.", path: "/work" });

export default function WorkPage() {
  return (
    <main>
      <section className="work-page-hero">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Work" }]} />
          <div className="work-page-hero__content">
            <span className="eyebrow">Portfolio / concepts</span>
            <h1>Ideas made visible.</h1>
            <p>Browse current concept examples and future approved project stories. The concepts here use supplied hospitality imagery only and do not represent client work or results.</p>
          </div>
        </Container>
      </section>

      <section className="section" aria-label="Portfolio projects">
        <Container>
          <PortfolioGallery projects={getProjectListings()} />
        </Container>
      </section>

      <CtaSection
        eyebrow="Your project"
        title="Good work starts with a useful conversation."
        description="Share the challenge, idea, or opportunity you are considering. We can discuss a suitable next step."
        href="/#contact"
        actionLabel="Let's Talk About Your Growth"
      />
    </main>
  );
}
