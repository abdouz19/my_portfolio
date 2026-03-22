# Feature Specification: Project Preview Gallery

**Feature Branch**: `002-project-preview-gallery`
**Created**: 2026-03-22
**Status**: Draft
**Input**: User description: "Build an animated, scrollable screenshot gallery for each project card's preview area with device mockup frames, auto-scroll carousel, and responsive layout."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Static Screenshot Display in Device Frames (Priority: P1)

A visitor viewing the portfolio scrolls to the Projects section and sees each project card with a visually appealing preview area at the top. Mobile app projects (Trust Laundry, DeliveryX Driver, Comerco) show screenshots inside realistic phone mockup frames with a 3D parallax depth effect — the center frame appears larger and forward while side frames are smaller and recessed. Web app projects (Esidea) show screenshots inside a browser window mockup with macOS-style title bar dots. Each frame responds to hover with a subtle lift and shadow increase, giving the gallery a polished, interactive feel.

**Why this priority**: The core visual impact of the feature — without device frames and depth effect, the gallery is just a flat image list. This is the minimum viable version that transforms project previews from placeholder images into professional showcases.

**Independent Test**: Open the Projects section. Each project card displays screenshots inside the correct device frame type (phone for mobile apps, browser for web apps). Phone frames show 3D parallax depth. Hovering a frame produces a lift + shadow effect. No scrolling or carousel needed — just static display of up to 3 screenshots.

**Acceptance Scenarios**:

1. **Given** a project with platform type "mobile" and 3 screenshots, **When** the card renders, **Then** screenshots appear inside phone mockup frames with center frame larger/forward and side frames smaller/recessed
2. **Given** a project with platform type "web" and 1 screenshot, **When** the card renders, **Then** the screenshot appears inside a browser window frame with red/yellow/green title bar dots
3. **Given** any project card, **When** the user hovers over an individual screenshot frame, **Then** the frame lifts upward and shadow increases
4. **Given** a project with 3 or fewer screenshots, **When** the gallery renders, **Then** all screenshots are visible without any scrolling mechanism

---

### User Story 2 - Carousel Auto-Scroll and Manual Navigation (Priority: P2)

A visitor sees a project with more than 3 screenshots. The gallery automatically scrolls horizontally in a smooth infinite loop, revealing additional screenshots. When the visitor hovers over the gallery, auto-scroll pauses. On mouse leave, scrolling resumes after a brief delay. On desktop, the visitor can drag to scroll manually. On touch devices, swiping scrolls naturally with momentum. Subtle dot indicators below the gallery show the current scroll position.

**Why this priority**: Enables showcasing projects with many screenshots without cluttering the card. Builds on US1's static display by adding motion and interactivity for richer exploration.

**Independent Test**: Add 5+ screenshots to a project. Verify auto-scroll loops smoothly, pauses on hover, resumes on mouse leave. Drag to scroll on desktop. Swipe on touch device. Dots update position.

**Acceptance Scenarios**:

1. **Given** a project with more than 3 screenshots, **When** the card enters the viewport, **Then** the gallery auto-scrolls horizontally at a steady speed in a continuous loop
2. **Given** auto-scroll is active, **When** the user hovers over the gallery, **Then** scrolling pauses immediately
3. **Given** auto-scroll is paused by hover, **When** the user moves the mouse away, **Then** scrolling resumes after a 1.5-second delay
4. **Given** a scrollable gallery on desktop, **When** the user clicks and drags horizontally, **Then** the gallery scrolls with smooth momentum in the drag direction
5. **Given** a scrollable gallery on a touch device, **When** the user swipes horizontally, **Then** the gallery scrolls with natural touch momentum
6. **Given** a scrollable gallery, **When** the gallery renders, **Then** dot pagination indicators appear below showing the current scroll position
7. **Given** a project with 3 or fewer screenshots, **When** the gallery renders, **Then** no carousel, auto-scroll, or dot indicators appear

---

### User Story 3 - Entrance Animations and Responsive Layout (Priority: P3)

When the project card scrolls into view, the gallery area animates in with a fade-up entrance. Individual screenshot frames appear with a staggered delay, sliding up one after another. The gallery adapts to screen size: on desktop, 3 phone frames or 1 full browser frame are visible; on tablet, 2.5 phone frames peek to hint at more; on mobile, 1.5 phone frames show with swipe as the primary interaction.

**Why this priority**: Adds visual polish and ensures the gallery works well across all devices. Important for production quality but not required for the core gallery to function.

**Independent Test**: Scroll the Projects section into view — gallery fades in with staggered frame entrances. Resize browser to mobile width — gallery shows fewer frames with peek behavior. Test on tablet — intermediate layout displays correctly.

**Acceptance Scenarios**:

1. **Given** a project card is below the viewport, **When** the user scrolls it into view, **Then** the gallery area fades in and slides up
2. **Given** the gallery entrance animation is triggered, **When** multiple frames are present, **Then** each frame appears with a 0.1-second staggered delay
3. **Given** a desktop viewport (1280px+), **When** a mobile project gallery renders, **Then** 3 phone frames are visible at full size
4. **Given** a tablet viewport (768px–1279px), **When** a mobile project gallery renders, **Then** approximately 2.5 phone frames are visible with the next frame peeking in
5. **Given** a mobile viewport (320px–767px), **When** a mobile project gallery renders, **Then** approximately 1.5 phone frames are visible with swipe as the primary scroll interaction
6. **Given** a web project on any viewport, **When** the gallery renders, **Then** the browser frame scales appropriately to fit the available width

