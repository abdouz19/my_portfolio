# Data Model: MAZ Portfolio — Full Site

**Branch**: `001-portfolio-full-site` | **Date**: 2026-03-22

All entities below are TypeScript interfaces defined in `src/lib/types/`. Data is
static (no database) — instances live in `src/lib/constants/` as typed arrays/objects.

---

## Entities

### NavItem
**File**: `src/lib/types/navigation.ts`

| Field   | Type   | Required | Notes |
|---------|--------|----------|-------|
| label   | string | yes      | Display text for nav link |
| href    | string | yes      | Anchor hash (e.g., `#about`) |

---

### SocialLink
**File**: `src/lib/types/navigation.ts`

| Field    | Type   | Required | Notes |
|----------|--------|----------|-------|
| platform | string | yes      | Platform name (LinkedIn, GitHub, Email, Instagram) |
| url      | string | yes      | Full URL or mailto: link |
| icon     | string | yes      | Lucide icon name identifier |

---

### ContactInfo
**File**: `src/lib/types/navigation.ts`

| Field    | Type   | Required | Notes |
|----------|--------|----------|-------|
| email    | string | yes      | Display email address |
| phone    | string | yes      | Display phone number |
| location | string | yes      | City, Country string |

---

### SiteMetadata
**File**: `src/lib/types/navigation.ts`

| Field        | Type   | Required | Notes |
|--------------|--------|----------|-------|
| title        | string | yes      | Page `<title>` |
| description  | string | yes      | Meta description |
| ogImage      | string | yes      | Open Graph image path |
| canonicalUrl | string | yes      | Canonical URL |
| twitterHandle| string | no       | Twitter/X handle if applicable |

---

### Project
**File**: `src/lib/types/project.ts`

| Field            | Type             | Required | Notes |
|------------------|------------------|----------|-------|
| id               | string           | yes      | Unique identifier (kebab-case) |
| title            | string           | yes      | Display name |
| category         | ProjectCategory  | yes      | Enum: "Mobile App" \| "Web App" \| "AI/ML" |
| description      | string           | yes      | Short description (card view) |
| fullDescription  | string           | yes      | Extended description (modal view) |
| features         | string[]         | yes      | Key feature names |
| techStack        | TechStackItem[]  | yes      | Technologies used |
| previewImage     | string           | yes      | Path to card preview image |
| screenshots      | string[]         | no       | Additional images for modal |
| links            | ProjectLinks     | yes      | GitHub repo, live demo URLs |

### ProjectCategory (union type)
`"Mobile App" | "Web App" | "AI/ML"`

### TechStackItem
**File**: `src/lib/types/project.ts`

| Field | Type   | Required | Notes |
|-------|--------|----------|-------|
| name  | string | yes      | Technology name |
| color | string | yes      | Tailwind color class (e.g., `text-green-500 bg-green-500/10`) |

### ProjectLinks
**File**: `src/lib/types/project.ts`

| Field    | Type   | Required | Notes |
|----------|--------|----------|-------|
| github   | string | no       | GitHub repo URL |
| live     | string | no       | Live demo URL |

---

### SkillCategory
**File**: `src/lib/types/skill.ts`

| Field      | Type        | Required | Notes |
|------------|-------------|----------|-------|
| name       | string      | yes      | Category name (e.g., "Mobile Development") |
| icon       | string      | yes      | Lucide icon name |
| accentColor| string      | yes      | Tailwind color class for progress bars |
| skills     | SkillItem[] | yes      | Skills within this category |

### SkillItem
**File**: `src/lib/types/skill.ts`

| Field      | Type   | Required | Notes |
|------------|--------|----------|-------|
| name       | string | yes      | Skill name |
| percentage | number | yes      | Proficiency 0–100 |

---

### ExperienceEntry
**File**: `src/lib/types/experience.ts`

| Field            | Type     | Required | Notes |
|------------------|----------|----------|-------|
| title            | string   | yes      | Job title |
| company          | string   | yes      | Company name |
| type             | string   | yes      | "Remote" \| "Freelance" \| "Volunteering" etc. |
| startDate        | string   | yes      | Format: "MM.YYYY" |
| endDate          | string   | yes      | "Present" or "MM.YYYY" |
| isCurrent        | boolean  | yes      | true for active role |
| responsibilities | string[] | yes      | Bullet point descriptions |

---

### EducationEntry
**File**: `src/lib/types/education.ts`

| Field       | Type   | Required | Notes |
|-------------|--------|----------|-------|
| degree      | string | yes      | Degree title |
| institution | string | yes      | University name |
| startDate   | string | yes      | "MM.YYYY" |
| endDate     | string | yes      | "MM.YYYY" |

### CertificationEntry
**File**: `src/lib/types/education.ts`

| Field    | Type   | Required | Notes |
|----------|--------|----------|-------|
| name     | string | yes      | Certification title |
| provider | string | yes      | Issuing platform |
| date     | string | yes      | "MM.YYYY" |

---

### CommunityOrganization
**File**: `src/lib/types/community.ts`

| Field | Type     | Required | Notes |
|-------|----------|----------|-------|
| name  | string   | yes      | Organization name |
| icon  | string   | yes      | Lucide icon name or custom identifier |
| iconColor | string | yes   | Tailwind color class for icon |
| role  | string   | yes      | Role description |
| tags  | string[] | yes      | Role tags (e.g., "Event Organizer") |

---

## Relationships

```text
NavItem ──── standalone (used by Navbar)
SocialLink ── standalone (used by Hero, Contact)
ContactInfo ── standalone (used by Contact section)
SiteMetadata ── standalone (used by layout.tsx metadata export)

Project ───┬── ProjectCategory (union discriminator)
           ├── TechStackItem[] (embedded)
           └── ProjectLinks (embedded)

SkillCategory ── SkillItem[] (embedded)

ExperienceEntry ── standalone (used by Journey section)

EducationEntry ── standalone (used by Education section)
CertificationEntry ── standalone (used by Education section)

CommunityOrganization ── standalone (used by Community section)
```

No foreign keys or relational joins — all entities are self-contained typed objects
consumed directly by section components via imports from `src/lib/constants/`.

## Validation Rules

| Rule | Applied To | Source |
|------|-----------|--------|
| `percentage` must be 0–100 | SkillItem | Type constraint + constants review |
| `category` must match a known ProjectCategory | Project | Union type enforcement |
| `email` in ContactInfo must be a valid email format | ContactInfo | Constants review (not runtime validated) |
| `href` must start with `#` | NavItem | Convention — anchors only |
| At least one of `github` or `live` must be defined | ProjectLinks | Spec FR-017a requires links in modal |
