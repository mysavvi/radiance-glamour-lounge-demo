import re
import urllib.request
import os

html_path = 'production_site/clinic.html'
images_dir = 'production_site/images'

with open(html_path, 'r') as f:
    content = f.read()

# Find all wp-content images
pattern = r'src="(/wp-content/uploads/[^"]+/([^"/]+))"'
matches = re.findall(pattern, content)

downloaded = set()
for full_path, filename in matches:
    if filename not in downloaded:
        url = f"https://www.radianceglamourlounge.co.uk{full_path}"
        save_path = os.path.join(images_dir, filename)
        print(f"Downloading {url} -> {save_path}")
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response, open(save_path, 'wb') as out_file:
                out_file.write(response.read())
            downloaded.add(filename)
        except Exception as e:
            print(f"Failed to download {url}: {e}")
    
    # Replace in content
    new_src = f'images/{filename}'
    content = content.replace(f'src="{full_path}"', f'src="{new_src}"')

with open(html_path, 'w') as f:
    f.write(content)

print("Done replacing image paths in clinic.html")
