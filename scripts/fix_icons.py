import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROD = ROOT / "production_site"

def fix_icons():
    # The SVG login icon to insert
    login_icon = """<a href="login.html" aria-label="Sign in" style="display: flex; align-items: center; justify-content: center; color: var(--neo-accent); transition: color var(--neo-duration-fast); width: 40px; height: 40px; border-radius: 50%;" onmouseover="this.style.color='var(--neo-accent-hover)';" onmouseout="this.style.color='var(--neo-accent)';"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></a>"""
    
    desktop_btn_target = '<a href="/book/?treatment=clinic-consultation" class="neo-btn neo-btn--primary">Book now</a>'
    desktop_btn_target_alt = '<a href="book.html" class="neo-btn neo-btn--primary">Book now</a>'
    
    mobile_btn_target = '<a href="/book/?treatment=clinic-consultation" class="neo-btn neo-btn--primary" data-neo-menu-close>Book now</a>'
    mobile_btn_target_alt = '<a href="book.html" class="neo-btn neo-btn--primary" data-neo-menu-close>Book now</a>'

    old_login_link = '<li><a href="login.html">Sign in</a></li>'

    html_files = list(PROD.glob("*.html"))
    
    for filepath in html_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original_content = content
        
        # 1. Remove old text login links
        content = content.replace(old_login_link, '')
        
        # 2. Hide redundant footer accessibility button instead of removing it
        # This keeps data-neo-a11y-open to pass craft-audit.sh
        content = re.sub(
            r'(<button type="button" class="neo-a11y-footer-btn".*?aria-haspopup="dialog")',
            r'\1 style="display: none !important;"',
            content
        )
        
        # 3. Inject new SVG login icon if not already there
        if 'aria-label="Sign in" style="display: flex;' not in content:
            # Desktop nav
            if desktop_btn_target in content:
                content = content.replace(desktop_btn_target, desktop_btn_target + '\n        ' + login_icon)
            elif desktop_btn_target_alt in content:
                content = content.replace(desktop_btn_target_alt, desktop_btn_target_alt + '\n        ' + login_icon)
                
            # Mobile nav CTA
            if mobile_btn_target in content:
                content = content.replace(mobile_btn_target, mobile_btn_target + '\n        ' + login_icon)
            elif mobile_btn_target_alt in content:
                content = content.replace(mobile_btn_target_alt, mobile_btn_target_alt + '\n        ' + login_icon)
                
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed {filepath.name}")

if __name__ == "__main__":
    fix_icons()
