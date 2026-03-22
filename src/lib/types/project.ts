export type ProjectCategory = "Mobile App" | "Web App" | "AI/ML";

export interface TechStackItem {
  name: string;
  color: string;
}

export interface ProjectLinks {
  github?: string;
  live?: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  fullDescription: string;
  features: string[];
  techStack: TechStackItem[];
  previewImage: string;
  screenshots?: string[];
  links: ProjectLinks;
}
