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

# IDs of duplicates to delete
duplicates = [636, 635, 634, 632]

for page_id in duplicates:
    print(f"Deleting page ID {page_id}...")
    resp = requests.delete(f"{url_base}/{page_id}?force=true", auth=(username, password))
    if resp.status_code == 200:
        print(f"Successfully deleted {page_id}")
    else:
        print(f"Failed to delete {page_id}: {resp.status_code} {resp.text}")
