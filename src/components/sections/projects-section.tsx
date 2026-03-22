"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { FilterTabs } from "@/components/ui/filter-tabs";
import { ProjectCard } from "@/components/ui/project-card";
import { ProjectModal } from "@/components/ui/project-modal";
import { projects } from "@/lib/constants/projects";
import { fadeInUp, staggerContainer } from "@/lib/utils/motion-variants";
import { type Project } from "@/lib/types/project";

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = useMemo(
    () => ["All", ...new Set(projects.map((p) => p.category))],
    [],
  );

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((p) => p.category === activeFilter),
    [activeFilter],
  );

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <SectionHeading title="Featured" highlight="Projects" centered />
            <p className="mt-3 text-muted">
              Showcasing innovative solutions across mobile and web platforms.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex justify-center">
            <FilterTabs
              categories={categories}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard
                    project={project}
                    onDetailClick={setSelectedProject}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div variants={fadeInUp} className="text-center">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                icon={<Github className="h-4 w-4" />}
              >
                View More on GitHub
              </Button>
            </a>
          </motion.div>
        </motion.div>

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </Container>
    </section>
  );
}
