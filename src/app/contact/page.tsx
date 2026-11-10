import type { Metadata } from "next";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { getPublicContactConfig } from "@/lib/contact-config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Contact", description: "Tell Trio Digitals about your business goals, marketing needs, or website project and start an inquiry.", path: "/contact" });

export default function ContactPage() {
  const contact = getPublicContactConfig();
  return (
    <main>
      <section className="contact-hero">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <div className="contact-hero__copy">
            <span className="eyebrow">Contact Trio Digitals</span>
            <h1>Let&apos;s Talk About Your Growth.</h1>
            <p>Tell us about your goals, challenges or ideas. We&apos;ll take it from there.</p>
          </div>
        </Container>
      </section>
      <section className="section" aria-labelledby="inquiry-form-title">
        <Container className="contact-layout">
          <div className="contact-intro">
            <span className="eyebrow">Project inquiry</span>
            <h2 id="inquiry-form-title">A little context helps us start well.</h2>
            <p>Share what you can. Fields marked required help us understand who is reaching out and what you need.</p>
            <div className="contact-details">
              <h3>Direct contact</h3>
              {contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : <p>Business email to be configured.</p>}
              {contact.socialLinks.length > 0 && <ul>{contact.socialLinks.map((social) => <li key={social.label}><a href={social.href} target="_blank" rel="noreferrer">{social.label}<span className="sr-only"> (opens in a new tab)</span></a></li>)}</ul>}
              {contact.socialLinks.length === 0 && <p>Social links to be configured.</p>}
            </div>
          </div>
          <InquiryForm />
        </Container>
      </section>
    </main>
  );
}
