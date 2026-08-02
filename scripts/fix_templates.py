import os
import requests

env = {}
with open('.env', 'r') as f:
    for line in f:
        if '=' in line and not line.strip().startswith('#'):
            k, v = line.strip().split('=', 1)
            env[k.strip()] = v.strip()

url_base = env.get("WP_API_URL", "https://radianceglamourlounge.com/wp-json/wp/v2/pages")
username = env.get("WP_USERNAME")
password = env.get("WP_APP_PASSWORD")

# Update cart, product, pos, wallet to use blank-canvas
for page_id in [633, 628, 627, 626, 587]:
    print(f"Updating template for page ID {page_id}...")
    resp = requests.post(f"{url_base}/{page_id}", auth=(username, password), json={"template": "blank-canvas"})
    if resp.status_code == 200:
        print(f"Successfully updated {page_id}")
    else:
        print(f"Failed to update {page_id}: {resp.status_code} {resp.text}")