---

### Edge Cases

- What happens when a project has 0 screenshots? The gallery area displays a subtle placeholder or is hidden entirely.
- What happens when a screenshot image fails to load? A fallback placeholder is shown inside the device frame with no layout shift.
- What happens when the user rapidly switches between drag and auto-scroll? The transition is seamless — manual drag takes priority, auto-scroll resumes after the 1.5-second idle delay.
- What happens on very slow connections? Images lazy-load with proper width/height to prevent layout shift; a skeleton or blurred placeholder is visible while loading.
- What happens when prefers-reduced-motion is enabled? All animations (auto-scroll, entrance, hover effects) are disabled; screenshots display statically.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Each project card MUST display a preview gallery area at the top showing real screenshots
- **FR-002**: Mobile app screenshots MUST render inside phone mockup frames with dark bezel, rounded corners, and a notch/dynamic island visual
- **FR-003**: Web app screenshots MUST render inside browser window mockup frames with a macOS-style title bar (red, yellow, green dots, rounded top corners)
- **FR-004**: Desktop app screenshots MUST render inside desktop window frames with minimize/maximize/close buttons (future-proofing)
- **FR-005**: Mobile phone frames MUST display with 3D parallax depth — center frame larger and forward, side frames smaller and recessed
- **FR-006**: Each individual screenshot frame MUST respond to hover with a vertical lift and increased shadow
- **FR-007**: Galleries with 3 or fewer screenshots MUST display all items statically with no carousel or scrollbar
- **FR-008**: Galleries with more than 3 screenshots MUST auto-scroll horizontally in a smooth infinite loop
- **FR-009**: Auto-scroll speed MUST be approximately 30 pixels per second with linear easing
- **FR-010**: Auto-scroll MUST pause immediately when the user hovers over the gallery
- **FR-011**: Auto-scroll MUST resume 1.5 seconds after the user stops hovering or touching
- **FR-012**: Users MUST be able to manually scroll the gallery via click-and-drag on desktop
- **FR-013**: Users MUST be able to manually scroll the gallery via swipe on touch devices
- **FR-014**: Manual scroll MUST have smooth momentum with ease-out deceleration
- **FR-015**: No visible scrollbar MUST appear — overflow is hidden cleanly
- **FR-016**: Dot pagination indicators MUST appear below scrollable galleries reflecting the current scroll position
- **FR-017**: Gallery entrance MUST animate with fade-in and slide-up when the project card enters the viewport
- **FR-018**: Individual frames MUST animate with a staggered entrance (0.1-second delay per frame)
- **FR-019**: All animations MUST be disabled when the user has prefers-reduced-motion enabled
- **FR-020**: Screenshots MUST lazy-load when outside the initial viewport
- **FR-021**: All screenshot images MUST have explicit width and height to prevent layout shift
- **FR-022**: Each project's data MUST include a screenshots property with platform type and image paths
- **FR-023**: The gallery MUST display 3 phone frames on desktop, ~2.5 on tablet, ~1.5 on mobile
- **FR-024**: Browser frames MUST scale to fit the available card width minus padding
- **FR-025**: If a project has 0 screenshots, the gallery area MUST either show a placeholder or be hidden
- **FR-026**: If a screenshot fails to load, the frame MUST display a fallback placeholder without layout shift

### Key Entities

- **Screenshot Gallery**: A collection of screenshots for a single project, with a platform type (mobile, web, or desktop) and an ordered list of image paths
- **Screenshot Frame**: A device mockup (phone, browser, or desktop window) wrapping a single screenshot image, with platform-specific visual treatment
- **Gallery Carousel**: The scrolling mechanism that manages auto-scroll, manual drag/swipe, infinite looping, pause/resume behavior, and dot pagination for galleries with more than 3 items

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of project cards display screenshots inside the correct device frame type matching their platform
- **SC-002**: Auto-scroll galleries loop infinitely without visible jump or stutter at the seam
- **SC-003**: Gallery interaction latency (hover pause, drag response) is under 100 milliseconds
- **SC-004**: Zero layout shift occurs during screenshot lazy-loading (CLS contribution = 0)
- **SC-005**: Gallery renders correctly at 3 breakpoints: 320px mobile, 768px tablet, 1280px desktop — with appropriate frame counts at each
- **SC-006**: All animations respect prefers-reduced-motion — static fallback displays with no motion artifacts
- **SC-007**: Touch swipe on mobile devices feels natural with momentum — comparable to native scroll behavior

## Assumptions

- Screenshots are provided as static image files stored in the project's public directory under a per-project subfolder structure
- The existing project data model will be extended with a `screenshots` property; existing projects without screenshots will gracefully degrade
- Phone mockup frames are rendered via styled markup (not image overlays) to keep bundle size low
- Browser mockup frames use the macOS window chrome style as the single visual standard
- The infinite loop carousel uses item cloning at boundaries for seamless wrap rather than CSS-only solutions
- Auto-scroll direction is left-to-right (items move leftward as new content enters from the right)
