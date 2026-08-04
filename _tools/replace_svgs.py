import glob

files = glob.glob("pages/*.html")

# Current Wheelchair SVG (that I added)
bad_wheelchair = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><circle cx="18" cy="4" r="2"></circle><path d="m17.836 12.014-4.345.725 3.29-4.113a1 1 0 0 0-.227-1.457l-6-4a.999.999 0 0 0-1.262.125l-4 4 1.414 1.414 3.42-3.42 2.584 1.723-2.681 3.352a5.913 5.913 0 0 0-5.5.752l1.451 1.451A3.972 3.972 0 0 1 8 12c2.206 0 4 1.794 4 4 0 .739-.216 1.425-.566 2.02l1.451 1.451A5.961 5.961 0 0 0 14 16c0-.445-.053-.878-.145-1.295L17 14.181V20h2v-7a.998.998 0 0 0-1.164-.986zM8 20c-2.206 0-4-1.794-4-4 0-.739.216-1.425.566-2.02l-1.451-1.451A5.961 5.961 0 0 0 2 16c0 3.309 2.691 6 6 6 1.294 0 2.49-.416 3.471-1.115l-1.451-1.451A3.972 3.972 0 0 1 8 20z"></path></g></svg>'

# Current Sign In SVG (that I added)
bad_user = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><circle fill="none" cx="12" cy="7" r="3"></circle><path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zm9 11v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1h2z"></path></g></svg>'

# New Premium Universal Accessibility SVG (Thin stroke, matching neo design)
new_a11y = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="4" r="2"></circle><path d="M12 6v7"></path><path d="M5 8h14"></path><path d="M12 13l-4 8"></path><path d="M12 13l4 8"></path></svg>'

# New Premium User SVG (Thin stroke, matching neo design)
new_user = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'

c_a11y = 0
c_user = 0

for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    dirty = False
    
    if bad_wheelchair in content:
        content = content.replace(bad_wheelchair, new_a11y)
        c_a11y += 1
        dirty = True
        
    if bad_user in content:
        content = content.replace(bad_user, new_user)
        c_user += 1
        dirty = True
        
    if dirty:
        with open(f, 'w') as file:
            file.write(content)

print(f"Replaced accessibility SVG in {c_a11y} files.")
print(f"Replaced user SVG in {c_user} files.")
