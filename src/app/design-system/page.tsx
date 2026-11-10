import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Blocks, Compass, Sparkles } from "lucide-react";
import { CtaSection } from "@/components/content/CtaSection";
import { ProjectCard } from "@/components/content/ProjectCard";
import { ServiceCard } from "@/components/content/ServiceCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Design System Preview", description: "Internal preview of the Trio Digitals visual system and interface components.", path: "/design-system", noIndex: true });

const services = [
  { icon: Compass, title: "Strategy", description: "Positioning, planning, and clear direction for the next stage of growth." },
  { icon: Blocks, title: "Digital systems", description: "Thoughtful digital foundations that make day-to-day work easier." },
  { icon: Sparkles, title: "Creative", description: "Distinctive visual storytelling across the places your audience meets you." },
];

const colors = [
  { name: "Near-black", value: "#111111" },
  { name: "White", value: "#FFFFFF" },
  { name: "Soft neutral", value: "#F7F6F4" },
  { name: "Magenta", value: "#EC168C" },
  { name: "Orange", value: "#FF792F" },
];

export default function DesignSystemPage() {
  return (
    <main>
      <section className="hero" id="top">
        <div className="container hero__content">
          <div className="hero__mark" aria-hidden="true" />
          <div className="hero__grid">
            <div className="hero__copy">
              <span className="eyebrow">Trio Digitals / Design system</span>
              <h1 className="display">Good ideas, <em>built</em> to move.</h1>
            </div>
            <div className="hero__aside">
              <p className="body-copy">A visual foundation for an agency bringing strategy, digital systems, and creative together.</p>
              <Button href="#services">Explore the system</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="identity-title">
        <div className="container">
          <SectionHeading id="identity-title" eyebrow="01 / Brand foundations" title="A clear voice with room to express." description="The identity pairs editorial type and generous space with an energetic accent palette drawn from the supplied Trio Digitals logo." />
          <div className="swatch-grid" aria-label="Brand color palette">
            {colors.map((color) => <div className="swatch" key={color.name}><div className="swatch__color" style={{ "--swatch": color.value } as CSSProperties & { "--swatch": string }} /><div className="swatch__label">{color.name}<small>{color.value}</small></div></div>)}
          </div>
          <div className="type-sample" id="about">
            <div><span className="eyebrow">Editorial display</span><h3>Make every detail count.</h3></div>
            <div><span className="eyebrow">Readable body copy</span><p>Pair expressive headlines with calm, highly legible supporting text. Use the pink accent for emphasis and interaction, with orange as a secondary highlight.</p></div>
          </div>
          <div className="button-row" aria-label="Button variants">
            <Button href="#services">Primary action</Button>
            <Button href="#projects" variant="secondary">Secondary action</Button>
          </div>
        </div>
      </section>

      <section className="section section--soft" id="services" aria-labelledby="services-title">
        <div className="container">
          <SectionHeading id="services-title" eyebrow="02 / Capability cards" title="Three connected parts." description="Reusable service cards demonstrate a flexible system. The labels reflect the agency's stated focus areas and do not claim completed client work." />
          <div className="service-grid">
            {services.map((service) => <ServiceCard key={service.title} {...service} />)}
          </div>
        </div>
      </section>

      <section className="section" id="projects" aria-labelledby="projects-title">
        <div className="container">
          <SectionHeading id="projects-title" eyebrow="03 / Project card" title="A home for future work." description="This card preview uses clearly marked content placeholders. Add verified case studies and approved imagery when available." />
          <div className="project-grid">
            <ProjectCard title="Project title placeholder" category="Industry / services placeholder" />
            <ProjectCard title="Project title placeholder" category="Industry / services placeholder" />
          </div>
        </div>
      </section>

      <CtaSection eyebrow="04 / Contact CTA" title="Have something good in mind?" description="A clear next step belongs at the end of every important page. Add approved business contact details before launch." href="#contact-details" actionLabel="Contact placeholder" />

      <section className="section section--soft" id="contact-details" aria-labelledby="components-title">
        <div className="container">
          <SectionHeading id="components-title" eyebrow="05 / Implementation notes" title="Ready for real content." description="The system is intentionally small and built from reusable pieces that can extend across future pages." />
          <div className="placeholder-note"><strong>Launch placeholder:</strong> supply the approved inquiry email address or contact destination, verified service descriptions, and real project assets before publishing client-facing claims.</div>
          <p className="body-copy">Navigation transitions, button feedback, card hover states, and a restrained hero entrance are included. They reduce automatically when a visitor prefers reduced motion.</p>
          <Button href="#top" variant="secondary">Back to top</Button>
        </div>
      </section>
    </main>
  );
}
