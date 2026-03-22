# Portfolio Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-03-22

## Active Technologies
- TypeScript 5 strict mode + Next.js 16 (App Router), React 19, Framer Motion 12, Tailwind CSS v4, next/image (002-project-preview-gallery)
- N/A (static images in `public/`) (002-project-preview-gallery)

- TypeScript 5 strict mode + Next.js 14+ (App Router) + React 18 (001-portfolio-full-site)
- Tailwind CSS v3+ with CSS custom properties for theming
- Framer Motion, next-themes, React Hook Form, Zod, Lucide React
- clsx + tailwind-merge for class merging
- pnpm package manager, Vercel deployment

## Project Structure

```text
src/
├── app/           # Root layout + single page
├── components/
│   ├── layout/    # Navbar, Footer, ThemeProvider, ScrollToTop
│   ├── sections/  # 8 section components
│   └── ui/        # ~14 atomic UI primitives
├── lib/
│   ├── constants/ # 9 data files (all display content)
│   ├── types/     # 6 TypeScript interface files
│   ├── hooks/     # useScrollSpy, useInView, useMediaQuery
│   └── utils/     # cn.ts, motion-variants.ts
└── public/        # images/, files/cv.pdf
```

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build (must pass with zero TS errors)
pnpm lint         # ESLint + Prettier check
```

## Code Style

- TypeScript strict: zero `any`, zero `@ts-ignore`
- Never hardcode text in components — always import from lib/constants/
- Never hardcode hex colors — always use Tailwind tokens / CSS variables
- All animation variants in lib/utils/motion-variants.ts
- File naming: kebab-case; Components: PascalCase; Constants: camelCase
- Max 200 lines per file, 50 lines per function
- Use cn() for all conditional Tailwind classes
- Mobile-first responsive design

## Constitution

Read `.specify/memory/constitution.md` before writing any code.

## Recent Changes
- 002-project-preview-gallery: Added TypeScript 5 strict mode + Next.js 16 (App Router), React 19, Framer Motion 12, Tailwind CSS v4, next/image

- 001-portfolio-full-site: Full portfolio site with 10 sections, typed constants, atomic UI

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
