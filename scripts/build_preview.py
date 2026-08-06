import os
import shutil
import glob

preview_dir = "_localhost_preview"
if os.path.exists(preview_dir):
    shutil.rmtree(preview_dir)
os.makedirs(preview_dir)

# Copy style.css
shutil.copy("radiance-theme/style.css", os.path.join(preview_dir, "style.css"))
if os.path.exists("site.css"):
    shutil.copy("site.css", os.path.join(preview_dir, "site.css"))

# Copy images folder if it exists
if os.path.exists("images"):
    shutil.copytree("images", os.path.join(preview_dir, "images"))
if os.path.exists("logo"):
    shutil.copytree("logo", os.path.join(preview_dir, "logo"))
if os.path.exists("neo"):
    shutil.copytree("neo", os.path.join(preview_dir, "neo"))
if os.path.exists("services"):
    shutil.copytree("services", os.path.join(preview_dir, "services"))

# Process HTML
import re
for file in glob.glob("pages/*.html"):
    filename = os.path.basename(file)
    with open(file, 'r') as f:
        content = f.read()
    
    # Wrap with html, head, body
    html = f"""<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="style.css?v=1785813820">
    <style>
      html, body {{
        margin: 0;
        padding: 0;
        width: 100%;
        min-height: 100vh;
        overflow-x: hidden;
      }}
    </style>
</head>
<body class="home page-template-default page page-id-10 elementor-default elementor-kit-5">
{content}
</body>
</html>
"""
    # Quick fix for local links (for preview only, they were /book/ so we need them to be clickable locally)
    # Actually, user just wants to open it in localhost to check visuals, but let's map / to index.html and /slug/ to slug.html for local testing
    html = html.replace('href="/"', 'href="index.html"')
    html = re.sub(r'href="/([^"]+)/"', r'href="\1.html"', html)
    html = re.sub(r'href="/([^"]+)/#([^"]*)"', r'href="\1.html#\2"', html)
    
    # Fix absolute image paths to be relative for local testing
    html = html.replace('src="/images/', 'src="images/')
    html = html.replace("src='/images/", "src='images/")
    html = html.replace('url(/images/', 'url(images/')
    html = html.replace("url('/images/", "url('images/")
    
    # Fix wp-content images to point to live site for preview
    html = html.replace('src="/wp-content/', 'src="https://radianceglamourlounge.com/wp-content/')

    with open(os.path.join(preview_dir, filename), 'w') as f:
        f.write(html)

print("Localhost preview built!")
