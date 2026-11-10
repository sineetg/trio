export const serviceOptions = [
  "Strategy & Growth",
  "Digital Systems & Conversion",
  "Creative & Brand",
  "Hospitality marketing",
  "Not sure yet",
] as const;

export const budgetOptions = ["Under $2,500", "$2,500-$5,000", "$5,000-$10,000", "$10,000+", "Not sure yet"] as const;
export const timelineOptions = ["As soon as possible", "Within 1-3 months", "Within 3-6 months", "Flexible / exploring"] as const;

export type InquiryInput = {
  fullName: string;
  email: string;
  company: string;
  website: string;
  services: string[];
  budget: string;
  timeline: string;
  description: string;
  consent: boolean;
  websiteConfirm?: string;
};

export type InquiryErrors = Partial<Record<keyof InquiryInput | "form", string>>;

export function validateInquiry(value: unknown): { data?: InquiryInput; errors: InquiryErrors } {
  const errors: InquiryErrors = {};
  if (!value || typeof value !== "object" || Array.isArray(value)) return { errors: { form: "Enter your inquiry details and try again." } };
  const raw = value as Record<string, unknown>;
  const text = (key: string) => typeof raw[key] === "string" ? raw[key].trim() : "";
  const fullName = text("fullName");
  const email = text("email");
  const company = text("company");
  const website = text("website");
  const description = text("description");
  const services = Array.isArray(raw.services) ? raw.services.filter((item): item is string => typeof item === "string") : [];
  const budget = text("budget");
  const timeline = text("timeline");
  const consent = raw.consent === true;
  const websiteConfirm = text("websiteConfirm");

  if (fullName.length < 2 || fullName.length > 100) errors.fullName = "Enter your name (2-100 characters).";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid business email address.";
  if (company.length < 2 || company.length > 120) errors.company = "Enter your company or brand name (2-120 characters).";
  if (website.length > 300 || (website && !isValidWebsite(website))) errors.website = "Enter a valid website or social profile URL, or leave this optional field blank.";
  if (services.length < 1 || services.length > serviceOptions.length || services.some((service) => !serviceOptions.includes(service as typeof serviceOptions[number]))) errors.services = "Choose at least one service.";
  if (budget && !budgetOptions.includes(budget as typeof budgetOptions[number])) errors.budget = "Choose one of the listed budget ranges.";
  if (timeline && !timelineOptions.includes(timeline as typeof timelineOptions[number])) errors.timeline = "Choose one of the listed timelines.";
  if (description.length < 20 || description.length > 5000) errors.description = "Describe your project in 20-5,000 characters.";
  if (!consent) errors.consent = "Consent is required so we can use these details to respond to your inquiry.";

  return Object.keys(errors).length
    ? { errors }
    : { errors, data: { fullName, email, company, website, services, budget, timeline, description, consent, websiteConfirm } };
}

function isValidWebsite(value: string) {
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return (url.protocol === "https:" || url.protocol === "http:") && Boolean(url.hostname.includes("."));
  } catch {
    return false;
  }
}
