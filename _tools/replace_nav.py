import glob

files = glob.glob("pages/*.html")
svg_code = '<a href="/login/" aria-label="Sign in" style="display: flex; align-items: center; justify-content: center; color: var(--neo-accent); transition: color var(--neo-duration-fast); width: 40px; height: 40px; border-radius: 50%;" onmouseover="this.style.color=\'var(--neo-accent-hover)\';" onmouseout="this.style.color=\'var(--neo-accent)\';"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><circle fill="none" cx="12" cy="7" r="3"></circle><path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zm9 11v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1h2z"></path></g></svg></a>'

count = 0
for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    # Remove from desktop nav links
    if '<li><a href="/login/">Sign in</a></li>' in content:
        # Only replace the first occurrence which is in the desktop nav (usually)
        # Wait, the first one is desktop, the second is mobile!
        # Let's replace ONLY inside the neo-desktop-nav__links block
        
        # Split by <ul class="neo-desktop-nav__links">
        parts = content.split('<ul class="neo-desktop-nav__links">')
        if len(parts) > 1:
            # We are inside the desktop nav links in parts[1]
            parts[1] = parts[1].replace('<li><a href="/login/">Sign in</a></li>\n', '')
            content = '<ul class="neo-desktop-nav__links">'.join(parts)
            
            # Now add the SVG right after Book now
            # Find: <a class="neo-btn neo-btn--primary" href="/book/">Book now</a>
            book_now = '<a class="neo-btn neo-btn--primary" href="/book/">Book now</a>'
            # We want to replace the first occurrence of book_now with book_now + \n + svg_code
            # But wait, there is a mobile book_now too, which has data-neo-menu-close=""
            # So the desktop one doesn't have data-neo-menu-close=""
            content = content.replace(book_now, book_now + '\n' + svg_code, 1)
            
            with open(f, 'w') as file:
                file.write(content)
            count += 1

print(f"Replaced nav in {count} files.")
