# Research: MAZ Portfolio — Full Site

**Branch**: `001-portfolio-full-site` | **Date**: 2026-03-22

No NEEDS CLARIFICATION items remained in Technical Context — all technology decisions
were supplied by the user in the constitution and plan input. Research below documents
rationale for each locked choice and best practices discovered.

---

## R1: Next.js App Router for Single-Page Portfolio

**Decision**: Use Next.js 14+ App Router with a single `page.tsx` composing all
sections.

**Rationale**: App Router provides server-side rendering for the initial HTML
(critical for SEO/Lighthouse), built-in `next/image` optimization, `next/font` for
self-hosted font preloading, and native metadata API for OG/Twitter tags. A single
page with anchor-based navigation avoids route-level code splitting complexity while
still benefiting from SSR.

**Alternatives considered**:
- Pages Router: legacy, no streaming, less ergonomic metadata API.
- Vite + React SPA: no SSR out of box → poor SEO score.
- Astro: good for static, but Framer Motion integration is more friction.

---

## R2: Theme System — next-themes + CSS Custom Properties

**Decision**: Use `next-themes` with `attribute="class"`, `defaultTheme="dark"`,
`enableSystem`, combined with CSS custom properties in `globals.css`.

**Rationale**: `next-themes` injects a blocking `<script>` before hydration to read
`localStorage` and set the `class` attribute on `<html>`, preventing the flash of
unstyled content (FOUC). Tailwind's `darkMode: "class"` integrates natively. CSS
custom properties in `:root` (light) and `.dark` (dark) allow a single set of
Tailwind utility names (e.g., `bg-background`, `text-foreground`) that resolve to
different values per theme.

**Best practices**:
- Define semantic token names (`--background`, `--card`, `--accent-blue`) not raw
  colors in Tailwind config.
- Map Tailwind `extend.colors` to `hsl(var(--token))` or `var(--token)` format.
- Avoid `enableSystem` race conditions by setting `defaultTheme="dark"` as fallback.

---

## R3: Framer Motion Animation Strategy

**Decision**: Centralize all animation variants in `motion-variants.ts` with a
`prefers-reduced-motion` guard that returns static (no-op) values.

**Rationale**: Per constitution Principle VI (Animation Discipline), no inline
variant objects are allowed in components. Centralizing variants ensures consistent
timing (0.3s–0.8s), makes global adjustments a single-file change, and provides one
place to implement the reduced-motion override.

**Best practices**:
- Use `whileInView` with `viewport={{ once: true }}` for all section entrances to
  prevent re-animation on scroll-back.
- Use `AnimatePresence` with `mode="wait"` for filter tab transitions to avoid
  layout thrashing when cards enter/exit.
- Use `layout` prop on filtered grid items for smooth position transitions.
- Detect `prefers-reduced-motion` via `window.matchMedia` at module init; export
  a boolean `shouldReduceMotion` that variant factories check.

---

## R4: Contact Form — React Hook Form + Zod + EmailJS

**Decision**: React Hook Form for state management, Zod for schema validation,
EmailJS (or Formspree) for submission delivery, invisible honeypot for spam.

**Rationale**: React Hook Form minimizes re-renders (uncontrolled fields with
`register`), Zod integrates via `@hookform/resolvers/zod` for declarative schema
validation, and EmailJS sends emails directly from the client without a backend
endpoint. Honeypot field (hidden via CSS `position: absolute; left: -9999px`) is
checked pre-submission; if filled, the submission is silently discarded.

**Best practices**:
- Store EmailJS service ID, template ID, and public key in environment variables
  (`NEXT_PUBLIC_EMAILJS_*`), never in constants files.
- Show loading spinner on submit button during async send.
- On success: `reset()` form + show green toast. On error: show red toast + preserve
  field data.
- Zod schema: `fullName` min 2 chars, `email` `.email()`, `subject` min 2 chars,
  `message` min 10 chars.

---

## R5: Project Detail Modal Accessibility

**Decision**: Custom modal/overlay for expanded project detail, dismissible via
close button, Escape key, or click-outside.

**Rationale**: FR-017a/FR-017b require a modal. Must trap focus inside modal when
open, return focus to triggering card on dismiss, and use `role="dialog"` +
`aria-modal="true"` + `aria-labelledby` for screen readers.

**Best practices**:
- Use `<dialog>` element where possible for native accessibility, or a Portal-based
  div with manual focus trap.
- Prevent background scroll with `document.body.style.overflow = "hidden"` when modal
  is open.
- Animate entry/exit with Framer Motion `AnimatePresence`.

---

## R6: Dynamic Filter Tabs

**Decision**: Derive filter tab labels from the set of unique categories present in
the projects data array, prefixed with "All".

**Rationale**: Per clarification, empty category tabs must not render. Computing
categories from data ensures tabs update automatically when projects are added or
removed from constants, with zero component changes needed.

**Implementation pattern**:
```
categories = ["All", ...new Set(projects.map(p => p.category))]
```

---

## R7: ScrollSpy Hook

**Decision**: Custom `useScrollSpy` hook using `IntersectionObserver` with
`threshold: 0.3` on all section IDs.

**Rationale**: Native IntersectionObserver is performant (no scroll event listener
overhead) and widely supported. Threshold 0.3 means the section is "active" when 30%
is visible, which provides a natural feel during scrolling without jumping too early
or too late.

**Best practices**:
- Observe all sections simultaneously with a single observer instance.
- Return the `id` of the most-intersecting section (highest `intersectionRatio`).
- Clean up observer on unmount.
- Pass section IDs as a stable array (useMemo or constant) to avoid re-creating
  the observer.

---

## R8: Bundle Size Strategy

**Decision**: Target ≤200 KB JS bundle per constitution Principle V.

**Rationale**: Framer Motion is the largest dependency (~30 KB gzipped). All others
are small. Total first-load JS should stay well under 200 KB with tree-shaking.

**Mitigation if exceeded**:
- Dynamic import for `ProjectModal` (only loaded when detail icon is clicked).
- Dynamic import for `ContactForm` (only loaded when contact section enters viewport).
- Use `next/dynamic` with `ssr: false` for client-only components.
- Verify with `next build` + `@next/bundle-analyzer`.

---

## R9: SEO Implementation

**Decision**: Use Next.js Metadata API (`export const metadata` in `layout.tsx`) for
title, description, OG, Twitter Card. Add `sitemap.xml` and `robots.txt` via
`app/sitemap.ts` and `app/robots.ts`. Add JSON-LD structured data via a `<script>`
tag in layout.

**Rationale**: Next.js Metadata API is the idiomatic approach for App Router —
generates `<head>` tags at build time, zero client JS. `sitemap.ts` and `robots.ts`
are convention-based route handlers that Next.js serves automatically.

**JSON-LD schema**: `Person` type with name, jobTitle, url, sameAs (social links).
