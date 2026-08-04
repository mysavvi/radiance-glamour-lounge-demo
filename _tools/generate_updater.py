import os
import json

pages_dir = '/Users/user/Desktop/Radiance Glamour Lounge/pages'
pages_data = {}

slug_map = {
    'home.html': 'home',
    'treatments.html': 'treatments',
    'clinic.html': 'clinic',
    'reviews.html': 'reviews',
    'contact.html': 'contact',
    'book.html': 'book',
    'book-success.html': 'book-success',
    'shop.html': 'shop',
    'cart.html': 'cart',
    'checkout.html': 'checkout',
    'product.html': 'product',
    'login.html': 'login',
    'register.html': 'register',
    'privacy-policy.html': 'privacy-policy',
    'terms.html': 'terms'
}

for fname, slug in slug_map.items():
    fpath = os.path.join(pages_dir, fname)
    if os.path.exists(fpath):
        with open(fpath, 'r', encoding='utf-8') as f:
            pages_data[slug] = f.read()

json_str = json.dumps(pages_data)

php_content = f"""<?php
// Radiance Glamour Lounge — One-Click WordPress Page Sync
if (!isset($_GET['key']) || $_GET['key'] !== 'radiance2026') {{
    die('Access denied. Key required.');
}}

require_once(__DIR__ . '/wp-load.php');

$pages_json = <<<'JSON_DATA'
{json_str}
JSON_DATA;

$pages = json_decode($pages_json, true);

echo "<h2>Radiance Glamour Lounge — One-Click Page Updater</h2>";
echo "<ul>";

foreach ($pages as $slug => $html_content) {{
    $args = array(
        'name'        => $slug,
        'post_type'   => 'page',
        'post_status' => 'any',
        'numberposts' => 1
    );
    $posts = get_posts($args);
    
    if (!empty($posts)) {{
        $page_id = $posts[0]->ID;
        $wrapped = (strpos($html_content, '<!-- wp:html -->') === false) 
            ? "<!-- wp:html -->\\n" . $html_content . "\\n<!-- /wp:html -->" 
            : $html_content;
            
        wp_update_post(array(
            'ID'           => $page_id,
            'post_content' => $wrapped
        ));
        echo "<li style='color:green; font-family:sans-serif;'>✔ Updated <b>" . htmlspecialchars($slug) . "</b> (Page ID " . $page_id . ")</li>";
    }} else {{
        echo "<li style='color:red; font-family:sans-serif;'>✖ Page with slug '<b>" . htmlspecialchars($slug) . "</b>' not found.</li>";
    }}
}}

echo "</ul>";
echo "<h3 style='color:green; font-family:sans-serif;'>🎉 Success! All pages updated directly inside WordPress.</h3>";
echo "<p style='color:gray; font-family:sans-serif;'>🔒 For security, please delete <code>update_wp_pages.php</code> from your host once done.</p>";
?>
"""

output_file = '/Users/user/Desktop/Radiance Glamour Lounge/update_wp_pages.php'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(php_content)

print(f"Generated {{output_file}} successfully! Size: {{os.path.getsize(output_file)}} bytes")
