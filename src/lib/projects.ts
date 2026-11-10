export const projectCategories = [
  "Strategy",
  "Websites and systems",
  "Branding and creative",
  "Campaigns",
  "Hospitality",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];
export type ProjectType = "client" | "personal" | "collaborative" | "concept";
export type ProjectStatus = "Concept / placeholder" | "In progress" | "Completed";

export type ProjectImage = { src: string; alt: string; caption?: string };
export type ProjectResults = { summary: string; metrics?: { label: string; value: string }[] };

export type WorkProject = {
  title: string;
  slug: string;
  summary: string;
  industry: string;
  categories: ProjectCategory[];
  projectType: ProjectType;
  status: ProjectStatus;
  coverImage: ProjectImage;
  gallery: ProjectImage[];
  challenge: string;
  strategy: string;
  execution: string;
  deliverables: string[];
  results?: ProjectResults;
  reflection: string;
  relatedServices: string[];
  externalLinks?: { label: string; href: string }[];
};

export type ProjectListing = Pick<WorkProject, "title" | "slug" | "summary" | "industry" | "categories" | "projectType" | "status" | "coverImage">;

const briefingPlaceholder = "No approved project brief was provided. Replace this placeholder with verified project context before presenting it as a case study.";
const strategyPlaceholder = "No research or strategy notes were supplied for this concept. Add only approved, documented information.";
const reflectionPlaceholder = "No project reflection was supplied. Replace this placeholder with approved learning or next-step notes if available.";

