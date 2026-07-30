# WordPress Conversion — Quick Reference

> Universal guide for using the agent skill on any HTML file.

---

## One-Command Usage

Open your workspace containing the HTML file, then type any of:

```
go
```
```
convert
```
```
do it
```

The agent will automatically find the HTML file, read it in full, and output the complete WordPress-ready code.

---

## What You Get

A single, self-contained HTML block that includes:

1. **External resources** — all `<link>` and CDN `<script>` tags from the source
2. **All styles** — every `<style>` block, every custom class, every `@keyframes`, every computed CSS
3. **All content** — the full body HTML wrapped in a scoping `<div>`
4. **All scripts** — every inline `<script>` block for interactive components

---

## Where to Paste It

| WordPress Builder | Where to Paste |
|---|---|
| **Gutenberg** | Add block → "Custom HTML" → Paste entire code |
| **Elementor** | Add widget → "HTML" → Paste entire code |
| **WPBakery** | Add element → "Raw HTML" → Paste entire code |
| **GeneratePress** | Custom HTML block or Hook element |
| **Kadence** | Advanced HTML block → Paste entire code |
| **Beaver Builder** | Add module → "HTML" → Paste entire code |

---

## Manual Prompt (if not using auto-trigger)

If you need to manually prompt the agent, copy this:

```
Convert the HTML file in this workspace to a WordPress-ready Custom HTML block.

Rules:
1. Read the ENTIRE HTML source file first — every line.
2. Follow agent/copilot-instructions.md exactly.
3. Output a SINGLE self-contained HTML block ready to paste into WordPress.
4. Do NOT invent, remove, simplify, or approximate ANYTHING.
5. Include every <link>, <style>, <script>, and every HTML element — verbatim.
6. Output the COMPLETE code — never truncate or say "rest remains the same".

Output format:
1. Brief audit summary (what was found in the source)
2. Complete WordPress-ready code
3. Paste instructions (which WP block to use)
```

---

## Post-Paste Checklist

After pasting into WordPress, verify in the browser:

### Visual Check
- [ ] Colors match the original HTML file exactly
- [ ] Fonts render correctly (check headlines, body text, labels)
- [ ] Icons appear (material symbols, font awesome, etc.)
- [ ] Layout matches — spacing, alignment, responsive breakpoints
- [ ] Images load from their URLs
- [ ] Animations play (hover effects, floating elements, glowing borders, etc.)
- [ ] Dark/light mode renders correctly if applicable

### Functional Check
- [ ] Interactive JS works (rotators, sliders, accordions, modals, tabs)
- [ ] Hover states work on buttons and links
- [ ] Links navigate correctly
- [ ] Responsive design works at mobile / tablet / desktop
- [ ] Scroll-triggered animations fire if present

### Common Issues & Fixes

| Issue | Cause | Fix |
|---|---|---|
| Fonts don't load | Google Fonts `<link>` blocked by WP theme | Add font `<link>` to theme's `<head>` via functions.php or a plugin |
| Icons don't appear | Icon library `<link>` not loading | Ensure the icon CDN `<link>` is at the top of the HTML block |
| CSS conflicts with theme | WP theme styles override the block | Add `!important` to conflicting rules, or increase specificity with `.wp-html-module` prefix |
| JS errors in console | WP jQuery conflicts or DOM ID collisions | Wrap JS in `(function() { ... })();` IIFE or check for ID conflicts |
| Images broken | Relative paths don't resolve in WP | Upload images to WP Media Library and update `src` URLs |
| Layout breaks on mobile | WP theme adds padding/margin to content area | Add `max-width: none; padding: 0; margin: 0;` to the WP content container |
| Tailwind styles missing | Tailwind CDN blocked or CSP issue | Check browser console; may need to host Tailwind CSS locally |
| `backdrop-filter` not working | Missing `-webkit-` prefix | Ensure `-webkit-backdrop-filter` is present alongside `backdrop-filter` |
| Animations don't play | `prefers-reduced-motion` or WP stripping | Check if WP security plugin strips `@keyframes`; test in incognito |

---

## Notes for Different Source Types

### Tailwind CSS Sources
- The Tailwind CDN `<script>` and `tailwind.config` object are included in the output
- All computed/generated `<style>` blocks are preserved
- All utility classes on every element are preserved exactly

### Bootstrap Sources
- Bootstrap CSS CDN `<link>` and JS CDN `<script>` are included
- All Bootstrap class names preserved on every element
- Bootstrap JS components (dropdowns, modals, carousels) work if CDN JS is loaded

### Vanilla CSS Sources
- All `<style>` blocks are included verbatim
- All class names and inline styles are preserved

### No-Framework (Inline Styles Only)
- Every `style=""` attribute is preserved on every element
- All internal `<style>` blocks included if present

---

## File Structure Reference

```
your-project/
├── code.html          ← (or index.html, page.html — the source file)
├── DESIGN.md          ← (optional — design system reference)
└── agent/
    ├── copilot-instructions.md    ← Main agent skill (auto-trigger + conversion rules)
    ├── wp-conversion-prompt.md    ← This file (paste guide + troubleshooting)
    └── design-token-template.md   ← Token extraction methodology
```
