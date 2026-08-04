import os, glob, re

nav_template = """      <div class="neo-bottom-nav__inner">
        <a href="index.html" class="neo-bottom-nav__tab{act_index}"{curr_index}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z"/></svg>
          <span>Home</span>
        </a>
        <a href="treatments.html" class="neo-bottom-nav__tab{act_treatments}"{curr_treatments}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          <span>Treatments</span>
        </a>
        <a href="tel:07857579631" class="neo-bottom-nav__tab">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          <span>Call</span>
        </a>
        <a href="{book_url}" class="neo-bottom-nav__tab{act_book}"{curr_book}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <span>Book</span>
        </a>
        <a href="shop.html" class="neo-bottom-nav__tab{act_shop}"{curr_shop}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
          <span>Shop</span>
        </a>
      </div>"""

for filepath in glob.glob("production_site/*.html"):
    if os.path.basename(filepath) == "404.html":
        continue
        
    with open(filepath, 'r') as f:
        html = f.read()
        
    pattern = r'      <div class="neo-bottom-nav__inner">[\s\S]*?      </div>'
    
    basename = os.path.basename(filepath)
    
    act_index = ' neo-bottom-nav__tab--active' if basename == 'index.html' else ''
    act_treatments = ' neo-bottom-nav__tab--active' if basename == 'treatments.html' else ''
    act_book = ' neo-bottom-nav__tab--active' if basename in ('book.html', 'book-success.html') else ''
    act_shop = ' neo-bottom-nav__tab--active' if basename == 'shop.html' else ''
    
    curr_index = ' aria-current="page"' if basename == 'index.html' else ''
    curr_treatments = ' aria-current="page"' if basename == 'treatments.html' else ''
    curr_book = ' aria-current="page"' if basename in ('book.html', 'book-success.html') else ''
    curr_shop = ' aria-current="page"' if basename == 'shop.html' else ''
    
    book_url = 'book.html'
    if basename == 'clinic.html':
        book_url = 'book.html?treatment=clinic-consultation'
        act_book = ' neo-bottom-nav__tab--active'
        curr_book = ' aria-current="page"'
        
    nav = nav_template.format(
        act_index=act_index,
        act_treatments=act_treatments,
        act_book=act_book,
        act_shop=act_shop,
        curr_index=curr_index,
        curr_treatments=curr_treatments,
        curr_book=curr_book,
        curr_shop=curr_shop,
        book_url=book_url
    )
    
    new_html = re.sub(pattern, nav, html)
    
    if html != new_html:
        with open(filepath, 'w') as f:
            f.write(new_html)
        print(f"Updated {basename}")
