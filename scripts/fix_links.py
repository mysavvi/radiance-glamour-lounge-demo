import os
import re

pages_dir = "pages"

for filename in os.listdir(pages_dir):
    if not filename.endswith('.html'):
        continue
        
    filepath = os.path.join(pages_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Replace href="page.html" with href="/page/"
    # Replace window.location.href='page.html' with window.location.href='/page/'
    
    # We should only target specific known pages to avoid breaking external links ending in .html (unlikely but possible)
    known_pages = ['home', 'shop', 'product', 'cart', 'checkout', 'contact', 'book', 'treatments', 'clinic', 'reviews', 'privacy-policy', 'terms', 'book-success']
    
    new_content = content
    for page in known_pages:
        # href="page.html" -> href="/page/"
        new_content = new_content.replace(f'href="{page}.html"', f'href="/{page}/"')
        # href='page.html' -> href='/page/'
        new_content = new_content.replace(f"href='{page}.html'", f"href='/{page}/'")
        
        # window.location.href="page.html" -> window.location.href="/page/"
        new_content = new_content.replace(f'window.location.href="{page}.html"', f'window.location.href="/{page}/"')
        # window.location.href='page.html' -> window.location.href='/page/'
        new_content = new_content.replace(f"window.location.href='{page}.html'", f"window.location.href='/{page}/'")

    # Special case for index.html -> /
    new_content = new_content.replace('href="index.html"', 'href="/"')
    new_content = new_content.replace("href='index.html'", "href='/'")
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated links in {filename}")

