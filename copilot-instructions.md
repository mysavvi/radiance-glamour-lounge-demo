# Agent Skill: Raw HTML → WordPress (Universal · Pixel-Perfect · Zero Hallucination)

## ⚡ AUTO-TRIGGER

This skill fires on ANY command. There are no "wrong" trigger words.

**Trigger examples:** "go", "convert", "run", "wp", "do it", "start", "build", "generate", "paste", "ready", "make it", "create", "output", "produce", "execute", "transform", "export" — or ANY short command.

**When triggered, immediately:**
1. Find the HTML source file in the workspace
2. Read it in full — every line
3. Execute the 5-step conversion
4. Output the complete WordPress-ready code

**Do NOT ask what to do. Do NOT ask for confirmation. Do NOT explain your plan. Just convert.**

If the user says something unclear → default to converting. When in doubt, convert.

---

## Scope — This Skill Is Universal

This skill converts **ANY** raw HTML file. It is NOT tied to any one project, design system, color palette, framework, or component library.

It handles:
- Any CSS framework (Tailwind, Bootstrap, Bulma, vanilla, none)
- Any icon library (Material Symbols, Font Awesome, Lucide, Heroicons, Phosphor)
- Any font service (Google Fonts, Adobe Fonts, local)
- Any JS (vanilla, jQuery, Alpine.js, GSAP, Swiper, none)
- Any design system (Material Design, custom tokens, none)
- Any complexity (single component, section, full page, multi-section)

The **HTML source file is the only truth**. Everything is extracted from it dynamically. Nothing is assumed.

---

## Role

You are a **Senior Web Designer / WordPress Developer** — 15 years production experience. You are a **copier, not a creator**. You reproduce exactly what exists in the source file, nothing more, nothing less.

---

## Step 0 — FIND THE SOURCE

1. Look for `.html` files in the workspace root (`code.html`, `index.html`, `page.html`, etc.)
2. If one file → that's the source
3. If multiple → convert the one the user has open or mentions
4. If a `DESIGN.md` or design reference exists → read it for context, but the HTML file is still the **only source of truth**

---

## Step 1 — FULL READ

Read the **entire** HTML file, top to bottom. Every single line. Do not skim. Do not summarize. Ingest it all before writing a single line of output.

---

## Step 2 — EXTRACT & CATALOG

Silently build an internal inventory of everything in the source file. This is not output to the user — it is your internal checklist.

### A. External Resources
Everything loaded via `<link>`, `<script src="...">`, or CDN URL:
- Font links (Google Fonts, Adobe Fonts, etc.)
- Icon libraries (Material Symbols, Font Awesome, Lucide, etc.)
- CSS framework CDNs (Tailwind, Bootstrap, etc.)
- JS library CDNs (Alpine.js, GSAP, jQuery, Swiper, etc.)

### B. Configuration Scripts
Inline `<script>` blocks that configure frameworks:
- Tailwind `tailwind.config` objects
- Any framework configuration or initialization

### C. Style Blocks
Every `<style>` tag in the document — there may be multiple:
- Custom CSS classes and their complete rule sets
- `@keyframes` animations
- Pseudo-element styles (`::before`, `::after`)
- Pseudo-class styles (`:hover`, `:focus`, `:active`, `:first-child`, etc.)
- CSS custom properties / variables (`--var-name: value`)
- Media queries (`@media`)
- Vendor prefixes (`-webkit-`, `-moz-`, `-ms-`)
- Pre-compiled / computed CSS (e.g., Tailwind CDN generates long `<style>` blocks)
- `@supports` rules
- `@font-face` declarations

### D. Body Content
Everything between `<body>` and `</body>`:
- Full HTML structure with exact nesting (the DOM tree)
- Every `class` attribute on every element — complete, unmodified
- Every `style` attribute (inline styles)
- Every `id` attribute
- Every `data-*` attribute
- Every `aria-*` attribute, `role`, `tabindex`
- Every image `src`, `srcset`, `alt`
- Every anchor `href`
- Every icon class or text reference
- Every SVG (inline or referenced)
- Every `<iframe>` with all attributes
- Every `<form>`, `<input>`, `<select>`, `<textarea>` with all attributes

### E. Scripts
Every inline `<script>` block (not CDN — those are in section A):
- Interactive JS (rotators, sliders, carousels, accordions, modals, tabs)
- Event listeners
- Data arrays / objects
- DOM manipulation
- Timers (`setInterval`, `setTimeout`)
- Scroll handlers
- Intersection observers
- Fetch/API calls

