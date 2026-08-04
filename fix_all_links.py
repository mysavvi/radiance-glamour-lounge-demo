import glob
import re

files = glob.glob("pages/*.html")
for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    # Fix index.html -> /
    content = content.replace('href="/index.html"', 'href="/"')
    content = content.replace('href="/index.html#', 'href="/#')
    
    # Fix standard .html links with anchors or queries
    # e.g. href="/treatments.html#face" -> href="/treatments/#face"
    content = re.sub(r'href="/([^"]+)\.html#([^"]*)"', r'href="/\1/#\2"', content)
    
    # Fix standard .html links with queries
    # e.g. href="/login.html?redirect=checkout.html" -> href="/login/?redirect=checkout"
    content = re.sub(r'href="/([^"]+)\.html\?([^"]*)"', r'href="/\1/?\2"', content)
    
    # Fix remaining standard .html links
    # e.g. href="/treatments.html" -> href="/treatments/"
    content = re.sub(r'href="/([^"]+)\.html"', r'href="/\1/"', content)
    
    # Fix redirect=checkout.html to redirect=checkout inside queries
    content = content.replace('redirect=checkout.html', 'redirect=checkout')
    
    with open(f, 'w') as file:
        file.write(content)

print("All links fixed!")
