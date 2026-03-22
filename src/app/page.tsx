import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { JourneySection } from "@/components/sections/journey-section";
import { EducationSection } from "@/components/sections/education-section";
import { CommunitySection } from "@/components/sections/community-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <JourneySection />
      <EducationSection />
      <CommunitySection />
      <ContactSection />
    </>
  );
}
