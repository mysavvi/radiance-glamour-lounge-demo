import os, requests

env = {}
with open('.env', 'r') as f:
    for line in f:
        if '=' in line and not line.strip().startswith('#'):
            k, v = line.strip().split('=', 1)
            env[k.strip()] = v.strip()

url = env.get("WP_API_URL", "https://radianceglamourlounge.com/wp-json/wp/v2/pages")
username = env.get("WP_USERNAME")
password = env.get("WP_APP_PASSWORD")

# Fetch all pages
resp = requests.get(f"{url}?per_page=100&status=any", auth=(username, password))
pages = resp.json()

for page in pages:
    if page.get("status") == "draft":
        page_id = page["id"]
        title = page["title"]["rendered"]
        print(f"Deleting draft page: {title} (ID {page_id})")
        
        # force=true bypasses the trash and deletes permanently
        del_resp = requests.delete(f"{url}/{page_id}?force=true", auth=(username, password))
        if del_resp.status_code == 200:
            print("  -> Deleted")
        else:
            print(f"  -> Error {del_resp.status_code}: {del_resp.text}")

print("Done.")
