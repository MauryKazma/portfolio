---
name: "Full-bleed Grid with Dividers"
description: "Vertical column hairlines, section lastre (ink / paper / CUBOT navy), Instrument Serif display. Palette: Inchiostro vivo."
tags: [layout, grid, editorial, print]
type: pattern
container: "full-bleed"
content_max_width: 1200px
page_padding: 0px
grid:
  columns:     0
  max_columns: 0
  line_color:  "none — overlay removed at user request"
  line_width:  0px
  line_style:  none
  edge_lines:  false
sections:
  padding_y:      "88px mobile / 120px from 768px"
  divider_color:  "rgba(18, 18, 18, 0.12) on paper; rgba(247,244,238,0.14) on ink"
  divider_width:  1px
  divider_style:  solid
  tones:          "paper (default), ink, spot"
  band_fill:      "repeating-linear-gradient(135deg, rgba(247,244,238,0.07) 0 1px, transparent 1px 9px) on ink hero"
intersections:
  style: none
  color: "rgba(18, 18, 18, 0.10)"
  size:  6px
design:
  colors:
    ink:      "#121212"
    paper:    "#f7f4ee"
    surface:  "#f7f4ee"
    raised:   "#fffcf7"
    accent:   "#1d4ed8"
    spot:     "#38bdf8"
    spot-deep: "#1e3a8a"
    muted:    "#5c5752"
    paper-muted: "#b7b1a7"
    hairline: "#d6d0c6"
  fonts:
    display: "Instrument Serif"
    body:    Geist
    mono:    "Geist Mono"
  radius: 0px
  motion:
    fast: "140ms"
    ui: "220ms"
    ease: "cubic-bezier(0.2, 0.8, 0.2, 1)"
  google_fonts_url: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap"
---

# Full-bleed Grid with Dividers

## AI Build Instructions

> **Read this section before writing any code.** The rules below
> are non-negotiable. Every value used in the UI must come from this
> file's frontmatter — never substitute, approximate, or invent new
> colors, fonts, radii, or shadows. If a value is missing, ask the
> user before adding one.

### 1 · Your role

You are building UI for a project that has adopted **Full-bleed Grid with Dividers** as its
design system. Treat `PATTERN.md` as the single source of truth.
Your job is to translate the user's product requirements into
components and pages that look like they were designed by the same
person who authored this file.

### 2 · Token compliance

- Pull every color, font family, radius, shadow, and spacing value
  from the frontmatter at the top of this file.
- Use semantic roles (e.g. `primary`, `accent`, `muted`) — never
  hard-code hex values that bypass the system.
- When a token can be expressed as a CSS variable, declare it once
  in your global stylesheet and reference it everywhere downstream.
- The Google Fonts `<link>` is provided in the Typography section.
  Add it to `<head>` before any component renders.

### 3 · Build recipes

#### Page skeleton (the layout contract)

- Container: `full-bleed`
- Content max-width: `1200px` (typography respects this even when the page is full-bleed).
- Vertical grid: **6 column hairlines** (capped at 6 on wide viewports), drawn with `1px solid rgba(18, 18, 18, 0.07)`.
- Draw lines on the outer left and right edges of the page.
- Section padding: `80px` top + bottom on small screens, `104px` from `768px`.
- Section divider: `1px solid rgba(18, 18, 18, 0.1)` between sections.
- Use the diagonal-stripe band fill **at most once per page** as a section opener. Hero may add grain + a single sky radial — not a mesh on every section.

#### Primary CTA

Exactly **one** primary CTA per page or section. The pattern's discipline depends on this.

- Background: `#1e3a8a` · Color: `#f7f4ee`
- Hover: background `#121212` · text `#f7f4ee`
- On ink/navy: background `#38bdf8` · text `#121212`; hover paper/ink
- Padding: `11px 22px` · Weight: `500`
- Shape: `sharp` (radius: `0px`)

#### Headlines

- Family: `Geist` · Size: `clamp(2.75rem, 6.4vw, 4.35rem)` · Leading: `0.95` · Weight: `600`
- Tracking: `-0.045em`

#### Body copy

