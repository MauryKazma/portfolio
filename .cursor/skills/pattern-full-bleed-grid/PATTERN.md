---
name: "Pulita"
description: "White / wash agency look: organic sky blobs, Instrument Serif display, Geist body, pill navy CTAs. Canonical look for this portfolio."
tags: [layout, agency, organic, portfolio]
type: pattern
container: "full-bleed"
content_max_width: 1200px
page_padding: 0px
grid:
  columns:     0
  max_columns: 0
  line_color:  "none"
  line_width:  0px
  line_style:  none
  edge_lines:  false
sections:
  padding_y:      "88px mobile / 120px from 768px"
  divider_color:  "none — rhythm via --wash vs --paper"
  divider_width:  0px
  divider_style:  none
  tones:          "paper (white), wash (#f5f8fb). Do not use ink/spot lastre on the default look."
  band_fill:      "soft radial sky blobs on hero only"
design:
  colors:
    ink:         "#1b2430"
    paper:       "#ffffff"
    wash:        "#f5f8fb"
    surface:     "#ffffff"
    raised:      "#ffffff"
    accent:      "#1d4ed8"
    spot:        "#38bdf8"
    spot-deep:   "#1e3a8a"
    muted:       "#66707c"
    paper-muted: "#7b8494"
    hairline:    "#e4ecf4"
  fonts:
    display: "Instrument Serif"
    body:    Geist
    mono:    "Geist Mono"
  radius: 16px
  radius_card: 24px
  radius_pill: 999px
  shadow: "0 20px 50px rgba(30, 58, 138, 0.07)"
  shadow_lg: "0 28px 64px rgba(30, 58, 138, 0.12)"
  motion:
    fast: "180ms"
    ui: "220ms"
    rise: "780ms"
    ease: "cubic-bezier(0.22, 1, 0.36, 1)"
  google_fonts_url: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap"
  css_source: "src/looks/clean.css"
  html_flag: 'html[data-look="clean"]'
---

# Pulita

## AI Build Instructions

> **Read this section before writing any code.** Tokens come from the frontmatter.
> Implementation lives in `src/looks/clean.css`. Do not invent colors, radii, or shadows.

### 1 · Your role

This portfolio’s **canonical** visual system is **Pulita**: white agency field, Cubot navy CTAs, sky used only as atmosphere, Instrument Serif for display. Translate product requests so they look like the same designer authored the page.

The previous **Inchiostro** look has been removed. Do not add Inchiostro styles.

### 2 · Token compliance

- Use CSS variables already declared on `html[data-look="clean"]`.
- Sky `#38bdf8` is never body copy on white (contrast fails). Navy `#1e3a8a` is text/fill on paper.
- One primary CTA per section.

### 3 · Build recipes

#### Page skeleton

- Full-bleed page, content column `1200px`, inline padding `clamp(20px, 4vw, 32px)`.
- No 6-column hairline overlay.
- Section rhythm: white (`#lavori`, `#curriculum`, hero) vs wash `#f5f8fb` (`#chi-sono`, `#servizi`, `#contatti`).
- Hero is a min-height viewport band with two organic blobs (page `::before`/`::after` + hero radial). Align copy and portrait vertically.

#### Navigation

- Fixed, frosted white, height `76px`.
- **Brand** (uppercase Geist, tracking) left · **links** center · **Contatti** outline pill right.
- On scroll: hairline + light shadow.
- Mobile: circular icon button; full-viewport overlay menu.

#### Primary CTA

- Background `#1e3a8a` · Color `#ffffff`
- Hover: lift `-2px`, deeper navy shadow (not a brightness filter)
- Padding `13px 26px` · Weight `500` · Radius `999px`
- On the default look, do **not** switch CTA to sky fill.

#### Headlines

- Family: Instrument Serif italic
- Size: `clamp(2.4rem, 6.4vw, 4.75rem)` · Leading `0.96` · Weight `400`
- Color: `#1b2430` · Max width ~`16ch`

#### Body

- Family: Geist · Size `1.0625rem` · Leading `1.7` · Color `#66707c`
- Measure: do not stretch prose across the full 1200px.

