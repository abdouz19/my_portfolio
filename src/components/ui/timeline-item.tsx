import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface TimelineItemProps {
  title: string;
  company: string;
  type: string;
  period: string;
  isCurrent: boolean;
  responsibilities: string[];
}

export function TimelineItem({
  title,
  company,
  period,
  isCurrent,
  responsibilities,
}: TimelineItemProps) {
  return (
    <div className="relative pl-8">
      <div
        className={cn(
          "absolute left-0 top-1.5 h-3 w-3 rounded-full border-2",
          isCurrent
            ? "border-accent-blue bg-accent-blue"
            : "border-muted bg-card",
        )}
      />
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-lg font-bold">{title}</h3>
        <p
          className={cn(
            "text-sm",
            isCurrent ? "text-accent-blue" : "text-muted",
          )}
        >
          {company}
        </p>
        <span className="mt-1 inline-block rounded-full border border-border px-3 py-0.5 text-xs text-muted">
          {period}
        </span>
        <ul className="mt-3 space-y-2">
          {responsibilities.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-green" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