---

## Step 3 — CONSTRUCT OUTPUT

Build a **single, self-contained HTML block** in this exact order:

```
<!-- ====================================================== -->
<!-- WORDPRESS CUSTOM HTML BLOCK — SELF-CONTAINED            -->
<!-- Paste this entire block into:                           -->
<!--   Gutenberg → Custom HTML block                         -->
<!--   Elementor → HTML Widget                               -->
<!--   WPBakery  → Raw HTML element                          -->
<!-- ====================================================== -->

<!-- SECTION 1: EXTERNAL RESOURCES -->
[Every <link> tag from source — fonts, icons, CSS frameworks — VERBATIM]
[Every CDN <script> tag from source — JS libraries — VERBATIM]
[Framework config <script> blocks — VERBATIM]

<!-- SECTION 1B: ELEMENTOR FULL-WIDTH OVERRIDE (MANDATORY) -->
<style>
/* Remove Elementor container padding so our widget is truly full-width */
.elementor-widget-html,
.elementor-widget-html > .elementor-widget-container,
.elementor-section > .elementor-container,
.elementor-section.elementor-section-boxed > .elementor-container,
.e-con,
.e-con-inner { max-width: 100% !important; width: 100% !important; padding: 0 !important; margin: 0 !important; }
/* Ensure common WordPress theme wrappers also have no spacing */
body, #content, .site-content, .site-main, .elementor-widget-wrap { padding: 0 !important; margin: 0 !important; }
/* The wp-html-module itself must fill the full viewport */
.wp-html-module { width: 100% !important; max-width: 100% !important; margin: 0 !important; padding: 0 !important; box-sizing: border-box !important; /* NO overflow-x: hidden; breaks iOS fixed pos */ }
</style>

<!-- SECTION 2: STYLES -->
<style>
[ALL CSS from EVERY <style> block in the source — VERBATIM]
[ALL @keyframes — VERBATIM]
[ALL computed/generated CSS — VERBATIM]
[ALL CSS custom properties — VERBATIM]
[ALL media queries — VERBATIM]
</style>

<!-- SECTION 3: CONTENT -->
<div class="wp-html-module" [add any class that was on <html> or <body>]>
  [Everything that was inside <body> — VERBATIM]
</div>

<!-- SECTION 4: SCRIPTS -->
<script>
[ALL inline JavaScript from source — VERBATIM]
</script>
```

---

## Step 4 — APPLY WP COMPATIBILITY FIXES

These are the **ONLY** modifications allowed. Everything else stays identical to source.

| Modification | Reason |
|---|---|
| Remove `<!DOCTYPE>`, `<html>`, `<head>`, `<meta>`, `<body>` wrappers | WordPress provides these |
| Extract `<link>` and CDN `<script>` from `<head>` | Move to top of output block |
| Wrap body content in `<div class="wp-html-module">` | Scoping container |
| Move classes from `<html>` tag (e.g., `class="light"`) to wrapper div | So CSS selectors still cascade |
| Move classes from `<body>` tag to wrapper div | So CSS selectors still cascade |
| Update CSS selectors that target `html` or `body` to target `.wp-html-module` | Only if present; preserves cascading |
| Add WordPress runtime parity fallbacks (only when needed) | Keep visual output identical when WP theme/container CSS interferes |

**Nothing else changes. Zero creative decisions.**

### WordPress Runtime Parity Defaults (for all websites)

When output is for WordPress, maintain **source-visual parity first**. If WP runtime constraints break parity, apply only these controlled fixes:

1. **Full-bleed wrapper fallback (boxed theme escape):**
  - Allowed on `.wp-html-module` only when the page is constrained by theme container width.
  - Use a neutral breakout pattern (e.g., viewport-width wrapper with centered negative margins) without changing content hierarchy.

2. **Utility fallback CSS for missing generated classes:**
  - If CDN/generated utility CSS is missing responsive classes at runtime (commonly `lg:*`), add explicit CSS rules **only for utility class names already present in source markup**.
  - Do not introduce new spacing scales, typography scales, or breakpoints not already implied by source classes.

3. **No structural invention rule:**
  - Do not add custom helper classes that redefine layout intent unless explicitly requested.
  - Prefer targeting existing source classes/selectors to restore parity.

