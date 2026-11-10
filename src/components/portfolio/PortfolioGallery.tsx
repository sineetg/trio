"use client";

import { useState } from "react";
import { WorkProjectCard } from "@/components/portfolio/WorkProjectCard";
import { projectCategories, type ProjectCategory, type ProjectListing } from "@/lib/projects";

type PortfolioGalleryProps = { projects: ProjectListing[] };
type ActiveFilter = "All work" | ProjectCategory;

const filters: ActiveFilter[] = ["All work", ...projectCategories];

export function PortfolioGallery({ projects }: PortfolioGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("All work");
  const visibleProjects = activeFilter === "All work"
    ? projects
    : projects.filter((project) => project.categories.includes(activeFilter));

  return (
    <div className="portfolio-gallery">
      <div className="portfolio-filters" role="group" aria-label="Filter portfolio by category">
        {filters.map((filter) => (
          <button
            className={`portfolio-filter${activeFilter === filter ? " portfolio-filter--active" : ""}`}
            type="button"
            key={filter}
            aria-pressed={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <p className="portfolio-count" aria-live="polite">
        {projects.length === 0 ? "No work has been added yet." : `${visibleProjects.length} ${visibleProjects.length === 1 ? "entry" : "entries"}`}
        {activeFilter !== "All work" && ` in ${activeFilter}`}
      </p>
      {visibleProjects.length > 0 ? (
        <div className="work-grid">{visibleProjects.map((project) => <WorkProjectCard key={project.slug} project={project} />)}</div>
      ) : (
        <div className="portfolio-empty" role="status">
          <span className="eyebrow">No matching work</span>
          <h2>{projects.length === 0 ? "The portfolio is being prepared." : `No entries in ${activeFilter} yet.`}</h2>
          <p>{projects.length === 0 ? "Approved project details and imagery will be added here when available." : "This category is ready for future approved projects. Explore the available work or check another category."}</p>
          <button className="portfolio-filter portfolio-filter--reset" type="button" onClick={() => setActiveFilter("All work")}>View all work</button>
        </div>
      )}
    </div>
  );
}
