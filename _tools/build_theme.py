import os
import shutil
import glob
import re

theme_name = "radiance-theme"
prod_dir = "production_site"

if os.path.exists(theme_name):
    shutil.rmtree(theme_name)
os.makedirs(theme_name)
os.makedirs(os.path.join(theme_name, "assets", "js"))
os.makedirs(os.path.join(theme_name, "assets", "css"))

# --- 1. Copy Assets ---
# Copy NEO JS files
neo_js_files = glob.glob(os.path.join(prod_dir, "neo", "*.js"))
for js in neo_js_files:
    shutil.copy(js, os.path.join(theme_name, "assets", "js"))

# Copy images
shutil.copytree(os.path.join(prod_dir, "images"), os.path.join(theme_name, "assets", "images"), dirs_exist_ok=True)

# Copy other root JS files
for js in glob.glob(os.path.join(prod_dir, "*.js")):
    shutil.copy(js, os.path.join(theme_name, "assets", "js"))

# --- 2. Create style.css ---
style_css = """/*
Theme Name: Radiance Glamour Lounge
Theme URI: https://radianceglamourlounge.com/
Author: Antigravity Custom Build
Author URI: https://radianceglamourlounge.com/
Description: Custom theme for Radiance Glamour Lounge providing standalone templates.
Version: 1.0.11
Text Domain: radiance-theme
*/

/* WordPress Reset */
body, #content, .site-content, .site-main, .elementor-widget-wrap,
.elementor-widget-html, .elementor-widget-html > .elementor-widget-container,
.elementor-section > .elementor-container, .e-con, .e-con-inner {
  max-width: 100% !important;
  width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}
.wp-html-module {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box !important;
  overflow-x: clip !important;
}

"""
# Read neo-design.css and site.css (simplified, we don't resolve imports here, we just use the raw files if they exist, or use bundle logic)
try:
    neo_css_path = os.path.join(prod_dir, "neo", "neo-design.css")
    if os.path.exists(neo_css_path):
        with open(neo_css_path, "r") as f:
            neo_css = f.read()
            
        # Resolve imports in neo_css
        import_pattern = re.compile(r'@import url\([\'"]?(.*?)[\'"]?\);|@import [\'"](.*?)[\'"];')
        def resolve_import(match):
            import_file = match.group(1) or match.group(2)
            # Strip query parameters for local file lookup
            import_file = import_file.split('?')[0]
            import_path = os.path.join(prod_dir, "neo", import_file)
            if os.path.exists(import_path):
                with open(import_path, "r") as inf:
                    return inf.read()
            return match.group(0)
            
        neo_css = import_pattern.sub(resolve_import, neo_css)
        style_css += neo_css + "\n\n"
        
    site_css_path = os.path.join(prod_dir, "site.css")
    if os.path.exists(site_css_path):
        with open(site_css_path, "r") as f:
            style_css += f.read()
except Exception as e:
    print(f"Error compiling CSS: {e}")

with open(os.path.join(theme_name, "style.css"), "w") as f:
    f.write(style_css)

