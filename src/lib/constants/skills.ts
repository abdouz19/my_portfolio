import { SkillCategory } from "@/lib/types/skill";

export const skillCategories: SkillCategory[] = [
  {
    name: "Mobile Engineering",
    icon: "Smartphone",
    accentColor: "bg-accent-purple",
    skills: [
      { name: "Flutter & Dart", percentage: 95 },
      { name: "BLoC, Riverpod & Provider", percentage: 90 },
      { name: "Android Development (Java, XML)", percentage: 85 },
      { name: "iOS Development", percentage: 80 },
      { name: "Clean Architecture & OOP", percentage: 92 },
    ],
  },
  {
    name: "Web & CMS Development",
    icon: "Globe",
    accentColor: "bg-accent-teal",
    skills: [
      { name: "JavaScript", percentage: 90 },
      { name: "HTML5 & CSS (Web Design)", percentage: 95 },
      { name: "User Experience (UX) & Figma", percentage: 85 },
      { name: "PHP, WordPress & WooCommerce", percentage: 80 },
    ],
  },
  {
    name: "Backend & Databases",
    icon: "Server",
    accentColor: "bg-accent-green",
    skills: [
      { name: "Python & Flask", percentage: 85 },
      { name: "Firebase & Supabase", percentage: 90 },
      { name: "REST APIs", percentage: 95 },
      { name: "Relational DBs (SQL, PL/SQL, Oracle, MySQL, SQLite)", percentage: 88 },
      { name: "NoSQL DBs (MongoDB, Cassandra, Neo4j)", percentage: 80 },
    ],
  },
  {
    name: "Data Engineering & Analytics",
    icon: "BarChart3",
    accentColor: "bg-accent-blue",
    skills: [
      { name: "ETL & Data Warehouse Architecture", percentage: 85 },
      { name: "Data Analysis (Pandas, NumPy, Statistics)", percentage: 88 },
      { name: "Spatial Analysis & ArcGIS", percentage: 80 },
      { name: "Microsoft Power BI", percentage: 82 },
      { name: "Machine Learning", percentage: 78 },
    ],
  },
  {
    name: "DevOps & Infrastructure",
    icon: "Cpu",
    accentColor: "bg-accent-orange",
    skills: [
      { name: "Docker & Kubernetes", percentage: 82 },
      { name: "CI/CD (GitLab CI/CD, Codemagic)", percentage: 85 },
      { name: "Dokploy Platform Deployment", percentage: 80 },
      { name: "Version Control (Git & GitHub)", percentage: 92 },
    ],
  },
];
