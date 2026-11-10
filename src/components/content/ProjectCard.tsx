import Image from "next/image";

type ProjectCardProps = { title: string; category: string; status?: string; imageSrc?: string; imageAlt?: string };

export function ProjectCard({ title, category, status = "Placeholder content", imageSrc, imageAlt }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-card__visual">
        {imageSrc ? (
          <>
            <Image src={imageSrc} alt={imageAlt ?? title} fill sizes="(max-width: 560px) 100vw, 50vw" />
            <span className="project-card__status">{status}</span>
          </>
        ) : <span className="project-card__status project-card__status--empty">{status}</span>}
      </div>
      <div className="project-card__body">
        <span className="project-card__meta">{category}</span>
        <h3>{title}</h3>
      </div>
    </article>
  );
}
