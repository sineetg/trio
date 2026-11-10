import type { Metadata } from "next";
import Image from "next/image";
import { Blocks, Compass, Sparkles } from "lucide-react";
import { CtaSection } from "@/components/content/CtaSection";
import { ProjectCard } from "@/components/content/ProjectCard";
import { ServiceCard } from "@/components/content/ServiceCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredProjects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Trio Digitals | Digital Marketing & Brand Growth",
  description: "Trio Digitals brings marketing strategy, website development, conversion optimization, and brand identity together for restaurants, hospitality, and growing businesses.",
  path: "/",
});

const capabilities = [
  {
    icon: Compass,
    title: "Strategy & Growth",
    description: "A clear direction connects your business goals to the people you want to reach.",
    examples: ["Marketing strategy", "Audience and offer planning", "Customer acquisition"],
  },
  {
    icon: Blocks,
    title: "Digital Systems & Conversion",
    description: "Useful digital foundations make it easier for the right people to take their next step.",
    examples: ["Website development", "Conversion journeys", "Marketing systems"],
  },
  {
    icon: Sparkles,
    title: "Creative & Brand",
    description: "Distinctive brand expression helps businesses communicate with clarity and consistency.",
    examples: ["Brand identity", "Content direction", "Social media creative"],
  },
];

const hospitalityServices = [
  "Website development",
  "Local SEO",
  "Branding",
  "Social media content",
  "Customer acquisition",
  "Digital marketing systems",
];

const hospitalityImages = [
  { src: "/images/restaurant-concept-02.jpg", alt: "A plated dish photographed close-up on a restaurant plate.", label: "Concept / dining" },
  { src: "/images/restaurant-concept-03.jpg", alt: "A restaurant table set for a multi-course meal.", label: "Concept / restaurant" },
  { src: "/images/cafe-concept-01.jpg", alt: "Coffee and pastry arranged on a cafe counter.", label: "Concept / cafe" },
  { src: "/images/resort-concept-01.jpg", alt: "A resort property beside a pool and palm trees.", label: "Concept / stay" },
];

const approach = [
  { number: "01", title: "Discover", description: "Understand your goals, customers, and the opportunities in front of you." },
  { number: "02", title: "Strategize", description: "Set a clear direction and decide what will make the greatest difference." },
  { number: "03", title: "Build", description: "Bring the plan to life across your brand, content, and digital touchpoints." },
  { number: "04", title: "Optimize", description: "Review what is working and refine the next steps around your goals." },
];

