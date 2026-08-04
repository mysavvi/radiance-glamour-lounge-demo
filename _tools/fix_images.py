import os
import glob
import re

pages_dir = '/Users/user/Desktop/Radiance Glamour Lounge/pages'

modified_count = 0
for fpath in glob.glob(os.path.join(pages_dir, '*.html')):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace relative /images/ with absolute URL
    new_content = re.sub(
        r'src=["\']/images/([^"\']+)["\']',
        r'src="https://mysavvi.github.io/radiance-glamour-lounge-demo/images/\1"',
        content
    )
    
    if new_content != content:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed images in {os.path.basename(fpath)}")
        modified_count += 1

print(f"Fixed {modified_count} files.")
