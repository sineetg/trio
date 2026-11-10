import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import { digitalSystems } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Website Development & Conversion Optimization", description: "Business and restaurant website development, landing pages, conversion journeys, CRM configuration, automation, analytics, and integrations.", path: "/services/digital-systems" });

export default function DigitalSystemsPage() {
  return <ServiceDetailPage service={digitalSystems} />;
}
