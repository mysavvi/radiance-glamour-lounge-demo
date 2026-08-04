import os
import shutil
import glob

theme_name = "radiance-theme"
pages_dir = "pages"

if os.path.exists(theme_name):
    shutil.rmtree(theme_name)
os.makedirs(theme_name)

# 1. Create style.css and inject the Neo Design CSS from preview/home.html
style_css = """/*
Theme Name: Radiance Glamour Lounge
Theme URI: https://radianceglamourlounge.com/
Author: Antigravity Custom Build
Author URI: https://radianceglamourlounge.com/
Description: Custom theme for Radiance Glamour Lounge built from static HTML pages.
Version: 1.0.2
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
    print("Warning: Could not read CSS from preview/home.html", e)

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

# 4. Create functions.php
functions_php = """<?php
// Add theme support for title tag
add_theme_support( 'title-tag' );

// Enqueue theme stylesheet
function radiance_theme_enqueue_styles() {
    wp_enqueue_style( 'radiance-style', get_stylesheet_uri(), array(), '1.0.2' );
}
add_action( 'wp_enqueue_scripts', 'radiance_theme_enqueue_styles' );

// Force WordPress to use our custom templates regardless of page meta settings
add_filter('template_include', 'radiance_force_theme_templates', 99);
function radiance_force_theme_templates($template) {
    if (is_front_page() || is_home()) {
        $custom_front = locate_template("front-page.php");
        if ($custom_front) {
            return $custom_front;
        }
    }
    if (is_page()) {
        global $post;
        if ($post) {
            $slug = $post->post_name;
            $custom_template = locate_template("page-{$slug}.php");
            if ($custom_template) {
                return $custom_template;
            }
        }
    }
    return $template;
}
"""
with open(os.path.join(theme_name, "functions.php"), "w") as f:
    f.write(functions_php)

# 5. Process all HTML pages and create WP templates
html_files = glob.glob(os.path.join(pages_dir, "*.html"))

for file_path in html_files:
    filename = os.path.basename(file_path)
    if filename in ["live_site.html", "index.html"]:
        continue
    
    slug = filename.replace(".html", "")
    
    # Determine PHP filename
    if slug == "home":
        php_filename = "front-page.php"
    elif slug == "404":
        php_filename = "404.php"
    else:
        php_filename = f"page-{slug}.php"
        
    with open(file_path, "r") as f:
        html_content = f.read()
        
    php_content = f"<?php get_header(); ?>\n\n"
    php_content += html_content
    php_content += "\n\n<?php get_footer(); ?>\n"
    
    with open(os.path.join(theme_name, php_filename), "w") as f:
        f.write(php_content)

# 6. Create a generic index.php fallback
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

# 7. Create a generic page.php fallback
page_php = """<?php get_header(); ?>
<main id="primary" class="site-main">
    <?php
    while ( have_posts() ) :
        the_post();
        the_content();
    endwhile;
    ?>
</main>
<?php get_footer(); ?>
"""
with open(os.path.join(theme_name, "page.php"), "w") as f:
    f.write(page_php)

# 8. Zip the theme
shutil.make_archive(theme_name, 'zip', theme_name)
print(f"Theme successfully built and zipped to {theme_name}.zip")
