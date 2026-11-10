import type { Metadata } from "next";
import { CtaSection } from "@/components/content/CtaSection";
import { ProjectCard } from "@/components/content/ProjectCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredProjects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Restaurant & Hospitality Digital Marketing",
  description: "Restaurant digital marketing, restaurant website development, local visibility, hospitality branding, content, and connected marketing systems.",
  path: "/hospitality",
});

const hospitalitySupports = [
  { title: "Be easier to find", description: "Plan local SEO and key business information so people searching nearby can discover the right details." },
  { title: "Show the experience", description: "Present menus, services, atmosphere, and practical visit information clearly across digital touchpoints." },
  { title: "Make the next step clear", description: "Help visitors find direct inquiry, reservation, or booking routes without promising a particular booking volume." },
  { title: "Build a recognizable brand", description: "Bring your identity, voice, and visual choices together across web, social, and in-person materials." },
  { title: "Plan customer acquisition", description: "Connect audience, search, content, and campaign choices to your business priorities." },
  { title: "Keep the presence cohesive", description: "Coordinate your website, local listings, social content, and marketing systems around a shared direction." },
];

const hospitalityServices = [
  "Website development",
  "Local SEO",
  "Brand identity",
  "Social media content",
  "Customer acquisition planning",
  "Digital marketing systems",
];

export default function HospitalityPage() {
  return (
    <main>
      <section className="service-detail-hero hospitality-hero">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Hospitality" }]} />
          <div className="hospitality-hero__content">
            <span className="eyebrow">For restaurants, cafes, and hospitality</span>
            <h1>Turn attention into a more connected guest experience.</h1>
            <p>Trio Digitals brings strategy, digital systems, and creative together to help hospitality businesses make discovery, decision-making, and the next visit feel connected.</p>
            <Button href="#hospitality-support" variant="secondary">Explore hospitality support</Button>
          </div>
        </Container>
      </section>

      <section className="section" id="hospitality-support" aria-labelledby="hospitality-support-title">
        <Container>
          <SectionHeading id="hospitality-support-title" eyebrow="Hospitality, connected" title="Make every digital touchpoint more useful." description="From first discovery through to an inquiry or booking, each piece can support a clearer experience. The work is tailored to your operations and priorities; no business result is guaranteed." />
          <div className="hospitality-benefit-grid">
            {hospitalitySupports.map((item, index) => (
              <article className="hospitality-benefit" key={item.title}>
                <span className="hospitality-benefit__index">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--soft" aria-labelledby="hospitality-services-title">
        <Container className="hospitality-services-layout">
          <div>
            <span className="eyebrow">Ways we can help</span>
            <h2 id="hospitality-services-title">Practical support for hospitality teams.</h2>
          </div>
          <ul className="hospitality-services hospitality-services--page">
            {hospitalityServices.map((service) => <li key={service}>{service}</li>)}
          </ul>
        </Container>
      </section>

      <section className="section" aria-labelledby="hospitality-concepts-title">
        <Container>
          <SectionHeading id="hospitality-concepts-title" eyebrow="Visual direction" title="Hospitality concept imagery." description="These supplied restaurant and hotel images help set a visual direction. They are illustrative concepts, not Trio Digitals client projects or results." />
          <div className="project-grid">
            {featuredProjects.map((project) => <ProjectCard key={project.title} {...project} />)}
          </div>
          <p className="home-placeholder-caption">Confirm photo usage rights and any visible third-party branding before publication.</p>
        </Container>
      </section>

      <CtaSection
        eyebrow="Let's talk hospitality"
        title="Make your next guest journey easier to find and follow."
        description="Share what you are working on, and we can discuss a thoughtful next step for your restaurant or hospitality business."
        href="/#contact"
        actionLabel="Let's Talk About Your Restaurant"
      />
    </main>
  );
}
