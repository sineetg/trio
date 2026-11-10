import type { Metadata } from "next";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl = getSiteUrl(configuredSiteUrl);

function getSiteUrl(value?: string): URL | undefined {
  if (!value) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("NEXT_PUBLIC_SITE_URL must be set to the production site origin before building or starting the production site.");
    }
    return undefined;
  }

  try {
    const url = new URL(value);
    const validProtocol = url.protocol === "https:" || (process.env.NODE_ENV !== "production" && url.protocol === "http:");
    const validOrigin = url.pathname === "/" && !url.search && !url.hash && !url.username && !url.password;
    const placeholderDomain = url.hostname === "example.com" || url.hostname.endsWith(".example");
    if (validProtocol && validOrigin && !(process.env.NODE_ENV === "production" && placeholderDomain)) return url;
  } catch {
    // Use the same actionable configuration error below for malformed values.
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("NEXT_PUBLIC_SITE_URL must be a real HTTPS origin with no path, query, or fragment (for example https://www.yourdomain.com).");
  }
  return undefined;
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
};

export function pageMetadata({ title, description, path, image = "/trio-digitals-logo.png", noIndex = false }: PageMetadataOptions): Metadata {
  const canonical = !noIndex && siteUrl ? new URL(path, siteUrl).toString() : undefined;
  const imageUrl = siteUrl ? new URL(image, siteUrl).toString() : undefined;

  return {
    title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "website",
      siteName: "Trio Digitals",
      title,
      description,
      ...(canonical ? { url: canonical } : {}),
      ...(imageUrl ? { images: [{ url: imageUrl, alt: title === "Trio Digitals" ? "Trio Digitals logo" : `${title} — Trio Digitals` }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

export function organizationStructuredData() {
  const url = siteUrl?.toString();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Trio Digitals",
    ...(url ? { url, logo: new URL("/trio-digitals-logo.png", siteUrl).toString() } : {}),
  };
}
