# Feature Specification: MAZ Portfolio — Full Section Specifications

**Feature Branch**: `001-portfolio-full-site`
**Created**: 2026-03-22
**Status**: Draft

## User Scenarios & Testing *(mandatory)*

### User Story 1 - First Impression & Identity (Priority: P1)

A recruiter or hiring manager lands on the portfolio for the first time. Within seconds
they can identify who the site owner is, what role they fill, whether they are available
to hire, and how to navigate to any section of the portfolio. The hero section and
navigation communicate identity and availability immediately.

**Why this priority**: This is the entry gate for every visit. If identity and
availability are not instantly clear, the visitor leaves. Everything else is
secondary.

**Independent Test**: Visit the site on any device. Without scrolling, a visitor can
read the owner's full name, current role, availability status, and use the navigation
bar to jump to any section — all in under 10 seconds.

**Acceptance Scenarios**:

1. **Given** the portfolio loads, **When** a visitor views the top of the page,
   **Then** they see: "Hello, I'm", "Mohamed Abderraouf" in white bold, "ZOUAID" in
   accent blue, and "Flutter Mobile Developer" subtitle, all without scrolling.
2. **Given** the hero is visible, **When** a visitor looks at the status area,
   **Then** they see a green pulsing dot with "AVAILABLE FOR HIRE" text in a rounded
   pill badge.
3. **Given** any device width, **When** the page loads, **Then** a navigation bar is
   visible with links to About, Projects, Skills, Achievements, and a "Contact Me"
   button; on mobile, these collapse behind a hamburger menu icon.
4. **Given** the navigation bar, **When** a visitor clicks any nav link,
   **Then** the page smoothly scrolls to the target section and that link becomes
   visually highlighted.
5. **Given** the navigation bar, **When** a visitor scrolls through the page,
   **Then** the active nav item updates automatically to reflect the currently
   visible section.
6. **Given** the hero section, **When** a visitor clicks "Download CV",
   **Then** a CV file downloads to their device.
7. **Given** the hero section, **When** a visitor clicks "View Projects →",
   **Then** the page smoothly scrolls to the Featured Projects section.
8. **Given** the hero section, **When** a visitor clicks a social icon (LinkedIn,
   GitHub, or Email), **Then** the destination opens in a new browser tab
   (or mailto for email).

---

### User Story 2 - Project Portfolio Exploration (Priority: P2)

A technical interviewer or potential client wants to review the owner's project work
to assess real-world experience and breadth of skills. They can browse all projects,
filter by category (mobile, web), and see enough detail on each project to evaluate
relevance without leaving the page.

**Why this priority**: Projects are the primary evidence of capability. A recruiter
who is satisfied with identity (US1) will next look at proof of work.

**Independent Test**: Navigate directly to the Projects section. A visitor can view
all four projects, filter by "Mobile App" to see only mobile projects, read each
project's description and features, and click through to GitHub for more detail —
all from this one section.

**Acceptance Scenarios**:

1. **Given** the Projects section is visible, **When** a visitor views it,
   **Then** they see a section title, subtitle, filter tabs ("All" plus one tab per
   populated category), and a grid of project cards. Only categories with at least
   one project are shown as tabs.
2. **Given** all four projects are displayed (All filter active), **When** a visitor
   clicks the "Mobile App" filter tab, **Then** only mobile app project cards remain
   visible with an animated transition; web app cards are hidden.
3. **Given** a project card is visible, **When** a visitor inspects it,
   **Then** they can see: a preview image, category label, project title,
   description, key feature badges, and tech stack badges — each tech badge in its
   own distinct color, plus a detail icon button in the top-right corner.
4. **Given** a project card, **When** a visitor clicks the detail icon button,
   **Then** a modal/overlay appears showing the expanded project view (screenshots,
   full description, features, tech stack, and available links such as GitHub repo
   or live demo); closing the modal returns focus to the card grid.
5. **Given** the Projects section, **When** a visitor clicks "View More on GitHub",
   **Then** the owner's GitHub profile opens in a new tab.
5. **Given** a project card, **When** a visitor hovers over it on desktop,
   **Then** the card subtly scales up and the border glows more intensely.

Project cards required:
- **Trust Laundry** (Mobile App): laundry management, features: Real-time Tracking,
  Payment Integration, Admin Dashboard; stack: Flutter, Firebase, Node.js
- **DeliveryX Driver** (Mobile App): delivery/routing, features: Route Optimization,
  Multi-platform; stack: Flutter, Node.js, PostgreSQL
- **Esidea** (Web App): innovation platform, features: Real-time Collaboration,
  Project Showcase; stack: React, Node.js, Socket.io
