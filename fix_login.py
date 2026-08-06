import glob, re

login_snippet = """<a href="login.html" aria-label="Sign in" style="display: flex; align-items: center; justify-content: center; color: var(--neo-accent); transition: color var(--neo-duration-fast); width: 40px; height: 40px; border-radius: 50%;" onmouseover="this.style.color='var(--neo-accent-hover)';" onmouseout="this.style.color='var(--neo-accent)';"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></a>"""
login_snippet_services = login_snippet.replace('"login.html"', '"../login.html"')

for filepath in glob.glob("production_site/**/*.html", recursive=True):
    with open(filepath, "r") as f:
        content = f.read()

    # First, remove existing login links to avoid duplicates
    # Just remove any line containing login.html that has an svg (or the exact snippet)
    content = re.sub(r'<a href="(?:\.\./)?login\.html" aria-label="Sign in".*?</a>', '', content)
    
    prefix = "../" if "services/" in filepath else ""
    snippet = login_snippet_services if "services/" in filepath else login_snippet
    
    # We want to add it right after: <a href="..." class="neo-btn neo-btn--primary"...>Book now</a>
    # Note: it could be `>Book</a>` or `>Book now</a>`
    # Let's match: class="neo-btn neo-btn--primary"[^>]*>Book(?: now)?</a>
    
    new_content = re.sub(
        r'(<a href="[^"]*" class="neo-btn neo-btn--primary"[^>]*>Book(?: now)?</a>)',
        f'\\1\n        {snippet}',
        content
    )
    
    if new_content != content:
        with open(filepath, "w") as f:
            f.write(new_content)
        print(f"Added login to {filepath}")
