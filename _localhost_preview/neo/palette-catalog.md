# Neo Design — Palette Catalog

Neo shows this table at **build time** before asking which palette, mode, and accent source to use.

Preview live: open [`showcase/palettes.html`](../../showcase/palettes.html) in a browser.

**Semantic colors** (toast success, badges, etc.) are derived from each palette’s swatches only — no hardcoded green outside Neo Classic’s warm accent family.

---

## 1. Neo Classic

**ID:** `neo-classic` · **Original** orange + charcoal neumorphic look

| Swatch | Hex |
|--------|-----|
| Accent | `#ff7043` |
| Dark base | `#2a2e35` |
| Dark raised | `#32363f` |
| Light base | `#e8ecf1` |

```html
<html data-neo-palette="neo-classic" data-neo-theme="dark">
```

**Contrast:** Safe on dark and light. Default when attributes omitted.

---

## 2. Moon

**ID:** `moon` · Plum / lavender moonlight

| Swatch | Hex |
|--------|-----|
| Light | `#F5D5E0` |
| Periwinkle | `#6667AB` |
| Magenta | `#7B337E` |
| Deep purple | `#420D4B` |
| Darkest | `#210635` |

**Dark accent:** `#7B337E` · **Light accent:** `#7B337E`

**Contrast note:** Light mode buttons use `--neo-accent-dark` on raised surfaces — verify CTA legibility.

---

## 3. Sapphire

**ID:** `sapphire` · Navy + gold luxury

| Swatch | Hex |
|--------|-----|
| Sapphire | `#305070` |
| Royal blue | `#112250` |
| Quicksand | `#E0C58F` |
| Swan wing | `#F5F0E9` |
| Shellstone | `#D9CDC2` |

**Dark accent:** `#E0C58F` (gold) · **Light accent:** `#305070` (navy)

**Contrast note:** Gold on navy (dark) is strong. Navy on cream (light) passes for body text; use `--neo-accent-dark` on white buttons.

---

## 4. Crimson

**ID:** `crimson` · Red energy on charcoal

| Swatch | Hex |
|--------|-----|
| Bright red | `#E22227` |
| Deep red | `#C7080C` |
| Burgundy | `#6C0102` |
| Maroon | `#440101` |
| Charcoal | `#222B31` |
| Slate | `#55666E` |

**Dark accent:** `#E22227` · **Light accent:** `#C7080C`

**Contrast note:** Light mode — avoid red accent on red-tinted surfaces; Builder uses dark accent variant on light raised cards.

---

## 5. Luca Davincci

**ID:** `luca-davincci` · Dusty rose / plum editorial

| Swatch | Hex |
|--------|-----|
| Midnight | `#0C0420` |
| Eggplant | `#5D3C64` |
| Plum | `#7B466A` |
| Lavender | `#9F6496` |
| Dusty rose | `#D391B0` |
| Rose | `#BA6E8F` |

**Dark accent:** `#D391B0` · **Light accent:** `#7B466A`

---

## 6. Ocean Depth

**ID:** `ocean-depth` · Monochrome blue gradient

| Swatch | Hex |
|--------|-----|
| Abyss | `#001D39` |
| Deep sea | `#0A4174` |
| Steel | `#49769F` |
| Teal | `#4E8EA2` |
| Dusty blue | `#6EA2B3` |
| Sky | `#7BBDE8` |
| Powder | `#BDD8E9` |

**Dark accent:** `#7BBDE8` · **Light accent:** `#0A4174`

---

## Build-time choices (CEO)

1. **Palette** — one of the six IDs above  
2. **Mode** — `dark` or `light` (`data-neo-theme`)  
3. **Accent source** — `palette` (fresh look) or `branding` (scraped `branding.json` primary on palette surfaces)

### Branding accent warning

If scraped `colors.primary` is near-white (e.g. `#ffffff`) on a **dark** palette, Neo warns — CTAs may be invisible. Prefer **palette accent** or pick **Neo Classic**.

### Legacy command

**“Use Neo orange”** → `data-neo-palette="neo-classic"` + accent source `palette`.

### Re-scrape

`rebuild_doc.md` is regenerated on scrape — palette choice is cleared; CEO re-picks at build.

---

## Machine registry

See [`palettes.json`](palettes.json) for IDs, swatches, and accent defaults.
