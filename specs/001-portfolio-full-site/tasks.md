# Tasks: MAZ Portfolio — Full Site

**Input**: Design documents from `/specs/001-portfolio-full-site/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Not explicitly requested in the specification. Test tasks are omitted.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Scaffold the Next.js project and configure all tooling

- [x] T001 Initialize Next.js 14+ project with App Router, TypeScript strict, pnpm in project root
- [x] T002 Install all locked dependencies: framer-motion, next-themes, react-hook-form, zod, lucide-react, clsx, tailwind-merge
- [x] T003 [P] Configure tailwind.config.ts with CSS variable color mappings for dark/light tokens and extend theme (accent-blue, accent-green, accent-purple, accent-teal, accent-orange, accent-red, background, card, foreground, muted, border, glow)
- [x] T004 [P] Configure tsconfig.json with strict mode and `@/` path alias pointing to `src/`
- [x] T005 [P] Configure .eslintrc.json and .prettierrc with enforced formatting rules
- [x] T006 Create src/app/globals.css with CSS custom properties for `:root` (light) and `.dark` (dark) color tokens, Tailwind directives (@tailwind base/components/utilities), and `@keyframes pulse` for hire badge animation
- [x] T007 Create src/app/layout.tsx with root HTML structure, metadata export (title, description, OG tags, Twitter Card, canonical URL from site-metadata constants), next/font setup, and ThemeProvider wrapper
- [x] T008 Create .env.example with placeholder EmailJS environment variables (NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)

**Checkpoint**: Project builds with `pnpm build`, zero TypeScript errors, dark theme renders correctly.

---

## Phase 2: Foundational (Data Layer + Utilities + UI Primitives)

**Purpose**: All types, constants, hooks, utilities, and atomic UI components that every user story depends on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Types (all parallelizable)

- [x] T009 [P] Create src/lib/types/navigation.ts with NavItem, SocialLink, ContactInfo, and SiteMetadata interfaces per data-model.md
- [x] T010 [P] Create src/lib/types/project.ts with Project, ProjectCategory union type, TechStackItem, and ProjectLinks interfaces per data-model.md
- [x] T011 [P] Create src/lib/types/skill.ts with SkillCategory and SkillItem interfaces per data-model.md
- [x] T012 [P] Create src/lib/types/experience.ts with ExperienceEntry interface per data-model.md
- [x] T013 [P] Create src/lib/types/education.ts with EducationEntry and CertificationEntry interfaces per data-model.md
- [x] T014 [P] Create src/lib/types/community.ts with CommunityOrganization interface per data-model.md

### Constants (all parallelizable, depend on types)

- [x] T015 [P] Create src/lib/constants/navigation.ts with typed NavItem array: About (#about), Projects (#projects), Skills (#skills), Achievements (#journey), Contact Me (#contact)
- [x] T016 [P] Create src/lib/constants/social-links.ts with typed SocialLink array: LinkedIn, GitHub, Email (mailto), Instagram — URLs as placeholders until provided
- [x] T017 [P] Create src/lib/constants/projects.ts with typed Project array: Trust Laundry, DeliveryX Driver, Esidea, Comerco — full metadata including descriptions, features, techStack with brand colors, preview image paths, and links per spec
- [x] T018 [P] Create src/lib/constants/skills.ts with typed SkillCategory array: Mobile Dev (purple, 4 skills), Web Dev (teal, 4 skills), Backend (green, 3 skills), Tools (orange, 3 skills) — all percentages per spec
- [x] T019 [P] Create src/lib/constants/experience.ts with typed ExperienceEntry array: 3 entries (Deepminds Ventures current, Freelance, GDG Algiers) with responsibilities per spec
- [x] T020 [P] Create src/lib/constants/education.ts with typed EducationEntry array (2 degrees) and CertificationEntry array (2 certs) per spec
- [x] T021 [P] Create src/lib/constants/community.ts with typed CommunityOrganization array: GDG (teal, code icon), School of AI (purple, brain icon) per spec
- [x] T022 [P] Create src/lib/constants/contact-info.ts with typed ContactInfo object: email, phone, location per spec
- [x] T023 [P] Create src/lib/constants/site-metadata.ts with typed SiteMetadata object: page title "Mohamed Abderraouf Zouaid | Flutter Mobile Developer — Portfolio", description, OG image path, canonical URL placeholder

### Utilities (parallelizable)

- [x] T024 [P] Create src/lib/utils/cn.ts exporting cn() function using clsx + twMerge from tailwind-merge
- [x] T025 [P] Create src/lib/utils/motion-variants.ts with fadeInUp, fadeInLeft, staggerContainer, scaleIn variants — include shouldReduceMotion boolean check via window.matchMedia('(prefers-reduced-motion: reduce)') that returns static values when true

### Hooks (parallelizable)

- [x] T026 [P] Create src/lib/hooks/use-scroll-spy.ts: accepts sectionIds string array, uses IntersectionObserver with threshold 0.3, returns activeSection string, cleans up on unmount
- [x] T027 [P] Create src/lib/hooks/use-in-view.ts: accepts ref and options (once, threshold), returns boolean isInView via IntersectionObserver
- [x] T028 [P] Create src/lib/hooks/use-media-query.ts: accepts query string, uses matchMedia listener, returns boolean match state

### UI Primitives (parallelizable, depend on cn.ts)

- [x] T029 [P] Create src/components/ui/container.tsx: max-w-7xl mx-auto px-4 wrapper per contracts/ui-components.md
- [x] T030 [P] Create src/components/ui/button.tsx: variants (primary/outline/ghost/gradient), sizes (sm/md/lg), icon support, loading spinner, asChild support, focus ring per contracts/ui-components.md
- [x] T031 [P] Create src/components/ui/badge.tsx: variants (default/colored), color prop for brand colors, rounded-full pill per contracts/ui-components.md
- [x] T032 [P] Create src/components/ui/card.tsx: bg-card rounded-xl border with optional hover scale+glow per contracts/ui-components.md
- [x] T033 [P] Create src/components/ui/section-heading.tsx: title + optional highlight (accent blue), centered prop, text-3xl md:text-4xl font-bold per contracts/ui-components.md
- [x] T034 [P] Create src/components/ui/input.tsx: forwardRef, label with required asterisk, error display, focus ring, React Hook Form compatible per contracts/ui-components.md
- [x] T035 [P] Create src/components/ui/textarea.tsx: same pattern as Input but renders textarea with rows=5 per contracts/ui-components.md
- [x] T036 [P] Create src/components/ui/progress-bar.tsx: track (h-2 rounded-full bg-muted) + animated fill bar using Framer Motion whileInView, viewport once, color prop per contracts/ui-components.md
- [x] T037 [P] Create src/components/ui/animated-counter.tsx: counts from 0 to target on viewport entry using requestAnimationFrame, suffix prop, useInView hook, reduced-motion shows final value per contracts/ui-components.md
- [x] T038 [P] Create src/components/ui/filter-tabs.tsx: categories array, activeFilter, onFilterChange callback, active tab filled blue, inactive outlined per contracts/ui-components.md
- [x] T039 [P] Create src/components/ui/timeline-item.tsx: dot (blue if current, gray if past), card with title, company, period badge, responsibilities with green checks per contracts/ui-components.md
- [x] T040 [P] Create src/components/ui/project-card.tsx: preview image (next/image), category badge, title, description (line-clamp-2), feature badges, tech stack badges, detail icon button with onDetailClick callback per contracts/ui-components.md
- [x] T041 [P] Create src/components/ui/skill-card.tsx: Card wrapper with category icon, title, mapped skill rows with ProgressBar per contracts/ui-components.md
- [x] T042 [P] Create src/components/ui/project-modal.tsx: overlay + centered panel, full project detail, dismiss via close/Escape/backdrop click, focus trap, role=dialog, aria-modal, AnimatePresence, scroll lock per contracts/ui-components.md

**Checkpoint**: All types compile, all constants export valid typed data, all UI primitives render in isolation. `pnpm build` passes.

---

## Phase 3: User Story 1 — First Impression & Identity (Priority: P1) 🎯 MVP

**Goal**: Visitor lands on site and immediately sees identity, availability, navigation, and can download CV or navigate to any section.

**Independent Test**: Open site at any viewport width. Without scrolling: see full name, role, "AVAILABLE FOR HIRE" badge, working navigation. Click "Download CV" to download. Click any nav link to smooth-scroll.

### Implementation for User Story 1

- [x] T043 [US1] Create src/components/layout/theme-provider.tsx as client component wrapping next-themes ThemeProvider with attribute="class", defaultTheme="dark", enableSystem
- [x] T044 [US1] Create src/components/layout/navbar.tsx: fixed top z-50 backdrop-blur, "MAZ" brand link scrolling to #hero, mapped nav links from navigation.ts with smooth scroll, "Contact Me" outlined button scrolling to #contact, theme toggle (Lucide Sun/Moon), hamburger menu for mobile (<768px), useScrollSpy for active link highlighting
- [x] T045 [US1] Create src/components/layout/footer.tsx: border-t separator, centered copyright "© 2025 Mohamed Abderraouf Zouaid. All rights reserved." from constants, muted text, py-6
- [x] T046 [US1] Create src/components/layout/scroll-to-top.tsx: fixed bottom-right button, appears after 500px scroll, Lucide ChevronUp, accent-blue rounded-full, smooth scroll to top, Framer Motion fade in/out
- [x] T047 [US1] Create src/components/sections/hero-section.tsx: two-column grid (lg), left column — status badge (green pulse dot + "AVAILABLE FOR HIRE" pill), greeting "Hello, I'm", two-tone name display (white "Mohamed Abderraouf" + blue "ZOUAID"), "Flutter Mobile Developer" subtitle, bio paragraph from constants, "Download CV" button (href="/files/cv.pdf" download), "View Projects →" ghost button (scrolls to #projects), three social icon buttons from social-links.ts; right column — circular profile image (next/image, placeholder silhouette, blue ring glow), two floating decorative icon badges; Framer Motion staggered fadeInUp left + scaleIn right
- [x] T048 [US1] Update src/app/page.tsx to import and compose: HeroSection (with id="hero") as first section below Navbar
- [x] T049 [US1] Update src/app/layout.tsx to wrap page with ThemeProvider, include Navbar, main element, Footer, and ScrollToTop
- [x] T050 [US1] Add placeholder profile image to public/images/profile-placeholder.png and placeholder CV to public/files/cv.pdf
- [x] T051 [US1] Add JSON-LD structured data script to layout.tsx: Person schema with name, jobTitle, url, sameAs (social links) from constants

**Checkpoint**: Site loads with Navbar + Hero + Footer. Name, role, hire badge visible without scrolling. Nav links target correct anchors (sections not yet built will scroll to empty targets). CV downloads. Theme toggle switches dark/light with persistence. Responsive on mobile.

---

## Phase 4: User Story 2 — Project Portfolio Exploration (Priority: P2)

**Goal**: Visitor browses projects, filters by category, views expanded project detail in modal.

**Independent Test**: Scroll to Projects section. See 4 project cards. Click "Mobile App" tab — only 3 mobile cards show. Click detail icon — modal opens with full info. Close modal with Escape. Click "View More on GitHub" — opens new tab.

### Implementation for User Story 2

- [x] T052 [US2] Create src/components/sections/projects-section.tsx: SectionHeading("Featured", "Projects"), subtitle, FilterTabs with dynamically derived categories from projects.ts (["All", ...unique categories]), state for activeFilter (default "All"), filtered project grid (2-col desktop, 1-col mobile), AnimatePresence for filter transitions, map filtered projects to ProjectCard with onDetailClick, state for selectedProject, ProjectModal with selected project + onClose, "View More on GitHub" Button at bottom linking to GitHub profile
- [x] T053 [US2] Update src/app/page.tsx to add ProjectsSection with id="projects" after HeroSection

**Checkpoint**: Projects section renders all 4 cards. Filter tabs are "All", "Mobile App", "Web App" (no "AI/ML" since no projects in that category). Filtering animates correctly. Modal opens/closes with full detail. Keyboard dismiss works. GitHub link opens.

---

## Phase 5: User Story 3 — Skills Assessment (Priority: P3)

**Goal**: Visitor sees four skill category cards with animated progress bars showing proficiency levels.

**Independent Test**: Scroll to Skills section. See 4 category cards. Progress bars animate from 0% to target on first viewport entry. Values match spec data.

### Implementation for User Story 3

- [x] T054 [US3] Create src/components/sections/skills-section.tsx: SectionHeading("Technical", "Skills"), subtitle, 2×2 grid (responsive: 1-col mobile, 2-col tablet+), map skills.ts to SkillCard components, Framer Motion stagger container
- [x] T055 [US3] Update src/app/page.tsx to add SkillsSection with id="skills" after ProjectsSection

**Checkpoint**: Skills section shows all 4 categories with correct percentages. Bars animate once on scroll into view. Colors match category assignments.

---

## Phase 6: User Story 4 — Experience & Background Review (Priority: P4)

**Goal**: Visitor reviews professional timeline, education, certifications, and community involvement.

**Independent Test**: Scroll through Journey → Education → Community sections. See 3 timeline entries (first with blue dot), 2 degrees, 2 certs, 2 community cards. All data matches spec.

### Implementation for User Story 4

- [x] T056 [P] [US4] Create src/components/sections/journey-section.tsx: SectionHeading("Professional", "Journey"), relative timeline container with absolute left vertical line (w-0.5), map experience.ts to TimelineItem components in reverse chronological order, Framer Motion stagger fadeInLeft
- [x] T057 [P] [US4] Create src/components/sections/education-section.tsx: SectionHeading("Education & Certifications" — full white, no highlight), map education entries to stacked Cards with left blue border accent (degree bold, institution muted, period badge), certifications row below with gold shield icon (Lucide Award), cert name, provider + date, Framer Motion stagger fadeInUp
- [x] T058 [P] [US4] Create src/components/sections/community-section.tsx: SectionHeading("Community", "Involvement"), two side-by-side Cards from community.ts, each with colored icon area, org name bold, role description, "Event Organizer" green tag, Framer Motion fadeInUp stagger
- [x] T059 [US4] Update src/app/page.tsx to add JourneySection (id="journey"), EducationSection (id="education"), and CommunitySection (id="community") after SkillsSection

**Checkpoint**: Three new sections render in order. Timeline has blue dot on first entry. All data matches spec. Nav "Achievements" link scrolls to Journey section.

---

## Phase 7: User Story 5 — Contact & Collaboration (Priority: P5)

**Goal**: Visitor submits a message via contact form with validation, honeypot spam protection, and receives success/error feedback.

**Independent Test**: Navigate to Contact section. Submit empty form — validation errors appear. Fill all fields + submit — success message, form resets. See email/phone/location on right. Social card links work.

### Implementation for User Story 5

- [x] T060 [US5] Create src/components/sections/contact-section.tsx: SectionHeading("Get In Touch" — centered, no two-tone), subtitle centered, two-column grid (stacked on mobile); Left: ContactForm subcomponent — React Hook Form with Zod schema (fullName min 2, email .email(), subject min 2, message min 10), all fields required with * indicator, invisible honeypot field (position absolute, left -9999px, tabindex -1, autocomplete off), Input/Textarea UI components with labels/placeholders from constants, "Send Message" Button variant="gradient" (red-to-pink), onSubmit: check honeypot → call EmailJS/Formspree → loading state on button → success toast + reset() on success → error toast + preserve data on failure; Right: "Let's Connect" heading, intro paragraph, three contact detail rows mapped from contact-info.ts (Lucide Mail/Phone/MapPin), social card with "MAZ" brand + full name + "Flutter Mobile Developer" + social icons from social-links.ts; Framer Motion stagger
- [x] T061 [US5] Update src/app/page.tsx to add ContactSection with id="contact" after CommunitySection

**Checkpoint**: Contact form validates all fields. Honeypot hidden from real users. Submission sends (or shows error if env vars missing). Form resets on success. Contact info and social links display correctly. Footer appears below.

---

## Phase 8: User Story 6 — Accessibility & Theme (Priority: P6)

**Goal**: Full accessibility compliance and theme persistence with no flash.

**Independent Test**: Tab through every interactive element — all have visible focus rings. Toggle theme — persists across reload with no flash. Enable "reduce motion" in OS — all animations disabled. Screen reader: all images have alt, all icon buttons have aria-label.

### Implementation for User Story 6

- [x] T062 [US6] Accessibility audit pass on all section components: verify semantic HTML landmarks (header/nav/main/section/footer), add skip-to-content link at top of layout.tsx, verify all images have descriptive alt text, verify all icon-only buttons have aria-label, verify all form inputs have associated labels, verify focus ring-2 ring-accent-blue on all interactive elements
- [x] T063 [US6] Verify prefers-reduced-motion support: confirm motion-variants.ts returns static values when shouldReduceMotion is true, confirm AnimatedCounter shows final value immediately, confirm ProgressBar sets width without animation, test by enabling reduce-motion in browser devtools
- [x] T064 [US6] WCAG AA contrast audit: verify all text/background color pairs in both dark and light mode meet ≥4.5:1 for body text and ≥3:1 for large text, adjust CSS variables if any fail
- [x] T065 [US6] Verify theme persistence: confirm next-themes script prevents FOUC, confirm dark/light toggle state survives page reload, confirm no layout shift on theme change

**Checkpoint**: All keyboard navigation works. Focus indicators visible. Screen reader announces all interactive elements. Theme persists. Animations respect reduce-motion. WCAG AA contrast passes.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: SEO, performance, responsive fine-tuning, and final quality pass

- [x] T066 [P] Create src/app/sitemap.ts returning sitemap entries with canonical URL and lastModified date
- [x] T067 [P] Create src/app/robots.ts returning allow-all policy with sitemap reference
- [x] T068 Responsive audit: verify all 10 sections at 320px, 768px, 1280px breakpoints — no horizontal overflow, hamburger menu on mobile, proper column stacking, hero badges hidden on mobile
- [x] T069 Performance audit: run `pnpm build` and check bundle sizes, verify JS ≤200 KB, apply dynamic imports for ProjectModal and ContactForm if needed via next/dynamic with ssr: false
- [x] T070 Run Lighthouse audit on both desktop and mobile profiles — target ≥90 on all four categories, fix any flagged issues
- [x] T071 Final visual review: verify all section animations fire once on scroll, card hovers scale correctly, filter transitions are smooth, hire badge pulses continuously, stat counters reach final values
- [x] T072 Code quality gate: verify zero console.log in production code, zero @ts-ignore, zero hardcoded strings in src/components/ (grep verification), zero hardcoded hex in src/components/, no file exceeds 200 lines, import order follows convention

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3–8)**: All depend on Foundational phase completion
  - US1 (P1): Can start after Phase 2 — no dependencies on other stories
  - US2 (P2): Can start after Phase 2 — no dependencies on other stories
  - US3 (P3): Can start after Phase 2 — no dependencies on other stories
  - US4 (P4): Can start after Phase 2 — no dependencies on other stories
  - US5 (P5): Can start after Phase 2 — no dependencies on other stories
  - US6 (P6): Depends on US1–US5 completion (audits require all components present)
- **Polish (Phase 9)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (First Impression)**: MUST complete first — establishes layout.tsx, Navbar, Footer, ThemeProvider, page.tsx composition pattern
- **US2–US5**: Can proceed in any order after US1, but recommended in priority order
- **US6 (Accessibility)**: MUST be last user story — requires all components to audit

### Within Each User Story

- Section component created → added to page.tsx
- All data comes from constants (already built in Phase 2)
- All UI primitives available (already built in Phase 2)

### Parallel Opportunities

- Phase 2 Types: T009–T014 all parallel
- Phase 2 Constants: T015–T023 all parallel (after types)
- Phase 2 Utilities: T024–T025 parallel
- Phase 2 Hooks: T026–T028 all parallel
- Phase 2 UI Primitives: T029–T042 all parallel (after cn.ts)
- Phase 6: T056–T058 all parallel (Journey, Education, Community sections)
- Phase 9: T066–T067 parallel (sitemap + robots)

---

## Parallel Example: Phase 2 UI Primitives

```bash
# Launch all UI primitives together (all independent files):
Task: "Create container.tsx"
Task: "Create button.tsx"
Task: "Create badge.tsx"
Task: "Create card.tsx"
Task: "Create section-heading.tsx"
Task: "Create input.tsx"
Task: "Create textarea.tsx"
Task: "Create progress-bar.tsx"
Task: "Create animated-counter.tsx"
Task: "Create filter-tabs.tsx"
Task: "Create timeline-item.tsx"
Task: "Create project-card.tsx"
Task: "Create skill-card.tsx"
Task: "Create project-modal.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1 (Hero + Nav + Footer + Theme)
4. **STOP and VALIDATE**: Site loads, identity visible, nav works, CV downloads
5. Deploy preview if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 → Deploy (MVP: identity + navigation)
3. Add US2 → Deploy (projects showcase)
4. Add US3 → Deploy (skills evidence)
5. Add US4 → Deploy (full background)
6. Add US5 → Deploy (contact conversion)
7. Add US6 → Deploy (accessibility audit)
8. Polish → Deploy (SEO, performance, final quality)

Each increment adds value without breaking previous stories.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- No test tasks generated (not requested in spec)
