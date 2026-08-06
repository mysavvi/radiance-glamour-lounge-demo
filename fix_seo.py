import re

files = [
    '/Users/user/Desktop/Radiance Glamour Lounge/production_site/clinic.html',
    '/Users/user/Desktop/Radiance Glamour Lounge/pages/clinic.html'
]

for file_path in files:
    with open(file_path, 'r') as f:
        html = f.read()

    def repl(m):
        a_tag = m.group(1)
        shade_tag_attrs = m.group(2)
        shade_name = m.group(3)
        middle = m.group(4)
        alt_text = m.group(5)
        img_attrs_2 = m.group(6)
        
        new_a_tag = a_tag
        if 'title=' not in a_tag:
            new_a_tag = a_tag.replace('class="rb-clinic-card"', f'class="rb-clinic-card" title="{alt_text} - Inspired by {shade_name}"')
        
        new_shade = f'<span class="neo-sr-only">Luxury Shade Match: </span>{shade_name}'
        if 'Luxury Shade Match:' in shade_name:
            new_shade = shade_name
            
        new_alt = alt_text
        if 'Inspired by' not in alt_text:
            new_alt = f"{alt_text} (Inspired by {shade_name})"
            
        return f'{new_a_tag}\n                <span class="rb-clinic-card__shade-tag"{shade_tag_attrs}>{new_shade}</span>{middle}alt="{new_alt}"{img_attrs_2}>'

    # Notice the final > is not in a group now, we append it manually.
    pattern = re.compile(r'(<a [^>]*class="rb-clinic-card"[^>]*>)\s*<span class="rb-clinic-card__shade-tag"([^>]*)>([^<]+)</span>(.*?)alt="([^"]+)"([^>]*)>', re.DOTALL)
    
    new_html = pattern.sub(repl, html)
    
    with open(file_path, 'w') as f:
        f.write(new_html)

print("SEO update complete.")
