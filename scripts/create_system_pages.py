import os
import requests

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

pages_to_create = [
    {
        "title": "POS Terminal",
        "slug": "pos",
        "content": "<!-- wp:shortcode -->\n[savvi_pos]\n<!-- /wp:shortcode -->",
        "status": "publish"
    },
    {
        "title": "Wallet",
        "slug": "wallet",
        "content": "<!-- wp:shortcode -->\n[savvi_wallet]\n<!-- /wp:shortcode -->",
        "status": "publish"
    }
]

for p in pages_to_create:
    print(f"Creating page: {p['title']}...")
    resp = requests.post(url_base, auth=(username, password), json=p)
    if resp.status_code == 201:
        print(f"Success! Created /{p['slug']}/")
    else:
        # Check if it already exists
        if "already exists" in resp.text:
            print(f"Page /{p['slug']}/ already exists.")
        else:
            print(f"Failed. {resp.status_code}: {resp.text}")
