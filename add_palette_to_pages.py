import os

pages_dir = 'pages'
count = 0

for filename in os.listdir(pages_dir):
    if not filename.endswith('.html'):
        continue
    
    filepath = os.path.join(pages_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    page_name = filename.replace('.html', '')
    if page_name == 'live_site':
        page_name = 'home'
    
    if '<!-- SECTION 3: CONTENT -->' in content:
        parts = content.split('<!-- SECTION 3: CONTENT -->')
        if len(parts) > 1:
            # Let's see if the first wp-html-module in parts[1] already has data-neo-palette
            first_div_idx = parts[1].find('<div class="wp-html-module')
            end_bracket = parts[1].find('>', first_div_idx)
            
            if first_div_idx != -1 and end_bracket != -1:
                div_tag = parts[1][first_div_idx:end_bracket+1]
                if 'data-neo-palette' not in div_tag:
                    # replace only the EXACT div_tag we found with the new one
                    new_tag = f'<div class="wp-html-module" data-neo-palette="moon" data-neo-theme="light" data-neo-page="{page_name}">'
                    
                    if div_tag == '<div class="wp-html-module">':
                         parts[1] = parts[1].replace('<div class="wp-html-module">', new_tag, 1)
                    
                    content = '<!-- SECTION 3: CONTENT -->'.join(parts)
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    count += 1
                    print(f"Added palette to {filename}")

print(f"Done! Modified {count} files.")
