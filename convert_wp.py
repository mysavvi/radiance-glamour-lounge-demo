import re
from bs4 import BeautifulSoup
import sys

def convert_html(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    # Extract external resources
    external_links = []
    for link in soup.find_all('link'):
        if link.get('rel') == ['icon'] or link.get('rel') == ['shortcut', 'icon']:
            continue
        external_links.append(str(link))
        link.decompose()

    external_scripts = []
    for script in soup.find_all('script'):
        if script.get('src'):
            external_scripts.append(str(script))
            script.decompose()

    # Extract style blocks
    styles = []
    for style in soup.find_all('style'):
        css = style.string if style.string else ""
        # Replace html and body with .wp-html-module
        # Be careful with things like html.something or body.something
        css = re.sub(r'(?<![-a-zA-Z0-9_])html(?![a-zA-Z0-9_-])', '.wp-html-module', css)
        css = re.sub(r'(?<![-a-zA-Z0-9_])body(?![a-zA-Z0-9_-])', '.wp-html-module', css)
        styles.append(css)
        style.decompose()

    # Extract inline scripts
    inline_scripts = []
    for script in soup.find_all('script'):
        if not script.get('src'):
            inline_scripts.append(str(script))
            script.decompose()

    # Get body content and classes
    body = soup.find('body')
    html_tag = soup.find('html')
    
    wrapper_classes = ['wp-html-module']
    if html_tag and html_tag.get('class'):
        wrapper_classes.extend(html_tag.get('class'))
    if body and body.get('class'):
        wrapper_classes.extend(body.get('class'))

    body_content = ""
    if body:
        # Decode contents to preserve exact HTML
        body_content = "".join([str(c) for c in body.contents])
    else:
        # Fallback if no body tag
        body_content = "".join([str(c) for c in soup.contents if c.name not in ['html', 'head', 'meta', 'title', '!DOCTYPE']])

    # Construct the final output
    out = []
    out.append("<!-- ====================================================== -->")
    out.append("<!-- WORDPRESS CUSTOM HTML BLOCK — SELF-CONTAINED            -->")
    out.append("<!-- Paste this entire block into:                           -->")
    out.append("<!--   Gutenberg → Custom HTML block                         -->")
    out.append("<!--   Elementor → HTML Widget                               -->")
    out.append("<!--   WPBakery  → Raw HTML element                          -->")
    out.append("<!-- ====================================================== -->\n")
    
    out.append("<!-- SECTION 1: EXTERNAL RESOURCES -->")
    out.extend(external_links)
    out.extend(external_scripts)
    out.append("\n<!-- SECTION 2: STYLES -->")
    out.append("<style>")
    out.append("/* WordPress Runtime Parity */\n.wp-html-module {\n    width: 100% !important;\n    max-width: 100% !important;\n    position: relative !important;\n}\n")
    out.extend(styles)
    out.append("</style>\n")
    
    out.append("<!-- SECTION 3: CONTENT -->")
    out.append(f'<div class="{" ".join(wrapper_classes)}">')
    out.append(body_content)
    out.append("</div>\n")
    
    out.append("<!-- SECTION 4: SCRIPTS -->")
    out.extend(inline_scripts)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("\n".join(out))

    print(f"Successfully converted {input_file} to {output_file}")

if __name__ == "__main__":
    convert_html(sys.argv[1], sys.argv[2])
