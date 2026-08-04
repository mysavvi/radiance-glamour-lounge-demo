import os
import requests

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

    pages_to_fix = [
        {"slug": "privacy", "title": "Privacy Policy"},
        {"slug": "terms", "title": "Terms and Conditions"},
        {"slug": "book-success", "title": "Booking Confirmed"},
        {"slug": "book", "title": "Book an Appointment"},
        {"slug": "shop", "title": "Shop"},
        {"slug": "reviews", "title": "Reviews"},
        {"slug": "contact", "title": "Contact Us"},
        {"slug": "clinic", "title": "Aesthetic Clinic"}
    ]

    # Fetch all current pages
    resp = requests.get(f"{url_base}?per_page=100", auth=(username, password))
    current_pages = resp.json()
    slug_to_page = {p['slug']: p for p in current_pages}

    for page_data in pages_to_fix:
        slug = page_data["slug"]
        title = page_data["title"]

        if slug not in slug_to_page:
            print(f"Skipping {slug}, not found.")
            continue
            
        old_page = slug_to_page[slug]
        old_id = old_page['id']

        print(f"--- Processing {slug} ---")
        
        # 1. Hide the old page
        print(f"Hiding old page (ID {old_id})...")
        r1 = requests.post(
            f"{url_base}/{old_id}",
            auth=(username, password),
            json={
                "slug": f"old-{slug}",
                "status": "draft"
            }
        )
        if r1.status_code == 200:
            print("Old page hidden.")
        else:
            print(f"Failed to hide old page: {r1.text}")
            continue

        # 2. Create the new page
        print(f"Creating new page for {slug}...")
        r2 = requests.post(
            url_base,
            auth=(username, password),
            json={
                "title": title,
                "slug": slug,
                "status": "publish",
                "template": "blank-canvas"
            }
        )
        if r2.status_code == 201:
            print(f"New page created (ID {r2.json()['id']}).")
        else:
            print(f"Failed to create new page: {r2.text}")
            
if __name__ == "__main__":
    main()
