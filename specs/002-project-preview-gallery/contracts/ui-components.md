# UI Component Contracts: Project Preview Gallery

## PhoneFrame

**File**: `src/components/ui/gallery/phone-frame.tsx`

```ts
interface PhoneFrameProps {
  src: string;          // Image path relative to public/
  alt: string;          // Descriptive alt text
  accentColor?: string; // Tailwind border-glow color class (e.g., "border-accent-green/30")
}
```

**Behavior**:
- Renders a dark bezel phone mockup (rounded-[28px], bg-gray-900, border border-gray-700)
- Inner notch decoration at top center
- `next/image` inside with `fill`, `objectFit: cover`, `quality: 85`
- Hover: `translateY(-4px)`, `scale(1.03)`, increased shadow (Framer Motion `whileHover`)
- Reduced motion: hover effects disabled
- Dimensions: 140×300px desktop, 120×260px tablet, 110×240px mobile

---

## BrowserFrame

**File**: `src/components/ui/gallery/browser-frame.tsx`

```ts
interface BrowserFrameProps {
  src: string;       // Image path
  alt: string;       // Alt text
  title?: string;    // Optional title in title bar
}
```

**Behavior**:
- macOS-style browser window: title bar with 3 dots (red, yellow, green), rounded-xl top
- Image area: `aspect-[16/10]`, `next/image` fill
- Hover: `translateY(-4px)` + shadow increase
- Scales to full card width minus padding
- Reduced motion: hover effects disabled

---

## DesktopFrame

**File**: `src/components/ui/gallery/desktop-frame.tsx`

```ts
interface DesktopFrameProps {
  src: string;
  alt: string;
  title?: string;
}
```

**Behavior**:
- Desktop window style: squared top corners (rounded-sm), title bar with minimize/maximize/close rectangles
- Same image and hover behavior as BrowserFrame
- Minimal shell for future-proofing

---

## GalleryDots

**File**: `src/components/ui/gallery/gallery-dots.tsx`

```ts
interface GalleryDotsProps {
  total: number;                    // Total number of items
  current: number;                  // Currently active index
  onDotClick?: (index: number) => void; // Scroll to item on click
}
```

**Behavior**:
- Row of dots centered below gallery
- Active dot: `bg-accent-blue`, `scale-125`
- Inactive dots: `bg-gray-600`
- Clickable: triggers `onDotClick` to scroll gallery to that index
- Hidden when `total <= 3` (mobile platform) or `total <= 1` (web/desktop)

---

## GalleryCarousel

**File**: `src/components/ui/gallery/gallery-carousel.tsx`

```ts
interface GalleryCarouselProps {
  children: React.ReactNode;     // Frame components as children
  itemCount: number;             // Total items (for dot calculation)
  autoScroll?: boolean;          // Enable auto-scroll (default: true on desktop)
  className?: string;
}
```

**Behavior**:
- Horizontal scrollable container, hidden overflow, no visible scrollbar
- Auto-scroll: 30px/sec continuous left, infinite loop via item cloning
- Pause on hover/touch, resume after 1.5s
- Drag: Framer Motion `drag="x"` with `dragElastic: 0.1`, momentum on release
- Tracks `currentIndex` from scroll position, passes to `GalleryDots`
- Non-scrollable mode: if children ≤ threshold, renders centered static layout
- Reduced motion: auto-scroll disabled, drag still works

---

## ProjectGallery

**File**: `src/components/ui/gallery/project-gallery.tsx`

```ts
interface ProjectGalleryProps {
  screenshots: ProjectScreenshots; // { platform, images[] }
  projectTitle: string;            // For generating alt text
}
```

**Behavior**:
- Selects frame component based on `platform` type
- Mobile: renders phone frames with 3D parallax depth (center: scale-100, sides: scale-88 + rotateY)
- Web: renders browser frames at full width
- Desktop: renders desktop frames at full width
- Wraps in `GalleryCarousel` if image count exceeds display threshold
- If `images` is empty: renders placeholder area or hides
- Entrance animation: fade-in-up container + staggered frames
- Container has `perspective: 1000px` for 3D effect (mobile platform only)

---

## useAutoScroll Hook

**File**: `src/lib/hooks/use-auto-scroll.ts`

```ts
function useAutoScroll(
  containerRef: RefObject<HTMLDivElement>,
  speed?: number,    // px/sec, default 30
  enabled?: boolean  // default true
): {
  pause: () => void;
  resume: () => void;
  isScrolling: boolean;
}
```

**Behavior**:
- rAF loop incrementing `scrollLeft` by `speed/60` per frame
- Seamless loop: resets `scrollLeft` when reaching cloned boundary
- `pause()`: cancels rAF, sets `isScrolling` false
- `resume()`: restarts rAF after 1.5s delay, sets `isScrolling` true
- Checks `prefers-reduced-motion` — if active, `enabled` is forced false
- Checks viewport visibility — pauses when container is offscreen
- Cleanup: cancels rAF and timeouts on unmount

---

## Motion Variants (additions to motion-variants.ts)

```ts
// Gallery frame entrance: staggered fade-in-up
galleryFrameVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" }
  })
}

// 3D parallax positions for phone frames
parallaxFrame = {
  center: { scale: 1, zIndex: 10, rotateY: 0, opacity: 1 },
  left: { scale: 0.88, zIndex: 0, rotateY: 5, opacity: 0.8 },
  right: { scale: 0.88, zIndex: 0, rotateY: -5, opacity: 0.8 }
}
```
