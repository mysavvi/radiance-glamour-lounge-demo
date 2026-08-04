import os
import glob
import re

url_replacements = [
    (r'href=["\'](?:/)?index\.html(["\'\?#])', r'href="/\1'),
    (r'href=["\'](?:/)?treatments\.html(["\'\?#])', r'href="/treatments/\1'),
    (r'href=["\'](?:/)?clinic\.html(["\'\?#])', r'href="/clinic/\1'),
    (r'href=["\'](?:/)?testimonials\.html(["\'\?#])', r'href="/reviews/\1'),
    (r'href=["\'](?:/)?reviews\.html(["\'\?#])', r'href="/reviews/\1'),
    (r'href=["\'](?:/)?shop\.html(["\'\?#])', r'href="/shop/\1'),
    (r'href=["\'](?:/)?contact\.html(["\'\?#])', r'href="/contact/\1'),
    (r'href=["\'](?:/)?book\.html(["\'\?#])', r'href="/book/\1'),
    (r'href=["\'](?:/)?book-success\.html(["\'\?#])', r'href="/book-success/\1'),
    (r'href=["\'](?:/)?cart\.html(["\'\?#])', r'href="/cart/\1'),
    (r'href=["\'](?:/)?checkout\.html(["\'\?#])', r'href="/checkout/\1'),
    (r'href=["\'](?:/)?product\.html(["\'\?#])', r'href="/product/\1'),
    (r'href=["\'](?:/)?login\.html(["\'\?#])', r'href="/login/\1'),
    (r'href=["\'](?:/)?register\.html(["\'\?#])', r'href="/register/\1'),
    (r'href=["\'](?:/)?privacy-policy\.html(["\'\?#])', r'href="/privacy-policy/\1'),
    (r'href=["\'](?:/)?privacy\.html(["\'\?#])', r'href="/privacy-policy/\1'),
    (r'href=["\'](?:/)?terms\.html(["\'\?#])', r'href="/terms/\1'),
]

pages_dir = '/Users/user/Desktop/Radiance Glamour Lounge/pages'

modified_count = 0
for fpath in glob.glob(os.path.join(pages_dir, '*.html')):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    # Remove bad canonical links pointing to .co.uk or .html
    new_content = re.sub(r'<link[^>]*rel=["\']canonical["\'][^>]*>', '', new_content)
    new_content = re.sub(r'<link[^>]*rel=["\']alternate["\'][^>]*>', '', new_content)
    
    for pattern, repl in url_replacements:
        new_content = re.sub(pattern, repl, new_content)
        
    if new_content != content:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        modified_count += 1
        print(f"Updated links in: {os.path.basename(fpath)}")

print(f"Total files updated with clean WordPress URLs: {modified_count}")
