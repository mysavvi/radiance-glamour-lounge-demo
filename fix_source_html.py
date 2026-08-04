import re

def fix_html_file(filepath):
    with open('production_site/index.html', 'r') as f:
        index_html = f.read()

    # Extract required blocks from index.html
    # 1. Scripts in head
    head_scripts_match = re.search(r'(<script>document\.documentElement\.classList\.add[^<]+</script>\s*<script src="neo/theme-init\.js"></script>\s*<script src="neo/a11y-init\.js"></script>\s*<script src="neo/scroll-reveal\.js"></script>)', index_html)
    head_scripts = head_scripts_match.group(1) if head_scripts_match else ""

    # 2. Body start up to main
    body_start_match = re.search(r'(<body class="neo-body">\s*<a href="#neo-main" class="neo-skip-link">Skip to main content</a>\s*<div id="neo-a11y-root"></div>\s*<div class="neo-page">[\s\S]*?)<main id="neo-main"', index_html)
    body_start = body_start_match.group(1) if body_start_match else ""

    # 3. Footer and end of body
    footer_match = re.search(r'(<footer class="neo-footer neo-footer--with-bottom-nav">[\s\S]*?</body>)', index_html)
    footer = footer_match.group(1) if footer_match else ""

    with open(filepath, 'r') as f:
        content = f.read()

    # If it already has neo-main, skip?
    if 'id="neo-main"' in content:
        print(f"Skipping {filepath}, already has neo-main")
        return

    # Fix head
    if 'theme-init.js' not in content:
        content = content.replace('</head>', f'  {head_scripts}\n</head>')

    # Extract inner content
    # For checkout.html: <div class="checkout-layout">
    # For login.html: <div class="login-box">
    # For register.html: <div class="login-box">
    if 'checkout.html' in filepath:
        inner_match = re.search(r'<body>\s*(<div class="checkout-layout">[\s\S]*?</div>\s*<div class="checkout-right">[\s\S]*?</div>\s*</div>)', content)
        if not inner_match:
            inner_match = re.search(r'<body>\s*(<div class="checkout-layout">[\s\S]*?</div>\s*</div>)', content)
            if not inner_match:
                 # fallback for checkout
                 inner_match = re.search(r'(<div class="checkout-layout">[\s\S]*?</div>\s*</div>\s*</div>)', content)
    else:
        inner_match = re.search(r'<body>\s*(<div class="login-box">[\s\S]*?</div>)', content)
        if not inner_match:
             inner_match = re.search(r'(<div class="login-box">[\s\S]*?</div>)', content)
    
    if not inner_match:
        print(f"Could not find inner content for {filepath}")
        return
        
    inner_html = inner_match.group(1)

    # Reconstruct body
    new_body = f"""{body_start}<main id="neo-main" class="neo-page__main" tabindex="-1">
      <div style="display:flex; justify-content:center; padding: 4rem 2rem;">
        {inner_html}
      </div>
    </main>
{footer}"""

    start = content.find('<body>')
    end = content.rfind('</body>') + len('</body>')
    content = content[:start] + "<body>\n" + new_body + "\n</body>" + content[end:]

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Fixed {filepath}")

for f in ['production_site/checkout.html', 'production_site/login.html', 'production_site/register.html']:
    fix_html_file(f)
