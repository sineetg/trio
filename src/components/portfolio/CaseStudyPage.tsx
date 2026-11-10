import Image from "next/image";
import Link from "next/link";
import { CtaSection } from "@/components/content/CtaSection";
import { WorkProjectCard } from "@/components/portfolio/WorkProjectCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { servicePillars } from "@/lib/services";
import { getRelatedProjects, type WorkProject } from "@/lib/projects";

type CaseStudyPageProps = { project: WorkProject };

export function CaseStudyPage({ project }: CaseStudyPageProps) {
  const relatedProjects = getRelatedProjects(project);
  const relatedServices = servicePillars.filter((service) => project.relatedServices.includes(service.slug));

  return (
    <main>
      <section className="case-study-hero">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: project.title }]} />
          <div className="case-study-hero__copy">
            <span className="eyebrow">{project.status}</span>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
            <div className="case-study-tags">
              <span>{project.industry}</span>
              <span>{project.projectType}</span>
              {project.categories.map((category) => <span key={category}>{category}</span>)}
            </div>
          </div>
          <div className="case-study-hero__image">
            <Image src={project.coverImage.src} alt={project.coverImage.alt} fill priority sizes="(max-width: 900px) 100vw, 90vw" />
          </div>
        </Container>
      </section>

      <section className="section" aria-labelledby="case-overview-title">
        <Container>
          <div className="case-study-overview">
            <div>
              <span className="eyebrow">Overview</span>
              <h2 id="case-overview-title">A {project.projectType} example.</h2>
            </div>
            <p>{project.summary}</p>
          </div>
          {project.projectType === "concept" && (
            <div className="case-study-placeholder" role="note">
              <strong>Development example:</strong> this page demonstrates the case-study structure. Replace placeholder context with approved project information before presenting it as completed client work.
            </div>
          )}
        </Container>
      </section>

      <section className="section section--soft" aria-label="Project process">
        <Container className="case-study-story-grid">
          <article><span className="eyebrow">Challenge</span><p>{project.challenge}</p></article>
          <article><span className="eyebrow">Research and strategy</span><p>{project.strategy}</p></article>
          <article><span className="eyebrow">Execution</span><p>{project.execution}</p></article>
        </Container>
      </section>

      <section className="section" aria-labelledby="case-gallery-title">
        <Container>
          <div className="case-study-section-heading">
            <span className="eyebrow">{project.projectType === "concept" ? "Concept gallery" : "Project gallery"}</span>
            <h2 id="case-gallery-title">Visual details.</h2>
          </div>
          {project.gallery.length > 0 ? (
            <div className="case-study-gallery">
              {project.gallery.map((image) => (
                <figure className="case-study-gallery__item" key={image.src}>
                  <div><Image src={image.src} alt={image.alt} fill sizes="(max-width: 600px) 100vw, 50vw" /></div>
                  {image.caption && <figcaption>{image.caption}</figcaption>}
                </figure>
              ))}
            </div>
          ) : (
            <p className="case-study-empty-note">No approved gallery images are available for this project yet.</p>
          )}
        </Container>
      </section>

      <section className="section section--soft" aria-labelledby="case-results-title">
        <Container className="case-study-outcomes">
          <div>
            <span className="eyebrow">Deliverables</span>
            <h2>What is documented.</h2>
            <ul className="compact-list">{project.deliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}</ul>
          </div>
          <div className="case-study-results">
            <span className="eyebrow">Results</span>
            {project.results ? (
              <>
                <h2 id="case-results-title">Verified project results.</h2>
                <p>{project.results.summary}</p>
                {project.results.metrics && <ul className="case-study-metrics">{project.results.metrics.map((metric) => <li key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></li>)}</ul>}
              </>
            ) : (
              <>
                <h2 id="case-results-title">No verified results supplied.</h2>
                <p>No performance claims are made for this concept example.</p>
              </>
            )}
          </div>
        </Container>
      </section>

      <section className="section" aria-labelledby="case-reflection-title">
        <Container className="case-study-reflection">
          <span className="eyebrow">Reflection</span>
          <h2 id="case-reflection-title">What we learned.</h2>
          <p>{project.reflection}</p>
        </Container>
      </section>

      <section className="section section--soft" aria-labelledby="related-services-title">
        <Container className="case-study-related">
          <div>
            <span className="eyebrow">Related services</span>
            <h2 id="related-services-title">Connected capabilities.</h2>
          </div>
          {relatedServices.length > 0 ? (
            <ul>{relatedServices.map((service) => <li key={service.slug}><Link href={`/services/${service.slug}`}>{service.title}</Link></li>)}</ul>
          ) : (
            <p>No related service delivery is documented for this concept.</p>
          )}
        </Container>
      </section>

      <section className="section" aria-labelledby="related-work-title">
        <Container>
          <div className="case-study-section-heading"><span className="eyebrow">Related work</span><h2 id="related-work-title">More work in this category.</h2></div>
          {relatedProjects.length > 0 ? (
            <div className="work-grid">{relatedProjects.map((related) => <WorkProjectCard key={related.slug} project={related} />)}</div>
          ) : (
            <p className="case-study-empty-note">No related projects are available yet.</p>
          )}
        </Container>
      </section>

      <CtaSection
        eyebrow="Start a conversation"
        title="Have a project in mind?"
        description="Tell us what you are working toward, and we can discuss a considered next step."
        href="/#contact"
        actionLabel="Let's Talk About Your Growth"
      />
    </main>
  );
}
