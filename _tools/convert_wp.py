import re
from bs4 import BeautifulSoup
import sys

def convert_html(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    # Extract external resources and inline them if they are local
    external_links = []
    inlined_styles = []
    import os
    
    # Base path for local assets
    base_dir = os.path.dirname(os.path.abspath(input_file))

    for link in soup.find_all('link'):
        if link.get('rel') == ['icon'] or link.get('rel') == ['shortcut', 'icon']:
            continue
        href = link.get('href')
        
        # If it's a local stylesheet, inline it
        if href and not href.startswith('http') and not href.startswith('//') and 'stylesheet' in (link.get('rel') or []):
            clean_href = href.split('?')[0].lstrip('/')
            local_path = os.path.join(base_dir, clean_href)
            
            def resolve_css_imports(file_path, processed=None):
                if processed is None:
                    processed = set()
                if not os.path.exists(file_path) or file_path in processed:
                    return ""
                processed.add(file_path)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Replace @import url("...")
                def replacer(match):
                    import_path = match.group(1).strip("'\"")
                    if import_path.startswith('http') or import_path.startswith('//'):
                        return match.group(0)
                    new_path = os.path.join(os.path.dirname(file_path), import_path)
                    return resolve_css_imports(new_path, processed)
                
                content = re.sub(r'@import\s+url\(([^)]+)\);', replacer, content)
                return content
            
            if os.path.exists(local_path):
                css_content = resolve_css_imports(local_path)
                # Apply namespace replacement to inlined CSS as well
                css_content = re.sub(r'(?<![-a-zA-Z0-9_])html(?![a-zA-Z0-9_-])', '.wp-html-module', css_content)
                css_content = re.sub(r'(?<![-a-zA-Z0-9_])body(?![a-zA-Z0-9_-])', '.wp-html-module', css_content)
                inlined_styles.append(css_content)
                link.decompose()
                continue
                
        external_links.append(str(link))
        link.decompose()

    external_scripts = []
    inlined_scripts = []
    for script in soup.find_all('script'):
        src = script.get('src')
        if src:
            if not src.startswith('http') and not src.startswith('//'):
                clean_src = src.split('?')[0].lstrip('/')
                local_path = os.path.join(base_dir, clean_src)
                if os.path.exists(local_path):
                    with open(local_path, 'r', encoding='utf-8') as sf:
                        inlined_scripts.append(sf.read())
                    script.decompose()
                    continue
            external_scripts.append(str(script))
        else:
            inlined_scripts.append(script.string if script.string else "")
        script.decompose()

    for style in soup.find_all('style'):
        css = style.string if style.string else ""
        css = re.sub(r'(?<![-a-zA-Z0-9_])html(?![a-zA-Z0-9_-])', '.wp-html-module', css)
        css = re.sub(r'(?<![-a-zA-Z0-9_])body(?![a-zA-Z0-9_-])', '.wp-html-module', css)
        inlined_styles.append(css)
        style.decompose()

    # Fix relative paths in body content
    for img in soup.find_all('img'):
        src = img.get('src')
        if src and not src.startswith('http') and not src.startswith('/') and not src.startswith('data:'):
            img['src'] = '/' + src

    for a in soup.find_all('a'):
        href = a.get('href')
        if href and not href.startswith('http') and not href.startswith('/') and not href.startswith('#') and not href.startswith('mailto:') and not href.startswith('tel:'):
            a['href'] = '/' + href

    for link in external_links:
        # We need to parse external links back to fix hrefs
        link_soup = BeautifulSoup(link, 'html.parser')
        l_tag = link_soup.find('link')
        if l_tag:
            href = l_tag.get('href')
            if href and not href.startswith('http') and not href.startswith('/'):
                l_tag['href'] = '/' + href
                external_links[external_links.index(link)] = str(l_tag)

    for script in external_scripts:
        script_soup = BeautifulSoup(script, 'html.parser')
        s_tag = script_soup.find('script')
        if s_tag:
            src = s_tag.get('src')
            if src and not src.startswith('http') and not src.startswith('/'):
                s_tag['src'] = '/' + src
                external_scripts[external_scripts.index(script)] = str(s_tag)

    # Remove static headers and footers to avoid duplicating WordPress theme ones

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
    out.extend(inlined_styles)
    out.append("</style>\n")
    
    out.append("<!-- SECTION 3: CONTENT -->")
    out.append(f'<div class="{" ".join(wrapper_classes)}">')
    out.append(body_content)
    out.append("</div>\n")
    
    out.append("<!-- SECTION 4: SCRIPTS -->")
    for script in inlined_scripts:
        out.append(f"<script>{script}</script>")
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("\n".join(out))

    print(f"Successfully converted {input_file} to {output_file}")

if __name__ == "__main__":
    convert_html(sys.argv[1], sys.argv[2])
