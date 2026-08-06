import glob, re

for filepath in glob.glob("production_site/**/*.html", recursive=True):
    with open(filepath, "r") as f:
        content = f.read()

    prefix = "../" if "services/" in filepath else ""
    
    # 1. Desktop Nav: insert before Contact
    # Match: <li><a href="contact.html">Contact</a></li>
    # Replacement: <li><a href="about.html">About Us</a></li>\n          <li><a href="contact.html">Contact</a></li>
    content = re.sub(
        r'(<li><a href="(?:\.\./)?contact\.html".*?>Contact</a></li>)',
        f'<li><a href="{prefix}about.html">About Us</a></li>\n          \\1',
        content
    )
    
    # But wait! What if it already has an About link (like about.html)?
    # We should first remove any existing About/About Us links to avoid duplicates
    content = re.sub(r'\s*<li><a href="(?:\.\./)?about\.html".*?>About(?: Us)?</a></li>', '', content)
    
    # Now insert properly
    content = re.sub(
        r'(<li><a href="(?:\.\./)?contact\.html".*?>Contact</a></li>)',
        f'<li><a href="{prefix}about.html">About Us</a></li>\n          \\1',
        content
    )
    
    # Same for footer links (in case it didn't match the same regex exactly)
    # Wait, the footer uses <li><a href="contact.html">Contact</a></li> as well.
    # So the above regex will match BOTH header and footer! Perfect.
    
    with open(filepath, "w") as f:
        f.write(content)
    print(f"Fixed nav in {filepath}")
