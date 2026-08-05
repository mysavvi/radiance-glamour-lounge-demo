import os
import re
import glob

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove inline style from hero images
    # The style string might vary slightly, so let's just use regex to remove style="..." from img tags inside figure class="rb-clinic-hero__visual"
    # Actually, the style is fixed, let's just replace it or strip style attribute from all images that have aspect-ratio:3/4
    
    # Replace specific inline style for hero images
    content = re.sub(r'style="width:100%;\s*height:auto;\s*object-fit:cover;\s*border-radius:var\(--neo-radius-lg\);\s*box-shadow:var\(--neo-shadow-raised\);\s*aspect-ratio:3/4"', '', content)
    
    # Also for the expert profile image
    # from: style="width: 100%; border-radius: 12px; object-fit: cover"
    # to: style="width: 100%; max-width: 300px; margin: 0 auto; display: block; border-radius: 12px; object-fit: cover; aspect-ratio: 1/1;"
    content = re.sub(
        r'style="width:\s*100%;\s*border-radius:\s*12px;\s*object-fit:\s*cover"', 
        'style="width: 100%; max-width: 320px; margin: 0 auto; display: block; border-radius: 12px; object-fit: cover; aspect-ratio: 4/5;"', 
        content
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Processed {filepath}")

for root, _, files in os.walk('.'):
    for file in files:
        if file.endswith('.json') and 'content_data' in root:
            process_file(os.path.join(root, file))
        elif file.endswith('.html'):
            process_file(os.path.join(root, file))

print("Done fixing images.")
