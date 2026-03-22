"use client";

import { iconMap } from "@/lib/utils/icon-map";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { type SkillCategory } from "@/lib/types/skill";

interface SkillCardProps {
  category: SkillCategory;
}

export function SkillCard({ category }: SkillCardProps) {
  const IconComponent = iconMap[category.icon];

  return (
    <Card>
      <div className="mb-4 flex items-center gap-3">
        {IconComponent && (
          <div className="rounded-lg bg-card-hover p-2">
            <IconComponent className={`h-5 w-5 ${category.accentColor.replace("bg-", "text-")}`} />
          </div>
        )}
        <h3 className="text-lg font-bold">{category.name}</h3>
      </div>
      <div className="space-y-4">
        {category.skills.map((skill) => (
          <div key={skill.name}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-sm">{skill.name}</span>
              <span className="text-sm text-muted">{skill.percentage}%</span>
            </div>
            <ProgressBar
              percentage={skill.percentage}
              color={category.accentColor}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
