export type ServicePillar = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  problem: string;
  offerings: string[];
  deliverables: string[];
  cta: string;
};

export const servicePillars: ServicePillar[] = [
  {
    slug: "strategy-growth",
    title: "Strategy & Growth",
    shortTitle: "Strategy",
    description: "A focused marketing plan connects your business goals with the audiences, channels, and actions that matter.",
    problem: "When activity is spread across channels without a shared plan, it can be difficult to know what to prioritize or how to evaluate progress.",
    offerings: [
      "Digital marketing strategy",
      "Market and competitor research",
      "Customer journey mapping",
      "SEO strategy",
      "Paid advertising strategy",
      "Campaign planning",
      "Analytics and KPI definition",
    ],
    deliverables: [
      "A marketing direction and channel plan",
      "Customer journey and audience considerations",
      "Search and paid media recommendations",
      "Campaign outline with agreed measurement priorities",
    ],
    cta: "Discuss Your Marketing Strategy",
  },
  {
    slug: "digital-systems",
    title: "Digital Systems & Conversion",
    shortTitle: "Digital systems",
    description: "Build useful digital experiences and connected systems that help customers take the next step and teams manage the journey.",
    problem: "A confusing website, disconnected tools, or unclear follow-up can make it harder for visitors to become meaningful inquiries.",
    offerings: [
      "Business website development",
      "Landing pages",
      "Conversion optimization",
      "CRM configuration",
      "Marketing automation",
      "Analytics implementation",
      "Lead generation systems",
      "Third-party integrations",
    ],
    deliverables: [
      "A scoped website or landing page experience",
      "Conversion journey and lead-flow recommendations",
      "CRM and automation configuration plan",
      "Analytics events and integration notes",
    ],
    cta: "Request a Website Consultation",
  },
  {
    slug: "creative-brand",
    title: "Creative & Brand",
    shortTitle: "Creative",
    description: "Give your business a consistent identity and a clear creative voice across the places your audience meets you.",
    problem: "Inconsistent visuals or messaging can make a business harder to recognize and its value harder to understand.",
    offerings: [
      "Brand identity",
      "Brand guidelines",
      "Content strategy",
      "Copywriting",
      "Graphic design",
      "Photography and video",
      "Social media content",
      "Campaign creative direction",
    ],
    deliverables: [
      "Visual identity direction and brand guidelines",
      "Messaging, copy, and content themes",
      "Design assets for social and campaigns",
      "Creative direction for photography and video",
    ],
    cta: "Build Your Brand",
  },
];

export const strategyGrowth = servicePillars[0];
export const digitalSystems = servicePillars[1];
export const creativeBrand = servicePillars[2];