- **Comerco** (Mobile App): e-commerce, features: Smart Notifications, Inventory
  Management; stack: Flutter, Firebase, Stripe

---

### User Story 3 - Skills Assessment (Priority: P3)

A technical recruiter or lead developer wants to quantify the owner's proficiency
across technology domains. They can see skill categories with individual skill levels
displayed as animated progress bars, making the assessment visual and immediate.

**Why this priority**: Skills clarify fit before a phone screen. After viewing
projects, a recruiter verifies whether specific tools match their stack requirements.

**Independent Test**: Navigate directly to the Skills section. A visitor can identify
four skill category cards, read the individual skills within each, and see the
progress bars animate to their percentage values upon first entering the viewport.

**Acceptance Scenarios**:

1. **Given** the Skills section enters the viewport, **When** a visitor watches,
   **Then** all progress bars animate from zero to their target width in a single
   smooth motion.
2. **Given** the Skills section is visible, **When** a visitor reads the cards,
   **Then** they see four categories: Mobile Development, Web Development, Backend &
   Databases, Tools & Others — each with a distinct accent color for its bars.
3. **Given** a skill card, **When** a visitor reads each row,
   **Then** they see the skill name, a numeric percentage value, and a filled bar
   reflecting that percentage.

Skill data:
- Mobile Dev (purple): Flutter 95%, Dart 90%, Java Android 85%, State Management 90%
- Web Dev (teal): React 80%, JavaScript 90%, HTML/CSS 95%, Tailwind CSS 85%
- Backend (green): Python Flask 70%, Firebase 90%, MongoDB 80%
- Tools (orange): Git/GitHub 90%, Figma 80%, AI/ML Basics 70%

---

### User Story 4 - Experience & Background Review (Priority: P4)

A hiring manager wants to understand the owner's professional history, education, and
community standing. They can read the timeline of work experience, degree history,
certifications, and community roles all in a single scrolling journey down the page.

**Why this priority**: Background validates the skills and projects. This section is
typically reviewed after projects and skills to confirm trajectory and growth.

**Independent Test**: Navigate to the Journey section through to the Community section.
A visitor can read all three experience entries, both degree entries, both
certifications, and both community organizations without leaving or reloading.

**Acceptance Scenarios**:

1. **Given** the Journey section is visible, **When** a visitor reads the timeline,
   **Then** they see three entries in chronological order (newest first), each with:
   title, company name, date range badge, and bullet points with green check icons.
2. **Given** the first timeline entry, **When** a visitor views it,
   **Then** its dot marker is filled blue (indicating current/active role), while
   other entries have gray dots.
3. **Given** the Education section is visible, **When** a visitor reads it,
   **Then** they see two degree cards and two certification cards with issuer and date.
4. **Given** the Community section is visible, **When** a visitor reads it,
   **Then** they see two organization cards each showing: org name, role, and
   "Event Organizer" tag in green text.

Experience entries:
- Mobile Developer — Deepminds Ventures (Remote), 08.2025–Present (current/active)
  - Cross-platform mobile applications using Flutter for Android and iOS
  - Implemented Clean Architecture with Bloc state management
  - Optimized app performance and responsiveness
- Mobile Developer, Freelance — Self-Employed, 05.2024–07.2025
  - Delivered mobile apps using Flutter and Java
  - Implemented authentication, API integration and caching (BLoC, GetX)
- External Relations Coordinator — GDG Algiers (Volunteering), 12.2023–07.2025
  - Coordinated partnerships and contributed to community growth

Education:
- Master's Degree in Big Data Analytics — USTHB, 10.2024–06.2026
- Bachelor's Degree in Computer Science — University of Boumerdes, 10.2021–07.2024

Certifications:
- Flutter & Dart — The Complete Guide — Udemy, 05.2024
- Python and Flask Framework — Udemy, 10.2024

Community:
- Google Developer Group — Active Member & Organizer, Event Organizer
- School of AI — Active Member & Organizer, Event Organizer

---

### User Story 5 - Contact & Collaboration (Priority: P5)

A recruiter, client, or collaborator wants to send a message directly to the owner
without leaving the site. They can fill in a contact form that validates their input,
submits successfully, and gives clear feedback — all without requiring a backend or
login.

**Why this priority**: Contact is the conversion goal of the portfolio. It is the
last step in the visitor funnel and must be frictionless.

**Independent Test**: Navigate to the Contact section. Fill in all four fields with
valid data and submit. A success message appears and the form resets. Then submit with
an invalid email — the form shows a validation error and does not submit.

**Acceptance Scenarios**:

