import re
import os

source_path = '_localhost_preview/clinic.html'
target_path = 'production_site/clinic.html'

with open(source_path, 'r') as f:
    source_html = f.read()

with open(target_path, 'r') as f:
    target_html = f.read()

# Pattern to find the clinic services section in the source (_localhost_preview)
# The preview has rb-clinic-services-marquee-section
source_pattern = re.compile(r'(<section class="rb-section rb-clinic-services-marquee-section" aria-labelledby="rb-clinic-pillars-title">.*?)(?=<section class="rb-section rb-clinic-menu")', re.DOTALL)
match = source_pattern.search(source_html)
if not match:
    print("Could not find the marquee section in the preview file!")
    exit(1)

marquee_html = match.group(1)

# Now, replace the wp-content URLs with the local ones we downloaded!
img_pattern = re.compile(r'(?:https?://radianceglamourlounge\.com)?/wp-content/uploads/[^"]+/([^"/]+)')
marquee_html = img_pattern.sub(lambda m: f'images/{m.group(1)}', marquee_html)

# Pattern to find the ugly grid section in the target (production_site)
# The production site has just class="rb-section"
target_pattern = re.compile(r'(<section class="rb-section" aria-labelledby="rb-clinic-pillars-title">.*?)(?=<section class="rb-section rb-clinic-menu")', re.DOTALL)

# Replace the ugly grid in the production file with the beautiful marquee
new_target_html = target_pattern.sub(marquee_html, target_html)

with open(target_path, 'w') as f:
    f.write(new_target_html)

print("Restored marquee and updated image paths successfully!")
