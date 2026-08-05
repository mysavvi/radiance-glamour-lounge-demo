<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <?php if ( is_front_page() ) : ?>
    <script>document.documentElement.classList.add('js', 'rb-hero-nav-over');</script>
    <?php else : ?>
    <script>document.documentElement.classList.add('js');</script>
    <?php endif; ?>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a href="#neo-main" class="neo-skip-link">Skip to main content</a>
  <div id="neo-a11y-root"></div>
<div class="neo-page wp-html-module" data-neo-wp-embed data-neo-palette="moon" data-neo-theme="light">
<header class="neo-mobile-header" id="neo-mobile-header">
      <div class="neo-mobile-header__inner">
        <?php
if ( function_exists( 'the_custom_logo' ) && has_custom_logo() ) {
    the_custom_logo();
} else {
    echo '<a href="' . esc_url( home_url( '/' ) ) . '" class="neo-mobile-header__brand neo-footer__logo" aria-label="' . get_bloginfo( 'name' ) . '">';
    echo '<img src="' . get_template_directory_uri() . '/assets/images/logo1.png" alt="' . get_bloginfo( 'name' ) . '" class="neo-header__logo-img neo-footer__logo-img" style="height: 72px; width: auto; max-width: 100%; object-fit: contain;">';
    echo '</a>';
}
?>
        <div class="neo-mobile-header__actions">
          <a aria-label="Cart" href="/cart/" style="position: relative; color: var(--neo-text-primary); padding: 0.5rem; display: flex; align-items: center;">
            <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <span class="neo-cart-badge" style="position: absolute; top: -4px; right: -4px; background: var(--neo-accent); color: white; border-radius: 9999px; font-size: 0.65rem; font-weight: 700; width: 1.25rem; height: 1.25rem; display: flex; align-items: center; justify-content: center; border: 2px solid var(--neo-bg-base);">0</span>
          </a>
          <a href="/book/" class="neo-btn neo-btn--primary neo-btn--sm rb-mobile-header-cta">Book</a>
          <a href="/login/" aria-label="Sign in" style="display: flex; align-items: center; justify-content: center; color: var(--neo-accent); width: 40px; height: 40px; margin-right: 8px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></a>
          <button type="button" class="neo-mobile-header__menu-btn" onclick="toggleNeoMobileMenu()" aria-label="Open menu" aria-haspopup="dialog" aria-expanded="false" aria-controls="neo-mobile-menu">
            <span class="neo-burger" aria-hidden="true"><span></span><span></span><span></span></span>
          </button>
        </div>
      </div>
    </header>

    <nav class="neo-desktop-nav" id="neo-desktop-nav" aria-label="Main">
      <div class="neo-desktop-nav__inner">
        <?php
if ( function_exists( 'the_custom_logo' ) && has_custom_logo() ) {
    the_custom_logo();
} else {
    echo '<a href="' . esc_url( home_url( '/' ) ) . '" class="neo-mobile-header__brand neo-footer__logo" aria-label="' . get_bloginfo( 'name' ) . '">';
    echo '<img src="' . get_template_directory_uri() . '/assets/images/logo1.png" alt="' . get_bloginfo( 'name' ) . '" class="neo-header__logo-img neo-footer__logo-img" style="height: 72px; width: auto; max-width: 100%; object-fit: contain;">';
    echo '</a>';
}
?>
        <div class="neo-desktop-nav__actions" style="display: flex; gap: 1rem; align-items: center;">
        <ul class="neo-desktop-nav__links">
          <li><a href="/" class="neo-nav-link--active" aria-current="page">Home</a></li>
          <li><a href="/treatments/">Treatments</a></li>
          <li><a href="/clinic/">Clinic</a></li>
          <li><a href="/reviews/">Reviews</a></li>
          <li><a href="/shop/">Shop</a></li>
          <li><a href="/contact/">Contact</a></li>
        </ul>
                <a aria-label="Cart" href="/cart/" style="position: relative; color: var(--neo-text-primary); padding: 0.5rem; display: flex; align-items: center; margin-left: 1rem;">
                  <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                  <span class="neo-cart-badge" style="position: absolute; top: -4px; right: -4px; background: var(--neo-accent); color: white; border-radius: 9999px; font-size: 0.65rem; font-weight: 700; width: 1.25rem; height: 1.25rem; display: flex; align-items: center; justify-content: center; border: 2px solid var(--neo-bg-base);">0</span>
                </a>
                <a href="/book/" class="neo-btn neo-btn--primary">Book now</a>
                <a href="/login/" aria-label="Sign in" style="display: flex; align-items: center; justify-content: center; color: var(--neo-accent); transition: color var(--neo-duration-fast); width: 40px; height: 40px; border-radius: 50%;" onmouseover="this.style.color='var(--neo-accent-hover)';" onmouseout="this.style.color='var(--neo-accent)';"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></a>
        </div>
      </div>
    </nav>

    <div class="neo-mobile-menu" id="neo-mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" aria-hidden="true">
      <div class="neo-mobile-menu__inner">
        <div class="neo-mobile-menu__head">
          <a href="/" class="neo-mobile-header__brand" data-neo-menu-close>
            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo1.png" alt="Radiance Glamour Lounge" class="neo-header__logo-img" style="height: 72px; width: auto; max-width: 100%; object-fit: contain;">
          </a>
          <button type="button" class="neo-mobile-menu__close" onclick="toggleNeoMobileMenu()" aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <ul class="neo-mobile-menu__links">
          <li><a href="/" class="neo-nav-link--active" data-neo-menu-close aria-current="page">Home</a></li>
          <li><a href="/treatments/" data-neo-menu-close>Treatments</a></li>
          <li><a href="/clinic/" data-neo-menu-close>Clinic</a></li>
          <li><a href="/reviews/" data-neo-menu-close>Reviews</a></li>
          <li><a href="/shop/" data-neo-menu-close>Shop</a></li>
          <li><a href="/contact/" data-neo-menu-close>Contact</a></li>
        </ul>
        <div class="neo-mobile-menu__cta">
          <a href="/book/" class="neo-btn neo-btn--primary" data-neo-menu-close style="flex: 1; text-align: center;">Book now</a>
        </div>
      </div>
    </div>
