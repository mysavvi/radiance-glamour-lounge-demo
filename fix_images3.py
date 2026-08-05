import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # The Nabila profile image
    # from: style=\"width: 100%; border-radius: 12px; object-fit: cover\"
    # to: style=\"width: 100%; max-width: 320px; margin: 0 auto; display: block; border-radius: 12px; object-fit: cover; aspect-ratio: 4/5;\"
    new_content = re.sub(
        r'style=\\"width:\s*100%;\s*border-radius:\s*12px;\s*object-fit:\s*cover\\"', 
        r'style=\"width: 100%; max-width: 320px; margin: 0 auto; display: block; border-radius: 12px; object-fit: cover; aspect-ratio: 4/5;\"', 
        content
    )
    # Also handle standard HTML files
    new_content = re.sub(
        r'style="width:\s*100%;\s*border-radius:\s*12px;\s*object-fit:\s*cover"', 
        r'style="width: 100%; max-width: 320px; margin: 0 auto; display: block; border-radius: 12px; object-fit: cover; aspect-ratio: 4/5;"', 
        new_content
    )

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed expert profile in {filepath}")

for root, _, files in os.walk('.'):
    for file in files:
        if file.endswith('.json') and 'content_data' in root:
            process_file(os.path.join(root, file))
        elif file.endswith('.html'):
            process_file(os.path.join(root, file))

print("Done fixing images 3.")
