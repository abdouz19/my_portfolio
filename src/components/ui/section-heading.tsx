import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  title: string;
  highlight?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  highlight,
  centered = false,
  className,
}: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "text-3xl font-bold md:text-4xl",
        centered && "text-center",
        className,
      )}
    >
      {title}
      {highlight && (
        <>
          {" "}
          <span className="text-accent-blue">{highlight}</span>
        </>
      )}
    </h2>
  );
}
