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
        "status": "publish",
        "template": "blank-canvas"
    },
    {
        "title": "Login",
        "slug": "login",
        "content": "<!-- wp:html -->\nLoading login...\n<!-- /wp:html -->",
        "status": "publish",
        "template": "blank-canvas"
    },
    {
        "title": "Register",
        "slug": "register",
        "content": "<!-- wp:html -->\nLoading register...\n<!-- /wp:html -->",
        "status": "publish",
        "template": "blank-canvas"
    },
    {
        "title": "Wallet",
        "slug": "wallet",
        "content": "<!-- wp:shortcode -->\n[savvi_wallet]\n<!-- /wp:shortcode -->",
        "status": "publish",
        "template": "blank-canvas"
    },
    {
        "title": "Cart",
        "slug": "cart",
        "content": "<!-- wp:html -->\n<!-- /wp:html -->",
        "status": "publish",
        "template": "blank-canvas"
    },
    {
        "title": "Checkout",
        "slug": "checkout",
        "content": "<!-- wp:html -->\n<!-- /wp:html -->",
        "status": "publish",
        "template": "blank-canvas"
    },
    {
        "title": "Product",
        "slug": "product",
        "content": "<!-- wp:html -->\n<!-- /wp:html -->",
        "status": "publish",
        "template": "blank-canvas"
    }
]

print("Fetching existing pages...")
resp = requests.get(f"{url_base}?per_page=100", auth=(username, password))
if resp.status_code == 200:
    existing_slugs = [p['slug'] for p in resp.json()]
else:
    print("Failed to fetch existing pages:", resp.text)
    existing_slugs = []

for p in pages_to_create:
    if p['slug'] in existing_slugs:
        print(f"Page /{p['slug']}/ already exists, skipping creation.")
        continue

    print(f"Creating page: {p['title']}...")
    resp = requests.post(url_base, auth=(username, password), json=p)
    if resp.status_code == 201:
        print(f"Success! Created /{p['slug']}/")
    else:
        print(f"Failed. {resp.status_code}: {resp.text}")
