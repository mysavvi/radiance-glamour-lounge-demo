import re

with open("home.html", "r") as f:
    content = f.read()

# Replace the breakout CSS block
old_css = """/* Break out of theme / Elementor content width */
.elementor-section .wp-html-module,
.elementor-widget-html .wp-html-module,
.entry-content .wp-html-module,
.wp-block-html .wp-html-module {
  width: 100vw;
  max-width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}"""

new_css = """/* Break out of theme / Elementor content width - FIXED FOR ELEMENTOR EDITOR */
.elementor-section .wp-html-module,
.elementor-widget-html .wp-html-module,
.entry-content .wp-html-module,
.wp-block-html .wp-html-module {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
}

/* Kill All Theme/Elementor Container Restrictions (Savvi Web standard) */
body #page, body #content, body .site-content, body main, 
body .elementor, body .elementor-section, body .elementor-container,
body .e-con, body [class*="ct-container"], body [class*="container"] {
    --content-width: 100% !important;
    max-width: none !important;
    width: 100% !important;
    margin: 0 auto !important;
    padding: 0 !important;
    box-sizing: border-box !important;
}"""

if old_css in content:
    content = content.replace(old_css, new_css)
    print("Replaced breakout CSS successfully.")
else:
    print("Could not find the exact old CSS block. Falling back to regex.")
    content = re.sub(r'/\*\s*Break out of theme / Elementor content width\s*\*/.*?\}', new_css, content, flags=re.DOTALL)

with open("wordpress-ready.html", "w") as f:
    f.write(content)

print("Saved to wordpress-ready.html")
