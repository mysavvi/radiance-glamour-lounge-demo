import os, glob

pages_dir = '/Users/user/Desktop/Radiance Glamour Lounge/pages'
for fpath in glob.glob(os.path.join(pages_dir, '*.html')):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # The fallback to remove
    target = """.neo-desktop-nav {
    display: none !important;
  }"""
    
    # Another format it could be
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
        print(f"Removed fallback from {os.path.basename(fpath)}")
