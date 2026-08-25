---
name: pattern-pulita
description: >-
  Applies the Pulita design system: white/wash surfaces, organic blue blobs,
  Instrument Serif display, Geist body, pill navy CTAs. Use when building or
  editing UI for this project.
---

# Pulita — design system canonico

**Read [PATTERN.md](PATTERN.md) before writing any UI code.**

The live look is `html[data-look="clean"]` (`src/looks/clean.css`). Do not restyle the site as Inchiostro lastre unless the user asks to revert.

Do not reintroduce neon `#00df8f`, Inter, Space Grotesk, or process yellow `#f0c400`.

## Layout

- Content max-width `1200px`
- No 6-column hairline overlay
- Section padding `88px` / `120px` from `768px`
- Nav height `76px`: brand left, links center, Contatti pill right
- One primary CTA per section

## Surfaces

| Token | Hex | Use |
|-------|-----|-----|
| `--paper` | `#ffffff` | Default page |
| `--wash` | `#f5f8fb` | Chi sono, Servizi, Contatti |
| `--ink` | `#1b2430` | Text |
| `--muted` | `#66707c` | Body |

Hero + ticker + lavori + CV sit on white. Organic sky blobs are decoration only.

## Type

- **Display:** Instrument Serif italic, `clamp(2.4rem, 6.4vw, 4.75rem)`, leading `0.96`
- **Body:** Geist `1.0625rem` / 1.7
- **Meta:** Geist Mono or Geist uppercase tracking `0.18em`–`0.22em`

## Color + CTA

| Token | Hex | Use |
|-------|-----|-----|
| `--spot-deep` | `#1e3a8a` | CTA fill, active nav, stats, contact |
| `--spot` | `#38bdf8` | Blobs, ticker, marks — **never body text on white** |
| `--accent` | `#1d4ed8` | Optional action |

CTA: pill `999px`, navy fill, white type, hover lift `-2px`. Cards: radius `16px`–`24px`, `--soft-shadow`.

## Revert

Inchiostro is archived (`src/looks/ink.css`, `?look=ink`). Do not evolve it. Future UI work goes in the Pulita overlay only.