1. **Given** the Contact section is visible, **When** a visitor views it,
   **Then** they see: a section title, a subtitle, a two-column layout with a form on
   the left and contact information on the right.
2. **Given** the contact form, **When** a visitor submits with any required field
   empty, **Then** the form displays a validation error for that field and does not
   submit.
3. **Given** the contact form, **When** a visitor enters an invalid email format,
   **Then** the form displays an email format error and does not submit.
4. **Given** all fields are valid, **When** a visitor clicks "Send Message",
   **Then** the form submits, a success message appears, and the form resets to empty.
5. **Given** the contact info column, **When** a visitor reads it,
   **Then** they see email, phone, and location displayed with icon labels.
6. **Given** the contact info column, **When** a visitor views the social card,
   **Then** they see the owner's name, role, and social icons (GitHub, LinkedIn,
   Instagram) each linking to the correct profile in a new tab.
7. **Given** the footer, **When** a visitor reaches the bottom of the page,
   **Then** they see copyright text: "© 2025 Mohamed Abderraouf Zouaid.
   All rights reserved." on a muted background with a top separator line.

---

### User Story 6 - Accessibility & Theme (Priority: P6)

Any visitor, including those using assistive technology or operating in a bright
environment, can use the portfolio fully. They can toggle between dark and light mode,
and keyboard-only navigation reaches every interactive element.

**Why this priority**: Accessibility is a non-negotiable quality standard per the
project constitution. Theme persistence reduces friction for returning visitors.

**Independent Test**: Toggle the theme to light mode, close the browser, reopen —
the light mode preference persists. Tab through every interactive element without a
mouse — every button, link, and input is reachable and visually focused.

**Acceptance Scenarios**:

1. **Given** the navigation bar, **When** a visitor clicks the theme toggle,
   **Then** the entire site switches between dark and light mode with no flash
   or layout shift.
2. **Given** light mode is selected, **When** a visitor closes and reopens the browser,
   **Then** light mode is still active (preference persisted).
3. **Given** a keyboard-only visitor, **When** they press Tab repeatedly,
   **Then** every nav link, button, form input, and social icon receives a visible
   focus ring.
4. **Given** a visitor using a screen reader, **When** they navigate the page,
   **Then** all images have descriptive alt text and all icon-only buttons have
   accessible labels.
5. **Given** a visitor with motion sensitivity, **When** their OS preference is
   "reduce motion", **Then** all scroll animations and entrance animations are
   disabled site-wide.

---

### Edge Cases

- What happens when a visitor submits the contact form and the email delivery service
  is unavailable? → Form shows an error message; the form data is not lost.
- What happens when a visitor resizes from desktop to mobile mid-session? → Layout
  reflows responsively; no horizontal overflow or broken elements.
- What happens if the CV file is missing from the server? → The download link
  either shows an error or the browser handles the 404 gracefully; no silent failure.
- What happens when a visitor with no JavaScript enabled visits the site? → Core
  content (name, bio, contact info) is readable; animated elements degrade gracefully.
- What happens if a visitor rapidly clicks filter tabs before animation completes? →
  The grid reflects the latest active filter without visual artifacts.
- What happens when the About section stats counter is scrolled past very quickly? →
  The counter still reaches its final value; it does not restart on re-scroll
  (fires once per viewport entry).

---

## Requirements *(mandatory)*

### Functional Requirements

**Navigation**

- **FR-001**: The site MUST display a sticky navigation bar at the top of the
  viewport on all screen sizes.
- **FR-002**: The navigation bar MUST include: "MAZ" brand (scrolls to top), links
  for About / Projects / Skills / Achievements, and a "Contact Me" button.
- **FR-003**: Clicking any navigation link MUST smoothly scroll the page to the
  corresponding section.
- **FR-004**: The navigation MUST highlight the link corresponding to the section
  currently occupying the majority of the viewport (scroll spy).
- **FR-005**: On screens narrower than 768px, the navigation links MUST collapse
  behind a hamburger icon; tapping the icon MUST reveal the full menu.
- **FR-006**: The navigation bar MUST include a theme toggle button (sun/moon icon)
  that switches between dark and light mode.

**Hero Section**

- **FR-007**: The hero MUST display a status badge with a green pulsing dot and
  "AVAILABLE FOR HIRE" text.
- **FR-008**: The hero MUST display the owner's name in two tones: "Mohamed
  Abderraouf" in primary text and "ZOUAID" in accent blue.
- **FR-009**: The hero MUST display a "Download CV" button that triggers a direct
  file download of the owner's CV.
- **FR-010**: The hero MUST display a "View Projects →" button that smoothly scrolls
  to the Featured Projects section.
