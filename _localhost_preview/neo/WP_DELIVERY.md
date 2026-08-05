# Neo WordPress delivery contract

Non-negotiable rules for every full-page Neo handoff. If these are skipped, mobile breaks in WordPress even when `production_site/` looks fine.

## What went wrong before

| Symptom | Cause |
|---------|--------|
| Hamburger dead | WP paste used `data:text/css;base64` / `data:text/javascript;base64` (stripped/ignored) and/or JS ran before DOM |
| Hero / folder gallery dead | Same packaging failure; gallery transforms also widened page width |
| Sideways scroll on mobile | Embed `overflow-x` removed “to fix fixed headers”; `100vw`/`-50vw` breakouts |
| One-off `pages/*.py` patches | Fought the bundler instead of fixing the delivery contract |

## Non-negotiables

1. **Source of truth is `production_site/`.** Edit HTML/CSS/JS there first. Never invent fixes only inside `pages/`.
2. **Ship WP pastes only via the inline bundler:**
   ```bash
   python3 scripts/bundle_wordpress.py
   # or
   python3 scripts/rebuild_pages.py
   ```
   Output must use real `<style>` and `<script>` blocks — **never** `data:text/css` or `data:text/javascript`.
3. **Run craft-audit before handoff:**
   ```bash
   bash production_site/neo/craft-audit.sh production_site
   python3 scripts/bundle_wordpress.py
   bash production_site/neo/craft-audit.sh pages
   ```
4. **Mobile acceptance at 375px** (and spot-check 320 / 768):
   - No horizontal page scroll (`document.documentElement.scrollWidth <= clientWidth`)
   - Hamburger opens/closes the drawer
   - Home hero advances frames
   - Folder gallery opens without sideways scroll
   - Treatments pricelist stacks; Book buttons usable
5. **Never remove embed `overflow-x: clip`** to “fix” iOS `position:fixed`. Contain overflow offenders locally (folder stage, drawer panel). Prefer `clip` over `hidden` so sticky heroes keep working.
6. **Never use `width: 100vw` + `-50vw` margin breakouts** in WP CSS. Use `width: 100%` plus the Elementor/theme padding reset in the bundler.
7. **Interactive scripts that query the DOM must boot on `DOMContentLoaded`** (or sit after the markup). WP pastes may load scripts in orders that are unsafe for top-of-file IIFEs.
8. **`mobile-nav.js` must toggle `neo-menu-open` on `documentElement`, `body`, and `[data-neo-wp-embed]`**, and must hide conflicting theme headers outside the Neo page.

## Required baseline files (do not revert)

- `neo/components/wp-embed.css` — embed clip, no 100vw breakout, high z-index chrome
- `neo/components/mobile-layout.css` — shell clip + menu-open on embed root
- `neo/mobile-nav.js` — embed menu class + theme header hide
- `hero-scroll.js` / `folder-gallery.js` — DOM-ready boot + contained transforms
- `site.css` — treatments mobile stacking; folder stage `overflow: hidden`
- `scripts/bundle_wordpress.py` — only approved WP paste generator

## Forbidden

- Hand-editing `pages/*.html` with overflow “fixes”
- Reintroducing `pages/inject_css.py` / `pages/fix_overflow.py` logic (stubs only — they print deprecation)
- Delivering base64 `data:` stylesheets or scripts as the paste format
- Claiming “mobile done” without craft-audit on both `production_site` and `pages`

## Handoff checklist (copy into PR / chat)

- [ ] `craft-audit.sh production_site` PASS
- [ ] `bundle_wordpress.py` ran successfully (no `data:text/` in output)
- [ ] `craft-audit.sh pages` PASS
- [ ] 375px smoke: hamburger, hero, folder, no sideways scroll
