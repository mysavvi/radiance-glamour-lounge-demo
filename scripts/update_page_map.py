import json
import glob
import os

table1 = ""
table2 = ""

for json_file in sorted(glob.glob('content_data/*.json')):
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    slug = data['slug']
    title = data['meta_title']
    desc = data['meta_description']
    
    # We want title without pipes, so escape them for markdown table
    title_escaped = title.replace('|', '\\|')
    desc_escaped = desc.replace('|', '\\|')
    
    table1 += f"| {title.split(' | ')[0]} | `/services/{slug}/` | `services/{slug}.html` | `services/{slug}.html` |\n"
    table2 += f"| {title.split(' | ')[0]} | {title_escaped} | {desc_escaped} |\n"

with open('PAGE_MAP.md', 'r') as f:
    content = f.read()

# Insert into table 1
parts = content.split('\n\n## SEO')
new_content = parts[0] + "\n" + table1 + "\n\n## SEO" + parts[1] + "\n" + table2

with open('PAGE_MAP.md', 'w') as f:
    f.write(new_content)

print("Updated PAGE_MAP.md")
