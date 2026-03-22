"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { iconMap } from "@/lib/utils/icon-map";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/sections/contact-form";
import { contactInfo } from "@/lib/constants/contact-info";
import { socialLinks } from "@/lib/constants/social-links";
import { fadeInUp, staggerContainer } from "@/lib/utils/motion-variants";

const contactDetails = [
  { icon: Mail, label: "Email", value: contactInfo.email },
  { icon: Phone, label: "Phone", value: contactInfo.phone },
  { icon: MapPin, label: "Location", value: contactInfo.location },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <SectionHeading title="Get In Touch" centered />
            <p className="mt-3 text-muted">
              Ready to collaborate on your next project? Let&apos;s discuss how
              we can bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div variants={fadeInUp}>
              <ContactForm />
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <Card hover={false}>
                <h3 className="mb-3 text-xl font-bold">
                  Let&apos;s Connect
                </h3>
                <p className="text-sm text-muted">
                  I&apos;m always interested in new opportunities and exciting
                  projects. Whether you have a question, want to collaborate,
                  or just want to say hello, feel free to reach out!
                </p>
                <div className="mt-4 space-y-3">
                  {contactDetails.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3"
                    >
                      <div className="rounded-lg bg-card-hover p-2">
                        <item.icon className="h-4 w-4 text-accent-blue" />
                      </div>
                      <div>
                        <p className="text-xs text-muted">{item.label}</p>
                        <p className="text-sm font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card hover={false}>
                <div className="flex items-center gap-4">
                  <p className="text-lg font-bold text-accent-blue">MAZ</p>
                  <div>
                    <p className="font-bold">Mohamed Abderraouf Zouaid</p>
                    <p className="text-sm text-muted">
                      Flutter Mobile Developer
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  {socialLinks.map((link) => {
                    const Icon = iconMap[link.icon];
                    return (
                      <a
                        key={link.platform}
                        href={link.url}
                        target={
                          link.platform === "Email" ? undefined : "_blank"
                        }
                        rel={
                          link.platform === "Email"
                            ? undefined
                            : "noopener noreferrer"
                        }
                        className="rounded-lg border border-border p-2 text-muted transition-colors hover:border-accent-blue hover:text-accent-blue focus:outline-none focus:ring-2 focus:ring-ring"
                        aria-label={link.platform}
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                      </a>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
