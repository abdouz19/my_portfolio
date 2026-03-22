"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TimelineItem } from "@/components/ui/timeline-item";
import { experienceEntries } from "@/lib/constants/experience";
import { fadeInLeft, staggerContainer } from "@/lib/utils/motion-variants";

export function JourneySection() {
  return (
    <section id="journey" className="py-12 sm:py-16 md:py-20">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.div variants={fadeInLeft}>
            <SectionHeading title="Professional" highlight="Journey" />
          </motion.div>

          <div className="relative space-y-8 border-l-2 border-border pl-0">
            {experienceEntries.map((entry) => (
              <motion.div key={entry.company} variants={fadeInLeft}>
                <TimelineItem
                  title={entry.title}
                  company={entry.company}
                  type={entry.type}
                  period={`${entry.startDate} — ${entry.endDate}`}
                  isCurrent={entry.isCurrent}
                  responsibilities={entry.responsibilities}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
