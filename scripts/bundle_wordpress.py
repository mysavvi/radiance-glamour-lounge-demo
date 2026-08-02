#!/usr/bin/env python3
"""
Bundle production_site HTML into WordPress Custom HTML paste files.

- Resolves neo CSS @imports into one inline <style> (no data: URIs)
- Inlines local JS as <script> blocks after content (no data: URIs)
- Rewrites asset/href paths for the live WP site + demo CDN
- Wraps body in .wp-html-module for Elementor/Gutenberg embeds
"""

from __future__ import annotations

import re
import sys
import json
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROD = ROOT / "production_site"
PAGES = ROOT / "pages"

DEMO_CDN = "https://mysavvi.github.io/radiance-glamour-lounge-demo"

PAGE_MAP = {
    "index.html": ("home.html", "home", "rb-hero-nav-over"),
    "treatments.html": ("treatments.html", "treatments", ""),
    "clinic.html": ("clinic.html", "clinic", ""),
    "testimonials.html": ("reviews.html", "reviews", ""),
    "contact.html": ("contact.html", "contact", ""),
    "book.html": ("book.html", "book", ""),
    "book-success.html": ("book-success.html", "book-success", ""),
    "shop.html": ("shop.html", "shop", ""),
    "cart.html": ("cart.html", "cart", ""),
    "product.html": ("product.html", "product", ""),
    "checkout.html": ("checkout.html", "checkout", ""),
    "privacy-policy.html": ("privacy-policy.html", "privacy-policy", ""),
    "terms.html": ("terms.html", "terms", ""),
    "login.html": ("login.html", "login", ""),
    "register.html": ("register.html", "register", ""),
}

HREF_MAP = [
    (r'href="index\.html"', 'href="/"'),
    (r'href="treatments\.html', 'href="/treatments/'),
    (r'href="clinic\.html', 'href="/clinic/'),
    (r'href="testimonials\.html', 'href="/reviews/'),
    (r'href="contact\.html', 'href="/contact/'),
    (r'href="book\.html', 'href="/book/'),
    (r'href="book-success\.html', 'href="/book/success/'),
    (r'href="shop\.html', 'href="/shop/'),
    (r'href="cart\.html', 'href="/cart/'),
    (r'href="product\.html', 'href="/product/'),
    (r'href="checkout\.html', 'href="/checkout/'),
    (r'href="privacy-policy\.html', 'href="/privacy-policy/'),
    (r'href="terms\.html', 'href="/terms/'),
    (r'href="login\.html', 'href="/login/'),
    (r'href="register\.html', 'href="/register/'),
    (r"window\.location\.href='cart\.html'", "window.location.href='/cart/'"),
    (r"window\.location\.href='checkout\.html'", "window.location.href='/checkout/'"),
    (r"window\.location\.href='product\.html'", "window.location.href='/product/'"),
    (r"window\.location\.href='shop\.html'", "window.location.href='/shop/'"),
]

IMPORT_RE = re.compile(
    r"""@import\s+url\(\s*["']?([^"')]+)["']?\s*\)\s*;""",
    re.IGNORECASE,
)


def resolve_css(entry: Path, seen: set[Path] | None = None) -> str:
    """Recursively inline CSS @import url(...) relative to the file."""
    if seen is None:
        seen = set()
    entry = entry.resolve()
    if entry in seen:
        return ""
    seen.add(entry)
    if not entry.exists():
        print(f"WARN: missing CSS {entry}", file=sys.stderr)
        return f"/* missing {entry.name} */\n"

    text = entry.read_text(encoding="utf-8")
    # Drop cache-busting query from import paths
    def repl(match: re.Match[str]) -> str:
        rel = match.group(1).split("?", 1)[0]
        target = (entry.parent / rel).resolve()
        inlined = resolve_css(target, seen)
        return f"/* Inlined {rel} */\n{inlined}\n"

    return IMPORT_RE.sub(repl, text)


