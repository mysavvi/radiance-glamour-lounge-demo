import requests
import os
import re

# Load .env
env = {}
with open('.env', 'r') as f:
    for line in f:
        if '=' in line and not line.strip().startswith('#'):
            k, v = line.strip().split('=', 1)
            env[k.strip()] = v.strip()

url_base = env.get("WP_API_URL")
username = env.get("WP_USERNAME")
password = env.get("WP_APP_PASSWORD")

if not url_base or not username or not password:
    print("Missing credentials in .env")
    exit(1)

# Get all pages
resp = requests.get(f"{url_base}?per_page=100", auth=(username, password))
if resp.status_code != 200:
    print("Failed to fetch pages:", resp.text)
    exit(1)

slug_to_id = {p['slug']: p['id'] for p in resp.json()}

# Parse PAGE_MAP.md
seo_data = {}
with open('PAGE_MAP.md', 'r', encoding='utf-8') as f:
    in_seo_table = False
    for line in f:
        if line.startswith('| Page | Title | Meta description |'):
            in_seo_table = True
            continue
        if in_seo_table and line.startswith('|'):
            parts = [p.strip() for p in line.split('|')]
            if len(parts) >= 4 and not parts[1].startswith('---'):
                page_name = parts[1]
                title = parts[2].replace('\\|', '|')
                desc = parts[3]
                
                # Map page name to slug
                # e.g., "Treatments & Prices" -> "treatments"
                # "Aesthetic Clinic" -> "clinic"
                slug_mapping = {
                    "Home": "home",
                    "Treatments & Prices": "treatments",
                    "Aesthetic Clinic": "clinic",
                    "Reviews": "reviews",
                    "Contact": "contact",
                    "Book an Appointment": "book",
                    "Booking Confirmed": "book-success",
                    "Shop": "shop",
                    "Privacy Policy": "privacy",
                    "Terms and Conditions": "terms"
                }
                
                if page_name in slug_mapping:
                    slug = slug_mapping[page_name]
                    seo_data[slug] = {"title": title, "desc": desc}

# Apply to WordPress
print(f"Found {len(seo_data)} SEO mappings.")
for slug, seo in seo_data.items():
    if slug not in slug_to_id:
        print(f"Skipping {slug}, not found on WP.")
        continue
        
    page_id = slug_to_id[slug]
    print(f"Updating SEO for {slug}...")
    
    data = {
        "meta": {
            "_yoast_wpseo_title": seo["title"],
            "_yoast_wpseo_metadesc": seo["desc"]
        }
    }
    
    update_resp = requests.post(
        f"{url_base}/{page_id}",
        auth=(username, password),
        json=data
    )
    
    if update_resp.status_code == 200:
        print("  -> Success")
    else:
        print(f"  -> Failed: {update_resp.text}")
