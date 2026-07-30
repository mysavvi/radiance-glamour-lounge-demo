import os, requests, json, mimetypes

env = {}
with open('.env', 'r') as f:
    for line in f:
        if '=' in line and not line.strip().startswith('#'):
            k, v = line.strip().split('=', 1)
            env[k.strip()] = v.strip()

url_base = env.get("WP_API_URL", "https://radianceglamourlounge.com/wp-json/wp/v2/pages")
media_url = url_base.replace('/pages', '/media')
username = env.get("WP_USERNAME")
password = env.get("WP_APP_PASSWORD")

image_map = {}
image_dir = 'production_site/images'
for filename in os.listdir(image_dir):
    if filename.startswith('.'): continue
    filepath = os.path.join(image_dir, filename)
    if not os.path.isfile(filepath): continue
    mime_type, _ = mimetypes.guess_type(filepath)
    if not mime_type:
        mime_type = 'image/jpeg'
    
    with open(filepath, 'rb') as f:
        data = f.read()
    
    headers = {
        'Content-Disposition': f'attachment; filename="{filename}"',
        'Content-Type': mime_type
    }
    
    print(f"Uploading {filename}...")
    resp = requests.post(media_url, auth=(username, password), headers=headers, data=data)
    if resp.status_code == 201:
        source_url = resp.json()['source_url']
        image_map[filename] = source_url
        print(f"  -> {source_url}")
    else:
        print(f"  -> Error {resp.status_code}: {resp.text}")

with open('image_map.json', 'w') as f:
    json.dump(image_map, f, indent=2)
print("Saved image_map.json")
