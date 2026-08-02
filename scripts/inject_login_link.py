import os
import glob
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROD = ROOT / "production_site"

def inject_links():
    desktop_target = '<ul class="neo-desktop-nav__links">'
    mobile_target = '<ul class="neo-mobile-menu__links">'
    
    desktop_login_link = '\n          <li><a href="login.html">Sign in</a></li>'
    mobile_login_link = '\n          <li><a href="login.html">Sign in</a></li>'
    
    html_files = list(PROD.glob("*.html"))
    
    for filepath in html_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        modified = False
        
        # Avoid double injection
        if 'href="login.html">Sign in</a>' not in content:
            if desktop_target in content:
                content = content.replace(desktop_target, desktop_target + desktop_login_link)
                modified = True
                
            if mobile_target in content:
                content = content.replace(mobile_target, mobile_target + mobile_login_link)
                modified = True
                
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Injected login link into {filepath.name}")

if __name__ == "__main__":
    inject_links()
