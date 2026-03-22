<!--
SYNC IMPACT REPORT
==================
Version change: (none — initial ratification) → 1.0.0
Modified principles: N/A — first-time population from blank template
Added sections:
  - Core Principles (9 principles defined)
  - Tech Stack & Tooling (locked stack + code quality gates)
  - Git & Workflow Conventions
  - Governance
Removed sections: none (template placeholders replaced)
Templates updated:
  ✅ .specify/memory/constitution.md — this file (initial ratification)
  ✅ .specify/templates/plan-template.md — Constitution Check gates populated
  ⚠ .specify/templates/spec-template.md — no changes required (generic structure fits)
  ⚠ .specify/templates/tasks-template.md — no changes required (generic structure fits)
Follow-up TODOs:
  - TODO(PRD_DOCUMENT): User references a PRD document for exact section content and
    design specs — file location in repo not yet specified. Add path once created.
-->

# MAZ Portfolio Constitution

## Core Principles

### I. TypeScript Strictness (NON-NEGOTIABLE)

All TypeScript MUST be written in strict mode. Zero `any` types are permitted —
every data shape MUST be defined as a typed interface in `src/lib/types/`. Zero
`@ts-ignore` or `@ts-expect-error` directives are allowed anywhere in the codebase.
Code MUST compile with zero TypeScript errors before any PR is merged.

**Rationale**: Type safety is the primary guard against runtime errors. Weakening
strict mode defeats its purpose and silently increases long-term maintenance cost.

### II. Constants-First Architecture (NON-NEGOTIABLE)

All display text and portfolio data MUST be externalized to typed constants in
`src/lib/constants/`. Zero hardcoded string literals are permitted inside component
files — `grep` for inline strings in `src/components/` MUST return zero results.
Every constant file MUST export a typed array or object whose shape references an
interface from `src/lib/types/`.

**Rationale**: Centralizing content makes the portfolio updatable without touching
component logic, enables type-checked content changes, and enforces a single source
of truth for all visible information.

### III. Design System Fidelity (NON-NEGOTIABLE)

All colors MUST be referenced via Tailwind CSS utility classes or CSS custom
properties — zero hardcoded hex, `rgb()`, or `rgba()` literals are permitted inside
component files. All spacing, typography, and border-radius MUST use the defined
Tailwind scale. The `cn()` utility MUST be used for all conditional class
construction. Every component MUST render correctly in both dark mode and light mode.

**Rationale**: Hardcoded design tokens create drift between theme variants and make
global changes brittle. Token-based styling ensures the dark/light toggle works
uniformly across every surface without per-component overrides.

### IV. Accessibility — WCAG AA (NON-NEGOTIABLE)

Every page structure MUST use semantic HTML5 elements: `header`, `nav`, `main`,
`section`, `footer`. All images MUST carry descriptive `alt` text. All icon-only
interactive elements MUST have an `aria-label`. All rendered color pairs MUST meet
WCAG AA contrast ratios (≥4.5:1 for body text, ≥3:1 for large text). Focus states
MUST be visible via `ring-2 ring-accent-blue` on all interactive elements. Form
inputs MUST have programmatically associated labels. The `prefers-reduced-motion`
media query MUST disable all Framer Motion animations globally.

**Rationale**: Accessibility is a professional engineering standard. A developer
portfolio that fails accessibility benchmarks directly undermines the quality signal
it is intended to project.

### V. Performance — Lighthouse ≥90 (NON-NEGOTIABLE)

All images MUST be rendered via `next/image` with explicit `width`, `height`, and
`priority` on above-fold assets. Below-fold images MUST be lazy-loaded. The page
JavaScript bundle MUST NOT exceed 200 KB. No unused dependencies are permitted.
Dynamic imports MUST be applied to any component whose inclusion would breach the
bundle limit. Lighthouse MUST score ≥90 across all four categories (Performance,
Accessibility, Best Practices, SEO) before the site is considered shippable.

**Rationale**: Visitors judge the site within seconds. A slow or poorly scored
portfolio undermines credibility as a performance-conscious developer.

### VI. Animation Discipline

Every section MUST implement scroll-triggered entrance via Framer Motion `whileInView`
with `viewport={{ once: true }}`. Animation durations MUST stay within 0.3s–0.8s —
nothing slower. Card grids and lists MUST use `staggerChildren: 0.1`. Skill bars MUST
animate width from 0% to target% on viewport entry. Card hover MUST apply
`scale(1.02)` and an increased border glow. The hire-badge pulse MUST use a CSS
`@keyframes` animation (not Framer Motion) so it remains active independent of scroll
state. All animation variants MUST be defined in `src/lib/utils/motion-variants.ts`
— no inline variant objects inside component files.

**Rationale**: Centralized variant definitions make timing and easing changes a
single-file update and prevent visual inconsistency across sections.

### VII. Component Architecture

