export type SocialLink = { label: string; href: string };

export function getPublicContactConfig() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "";
  const candidates: SocialLink[] = [
    { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "" },
    { label: "TikTok", href: process.env.NEXT_PUBLIC_TIKTOK_URL || "" },
    { label: "YouTube", href: process.env.NEXT_PUBLIC_YOUTUBE_URL || "" },
    { label: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "" },
  ];
  return { email, socialLinks: candidates.filter((link) => isPublicHttpUrl(link.href)) };
}

function isPublicHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
