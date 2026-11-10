import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Page not found", description: "The requested Trio Digitals page could not be found.", path: "/404", noIndex: true });

export default function NotFound() {
  return (
    <main className="not-found-page">
      <Container>
        <span className="eyebrow">404 / Not found</span>
        <h1 id="not-found-title">We couldn&apos;t find that page.</h1>
        <p>The link may be out of date, or the page may not be available.</p>
        <Button href="/work">Browse the portfolio</Button>
      </Container>
    </main>
  );
}
