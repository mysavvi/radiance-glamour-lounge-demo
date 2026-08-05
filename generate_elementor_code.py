import os
import re

source_dir = 'production_site'
output_dir = 'elementor_ready'

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

def fix_links(html):
    # Fix index.html
    html = re.sub(r'href=["\'](?:/)?index\.html["\']', 'href="/"', html)
    # Fix other .html links
    html = re.sub(r'href=["\'](?:/)?([^"\']+)\.html["\']', r'href="/\1/"', html)
    
    # Fix images
    html = re.sub(r'src=["\']images/([^"\']+)["\']', r'src="https://radianceglamourlounge.com/wp-content/themes/radiance-theme/assets/images/\1"', html)
    
    return html

for filename in os.listdir(source_dir):
    if filename.endswith('.html'):
        with open(os.path.join(source_dir, filename), 'r', encoding='utf-8') as f:
            content = f.read()
            
        fixed_content = fix_links(content)
        
        with open(os.path.join(output_dir, filename), 'w', encoding='utf-8') as f:
            f.write(fixed_content)
            
print("Elementor-ready files generated in 'elementor_ready' folder.")
