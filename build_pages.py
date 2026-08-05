import json
import os
import re
import glob

# Ensure services directory exists
if not os.path.exists('services'):
    os.makedirs('services')

# Read template
with open('clinic.html', 'r', encoding='utf-8') as f:
    template_html = f.read()

# Extract header (up to <main...>) and footer (from </main> onwards)
main_start_match = re.search(r'(<main[^>]*>)', template_html)
main_end_match = re.search(r'(</main>)', template_html)

if not main_start_match or not main_end_match:
    print("Could not find <main> tags in clinic.html")
    exit(1)

header_template = template_html[:main_start_match.end()]
footer_template = template_html[main_end_match.start():]

def fix_links_for_subfolder(html_str):
    # Fix paths
    html_str = re.sub(r'href="(?!http|mailto|tel|#|/)([^"]+)"', r'href="../\1"', html_str)
    html_str = re.sub(r'src="(?!http|mailto|tel|#|/)([^"]+)"', r'src="../\1"', html_str)
    return html_str

for json_file in glob.glob('content_data/*.json'):
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    slug = data['slug']
    title = data['meta_title']
    desc = data['meta_description']
    schema = data['schema_json']
    content = data['html_content']
    
    # Process header
    # Replace title
    header = re.sub(r'<title>.*?</title>', f'<title>{title}</title>', header_template, flags=re.DOTALL)
    # Replace description
    header = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{desc}">', header)
    # Replace schema
    header = re.sub(r'<script type="application/ld\+json">.*?</script>', f'<script type="application/ld+json">\n{schema}\n</script>', header, flags=re.DOTALL)
    
    # Update OpenGraph and Twitter tags
    header = re.sub(r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{title}">', header)
    header = re.sub(r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{desc}">', header)
    header = re.sub(r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="https://www.radianceglamourlounge.co.uk/services/{slug}.html">', header)
    header = re.sub(r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="https://www.radianceglamourlounge.co.uk/services/{slug}.html">', header)
    header = re.sub(r'<link rel="alternate" hreflang="en-gb" href="[^"]*">', f'<link rel="alternate" hreflang="en-gb" href="https://www.radianceglamourlounge.co.uk/services/{slug}.html">', header)
    header = re.sub(r'<link rel="alternate" hreflang="x-default" href="[^"]*">', f'<link rel="alternate" hreflang="x-default" href="https://www.radianceglamourlounge.co.uk/services/{slug}.html">', header)

    header = re.sub(r'<meta name="twitter:title" content="[^"]*">', f'<meta name="twitter:title" content="{title}">', header)
    header = re.sub(r'<meta name="twitter:description" content="[^"]*">', f'<meta name="twitter:description" content="{desc}">', header)
    
    header = fix_links_for_subfolder(header)
    footer = fix_links_for_subfolder(footer_template)
    
    full_html = header + "\n" + content + "\n" + footer
    
    out_path = os.path.join('services', f"{slug}.html")
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(full_html)
        
    print(f"Built {out_path}")

print("All pages built successfully.")
