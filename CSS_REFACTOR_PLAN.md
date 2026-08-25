# CSS refactor plan — Inchiostro vivo

Stato: **implementato** (2026-08-24).  
Sito: landing portfolio grafico (React + Vite + Tailwind 4 + CSS custom properties).

Direzione confermata: carta `#f7f4ee`, inchiostro `#121212`, giallo processo `#f0c400`, griglia 6 col, radius `0px`, Geist. Niente mesh/glass ovunque, 3D, dark mode, GSAP, cursor.

`PATTERN.md` e `SKILL.md` sono allineati ai token live in `src/index.css`.

---

## Cosa è in produzione

1. Token `@property --spot` + `:root` (paper, raised, ink, muted, hairline, motion).
2. Reveal on scroll (Intersection Observer) + `prefers-reduced-motion`.
3. View Transition sullo switch progetto (`document.startViewTransition` + `view-transition-name: project-shot`).
4. Nav sticky con blur dopo 8px di scroll (`.is-scrolled`).
5. Underline ink (nav, footer, link sezione) in giallo processo, `scaleX`.
6. Image crop hover `scale(1.04)` nel frame.
7. Accordion `grid-template-rows: 0fr / 1fr` (niente `hidden` a scatto).
8. Grain + alone giallo **solo** sull’hero.

Dipendenze JS: nessuna libreria nuova. `flushSync` da `react-dom` per le View Transitions.

---

## Ricerca 2025–2026 (sintesi)

| Trend | In questo sito |
| --- | --- |
| Glassmorphism | Solo nav sticky dopo scroll |
| Mesh / neomorphism / Houdini / cursor / particles | No |
| Scroll-driven (`view()`) | Ritratto hero, con fallback IO |
| View Transitions | Swap lavori |
| Dark mode | Fuori scope finché non chiesto |

Riferimenti: Studio K95, By-Kin, Mat Voyce, Hanna Bergman, Recent / Godly. Anti-riferimento: mesh SaaS + pill CTA.

---

## Design system live

| Token | Valore | Uso |
| --- | --- | --- |
| `--surface` | `#f7f4ee` | fondo pagina |
| `--raised` | `#fffcf7` | nav/mobile, ritratto |
| `--ink` | `#121212` | testo primario |
| `--muted` | `#5c5752` | body |
| `--spot` | `#f0c400` | inchiostro processo |
| `--hairline` | `#d6d0c6` | regole |
| `--grid-line` | `rgba(18,18,18,0.07)` | griglia 6 col |

Geist 600 / Geist 400 / Geist Mono. H1 `clamp(2.75rem, 6.4vw, 4.35rem)`. Sezioni 80px / 104px. Content 1200px. `--radius: 0px`. `--t-fast: 140ms`, `--t-ui: 220ms`.

Il giallo non è testo su carta: è fill, underline, hover.

---

## Fuori scope (finché non chiesti)

Dark `prefers-color-scheme`; Instrument Serif; magnetic / tilt / cursor; Houdini paint; mesh full-page.

---

## Rischi residui

- Firefox: View Transitions e `animation-timeline: view()` sono enhancement; reveal IO resta.
- `?edit=1` deve restare usabile (contrasto input).
- Contrasto giallo su paper: il giallo **non** è testo; è fill/underline.
