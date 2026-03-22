# Data Model: Project Preview Gallery

## New Interfaces

### ProjectScreenshots

Represents the screenshot collection for a single project.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| platform | `"mobile" \| "web" \| "desktop"` | Yes | Determines which device frame type to render |
| images | `string[]` | Yes | Ordered array of image paths relative to `public/` |

**Validation rules**:
- `images` array must contain at least 0 items (empty = no gallery / placeholder)
- `platform` must be one of the three literal string values
- Image paths must start with `/images/projects/`

### Updated: Project

The existing `Project` interface gains one new optional field:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| screenshots | `ProjectScreenshots` | No | Screenshot gallery data; if absent, gallery shows placeholder or hides |

**Backward compatibility**: The `screenshots` field is optional. Existing projects without it continue to work — the gallery component checks for its presence and gracefully degrades.

## Relationships

```
Project (1) ──has──> (0..1) ProjectScreenshots
ProjectScreenshots (1) ──contains──> (0..N) image paths (string)
```

## Data Constants Update

Each project in `src/lib/constants/projects.ts` receives a `screenshots` entry:

- **Trust Laundry**: `{ platform: "mobile", images: ["/images/projects/trust-laundry/screen-1.png", ..., "screen-5.png"] }`
- **DeliveryX Driver**: `{ platform: "mobile", images: ["/images/projects/deliveryx-driver/screen-1.png", ..., "screen-5.png"] }`
- **Esidea**: `{ platform: "web", images: ["/images/projects/esidea/screen-1.png", ..., "screen-3.png"] }`
- **Comerco**: `{ platform: "mobile", images: ["/images/projects/comerco/screen-1.png", ..., "screen-5.png"] }`
