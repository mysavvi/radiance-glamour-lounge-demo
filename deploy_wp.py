import os
import requests
import json

url_base = "https://radianceglamourlounge.com/wp-json/wp/v2/pages"
username = "nabeeltamoor"
password = "AC3(J*SeUZfcC^dlmNJbQ2Qc"

# Get all pages to map slugs to IDs
resp = requests.get(f"{url_base}?per_page=100", auth=(username, password))
if resp.status_code != 200:
    print("Failed to get pages:", resp.text)
    exit(1)

pages = resp.json()
slug_to_id = {p['slug']: p['id'] for p in pages}

print("Found slugs:", slug_to_id.keys())

# Upload each file
pages_dir = "/Users/user/Desktop/Radiance Glamour Lounge/pages"
for filename in os.listdir(pages_dir):
    if not filename.endswith('.html'): continue
    
    slug = filename[:-5]
    if slug not in slug_to_id:
        print(f"Skipping {filename}: no matching page slug '{slug}' found.")
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
        
    # Update page
    print(f"Updating {slug} (ID {page_id})...")
    update_resp = requests.post(
        f"{url_base}/{page_id}",
        auth=(username, password),
        json={
            "content": wrapped_content
        }
    )
    
    if update_resp.status_code == 200:
        print(f"  -> Success!")
    else:
        print(f"  -> Error {update_resp.status_code}: {update_resp.text}")

print("Deployment complete.")
