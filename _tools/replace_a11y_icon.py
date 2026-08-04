import glob
import re

files = glob.glob("pages/*.html")

# The footer eye icon:
footer_eye_svg = '<svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewbox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'

# The buggy wheelchair SVG I injected earlier (without width/height):
buggy_wheelchair = '<svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><circle cx="18" cy="4" r="2"></circle><path d="m17.836 12.014-4.345.725 3.29-4.113a1 1 0 0 0-.227-1.457l-6-4a.999.999 0 0 0-1.262.125l-4 4 1.414 1.414 3.42-3.42 2.584 1.723-2.681 3.352a5.913 5.913 0 0 0-5.5.752l1.451 1.451A3.972 3.972 0 0 1 8 12c2.206 0 4 1.794 4 4 0 .739-.216 1.425-.566 2.02l1.451 1.451A5.961 5.961 0 0 0 14 16c0-.445-.053-.878-.145-1.295L17 14.181V20h2v-7a.998.998 0 0 0-1.164-.986zM8 20c-2.206 0-4-1.794-4-4 0-.739.216-1.425.566-2.02l-1.451-1.451A5.961 5.961 0 0 0 2 16c0 3.309 2.691 6 6 6 1.294 0 2.49-.416 3.471-1.115l-1.451-1.451A3.972 3.972 0 0 1 8 20z"></path></g></svg>'

# The new correct wheelchair SVG:
fixed_wheelchair = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><circle cx="18" cy="4" r="2"></circle><path d="m17.836 12.014-4.345.725 3.29-4.113a1 1 0 0 0-.227-1.457l-6-4a.999.999 0 0 0-1.262.125l-4 4 1.414 1.414 3.42-3.42 2.584 1.723-2.681 3.352a5.913 5.913 0 0 0-5.5.752l1.451 1.451A3.972 3.972 0 0 1 8 12c2.206 0 4 1.794 4 4 0 .739-.216 1.425-.566 2.02l1.451 1.451A5.961 5.961 0 0 0 14 16c0-.445-.053-.878-.145-1.295L17 14.181V20h2v-7a.998.998 0 0 0-1.164-.986zM8 20c-2.206 0-4-1.794-4-4 0-.739.216-1.425.566-2.02l-1.451-1.451A5.961 5.961 0 0 0 2 16c0 3.309 2.691 6 6 6 1.294 0 2.49-.416 3.471-1.115l-1.451-1.451A3.972 3.972 0 0 1 8 20z"></path></g></svg>'

count_footer = 0
count_js = 0

for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    dirty = False
    if footer_eye_svg in content:
        content = content.replace(footer_eye_svg, fixed_wheelchair)
        count_footer += 1
        dirty = True
        
    if buggy_wheelchair in content:
        content = content.replace(buggy_wheelchair, fixed_wheelchair)
        count_js += 1
        dirty = True
        
    if dirty:
        with open(f, 'w') as file:
            file.write(content)

print(f"Replaced footer eye in {count_footer} files.")
print(f"Fixed wheelchair in JS/HTML in {count_js} files.")
