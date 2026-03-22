"use client";

import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";
import { ProjectGallery } from "@/components/ui/gallery";
import { type Project } from "@/lib/types/project";

interface ProjectCardProps {
  project: Project;
  onDetailClick: (project: Project) => void;
}

const categoryColors: Record<string, string> = {
  "Mobile App": "text-accent-green bg-accent-green/10",
  "Web App": "text-accent-teal bg-accent-teal/10",
  "AI/ML": "text-accent-purple bg-accent-purple/10",
};

export function ProjectCard({ project, onDetailClick }: ProjectCardProps) {
  return (
    <div
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:scale-[1.02] hover:border-border-glow-hover",
      )}
    >
      <div className="relative w-full overflow-hidden rounded-t-xl bg-card-hover h-[280px]">

        {project.screenshots ? (
          <ProjectGallery
            screenshots={project.screenshots}
            projectTitle={project.title}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted">
            No preview available
          </div>
        )}
        <button
          onClick={() => onDetailClick(project)}
          className="absolute right-3 top-3 z-20 rounded-lg border border-border bg-card/80 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label={`View details for ${project.title}`}
        >
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 p-5">
        <Badge variant="colored" color={categoryColors[project.category]}>
          {project.category.toUpperCase()}
        </Badge>
        <h3 className="mt-2 text-lg font-bold">{project.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">
          {project.description}
        </p>
        <div className="mt-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Key Features
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {project.features.map((feature) => (
              <Badge key={feature}>{feature}</Badge>
            ))}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <Badge key={tech.name} variant="colored" color={tech.color}>
              {tech.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
