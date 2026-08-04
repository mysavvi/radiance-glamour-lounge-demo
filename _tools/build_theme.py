import os
import shutil
import glob

theme_name = "radiance-theme"
pages_dir = "pages"

if os.path.exists(theme_name):
    shutil.rmtree(theme_name)
os.makedirs(theme_name)

# 1. Create style.css
style_css = """/*
Theme Name: Radiance Glamour Lounge
Theme URI: https://radianceglamourlounge.com/
Author: Antigravity Custom Build
Author URI: https://radianceglamourlounge.com/
Description: Custom theme for Radiance Glamour Lounge providing standalone templates.
Version: 1.0.3
Text Domain: radiance-theme
*/

"""
try:
    with open('preview/home.html', 'r') as f:
        content = f.read()
        start = content.find('<style>')
        end = content.find('</style>')
        if start != -1 and end != -1:
            neo_css = content[start+7:end]
            style_css += neo_css
except Exception as e:
    pass

with open(os.path.join(theme_name, "style.css"), "w") as f:
    f.write(style_css)

# 2. Create header.php
header_php = """<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
"""
with open(os.path.join(theme_name, "header.php"), "w") as f:
    f.write(header_php)

# 3. Create footer.php
footer_php = """
    <?php wp_footer(); ?>
</body>
</html>
"""
with open(os.path.join(theme_name, "footer.php"), "w") as f:
    f.write(footer_php)

# 4. Create functions.php (NO TEMPLATE HIJACKING)
functions_php = """<?php
add_theme_support( 'title-tag' );
function radiance_theme_enqueue_styles() {
    wp_enqueue_style( 'radiance-style', get_stylesheet_uri(), array(), '1.0.3' );
}
add_action( 'wp_enqueue_scripts', 'radiance_theme_enqueue_styles' );
"""
with open(os.path.join(theme_name, "functions.php"), "w") as f:
    f.write(functions_php)

# 5. Process all HTML pages and create explicitly named WP templates
html_files = glob.glob(os.path.join(pages_dir, "*.html"))

for file_path in html_files:
    filename = os.path.basename(file_path)
    if filename in ["live_site.html", "index.html"]:
        continue
    
    slug = filename.replace(".html", "")
    template_name = slug.replace("-", " ").title()
    
    php_filename = f"template-{slug}.php"
        
    with open(file_path, "r") as f:
        html_content = f.read()
        
    php_content = f"<?php\n/*\nTemplate Name: Radiance - {template_name}\n*/\nget_header();\n?>\n\n"
    php_content += html_content
    php_content += "\n\n<?php get_footer(); ?>\n"
    
    with open(os.path.join(theme_name, php_filename), "w") as f:
        f.write(php_content)

# 6. Create a safe fallback index.php so it doesn't break the site
index_php = """<?php get_header(); ?>
<main id="primary" class="site-main">
    <?php
    if ( have_posts() ) :
        while ( have_posts() ) :
            the_post();
            the_content();
        endwhile;
    endif;
    ?>
</main>
<?php get_footer(); ?>
"""
with open(os.path.join(theme_name, "index.php"), "w") as f:
    f.write(index_php)

# 8. Zip the theme
shutil.make_archive(theme_name, 'zip', theme_name)
print(f"Theme successfully built and zipped to {theme_name}.zip")
