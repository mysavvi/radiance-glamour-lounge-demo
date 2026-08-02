import re
from pathlib import Path

html = Path("production_site/checkout.html").read_text()
style_blocks = []
for m in re.finditer(r"<style[^>]*>([\s\S]*?)</style>", html, flags=re.I):
    style_blocks.append(m.group(1))

print(f"Found {len(style_blocks)} style blocks")
print(style_blocks[0][:200] if style_blocks else "None")
