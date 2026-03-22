"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { educationEntries, certificationEntries } from "@/lib/constants/education";
import { fadeInUp, staggerContainer } from "@/lib/utils/motion-variants";

export function EducationSection() {
  return (
    <section id="education" className="py-12 sm:py-16 md:py-20">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.div variants={fadeInUp}>
            <SectionHeading title="Education & Certifications" />
          </motion.div>

          <div className="space-y-4">
            {educationEntries.map((entry) => (
              <motion.div key={entry.institution} variants={fadeInUp}>
                <Card className="border-l-4 border-l-accent-blue">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="font-bold">{entry.degree}</h3>
                      <p className="text-sm text-muted">{entry.institution}</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-border px-3 py-0.5 text-xs text-muted">
                      {entry.startDate} — {entry.endDate}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {certificationEntries.map((cert) => (
              <motion.div key={cert.name} variants={fadeInUp}>
                <Card>
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-amber-500/10 p-2">
                      <Award className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{cert.name}</h3>
                      <p className="text-xs text-muted">
                        {cert.provider} • {cert.date}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
