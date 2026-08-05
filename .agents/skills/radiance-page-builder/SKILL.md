---
name: radiance-page-builder
description: The master blueprint for creating, designing, and updating pages for the Radiance Glamour Lounge project. Execute this skill anytime you are asked to build a new page, modify a layout, or style components in this workspace.
---

# Radiance Glamour Lounge Page Builder

You are building pages for **Radiance Glamour Lounge**, a luxury ladies-only aesthetic clinic and beauty salon based in Stockport. This project uses a highly specific architecture, build process, and design system. 

When asked to create or modify a page, you MUST follow this exact blueprint to ensure no responsive layout bugs, WordPress styling conflicts, or design system drift occurs.

## 1. Source of Truth Files

- **Always edit in `production_site/`**: All master HTML files live in `/production_site/` (e.g., `production_site/about.html`). Never directly edit files in `/pages/` or the root directory if a `production_site/` equivalent exists. 
- **Build Scripts**: After modifying a page in `production_site/`, you must rebuild the bundles using our specific command (see Section 3).

## 2. Design System & Theming

- **Root Attributes**: Every page MUST start with `<html lang="en" data-neo-palette="moon" data-neo-theme="light">`.
- **Colors**: Do not use generic tailwind colors. Rely on the `neo` design system tokens:
  - Base Background: `--neo-bg-base`
  - Raised Surfaces (Cards): `--neo-bg-raised`
  - Inset Surfaces: `--neo-bg-inset`
  - Primary Brand Accent: `--neo-accent` (`#ff7043`)
  - Accent Text: `--neo-accent-text`
  - Primary Text: `--neo-text-primary`
  - Muted Text: `--neo-text-muted`
- **Typography**: 
  - Display fonts (Headings): `"butik-display-normal", "Bodoni Moda", Georgia, serif` (use `--neo-font-display`).
  - Standard fonts (UI): `"Inter", system-ui, sans-serif`.
- **Neumorphism**: Avoid hard shadows or borders. Prefer soft elevated cards, subtle borders `var(--neo-border-subtle)`, and ambient depth. Use `box-shadow` styles from existing cards rather than inventing new flat styles.

## 3. Strict Build Pipeline

When creating a **new** page, or renaming a page:
1. You MUST register the page in `scripts/bundle_wordpress.py` under the `PAGE_MAP` dictionary so it can be compiled properly.

After saving changes to any page in `production_site/`, you MUST run exactly this command in the project root:
```bash
cp production_site/<page-name>.html ./<page-name>.html && python3 scripts/bundle_wordpress.py && python3 build_preview.py && graphify update . 2>/dev/null &
```

*Replace `<page-name>` with the name of the file you edited.*

## 4. Common Hurdles & Rules (Mandatory)

1. **Logo / Image Sizing Overrides**:
   WordPress embeds often inject global CSS (like `height: auto;`) that destroys the aspect ratio or sizing of logos and critical images. When sizing a logo or critical UI graphic (especially in cards), you MUST use `!important` to force the height/width dimensions (e.g., `height: 120px !important;`).
2. **Mobile Screen Clipping**:
   Do not use fixed `height` for cards or containers that hold dynamic text. Use `min-height` instead. Always include a `@media (max-width: 480px)` breakpoint to scale down font sizes, padding, and image sizes, ensuring that content never clips or disappears on narrow phones.
3. **Glassmorphism Ban**:
   Unless specifically requested, do not use heavy glassmorphism (`backdrop-filter: blur`) or neon accents. Stick to the tactile, neumorphic elegance defined in the brand identity.
4. **Form Inputs & Layout**:
   Forms and inputs must have a minimum `44px` height for touch targets, use `--neo-bg-inset` for the background, and clear focus states with `--neo-accent-glow`.

## 5. Verification Check

Before concluding a page build task:
- Use `chrome-devtools-mcp` to navigate to the locally served page on `http://localhost:8000/<page-name>.html` (use cache-busting queries like `?nocache=1` if needed).
- Render it at a mobile viewport (e.g., `390x844`) and take a screenshot to ensure the layout hasn't broken.
- Render it at a desktop viewport and take a screenshot.
- Present the final visual output to the user.
