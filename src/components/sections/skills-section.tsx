"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SkillCard } from "@/components/ui/skill-card";
import { skillCategories } from "@/lib/constants/skills";
import { fadeInUp, staggerContainer } from "@/lib/utils/motion-variants";

export function SkillsSection() {
  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <SectionHeading title="Technical" highlight="Skills" centered />
            <p className="mt-3 text-muted">
              A comprehensive toolkit for building modern applications across
              platforms.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
            {skillCategories.map((category) => (
              <motion.div key={category.name} variants={fadeInUp}>
                <SkillCard category={category} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
