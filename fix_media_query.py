import os, glob
pages_dir = '/Users/user/Desktop/Radiance Glamour Lounge/pages'
for fpath in glob.glob(os.path.join(pages_dir, '*.html')):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # The bug is that it only hides desktop nav between 768px and 1024px.
    # It should hide it everywhere below 1024px.
    target = "@media (min-width: 768px) and (max-width: 1023.98px) {"
    replacement = "@media (max-width: 1023.98px) {"
    
    if target in content:
        content = content.replace(target, replacement)
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {os.path.basename(fpath)}")
