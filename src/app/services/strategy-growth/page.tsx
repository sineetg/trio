import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import { strategyGrowth } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Marketing Strategy & Growth", description: "Marketing strategy, audience research, customer journeys, search planning, campaigns, and measurement priorities for growing businesses.", path: "/services/strategy-growth" });

export default function StrategyGrowthPage() {
  return <ServiceDetailPage service={strategyGrowth} />;
}
