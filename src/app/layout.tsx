import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GlobalNav } from "@/components/layout/GlobalNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AnalyticsConsent } from "@/components/analytics/AnalyticsConsent";
import { organizationStructuredData, siteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: "Trio Digitals | Digital marketing, websites, and brand strategy", template: "%s | Trio Digitals" },
  description: "Digital marketing strategy, website development, conversion support, and brand identity for restaurants, hospitality businesses, and growing companies.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const structuredData = JSON.stringify(organizationStructuredData()).replace(/</g, "\\u003c");
  return (
    <html lang="en">
      <body>
        <GlobalNav />
        {children}
        <SiteFooter />
        <AnalyticsConsent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
      </body>
    </html>
  );
}