def rewrite_css_for_wp(css: str) -> str:
    """Map html/body selectors onto the WP embed root."""
    css = re.sub(r"(?<![-a-zA-Z0-9_])html(?![a-zA-Z0-9_-])", ".wp-html-module", css)
    css = re.sub(r"(?<![-a-zA-Z0-9_])body(?![a-zA-Z0-9_-])", ".wp-html-module", css)
    
    # Restore html[] for Neo theme/palette/a11y selectors that apply to documentElement
    css = css.replace(".wp-html-module[data-neo-theme", "html[data-neo-theme")
    css = css.replace(".wp-html-module[data-neo-palette", "html[data-neo-palette")
    css = css.replace(".wp-html-module[data-a11y", "html[data-a11y")
    css = css.replace(".wp-html-module:not([data-neo-theme])", "html:not([data-neo-theme])")
    return css


def rewrite_paths(html: str) -> str:
    for pattern, repl in HREF_MAP:
        html = re.sub(pattern, repl, html)

    # Asset paths → demo CDN or WP Media Library
    image_map = {}
    if os.path.exists("image_map.json"):
        with open("image_map.json", "r") as f:
            image_map = json.load(f)

    def replace_asset(m):
        attr = m.group(1)
        path = m.group(2)
        if path.startswith("images/"):
            filename = path.replace("images/", "")
            if filename in image_map:
                return f'{attr}="{image_map[filename]}"'
        return f'{attr}="{DEMO_CDN}/{path}"'

    def replace_url_asset(m):
        quote = m.group(1)
        path = m.group(2)
        if path.startswith("images/"):
            filename = path.replace("images/", "")
            if filename in image_map:
                return f'url({quote}{image_map[filename]}{quote})'
        return f'url({quote}{DEMO_CDN}/{path}{quote})'
        
    def replace_bare_asset(m):
        path = m.group(1)
        if path.startswith("images/"):
            filename = path.replace("images/", "")
            if filename in image_map:
                return f'src="{image_map[filename]}"'
        return f'src="{DEMO_CDN}/{path}"'

    html = re.sub(
        r'(src|href|data-neo-social-card-src|data-neo-social-reviews-src)="(images/[^"]+|social-media-card\.json|client-reviews\.json)"',
        replace_asset,
        html,
    )
    html = re.sub(
        r'url\((["\']?)(images/[^)"\']+)\1\)',
        replace_url_asset,
        html,
    )
    # Relative neo/ or bare image leftovers inside content attributes
    html = re.sub(r'src="\./(images/[^"]+)"', replace_bare_asset, html)
    return html


def extract_local_scripts(soup_html: str, base: Path) -> tuple[str, list[str]]:
    """
    Remove <script src="..."> tags that point at local files and return their contents.
    Keep CDN/external scripts as tags. Preserve inline scripts in place order as text.
    """
    scripts_out: list[str] = []
    early: list[str] = []
    late: list[str] = []

    def replace_script(match: re.Match[str]) -> str:
        tag = match.group(0)
        # Keep structured data / non-JS script types in the document
        type_m = re.search(r'\btype=["\']([^"\']+)["\']', tag, flags=re.I)
        if type_m:
            t = type_m.group(1).lower()
            if t not in ("text/javascript", "application/javascript", "module"):
                return tag
        src_m = re.search(r'\bsrc=["\']([^"\']+)["\']', tag)
        if not src_m:
            # Inline script — keep for body extraction; strip here from head
            inner = re.search(r"<script[^>]*>([\s\S]*?)</script>", tag, re.I)
            code = inner.group(1) if inner else ""
            if code.strip():
                early.append(code)
            return ""
        src = src_m.group(1)
        if src.startswith("http://") or src.startswith("https://") or src.startswith("//"):
            return tag  # keep external
        path = src.split("?", 1)[0]
        file_path = (base / path).resolve()
        if not file_path.exists():
            print(f"WARN: missing script {path}", file=sys.stderr)
            return ""
        code = file_path.read_text(encoding="utf-8")
        # Head theme/a11y scripts first; deferred page scripts later
        if "defer" in tag or path.endswith(
            (
                "hero-scroll.js",
                "folder-gallery.js",
                "reviews-rotator.js",
                "price-card-glow.js",
                "mobile-nav.js",
                "a11y-toolbar.js",
                "theme-toggle.js",
                "cookie-consent.js",
                "social-media-card.js",
                "form-validation.js",
                "savvi-booking.js",
                "savvi-shop.js",
                "book-form-demo.js",
                "scroll-reveal.js",
            )
        ):
            late.append(f"/* {path} */\n{code}")
        else:
            early.append(f"/* {path} */\n{code}")
        return ""

    cleaned = re.sub(r"<script\b[^>]*>[\s\S]*?</script>", replace_script, soup_html, flags=re.I)
    # Order: early (theme-init) then late (interactions)
    scripts_out = early + late
    return cleaned, scripts_out


