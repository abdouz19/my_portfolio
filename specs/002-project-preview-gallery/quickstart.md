# Quickstart: Project Preview Gallery

## Setup

No additional dependencies needed. All required packages are already installed.

## Development

```bash
pnpm dev       # Start dev server
pnpm build     # Verify TypeScript + production build
```

## Adding Screenshots

1. Create project screenshot directory:
   ```
   public/images/projects/{project-slug}/
   ```

2. Add screenshot files named `screen-1.png`, `screen-2.png`, etc.

3. Update `src/lib/constants/projects.ts` with the screenshots data:
   ```ts
   screenshots: {
     platform: "mobile",  // or "web" or "desktop"
     images: [
       "/images/projects/{slug}/screen-1.png",
       "/images/projects/{slug}/screen-2.png",
     ]
   }
   ```

## Testing the Gallery

1. **Static display**: Add 1–3 screenshots to a project → verify frames render without carousel
2. **Carousel**: Add 4+ screenshots → verify auto-scroll, hover pause, drag/swipe
3. **Responsive**: Test at 320px, 768px, 1280px widths
4. **Reduced motion**: Enable "Reduce motion" in OS/browser settings → verify static display
5. **Empty state**: Remove all screenshots from a project → verify graceful degradation

## File Map

| File | Purpose |
|------|---------|
| `src/components/ui/gallery/project-gallery.tsx` | Orchestrator: picks frame type + carousel |
| `src/components/ui/gallery/gallery-carousel.tsx` | Scroll engine with auto-scroll + drag |
| `src/components/ui/gallery/gallery-dots.tsx` | Dot pagination |
| `src/components/ui/gallery/phone-frame.tsx` | Phone mockup frame |
| `src/components/ui/gallery/browser-frame.tsx` | Browser mockup frame |
| `src/components/ui/gallery/desktop-frame.tsx` | Desktop mockup frame |
| `src/lib/hooks/use-auto-scroll.ts` | Auto-scroll rAF hook |
| `src/lib/utils/motion-variants.ts` | Gallery animation variants |
| `src/lib/types/project.ts` | ProjectScreenshots interface |
| `src/lib/constants/projects.ts` | Screenshot data per project |

## Validation Checklist

- [ ] Phone frames show 3D parallax depth on desktop
- [ ] Browser frames show macOS dots in title bar
- [ ] Auto-scroll loops infinitely without visible seam
- [ ] Hover pauses auto-scroll, mouse leave resumes after 1.5s
- [ ] Drag/swipe works on desktop and touch
- [ ] Dot pagination updates with scroll position
- [ ] No layout shift on image load
- [ ] All animations disabled with prefers-reduced-motion
- [ ] No visible scrollbar
- [ ] `pnpm build` passes with zero errors
