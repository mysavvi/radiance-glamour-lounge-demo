import os
import glob

pages_dir = 'pages'
html_files = glob.glob(os.path.join(pages_dir, "*.html"))
for file_path in html_files:
    with open(file_path, "r") as f:
        content = f.read()
    
    # Fix the palette and theme!
    content = content.replace('data-neo-palette="moon"', 'data-neo-palette="neo-classic"')
    content = content.replace('data-neo-theme="light"', 'data-neo-theme="dark"')
    
    with open(file_path, "w") as f:
        f.write(content)

print("Palette fixed.")
