import re

source_path = '_localhost_preview/index.html'
target_path = 'production_site/index.html'

with open(source_path, 'r') as f:
    source_html = f.read()

with open(target_path, 'r') as f:
    target_html = f.read()

# Pattern to find the FULL social presence section in the source (_localhost_preview/index.html)
source_pattern = re.compile(r'(<section aria-labelledby="rb-social-presence-heading" class="rb-section neo-social-card-section rb-social-presence".*?</section>)', re.DOTALL)
match = source_pattern.search(source_html)
if not match:
    print("Could not find the full social presence section in the preview file!")
    exit(1)

social_html = match.group(1)

# The broken section in production_site/index.html starts with:
# <section class="rb-section neo-social-card-section rb-social-presence"
# (Wait, in production_site/index.html, it's missing aria-labelledby="rb-social-presence-heading", it has aria-labelledby="neo-social-card-title")
# Let's use a simpler regex for the target
target_pattern = re.compile(r'<section[^>]*class="rb-section neo-social-card-section rb-social-presence".*?</section>', re.DOTALL)

# Replace the broken section with the beautiful social section
new_target_html = target_pattern.sub(social_html, target_html)

with open(target_path, 'w') as f:
    f.write(new_target_html)

print("Restored beautiful social card section to homepage!")