# --- 3. Create functions.php ---
functions_php = """<?php
add_theme_support( 'title-tag' );

function radiance_theme_setup() {
    add_theme_support('custom-logo', array(
        'height'      => 72,
        'width'       => 200,
        'flex-width'  => true,
        'flex-height' => true,
    ));
}
add_action('after_setup_theme', 'radiance_theme_setup');

function radiance_theme_enqueue_styles() {
    // Fonts
    wp_enqueue_style('inter-font', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap', array(), null);
    
    // Theme CSS
    wp_enqueue_style( 'radiance-style', get_stylesheet_uri(), array(), '1.0.3' );
}
add_action( 'wp_enqueue_scripts', 'radiance_theme_enqueue_styles' );

function radiance_theme_enqueue_scripts() {
    $theme_dir = get_template_directory_uri();
    
    // Early scripts in <head>
    wp_enqueue_script('theme-init', $theme_dir . '/assets/js/theme-init.js', array(), '1.0', false);
    wp_enqueue_script('a11y-init', $theme_dir . '/assets/js/a11y-init.js', array(), '1.0', false);
    wp_enqueue_script('scroll-reveal', $theme_dir . '/assets/js/scroll-reveal.js', array(), '1.0', false);
    
    // Late scripts in footer
    wp_enqueue_script('mobile-nav', $theme_dir . '/assets/js/mobile-nav.js', array(), '1.0', true);
    wp_enqueue_script('theme-toggle', $theme_dir . '/assets/js/theme-toggle.js', array(), '1.0', true);
    wp_enqueue_script('a11y-toolbar', $theme_dir . '/assets/js/a11y-toolbar.js', array(), '1.0', true);
    wp_enqueue_script('cookie-consent', $theme_dir . '/assets/js/cookie-consent.js', array(), '1.0', true);
    
    if (file_exists(get_template_directory() . '/assets/js/hero-scroll.js')) {
        wp_enqueue_script('hero-scroll', $theme_dir . '/assets/js/hero-scroll.js', array(), '1.0', true);
    }
    if (file_exists(get_template_directory() . '/assets/js/folder-gallery.js')) {
        wp_enqueue_script('folder-gallery', $theme_dir . '/assets/js/folder-gallery.js', array(), '1.0', true);
    }
    if (file_exists(get_template_directory() . '/assets/js/cart-ui.js')) {
        wp_enqueue_script('cart-ui', $theme_dir . '/assets/js/cart-ui.js', array(), '1.0', true);
    }
}
add_action( 'wp_enqueue_scripts', 'radiance_theme_enqueue_scripts' );

// Add classes to HTML tag
function radiance_html_attributes($output) {
    return $output . ' class="js rb-hero-nav-over" data-neo-palette="moon" data-neo-theme="light"';
}
add_filter('language_attributes', 'radiance_html_attributes');

// Add classes to body tag
function radiance_body_classes($classes) {
    $classes[] = 'neo-body';
    return $classes;
}
add_filter('body_class', 'radiance_body_classes');

// Disable wpautop so it doesn't break old raw HTML if the template isn't assigned
remove_filter( 'the_content', 'wpautop' );

// Add classes to custom logo
function radiance_custom_logo_classes( $html ) {
    $html = str_replace( 'class="custom-logo-link"', 'class="custom-logo-link neo-mobile-header__brand neo-footer__logo"', $html );
    $html = str_replace( 'class="custom-logo"', 'class="custom-logo neo-header__logo-img neo-footer__logo-img" style="height: 72px; width: auto; max-width: 100%; object-fit: contain;"', $html );
    return $html;
}
add_filter( 'get_custom_logo', 'radiance_custom_logo_classes' );
"""
with open(os.path.join(theme_name, "functions.php"), "w") as f:
    f.write(functions_php)

# --- 4. Extract Header and Footer from index.html ---
with open(os.path.join(prod_dir, "index.html"), "r") as f:
    index_html = f.read()

# Extract from <header id="neo-mobile-header"> to just before <main id="neo-main">
header_match = re.search(r'(<header class="neo-mobile-header".*?)\s*<main id="neo-main"', index_html, re.DOTALL)
header_html = header_match.group(1) if header_match else "<!-- Header not found -->"

# Extract from <footer to end
footer_match = re.search(r'(<footer class="neo-footer.*</body>)', index_html, re.DOTALL)
footer_html = footer_match.group(1).replace('</body>', '') if footer_match else "<!-- Footer not found -->"
# Remove script tags from footer html
footer_html = re.sub(r'<script.*?</script>', '', footer_html, flags=re.DOTALL)

# Also extract the a11y root and skip link
skip_link_match = re.search(r'(<a href="#neo-main" class="neo-skip-link".*?<div id="neo-a11y-root"></div>)', index_html, re.DOTALL)
skip_link_html = skip_link_match.group(1) if skip_link_match else ""

header_php = f"""<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
{skip_link_html}
<div class="neo-page wp-html-module" data-neo-wp-embed data-neo-palette="moon" data-neo-theme="light">
{header_html}
"""
with open(os.path.join(theme_name, "header.php"), "w") as f:
    f.write(header_php)

