export interface SkillItem {
  name: string;
  percentage: number;
}

export interface SkillCategory {
  name: string;
  icon: string;
  accentColor: string;
  skills: SkillItem[];
}
