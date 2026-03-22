# Implementation Plan: MAZ Portfolio — Full Site

**Branch**: `001-portfolio-full-site` | **Date**: 2026-03-22 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-portfolio-full-site/spec.md`

## Summary

Build a single-page portfolio website for Mohamed Abderraouf Zouaid (Flutter Mobile
Developer) using Next.js 14+ App Router with TypeScript strict mode. The site contains
10 sections (Navbar → Hero → About → Projects → Skills → Journey → Education →
Community → Contact → Footer) composed from atomic UI primitives and typed data
constants. All content is externalized; all colors use CSS custom properties via
Tailwind; all animations use centralized Framer Motion variants with
`prefers-reduced-motion` support. Contact form uses React Hook Form + Zod with
EmailJS/Formspree delivery and honeypot spam protection.

## Technical Context

**Language/Version**: TypeScript 5 strict mode (zero `any`, zero `@ts-ignore`)
**Primary Dependencies**: Next.js 14+ (App Router), React 18, Tailwind CSS v3+,
Framer Motion, next-themes, React Hook Form, Zod, Lucide React, clsx,
tailwind-merge, EmailJS or Formspree client SDK
**Storage**: N/A — static site, no database; content in typed constants
**Testing**: Manual Lighthouse audit + visual regression; no unit test framework
specified in constitution (tests optional per tasks template)
**Target Platform**: Web — all modern browsers, responsive 320px–1920px+
**Project Type**: Single-page web application (static portfolio)
**Performance Goals**: Lighthouse ≥90 all categories; JS bundle ≤200 KB; all
animations 0.3s–0.8s
**Constraints**: No backend; no analytics; pnpm only; Vercel deployment; locked
dependency list per constitution
**Scale/Scope**: 1 page, 10 sections, ~30 components, ~10 data constant files,
~6 type definition files, 4 custom hooks

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify the following against `.specify/memory/constitution.md` before proceeding:

| # | Gate | Status |
|---|------|--------|
| 1 | All new data shapes defined as TypeScript interfaces in `src/lib/types/` | ✅ Planned: project.ts, skill.ts, experience.ts, education.ts, community.ts, navigation.ts |
| 2 | All display text/data planned for `src/lib/constants/` — zero inline strings in components | ✅ Planned: 9 constant files in src/lib/constants/ |
| 3 | All colors planned via Tailwind tokens or CSS custom properties — zero hardcoded hex | ✅ CSS variables in globals.css, mapped in tailwind.config.ts |
| 4 | Component uses semantic HTML5 structure; accessibility requirements addressed | ✅ header/nav/main/section/footer planned; aria-labels, alt text, focus rings |
| 5 | Images planned via `next/image`; bundle size impact considered (≤200 KB total) | ✅ All images via next/image; dynamic imports if bundle exceeds limit |
| 6 | Animation variants planned for `src/lib/utils/motion-variants.ts`; `prefers-reduced-motion` handled | ✅ 4 variants centralized; reducedMotion guard returns static values |
| 7 | Component is atomic/context-unaware OR is a section that composes primitives with constants | ✅ UI primitives in components/ui/; sections compose primitives + constants |
| 8 | All layouts designed mobile-first; breakpoints (320/768/1280) verified | ✅ Mobile-first Tailwind; hamburger <768px; 2-col 768px+; full 1280px+ |
| 9 | SEO/metadata impact assessed for any new page or route | ✅ Single page: metadata in layout.tsx, JSON-LD, sitemap.xml, robots.txt |
| 10 | No unlisted package dependencies introduced | ✅ All deps from locked list: next, react, tailwindcss, framer-motion, next-themes, react-hook-form, zod, lucide-react, clsx, tailwind-merge |

All gates pass. No violations to document.

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-full-site/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (UI component contracts)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx                  # Root layout: ThemeProvider + Navbar + main + Footer + ScrollToTop
│   ├── page.tsx                    # Single page composing all section components
│   └── globals.css                 # CSS custom properties (dark/light), Tailwind directives, pulse keyframe
├── components/
│   ├── layout/
│   │   ├── navbar.tsx              # Sticky nav with scroll spy, hamburger, theme toggle
│   │   ├── footer.tsx              # Copyright bar with top border
│   │   ├── theme-provider.tsx      # next-themes ThemeProvider wrapper (client component)
│   │   └── scroll-to-top.tsx       # Fixed FAB, appears after 500px scroll
│   ├── sections/
│   │   ├── hero-section.tsx        # Two-column: identity + profile image
│   │   ├── about-section.tsx       # Bio + stats + info cards
│   │   ├── projects-section.tsx    # Filter tabs + project card grid + modal
│   │   ├── skills-section.tsx      # 2×2 skill category cards with progress bars
│   │   ├── journey-section.tsx     # Vertical timeline
│   │   ├── education-section.tsx   # Degree cards + certification badges
│   │   ├── community-section.tsx   # Two org cards side by side
│   │   └── contact-section.tsx     # Contact form + info column
│   └── ui/
│       ├── button.tsx              # Variants: primary/outline/ghost/gradient; loading state
│       ├── badge.tsx               # Variants: default/colored with brand color prop
│       ├── card.tsx                # bg-card rounded-xl border with hover glow
│       ├── section-heading.tsx     # Two-tone title (white + blue highlight)
│       ├── container.tsx           # max-w-7xl mx-auto px-4
│       ├── input.tsx               # forwardRef, label, error display, focus ring
│       ├── textarea.tsx            # Same pattern as Input, multiline
│       ├── progress-bar.tsx        # Animated fill bar with color prop
│       ├── animated-counter.tsx    # Count-up on viewport entry
│       ├── filter-tabs.tsx         # Category tab buttons with active state
│       ├── timeline-item.tsx       # Timeline dot + card for journey entries
│       ├── project-card.tsx        # Preview image + metadata + tech badges + detail button
│       ├── skill-card.tsx          # Category card wrapping skill rows + progress bars
│       └── project-modal.tsx       # Overlay with expanded project detail, ESC/click-outside dismiss
├── lib/
│   ├── constants/
│   │   ├── navigation.ts           # Nav links: label + anchor href
│   │   ├── social-links.ts         # Platform name + URL + icon identifier
│   │   ├── projects.ts             # 4 projects with full metadata
│   │   ├── skills.ts               # 4 categories with skill items + percentages
│   │   ├── experience.ts           # 3 timeline entries
│   │   ├── education.ts            # 2 degrees + 2 certifications
│   │   ├── community.ts            # 2 organizations
│   │   ├── contact-info.ts         # Email, phone, location
│   │   └── site-metadata.ts        # Title, description, OG tags, canonical URL
│   ├── types/
│   │   ├── project.ts              # Project, TechStackItem, ProjectCategory
│   │   ├── skill.ts                # SkillCategory, SkillItem
│   │   ├── experience.ts           # ExperienceEntry
│   │   ├── education.ts            # EducationEntry, CertificationEntry
│   │   ├── community.ts            # CommunityOrganization
│   │   └── navigation.ts           # NavItem, SocialLink, ContactInfo, SiteMetadata
│   ├── hooks/
│   │   ├── use-scroll-spy.ts       # IntersectionObserver on section IDs → active section
│   │   ├── use-in-view.ts          # Generic viewport detection with once/threshold options
│   │   └── use-media-query.ts      # matchMedia wrapper → boolean
│   └── utils/
│       ├── cn.ts                   # clsx + tailwind-merge
│       └── motion-variants.ts      # fadeInUp, fadeInLeft, staggerContainer, scaleIn + reducedMotion guard
└── public/
    ├── images/                     # Profile photo, project mockups, community logos
    └── files/
        └── cv.pdf                  # Downloadable CV

# Root config files
tailwind.config.ts                  # Extend theme with CSS variable color mappings
next.config.mjs                     # Next.js config (images domains if needed)
tsconfig.json                       # Strict mode, path aliases @/
.eslintrc.json                      # ESLint config
.prettierrc                         # Prettier config
package.json                        # pnpm, all locked dependencies
```

**Structure Decision**: Single-project Next.js App Router structure. All source code
under `src/` with `@/` path alias. Components split into three layers: `ui/` (atomic
primitives), `sections/` (page sections composing primitives + constants), `layout/`
(structural shell). Data layer fully separated into `lib/constants/` + `lib/types/`.

## Complexity Tracking

> No constitution violations detected. Table intentionally empty.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (none)    | —          | —                                   |
