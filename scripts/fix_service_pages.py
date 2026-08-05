#!/usr/bin/env python3
"""
Fix service pages in /services/:
  1. Replace 'Sign in' text link with SVG login icon (matching production_site pages).
  2. Remove the old text 'Sign in' list item from the mobile nav links.
  3. Add SVG login icon next to the 'Book now' button in the mobile menu CTA.
  4. Add SVG login icon next to the 'Book now' button in the desktop nav.
  5. Hide the footer accessibility button (preserve data attr for craft-audit.sh).
"""

import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SERVICES = ROOT / "services"

# Login icon SVG - uses relative ../login.html for subfolder pages
LOGIN_ICON = (
    '<a href="../login.html" aria-label="Sign in" style="display: flex; align-items: center; '
    'justify-content: center; color: var(--neo-accent); transition: color var(--neo-duration-fast); '
    'width: 40px; height: 40px; border-radius: 50%;" '
    'onmouseover="this.style.color=\'var(--neo-accent-hover)\';" '
    'onmouseout="this.style.color=\'var(--neo-accent)\';">'
    '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" '
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>'
    '<circle cx="12" cy="7" r="4"></circle>'
    '</svg></a>'
)

# Old text login links to strip out
OLD_LOGIN_LI_VARIANTS = [
    '<li><a href="../login.html">Sign in</a></li>',
    '<li><a href="login.html">Sign in</a></li>',
]

# Desktop nav Book now button patterns (service pages use /book/ absolute path)
DESKTOP_BTN_TARGETS = [
    '<a href="/book/?treatment=clinic-consultation" class="neo-btn neo-btn--primary">Book now</a>',
    '<a href="/book/" class="neo-btn neo-btn--primary">Book now</a>',
    '<a href="../book/?treatment=clinic-consultation" class="neo-btn neo-btn--primary">Book now</a>',
    '<a href="../book.html" class="neo-btn neo-btn--primary">Book now</a>',
]

# Mobile menu CTA Book now button patterns
MOBILE_BTN_TARGETS = [
    '<a href="/book/?treatment=clinic-consultation" class="neo-btn neo-btn--primary" data-neo-menu-close="">Book now</a>',
    '<a href="/book/?treatment=clinic-consultation" class="neo-btn neo-btn--primary" data-neo-menu-close>Book now</a>',
    '<a href="../book/?treatment=clinic-consultation" class="neo-btn neo-btn--primary" data-neo-menu-close>Book now</a>',
    '<a href="../book.html" class="neo-btn neo-btn--primary" data-neo-menu-close>Book now</a>',
]

ICON_SENTINEL = 'aria-label="Sign in" style="display: flex;'


def fix_service_page(filepath: Path) -> bool:
    content = filepath.read_text(encoding='utf-8')
    original = content

    # 1. Remove old text sign-in link (desktop nav list and mobile nav list)
    for old_li in OLD_LOGIN_LI_VARIANTS:
        content = content.replace(old_li, '')

    # 2. Inject SVG login icon if not already present
    if ICON_SENTINEL not in content:
        # Desktop nav: insert after Book now button
        injected = False
        for btn in DESKTOP_BTN_TARGETS:
            if btn in content:
                content = content.replace(btn, btn + '\n        ' + LOGIN_ICON)
                injected = True
                break

        # Mobile menu CTA: insert after Book now button
        for btn in MOBILE_BTN_TARGETS:
            if btn in content:
                content = content.replace(btn, btn + '\n        ' + LOGIN_ICON)
                break

    # 3. Hide footer accessibility button (keep data attr for craft-audit.sh)
    content = re.sub(
        r'(<button type="button" class="neo-a11y-footer-btn".*?aria-haspopup="dialog")',
        r'\1 style="display: none !important;"',
        content
    )

    if content != original:
        filepath.write_text(content, encoding='utf-8')
        return True
    return False


def main():
    html_files = list(SERVICES.glob("*.html"))
    if not html_files:
        print(f"No HTML files found in {SERVICES}")
        return

    fixed = 0
    for f in sorted(html_files):
        if fix_service_page(f):
            print(f"  Fixed: {f.name}")
            fixed += 1
        else:
            print(f"  OK (no changes): {f.name}")
    print(f"\nDone: {fixed}/{len(html_files)} files updated.")


if __name__ == '__main__':
    main()
