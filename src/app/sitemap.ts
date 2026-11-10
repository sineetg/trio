import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { projects } from "@/lib/projects";

const indexableRoutes = [
  "/",
  "/services",
  "/services/strategy-growth",
  "/services/digital-systems",
  "/services/creative-brand",
  "/hospitality",
  "/work",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];

  return [
    ...indexableRoutes.map((path): MetadataRoute.Sitemap[number] => ({
      url: new URL(path, siteUrl).toString(),
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : path === "/contact" ? 0.8 : 0.7,
    })),
    ...projects
      .filter((project) => project.projectType !== "concept" && project.status === "Completed")
      .map((project) => ({ url: new URL(`/work/${project.slug}`, siteUrl).toString(), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