- Family: `Geist` · Size: `0.9375rem` · Leading: `1.55` · Color: `#5c5752`
- Max line length: 60–66 characters. Never let prose stretch the full content width.

#### Eyebrows / metadata

- Family: `Geist Mono` · Size: `0.6875rem` · Letter-spacing: `0.16em`
- Uppercased. Color: `#121212`.

### 4 · Hard constraints

Never do any of the following without explicit instruction from the user:

- Introduce a new color, font, radius, or shadow that isn't declared above.
- Mix this system with another (e.g. don't paste in Material or Bootstrap defaults).
- Use generic gradient defaults (purple→blue, peach→pink) — they break the system's voice.
- Reach for emoji icons. Use a consistent icon library and size icons in line with body type.
- Add decorative motion beyond `--t-ui` (220ms). Image crop zoom may use 420ms. Scroll-driven animation may last as long as the scroll.
- Break the layout contract: the column count, divider rhythm, and content max-width are part of the pattern.
- Reintroduce neon `#00df8f`, Inter, Space Grotesk, pills, or white-on-pure-white unless the user asks to revert.

### 5 · Before you finish — verify

Run through this checklist for every screen you produce:

- [ ] Every color used appears in the Colors table above.
- [ ] Headlines use the display font; body copy uses the body font.
- [ ] Buttons match one of the declared variants exactly (shape, padding, weight).
- [ ] Border-radius values come from `radius.sm` / `radius.md` / `radius.lg` / `radius.pill`.
- [ ] Cards and dividers use the declared border + shadow tokens.
- [ ] The page respects the pattern's grid (column count + content max-width).
- [ ] Section dividers use the declared color, width, and style.
- [ ] Exactly one primary CTA per section — never duplicate.
- [ ] No values were invented; if you needed something missing, you stopped and asked.

---

## Overview

The full-bleed grid is a structural device, not a decoration. Vertical hairlines
run from the top of the viewport to the footer; horizontal hairlines mark the
boundaries between sections. Together they create a steady rhythm and a
"calibrated instrument" feel that suits SaaS, fintech, and developer tooling.

Content stays inside a centered max-width column for readability. The grid
itself sits behind the content, painted into the page background, and is never
allowed to crop or break the typography.

## When to use it

- Marketing homepages where the product is technical and trust matters.
- Long landing pages with several distinct sections that benefit from clear
  separation.
- Pricing, docs, and feature pages where a measured, surveyed feel is on-brand.

## When to avoid it

- Heavily illustrated pages or pages with full-bleed imagery — the lines
  compete with the visuals.
- Mobile-first apps where viewport width is too narrow to make the columns
  legible. Drop to 2 columns or hide them entirely below 768px.

## Do

- Keep the lines low-contrast (4–8% opacity over the page background).
- Use the same column count globally so the grid feels like architecture, not
  decoration.
- Align important hero elements (logo, CTA) to a column line for a crafted feel.

## Don't

- Don't draw the grid above z-index 0 — it must read as background, not foreground.
- Don't mix multiple column counts on the same page.
- Don't use the diagonal stripe band more than once per page; it loses meaning
  if repeated.

## Notes

- The pattern works with any color system. The hairline color should be derived
  from the system's foreground at 6–10% alpha so it sits naturally over the
  surface tone.
- Pair with sans-serif or mono typography for the strongest "instrument" effect.

---

## Tokens

> Generated from the same source the live preview renders from.
> Treat the values below as the contract — never substitute approximations.

### Container

| Property | Value |
|----------|-------|
| container | `full-bleed` |
| contentMaxWidth | `1200px` |
| pagePadding | `0px` |

### Vertical Grid

| Property | Value |
|----------|-------|
| columns | `6` |
| maxColumns | `6` |
| lineColor | `rgba(18, 18, 18, 0.07)` |
| lineWidth | `1px` |
| lineStyle | `solid` |
| edgeLines | `true` |

### Section Dividers

| Property | Value |
|----------|-------|
| paddingY | `80px` / `104px` from `768px` |
| dividerColor | `rgba(18, 18, 18, 0.1)` |
| dividerWidth | `1px` |
| dividerStyle | `solid` |
| bandFill | `repeating-linear-gradient(135deg, rgba(18,18,18,0.045) 0 1px, transparent 1px 8px)` |

### Intersections

| Property | Value |
|----------|-------|
| style | `none` |
| color | `rgba(18, 18, 18, 0.10)` |
| size | `6px` |

## Design Identity

> Palette **Inchiostro vivo**: warm paper, CUBOT blues as spot (`#38bdf8` on ink, `#1e3a8a` on paper / as lastre).
> Use the values below verbatim — they are the system, not a starting point.

### Colors

| Token | Value |
|-------|-------|
| ink (primary text) | `#121212` |
| surface (page background) | `#f7f4ee` |
| raised (nav/card wash) | `#fffcf7` |
| accent (action) | `#1d4ed8` |
| spot (sky, on ink only) | `#38bdf8` |
| spot-deep (navy, paper + lastre) | `#1e3a8a` |
| muted (body on paper) | `#5c5752` |
| paper-muted (body on ink/navy) | `#b7b1a7` |
| hairline (rules and dividers) | `#d6d0c6` |

Sky `#38bdf8` is fill, underline, and hover on dark — never body text on paper.

### Typography

Load via Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
```

| Role | Family |
|------|--------|
| display (headlines) | `Geist` |
| body (prose) | `Geist` |
| mono (metadata, numerals) | `Geist Mono` |

### Type Scale

| Role | Size | Leading | Weight | Tracking |
|------|------|---------|--------|----------|
| Hero / H1 | `clamp(2.75rem, 6.4vw, 4.35rem)` | `0.95` | `600` | `-0.045em` |
| Body | `0.9375rem` | `1.55` | `400` | — |
| Eyebrow | `0.6875rem` | — | `500` | `0.16em` |

### Primary CTA

| Property | Value |
|----------|-------|
| shape | `sharp` |
| background | `#1e3a8a` |
| color | `#f7f4ee` |
| hover background | `#121212` |
| hover color | `#f7f4ee` |
| padding | `11px 22px` |
| fontWeight | `500` |
| radius | `0px` |

> One CTA per page. The pattern's discipline depends on this — never duplicate.

---

## Reference Implementation

Copy-paste-ready HTML + CSS that renders this pattern with the exact token
values declared above. Theme the colors against your system's hairline tone.

### HTML

```html
<div class="page">
  <!-- Vertical column hairlines, full viewport height -->
  <div class="grid-overlay" aria-hidden="true">
    <span></span><span></span><span></span>
    <span></span><span></span><span></span><span></span>
  </div>

  <header class="section">
    <div class="content">
      <h1>Page title</h1>
    </div>
  </header>

  <section class="section">
    <div class="content">…</div>
  </section>

  <section class="section section--band">
    <div class="content">…</div>
  </section>
</div>
```

### CSS

```css
:root {
  --content-max: 1200px;
  --ink: #121212;
  --surface: #f7f4ee;
  --spot: #38bdf8;
  --spot-deep: #1e3a8a;
  --grid-line: rgba(18, 18, 18, 0.07);
  --divider:   rgba(18, 18, 18, 0.1);
  --section-y: 80px;
}

@media (min-width: 768px) {
  :root { --section-y: 104px; }
}

.page { position: relative; min-height: 100vh; }

/* Full-height vertical hairlines.
   Drawn with a 6-column flex container that fills the viewport. */
.grid-overlay {
  position: absolute; inset: 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  pointer-events: none;
  z-index: 0;
}
.grid-overlay span {
  border-right: 1px solid var(--grid-line);
}
.grid-overlay span:first-child { border-left: 1px solid var(--grid-line); }

/* Sections sit above the grid, with a horizontal hairline between them. */
.section {
  position: relative;
  z-index: 1;
  padding: var(--section-y) 0;
  border-bottom: 1px solid var(--divider);
}

/* Content stays centered, never full-bleed. */
.content {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 0 24px;
}

/* Optional diagonal-stripe band — use sparingly. */
.section--band {
  background-image: repeating-linear-gradient(
    135deg,
    rgba(18,18,18,0.045) 0 1px,
    transparent 1px 8px
  );
}
```