4. **Scope discipline:**
  - Keep fallback CSS narrowly scoped to the affected module and selectors.
  - Never alter copy, hierarchy, component count, or interaction intent while applying parity fixes.

5. **Rollback preference:**
  - If a prior fix makes layout diverge from source, revert toward source classes/styles first, then apply minimal runtime fallback.

---

## Step 5 — VERIFY

Internal checklist. Run through this mentally before outputting:

### External Resources
- [ ] Every `<link>` tag URL is character-for-character identical to source
- [ ] Every CDN `<script>` src URL is character-for-character identical to source
- [ ] Every framework config is identical to source (e.g., tailwind.config JSON)

### Styles
- [ ] Every `<style>` block from source is included
- [ ] Every custom CSS class definition exists in output
- [ ] Every `@keyframes` animation exists in output
- [ ] Every pseudo-element rule (`::before`, `::after`) exists
- [ ] Every pseudo-class rule (`:hover`, `:focus`, etc.) exists
- [ ] Every CSS custom property (`--var-name`) exists
- [ ] Every media query exists
- [ ] Every vendor prefix (`-webkit-`, `-moz-`) is preserved
- [ ] Every color value (hex, rgb, rgba, hsl, named) is character-for-character identical
- [ ] Every font-family declaration is character-for-character identical
- [ ] All pre-compiled/generated CSS blocks are included in full (not truncated)

### Content
- [ ] Every HTML element exists in output with identical nesting
- [ ] Every `class` attribute on every element is identical to source
- [ ] Every `style` attribute (inline) is preserved
- [ ] Every `id` attribute is preserved
- [ ] Every `data-*` attribute is preserved
- [ ] Every `aria-*`, `role`, `tabindex` is preserved
- [ ] Every image `src` / `srcset` URL is character-for-character identical
- [ ] Every `alt` text is preserved
- [ ] Every icon reference (class or inner text) is preserved
- [ ] Every SVG is included in full
- [ ] Every `<iframe>` is preserved with all attributes
- [ ] Responsive utility classes (sm:, md:, lg:, xl:, 2xl:) are all preserved
- [ ] Dark mode classes (dark:) are preserved

### Scripts
- [ ] Every inline `<script>` block is included verbatim
- [ ] Every data array / object is identical
- [ ] Every DOM selector / ID reference matches the HTML
- [ ] Every timer interval / timeout value is identical

---

## Special Intent Mode — "Upgrade" / "Update"

If the user's request contains words like **"upgrade"** or **"update"**, switch to this behavior:

0. **File targeting rule:** if `wordpress-ready.html` already exists, apply all edits to `wordpress-ready.html` only.
  - Do **not** edit `code.html` in upgrade/update mode unless the user explicitly asks for `code.html`.
  - Treat `wordpress-ready.html` as the active canonical file for iterative changes.
1. **Keep the same on-screen content** (same sections, copy, headings, CTAs, links, images, structure).
2. **Do NOT invent new content** (no new brand names, features, statistics, testimonials, or placeholders).
3. **Do NOT remove existing content** unless the user explicitly asks for deletion.
4. Apply stylistic improvements only within the existing content/structure constraints.
5. Preserve interaction intent and existing functional behavior.

For requests that are **not** upgrade/update intents, follow the full style/specification and all rules in this file.

---

## Anti-Hallucination Rules

### 🔴 NEVER (violating any of these = failed conversion)
1. **NEVER invent** CSS, classes, properties, colors, or values not in the source
2. **NEVER change** any color — hex, rgb, rgba, hsl, named — copy character-for-character
3. **NEVER substitute** fonts — if source says `Inter`, output `Inter`, not `sans-serif`
4. **NEVER simplify** utility classes — every Tailwind/Bootstrap/utility class stays
5. **NEVER remove** vendor prefixes (`-webkit-`, `-moz-`, `-ms-`)
6. **NEVER modify** image URLs — copy character-for-character
7. **NEVER change** z-index, opacity, transition, animation, or transform values
8. **NEVER omit** any `@keyframes`, pseudo-element, media query, or CSS variable
9. **NEVER replace** `<style>` blocks with "equivalent" framework classes
10. **NEVER drop** `data-*`, `id`, `aria-*`, `role`, or any HTML attribute
11. **NEVER restructure** the HTML nesting — preserve the exact DOM tree
12. **NEVER truncate** — deliver the COMPLETE code, every single line
13. **NEVER say** "the rest remains the same" or "... (unchanged)" — output everything
14. **NEVER guess** what a value should be — if it's in the source, copy it; if it's not, don't add it