- **FR-011**: The hero MUST display social icon buttons for LinkedIn, GitHub, and
  Email; each MUST open the respective destination in a new tab (mailto for email).
- **FR-012**: The hero MUST display a circular profile image with a glowing blue ring.
  Until a real photo is provided, a placeholder silhouette MUST be shown.

**About Section**

- **FR-013**: The About section MUST display two animated stat counters: "8+" for
  Projects Completed and "2+" for Years Experience, counting up from zero on first
  viewport entry.
- **FR-014**: The About section MUST display three informational cards: Education,
  Community, and Location, each with a colored icon and descriptive text.

**Projects Section**

- **FR-015**: The Projects section MUST display an "All" filter tab plus one tab per
  project category that has at least one project. Category tabs with zero matching
  projects MUST NOT be rendered. Tab list is derived from the active project data,
  not hardcoded.
- **FR-016**: Clicking a filter tab MUST show only project cards matching that
  category; unmatched cards MUST be hidden with an animated transition. The "All"
  tab MUST always be visible and shows every project.
- **FR-017**: Each project card MUST display: preview image, category badge,
  project name, description, key feature badges, tech stack badges with distinct
  colors per technology, and a detail icon button in the top-right corner.
- **FR-017a**: Clicking the detail icon button on a project card MUST open a
  modal/overlay presenting the expanded project view: full description, screenshots
  or additional preview images, complete feature list, full tech stack, and
  available external links (GitHub repository and/or live demo where applicable).
- **FR-017b**: The project detail modal MUST be dismissible via a close button, by
  pressing Escape, or by clicking outside the modal overlay; dismissal MUST return
  keyboard focus to the triggering card.
- **FR-018**: A "View More on GitHub" button MUST appear below the project grid and
  MUST open the owner's GitHub profile in a new tab.

**Skills Section**

- **FR-019**: The Skills section MUST display four skill category cards each
  containing skill rows with name, percentage value, and a horizontal progress bar.
- **FR-020**: All skill progress bars MUST animate from 0% to their target percentage
  on first viewport entry; they MUST NOT re-animate on subsequent scrolls.

**Journey Section**

- **FR-021**: The Journey section MUST render a vertical timeline with three entries
  in reverse chronological order.
- **FR-022**: The current/active role entry MUST be visually distinguished from
  past entries (e.g., filled blue dot vs. gray dot).
- **FR-023**: Each timeline entry MUST display: job title, company name, date range
  badge, and a list of responsibility bullet points with visual check indicators.

**Education & Certifications Section**

- **FR-024**: The Education section MUST display two degree entries and two
  certification entries, each with institution/issuer name and date range or issue date.

**Community Section**

- **FR-025**: The Community section MUST display two organization cards each showing:
  organization name, role title, and an "Event Organizer" tag.

**Contact Section**

- **FR-026**: The contact form MUST include four required fields: Full Name,
  Email Address, Subject, and Message.
- **FR-027**: The form MUST validate that all fields are non-empty before submission.
- **FR-027a**: The contact form MUST include an invisible honeypot field (hidden from
  real visitors via CSS, never shown in the UI); if that field is populated on
  submission, the form MUST silently discard the submission without sending or
  showing an error to the submitter.
- **FR-028**: The form MUST validate email address format and display an error if
  invalid.
- **FR-029**: On successful submission, the form MUST display a success notification
  and reset all fields to empty.
- **FR-030**: On failed submission, the form MUST display an error notification;
  field data MUST be preserved so the visitor does not re-type.
- **FR-031**: The contact info column MUST display the owner's email, phone, and
  location with icon labels.
- **FR-032**: The contact info column MUST display a social card with the owner's
  name, role, and social icons (GitHub, LinkedIn, Instagram) each linking to the
  correct profile in a new tab.

**Footer**

- **FR-033**: The footer MUST display: "© 2025 Mohamed Abderraouf Zouaid. All rights
  reserved." centered, in muted text, with a top border separator.

**Global Behaviors**

- **FR-034**: Every section MUST animate in with a fade-in-up entrance on first
  scroll into viewport; the animation MUST NOT repeat on subsequent scrolls.
- **FR-035**: Interactive cards MUST respond to hover with a subtle scale increase
  and enhanced border glow.
- **FR-036**: All external links MUST open in a new browser tab.
- **FR-037**: The selected theme (dark/light) MUST persist across page reloads with
  no flash of unstyled content.
- **FR-038**: All visitor-facing text and data MUST originate from data constants;
  no display string MUST be hardcoded inside a UI component.

**Accessibility**

