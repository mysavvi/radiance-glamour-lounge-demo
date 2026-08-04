import glob
import os

files = glob.glob("pages/*.html")
for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    # 1. Remove :root from neo-classic dark
    content = content.replace(
        ':root,\n[data-neo-palette="neo-classic"][data-neo-theme="dark"],\n[data-neo-palette="neo-classic"]:not([data-neo-theme]) {',
        '[data-neo-palette="neo-classic"][data-neo-theme="dark"],\n[data-neo-palette="neo-classic"]:not([data-neo-theme]) {'
    )
    
    # 2. Remove :root from neo-classic light
    content = content.replace(
        ':root[data-neo-theme="light"],\n[data-neo-palette="neo-classic"][data-neo-theme="light"] {',
        '[data-neo-palette="neo-classic"][data-neo-theme="light"] {'
    )
    
    # 3. Add :root to moon dark
    content = content.replace(
        '[data-neo-palette="moon"][data-neo-theme="dark"],\n[data-neo-palette="moon"]:not([data-neo-theme]) {',
        ':root,\n[data-neo-palette="moon"][data-neo-theme="dark"],\n[data-neo-palette="moon"]:not([data-neo-theme]) {'
    )
    
    # 4. Add :root to moon light
    content = content.replace(
        '[data-neo-palette="moon"][data-neo-theme="light"] {',
        ':root[data-neo-theme="light"],\n[data-neo-palette="moon"][data-neo-theme="light"] {'
    )

    with open(f, 'w') as file:
        file.write(content)

print(f"Fixed CSS in {len(files)} files.")
