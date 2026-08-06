import glob, re

for filepath in glob.glob("production_site/**/*.html", recursive=True):
    with open(filepath, "r") as f:
        content = f.read()
    
    # Remove from desktop nav
    content = re.sub(
        r'(\s*<li><a href="([^"]*)gift-cards\.html"[^>]*>Gift Cards</a></li>)',
        '',
        content
    )
    
    with open(filepath, "w") as f:
        f.write(content)
        
    print(f"Updated navs in {filepath}")