def strip_head_noise(html: str) -> tuple[str, str, str, list[str]]:
    """Return (external_font_links, body_inner, attrs, json_ld_blocks)."""
    font_links = []
    for m in re.finditer(r"<link\b[^>]*>", html, flags=re.I):
        tag = m.group(0)
        if "fonts.googleapis.com" in tag or "fonts.gstatic.com" in tag:
            font_links.append(tag)

    json_ld: list[str] = []
    for m in re.finditer(
        r'<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>[\s\S]*?</script>',
        html,
        flags=re.I,
    ):
        json_ld.append(m.group(0))

    body_m = re.search(r"<body\b([^>]*)>([\s\S]*)</body>", html, flags=re.I)
    if not body_m:
        raise ValueError("No <body> found")
    body_attrs = body_m.group(1)
    body_inner = body_m.group(2)

    html_m = re.search(r"<html\b([^>]*)>", html, flags=re.I)
    html_attrs = html_m.group(1) if html_m else ""
    return "\n".join(font_links), body_inner, html_attrs + " " + body_attrs, json_ld


def parse_attr(attrs: str, name: str) -> str:
    m = re.search(rf'\b{name}=["\']([^"\']*)["\']', attrs)
    return m.group(1) if m else ""


WP_RESET = """
/* Universal WordPress & Elementor Full-Width Reset */
body, #content, .site-content, .site-main, .elementor-widget-wrap,
.elementor-widget-html, .elementor-widget-html > .elementor-widget-container,
.elementor-section > .elementor-container, .e-con, .e-con-inner {
  max-width: 100% !important;
  width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}
.wp-html-module {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box !important;
  overflow-x: clip !important;
}
"""


