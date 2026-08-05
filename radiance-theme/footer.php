
<footer class="neo-footer neo-footer--with-bottom-nav">
      <div class="neo-footer__inner">
        <div class="neo-footer__grid">
          <div class="neo-footer__brand">
            <?php
if ( function_exists( 'the_custom_logo' ) && has_custom_logo() ) {
    the_custom_logo();
} else {
    echo '<a href="' . esc_url( home_url( '/' ) ) . '" class="neo-mobile-header__brand neo-footer__logo" aria-label="' . get_bloginfo( 'name' ) . '">';
    echo '<img src="' . get_template_directory_uri() . '/assets/images/logo1.png" alt="' . get_bloginfo( 'name' ) . '" class="neo-header__logo-img neo-footer__logo-img" style="height: 72px; width: auto; max-width: 100%; object-fit: contain;">';
    echo '</a>';
}
?>
            <div class="neo-footer__social" aria-label="Social media">
              <a href="https://www.facebook.com/p/Radiance-glamour-loungeAesthetic-clinic-100083286131948/" target="_blank" rel="noopener noreferrer" aria-label="Radiance Glamour Lounge on Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/radiance_glamour_lounge/" target="_blank" rel="noopener noreferrer" aria-label="Radiance Glamour Lounge on Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.tiktok.com/@nabilag84" target="_blank" rel="noopener noreferrer" aria-label="Radiance Glamour Lounge on TikTok">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.34 6.34 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
              </a>
            </div>
            <p class="neo-footer__tagline">Ladies-only hair and beauty salon in Merseyway Shopping Centre, Stockport. Relaxed, glam and professional.</p>
          </div>
          <nav class="neo-footer__col neo-footer__col--explore" aria-label="Footer">
            <h2 class="neo-footer__heading">Explore</h2>
            <ul class="neo-footer__links">
              <li><a href="/">Home</a></li>
              <li><a href="/treatments/">Treatments</a></li>
              <li><a href="/clinic/">Clinic</a></li>
              <li><a href="/reviews/">Reviews</a></li>
              <li><a href="/shop/">Shop</a></li>
              <li><a href="/book/">Book</a></li>
              <li><a href="/contact/">Contact</a></li>
            </ul>
          </nav>
          <div class="neo-footer__col neo-footer__col--contact">
            <h2 class="neo-footer__heading">Get in touch</h2>
            <ul class="neo-footer__contact">
              <li>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>12-16 Prince&rsquo;s St, Stockport SK1 1SE</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                <a href="tel:07857579631">07857 579631</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="neo-footer__bottom">
          <div class="neo-footer__bottom-left">
            <p class="neo-footer__copyright">&copy; <?php echo date('Y'); ?> Radiance Glamour Lounge. All rights reserved.</p>
            <a class="neo-footer__credit" href="https://savviweb.com" target="_blank" rel="noopener noreferrer">
              <span>Designed by</span>
              <img src="<?php echo get_template_directory_uri(); ?>/assets/images/savviweb-logo.png" alt="" width="18" height="18">
              <strong>Savviweb.com</strong>
            </a>
          </div>
          <div class="neo-footer__legal">
            <a href="/privacy/">Privacy</a>
            <a href="/terms/">Terms</a>
            <button type="button" class="neo-a11y-footer-btn" data-neo-a11y-open aria-haspopup="dialog">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="4" r="2"></circle><path d="M12 6v7"></path><path d="M5 8h14"></path><path d="M12 13l-4 8"></path><path d="M12 13l4 8"></path></svg>
              <span>Accessibility</span>
            </button>
          </div>
        </div>
      </div>
    </footer>

    <nav class="neo-bottom-nav" aria-label="Mobile">
      <div class="neo-bottom-nav__inner">
        <a href="/" class="neo-bottom-nav__tab neo-bottom-nav__tab--active" aria-current="page">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z"/></svg>
          <span>Home</span>
        </a>
        <a href="/treatments/" class="neo-bottom-nav__tab">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          <span>Treatments</span>
        </a>
        <a href="tel:07857579631" class="neo-bottom-nav__tab">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          <span>Call</span>
        </a>
        <a href="/book/" class="neo-bottom-nav__tab">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <span>Book</span>
        </a>
        <a href="/shop/" class="neo-bottom-nav__tab">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
          <span>Shop</span>
        </a>
      </div>
    </nav>

    <div id="neo-cookie-banner" class="neo-cookie-banner neo-cookie-banner--with-bottom-nav" role="region" aria-label="Cookie consent">
      <p class="neo-cookie-banner__text">We use essential cookies to run this site. With your consent we may also use analytics and embedded content such as maps. See our <a href="/privacy/">Privacy Policy</a> for details.</p>
      <div class="neo-cookie-banner__actions">
        <button type="button" class="neo-btn neo-btn--secondary" data-neo-cookie-decline>Decline optional</button>
        <button type="button" class="neo-btn neo-btn--primary" data-neo-cookie-accept>Accept all</button>
      </div>
    </div>
  </div>

  
  
  
  
  
  
</div> <!-- end neo-page wp-html-module -->
<?php wp_footer(); ?>
</body>
</html>
