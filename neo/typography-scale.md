# Neo Design — Typography Scale

## Font families

| Role | Family | Source |
|------|--------|--------|
| Display (H1–H3, overline) | `butik-display-normal` → **Bodoni Moda** (fallback) | [Butik](https://fonts.adobe.com/fonts/butik) (optional) · [Bodoni Moda](https://fonts.google.com/specimen/Bodoni+Moda) (free) |
| UI / body | `Inter` | Google Fonts or system-ui |

## Scale

| Token | Size | Line height | Use |
|-------|------|-------------|-----|
| `--neo-text-xs` | 12px | 1.4 | Captions, helper, badges |
| `--neo-text-sm` | 14px | 1.45 | Buttons, table cells |
| `--neo-text-base` | 16px | 1.5 | Body |
| `--neo-text-lg` | 18px | 1.45 | Lead, H5 |
| `--neo-text-xl` | 20px | 1.3 | H4, card titles |
| `--neo-text-2xl` | 24px | 1.25 | H3 |
| `--neo-text-3xl` | 32px | 1.2 | H2 |
| `--neo-text-4xl` | clamp(36px, 5vw, 48px) | 1.1 | H1 |

## Heading classes

| Element | Class | Font | Weight |
|---------|-------|------|--------|
| H1 | `.neo-h1` | Butik | 600 |
| H2 | `.neo-h2` | Butik | 500 |
| H3 | `.neo-h3` | Butik | 400 |
| H4 | `.neo-h4` | Inter | 600 |
| H5 | `.neo-h5` | Inter | 600 |
| H6 | `.neo-h6` | Inter | 500 |
| Overline | `.neo-overline` | Butik | 500, uppercase, 0.12em tracking |

## Adobe Fonts weight map

| CSS weight | Butik cut |
|------------|-----------|
| 400 | Regular |
| 500 | Medium |
| 600 | Semibold |
| 700 | Bold |
