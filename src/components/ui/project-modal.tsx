"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Project } from "@/lib/types/project";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, handleKeyDown]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-background p-4 sm:p-6"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1 text-muted transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl bg-card sm:h-56">
              <Image
                src={project.previewImage}
                alt={`${project.title} preview`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 640px"
              />
            </div>

            <Badge
              variant="colored"
              color={
                project.category === "Mobile App"
                  ? "text-accent-green bg-accent-green/10"
                  : project.category === "Web App"
                    ? "text-accent-teal bg-accent-teal/10"
                    : "text-accent-purple bg-accent-purple/10"
              }
            >
              {project.category.toUpperCase()}
            </Badge>

            <h2 id="modal-title" className="mt-2 text-xl font-bold sm:text-2xl">
              {project.title}
            </h2>

            <p className="mt-2 text-muted">{project.fullDescription}</p>

            <div className="mt-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted">
                Key Features
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.features.map((feature) => (
                  <Badge key={feature}>{feature}</Badge>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted">
                Tech Stack
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech.name} variant="colored" color={tech.color}>
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" icon={<Github className="h-4 w-4" />}>
                    View Code
                  </Button>
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button icon={<ExternalLink className="h-4 w-4" />}>
                    Live Demo
                  </Button>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
