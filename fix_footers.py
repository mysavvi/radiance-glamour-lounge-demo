import glob, re

def get_footer(path):
    with open(path, 'r') as f:
        content = f.read()
    match = re.search(r'(<footer.*?</footer\s*>)', content, re.DOTALL)
    return match.group(1) if match else None

index_footer = get_footer('production_site/index.html')

for filepath in glob.glob('production_site/*.html'):
    if 'index.html' in filepath: continue
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = re.sub(r'<footer.*?</footer\s*>', index_footer, content, flags=re.DOTALL)
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated footer in {filepath}")

# For services, we have to adjust relative paths
services_footer = index_footer.replace('href="', 'href="../').replace('src="', 'src="../')
# Fix absolute or already relative links that broke
services_footer = services_footer.replace('href="../mailto:', 'href="mailto:')
services_footer = services_footer.replace('href="../http', 'href="http')
services_footer = services_footer.replace('href="../tel:', 'href="tel:')
services_footer = services_footer.replace('href="../#', 'href="#')
services_footer = services_footer.replace('href="../index.html"', 'href="../index.html"')
services_footer = services_footer.replace('href="../images/', 'href="../images/')
services_footer = services_footer.replace('href="../about.html"', 'href="../about.html"')

for filepath in glob.glob('production_site/services/*.html'):
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = re.sub(r'<footer.*?</footer\s*>', services_footer, content, flags=re.DOTALL)
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated footer in {filepath}")