export default function HomePage() {
  return (
    <main>
      <section className="home-hero" id="top">
        <Container className="home-hero__grid">
          <div className="home-hero__copy">
            <span className="eyebrow">Integrated digital growth</span>
            <h1 className="home-hero__title">
              <span>Strategy.</span>
              <span>Systems.</span>
              <span className="home-hero__accent">Creativity.</span>
              <span className="home-hero__last">Built for Growth.</span>
            </h1>
            <p className="home-hero__support">We help ambitious businesses build stronger brands, attract the right audience, and turn digital attention into measurable business growth.</p>
            <div className="button-row home-hero__actions">
              <Button href="#contact">Let&apos;s Talk About Your Growth</Button>
              <Button href="/work" variant="secondary">Explore Our Work</Button>
            </div>
          </div>
          <div className="home-hero__visual" aria-hidden="true">
            <span className="home-hero__orbit home-hero__orbit--outer" aria-hidden="true" />
            <span className="home-hero__orbit home-hero__orbit--inner" aria-hidden="true" />
            <span className="home-hero__spark home-hero__spark--pink" aria-hidden="true" />
            <span className="home-hero__spark home-hero__spark--orange" aria-hidden="true" />
            <Image className="home-hero__logo" src="/trio-digitals-logo.png" alt="Trio Digitals" width={420} height={420} priority sizes="(max-width: 800px) 70vw, 32vw" />
            <span className="home-hero__caption">Strategy / Systems / Creativity</span>
          </div>
        </Container>
      </section>

      <section className="home-intro section" aria-labelledby="intro-title">
        <Container>
          <span className="eyebrow">One connected approach</span>
          <div className="home-intro__grid">
            <h2 id="intro-title" className="home-intro__title">Growth doesn&apos;t happen <em>in isolation.</em></h2>
            <div className="home-intro__copy">
              <p>Marketing works harder when every part works together. Trio Digitals brings marketing strategy, digital infrastructure, and creative execution into one connected approach.</p>
              <p>From the first impression to the next customer action, we help businesses build a stronger foundation for growth.</p>
              <Button href="#services" variant="secondary">See how we work</Button>
            </div>
          </div>
          <div className="home-intro__ribbon" aria-label="Our connected disciplines">
            <span>Strategy</span><i aria-hidden="true" /><span>Digital systems</span><i aria-hidden="true" /><span>Creative</span>
          </div>
        </Container>
      </section>

      <section className="section section--soft" id="services" aria-labelledby="capabilities-title">
        <Container>
          <SectionHeading id="capabilities-title" eyebrow="What we bring together" title="Three capabilities. One direction." description="Choose the combination your business needs. Each discipline supports the others, from a clear plan through to the customer experience." />
          <div className="service-grid home-service-grid">
            {capabilities.map((capability) => <ServiceCard key={capability.title} {...capability} href="#approach" linkLabel="See our approach" />)}
          </div>
        </Container>
      </section>

      <section className="hospitality-section section" id="hospitality" aria-labelledby="hospitality-title">
        <Container className="hospitality-section__grid">
          <div className="hospitality-section__media-wrap">
            <div className="hospitality-gallery">
              {hospitalityImages.map((image) => (
                <figure className="hospitality-gallery__item" key={image.src}>
                  <Image src={image.src} alt={image.alt} fill sizes="(max-width: 560px) 44vw, (max-width: 800px) 40vw, 23vw" />
                  <figcaption>{image.label}</figcaption>
                </figure>
              ))}
            </div>
            <div className="hospitality-section__badge"><span>Built for</span><strong>real-world experiences</strong></div>
          </div>
          <div className="hospitality-section__content">
            <span className="eyebrow">Hospitality focus</span>
            <h2 id="hospitality-title">Helping hospitality brands turn attention into loyal customers.</h2>
            <p>For restaurants and hospitality businesses, every digital touchpoint can help turn local discovery into a visit and a visit into a lasting relationship. We bring these essentials together while remaining open to ambitious businesses across industries.</p>
            <ul className="hospitality-services">
              {hospitalityServices.map((service) => <li key={service}>{service}</li>)}
            </ul>
            <p className="hospitality-image-note">Supplied concept imagery for visual direction only; these are not Trio client case studies. Confirm photo rights and visible third-party marks before publication.</p>
            <Button href="#contact" variant="secondary">Talk hospitality with us</Button>
          </div>
        </Container>
      </section>

      <section className="section section--soft" id="work" aria-labelledby="work-title">
        <Container>
          <SectionHeading id="work-title" eyebrow="Concept imagery" title="Hospitality ideas take many forms." description="These supplied images show visual directions only. They are not case studies or evidence of completed client work." />
          <div className="project-grid home-project-grid">
            {featuredProjects.map((project, index) => <ProjectCard key={`${project.title}-${index}`} {...project} />)}
          </div>
          <p className="home-placeholder-caption">Replace these concept image cards with genuine projects and approved case-study details when available.</p>
        </Container>
      </section>

      <section className="section home-approach" id="approach" aria-labelledby="approach-title">
        <Container>
          <SectionHeading id="approach-title" eyebrow="Our approach" title="From the first question to what comes next." description="A considered process keeps the work focused, collaborative, and connected to the outcomes that matter to your business." />
          <ol className="approach-track">
            {approach.map((step) => (
              <li className="approach-step" key={step.number}>
                <span className="approach-step__number">{step.number}</span>
                <span className="approach-step__marker" aria-hidden="true" />
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section section--soft" id="about" aria-labelledby="trust-title">
        <Container>
          <SectionHeading id="trust-title" eyebrow="Built on how we work" title="Clear thinking. Connected execution." description="As a new agency, we will earn trust through the quality of the process, the care in the work, and clear communication at each stage." />
          <div className="trust-grid">
            <article><span>01 / Shared direction</span><h3>Start with your goals.</h3><p>We align on what growth means for your business before deciding what to make or launch.</p></article>
            <article><span>02 / Joined-up thinking</span><h3>Connect every touchpoint.</h3><p>Strategy, digital systems, and creative are planned together so the experience feels consistent.</p></article>
            <article><span>03 / Open collaboration</span><h3>Keep the work clear.</h3><p>We make the plan, decisions, and next steps visible as the work moves forward.</p></article>
          </div>
          <p className="placeholder-note home-proof-note"><strong>Proof to add when available:</strong> founder biographies, verified project work, approved testimonials, and any relevant certifications.</p>
        </Container>
      </section>

      <CtaSection
        id="contact"
        eyebrow="Your next move"
        title="Your next stage of growth starts with a conversation."
        description="Tell us what you are working toward, and we can start with a clear conversation about your goals."
        href="/contact"
        actionLabel="Start a Project"
      />
    </main>
  );
}
