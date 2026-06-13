# Colorado Eco Garden — Claude Instructions

## Project

Single-file static site: `index.html`. No build tooling. Edit HTML/CSS/JS directly.

---

## Spacing System

All spacing (margin, padding, gap, positional offsets) must use CSS custom properties from the 4px base scale. Never write a hardcoded px value for spacing.

```css
--space-1:  0.25rem;  /*  4px */
--space-2:  0.5rem;   /*  8px */
--space-3:  0.75rem;  /* 12px */
--space-4:  1rem;     /* 16px */
--space-5:  1.25rem;  /* 20px */
--space-6:  1.5rem;   /* 24px */
--space-7:  1.75rem;  /* 28px */
--space-8:  2rem;     /* 32px */
--space-9:  2.25rem;  /* 36px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-13: 3.25rem;  /* 52px */
--space-15: 3.75rem;  /* 60px */
--space-16: 4rem;     /* 64px */
--space-17: 4.25rem;  /* 68px */
--space-18: 4.5rem;   /* 72px */
--space-20: 5rem;     /* 80px */
--space-22: 5.5rem;   /* 88px */
--space-25: 6.25rem;  /* 100px */
```

**Rules:**
- Every new spacing value must be a multiple of 4px.
- Map it to the matching `--space-N` token. If the token doesn't exist yet, add it to `:root` following the naming convention.
- Values that are not on the 4px grid must be rounded to the nearest multiple and marked with a `/* FLAG: was Xpx → rounded to Ypx */` comment.
- `clamp()` font sizes and fixed element dimensions (icon widths/heights, avatar sizes) are exempt.

---

## Color System — 60/30/10 Rule

Three canonical tokens. All other color values are derived from these. **Never use the old token names** (`--cream`, `--sage`, `--forest`, etc.) — they no longer exist.

| Token | Hex | Role | Weight |
|---|---|---|---|
| `--color-bg` | `#ECEFE3` | Dominant — backgrounds, large surfaces | 60% |
| `--color-accent` | `#6A7C40` | Secondary — buttons, accents, numbered elements | 30% |
| `--color-text` | `#3C4C24` | Accent — headings, dark sections, body text | 10% |

**Derived tokens** (use these; do not invent new ones):

| Token | Formula | Usage |
|---|---|---|
| `--color-accent-hover` | `color-mix(accent 80% + text)` | Hover state for accent buttons |
| `--color-accent-muted` | `rgba(--rgb-accent, 0.10)` | Icon backgrounds, subtle fills |
| `--color-text-muted` | `color-mix(text 60% + bg)` | Body copy, card paragraphs |
| `--color-text-dim` | `color-mix(text 40% + bg)` | Secondary body text |
| `--color-text-subtle` | `color-mix(text 25% + bg)` | Placeholders, captions |
| `--color-bg-dark` | `#1e2b10` | Dark card overlays, featured pricing |
| `--color-footer` | `#2a3619` | Footer background |
| `--color-surface` | `color-mix(bg 90% + text)` | Subtle surface differentiation |

**RGB triplet tokens** — use `rgba(var(--rgb-*), alpha)` for all opacity variants. Never write raw `rgba(60,76,36, X)`:

| Token | Value | Matches |
|---|---|---|
| `--rgb-bg` | `236, 239, 227` | `--color-bg` |
| `--rgb-accent` | `106, 124, 64` | `--color-accent` |
| `--rgb-text` | `60, 76, 36` | `--color-text` |
| `--rgb-dark` | `30, 43, 16` | `--color-bg-dark` |
| `--rgb-darker` | `20, 28, 12` | very dark overlays |
| `--rgb-darkest` | `10, 15, 5` | deepest shadows |

**Rules:**
- Never introduce a new base color without updating this table.
- Never write a raw hex or `rgb()` value for a palette color — always use a token.
- All `rgba()` opacity variants must use `rgba(var(--rgb-*), alpha)` syntax.
- **WCAG:** `--color-accent` (#6A7C40) on `--color-bg` (#ECEFE3) = 3.71:1. Passes AA for large/bold text (≥3:1). Use `#5F7139` if strict AA for small text (4.5:1) is required.
