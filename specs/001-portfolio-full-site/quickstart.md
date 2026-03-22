# Quickstart: MAZ Portfolio

**Branch**: `001-portfolio-full-site` | **Date**: 2026-03-22

## Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)

## Setup

```bash
# Clone and enter the project
cd Portfolio

# Install dependencies
pnpm install

# Copy environment variables (for contact form email service)
cp .env.example .env.local
# Edit .env.local with your EmailJS/Formspree credentials:
#   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
#   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
#   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## Development

```bash
# Start dev server
pnpm dev

# Open in browser
open http://localhost:3000
```

## Build & Preview

```bash
# Production build
pnpm build

# Preview production build locally
pnpm start
```

## Project Structure Overview

```
src/
├── app/           → Root layout + single page entry point
├── components/
│   ├── layout/    → Navbar, Footer, ThemeProvider, ScrollToTop
│   ├── sections/  → 8 section components (Hero through Contact)
│   └── ui/        → ~14 atomic UI primitives
├── lib/
│   ├── constants/ → 9 data files (all display content)
│   ├── types/     → 6 TypeScript interface files
│   ├── hooks/     → 3 custom hooks (useScrollSpy, useInView, useMediaQuery)
│   └── utils/     → cn.ts (class merging), motion-variants.ts
└── public/
    ├── images/    → Profile photo, project mockups
    └── files/     → cv.pdf
```

## Key Development Rules

1. **Never hardcode text** in components — import from `src/lib/constants/`
2. **Never hardcode colors** — use Tailwind classes mapped to CSS variables
3. **All data shapes** must have TypeScript interfaces in `src/lib/types/`
4. **All animations** must use variants from `src/lib/utils/motion-variants.ts`
5. **Mobile-first** — write base styles for 320px, add responsive prefixes for larger
6. **File limit** — no file > 200 lines, no function > 50 lines

## Updating Content

All portfolio content lives in `src/lib/constants/`:

| File | Contains |
|------|----------|
| `projects.ts` | Project cards (title, description, tech stack, etc.) |
| `skills.ts` | Skill categories and proficiency percentages |
| `experience.ts` | Professional journey timeline entries |
| `education.ts` | Degrees and certifications |
| `community.ts` | Community organization cards |
| `contact-info.ts` | Email, phone, location |
| `social-links.ts` | LinkedIn, GitHub, Email, Instagram URLs |
| `navigation.ts` | Nav link labels and anchor targets |
| `site-metadata.ts` | Page title, OG tags, description |

To update any content, edit the corresponding file. No component changes needed.

## Deployment

The site deploys on Vercel. Push to `main` triggers automatic deployment.

```bash
# Manual deployment (if Vercel CLI installed)
pnpm vercel --prod
```

## Validation Checklist

Before considering the site shippable:

- [ ] `pnpm build` completes with zero TypeScript errors
- [ ] All 10 sections render in correct order
- [ ] Theme toggle works (dark ↔ light) with persistence
- [ ] All nav links smooth-scroll to correct sections
- [ ] Project filter tabs show/hide correct cards
- [ ] Contact form validates, submits, shows feedback, resets
- [ ] CV download works
- [ ] All social links open correct destinations in new tabs
- [ ] Responsive: no horizontal overflow at 320px width
- [ ] Lighthouse ≥90 on all four categories (desktop + mobile)
- [ ] Keyboard Tab reaches every interactive element with visible focus
- [ ] `prefers-reduced-motion` disables all animations
