# Implementation Plan: Project Preview Gallery

**Branch**: `002-project-preview-gallery` | **Date**: 2026-03-22 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-project-preview-gallery/spec.md`

## Summary

Add an animated, scrollable screenshot gallery to each project card's preview area. Mobile app projects display screenshots inside 3D-parallax phone mockup frames; web projects use macOS-style browser frames. Galleries with >3 items auto-scroll in an infinite carousel with drag/swipe support and dot pagination. All animations respect `prefers-reduced-motion`.

## Technical Context

**Language/Version**: TypeScript 5 strict mode
**Primary Dependencies**: Next.js 16 (App Router), React 19, Framer Motion 12, Tailwind CSS v4, next/image
**Storage**: N/A (static images in `public/`)
**Testing**: Manual visual + `pnpm build` type-check
**Target Platform**: Web (SSG via Next.js on Vercel)
**Project Type**: UI feature added to existing single-page portfolio
**Performance Goals**: 60fps scroll/drag, CLS = 0 for gallery images, total JS ≤200KB
**Constraints**: No new npm dependencies; all existing locked packages suffice
**Scale/Scope**: 4 project cards × 3–5 screenshots each

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| # | Gate | Status |
|---|------|--------|
| 1 | All new data shapes defined as TypeScript interfaces in `src/lib/types/` | ✅ `ProjectScreenshots` interface added to `project.ts` |
| 2 | All display text/data planned for `src/lib/constants/` — zero inline strings in components | ✅ Screenshot paths added to `projects.ts` constants |
| 3 | All colors planned via Tailwind tokens or CSS custom properties — zero hardcoded hex | ✅ Frame colors use Tailwind gray-700/800/900 + accent tokens |
| 4 | Component uses semantic HTML5 structure; accessibility requirements addressed | ✅ `aria-label` on interactive frames, `alt` text on all images, `role="group"` on gallery |
| 5 | Images planned via `next/image`; bundle size impact considered (≤200 KB total) | ✅ All screenshots via `next/image` with explicit dimensions, lazy-loaded |
| 6 | Animation variants planned for `src/lib/utils/motion-variants.ts`; `prefers-reduced-motion` handled | ✅ `galleryFrameVariants` + `parallaxFrame` variants added; reduced-motion disables auto-scroll + entrance animations |
| 7 | Component is atomic/context-unaware OR is a section that composes primitives with constants | ✅ Gallery components are atomic (accept typed props only); ProjectCard composes them with constants |
| 8 | All layouts designed mobile-first; breakpoints (320/768/1280) verified | ✅ Mobile: 1.5 frames + swipe; Tablet: 2.5 frames; Desktop: 3 frames + parallax |
| 9 | SEO/metadata impact assessed for any new page or route | ✅ No new pages/routes — gallery is embedded in existing page |
| 10 | No unlisted package dependencies introduced | ✅ Zero new packages — uses Framer Motion, next/image, Tailwind (all existing) |

## Project Structure

### Documentation (this feature)

```text
specs/002-project-preview-gallery/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui-components.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── components/
│   └── ui/
│       └── gallery/
│           ├── index.ts                # Barrel export
│           ├── project-gallery.tsx      # Orchestrator: picks frame type, wraps carousel
│           ├── gallery-carousel.tsx     # Scroll engine: auto-scroll, drag, touch, dots
│           ├── gallery-dots.tsx         # Dot pagination indicators
│           ├── phone-frame.tsx          # Mobile device mockup frame
│           ├── browser-frame.tsx        # macOS browser mockup frame
│           └── desktop-frame.tsx        # Desktop window mockup frame (future-proof)
├── lib/
│   ├── types/
│   │   └── project.ts                  # Updated: add ProjectScreenshots interface
│   ├── constants/
│   │   └── projects.ts                 # Updated: add screenshots data per project
│   ├── hooks/
│   │   └── use-auto-scroll.ts          # New: rAF-based auto-scroll hook
│   └── utils/
│       └── motion-variants.ts          # Updated: add gallery animation variants
└── public/
    └── images/
        └── projects/
            ├── trust-laundry/          # screen-1.png ... screen-N.png
            ├── deliveryx-driver/
            ├── esidea/
            └── comerco/
```

**Structure Decision**: New gallery components live in `src/components/ui/gallery/` as atomic UI primitives. The `useAutoScroll` hook joins existing hooks in `src/lib/hooks/`. Existing files (`project.ts`, `projects.ts`, `motion-variants.ts`, `project-card.tsx`) receive additive updates.

## Complexity Tracking

No constitution violations. All gates pass.
