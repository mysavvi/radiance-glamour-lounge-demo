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
    username = env.get("WP_USERNAME")
    password = env.get("WP_APP_PASSWORD")

    if not username or not password:
        print("Error: Missing credentials")
        return

    # 1. Update the old treatments page (ID 52)
    print("Updating old treatments page (ID 52)...")
    resp = requests.post(
        f"{url_base}/52",
        auth=(username, password),
        json={
            "slug": "old-treatments",
            "status": "draft"
        }
    )
    if resp.status_code == 200:
        print("Old treatments page updated successfully.")
    else:
        print(f"Failed to update old treatments page: {resp.text}")
        return

    # 2. Create the new treatments page
    print("Creating new treatments page...")
    resp = requests.post(
        url_base,
        auth=(username, password),
        json={
            "title": "Treatments",
            "slug": "treatments",
            "status": "publish",
            "template": "blank-canvas"
        }
    )
    if resp.status_code == 201:
        new_page = resp.json()
        new_page_id = new_page['id']
        print(f"New treatments page created with ID: {new_page_id}")
    else:
        print(f"Failed to create new treatments page: {resp.text}")
        return

if __name__ == "__main__":
    main()
