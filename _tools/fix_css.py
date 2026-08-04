import os, glob

pages_dir = '/Users/user/Desktop/Radiance Glamour Lounge/pages'
for fpath in glob.glob(os.path.join(pages_dir, '*.html')):
    with open(fpath, 'r', encoding='utf-8') as f: content = f.read()
    
    # 1. Hide desktop nav on all screens below 1024px
    # Right now it has:
    # @media (min-width: 768px) and (max-width: 1023.98px) {
    #   .neo-desktop-nav {
    #     display: none !important;
    #   }
    # }
    # We should just make the base rule: .neo-desktop-nav { display: none; }
    
    # Let's just insert .neo-desktop-nav { display: none; } at the top of the styles!
    if '.neo-desktop-nav { display: none; }' not in content:
        content = content.replace('/* WordPress Runtime Parity */', '/* WordPress Runtime Parity */\n.neo-desktop-nav { display: none; }\n@media(min-width:1024px){.neo-desktop-nav{display:block;}}')
    
    with open(fpath, 'w', encoding='utf-8') as f: f.write(content)

print("Fixed CSS for mobile nav")
