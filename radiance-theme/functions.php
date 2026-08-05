<?php
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
    return $output . ' class="js" data-neo-palette="moon" data-neo-theme="light"';
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

// Automatically fix relative asset paths for pasted HTML blocks
function radiance_fix_relative_paths($content) {
    $theme_uri = get_template_directory_uri();
    
    // Fix images folder
    $content = str_replace('src="images/', 'src="' . $theme_uri . '/assets/images/', $content);
    $content = str_replace('url(\'images/', 'url(\'' . $theme_uri . '/assets/images/', $content);
    $content = str_replace('url("images/', 'url("' . $theme_uri . '/assets/images/', $content);
    $content = str_replace('url(images/', 'url(' . $theme_uri . '/assets/images/', $content);
    
    // Fix neo folder (if used in any pasted HTML)
    $content = str_replace('href="neo/', 'href="' . $theme_uri . '/assets/neo/', $content);
    $content = str_replace('src="neo/', 'src="' . $theme_uri . '/assets/neo/', $content);
    
    return $content;
}
add_filter('the_content', 'radiance_fix_relative_paths', 99);

