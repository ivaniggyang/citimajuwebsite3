# Typography System

## Font Stack

Citi Maju uses three typefaces, each with a distinct role. Do not substitute or mix these roles.

| Typeface | Role | Weight(s) Used |
|---|---|---|
| Cormorant Garamond | Display headings (H1, H2), logo mark | 400, 500, 600 |
| Sora | Functional text: H3+, nav, labels, buttons, tags, captions, ALL CAPS eyebrows | 300, 400, 500, 600, 700, 800 |
| Noto Sans | Body copy, long-form text | 300, 400, 500, 600 |

**Google Fonts import URL:**
```
https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Sora:wght@300;400;500;600;700;800&family=Noto+Sans:wght@300;400;500;600&display=swap
```

**CSS font-face declarations** and download links are in `assets/fonts/`.

---

## Type Hierarchy

### H1 — Page / Section Title
- **Font:** Cormorant Garamond 400
- **Size (web):** 48–72px
- **Size (print):** 28–36pt
- **Colour:** Text Dark (#0D1B2E) on light; White on dark
- **Use:** Page titles, major section headings, cover slide titles

### H2 — Section Heading
- **Font:** Cormorant Garamond 400
- **Size (web):** 32–48px
- **Size (print):** 20–28pt
- **Colour:** Text Dark or Brand Blue (#1B4F8A)
- **Use:** Section dividers in documents, secondary slide headings

### H3 — Sub-heading
- **Font:** Sora 600
- **Size (web):** 18–24px
- **Size (print):** 13–16pt
- **Letter spacing:** 0.02em
- **Use:** Subsection headings, table headers, card labels

### H4 — Sub-sub-heading
- **Font:** Sora 500
- **Size (web):** 15–18px
- **Size (print):** 11–13pt
- **Use:** Deep document structure, sidebar labels

### Eyebrow / Label
- **Font:** Sora 300, ALL CAPS
- **Size:** 9–11px (web), 6–8pt (print)
- **Letter spacing:** 0.12–0.18em
- **Colour:** Brand Blue or Text Mid
- **Use:** Above section headings to categorise content, tag lines on namecards, column headers in tables

### Body Copy
- **Font:** Noto Sans 400
- **Size (web):** 15–16px
- **Size (print):** 9–10pt
- **Line height:** 1.65–1.75
- **Use:** All paragraphs, email body, document body

### Caption / Footnote
- **Font:** Noto Sans 300
- **Size:** 12px (web), 7–8pt (print)
- **Colour:** Text Light (#6B849C)
- **Use:** Image captions, table footnotes, reference notes

### Button / CTA
- **Font:** Sora 600
- **Size:** 13–15px
- **Letter spacing:** 0.04em
- **Case:** Title Case (not ALL CAPS)
- **Use:** Buttons, call-to-action links

---

## The Garamond Rule

**Cormorant Garamond is used only on H1 and H2.** Everything else — navigation, buttons, labels, sub-headings, eyebrows, body — stays in Sora or Noto Sans.

This is not a stylistic preference. It is a structural rule. Garamond at H3 or smaller sizes loses legibility and undermines the distinction between display and functional type. If you are tempted to use Garamond below H2, use Sora instead.

---

## Type on Dark Backgrounds

On navy or dark backgrounds:
- H1, H2: White (#FFFFFF), Cormorant Garamond 400
- H3+: White or Blue Pale (#E8F1FB), Sora
- Body: White or Blue Pale, Noto Sans
- Avoid Text Dark, Text Mid, Text Light on dark backgrounds

---

## Print Typography Notes

When preparing documents for print (PDF, InDesign, Word):
- Embed fonts, do not rely on system substitution
- Use optical kerning, not metric kerning
- Minimum body text size for print: 9pt
- Minimum label/eyebrow size for print: 6pt (Sora handles small sizes better than Garamond)
- For documents printed at high volume, Noto Sans renders more reliably on mid-range office printers than Cormorant Garamond — keep body in Noto Sans

---

## Microsoft Office Fallbacks

When Cormorant Garamond or Sora are not available (Office on Windows, for example):
- **Cormorant Garamond → Garamond** (built into Windows) or **EB Garamond**
- **Sora → Gill Sans MT** or **Trebuchet MS**
- **Noto Sans → Calibri** or **Arial**

Note: these are fallbacks only. Final branded materials must use the correct fonts.
