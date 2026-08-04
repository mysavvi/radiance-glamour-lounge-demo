<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a href="#neo-main" class="neo-skip-link">Skip to main content</a>
  <div id="neo-a11y-root"></div>
<div class="neo-page" class="wp-html-module" data-neo-wp-embed data-neo-palette="moon" data-neo-theme="light">
<header class="neo-mobile-header" id="neo-mobile-header">
      <div class="neo-mobile-header__inner">
        <a href="index.html" class="neo-mobile-header__brand">
          <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo1.png" alt="Radiance Glamour Lounge" class="neo-header__logo-img" style="height: 72px; width: auto; max-width: 100%; object-fit: contain;">
        </a>
        <div class="neo-mobile-header__actions">
          <a href="/book/" class="neo-btn neo-btn--primary neo-btn--sm rb-mobile-header-cta">Book</a>
          <button type="button" class="neo-mobile-header__menu-btn" onclick="toggleNeoMobileMenu()" aria-label="Open menu" aria-haspopup="dialog" aria-expanded="false" aria-controls="neo-mobile-menu">
            <span class="neo-burger" aria-hidden="true"><span></span><span></span><span></span></span>
          </button>
        </div>
      </div>
    </header>

    <nav class="neo-desktop-nav" id="neo-desktop-nav" aria-label="Main">
      <div class="neo-desktop-nav__inner">
        <a href="index.html" class="neo-mobile-header__brand">
          <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo1.png" alt="Radiance Glamour Lounge" class="neo-header__logo-img" style="height: 72px; width: auto; max-width: 100%; object-fit: contain;">
        </a>
        <div class="neo-desktop-nav__actions">
        <ul class="neo-desktop-nav__links">
          <li><a href="login.html">Sign in</a></li>
          <li><a href="index.html" class="neo-nav-link--active" aria-current="page">Home</a></li>
          <li><a href="treatments.html">Treatments</a></li>
          <li><a href="clinic.html">Clinic</a></li>
          <li><a href="testimonials.html">Reviews</a></li>
          <li><a href="shop.html">Shop</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
                <a href="/book/" class="neo-btn neo-btn--primary">Book now</a>
        </div>
      </div>
    </nav>

    <div class="neo-mobile-menu" id="neo-mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" aria-hidden="true">
      <div class="neo-mobile-menu__inner">
        <div class="neo-mobile-menu__head">
          <a href="index.html" class="neo-mobile-header__brand" data-neo-menu-close>
            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo1.png" alt="Radiance Glamour Lounge" class="neo-header__logo-img" style="height: 72px; width: auto; max-width: 100%; object-fit: contain;">
          </a>
          <button type="button" class="neo-mobile-menu__close" onclick="toggleNeoMobileMenu()" aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <ul class="neo-mobile-menu__links">
          <li><a href="login.html">Sign in</a></li>
          <li><a href="index.html" class="neo-nav-link--active" data-neo-menu-close aria-current="page">Home</a></li>
          <li><a href="treatments.html" data-neo-menu-close>Treatments</a></li>
          <li><a href="clinic.html" data-neo-menu-close>Clinic</a></li>
          <li><a href="testimonials.html" data-neo-menu-close>Reviews</a></li>
          <li><a href="shop.html" data-neo-menu-close>Shop</a></li>
          <li><a href="contact.html" data-neo-menu-close>Contact</a></li>
        </ul>
        <div class="neo-mobile-menu__cta">
          <a href="/book/" class="neo-btn neo-btn--primary" data-neo-menu-close>Book now</a>
        </div>
      </div>
    </div>

    <main id="neo-main" class="neo-page__main" tabindex="-1">

      <section class="rb-hero-scroll rb-section" id="hero" data-rb-hero-scroll aria-label="Welcome">
        <div class="rb-hero-scroll__track">
          <div class="rb-hero-scroll__sticky">
            <div class="rb-hero-scroll__bg" aria-hidden="true">
              <div class="rb-hero-scroll__frames" role="group" aria-roledescription="carousel" aria-label="Salon highlights">
                <figure class="rb-hero-scroll__frame is-active">
                  <img src="<?php echo get_template_directory_uri(); ?>/assets/images/hero-1.jpg" alt="Styling stations at Radiance Glamour Lounge, Merseyway, Stockport" width="1024" height="599" fetchpriority="high" decoding="async">
                </figure>
                <figure class="rb-hero-scroll__frame" aria-hidden="true">
                  <img src="<?php echo get_template_directory_uri(); ?>/assets/images/hero-2.jpg" alt="Emerald lounge seating and blossom tree at Radiance Glamour Lounge" width="1024" height="640" decoding="async">
                </figure>
                <figure class="rb-hero-scroll__frame" aria-hidden="true">
                  <img src="<?php echo get_template_directory_uri(); ?>/assets/images/hero-3.jpg" alt="Hair washing stations at Radiance Glamour Lounge, Stockport" width="1024" height="640" decoding="async">
                </figure>
                <figure class="rb-hero-scroll__frame" aria-hidden="true">
                  <img src="<?php echo get_template_directory_uri(); ?>/assets/images/hero-4.jpg" alt="Reception and floral feature wall at Radiance Glamour Lounge" width="1024" height="640" decoding="async">
                </figure>
                <figure class="rb-hero-scroll__frame" aria-hidden="true">
                  <img src="<?php echo get_template_directory_uri(); ?>/assets/images/hero-5.jpg" alt="Aesthetic treatment room at Radiance Glamour Lounge" width="720" height="480" decoding="async">
                </figure>
              </div>
              <div class="rb-hero-scroll__scrim"></div>
            </div>
            <div class="neo-container rb-hero-scroll__content">
              <div class="rb-hero-scroll__copy">
                <h1 class="neo-h1 rb-hero-scroll__title">Radiance Glamour Lounge</h1>
                <p class="rb-hero-scroll__tagline">Where Glamour Feels Like Home.</p>
                <p class="neo-body rb-hero-scroll__lead">
                  Discover Stockport&rsquo;s premier destination for luxury aesthetics and bespoke beauty treatments. Relax, unwind, and let our expert team enhance your natural glow in a truly welcoming sanctuary.
                </p>
                <div class="rb-cta-row rb-hero-scroll__cta">
                  <a href="/book/" class="neo-btn neo-btn--primary">Book your consultation</a>
                  <a href="#gallery" class="neo-btn neo-btn--secondary rb-hero-scroll__btn-secondary">Browse treatments</a>
                </div>
              </div>
            </div>
            <div class="rb-hero-scroll__chrome">
              <div class="rb-hero-scroll__dots" aria-hidden="true">
                <span class="rb-hero-scroll__dot is-active"></span>
                <span class="rb-hero-scroll__dot"></span>
                <span class="rb-hero-scroll__dot"></span>
                <span class="rb-hero-scroll__dot"></span>
                <span class="rb-hero-scroll__dot"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="rb-section rb-about" id="about">
        <div class="neo-container">
          <div class="rb-about__layout" data-neo-reveal>
            <div class="rb-about__intro">
              <p class="rb-about__kicker">The lounge</p>
              <h2 class="neo-h2 rb-about__title">Where every visit feels considered</h2>
            </div>
            <div class="rb-about__body">
              <p class="neo-body rb-about__lead">
                A welcoming sanctuary for luxury aesthetics and bespoke beauty. Expert colour, restorative skin care, flawless nails and thoughtful finishing touches, all in one calm, glamorous setting.
              </p>
              <p class="neo-body rb-muted rb-about__detail">
                Our team takes time to understand what you need, then enhances your natural glow with precision and ease. Complimentary refreshments, unhurried appointments, and a relaxed atmosphere from the moment you arrive.
              </p>
              <p class="rb-about__note">Rated 4.4 from 322 client reviews on Treatwell.</p>
              <a href="/book/" class="neo-btn neo-btn--secondary rb-about__cta">Book your consultation</a>
            </div>
          </div>
        </div>
      </section>

      <section class="rb-section rb-teaser neo-surface-inset" id="gallery" style="border-radius: var(--neo-radius-2xl); margin-inline: var(--neo-container-padding);">
        <div class="neo-container">
          <div class="rb-folder-gallery-section__head" data-neo-reveal>
            <p class="rb-eyebrow">Treatments</p>
            <h2 class="neo-h2" id="rb-gallery-title">Browse by treatment</h2>
            <p class="neo-body rb-muted">Open the folder to explore hair, beauty, nails, waxing, laser and massage.</p>
          </div>

          <div class="rb-folder-gallery" data-rb-folder-gallery>
            <button type="button" class="rb-folder-gallery__backdrop" hidden aria-label="Dismiss gallery overlay"></button>
            <div class="rb-folder-gallery__stage">
              <button type="button" class="rb-folder-gallery__close" hidden aria-label="Close gallery">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
              <div class="rb-folder-gallery__stage-inner">
              <div class="rb-folder-gallery__canvas">
              <div class="rb-folder-gallery__back" aria-hidden="true">
                <div class="rb-folder-gallery__back-tab"></div>
                <div class="rb-folder-gallery__back-body"></div>
                <div class="rb-folder-gallery__back-inner"></div>
              </div>

              <div class="rb-folder-gallery__photos" aria-hidden="true">
                <figure class="rb-folder-gallery__photo">
                  <img src="<?php echo get_template_directory_uri(); ?>/assets/images/gallery-nails.jpg" alt="Hair styling at Radiance Glamour Lounge" width="800" height="1000" loading="lazy" decoding="async">
                  <figcaption class="rb-folder-gallery__photo-cap">
                    <span class="rb-folder-gallery__photo-label">Hair</span>
                    <a href="treatments.html#hair" class="neo-btn neo-btn--primary rb-folder-gallery__photo-btn">View treatments</a>
                  </figcaption>
                </figure>
                <figure class="rb-folder-gallery__photo">
                  <img src="<?php echo get_template_directory_uri(); ?>/assets/images/gallery-facial.jpg" alt="Facial skincare treatment at Radiance Glamour Lounge" width="800" height="1000" loading="lazy" decoding="async">
                  <figcaption class="rb-folder-gallery__photo-cap">
                    <span class="rb-folder-gallery__photo-label">Face &amp; skin</span>
                    <a href="treatments.html#face" class="neo-btn neo-btn--primary rb-folder-gallery__photo-btn">View treatments</a>
                  </figcaption>
                </figure>
                <figure class="rb-folder-gallery__photo">
                  <img src="<?php echo get_template_directory_uri(); ?>/assets/images/nails-manicure.jpg" alt="Manicure and nail art" width="800" height="1000" loading="lazy" decoding="async">
                  <figcaption class="rb-folder-gallery__photo-cap">
                    <span class="rb-folder-gallery__photo-label">Nails</span>
                    <a href="treatments.html#nails" class="neo-btn neo-btn--primary rb-folder-gallery__photo-btn">View treatments</a>
                  </figcaption>
                </figure>
                <figure class="rb-folder-gallery__photo">
                  <img src="<?php echo get_template_directory_uri(); ?>/assets/images/gallery-wax-laser.jpg" alt="Waxing and laser hair removal treatment room" width="800" height="1000" loading="lazy" decoding="async">
                  <figcaption class="rb-folder-gallery__photo-cap">
                    <span class="rb-folder-gallery__photo-label">Waxing &amp; laser</span>
                    <a href="treatments.html#waxing" class="neo-btn neo-btn--primary rb-folder-gallery__photo-btn">View treatments</a>
                  </figcaption>
                </figure>
                <figure class="rb-folder-gallery__photo">
                  <img src="<?php echo get_template_directory_uri(); ?>/assets/images/gallery-massage.jpg" alt="Relaxing back massage" width="800" height="1000" loading="lazy" decoding="async">
                  <figcaption class="rb-folder-gallery__photo-cap">
                    <span class="rb-folder-gallery__photo-label">Massage &amp; body</span>
                    <a href="treatments.html#massage" class="neo-btn neo-btn--primary rb-folder-gallery__photo-btn">View treatments</a>
                  </figcaption>
                </figure>
              </div>

              <button type="button" class="rb-folder-gallery__front" aria-expanded="false" aria-controls="rb-gallery-photos">
                <span class="rb-folder-gallery__front-shine" aria-hidden="true"></span>
                <span class="rb-folder-gallery__front-label">Radiance.gallery</span>
              </button>
              </div>
              </div>
            </div>
