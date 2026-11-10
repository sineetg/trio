import type { Metadata } from "next";
import Image from "next/image";
import { CtaSection } from "@/components/content/CtaSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { agencyValues, founders, workingStages } from "@/lib/founders";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "About", description: "Learn about Trio Digitals, a three-partner agency connecting strategy, digital systems, and creative work for business growth.", path: "/about" });

export default function AboutPage() {
  return (
    <main>
      <section className="about-hero">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <div className="about-hero__copy">
            <span className="eyebrow">About Trio Digitals</span>
            <h1>Three Perspectives. One Vision for Growth.</h1>
            <p>Trio Digitals brings strategy, digital systems, and creative execution together to help businesses build a clearer, more connected digital presence.</p>
          </div>
        </Container>
      </section>

      <section className="section" aria-labelledby="about-story-title">
        <Container className="about-story">
          <div>
            <span className="eyebrow">Our story</span>
            <h2 id="about-story-title">A three-partner agency, built around connected work.</h2>
          </div>
          <div className="about-story__copy">
            <p>Trio Digitals was founded by three partners with a shared aim: bring the thinking, tools, and creative work behind digital growth into one connected relationship.</p>
            <p>We work across industries, with a particular focus on the needs of hospitality businesses. The work starts by understanding the business and its customers, then shaping a practical path across strategy, systems, and creative.</p>
          </div>
        </Container>
      </section>

      <section className="section section--soft" aria-labelledby="about-philosophy-title">
        <Container className="about-philosophy">
          <span className="eyebrow">Our philosophy</span>
          <h2 id="about-philosophy-title">Growth is stronger when the pieces work together.</h2>
          <div className="about-pillars">
            <article><span>01 / Strategy</span><h3>Choose a clear direction.</h3><p>Understand the audience, the opportunity, and the priorities that can guide marketing decisions.</p></article>
            <article><span>02 / Systems</span><h3>Make the next step easier.</h3><p>Connect useful digital experiences and tools so people can move from discovery toward action.</p></article>
            <article><span>03 / Creativity</span><h3>Make the brand recognizable.</h3><p>Use thoughtful identity, content, and campaigns to communicate what makes a business distinct.</p></article>
          </div>
        </Container>
      </section>

      <section className="section" aria-labelledby="about-process-title">
        <Container>
          <div className="section-heading">
            <div><span className="eyebrow">How we work</span><h2 id="about-process-title">A considered path from first questions to ongoing improvement.</h2></div>
            <p>Each engagement is scoped around the business need. These four stages provide a shared working rhythm, with the details agreed together.</p>
          </div>
          <ol className="about-process">
            {workingStages.map((stage, index) => <li key={stage.title}><span className="about-process__index">0{index + 1}</span><div><h3>{stage.title}</h3><p>{stage.description}</p></div></li>)}
          </ol>
        </Container>
      </section>

      <section className="section section--soft" aria-labelledby="founders-title">
        <Container>
          <div className="section-heading">
            <div><span className="eyebrow">The people behind Trio</span><h2 id="founders-title">Three perspectives, one team.</h2></div>
            <p>Founder profiles are intentionally left as editable placeholders until names, portraits, biographies, and expertise are approved.</p>
          </div>
          <div className="founder-grid">
            {founders.map((founder) => (
              <article className="founder-card" key={founder.name}>
                <div className="founder-card__portrait" aria-label={founder.portrait ? undefined : "Founder portrait placeholder"}>
                  {founder.portrait ? <Image src={founder.portrait} alt={`Portrait of ${founder.name}`} fill sizes="(max-width: 560px) 100vw, (max-width: 800px) 50vw, 30vw" /> : <span className="founder-card__portrait-note">Founder portrait<br />to be supplied</span>}
                </div>
                <div className="founder-card__body">
                  <span className="eyebrow">Profile pending</span>
                  <h3>{founder.name}</h3>
                  <p className="founder-card__role">{founder.role}</p>
                  <p>{founder.biography}</p>
                  <h4>Expertise</h4>
                  <ul>{founder.expertise.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                  {founder.socialLinks.length > 0 && <ul className="founder-card__socials">{founder.socialLinks.map((social) => <li key={social.label}><a href={social.href} target="_blank" rel="noreferrer">{social.label}<span className="sr-only"> (opens in a new tab)</span></a></li>)}</ul>}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section" aria-labelledby="about-values-title">
        <Container>
          <div className="section-heading"><div><span className="eyebrow">What guides us</span><h2 id="about-values-title">Useful principles for the work.</h2></div></div>
          <div className="about-values">
            {agencyValues.map((value, index) => <article key={value.title}><span>0{index + 1}</span><h3>{value.title}</h3><p>{value.description}</p></article>)}
          </div>
        </Container>
      </section>

      <CtaSection eyebrow="Start a conversation" title="Tell us what growth looks like for your business." description="Share the challenge or opportunity you are thinking about, and we can explore a useful next step." href="/contact" actionLabel="Talk with Trio Digitals" />
    </main>
  );
}