#### Eyebrows

- Uppercase · tracking `0.18em`–`0.22em` · color `#8b95a3`

#### Cards / chips

- Cards: radius `22px`–`24px`, `--soft-shadow`, hover lift `-4px` on service cards.
- Chips / toolkit: pill, navy text, hairline border, white fill.
- Project preview: image first (left on desktop), list as selector, category chip on the photo.

#### Motion

- Section reveal: `780ms` `cubic-bezier(0.22, 1, 0.36, 1)`, `translateY(28px)`.
- Ticker: masked edges, ~42s loop.
- Honor `prefers-reduced-motion`.

### 4 · Hard constraints

Never do the following unless the user explicitly asks:

- Restore ink/navy **lastre** (full dark or full `#1e3a8a` section fills) on the default look.
- Restore radius `0`, sharp CTAs, process yellow, neon green, Inter, or Space Grotesk.
- Restore the 6-column overlay.
- Use sky `#38bdf8` as paragraph text on white.
- Duplicate primary CTAs in one section.
- Restore or reintroduce Inchiostro (`data-look="ink"`, lastre, radius 0).

### 5 · Before you finish

- [ ] Tokens match the Colors table
- [ ] Display = Instrument Serif italic; body = Geist
- [ ] CTA is navy pill on white
- [ ] One primary CTA per section
- [ ] Sky only on blobs / ticker / marks
- [ ] Changes landed in `src/looks/clean.css` (or components)
- [ ] Previewed locally; asked before GitHub/Railway unless the user already said to uppare

---

## Overview

Pulita is a **founder-led agency** system: generous white, one navy action, serif display for craft, soft blue atmosphere instead of dark plates. It is the middle ground between this portfolio’s identity (Instrument Serif + Cubot blue) and the cleanliness of references like Stratego.

## When to use it

Always, for new UI on this project.

## When to avoid it

Only if the user explicitly asks to abandon Pulita for a new system.

## Do

- Keep whitespace; let type and one photo carry the hero.
- Alternate wash/white so long pages still have rhythm without hard rules.
- Prefer progressive disclosure on services (cards closed until clicked).

## Don't

- Don’t fill the page with competing blobs on every section (hero + servizi accent is enough).
- Don’t add a look-switcher or a second visual system.

---

## Tokens

### Container

| Property | Value |
|----------|-------|
| container | `full-bleed` |
| contentMaxWidth | `1200px` |
| pagePadding | `0` (content uses `clamp(20px, 4vw, 32px)`) |

### Surfaces

| Token | Value | Role |
|-------|-------|------|
| paper | `#ffffff` | Default |
| wash | `#f5f8fb` | Alternate sections |
| ink | `#1b2430` | Text |
| muted | `#66707c` | Body |
| hairline | `#e4ecf4` | Rules |
| spot | `#38bdf8` | Atmosphere |
| spot-deep | `#1e3a8a` | Action / emphasis |

### Radius & shadow

| Token | Value |
|-------|-------|
| control / chip | `999px` |
| card | `16px`–`24px` |
| soft-shadow | `0 20px 50px rgba(30, 58, 138, 0.07)` |
| soft-shadow-lg | `0 28px 64px rgba(30, 58, 138, 0.12)` |

### Typography

Load Geist + Geist Mono + Instrument Serif (italic) from Google Fonts as in `index.html`.

| Role | Size | Leading | Weight | Tracking |
|------|------|---------|--------|----------|
| Hero / H2 | `clamp(2.4rem, 6.4vw, 4.75rem)` | `0.96` | `400` italic | `-0.03em` |
| Body | `1.0625rem` | `1.7` | `400` | — |
| Eyebrow | `0.6875rem` | — | `500` | `0.18em`+ |

### Primary CTA

| Property | Value |
|----------|-------|
| shape | `pill` |
| background | `#1e3a8a` |
| color | `#ffffff` |
| hover | lift `-2px`, shadow-lg |
| padding | `13px 26px` |
| fontWeight | `500` |
| radius | `999px` |
