# UI Component Contracts: MAZ Portfolio

**Branch**: `001-portfolio-full-site` | **Date**: 2026-03-22

This document defines the prop interfaces and behavioral contracts for all shared
UI components in `src/components/ui/`. These components are atomic — they accept only
typed props and have zero knowledge of application data or constants.

---

## Button

**File**: `src/components/ui/button.tsx`

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  asChild?: boolean; // render as <a> or other element
}
```

**Behavior**:
- `variant="primary"`: filled accent-blue background, white text.
- `variant="outline"`: transparent bg, border, accent text.
- `variant="ghost"`: no border, subtle hover bg.
- `variant="gradient"`: red-to-pink gradient bg (used for Send Message).
- `loading=true`: shows spinner icon, disables click, preserves button width.
- `asChild=true`: renders children as the root element (for wrapping `<a>` tags).
- Focus: `ring-2 ring-accent-blue ring-offset-2`.

---

## Badge

**File**: `src/components/ui/badge.tsx`

```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "colored";
  color?: string; // Tailwind color classes (e.g., "text-green-500 bg-green-500/10")
  className?: string;
}
```

**Behavior**:
- `variant="default"`: muted bg, muted text, rounded-full pill.
- `variant="colored"`: uses `color` prop classes for text and background tint.
- Always renders as `<span>` with `text-xs font-medium px-2.5 py-0.5 rounded-full`.

---

## Card

**File**: `src/components/ui/card.tsx`

```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean; // enable hover scale + glow (default: true)
}
```

**Behavior**:
- Base: `bg-card rounded-xl border border-border p-6`.
- `hover=true` (default): `hover:scale-[1.02] hover:border-glow transition-all`.
- All styling via `cn()` utility for conditional merging.

---

## SectionHeading

**File**: `src/components/ui/section-heading.tsx`

```typescript
interface SectionHeadingProps {
  title: string;
  highlight?: string; // renders in accent blue after title
  centered?: boolean; // default: false (left-aligned)
  className?: string;
}
```

**Behavior**:
- Renders `<h2>` with title in primary text color.
- If `highlight` provided, appends it in accent-blue after a space.
- `centered=true`: adds `text-center` class.
- Typography: `text-3xl md:text-4xl font-bold`.

---

## Container

**File**: `src/components/ui/container.tsx`

```typescript
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}
```

**Behavior**:
- Wraps children in `<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">`.
- `className` merged via `cn()` for overrides.

---

## Input

**File**: `src/components/ui/input.tsx`

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
```

**Behavior**:
- Renders `<label>` + `<input>` pair with programmatic association (htmlFor/id).
- Required fields show `*` after label text.
- Error state: red border + error message `<p>` below input.
- Focus: `ring-2 ring-accent-blue`.
- Uses `React.forwardRef` for React Hook Form `register()` compatibility.

---

## Textarea

**File**: `src/components/ui/textarea.tsx`

```typescript
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}
```

**Behavior**: Same contract as Input but renders `<textarea>` with `rows={5}` default.

---

## ProgressBar

**File**: `src/components/ui/progress-bar.tsx`

```typescript
interface ProgressBarProps {
  percentage: number; // 0–100
  color: string; // Tailwind bg class (e.g., "bg-purple-500")
  className?: string;
}
```

**Behavior**:
- Track: `h-2 rounded-full bg-muted` (full width).
- Fill: inner div with `color` class, width animated from 0% → `percentage%` via
  Framer Motion `whileInView`, `viewport={{ once: true }}`, duration 0.8s.
- Reduced motion: width set instantly, no animation.

---

## AnimatedCounter

**File**: `src/components/ui/animated-counter.tsx`

```typescript
interface AnimatedCounterProps {
  target: number;
  suffix?: string; // e.g., "+"
  duration?: number; // seconds, default 1.5
  className?: string;
}
```

**Behavior**:
- On first viewport entry (via `useInView`, once): counts from 0 to `target` over
  `duration` using `requestAnimationFrame`.
- Displays `Math.floor(currentValue)` + `suffix` (e.g., "8+").
- Reduced motion: shows final value immediately, no counting animation.

---

## FilterTabs

**File**: `src/components/ui/filter-tabs.tsx`

```typescript
interface FilterTabsProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (category: string) => void;
}
```

**Behavior**:
- Renders a row of buttons, one per category.
- Active tab: filled accent-blue bg, white text.
- Inactive tabs: outline style with muted text.
- Clicking a tab calls `onFilterChange(category)`.
- Tab list is horizontal, wraps on mobile.

---

## TimelineItem

**File**: `src/components/ui/timeline-item.tsx`

```typescript
interface TimelineItemProps {
  title: string;
  company: string;
  type: string;
  period: string; // formatted "startDate — endDate"
  isCurrent: boolean;
  responsibilities: string[];
}
```

**Behavior**:
- Renders relative to parent timeline container.
- Dot: absolute-positioned on left line — `bg-accent-blue` if `isCurrent`,
  `bg-muted` if past.
- Card: title bold, company in accent-blue if current, period as rounded pill badge,
  responsibilities as bullet list with green check icons.

---

## ProjectCard

**File**: `src/components/ui/project-card.tsx`

```typescript
interface ProjectCardProps {
  project: Project; // from src/lib/types/project.ts
  onDetailClick: (project: Project) => void;
}
```

**Behavior**:
- Preview image area with `next/image`, `rounded-t-xl`.
- Category badge (colored by `project.category`).
- Title, description (`line-clamp-2`), "KEY FEATURES" label + feature Badge pills.
- Tech stack row: colored Badge per tech item.
- Detail icon button (top-right): calls `onDetailClick(project)` to open modal.
- Hover: `scale(1.02)` + border glow increase.

---

## SkillCard

**File**: `src/components/ui/skill-card.tsx`

```typescript
interface SkillCardProps {
  category: SkillCategory; // from src/lib/types/skill.ts
}
```

**Behavior**:
- Card wrapper with category icon (colored by `category.accentColor`) and title.
- Maps `category.skills` → rows of: skill name, percentage label, ProgressBar.
- Each ProgressBar uses `category.accentColor` for fill color.

---

## ProjectModal

**File**: `src/components/ui/project-modal.tsx`

```typescript
interface ProjectModalProps {
  project: Project | null; // null = closed
  onClose: () => void;
}
```

**Behavior**:
- When `project` is non-null, renders overlay backdrop + centered modal panel.
- Content: full description, screenshots (if available), complete feature list,
  full tech stack, external links (GitHub, live demo) as buttons.
- Dismiss: close button (top-right), Escape key, click on backdrop.
- Focus trap: Tab cycles within modal; focus returns to trigger on close.
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to project title.
- Animated entry/exit via Framer Motion `AnimatePresence`.
- Background scroll locked when open.
