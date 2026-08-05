#!/usr/bin/env python3
"""
Automated deployment script for Radiance Glamour Lounge WordPress pages.
Reads credentials from .env and pushes local HTML files to WP via the REST API.
"""
import os
import requests

def main():
    # Parse .env file
    env = {}
    env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
    if os.path.exists(env_path):
        with open(env_path, 'r') as f:
            for line in f:
                if '=' in line and not line.strip().startswith('#'):
                    k, v = line.strip().split('=', 1)
                    env[k.strip()] = v.strip()
    
    url_base = env.get("WP_API_URL", "https://radianceglamourlounge.com/wp-json/wp/v2/pages")
    username = env.get("WP_USERNAME")
    password = env.get("WP_APP_PASSWORD")
    
    if not username or not password:
        print("Error: WP_USERNAME and WP_APP_PASSWORD must be set in .env")
        return

    print("Fetching page mapping from WordPress...")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    resp = requests.get(f"{url_base}?per_page=100", auth=(username, password), headers=headers)
    if resp.status_code != 200:
        print("Failed to get pages:", resp.text)
        return

    pages = resp.json()
    slug_to_id = {p['slug']: p['id'] for p in pages}
    
    pages_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "pages")
    
    for filename in os.listdir(pages_dir):
        if not filename.endswith('.html'): continue
        
        slug = filename[:-5]
        if slug not in slug_to_id:
            print(f"Skipping {filename}: no matching page slug '{slug}' found on WordPress.")
            continue
            
        page_id = slug_to_id[slug]
        filepath = os.path.join(pages_dir, filename)
        
        with open(filepath, 'r', encoding='utf-8') as f:
            html_content = f.read()
            
        # Wrap in wp:html block if not present
        if "<!-- wp:html -->" not in html_content:
            wrapped_content = f"<!-- wp:html -->\n{html_content}\n<!-- /wp:html -->"
        else:
            wrapped_content = html_content
            
        print(f"Deploying {filename} to /{slug}/ (ID {page_id})...", end=" ", flush=True)
        update_resp = requests.post(
            f"{url_base}/{page_id}",
            auth=(username, password),
            json={"content": wrapped_content},
            headers=headers
        )
        
        if update_resp.status_code == 200:
            print("Success!")
        else:
            print(f"Error {update_resp.status_code}: {update_resp.text}")

if __name__ == "__main__":
    main()