// These two records demonstrate the portfolio and case study layout using supplied hospitality images only.
// They are development concepts, not client, personal, or collaborative project claims.
export const projects: WorkProject[] = [
  {
    title: "Chawilah Space",
    slug: "chawilah-space",
    summary: "A creative and brand transformation project for Chawilah Space, focused on building a stronger social media presence, refreshing the brand identity, and showcasing its handmade crafts and home décor through engaging visual content.",
    industry: "Creative Arts & Crafts",
    categories: ["Branding and creative", "Strategy"],
    projectType: "client",
    status: "In progress",
    coverImage: {
      src: "/images/work/chawilah-space/modern-decorative-plates.jpeg",
      alt: "Colorful handmade decorative plates presented in Chawilah Space social content.",
    },
    gallery: [
      { src: "/images/work/chawilah-space/name-announcement.jpeg", alt: "Chawilah Space name announcement describing the change from Jabez to Chawila.", caption: "Brand name announcement" },
      { src: "/images/work/chawilah-space/weekend-bazaar.jpeg", alt: "Weekend bazaar promotional graphic over a display of handmade crafts.", caption: "Event and bazaar promotion" },
      { src: "/images/work/chawilah-space/christmas-campaign.jpeg", alt: "Chawilah Space Christmas greeting graphic with a festive red and green design.", caption: "Holiday campaign graphic" },
      { src: "/images/work/chawilah-space/holiday-decor-collection.jpeg", alt: "A collection of decorative holiday plates and ornaments arranged on a red background.", caption: "Holiday product collection" },
    ],
    challenge: "Chawilah Space had limited social media presence and wanted to build a more recognizable and engaging digital identity. The brand wanted its Instagram presence to feel more lively, peaceful, and visually cohesive while effectively showcasing its handmade crafts and home décor products.",
    strategy: "We combined market and competitor research with a refreshed visual direction and content strategy. The goal was to create a stronger brand identity while developing social media content that could connect with audiences across different moments, holidays, events, and product-focused campaigns.",
    execution: "Redesigned the brand's Instagram presence and visual direction; developed a more lively, peaceful, and cohesive aesthetic; helped shape the brand's new name and overall theme; conducted market and competitor research; designed graphics and promotional posters; filmed and recorded crafts and home décor products for Instagram and TikTok; created visual content to showcase products in a more engaging way; supported the brand's presence at events and bazaars; and developed content for Instagram and TikTok.",
    deliverables: [
      "Instagram visual redesign",
      "Brand refresh and repositioning",
      "Social media content strategy",
      "Market and competitor research",
      "Product photography and video content",
      "Instagram content",
      "TikTok content",
      "Holiday campaign graphics",
      "Promotional posters",
      "Event and bazaar marketing support",
    ],
    results: {
      summary: "The ongoing project established a more consistent visual identity, strengthened the client's brand identity and positioning, and improved its digital presence across Instagram and TikTok. It supported visibility through vendor participation at events and bazaars, created a stronger system for showcasing products and communicating the brand visually, and delivered a refreshed brand name and visual theme aligned with the client's desired direction. These results are qualitative; no numerical analytics were provided.",
    },
    reflection: "The Chawilah Space project demonstrates how a thoughtful combination of brand strategy, visual content, and social media can transform the way a creative business presents itself. By combining research, rebranding, product storytelling, and event-focused marketing, we helped establish a stronger and more recognizable digital presence while continuing to evolve the brand.",
    relatedServices: ["creative-brand", "strategy-growth"],
    externalLinks: [
      { label: "Instagram", href: "https://www.instagram.com/chawila_space" },
      { label: "TikTok", href: "https://www.tiktok.com/@chawila_space" },
    ],
  },
  {
    title: "Restaurant dining image study",
    slug: "restaurant-dining-image-study",
    summary: "A development example using supplied restaurant photography as hospitality visual direction only.",
    industry: "Hospitality concept",
    categories: ["Hospitality"],
    projectType: "concept",
    status: "Concept / placeholder",
    coverImage: {
      src: "/images/restaurant-concept-01.jpg",
      alt: "A plated dish in a warmly lit restaurant dining room.",
    },
    gallery: [
      { src: "/images/restaurant-concept-02.jpg", alt: "A plated dish photographed close-up on a restaurant plate.", caption: "Dining concept image" },
      { src: "/images/restaurant-concept-03.jpg", alt: "A restaurant table set for a multi-course meal.", caption: "Restaurant concept image" },
    ],
    challenge: briefingPlaceholder,
    strategy: strategyPlaceholder,
    execution: "Supplied dining photographs are shown as visual references. No campaign, website, brand system, or client engagement is represented.",
    deliverables: ["Supplied image references only"],
    reflection: reflectionPlaceholder,
    relatedServices: [],
  },
  {
    title: "Hospitality spaces image study",
    slug: "hospitality-spaces-image-study",
    summary: "A development example using supplied hotel and resort photography as hospitality visual direction only.",
    industry: "Hospitality concept",
    categories: ["Hospitality"],
    projectType: "concept",
    status: "Concept / placeholder",
    coverImage: {
      src: "/images/hospitality-concept-01.jpg",
      alt: "A hotel lobby with warm wood detailing and hanging lanterns.",
    },
    gallery: [
      { src: "/images/resort-concept-01.jpg", alt: "A resort property beside a pool and palm trees.", caption: "Guest stay concept image" },
    ],
    challenge: briefingPlaceholder,
    strategy: strategyPlaceholder,
    execution: "Supplied hotel and resort photographs are shown as visual references. No client engagement, hospitality campaign, or completed service is represented.",
    deliverables: ["Supplied image references only"],
    reflection: reflectionPlaceholder,
    relatedServices: [],
  },
];

export const featuredProjects = projects.slice(0, 2).map((project) => ({
  title: project.title,
  category: project.categories.join(" / "),
  status: "Concept image",
  imageSrc: project.coverImage.src,
  imageAlt: project.coverImage.alt,
}));

export function getProjectListings(): ProjectListing[] {
  return projects.map(({ title, slug, summary, industry, categories, projectType, status, coverImage }) => ({
    title,
    slug,
    summary,
    industry,
    categories,
    projectType,
    status,
    coverImage,
  }));
}

export function getProjectBySlug(slug: string): WorkProject | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(project: WorkProject): WorkProject[] {
  return projects
    .filter((candidate) => candidate.slug !== project.slug && candidate.categories.some((category) => project.categories.includes(category)))
    .slice(0, 3);
}
