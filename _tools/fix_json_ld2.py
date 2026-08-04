import os, glob
pages_dir = '/Users/user/Desktop/Radiance Glamour Lounge/pages'
for fpath in glob.glob(os.path.join(pages_dir, '*.html')):
    with open(fpath, 'r', encoding='utf-8') as f: content = f.read()
    new_content = content.replace('<script type="application/ld+json">\n{\n  "@context"', '<script type="application/ld+json" id="radiance-schema" class="radiance-schema">\n{\n  "@context"')
    if new_content != content:
        with open(fpath, 'w', encoding='utf-8') as f: f.write(new_content)
print("Updated classes")
