import os
import re
import difflib

preview_dir = '_localhost_preview'
prod_dir = 'production_site'

html_files = [f for f in os.listdir(prod_dir) if f.endswith('.html')]

main_pattern = re.compile(r'<main id="neo-main".*?</main>', re.DOTALL)

for file in html_files:
    prev_file = os.path.join(preview_dir, file)
    prod_file = os.path.join(prod_dir, file)
    
    if not os.path.exists(prev_file):
        continue
        
    with open(prev_file, 'r') as f:
        prev_content = f.read()
    with open(prod_file, 'r') as f:
        prod_content = f.read()
        
    prev_main = main_pattern.search(prev_content)
    prod_main = main_pattern.search(prod_content)
    
    if prev_main and prod_main:
        prev_str = prev_main.group(0)
        prod_str = prod_main.group(0)
        
        # Remove simple differences like href="something.html" vs href="/something/"
        prev_str = re.sub(r'href="[^"]+"', '', prev_str)
        prod_str = re.sub(r'href="[^"]+"', '', prod_str)
        
        if len(prev_str) != len(prod_str):
            diff_ratio = difflib.SequenceMatcher(None, prev_str, prod_str).ratio()
            if diff_ratio < 0.99:
                print(f"Significant difference found in {file} (similarity: {diff_ratio:.2f})")
                print(f"Preview len: {len(prev_str)}, Prod len: {len(prod_str)}")
