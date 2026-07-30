# i18n hooks for Neo rebuilds

Neo pages default to `lang="en"`. For multi-language sites:

1. Set `<html lang="en-GB">` (or target locale) on every page.
2. Mark translatable strings with `data-neo-i18n="key.name"` on elements.
3. Add `hreflang` link tags in `<head>` when alternate locales exist:
   ```html
   <link rel="alternate" hreflang="en-GB" href="https://example.com/">
   <link rel="alternate" hreflang="cy" href="https://example.com/cy/">
   ```
4. Use logical CSS properties (`margin-inline`, `padding-block`) already in Neo tokens.
5. For RTL locales, set `dir="rtl"` on `<html>`; Neo components use logical properties where possible.

Translation files are out of scope for the static rebuild pipeline. Export copy from `pages/*.md` for translation, then rebuild per locale.
