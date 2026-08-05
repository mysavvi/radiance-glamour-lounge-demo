#!/usr/bin/env python3
import os
import sys
import requests
import json
import glob
from pathlib import Path

# Add scripts directory to path to import bundle_wordpress
sys.path.append(os.path.dirname(__file__))
import bundle_wordpress
import base64

def process_service_html(html_content: str, slug: str) -> str:
    ROOT = Path(os.path.dirname(os.path.dirname(__file__)))
    # We need to extract head noise, bundle CSS, and extract scripts.
    
    # 1. Collect CSS (Neo + Site)
    neo_css = bundle_wordpress.resolve_css(ROOT / "neo" / "neo-design.css")
    site_css = (ROOT / "site.css").read_text(encoding="utf-8")
    
    # Extract inline style blocks from the original HTML
    import re
    inline_styles = []
    for m in re.finditer(r"<style[^>]*>([\s\S]*?)</style>", html_content, flags=re.I):
        inline_styles.append(m.group(1))
        
    css = bundle_wordpress.rewrite_css_for_wp(neo_css + "\n" + site_css + "\n" + "\n".join(inline_styles))
    
    # 2. Strip head noise
    font_links, body_inner, attrs, json_ld = bundle_wordpress.strip_head_noise(html_content)
    
    # 3. Extract scripts (base path is ROOT for resolution)
    _, scripts = bundle_wordpress.extract_local_scripts(html_content, ROOT)
    
    # 4. Strip leftover scripts and links from body
    def strip_body_script(match):
        tag = match.group(0)
        type_m = re.search(r'\btype=["\']([^"\']+)["\']', tag, flags=re.I)
        if type_m and type_m.group(1).lower() not in ("text/javascript", "application/javascript", "module"):
            return tag
        return ""
    
    body_inner = re.sub(r"<script\b[^>]*>[\s\S]*?</script>", strip_body_script, body_inner, flags=re.I)
    body_inner = re.sub(r"<link\b[^>]*>", "", body_inner, flags=re.I)
    
    # 5. Rewrite paths
    body_inner = bundle_wordpress.rewrite_paths(body_inner)
    
    palette = bundle_wordpress.parse_attr(attrs, "data-neo-palette") or "moon"
    theme = bundle_wordpress.parse_attr(attrs, "data-neo-theme") or "light"
    extra_class = ""
    
    wrapper_attrs = (
        f'class="wp-html-module" data-neo-wp-embed '
        f'data-neo-palette="{palette}" data-neo-theme="{theme}" data-neo-page="{slug}"'
    )
    
    boot_js = f"""
(function(){{
  try {{
    var html = document.documentElement;
    html.classList.add("js");
    html.setAttribute("data-neo-palette", "{palette}");
    html.setAttribute("data-neo-theme", "{theme}");
    if (document.body) document.body.classList.add("neo-body");
  }} catch (e) {{}}
}})();
"""
    b64_boot = base64.b64encode(boot_js.encode('utf-8')).decode('utf-8')
    
    out = []
    out.append("<!-- wp:html -->")
    out.append("<!-- External resources — verbatim from source, do not remove -->")
    out.append(font_links)
    out.append("")
    out.append("<style>")
    out.append(bundle_wordpress.WP_RESET)
    out.append("/* Bundled Neo + site CSS */")
    out.append(css)
    out.append("</style>")
    out.append("")
    out.append("<script>")
    out.append(f"var s = document.createElement('script'); s.textContent = atob('{b64_boot}'); document.head.appendChild(s);")
    out.append("</script>")
    out.append("")
    out.append(f"<div {wrapper_attrs}>")
    for block in json_ld:
        out.append(bundle_wordpress.rewrite_paths(block))
    out.append(body_inner.strip())
    out.append("</div>")
    out.append("")
    
    seen_code = set()
    for block in scripts:
        key = block.strip()
        if not key or key in seen_code:
            continue
        seen_code.add(key)
        b64_code = base64.b64encode(block.encode('utf-8')).decode('utf-8')
        out.append("<script>")
        out.append(f"var s = document.createElement('script'); s.textContent = atob('{b64_code}'); document.head.appendChild(s);")
        out.append("</script>")
        out.append("")
        
    out.append("<!-- /wp:html -->")
    
    return "\n".join(out)


def main():
    env = {}
    env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
    if os.path.exists(env_path):
        with open(env_path, 'r') as f:
            for line in f:
                if '=' in line and not line.strip().startswith('#'):
                    k, v = line.strip().split('=', 1)
                    env[k.strip()] = v.strip()
                    
    url_base = env.get("WP_API_URL", "https://radianceglamourlounge.co.uk/wp-json/wp/v2/pages")
    username = env.get("WP_USERNAME")
    password = env.get("WP_APP_PASSWORD")

    if not username or not password:
        print("Error: WP credentials missing in .env")
        return

    print("Fetching existing pages...")
    resp = requests.get(f"{url_base}?per_page=100", auth=(username, password))
    if resp.status_code != 200:
        print("Failed to fetch existing pages:", resp.text)
        return
        
    pages = resp.json()
    slug_to_id = {p['slug']: p['id'] for p in pages}
    
    services_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "services")
    content_data_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "content_data")
    
    for json_file in glob.glob(os.path.join(content_data_dir, '*.json')):
        with open(json_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        slug = data['slug']
        title = data['meta_title'].split(' | ')[0]
        
        html_file = os.path.join(services_dir, f"{slug}.html")
        if not os.path.exists(html_file):
            print(f"Skipping {slug}, html not found.")
            continue
            
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
            
        print(f"Bundling {slug} for WordPress...")
        wrapped_content = process_service_html(html_content, slug)
        
        if slug in slug_to_id:
            page_id = slug_to_id[slug]
            print(f"Updating /{slug}/ (ID {page_id})...", end=" ", flush=True)
            update_resp = requests.post(
                f"{url_base}/{page_id}",
                auth=(username, password),
                json={"content": wrapped_content}
            )
            if update_resp.status_code == 200:
                print("Success!")
            else:
                print(f"Error {update_resp.status_code}: {update_resp.text}")
        else:
            print(f"Creating page: {title} (/{slug}/)...", end=" ", flush=True)
            payload = {
                "title": title,
                "slug": slug,
                "content": wrapped_content,
                "status": "publish",
                "template": "elementor_canvas"
            }
            create_resp = requests.post(url_base, auth=(username, password), json=payload)
            if create_resp.status_code == 201:
                print("Success!")
            else:
                print(f"Failed. {create_resp.status_code}: {create_resp.text}")

if __name__ == "__main__":
    main()
