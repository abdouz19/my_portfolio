import { ExperienceEntry } from "@/lib/types/experience";

export const experienceEntries: ExperienceEntry[] = [
  {
    title: "Mobile Developer",
    company: "Deepminds Ventures (Remote)",
    type: "Remote",
    startDate: "08.2025",
    endDate: "Present",
    isCurrent: true,
    responsibilities: [
      "Cross-platform mobile applications using Flutter for Android and iOS.",
      "Implemented Clean Architecture with Bloc state management.",
      "Optimized app performance and responsiveness.",
    ],
  },
  {
    title: "Mobile Developer, Freelance",
    company: "Self-Employed",
    type: "Freelance",
    startDate: "05.2024",
    endDate: "07.2025",
    isCurrent: false,
    responsibilities: [
      "Delivered mobile apps using Flutter and Java.",
      "Implemented authentication, API integration and caching (BLoC, GetX).",
    ],
  },
  {
    title: "External Relations Coordinator",
    company: "GDG Algiers (Volunteering)",
    type: "Volunteering",
    startDate: "12.2023",
    endDate: "07.2025",
    isCurrent: false,
    responsibilities: [
      "Coordinated partnerships and contributed to community growth.",
    ],
  },
];
