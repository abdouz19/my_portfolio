import { SkillCategory } from "@/lib/types/skill";

export const skillCategories: SkillCategory[] = [
  {
    name: "Mobile Development",
    icon: "Smartphone",
    accentColor: "bg-accent-purple",
    skills: [
      { name: "Flutter", percentage: 95 },
      { name: "Dart", percentage: 90 },
      { name: "Java (Android)", percentage: 85 },
      { name: "State Management", percentage: 90 },
    ],
  },
  {
    name: "Web Development",
    icon: "Globe",
    accentColor: "bg-accent-teal",
    skills: [
      { name: "React", percentage: 80 },
      { name: "JavaScript", percentage: 90 },
      { name: "HTML/CSS", percentage: 95 },
      { name: "Tailwind CSS", percentage: 85 },
    ],
  },
  {
    name: "Backend & Databases",
    icon: "Server",
    accentColor: "bg-accent-green",
    skills: [
      { name: "Python (Flask)", percentage: 70 },
      { name: "Firebase", percentage: 90 },
      { name: "MongoDB", percentage: 80 },
    ],
  },
  {
    name: "Tools & Others",
    icon: "Wrench",
    accentColor: "bg-accent-orange",
    skills: [
      { name: "Git/GitHub", percentage: 90 },
      { name: "Figma", percentage: 80 },
      { name: "AI/ML Basics", percentage: 70 },
    ],
  },
];
