"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download, ArrowRight, Code2, Palette } from "lucide-react";
import { iconMap } from "@/lib/utils/icon-map";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/utils/motion-variants";
import { socialLinks } from "@/lib/constants/social-links";

export function HeroSection() {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-20 pb-12 sm:pt-24 sm:pb-16">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-green/30 bg-accent-green/10 px-3 py-1 text-sm text-accent-green">
                <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse-dot" />
                AVAILABLE FOR HIRE
              </span>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <p className="text-lg text-muted">Hello, I&apos;m</p>
              <h1 className="mt-1 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Mohamed Abderraouf{" "}
                <span className="text-accent-blue">ZOUAID</span>
              </h1>
              <p className="mt-2 text-lg font-medium sm:text-xl md:text-2xl">
                Flutter Mobile Developer
              </p>
            </motion.div>

            <motion.p variants={fadeInUp} className="max-w-lg text-muted">
              Passionate mobile developer specializing in creating innovative
              mobile solutions. I bring ideas to life with clean code and
              exceptional user experiences.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
              <a href="/files/Abderraouf Zouaid Resume.pdf" download>
                <Button icon={<Download className="h-4 w-4" />}>
                  Download CV
                </Button>
              </a>
              <Button
                variant="outline"
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
                onClick={scrollToProjects}
              >
                View Projects
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex gap-3">
              {socialLinks.slice(0, 3).map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target={link.platform === "Email" ? undefined : "_blank"}
                    rel={link.platform === "Email" ? undefined : "noopener noreferrer"}
                    className="rounded-full border border-border p-2.5 text-muted transition-colors hover:border-accent-blue hover:text-accent-blue focus:outline-none focus:ring-2 focus:ring-ring"
                    aria-label={link.platform}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="relative mx-auto hidden lg:block"
          >
            <div className="relative h-80 w-80">
              <div className="absolute inset-0 rounded-full bg-accent-blue/20 blur-3xl" />
              <div className="relative h-full w-full overflow-hidden rounded-full ring-4 ring-accent-blue/30">
                <Image
                  src="/images/me.jpg"
                  alt="Mohamed Abderraouf Zouaid - Flutter Mobile Developer"
                  fill
                  priority
                  className="object-cover"
                  sizes="320px"
                />
              </div>
              <div className="absolute -left-4 top-8 rounded-xl border border-border bg-card p-3 shadow-lg">
                <Code2 className="h-6 w-6 text-accent-blue" />
              </div>
              <div className="absolute -right-4 bottom-12 rounded-xl border border-border bg-card p-3 shadow-lg">
                <Palette className="h-6 w-6 text-accent-purple" />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
