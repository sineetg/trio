import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectListing } from "@/lib/projects";

type WorkProjectCardProps = { project: ProjectListing };

export function WorkProjectCard({ project }: WorkProjectCardProps) {
  return (
    <article className="work-card">
      <Link href={`/work/${project.slug}`} aria-label={`View ${project.title} case study`}>
        <div className="work-card__image">
          <Image src={project.coverImage.src} alt={project.coverImage.alt} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 40vw" />
          <span className="work-card__status">{project.status}</span>
          <span className="work-card__open" aria-hidden="true"><ArrowUpRight size={18} strokeWidth={1.8} /></span>
        </div>
        <div className="work-card__body">
          <div className="work-card__meta"><span>{project.industry}</span><span>{project.projectType}</span></div>
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
          <ul className="work-card__categories" aria-label="Project categories">
            {project.categories.map((category) => <li key={category}>{category}</li>)}
          </ul>
        </div>
      </Link>
    </article>
  );
}
