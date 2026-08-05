import os
import re
import glob

source_dir = 'pages'
output_dir = 'elementor_snippets'

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

def fix_links(html):
    # Fix index.html
    html = re.sub(r'href=["\'](?:/)?index\.html["\']', 'href="/"', html)
    # Fix other .html links
    html = re.sub(r'href=["\'](?:/)?([^"\']+)\.html["\']', r'href="/\1/"', html)
    
    # Fix images to use the WordPress theme directory path
    html = re.sub(r'src=["\']images/([^"\']+)["\']', r'src="https://radianceglamourlounge.com/wp-content/themes/radiance-theme/assets/images/\1"', html)
    
    return html

files = glob.glob(os.path.join(source_dir, '*.html'))

for filepath in files:
    filename = os.path.basename(filepath)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Extract only the content between <main> and </main>
    # Handle the fact that <main> might have attributes like class="neo-page__main"
    main_match = re.search(r'<main[^>]*>(.*?)</main>', content, re.DOTALL | re.IGNORECASE)
    
    if main_match:
        extracted_content = main_match.group(1).strip()
    else:
        # If no <main> tag, just use the body but warn
        print(f"Warning: No <main> tag found in {filename}, falling back to full content.")
        body_match = re.search(r'<body[^>]*>(.*?)</body>', content, re.DOTALL | re.IGNORECASE)
        if body_match:
            extracted_content = body_match.group(1).strip()
        else:
            extracted_content = content
            
    # Remove header and footer if they are inside the main tag (they shouldn't be, but just in case)
    extracted_content = re.sub(r'<header[^>]*>.*?</header>', '', extracted_content, flags=re.DOTALL | re.IGNORECASE)
    extracted_content = re.sub(r'<footer[^>]*>.*?</footer>', '', extracted_content, flags=re.DOTALL | re.IGNORECASE)
    extracted_content = re.sub(r'<nav class="neo-desktop-nav"[^>]*>.*?</nav>', '', extracted_content, flags=re.DOTALL | re.IGNORECASE)
    extracted_content = re.sub(r'<nav class="neo-bottom-nav"[^>]*>.*?</nav>', '', extracted_content, flags=re.DOTALL | re.IGNORECASE)
    extracted_content = re.sub(r'<div class="neo-mobile-menu"[^>]*>.*?</div>\s*</div>', '', extracted_content, flags=re.DOTALL | re.IGNORECASE) # Attempt to strip menu
        
    fixed_content = fix_links(extracted_content)
    
    with open(os.path.join(output_dir, filename), 'w', encoding='utf-8') as f:
        f.write(fixed_content)
        
print("Elementor snippets generated in 'elementor_snippets' folder. These files contain NO headers or footers and are ready to paste into Elementor.")
