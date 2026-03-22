"use client";

import { motion } from "framer-motion";
import { iconMap } from "@/lib/utils/icon-map";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { communityOrganizations } from "@/lib/constants/community";
import { fadeInUp, staggerContainer } from "@/lib/utils/motion-variants";

export function CommunitySection() {
  return (
    <section id="community" className="py-20">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.div variants={fadeInUp}>
            <SectionHeading title="Community" highlight="Involvement" />
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {communityOrganizations.map((org) => {
              const Icon = iconMap[org.icon];
              return (
                <motion.div key={org.name} variants={fadeInUp}>
                  <Card>
                    <div className="space-y-3">
                      <div className="rounded-lg bg-card-hover p-3 w-fit">
                        {Icon && <Icon className={`h-6 w-6 ${org.iconColor}`} />}
                      </div>
                      <h3 className="text-lg font-bold">{org.name}</h3>
                      <p className="text-sm text-muted">{org.role}</p>
                      <div className="flex gap-2">
                        {org.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-sm font-medium text-accent-green"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
