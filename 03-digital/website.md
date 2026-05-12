# Website Design Guidelines

## Platform

The Citi Maju Group website is built on **Next.js** (App Router) with **Sanity CMS** for content management. All public-facing text is editable by staff through Sanity Studio at `/studio`. The site is deployed via Hostinger from the `main` branch on GitHub.

---

## Design Language

The website follows the same aesthetic direction as the rest of the CI: **Industrial Refined**. The reference tone is editorial and authoritative — restrained, not corporate. Design decisions were informed by the layout and editorial sensibility of leading global engineering consultancy sites.

**Guiding principles for every decision:**
- Whitespace is intentional, not accidental. Generous vertical padding signals confidence.
- Typography carries authority. Let Cormorant Garamond do the heavy lifting on headings — do not clutter it with decorative elements.
- Gold (`#C8921A`) is used sparingly: eyebrow labels, CTA accent, hairlines. Never as a background fill.
- Every section should breathe. If two sections look crowded, add space before adding content.

---

## Layout Structure

### Navigation
- Sticky full-width top bar, `#071E3D` deep navy background
- Logo left, nav links centre-right, primary CTA button far right
- Nav height: 88px

### Hero
- Full viewport height (`100vh` minimum)
- Background: `#071E3D` with subtle radial gradient
- Left-edge gold vertical rule (3px, `#C8921A`)
- Heading: Cormorant Garamond, `clamp(3rem, 7.5vw, 6.5rem)`, white
- Subtext: constrained to 580px max-width
- Stats block: editorial treatment — each stat uses Cormorant Garamond `clamp(2rem, 4vw, 3.25rem)` for the value, Sora 10px uppercase for the label below it

### Section Spacing
All major page sections use a minimum of **9rem top and bottom padding** on desktop. Sections with a dark (navy) background can use 8rem. Do not go below 7rem for any full-width section. This is not negotiable — cramped sections undermine the brand register.

### Section Order (Home Page)
1. Hero — full viewport, navy
2. Services — warm off-white (`#F7F4EF`)
3. Projects — navy (`#071E3D`)
4. About CTA — white

### Content Max Width
`1280px`, centred, with `2rem` horizontal padding. Body text columns are further constrained to 580–720px to maintain comfortable line lengths.

---

## Page-Specific Layouts

### Home — Projects Grid
An asymmetric layout is used for the featured projects section:
- First (featured) project: spans 2 columns, `16:10` aspect ratio, heading in Cormorant Garamond
- Second and third projects: stacked in the right column, `4:3` aspect ratio
- Remaining projects: 3-column row below

This asymmetry prevents the section from reading as a generic grid and gives the most important project editorial weight.

### Services Page — Category Groups
Services are grouped by category (Water & Utilities, Civil & Structural, Renovation & Finishing, Engineering). Each group has a Cormorant Garamond H2 with a gold vertical rule. Cards within each group use a clean `gap: 1.5rem` grid — no hairline gap tricks.

### About Page
- Two-column layout: body copy left, pull quote block right
- Credentials displayed as cards on navy background
- Each section separated with generous padding (8–9rem)

---

## Component Conventions

### Service Cards
- Background: white or `#F7F4EF`
- Hover: darken background slightly (`#F0EDE7`)
- Bottom border accent: 2px solid in category colour (not a left-edge bar)
- No visible card border on top/sides

### Project Cards
- Full-bleed image with gradient overlay (dark at bottom, transparent at top)
- Category label in gold, `10px` Sora uppercase
- Title in Sora 600 (small cards) or Cormorant Garamond 400 (large featured card)
- Location in muted blue-white, `12px` Noto Sans

### Stats (Hero)
- Value: Cormorant Garamond, ~`3rem`, white
- Label: Sora 300, `10px`, `0.14em` tracking, uppercase, muted gold (`rgba(200,146,26,0.75)`)
- Displayed in a grid row separated from the heading by a border-top

### CTA Buttons
- Primary: gold fill (`#C8921A`), dark navy text, Sora 600, `13px`, no border-radius
- Secondary: transparent, white border, white text — border darkens on hover
- Text links: underlined with gold hairline, Sora 500–600

---

## Colour Usage on the Website

| Context | Colour |
|---|---|
| Page backgrounds (light) | `#F7F4EF` (warm off-white) or `#ffffff` |
| Page backgrounds (dark) | `#071E3D` (Deep Navy) |
| Pull quote / sidebar panels | `#F5F2EC` |
| Heading text on light | `#0D1B2E` |
| Body text | `#3A5068` |
| Eyebrow labels (light BG) | `#1B4F8A` (Brand Blue) |
| Eyebrow labels (dark BG) | `#C8921A` (Refined Gold) |
| Gold hairlines and accents | `#C8921A` |

---

## Typography on the Website

Follows the main CI typography system exactly. Key web-specific notes:

- H1 on hero: `clamp(3rem, 7.5vw, 6.5rem)` — do not go smaller
- H2 section headings: `clamp(2.25rem, 4.5vw, 3.75rem)` — do not go smaller
- All Cormorant Garamond headings: `font-weight: 400`, `line-height: 1.0–1.15`
- Eyebrows always: Sora 300, `10–11px`, `0.14–0.2em` tracking, ALL CAPS
- Body copy: Noto Sans 400, `14–17px`, `line-height: 1.75–1.85`

---

## Content Management (Sanity)

Every text string visible on the website is editable via Sanity Studio. Documents:

| Sanity Document | Controls |
|---|---|
| Site Settings | Logo, tagline, contact details, nav labels, footer text |
| Home Page | Hero (heading, eyebrow, subtext, CTAs, stats), Services section labels, Projects section labels, About CTA section |
| About Page | Hero, main body, pull quote, entity cards, credentials, CTA |
| Services Page | Hero, CTA |
| Projects Page | Hero, filters label, CTA |
| Contact Page | Hero, intro, form labels |

Service and project listings are managed as separate CMS document types (Projects, Services) and displayed dynamically.

If a Sanity field is empty, the site falls back to the hardcoded default — it will never show a blank field. Editors should populate all fields in Sanity Studio to override the defaults.

---

## Deployment

- Repository: `ivaniggyang/citimajuwebsite3` on GitHub
- Production branch: `main`
- Host: Hostinger (Next.js deployment)
- Studio URL (after deployment): `[domain]/studio`
- Environment variables required: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SMTP_USER`, `SMTP_PASS`
