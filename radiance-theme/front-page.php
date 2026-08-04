<?php
/*
Template Name: Radiance - Home
*/
get_header();
?>

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

            <div class="rb-folder-gallery__static" id="rb-gallery-photos" aria-label="Treatment gallery">
              <a href="treatments.html#hair" class="rb-folder-gallery__static-item">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/gallery-nails.jpg" alt="Hair styling" width="800" height="600" loading="lazy">
                <span class="rb-folder-gallery__static-label">Hair</span>
              </a>
              <a href="treatments.html#face" class="rb-folder-gallery__static-item">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/gallery-facial.jpg" alt="Facial skincare at Radiance Glamour Lounge" width="800" height="600" loading="lazy" decoding="async">
                <span class="rb-folder-gallery__static-label">Face &amp; skin</span>
              </a>
              <a href="treatments.html#nails" class="rb-folder-gallery__static-item">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/nails-manicure.jpg" alt="Manicure and nail art" width="800" height="600" loading="lazy">
                <span class="rb-folder-gallery__static-label">Nails</span>
              </a>
              <a href="treatments.html#waxing" class="rb-folder-gallery__static-item">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/gallery-wax-laser.jpg" alt="Waxing and laser treatment room" width="800" height="600" loading="lazy">
                <span class="rb-folder-gallery__static-label">Waxing &amp; laser</span>
              </a>
              <a href="treatments.html#massage" class="rb-folder-gallery__static-item">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/gallery-massage.jpg" alt="Relaxing back massage" width="800" height="600" loading="lazy">
                <span class="rb-folder-gallery__static-label">Massage &amp; body</span>
              </a>
              <a href="/clinic/" class="rb-folder-gallery__static-item">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/clinic-treatment.jpg" alt="Aesthetic clinic treatment" width="800" height="600" loading="lazy">
                <span class="rb-folder-gallery__static-label">Aesthetic clinic</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="rb-section rb-clinic-teaser" id="clinic">
        <div class="neo-container">
          <article class="rb-clinic-teaser__frame" data-neo-reveal>
            <div class="rb-clinic-teaser__glow" aria-hidden="true"></div>
            <div class="rb-clinic-teaser__layout">
              <figure class="rb-clinic-teaser__visual">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/clinic-treatment.jpg" alt="Advanced skin treatment at Radiance Glamour Lounge" width="1000" height="800" loading="lazy" decoding="async">
                <figcaption class="rb-clinic-teaser__visual-cap">Consultation-led care</figcaption>
              </figure>
              <div class="rb-clinic-teaser__panel">
                <p class="rb-clinic-teaser__kicker">Aesthetic clinic</p>
                <h2 class="neo-h2 rb-clinic-teaser__title">Medical aesthetics under one roof</h2>
                <p class="neo-body rb-clinic-teaser__lead">Alongside hair, nails and beauty, we offer a full medical aesthetics menu. Consultation-led treatments include cosmetic injectables, PRP, plasma pen and advanced skin rejuvenation.</p>
                <dl class="rb-clinic-teaser__highlights">
                  <div class="rb-clinic-teaser__highlight">
                    <dt>Cosmetic injectables</dt>
                    <dd>From &pound;27</dd>
                  </div>
                  <div class="rb-clinic-teaser__highlight">
                    <dt>PRP therapy</dt>
                    <dd>Vampire facial &amp; face lift</dd>
                  </div>
                  <div class="rb-clinic-teaser__highlight">
                    <dt>Plasma pen</dt>
                    <dd>Skin tightening &amp; scars</dd>
                  </div>
                </dl>
                <div class="rb-cta-row rb-clinic-teaser__actions">
                  <a href="/clinic/" class="neo-btn neo-btn--primary">Explore the clinic</a>
                  <a href="/book/?treatment=clinic-consultation" class="neo-btn neo-btn--secondary">Book consultation</a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section class="rb-section" id="team">
        <div class="neo-container">
          <p class="rb-eyebrow">The team</p>
          <h2 class="neo-h2">Meet the team</h2>
          <p class="neo-body rb-muted rb-team__intro">The team is experienced and works to high standards. Nabila Salman, founder of Radiance Glamour Lounge, leads the salon.</p>

          <div class="rb-team-spotlight" id="nabila" data-neo-reveal>
            <div class="rb-team-spotlight__glow" aria-hidden="true"></div>
            <article class="rb-team-spotlight__card" aria-labelledby="rb-team-founder-name">
              <div class="rb-team-spotlight__portrait">
                <div class="rb-team-spotlight__ring" aria-hidden="true"></div>
                <div class="rb-team-spotlight__avatar" aria-hidden="true">N</div>
              </div>
              <div class="rb-team-spotlight__copy">
                <p class="rb-team-spotlight__eyeline">Salon Owner · Makeup Artist · Educator</p>
                <h3 class="rb-team-spotlight__name" id="rb-team-founder-name">Nabila Salman</h3>
                <p class="rb-team-spotlight__tagline">Makeup artistry for bridal, occasion and everyday looks.</p>
                <p class="neo-body rb-team-spotlight__bio">Nabila founded Radiance Glamour Lounge to bring hair, beauty and makeup together under one roof in Stockport. She works closely with clients on makeup and sets the standard for service across the salon.</p>
                <p class="neo-body rb-team-spotlight__bio rb-team-spotlight__bio--soft">She is also director of Radiance International Hair &amp; Beauty Academy, where she trains and assesses beauty therapists, nail technicians and makeup artists.</p>
                <ul class="rb-team-spotlight__meta">
                  <li>Bridal &amp; occasion makeup</li>
                  <li>VTCT-accredited educator</li>
                  <li>Tutor, assessor &amp; IQA</li>
                </ul>
                <div class="rb-team-spotlight__actions">
                  <a href="/book/?treatment=consultation-nabila" class="neo-btn neo-btn--primary">Book a consultation with Nabila</a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="rb-section rb-reviews" id="reviews" aria-labelledby="reviews-heading">
        <div class="neo-container">
          <div class="rb-reviews__band neo-surface-inset">
            <div class="rb-reviews__layout">
              <header class="rb-reviews__lead" data-neo-reveal>
                <h2 class="neo-h2 rb-reviews__title" id="reviews-heading">Clients keep coming back</h2>
                <div class="rb-reviews__rating" aria-label="Rated 4.4 out of 5 from 322 Treatwell reviews">
                  <p class="rb-reviews__score" aria-hidden="true">4.4</p>
                  <div class="rb-reviews__rating-body">
                    <div class="rb-reviews__stars" aria-hidden="true">
                      <svg viewBox="0 0 20 20" width="18" height="18"><path fill="currentColor" d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.77l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z"/></svg>
                      <svg viewBox="0 0 20 20" width="18" height="18"><path fill="currentColor" d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.77l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z"/></svg>
                      <svg viewBox="0 0 20 20" width="18" height="18"><path fill="currentColor" d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.77l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z"/></svg>
                      <svg viewBox="0 0 20 20" width="18" height="18"><path fill="currentColor" d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.77l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z"/></svg>
                      <svg viewBox="0 0 20 20" width="18" height="18" class="rb-reviews__star--soft"><path fill="currentColor" d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.77l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z"/></svg>
                    </div>
                    <p class="rb-reviews__meta">322 verified reviews on Treatwell</p>
                  </div>
                </div>
                <a href="/testimonials/" class="rb-reviews__link">Read all reviews</a>
              </header>

              <div class="rb-reviews__quotes">
                <div class="rb-reviews__spotlight" data-rb-review-rotator role="region" aria-live="polite" aria-label="Featured client reviews">
                  <div class="rb-reviews__spotlight-viewport">
                    <figure class="rb-reviews__spotlight-slide is-active">
                      <blockquote class="rb-reviews__spotlight-quote">
                        <p>&ldquo;I was very happy with the results of microneedling! Definitely go back!&rdquo;</p>
                      </blockquote>
                      <figcaption class="rb-reviews__attribution">
                        <span class="rb-reviews__name">Elaine</span>
                        <span class="rb-reviews__service">Facials · Micro Needling</span>
                      </figcaption>
                    </figure>
                    <figure class="rb-reviews__spotlight-slide">
                      <blockquote class="rb-reviews__spotlight-quote">
                        <p>&ldquo;Fantastic service as always and can always get an appointment when needed&rdquo;</p>
                      </blockquote>
                      <figcaption class="rb-reviews__attribution">
                        <span class="rb-reviews__name">Marie</span>
                        <span class="rb-reviews__service">Eyebrow &amp; Eyelash Tinting</span>
                      </figcaption>
                    </figure>
                    <figure class="rb-reviews__spotlight-slide">
                      <blockquote class="rb-reviews__spotlight-quote">
                        <p>&ldquo;Lovely massage, good pressure, friendly therapist&rdquo;</p>
                      </blockquote>
                      <figcaption class="rb-reviews__attribution">
                        <span class="rb-reviews__name">Laura</span>
                        <span class="rb-reviews__service">Swedish Massage</span>
                      </figcaption>
                    </figure>
                    <figure class="rb-reviews__spotlight-slide">
                      <blockquote class="rb-reviews__spotlight-quote">
                        <p>&ldquo;I loved how my eyebrows looked and there was a lot of attention to detail with them!&rdquo;</p>
                      </blockquote>
                      <figcaption class="rb-reviews__attribution">
                        <span class="rb-reviews__name">Almariya</span>
                        <span class="rb-reviews__service">Ladies&rsquo; Facial Waxing</span>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="rb-section">
        <div class="neo-container" data-neo-reveal>
          <div class="rb-contact neo-card neo-surface-inset">
            <p class="rb-eyebrow">Book now</p>
            <h2 class="neo-h2">Ready when you are</h2>
            <p class="neo-body rb-muted" style="max-width: 52ch; margin-inline: auto;">
              Send a booking request on our website, call us, or message on Instagram. We&rsquo;re at 12-16 Prince&rsquo;s St, Stockport SK1 1SE.
            </p>
            <div class="rb-cta-row" style="justify-content: center; margin-top: var(--neo-space-6);">
              <a href="/book/" class="neo-btn neo-btn--primary">Book an appointment</a>
              <a href="tel:07857579631" class="neo-btn neo-btn--secondary">Call 07857 579631</a>
            </div>
          </div>
        </div>
      </section>

      <section
        class="rb-section neo-social-card-section rb-social-presence"
        id="follow"
        data-neo-social-card
        data-neo-social-card-src="social-media-card.json"
        data-neo-social-reviews-src="client-reviews.json"
        aria-labelledby="rb-social-presence-heading"
      >
        <div class="neo-container rb-social-presence__shell">
          <div class="rb-social-presence__layout">
            <div class="rb-social-presence__hero">
              <div class="rb-social-presence__intro-frame">
              <header class="rb-social-presence__intro" data-neo-reveal>
                <a class="rb-social-presence__intro-mark" href="https://savviweb.com" target="_blank" rel="noopener noreferrer" aria-label="Designed by Savviweb.com">
                  <img src="<?php echo get_template_directory_uri(); ?>/assets/images/savviweb-logo.png" alt="" width="96" height="96" loading="lazy" decoding="async">
                </a>
                <p class="rb-social-presence__kicker">Join our community</p>
                <h2 class="neo-h2 rb-social-presence__title" id="rb-social-presence-heading">
                  <span class="rb-social-presence__title-line">
                    <span data-neo-social-section-title>Stay in the glow with us online</span>
                    <span class="rb-social-presence__title-rotator" aria-hidden="true">
                      <span class="rb-social-presence__title-icon" style="--i: 0"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/social/tiktok.svg" alt="" width="22" height="22" loading="lazy" decoding="async"></span>
                      <span class="rb-social-presence__title-icon rb-social-presence__title-icon--emoji rb-social-presence__title-icon--heart" style="--i: 1"><span class="rb-social-presence__title-emoji">❤️</span></span>
                      <span class="rb-social-presence__title-icon" style="--i: 2"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/social/instagram.svg" alt="" width="22" height="22" loading="lazy" decoding="async"></span>
                      <span class="rb-social-presence__title-icon rb-social-presence__title-icon--emoji rb-social-presence__title-icon--fire" style="--i: 3"><span class="rb-social-presence__title-emoji">🔥</span></span>
                      <span class="rb-social-presence__title-icon" style="--i: 4"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/social/facebook.svg" alt="" width="22" height="22" loading="lazy" decoding="async"></span>
                      <span class="rb-social-presence__title-icon rb-social-presence__title-icon--emoji rb-social-presence__title-icon--crown" style="--i: 5"><span class="rb-social-presence__title-emoji">👑</span></span>
                      <span class="rb-social-presence__title-icon" style="--i: 6"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/social/youtube.svg" alt="" width="22" height="22" loading="lazy" decoding="async"></span>
                      <span class="rb-social-presence__title-icon rb-social-presence__title-icon--emoji rb-social-presence__title-icon--kiss" style="--i: 7"><span class="rb-social-presence__title-emoji">😘</span></span>
                      <span class="rb-social-presence__title-icon" style="--i: 8"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/social/google.svg" alt="" width="22" height="22" loading="lazy" decoding="async"></span>
                      <span class="rb-social-presence__title-icon rb-social-presence__title-icon--emoji rb-social-presence__title-icon--sparkle" style="--i: 9"><span class="rb-social-presence__title-emoji">✨</span></span>
                    </span>
                  </span>
                </h2>
                <p class="neo-body rb-social-presence__lead">See real results, behind-the-scenes moments, and salon tips from our team. Follow and like us on your favourite channels, leave a review if we have looked after you, and message us anytime with ideas or suggestions.</p>
                <ul class="rb-social-presence__pills" aria-label="Ways to connect">
                  <li class="rb-social-presence__pill rb-social-presence__pill--follow">
                    <span class="rb-social-presence__pill-icon" aria-hidden="true">
                      <img src="<?php echo get_template_directory_uri(); ?>/assets/images/social/tiktok.svg" alt="" width="14" height="14" loading="lazy" decoding="async">
                    </span>
                    <span class="rb-social-presence__pill-label">Follow</span>
                  </li>
                  <li class="rb-social-presence__pill rb-social-presence__pill--like">
                    <span class="rb-social-presence__pill-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </span>
                    <span class="rb-social-presence__pill-label">Like</span>
                  </li>
                  <li class="rb-social-presence__pill rb-social-presence__pill--review">
                    <span class="rb-social-presence__pill-icon" aria-hidden="true">
                      <img src="<?php echo get_template_directory_uri(); ?>/assets/images/social/google.svg" alt="" width="14" height="14" loading="lazy" decoding="async">
                    </span>
                    <span class="rb-social-presence__pill-label">Review</span>
                  </li>
                  <li class="rb-social-presence__pill rb-social-presence__pill--suggest">
                    <span class="rb-social-presence__pill-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v4l4-4h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4 9H8v-2h8v2zm0-4H8V5h8v2z"/></svg>
                    </span>
                    <span class="rb-social-presence__pill-label">Suggest</span>
                  </li>
                </ul>
              </header>
              </div>

              <div class="neo-social-card-section__inner rb-social-presence__inner rb-social-presence__card-slot">
          <div class="neo-social-card rb-social-live" data-neo-reveal>
            <div class="neo-social-card__screen rb-social-live__screen">
              <div class="neo-social-card__media rb-social-live__media">
                <img
                  class="neo-social-card__bg rb-social-live__bg"
                  data-neo-social-img="background"
                  src="<?php echo get_template_directory_uri(); ?>/assets/images/hero-2.jpg"
                  alt=""
                  width="720"
                  height="1196"
                  loading="lazy"
                  decoding="async"
                >
              </div>
              <div class="neo-social-card__scrim rb-social-live__scrim" aria-hidden="true"></div>
              <div class="neo-social-card__vignette rb-social-live__vignette" aria-hidden="true"></div>
      
              <header class="neo-social-card__host rb-social-live__host">
                <a class="neo-social-card__host-link rb-social-live__host-link" data-neo-social-link="tiktok" href="#" target="_blank" rel="noopener noreferrer">
                  <img class="neo-social-card__host-avatar rb-social-live__host-avatar" data-neo-social-img="avatar-host" src="<?php echo get_template_directory_uri(); ?>/assets/images/hero-2.jpg" alt="" width="80" height="80" loading="lazy" decoding="async">
                  <span class="neo-social-card__host-body rb-social-live__host-body">
                    <span class="neo-social-card__host-row rb-social-live__host-row">
                      <span class="neo-social-card__badge rb-social-live__badge"><span class="neo-social-card__badge-dot rb-social-live__badge-dot"></span> Live</span>
                      <span class="neo-social-card__viewers rb-social-live__viewers" data-neo-social-viewers data-rb-social-viewers>248 watching</span>
                    </span>
                    <span class="neo-social-card__host-name rb-social-live__host-name" data-neo-social-handle>@radiance_glamour</span>
                  </span>
                </a>
                <h2 class="neo-social-card__sr-title rb-social-live__sr-title" id="neo-social-card-title" data-neo-social-title>Stay in the glow with us online</h2>
              </header>
      
              <div class="neo-social-card__chat-wrap rb-social-live__chat-wrap" aria-hidden="true">
                <ul class="neo-social-card__chat rb-social-live__chat" data-neo-social-chat data-rb-social-live-chat role="list"></ul>
              </div>
      
              <div class="neo-social-card__like-lane rb-social-live__like-lane" data-neo-social-likes data-rb-social-live-likes aria-hidden="true"></div>
              <div class="neo-social-card__gift-lane rb-social-live__gift-lane" data-neo-social-gifts data-rb-social-live-gifts aria-hidden="true"></div>
              <div class="neo-social-card__toast-stage rb-social-live__toast-stage" data-neo-social-toast data-rb-social-live-toast aria-hidden="true"></div>
      
              <nav class="neo-social-card__rail rb-social-live__rail" aria-label="Follow us online">
                <a class="neo-social-card__action rb-social-live__action rb-social-live__action--avatar rb-social-live__action--tiktok" data-neo-rail-touch data-rb-rail-touch data-neo-social-link="tiktok" href="#" target="_blank" rel="noopener noreferrer" aria-label="Follow on TikTok">
                  <img data-neo-social-img="avatar-rail" src="<?php echo get_template_directory_uri(); ?>/assets/images/hero-2.jpg" alt="" width="64" height="64" loading="lazy" decoding="async">
                  <span class="neo-social-card__follow-plus rb-social-live__follow-plus" aria-hidden="true">+</span>
                </a>
                <button class="neo-social-card__action rb-social-live__action rb-social-live__action--heart" type="button" data-neo-rail-touch data-rb-rail-touch data-neo-social-heart data-rb-social-heart aria-label="Send love">
                  <span class="neo-social-card__rail-icon rb-social-live__rail-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  </span>
                  <span class="neo-social-card__action-count rb-social-live__action-count" data-neo-social-heart-count data-rb-social-heart-count>128</span>
                </button>
                <a class="neo-social-card__action rb-social-live__action rb-social-live__action--instagram" data-neo-rail-touch data-rb-rail-touch data-neo-social-link="instagram" href="#" target="_blank" rel="noopener noreferrer" aria-label="Follow on Instagram">
                  <span class="neo-social-card__rail-icon rb-social-live__rail-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v4l4-4h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4 9H8v-2h8v2zm0-4H8V5h8v2z"/></svg>
                  </span>
                  <span class="neo-social-card__action-count rb-social-live__action-count" data-neo-social-stat="comments" data-rb-rail-count>322</span>
                </a>
                <a class="neo-social-card__action rb-social-live__action rb-social-live__action--facebook" data-neo-rail-touch data-rb-rail-touch data-neo-social-link="facebook" href="#" target="_blank" rel="noopener noreferrer" aria-label="Follow on Facebook">
                  <span class="neo-social-card__rail-icon rb-social-live__rail-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
                  </span>
                  <span class="neo-social-card__action-count rb-social-live__action-count" data-neo-social-stat="bookmarks" data-rb-rail-count>1.2K</span>
                </a>
                <a class="neo-social-card__action rb-social-live__action rb-social-live__action--youtube" data-neo-rail-touch data-rb-rail-touch data-neo-social-link="youtube" href="#" target="_blank" rel="noopener noreferrer" aria-label="Watch on YouTube">
                  <span class="neo-social-card__rail-icon rb-social-live__rail-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
                  </span>
                  <span class="neo-social-card__action-count rb-social-live__action-count" data-neo-social-stat="shares" data-rb-rail-count>48</span>
                </a>
                <a class="neo-social-card__action rb-social-live__action rb-social-live__action--disc rb-social-live__action--google" data-neo-rail-touch data-rb-rail-touch data-neo-social-link="googleReview" href="#" target="_blank" rel="noopener noreferrer" aria-label="Leave a Google review">
                  <span class="neo-social-card__disc rb-social-live__disc" aria-hidden="true">
                    <img data-neo-social-img="avatar-disc" src="<?php echo get_template_directory_uri(); ?>/assets/images/hero-2.jpg" alt="" width="40" height="40" loading="lazy" decoding="async">
                  </span>
                </a>
              </nav>
      
              <div class="neo-social-card__footer rb-social-live__footer">
                <p class="neo-social-card__caption rb-social-live__caption" data-neo-social-caption>Transformations, behind-the-scenes and offers.</p>
                <nav class="neo-social-card__channels rb-social-live__channels" aria-label="Follow us online">
                  <a class="neo-social-card__channel rb-social-live__channel" data-neo-social-link="tiktok" href="#" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                    <span class="neo-social-card__channel-icon rb-social-live__channel-icon"><img data-neo-social-channel-icon="tiktok" src="<?php echo get_template_directory_uri(); ?>/assets/images/social/tiktok.svg" alt="" width="48" height="48" loading="lazy" decoding="async"></span>
                  </a>
                  <a class="neo-social-card__channel rb-social-live__channel" data-neo-social-link="instagram" href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <span class="neo-social-card__channel-icon rb-social-live__channel-icon"><img data-neo-social-channel-icon="instagram" src="<?php echo get_template_directory_uri(); ?>/assets/images/social/instagram.svg" alt="" width="48" height="48" loading="lazy" decoding="async"></span>
                  </a>
                  <a class="neo-social-card__channel rb-social-live__channel" data-neo-social-link="facebook" href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <span class="neo-social-card__channel-icon rb-social-live__channel-icon"><img data-neo-social-channel-icon="facebook" src="<?php echo get_template_directory_uri(); ?>/assets/images/social/facebook.svg" alt="" width="48" height="48" loading="lazy" decoding="async"></span>
                  </a>
                  <a class="neo-social-card__channel rb-social-live__channel" data-neo-social-link="youtube" href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <span class="neo-social-card__channel-icon rb-social-live__channel-icon"><img data-neo-social-channel-icon="youtube" src="<?php echo get_template_directory_uri(); ?>/assets/images/social/youtube.svg" alt="" width="48" height="48" loading="lazy" decoding="async"></span>
                  </a>
                  <a class="neo-social-card__channel rb-social-live__channel" data-neo-social-link="googleReview" href="#" target="_blank" rel="noopener noreferrer" aria-label="Google review">
                    <span class="neo-social-card__channel-icon rb-social-live__channel-icon"><img data-neo-social-channel-icon="googleReview" src="<?php echo get_template_directory_uri(); ?>/assets/images/social/google.svg" alt="" width="48" height="48" loading="lazy" decoding="async"></span>
                  </a>
                </nav>
                <p class="neo-social-card__cta rb-social-live__cta neo-body" data-neo-social-cta>Tap an icon to follow, watch, or review us.</p>
              </div>
            </div>
          </div>
              </div>
            </div>

            <aside class="rb-social-presence__aside" data-neo-reveal>
              <div class="rb-social-presence__panel rb-social-presence__ticket" role="group" aria-label="Social links and client reviews">
                <div class="rb-social-presence__ticket-body">
                <div class="rb-social-presence__ticket-zone rb-social-presence__ticket-zone--intro">
                  <header class="rb-social-presence__ticket-brand">
                    <p class="rb-social-presence__ticket-mark">Your invite</p>
                    <h3 class="rb-social-presence__ticket-headline">Join us online</h3>
                    <p class="rb-social-presence__ticket-lead">Tap a channel to follow, watch, or leave a review.</p>
                  </header>

                  <nav class="rb-social-presence__channels" aria-label="Social channels">
                    <a class="rb-social-presence__channel" href="#" data-neo-social-link="tiktok" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                      <span class="rb-social-presence__channel-icon"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/social/tiktok.svg" alt="" width="20" height="20" loading="lazy" decoding="async"></span>
                      <span class="rb-social-presence__channel-copy"><span class="rb-social-presence__channel-name">TikTok</span></span>
                    </a>
                    <a class="rb-social-presence__channel" href="#" data-neo-social-link="instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <span class="rb-social-presence__channel-icon"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/social/instagram.svg" alt="" width="20" height="20" loading="lazy" decoding="async"></span>
                      <span class="rb-social-presence__channel-copy"><span class="rb-social-presence__channel-name">Instagram</span></span>
                    </a>
                    <a class="rb-social-presence__channel" href="#" data-neo-social-link="facebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <span class="rb-social-presence__channel-icon"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/social/facebook.svg" alt="" width="20" height="20" loading="lazy" decoding="async"></span>
                      <span class="rb-social-presence__channel-copy"><span class="rb-social-presence__channel-name">Facebook</span></span>
                    </a>
                    <a class="rb-social-presence__channel" href="#" data-neo-social-link="linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <span class="rb-social-presence__channel-icon"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/social/linkedin.svg" alt="" width="20" height="20" loading="lazy" decoding="async"></span>
                      <span class="rb-social-presence__channel-copy"><span class="rb-social-presence__channel-name">LinkedIn</span></span>
                    </a>
                    <a class="rb-social-presence__channel" href="#" data-neo-social-link="youtube" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                      <span class="rb-social-presence__channel-icon"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/social/youtube.svg" alt="" width="20" height="20" loading="lazy" decoding="async"></span>
                      <span class="rb-social-presence__channel-copy"><span class="rb-social-presence__channel-name">YouTube</span></span>
                    </a>
                  </nav>
                </div>

                <div class="rb-social-presence__ticket-divider">
                  <span class="rb-social-presence__ticket-divider-line" aria-hidden="true"></span>
                  <p class="rb-social-presence__ticket-stars" role="img" aria-label="Five star rated">
                    <svg class="rb-social-presence__ticket-star" viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.77l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z"/></svg>
                    <svg class="rb-social-presence__ticket-star" viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.77l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z"/></svg>
                    <svg class="rb-social-presence__ticket-star" viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.77l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z"/></svg>
                    <svg class="rb-social-presence__ticket-star" viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.77l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z"/></svg>
                    <svg class="rb-social-presence__ticket-star" viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.77l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z"/></svg>
                  </p>
                  <span class="rb-social-presence__ticket-divider-line" aria-hidden="true"></span>
                </div>

                <div class="rb-social-presence__ticket-zone rb-social-presence__ticket-zone--reviews rb-social-presence__reviews">
                  <h3 class="rb-social-presence__reviews-title">Client reviews</h3>
                  <div class="rb-social-presence__review-grid">
                    <a class="rb-social-presence__review-card" href="/testimonials/" data-neo-social-review="treatwell" aria-label="Rated 4.4 out of 5 from 322 Treatwell reviews">
                      <span class="rb-social-presence__review-brand">Treatwell</span>
                      <div class="rb-social-presence__review-score-row">
                        <span class="rb-social-presence__review-score" data-neo-social-review-score="treatwell">4.4</span>
                        <span class="rb-social-presence__review-stars" data-neo-social-review-stars="treatwell" aria-hidden="true"></span>
                      </div>
                      <p class="rb-social-presence__review-meta" data-neo-social-review-meta="treatwell">322 verified reviews</p>
                    </a>
                    <a class="rb-social-presence__review-card rb-social-presence__review-card--google" href="#" data-neo-social-link="googleReview" data-neo-social-review="google" aria-label="Rated 4.6 out of 5 from 54 Google reviews">
                      <span class="rb-social-presence__review-brand">
                        <img class="rb-social-presence__review-brand-icon" src="<?php echo get_template_directory_uri(); ?>/assets/images/social/google.svg" alt="" width="18" height="18" loading="lazy" decoding="async">
                        Google
                      </span>
                      <div class="rb-social-presence__review-score-row">
                        <span class="rb-social-presence__review-score" data-neo-social-review-score="google">4.6</span>
                        <span class="rb-social-presence__review-stars" data-neo-social-review-stars="google" aria-hidden="true"></span>
                      </div>
                      <p class="rb-social-presence__review-meta" data-neo-social-review-meta="google">54 Google reviews</p>
                    </a>
                  </div>
                </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

    </main>

<?php get_footer(); ?>
