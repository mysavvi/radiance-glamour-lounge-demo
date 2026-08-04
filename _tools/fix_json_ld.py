import os
import glob

pages_dir = '/Users/user/Desktop/Radiance Glamour Lounge/pages'

modified_count = 0
for fpath in glob.glob(os.path.join(pages_dir, '*.html')):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the broken JSON-LD script tag
    new_content = content.replace('<script>\n{\n  "@context"', '<script type="application/ld+json">\n{\n  "@context"')
    
    if new_content != content:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed JSON-LD tag in {os.path.basename(fpath)}")
        modified_count += 1

print(f"Fixed {modified_count} files.")
