---
name: pattern-full-bleed-grid
description: >-
  Applies the Full-bleed Grid with Dividers design system: 1200px content
  column, ink/paper/navy lastre, Instrument Serif display, Geist body,
  Cubot blue CTAs. Use when building or editing UI for this project.
---

# Full-bleed Grid with Dividers — Inchiostro vivo (lastre)

**Read [PATTERN.md](PATTERN.md) before writing any UI code.**

Do not revert to neon `#00df8f`, Inter, Space Grotesk, pills, process yellow `#f0c400`, or all-paper Geist-only UI unless the user asks.

## Layout

- No viewport hairline overlay (removed at user request)
- Content max-width `1200px`
- Section padding `88px` / `120px`
- Radius `0px`
- One primary CTA per section

## Surfaces (`tone` on SiteSection)

| Tone | Background | Text |
|------|------------|------|
| paper (default) | `#f7f4ee` | ink |
| ink | `#121212` | paper / paper-muted |
| spot | `#1e3a8a` (CUBOT `--brand-deep`) | paper |

Hero + lavori + footer = `ink`. Servizi = `spot`. Chi sono + CV = paper.

## Type

- **Display:** Instrument Serif italic, `clamp(3.25rem, 11vw, 7.25rem)`, leading `0.88`
- **Body:** Geist `0.9375rem` / 1.55
- **Meta:** Geist Mono uppercase `0.16em`

## Cubot blues (contrast)

| Token | Hex | Use |
|-------|-----|-----|
| `--spot` | `#38bdf8` | Marks **on ink / navy only** (hero bar, ticker, eyebrow, chips, CTA on dark). Never as text on paper. |
| `--spot-deep` | `#1e3a8a` | Paper-context fill (CTA, stats, toolkit hover) and the spot lastre. |
| `--accent` | `#1d4ed8` | Action blue (optional). |

Paper CTA: navy + paper text. Ink/nav/spot CTA: sky + ink text.

## Constraints

No pills, no neon green, no purple mesh, no card shadows. Sky `#38bdf8` is never body copy on cream.
