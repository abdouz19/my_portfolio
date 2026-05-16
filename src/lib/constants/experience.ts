import { ExperienceEntry } from "@/lib/types/experience";

export const experienceEntries: ExperienceEntry[] = [
  {
    title: "Mobile Developer",
    company: "Deepminds Ventures, UAE (Remote)",
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
    title: "UX/UI Designer",
    company: "Silkroad Business Management CO Ltd, UK (Remote)",
    type: "Remote",
    startDate: "06.2025",
    endDate: "08.2025",
    isCurrent: false,
    responsibilities: [
      "Designed user interfaces and experiences for client projects.",
      "Collaborated remotely with cross-functional teams.",
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