- **FR-039**: Every page section MUST use appropriate semantic HTML landmark elements.
- **FR-040**: All images MUST have descriptive alt text; all icon-only interactive
  elements MUST have an accessible label.
- **FR-041**: All interactive elements MUST be keyboard-reachable with a visible
  focus indicator.
- **FR-042**: Color contrast for all text MUST meet WCAG AA minimums (≥4.5:1 body,
  ≥3:1 large text) in both dark and light mode.
- **FR-043**: When the operating system preference is "reduce motion", all
  scroll-triggered and entrance animations MUST be disabled.

**Responsiveness**

- **FR-044**: All sections MUST render in a single-column stacked layout on screens
  narrower than 768px with no horizontal overflow.
- **FR-045**: On screens 768px–1279px, multi-column layouts MUST gracefully collapse
  to two columns or fewer where appropriate.
- **FR-046**: On screens 1280px and wider, sections MUST render in their full
  intended multi-column layout.

### Key Entities

- **Project**: Represents a portfolio project — attributes: title, category
  (Mobile App / Web App / AI/ML), description, list of key features, list of
  tech stack items (each with a display color), preview image reference, expanded
  detail content (full description, additional screenshots), links (GitHub
  repository, live demo if applicable).
- **Skill Category**: Groups related skills — attributes: category name, accent
  color, list of skill items.
- **Skill Item**: An individual skill — attributes: name, proficiency percentage.
- **Experience Entry**: A professional role — attributes: job title, company name,
  employment type, date range, current status flag, list of responsibility
  descriptions.
- **Education Entry**: A degree or certification — attributes: type (degree /
  certification), title, institution, start date, end date / issue date.
- **Community Organization**: A volunteer or community role — attributes: org name,
  role title, role tags (e.g., "Event Organizer").
- **Navigation Item**: A nav link — attributes: label, target section anchor.
- **Social Link**: A social platform entry — attributes: platform name, URL, icon
  identifier.
- **Contact Info**: Owner contact details — attributes: email, phone, location string.
- **Site Metadata**: SEO and sharing data — attributes: page title, description,
  Open Graph image, canonical URL.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can identify the owner's name, role, and hire
  availability within 5 seconds of the page loading, without scrolling.
- **SC-002**: A visitor can navigate from any section to any other section in under
  3 seconds using the navigation bar links.
- **SC-003**: A visitor can locate and download the CV in under 2 clicks from any
  point on the page.
- **SC-004**: A visitor can filter projects by category and read a full project card
  in under 30 seconds from landing on the Projects section.
- **SC-005**: The contact form can be completed and submitted by a first-time visitor
  in under 2 minutes.
- **SC-006**: The page achieves a score of ≥90 across all four automated quality
  categories (performance, accessibility, best practices, discoverability) when
  measured by a standard web audit tool on both desktop and mobile profiles.
- **SC-007**: The page renders correctly and without horizontal scrolling on screens
  as narrow as 320px.
- **SC-008**: All visitor-facing text and data can be updated by editing data files
  only, with zero changes to UI component files.
- **SC-009**: A visitor with a "reduce motion" OS preference experiences the full
  page content without any animated transitions interfering with their session.
- **SC-010**: The theme preference selected by a visitor persists across browser
  sessions with no visible flash or layout shift on page load.

### Assumptions

- The CV file will be provided as a PDF and placed in the designated public files
  directory before deployment.
- A real profile photo will replace the placeholder silhouette before deployment;
  the layout is designed to accommodate a square source image cropped to a circle.
- GitHub profile URL, LinkedIn URL, and Instagram URL will be provided before
  deployment and stored in data constants.
- The email delivery service (EmailJS or Formspree) credentials will be provided
  before deployment; the form implementation will reference them via environment
  variables, not hardcoded values.
- Filter tabs in the Projects section are generated dynamically from available
  project categories. The "AI/ML" tab will not appear until at least one AI/ML
  project is added to the project data constants.
- The footer copyright year is "2025" as specified; this value is stored in a
  constant and can be updated without touching a component.
- No visitor analytics or tracking of any kind is included. This is an explicit
  out-of-scope decision.

---

## Clarifications

### Session 2026-03-22

- Q: What does the detail icon button on a project card do when clicked? → A: Opens a modal/overlay with expanded project detail (full description, screenshots, features, tech stack, and links).
- Q: What spam protection mechanism should the contact form use? → A: Invisible honeypot hidden field — silently discards bot submissions without user friction.
- Q: Should the site include visitor analytics tracking? → A: No analytics — no tracking of any kind is included.
- Q: What should appear when a filter tab has zero matching projects? → A: Don't show filter tabs for empty categories — tabs are generated only for categories with at least one project.