def bundle_one(src_name: str, dest_name: str, page_id: str, html_class: str) -> None:
    src = PROD / src_name
    raw = src.read_text(encoding="utf-8")

    # Collect CSS
    neo_css = resolve_css(PROD / "neo" / "neo-design.css")
    # Prefer highest site.css version query stripped — file is site.css
    site_css = (PROD / "site.css").read_text(encoding="utf-8")
    
    # Extract inline style blocks from the original HTML
    inline_styles = []
    for m in re.finditer(r"<style[^>]*>([\s\S]*?)</style>", raw, flags=re.I):
        inline_styles.append(m.group(1))
    
    css = rewrite_css_for_wp(neo_css + "\n" + site_css + "\n" + "\n".join(inline_styles))

    font_links, body_inner, attrs, json_ld = strip_head_noise(raw)

    # Pull scripts out of the original document (head + body)
    _, scripts_from_full = extract_local_scripts(raw, PROD)

    # Also strip leftover executable script tags from body_inner (keep ld+json)
    def strip_body_script(match: re.Match[str]) -> str:
        tag = match.group(0)
        type_m = re.search(r'\btype=["\']([^"\']+)["\']', tag, flags=re.I)
        if type_m and type_m.group(1).lower() not in (
            "text/javascript",
            "application/javascript",
            "module",
        ):
            return tag
        return ""

    body_inner = re.sub(
        r"<script\b[^>]*>[\s\S]*?</script>", strip_body_script, body_inner, flags=re.I
    )
    # Strip leftover link stylesheets from body if any
    body_inner = re.sub(r"<link\b[^>]*>", "", body_inner, flags=re.I)

    body_inner = rewrite_paths(body_inner)

    palette = parse_attr(attrs, "data-neo-palette") or "moon"
    theme = parse_attr(attrs, "data-neo-theme") or "light"
    extra_class = html_class.strip()

    wrapper_attrs = (
        f'class="wp-html-module" data-neo-wp-embed '
        f'data-neo-palette="{palette}" data-neo-theme="{theme}" data-neo-page="{page_id}"'
    )
    if extra_class:
        wrapper_attrs += f' data-neo-html-class="{extra_class}"'

    # Early boot: ensure html class js + palette on real document when possible
    boot_js = f"""
(function(){{
  try {{
    var html = document.documentElement;
    html.classList.add("js");
    html.setAttribute("data-neo-palette", "{palette}");
    html.setAttribute("data-neo-theme", "{theme}");
    {"html.classList.add('" + extra_class + "');" if extra_class else ""}
    if (document.body) document.body.classList.add("neo-body");
  }} catch (e) {{}}
}})();
"""

    out: list[str] = []
    out.append("<!-- wp:html -->")
    out.append("<!-- External resources — verbatim from source, do not remove -->")
    out.append(font_links)
    out.append("")
    out.append("<style>")
    out.append(WP_RESET)
    out.append("/* Bundled Neo + site CSS */")
    out.append(css)
    out.append("</style>")
    out.append("")
    import base64
    b64_boot = base64.b64encode(boot_js.encode('utf-8')).decode('utf-8')
    out.append("<script>")
    out.append(f"var s = document.createElement('script'); s.textContent = atob('{b64_boot}'); document.head.appendChild(s);")
    out.append("</script>")
    out.append("")
    out.append(f"<div {wrapper_attrs}>")
    for block in json_ld:
        # Rewrite absolute demo URLs inside schema if needed
        out.append(rewrite_paths(block))
    out.append(body_inner.strip())
    out.append("</div>")
    out.append("")

    # Deduplicate scripts while preserving order
    seen_code: set[str] = set()
    for block in scripts_from_full:
        key = block.strip()
        if not key or key in seen_code:
            continue
        seen_code.add(key)
        import base64
        b64_code = base64.b64encode(block.encode('utf-8')).decode('utf-8')
        out.append("<script>")
        out.append(f"var s = document.createElement('script'); s.textContent = atob('{b64_code}'); document.head.appendChild(s);")
        out.append("</script>")
        out.append("")

    out.append("<!-- /wp:html -->")
    dest = PAGES / dest_name
    dest.write_text("\n".join(out), encoding="utf-8")
    print(f"Wrote {dest.relative_to(ROOT)} ({dest.stat().st_size} bytes)")


def assert_no_data_uri_pastes() -> None:
    """Hard-fail if any pages/*.html still embeds CSS/JS as data: URIs."""
    bad: list[str] = []
    for path in sorted(PAGES.glob("*.html")):
        text = path.read_text(encoding="utf-8")
        if "data:text/css" in text or "data:text/javascript" in text:
            bad.append(path.name)
        if "neo-mobile-menu--open" not in text:
            bad.append(f"{path.name} (missing .neo-mobile-menu--open)")
        if "overflow-x: clip" not in text and "overflow-x:clip" not in text:
            bad.append(f"{path.name} (missing overflow-x: clip)")
    if bad:
        print("FAIL: invalid WP paste output:", file=sys.stderr)
        for name in bad:
            print(f"  - {name}", file=sys.stderr)
        print(
            "Neo contract: never ship data: URI CSS/JS. See production_site/neo/WP_DELIVERY.md",
            file=sys.stderr,
        )
        raise SystemExit(1)
    print("OK: all pages/*.html pass data: URI + mobile shell guards")


def main() -> None:
    PAGES.mkdir(exist_ok=True)
    for src, (dest, page_id, html_class) in PAGE_MAP.items():
        bundle_one(src, dest, page_id, html_class)
    assert_no_data_uri_pastes()


if __name__ == "__main__":
    main()

