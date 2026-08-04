import glob
import re

for filepath in glob.glob("pages/*.html"):
    with open(filepath, "r") as f:
        content = f.read()

    # Remove the stray tags and the "External resources" text
    content = re.sub(r'^\s*wp:html\s*$', '', content, flags=re.MULTILINE)
    content = re.sub(r'^\s*External resources — verbatim from source, do not remove\s*$', '', content, flags=re.MULTILINE)
    content = re.sub(r'^\s*/wp:html\s*$', '', content, flags=re.MULTILINE)

    with open(filepath, "w") as f:
        f.write(content)

print("Cleaned up wp:html stray texts!")
