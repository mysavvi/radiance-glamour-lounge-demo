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

resp = requests.get(f"{url_base}?per_page=100", auth=(username, password))
pages = resp.json()

for p in pages:
    print(f"ID: {p['id']}, Slug: {p['slug']}, Template: {p.get('template', 'N/A')}")