UI primitives (`Button`, `Badge`, `Card`, `ProgressBar`, `SectionHeading`, `Input`,
`Textarea`, `Container`, `AnimatedCounter`, `FilterTabs`, `TimelineItem`,
`ProjectCard`, `SkillCard`) MUST be atomic and context-unaware — they accept only
typed props and have no knowledge of application-level data or constants. Section
components MUST compose primitives with data imported from `src/lib/constants/`.
Prop drilling MUST NOT exceed 2 levels — React Context MUST be used when data needs
to flow deeper. No single file MUST exceed 200 lines; no single function MUST exceed
50 lines — split into smaller units when either limit is approached. Import order
MUST follow: React → external packages → internal `@/` aliases → relative imports
→ types → styles.

**Rationale**: Atomic primitives are independently reusable and verifiable. File and
function size limits prevent complexity accumulation and keep diffs reviewable.

### VIII. Mobile-First Responsive Design

All components MUST be authored mobile-first using Tailwind's responsive prefixes
(`sm:`, `md:`, `lg:`, `xl:`). The three defined breakpoints are:
- **Mobile**: 320px–767px — single column, hamburger nav, stacked cards
- **Tablet**: 768px–1279px — two columns where layout permits, reduced spacing
- **Desktop**: 1280px+ — full intended layout

The hamburger menu MUST render on mobile; the full navigation bar MUST render on
desktop. Hero floating badges MUST be hidden on mobile. No layout MUST break or
overflow at any standard viewport width.

**Rationale**: The majority of portfolio visitors arrive on mobile. Mobile-first
authoring ensures the primary experience is designed by intention, not patched in.

### IX. SEO & Metadata Completeness

Every page render MUST include: `<title>`, `<meta name="description">`, Open Graph
tags, Twitter Card tags, canonical URL, and JSON-LD structured data. `sitemap.xml`
and `robots.txt` MUST be present and accurate. The canonical page title MUST be:
`"Mohamed Abderraouf Zouaid | Flutter Mobile Developer — Portfolio"`. Semantic HTML5
structure MUST be present throughout to support search-engine crawler interpretation.

**Rationale**: SEO discoverability is a primary goal of a public portfolio. Missing
or malformed metadata silently degrades search ranking and social sharing previews.

## Tech Stack & Tooling

The following stack is LOCKED. No package outside this list MUST be added without
explicit owner approval and a corresponding constitution PATCH amendment:

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript 5 strict |
| Styling | Tailwind CSS v3+ with CSS custom properties |
| Animations | Framer Motion |
| Icons | Lucide React |
| Theme | next-themes (dark default, `class` strategy) |
| Forms | React Hook Form + Zod |
| Email | EmailJS or Formspree (no backend) |
| Font | next/font (self-hosted, preloaded) |
| Package manager | pnpm |
| Linting | ESLint + Prettier (enforced, no bypass) |
| Deployment | Vercel |

**Code Quality Gates** — all MUST pass before a PR is merged:

- Zero `console.log` statements in production code
- Zero `any` types, `@ts-ignore`, or `@ts-expect-error`
- Zero hardcoded string literals inside `src/components/` files
- Zero hardcoded hex or `rgba()` values inside `src/components/` files
- No file exceeds 200 lines; no function exceeds 50 lines
- All conditional Tailwind classes constructed via `cn()` utility
- Naming conventions enforced:
  - Files: `kebab-case`
  - Components: `PascalCase`
  - Constants: `camelCase`
  - Types/Interfaces: `PascalCase`
  - Custom hooks: `use`-prefixed `camelCase` (e.g., `useScrollSpy`)

## Git & Workflow Conventions

- **Commit format**: Conventional Commits — `feat:`, `fix:`, `style:`,
  `refactor:`, `docs:`, `chore:`
- **Branch naming**: `feature/section-name` for new sections,
  `fix/issue-description` for bug fixes
- **PR scope**: One section per PR during initial build phase
- **Agent rule**: Agents MUST read `constitution.md` before writing any code.
  Agents MUST consult the PRD document for exact section content and design
  specifications when details are not explicit in the spec.

## Governance

This constitution supersedes all other practices and conventions for the
maz-portfolio project. Any deviation from a NON-NEGOTIABLE principle requires a
constitution amendment — not a one-off exception comment in code.

**Amendment procedure**:

1. Author proposes change with rationale and migration plan in writing.
2. Owner (Mohamed Abderraouf Zouaid) reviews and approves.
3. Constitution version is incremented per the versioning policy below.
4. Dependent templates in `.specify/templates/` are updated in the same commit.
5. A new Sync Impact Report is prepended to this file.

**Versioning policy**:

- **MAJOR**: Backward-incompatible removal or redefinition of a NON-NEGOTIABLE
  principle.
- **MINOR**: New principle or section added; guidance materially expanded.
- **PATCH**: Clarifications, wording fixes, non-semantic refinements.

**Compliance review**: All PRs MUST verify the Constitution Check gates listed in
the feature `plan.md` before merge. Agents MUST re-run the Constitution Check after
Phase 1 design. Complexity violations (e.g., a component exceeding 200 lines where
justified) MUST be documented in the Complexity Tracking table of `plan.md`.

**Version**: 1.0.0 | **Ratified**: 2026-03-22 | **Last Amended**: 2026-03-22
