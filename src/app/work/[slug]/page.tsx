import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/portfolio/CaseStudyPage";
import { getProjectBySlug, projects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

type WorkDetailProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: WorkDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return pageMetadata({ title: "Project not found", description: "This project page could not be found.", path: `/work/${slug}`, noIndex: true });

  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
    image: project.coverImage.src,
    noIndex: project.projectType === "concept",
  });
}

export default async function WorkDetailPage({ params }: WorkDetailProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return <CaseStudyPage project={project} />;
}
