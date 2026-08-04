import re
import os
import glob

# 1. Read pristine CSS from preview/home.html
with open('preview/home.html', 'r', encoding='utf-8') as f:
    preview_content = f.read()

style_match = re.search(r'<style>.*?</style>', preview_content, flags=re.DOTALL)
if not style_match:
    print("Could not find style in preview/home.html")
    exit(1)

pristine_style = style_match.group(0)

# 2. Add fix for desktop nav on mobile
nav_fix = """/* Mobile nav fix */
.neo-desktop-nav { display: none !important; }
@media(min-width:1024px) {
  .neo-desktop-nav { display: block !important; }
}
"""
pristine_style = pristine_style.replace('/* Universal WordPress & Elementor Full-Width Reset */', nav_fix + '\n/* Universal WordPress & Elementor Full-Width Reset */')

# 3. Replace in all pages/*.html
pages_dir = 'pages'
for fpath in glob.glob(os.path.join(pages_dir, '*.html')):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove existing style block
    content = re.sub(r'<style>.*?</style>', pristine_style, content, flags=re.DOTALL)
    
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed {fpath}")