footer_php = f"""
{footer_html}
</div> <!-- end neo-page wp-html-module -->
<?php wp_footer(); ?>
</body>
</html>
"""
with open(os.path.join(theme_name, "footer.php"), "w") as f:
    f.write(footer_php)


# --- 5. Process Pages ---
# We loop over all HTML files in production_site
html_files = glob.glob(os.path.join(prod_dir, "*.html"))
for file_path in html_files:
    filename = os.path.basename(file_path)
    if filename in ["404.html"]:
        continue
    
    slug = filename.replace(".html", "")
    if slug == "privacy-policy":
        slug = "privacy"
        
    template_name = slug.replace("-", " ").title()
    if filename == "index.html":
        template_name = "Home"
        php_filename = "front-page.php"
    else:
        php_filename = f"template-{slug}.php"
        
    with open(file_path, "r") as f:
        html_content = f.read()
        
    # Extract just the <main> block
    main_match = re.search(r'(<main id="neo-main".*?</main>)', html_content, re.DOTALL)
    if not main_match:
        # Fallback to just the body contents minus header/footer
        # but our script already fixed production_site so they all have main!
        body_inner = "<!-- missing main -->"
    else:
        body_inner = main_match.group(1)
        
    # Fix image paths
    body_inner = body_inner.replace('src="images/', 'src="<?php echo get_template_directory_uri(); ?>/assets/images/')
    
    # Fix hrefs to internal pages based on standard WP permalinks
    body_inner = body_inner.replace('href="index.html"', 'href="/"')
    body_inner = re.sub(r'href="([^"]+)\.html"', r'href="/\1/"', body_inner)
    body_inner = body_inner.replace('href="/privacy-policy/"', 'href="/privacy/"')
        
    php_content = f"<?php\n/*\nTemplate Name: Radiance - {template_name}\n*/\nget_header();\n?>\n\n"
    php_content += body_inner
    php_content += "\n\n<?php get_footer(); ?>\n"
    
    with open(os.path.join(theme_name, php_filename), "w") as f:
        f.write(php_content)

# Fix image paths and internal links in header and footer
with open(os.path.join(theme_name, "header.php"), "r") as f:
    header_inner = f.read()
    h = header_inner.replace('src="images/', 'src="<?php echo get_template_directory_uri(); ?>/assets/images/')
    h = h.replace('href="index.html"', 'href="/"')
    h = re.sub(r'href="([^"]+)\.html"', r'href="/\1/"', h)
    h = h.replace('href="/privacy-policy/"', 'href="/privacy/"')
    
    # Custom logo PHP snippet to replace the static image
    logo_php = """
<?php
if ( function_exists( 'the_custom_logo' ) && has_custom_logo() ) {
    the_custom_logo();
} else {
    echo '<a href="' . esc_url( home_url( '/' ) ) . '" class="neo-mobile-header__brand neo-footer__logo" aria-label="' . get_bloginfo( 'name' ) . '">';
    echo '<img src="' . get_template_directory_uri() . '/assets/images/logo1.png" alt="' . get_bloginfo( 'name' ) . '" class="neo-header__logo-img neo-footer__logo-img" style="height: 72px; width: auto; max-width: 100%; object-fit: contain;">';
    echo '</a>';
}
?>
"""
    
    # Replace the mobile header brand link
    h = re.sub(
        r'<a href="/" class="neo-mobile-header__brand">.*?</a>',
        logo_php.strip(),
        h,
        flags=re.DOTALL
    )
    
    # Replace the desktop header brand link
    h = re.sub(
        r'<a href="/" class="neo-desktop-nav__brand">.*?</a>',
        logo_php.strip(),
        h,
        flags=re.DOTALL
    )

    # Insert user SVG into the Sign In link (desktop and mobile)
    user_svg_html = """<a href="/login/" aria-label="Sign in" style="display: flex; align-items: center; justify-content: center; color: var(--neo-accent); transition: color var(--neo-duration-fast); width: 40px; height: 40px; border-radius: 50%; margin-left: 0.5rem;" onmouseover="this.style.color='var(--neo-accent-hover)';" onmouseout="this.style.color='var(--neo-accent)';">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </a>"""
    user_svg_html_mobile = """<a href="/login/" aria-label="Sign in" style="display: flex; align-items: center; justify-content: center; color: var(--neo-accent); transition: color var(--neo-duration-fast); width: 48px; height: 48px; border-radius: 50%; border: 1px solid var(--neo-border-base); background: var(--neo-bg-base);" onmouseover="this.style.color='var(--neo-accent-hover)'; this.style.borderColor='var(--neo-accent)';" onmouseout="this.style.color='var(--neo-accent)'; this.style.borderColor='var(--neo-border-base)';">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </a>"""

    # Remove the text links in ul
    h = re.sub(r'<li><a href="/login/">Sign in</a></li>', '', h)
    
    # Add SVG to desktop CTA
    h = re.sub(
        r'(<a href="/book/" class="neo-btn neo-btn--primary">Book now</a>)',
        r'\1\n        ' + user_svg_html,
        h
    )

    # Add SVG to mobile CTA
    h = re.sub(
        r'(<a href="/book/" class="neo-btn neo-btn--primary" data-neo-menu-close style="flex: 1; text-align: center;">Book now</a>)',
        r'\1\n          ' + user_svg_html_mobile,
        h
    )
    # Also handle the original fallback for mobile CTA just in case
    h = re.sub(
        r'(<a href="/book/" class="neo-btn neo-btn--primary" data-neo-menu-close>Book now</a>)',
        r'<a href="/book/" class="neo-btn neo-btn--primary" data-neo-menu-close style="flex: 1; text-align: center;">Book now</a>\n          ' + user_svg_html_mobile,
        h
    )
    # Add SVG to the specific mobile header CTA
    h = re.sub(
        r'(<a href="/book/" class="neo-btn neo-btn--primary neo-btn--sm rb-mobile-header-cta">Book</a>)',
        r'\1\n          ' + user_svg_html_mobile,
        h
    )

