"use client";

import { motion } from "framer-motion";
import { GraduationCap, Users, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { fadeInUp, staggerContainer } from "@/lib/utils/motion-variants";

const aboutCards = [
  {
    icon: GraduationCap,
    iconColor: "text-accent-blue",
    title: "Education",
    description:
      "Pursuing Master's in Big Data Analytics (USTHB). Holds a Bachelor's in CS.",
  },
  {
    icon: Users,
    iconColor: "text-accent-green",
    title: "Community",
    description:
      "Active GDG Algiers member & Google Developer Group organizer.",
  },
  {
    icon: MapPin,
    iconColor: "text-accent-purple",
    title: "Location",
    description:
      "Based in Algiers, Algeria. Available for remote collaboration globally.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={fadeInUp}>
              <SectionHeading title="About" highlight="Me" />
            </motion.div>
            <motion.p variants={fadeInUp} className="text-muted">
              I&apos;m a dedicated Mobile Developer currently pursuing my
              Master&apos;s Degree in Big Data Analytics. With a passion for
              creating innovative solutions, I specialize in developing modern
              and robust mobile applications using Flutter. My journey in
              software development has been marked by continuous learning and
              hands-on experience with cutting-edge technologies.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex gap-6">
              <div className="text-center">
                <AnimatedCounter
                  target={8}
                  className="text-3xl font-bold text-accent-blue md:text-4xl"
                />
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">
                  Projects Completed
                </p>
              </div>
              <div className="text-center">
                <AnimatedCounter
                  target={2}
                  className="text-3xl font-bold text-accent-blue md:text-4xl"
                />
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">
                  Years Experience
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {aboutCards.map((card) => (
              <motion.div key={card.title} variants={fadeInUp}>
                <Card>
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-card-hover p-2.5">
                      <card.icon className={`h-5 w-5 ${card.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-bold">{card.title}</h3>
                      <p className="mt-1 text-sm text-muted">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
