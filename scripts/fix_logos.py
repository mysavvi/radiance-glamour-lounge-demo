import os
import glob

search_str = 'style="height: 48px; width: auto; transform: scale(2); transform-origin: left center;"'
replace_str = 'style="height: 72px; width: auto; max-width: 100%; object-fit: contain;"'

files = glob.glob('pages/*.html') + glob.glob('production_site/*.html')

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    if search_str in content:
        content = content.replace(search_str, replace_str)
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed {filepath}")

