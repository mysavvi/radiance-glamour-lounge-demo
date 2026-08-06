import re

source_path = '_localhost_preview/index.html'
target_path = 'production_site/testimonials.html'

with open(source_path, 'r') as f:
    source_html = f.read()

with open(target_path, 'r') as f:
    target_html = f.read()

# Pattern to find the social presence section in the source (_localhost_preview/index.html)
source_pattern = re.compile(r'(<section aria-labelledby="rb-social-presence-heading" class="rb-section neo-social-card-section rb-social-presence".*?</section>)', re.DOTALL)
match = source_pattern.search(source_html)
if not match:
    print("Could not find the social presence section in the preview file!")
    exit(1)

social_html = match.group(1)

# Now, we want to replace the boring platform links in testimonials.html with this beautiful section.
# The boring platform links section starts with <!-- Platform Links --> and ends right before <div class="rb-rating-header"
target_pattern = re.compile(r'<!-- Platform Links -->\s*<div class="neo-section"[^>]*>.*?</div>\s*</div>\s*(?=<div class="rb-rating-header")', re.DOTALL)

# Replace the boring section with the beautiful social section
new_target_html = target_pattern.sub(f"<!-- Platform Links (Restored Beautiful Social Cards) -->\n        {social_html}\n\n        ", target_html)

with open(target_path, 'w') as f:
    f.write(new_target_html)

print("Restored beautiful social card section to testimonials.html!")