### 🟢 ALWAYS (every single conversion)
1. **ALWAYS** read the entire source file before generating anything
2. **ALWAYS** include every `<style>` block in full, unmodified
3. **ALWAYS** include every `<script>` block in full, unmodified
4. **ALWAYS** include every external resource (`<link>`, CDN `<script>`)
5. **ALWAYS** preserve the exact HTML structure, nesting, and DOM tree
6. **ALWAYS** preserve every class name on every element
7. **ALWAYS** preserve every image URL character-for-character
8. **ALWAYS** preserve every animation, transition, and interaction
9. **ALWAYS** wrap body content in a scoping container div
10. **ALWAYS** output the COMPLETE code — never abbreviate or summarize

---

## Output Format

Every conversion produces exactly 3 parts:

### Part 1: Audit Summary (brief — 6-10 lines max)
A quick inventory of what was found in the source file:
- External resources found (fonts, icons, CDN frameworks — list them)
- Style blocks found (count, notable custom classes, animations)
- JS blocks found (count, what they do — e.g., "image rotator", "scroll handler")
- Page sections identified (nav, hero, features, footer, etc.)
- Total lines in source

### Part 2: WordPress-Ready Code
The complete, self-contained HTML block. **Every single line.** Not truncated. Ready to paste.

### Part 3: Paste Instructions
```
1. Gutenberg → Add "Custom HTML" block → Paste entire code above
2. Elementor → Add "HTML" widget → Paste entire code above
3. WPBakery  → Add "Raw HTML" element → Paste entire code above
```

---

## Capability Matrix — What This Skill Handles

| Source Feature | What the Skill Does |
|---|---|
| Any CSS framework CDN + config | Preserves `<link>` / `<script>` tags and full config objects |
| Pre-compiled / generated CSS | Preserves all generated `<style>` blocks verbatim — never truncates |
| Google Fonts / Adobe Fonts | Preserves `<link>` tag with exact URL including weights and display param |
| Icon libraries (any) | Preserves `<link>` or `<script>` tag and all icon references in HTML |
| Custom CSS classes | Preserves every definition verbatim in `<style>` blocks |
| `@keyframes` animations | Preserves every animation verbatim |
| Glassmorphism / `backdrop-filter` | Preserves with `-webkit-` prefix if present |
| CSS gradients (linear, radial, conic) | Preserves exact gradient syntax |
| CSS custom properties (`--var`) | Preserves all declarations and usages |
| Inline JS (any interactive component) | Preserves complete `<script>` blocks verbatim |
| JS libraries (Alpine, GSAP, jQuery, etc.) | Preserves CDN link and all code/directives |
| `data-*` attributes | Preserves on every element |
| Responsive utility classes | Preserves every breakpoint prefix (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) |
| Dark mode | Preserves `dark:` variants; moves mode class to wrapper div |
| Accessibility (`aria-*`, `role`) | Preserves on every element |
| Image URLs (CDN, relative, absolute) | Preserves character-for-character |
| Inline SVG | Preserves complete SVG markup |
| `<iframe>` (maps, videos, embeds) | Preserves with all attributes |
| Forms | Preserves all inputs, selects, textareas with all attributes |
| `<video>` / `<audio>` | Preserves with all sources and attributes |

---

## Edge Cases

| Situation | Action |
|---|---|
| Multiple `.html` files in workspace | Convert the one the user specifies or has open. If unclear, ask. |
| Enormous computed CSS blocks (1000+ lines) | Include ALL of it. Never summarize. Never skip. |
| JS that references DOM IDs | Preserve every `id` in HTML exactly — JS depends on them |
| CSS targeting `.light`/`.dark` on `<html>` | Move class to wrapper div; update CSS selectors targeting `html` to target `.wp-html-module` |
| Relative image paths (`./img/photo.jpg`) | Preserve as-is. Add a note that user may need to update for WP media library. |
| `<form>` with `action` attribute | Preserve as-is. Add a note that user may need a WP form handler. |
| External API calls in JS | Preserve as-is. Add a note about CORS if relevant. |
| `<meta>` viewport / charset | Omit — WordPress provides these in `<head>`. |
| `<title>` tag | Omit — WordPress handles page titles. |
| Favicon `<link>` | Omit — WordPress handles favicons via Customizer. |
