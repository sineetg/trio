import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import { creativeBrand } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Hospitality Branding & Brand Identity", description: "Develop brand identity, guidelines, content strategy, copywriting, design, and creative direction for hospitality and growing brands.", path: "/services/creative-brand" });

export default function CreativeBrandPage() {
  return <ServiceDetailPage service={creativeBrand} />;
}