with open(os.path.join(theme_name, "header.php"), "w") as f: f.write(h)

with open(os.path.join(theme_name, "footer.php"), "r") as f:
    footer_inner = f.read()
    f_ = footer_inner.replace('src="images/', 'src="<?php echo get_template_directory_uri(); ?>/assets/images/')
    f_ = f_.replace('href="index.html"', 'href="/"')
    f_ = re.sub(r'href="([^"]+)\.html"', r'href="/\1/"', f_)
    f_ = f_.replace('href="/privacy-policy/"', 'href="/privacy/"')
    
    # Replace the footer brand link
    f_ = re.sub(
        r'<a href="(?:/|index\.html)" class="neo-footer__logo"[^>]*>.*?</a>',
        logo_php.strip(),
        f_,
        flags=re.DOTALL
    )

    # Fix the accessibility SVG
    new_a11y_svg = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="4" r="2"></circle><path d="M12 6v7"></path><path d="M5 8h14"></path><path d="M12 13l-4 8"></path><path d="M12 13l4 8"></path></svg>'
    f_ = re.sub(
        r'<svg viewBox="0 0 24 24" aria-hidden="true"[^>]*>.*?<circle cx="12" cy="12" r="3"/>\s*</svg>',
        new_a11y_svg,
        f_,
        flags=re.DOTALL
    )
with open(os.path.join(theme_name, "footer.php"), "w") as f: f.write(f_)

# Replace the accessibility icon in a11y-toolbar.js
a11y_js_path = os.path.join(theme_name, "assets", "js", "a11y-toolbar.js")
if os.path.exists(a11y_js_path):
    with open(a11y_js_path, "r") as f:
        a11y_js = f.read()
    
    # Replace the eye SVG with the person SVG
    a11y_js = a11y_js.replace(
        '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
        '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="4" r="2"></circle><path d="M12 6v7"></path><path d="M5 8h14"></path><path d="M12 13l-4 8"></path><path d="M12 13l4 8"></path></svg>'
    )
    with open(a11y_js_path, "w") as f:
        f.write(a11y_js)

# --- 6. Fallback index.php ---
index_php = """<?php get_header(); ?>
<main id="neo-main" class="neo-page__main" tabindex="-1">
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

# --- 7. Zip ---
shutil.make_archive(theme_name, 'zip', theme_name)
print(f"Theme successfully built and zipped to {theme_name}.zip")
