# Research: Project Preview Gallery

## R1 — Infinite Carousel Scroll Strategy

**Decision**: requestAnimationFrame-based scrollLeft manipulation with item cloning at boundaries.

**Rationale**: Native `scrollLeft` manipulation via rAF provides the smoothest 60fps scroll without fighting browser scroll physics. Cloning the first 3 and last 3 items at boundaries creates a seamless infinite loop — when the scroll position reaches a clone boundary, it silently resets to the real item position, making the loop invisible to users.

**Alternatives considered**:
- CSS-only `@keyframes translateX` animation: Simpler but cannot support drag/pause/resume interaction. Rejected.
- Framer Motion `animate` x-position cycling: Works but harder to synchronize with manual drag and touch momentum. Rejected.
- `scroll-snap-type` with JS cycling: Good for snap carousels but doesn't suit continuous smooth scroll. Rejected.

## R2 — Drag and Touch Interaction

**Decision**: Framer Motion `drag="x"` with `dragConstraints`, `dragElastic: 0.1`, and velocity-based momentum on `onDragEnd`.

**Rationale**: Framer Motion's drag system handles both mouse and touch natively, provides velocity info on drag end for momentum calculation, and integrates with the existing animation library (no new dependency).

**Alternatives considered**:
- Custom pointer events + manual momentum: More code, re-invents what Framer Motion provides. Rejected.
- Embla Carousel library: Excellent carousel library but adds a new dependency (violates locked stack). Rejected.

## R3 — Phone Frame Mockup Approach

**Decision**: Pure CSS/Tailwind styled `div` elements simulating phone bezels, notch, and rounded corners.

**Rationale**: Keeps bundle size at zero extra bytes (no image overlays). Styled divs are trivially responsive, theme-aware (dark/light), and customizable per-project accent color. The notch/dynamic island is decorative — a simple rounded div at center-top.

**Alternatives considered**:
- SVG phone frame overlays: Higher fidelity but adds SVG assets, harder to make responsive. Rejected.
- PNG mockup image overlays: Heaviest option, fixed resolution, not theme-aware. Rejected.

## R4 — 3D Parallax Depth Effect

**Decision**: CSS `perspective` on container + `transform: scale() rotateY() translateZ()` on individual frames, driven by Framer Motion `variants`.

**Rationale**: CSS 3D transforms with perspective are GPU-accelerated and produce authentic depth without canvas or WebGL overhead. Framer Motion variants make it declarative and easy to coordinate with entrance animations.

**Alternatives considered**:
- Canvas/Three.js rendering: Vastly overkill for static depth effect on 3 frames. Rejected.
- Static CSS without perspective: Loses the 3D feel — flat scale differences look amateur. Rejected.

## R5 — Auto-Scroll Pause/Resume Behavior

**Decision**: `mouseenter` pauses immediately by canceling the rAF loop. `mouseleave` sets a 1.5s `setTimeout` before restarting the loop. Touch interactions pause via `touchstart` and resume via `touchend` with the same 1.5s delay. The `useAutoScroll` hook encapsulates all logic.

**Rationale**: Separating auto-scroll into a custom hook keeps the carousel component focused on layout/rendering. The 1.5s delay prevents jarring immediate resume after brief hover-outs.

**Alternatives considered**:
- Intersection Observer pause (only scroll when in viewport): Complementary — should also be used to avoid off-screen scrolling. Added as bonus behavior inside the hook.

## R6 — Reduced Motion Handling

**Decision**: When `prefers-reduced-motion: reduce` is active: auto-scroll is disabled entirely, entrance animations show final state immediately, hover lift/scale is disabled, and gallery displays statically. Detected via `window.matchMedia` check inside `useAutoScroll` and via the existing `shouldReduceMotion` flag in `motion-variants.ts`.

**Rationale**: The constitution mandates full reduced-motion compliance. An animated carousel that ignores this preference is an accessibility violation.
