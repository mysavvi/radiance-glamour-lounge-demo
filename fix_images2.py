import os
import re
import glob

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Just remove the whole style attribute from these hero images
    # We'll match anything that looks like style="..." and contains aspect-ratio:3/4
    new_content = re.sub(r'style="[^"]*aspect-ratio:3/4[^"]*"', '', content)
    # also handle escaped quotes in json \"
    new_content = re.sub(r'style=\\"[^"\\]*aspect-ratio:3/4[^"\\]*\\"', '', new_content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {filepath}")

for root, _, files in os.walk('.'):
    for file in files:
        if file.endswith('.json') and 'content_data' in root:
            process_file(os.path.join(root, file))
        elif file.endswith('.html'):
            process_file(os.path.join(root, file))

print("Done fixing images 2.")
