# Tasks: Project Preview Gallery

**Input**: Design documents from `/specs/002-project-preview-gallery/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Not requested in the specification. Test tasks are omitted.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Data Layer Updates)

**Purpose**: Extend the existing project data model and constants with screenshot support

- [x] T001 Update src/lib/types/project.ts to add ProjectScreenshots interface ({ platform: "mobile" | "web" | "desktop", images: string[] }) and add optional screenshots field to Project interface
- [x] T002 Update src/lib/constants/projects.ts to add screenshots data for all 4 projects: Trust Laundry (mobile, 5 screens), DeliveryX Driver (mobile, 5 screens), Esidea (web, 3 screens), Comerco (mobile, 5 screens) with paths under /images/projects/{slug}/
- [x] T003 Create placeholder screenshot images in public/images/projects/{trust-laundry,deliveryx-driver,esidea,comerco}/ directories (screen-1.png through screen-N.png)

**Checkpoint**: `pnpm build` passes. Project data includes screenshots. Placeholder images exist.

---

## Phase 2: Foundational (Gallery Components)

**Purpose**: Build all atomic gallery components that user stories depend on

**⚠️ CRITICAL**: No user story integration can begin until these components exist

### Frame Components (all parallelizable)

- [x] T004 [P] Create src/components/ui/gallery/phone-frame.tsx: dark bezel mockup (rounded-[28px] bg-gray-900 border-gray-700), inner notch decoration, next/image with fill + objectFit cover + quality 85, Framer Motion whileHover={{ y: -4, scale: 1.03 }} with increased shadow, responsive sizes (140×300 desktop, 120×260 tablet, 110×240 mobile), reduced-motion disables hover per contracts/ui-components.md
- [x] T005 [P] Create src/components/ui/gallery/browser-frame.tsx: macOS-style window with title bar (red/yellow/green dots), rounded-xl top, optional title text in title bar, aspect-[16/10] image area with next/image fill, whileHover={{ y: -4 }} + shadow, scales to card width per contracts/ui-components.md
- [x] T006 [P] Create src/components/ui/gallery/desktop-frame.tsx: future-proof shell with squared top corners (rounded-sm), title bar with minimize/maximize/close rectangles, same image and hover behavior as BrowserFrame per contracts/ui-components.md
- [x] T007 [P] Create src/components/ui/gallery/gallery-dots.tsx: receives total + current + onDotClick props, renders centered dot row, active dot bg-accent-blue scale-125, inactive bg-gray-600, clickable dots trigger onDotClick per contracts/ui-components.md

### Hook and Variants

- [x] T008 [P] Create src/lib/hooks/use-auto-scroll.ts: rAF-based auto-scroll hook accepting containerRef + speed (default 30px/sec) + enabled, returns { pause, resume, isScrolling }, handles seamless loop reset at cloned boundary, checks prefers-reduced-motion to force disable, pauses when offscreen via IntersectionObserver, cleanup on unmount per contracts/ui-components.md
- [x] T009 [P] Update src/lib/utils/motion-variants.ts to add galleryFrameVariants (hidden: opacity 0 y 20, visible: custom delay i*0.1 + duration 0.4 easeOut) and parallaxFrame variants (center: scale 1 zIndex 10 rotateY 0, left: scale 0.88 rotateY 5 opacity 0.8, right: scale 0.88 rotateY -5 opacity 0.8) with shouldReduceMotion returning static values

### Barrel Export

- [x] T010 Create src/components/ui/gallery/index.ts barrel exporting ProjectGallery, PhoneFrame, BrowserFrame, DesktopFrame, GalleryCarousel, GalleryDots

**Checkpoint**: All frame components render in isolation. Hook works. Motion variants defined. `pnpm build` passes.

---

## Phase 3: User Story 1 — Static Screenshot Display in Device Frames (Priority: P1) 🎯 MVP

**Goal**: Each project card displays screenshots inside correct device frame type with 3D parallax depth for mobile and macOS frame for web.

**Independent Test**: Open Projects section. Phone frames show 3D parallax depth. Browser frames show macOS dots. Hover lifts frames. Projects with ≤3 screenshots show all statically with no scrollbar.

### Implementation for User Story 1

- [x] T011 [US1] Create src/components/ui/gallery/project-gallery.tsx: receives screenshots (ProjectScreenshots) + projectTitle props, switch on platform to render PhoneFrame/BrowserFrame/DesktopFrame children, mobile platform: perspective-[1000px] container with center frame at scale-1 z-10 and adjacent frames at scale-0.88 rotateY(±5deg) opacity-0.8 using parallaxFrame variants, web/desktop: single full-width frame, if images empty show placeholder or hide, entrance animation: whileInView fade-in-up container + staggered frames (galleryFrameVariants) per contracts/ui-components.md
- [x] T012 [US1] Update src/components/ui/project-card.tsx to replace static preview area with <ProjectGallery screenshots={project.screenshots} projectTitle={project.title} />, gallery inherits rounded-t-xl for top corners, bg-card-hover background, fixed height (h-[280px] mobile, h-[220px] web) to prevent card height jumping
- [x] T013 [US1] Verify projects with ≤3 screenshots display all frames statically (no carousel, no dots, no scrollbar) — adjust ProjectGallery to center frames with gap in static mode

**Checkpoint**: All 4 project cards show screenshots in correct device frames. 3D parallax visible on mobile projects. Browser frame with macOS dots on Esidea. Hover effects work. No carousel yet.

---

## Phase 4: User Story 2 — Carousel Auto-Scroll and Manual Navigation (Priority: P2)

**Goal**: Galleries with >3 screenshots auto-scroll in infinite loop with drag/swipe and dot pagination.

**Independent Test**: Projects with 5 screenshots auto-scroll smoothly. Hover pauses. Drag scrolls. Swipe on touch. Dots update. Projects with ≤3 screenshots remain static.

### Implementation for User Story 2

- [x] T014 [US2] Create src/components/ui/gallery/gallery-carousel.tsx: receives children + itemCount + autoScroll (default true) + className props, horizontal flex container with overflow-x hidden + no visible scrollbar (CSS scrollbar-width: none + ::-webkit-scrollbar display: none), clones first 3 and last 3 children for infinite loop, integrates useAutoScroll hook for 30px/sec auto-scroll, Framer Motion drag="x" with dragConstraints from scrollable width + dragElastic 0.1, onDragStart pauses auto-scroll, onDragEnd applies velocity momentum + recalculates currentIndex + resumes auto-scroll after 1.5s, tracks currentIndex via Math.round(scrollLeft/itemWidth), renders GalleryDots below with total + current + onDotClick that smooth-scrolls to index, non-scrollable mode (itemCount ≤ threshold): disables all scroll behavior + hides dots + centers children per contracts/ui-components.md
- [x] T015 [US2] Update src/components/ui/gallery/project-gallery.tsx to wrap frame children in GalleryCarousel when images.length > 3 (mobile) or images.length > 1 (web/desktop), pass autoScroll={true} for desktop, pass itemCount={images.length}
- [x] T016 [US2] Add CSS utility for hiding scrollbar in src/app/globals.css: .scrollbar-hide class with scrollbar-width: none and ::-webkit-scrollbar { display: none }
- [x] T017 [US2] Test auto-scroll pause/resume: verify hover pauses immediately, mouse leave resumes after 1.5s, touch interaction pauses, touch end resumes after 1.5s delay

**Checkpoint**: Projects with 5 screenshots auto-scroll infinitely. Hover pauses. Drag/swipe works with momentum. Dots paginate. No visible scrollbar. Projects with ≤3 remain static.

---

## Phase 5: User Story 3 — Entrance Animations and Responsive Layout (Priority: P3)

**Goal**: Gallery animates on viewport entry with staggered frames. Layout adapts to mobile/tablet/desktop breakpoints.

**Independent Test**: Scroll Projects into view — gallery fades in with staggered frames. Resize to 320px — 1.5 phone frames visible. Resize to 768px — 2.5 frames. Desktop shows full 3 frames.

### Implementation for User Story 3

- [x] T018 [US3] Update src/components/ui/gallery/project-gallery.tsx to apply responsive frame sizing: phone frames w-[110px] h-[240px] on mobile (<768px), w-[120px] h-[260px] on tablet (768–1279px), w-[140px] h-[300px] on desktop (1280px+), browser frames full card width at all sizes, use Tailwind responsive prefixes or useMediaQuery hook
- [x] T019 [US3] Update src/components/ui/gallery/gallery-carousel.tsx responsive behavior: mobile shows 1.5 phone frames with swipe primary, tablet shows 2.5 frames, desktop shows 3 frames, auto-scroll disabled on touch-only devices (detect via matchMedia('(hover: none)'))
- [x] T020 [US3] Verify entrance animation: ProjectGallery container uses whileInView + viewport={{ once: true }} for fade-in-up, individual frames use galleryFrameVariants with custom index for stagger delay 0.1s each, reduced motion returns static final state per motion-variants.ts

**Checkpoint**: Gallery responsive across all 3 breakpoints. Entrance animations fire once with stagger. Reduced motion shows static display. All breakpoints tested.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Edge cases, optimization, and quality pass

- [x] T021 Handle empty screenshots gracefully: if project.screenshots is undefined or images is empty, ProjectGallery renders nothing or subtle placeholder — no errors, no layout shift
- [x] T022 Handle image load failures: add onError fallback to next/image in all frame components — show neutral placeholder bg-gray-800 with icon, preserve frame dimensions
- [x] T023 Verify zero layout shift: all next/image instances have explicit width/height or fill with sized container, no CLS contribution from gallery
- [x] T024 Verify prefers-reduced-motion: auto-scroll disabled, entrance animations show final state, hover lift/scale disabled, gallery displays fully static
- [x] T025 Code quality gate: all gallery files under 200 lines, no hardcoded hex in components, no hardcoded strings, all conditional classes use cn(), import order correct, `pnpm build` passes with zero errors
- [x] T026 Update src/components/ui/gallery/index.ts barrel export to include all final components

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on T001 (types) — BLOCKS all user stories
- **User Stories (Phase 3–5)**: All depend on Foundational phase completion
  - US1 (P1): Can start after Phase 2 — no dependencies on other stories
  - US2 (P2): Depends on US1 (needs ProjectGallery to wrap with carousel)
  - US3 (P3): Depends on US1 (needs ProjectGallery to add responsive sizing)
- **Polish (Phase 6)**: Depends on all user stories being complete

### Within Each User Story

- Frame components → ProjectGallery → ProjectCard integration
- All data comes from constants (built in Phase 1)
- All animation variants available (built in Phase 2)

### Parallel Opportunities

- Phase 2 Frames: T004–T007 all parallel
- Phase 2 Hook + Variants: T008–T009 parallel
- Phase 2 Frames and Hook/Variants: T004–T009 all parallel (different files)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Data layer updates (types, constants, placeholder images)
2. Complete Phase 2: Frame components + hook + variants
3. Complete Phase 3: US1 — static gallery in project cards
4. **STOP and VALIDATE**: Cards show screenshots in device frames with parallax
5. Deploy preview if ready

### Incremental Delivery

1. Setup + Foundational → Components ready
2. Add US1 → Deploy (static device frame gallery)
3. Add US2 → Deploy (carousel + auto-scroll + drag)
4. Add US3 → Deploy (responsive + animations)
5. Polish → Deploy (edge cases + quality gate)

Each increment adds value without breaking previous stories.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- US2 and US3 depend on US1 (they extend ProjectGallery and GalleryCarousel)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- No test tasks generated (not requested in spec)
