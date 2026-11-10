export type FounderProfile = {
  name: string;
  role: string;
  portrait: string | null;
  biography: string;
  expertise: string[];
  socialLinks: { label: string; href: string }[];
};

// Replace each field with approved founder information and portrait assets.
export const founders: FounderProfile[] = [1, 2, 3].map((index) => ({
  name: `[Founder ${index} name needed]`,
  role: "Founding partner - role to confirm",
  portrait: null,
  biography: "Approved founder biography needed. Add a verified introduction before publishing this profile.",
  expertise: ["Verified expertise needed"],
  socialLinks: [],
}));

export const agencyValues = [
  { title: "Start with understanding", description: "Learn the business, its audience, and the challenge before choosing tactics." },
  { title: "Connect the pieces", description: "Bring strategy, digital systems, and creative work together around a shared purpose." },
  { title: "Make it useful", description: "Build practical work that supports a clear next step for both the business and its customers." },
];

export const workingStages = [
  { title: "Discover", description: "Understand your business, audience, current setup, and goals." },
  { title: "Strategize", description: "Agree on priorities, direction, and how progress should be evaluated." },
  { title: "Build", description: "Create the identity, content, campaigns, or systems defined in the scope." },
  { title: "Optimize", description: "Review what is working and identify considered next improvements." },
];
