import os
import requests
import json

def main():
    env = {}
    env_path = '.env'
    if os.path.exists(env_path):
        with open(env_path, 'r') as f:
            for line in f:
                if '=' in line and not line.strip().startswith('#'):
                    k, v = line.strip().split('=', 1)
                    env[k.strip()] = v.strip()
    
    url_base = env.get("WP_API_URL", "https://radianceglamourlounge.com/wp-json/wp/v2/pages")
    site_url = url_base.replace("/wp/v2/pages", "")
    username = env.get("WP_USERNAME")
    password = env.get("WP_APP_PASSWORD")

    if not username or not password:
        print("Error: Missing credentials")
        return

    # 1. Update the old home page (ID 17)
    print("Updating old home page (ID 17)...")
    resp = requests.post(
        f"{url_base}/17",
        auth=(username, password),
        json={
            "slug": "old-home",
            "status": "draft"
        }
    )
    if resp.status_code == 200:
        print("Old home page updated successfully.")
    else:
        print(f"Failed to update old home page: {resp.text}")
        return

    # 2. Create the new home page
    print("Creating new home page...")
    resp = requests.post(
        url_base,
        auth=(username, password),
        json={
            "title": "Home",
            "slug": "home",
            "status": "publish",
            "template": "blank-canvas"
        }
    )
    if resp.status_code == 201:
        new_page = resp.json()
        new_page_id = new_page['id']
        print(f"New home page created with ID: {new_page_id}")
    else:
        print(f"Failed to create new home page: {resp.text}")
        return

    # 3. Set the new page as the front page
    print("Setting new page as the front page...")
    resp = requests.post(
        f"{site_url}/wp/v2/settings",
        auth=(username, password),
        json={
            "show_on_front": "page",
            "page_on_front": new_page_id
        }
    )
    if resp.status_code == 200:
        print("Front page set successfully.")
    else:
        print(f"Failed to set front page: {resp.text}")
        # Note: sometimes updating settings requires a different endpoint or permissions, but we'll try this first.

if __name__ == "__main__":
    main()
