# Logo Usage Guide

## The Logo System

The Citi Maju logo system has three assets and three entity variants.

**Three assets:**
- **Mark** — the CM initials with gold underrule. Standalone symbol.
- **Wordmark** — "CITI MAJU" in Sora 300 ALL CAPS, with entity name below in smaller Sora 300 ALL CAPS.
- **Lockup** — Mark + Wordmark combined. Available in horizontal and stacked configurations.

**Three entity variants:**
- **Group** — for general use, networking, and materials not tied to one entity
- **Engineering** — for Engineering entity contracts, tenders, and Engineering-specific materials
- **Construction** — for Construction entity contracts and Construction-specific materials

Logo files are in `assets/logos/`. See the file naming convention below.

---

## The Mark — Specifications

The CM mark is set in **Cormorant Garamond weight 600**. It is not an icon or graphic — it is the initials drawn in the brand typeface, with a gold hairline underrule.

**SVG ViewBox:** `0 0 97 111`

| Element | Value |
|---|---|
| Text | `x=48.5 y=74 font-size=60 font-weight=600 letter-spacing=-1` |
| Text anchor | `middle` |
| Underrule x1 | `18.5` |
| Underrule x2 | `78.5` |
| Underrule y | `97` |
| Underrule stroke | `#C8921A` |
| Underrule stroke-width | `1.5` |

**Golden ratio construction:**
- Container width = cap height × φ (1.618)
- Rule width = cap height × 1.0 (deliberately shorter than the letter span)
- Baseline to rule gap = cap height ÷ φ²
- Padding = cap height ÷ φ³

These proportions must not be altered. The relationship between the letters and the underrule is exact. Do not stretch, compress, or reposition elements.

---

## Colour Variants

| File | Use Case |
|---|---|
| `cm-mark-blue.svg` | Default. Light or white backgrounds. |
| `cm-mark-white.svg` | Dark or navy backgrounds. |
| `cm-mark-navy.svg` | Use only on warm paper or cream backgrounds. |

The gold underrule (`#C8921A`) appears on all variants. It does not change.

---

## Wordmark

"CITI MAJU" is set in **Sora weight 300, ALL CAPS, tracked**. Below it, the entity name in a smaller size:
- "GROUP" / "ENGINEERING SDN BHD" / "CONSTRUCTION SDN BHD"

The wordmark is never used independently of the mark in formal materials. It may appear without the mark only in running text references (e.g., in a footer line: "Citi Maju Group").

---

## Lockup Configurations

**Horizontal lockup:** Mark on the left, wordmark to the right, vertically centred to cap height.
**Stacked lockup:** Mark centred above, wordmark centred below. Used when horizontal space is constrained (e.g., square social avatars, stacked namecard layouts).

---

## Minimum Sizes

| Application | Minimum Size |
|---|---|
| Digital (screen) | 32px height |
| Print | 12mm height |
| Embossed / embroidered | 20mm height |

Below these sizes, the underrule becomes imperceptible and the letterforms lose definition. Use the mark only (no wordmark) at minimum sizes.

---

## Clear Space

Maintain clear space equal to the cap height of the CM mark on all four sides. No other graphic element, text, or edge of a page enters this zone.

---

## Incorrect Usage

Do not:
- Stretch or distort the mark in any direction
- Change the gold underrule to any other colour
- Use a drop shadow, glow, outline, or any effect
- Place the blue mark on a mid-blue background (insufficient contrast)
- Use the mark on a busy photographic background without a colour block behind it
- Recreate the mark in any other typeface
- Add the company tagline or any text inside the logo clear space zone

---

## File Naming Convention

```
cm-mark-[colour].svg          — Mark only
cm-wordmark-[entity].svg      — Wordmark only
cm-lockup-h-[entity]-[bg].svg — Horizontal lockup
cm-lockup-s-[entity]-[bg].svg — Stacked lockup
```

Where:
- `[colour]` = blue / white / navy
- `[entity]` = group / engineering / construction
- `[bg]` = dark / light

Example: `cm-lockup-h-engineering-dark.svg`
