import os, glob

files = [
    '/Users/user/Desktop/Radiance Glamour Lounge/site.css',
    '/Users/user/Desktop/Radiance Glamour Lounge/radiance-theme/style.css'
]

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    target = """.neo-desktop-nav {
    display: none !important;
  }"""
    target2 = """.neo-desktop-nav { display: none !important; }"""
    
    changed = False
    if target in content:
        content = content.replace(target, "")
        changed = True
    if target2 in content:
        content = content.replace(target2, "")
        changed = True
        
    if changed:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Removed fallback from {fpath}")

