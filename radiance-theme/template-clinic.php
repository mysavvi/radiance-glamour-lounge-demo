<?php
/*
Template Name: Radiance - Clinic
*/
get_header();
?>

<main id="neo-main" class="neo-page__main" tabindex="-1">

      <nav aria-label="Breadcrumb" class="neo-breadcrumbs-wrap">
        <ol class="neo-breadcrumbs">
          <li><a href="/">Home</a></li>
          <li aria-current="page">Aesthetic clinic</li>
        </ol>
      </nav>

      <section class="rb-clinic-hero rb-section" aria-labelledby="rb-clinic-hero-title">
        <div class="neo-container">
          <div class="rb-clinic-hero__layout" data-neo-reveal>
            <div class="rb-clinic-hero__copy">
              <p class="rb-eyebrow">Aesthetic clinic</p>
              <h1 class="neo-h1" id="rb-clinic-hero-title">Medical aesthetics, inside the lounge</h1>
              <p class="neo-body rb-clinic-hero__lead">
                Advanced skin and facial treatments sit alongside our salon services. Every clinic appointment starts with a proper consultation so we understand your goals, skin, and medical history before we recommend anything.
              </p>
              <div class="rb-cta-row">
                <a href="/book/?treatment=clinic-consultation" class="neo-btn neo-btn--primary">Book a clinic consultation</a>
                <a href="treatments.html#clinic" class="neo-btn neo-btn--secondary">View clinic prices</a>
              </div>
            </div>
            <figure class="rb-clinic-hero__visual">
              <img src="<?php echo get_template_directory_uri(); ?>/assets/images/clinic-treatment.jpg" alt="Professional facial aesthetics treatment" width="1200" height="800" loading="eager" decoding="async">
              <figcaption class="rb-clinic-hero__badge">Consultation-led care</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section class="rb-clinic-trust neo-surface-inset rb-section" aria-label="Clinic standards">
        <div class="neo-container">
          <div class="rb-clinic-trust__grid" data-neo-reveal>
            <div class="rb-clinic-trust__item">
              <span class="rb-clinic-trust__icon" aria-hidden="true">01</span>
              <h2 class="neo-h4">Consultation first</h2>
              <p class="neo-body rb-muted">We assess your skin, discuss expectations, and agree a treatment plan before any advanced procedure.</p>
            </div>
            <div class="rb-clinic-trust__item">
              <span class="rb-clinic-trust__icon" aria-hidden="true">02</span>
              <h2 class="neo-h4">Experienced practitioners</h2>
              <p class="neo-body rb-muted">Medical aesthetics is delivered by trained team members, including salon owner Nabila Salman.</p>
            </div>
            <div class="rb-clinic-trust__item">
              <span class="rb-clinic-trust__icon" aria-hidden="true">03</span>
              <h2 class="neo-h4">Clear aftercare</h2>
              <p class="neo-body rb-muted">You leave with practical aftercare guidance and a point of contact if you have questions post-treatment.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="rb-section" aria-labelledby="rb-clinic-pillars-title">
        <div class="neo-container">
          <p class="rb-eyebrow">Treatment areas</p>
          <h2 class="neo-h2" id="rb-clinic-pillars-title">What we offer in clinic</h2>
          <p class="neo-body rb-muted rb-clinic-pillars__intro">Grouped by treatment type. Prices below are guide prices from our live menu and may vary after consultation.</p>

          <div class="rb-clinic-pillars" data-neo-reveal>
            <article class="rb-clinic-pillar neo-card neo-surface-raised">
              <h3 class="neo-h4">Injectables &amp; rejuvenation</h3>
              <p class="neo-body rb-muted">Cosmetic injectables, PRP vampire facial, and vampire face lift for volume, texture and radiance.</p>
              <a href="#clinic-injectables" class="neo-btn neo-btn--secondary">See prices</a>
            </article>
            <article class="rb-clinic-pillar neo-card neo-surface-raised">
              <h3 class="neo-h4">Plasma pen</h3>
              <p class="neo-body rb-muted">Non-surgical skin tightening and scar refinement using plasma fibroblast technology.</p>
              <a href="#clinic-plasma" class="neo-btn neo-btn--secondary">See prices</a>
            </article>
            <article class="rb-clinic-pillar neo-card neo-surface-raised">
              <h3 class="neo-h4">Skin &amp; body</h3>
              <p class="neo-body rb-muted">Microneedling, hand and foot rejuvenation, and targeted body aesthetics where listed.</p>
              <a href="#clinic-skin" class="neo-btn neo-btn--secondary">See prices</a>
            </article>
          </div>
        </div>
      </section>

      <section class="rb-section rb-clinic-menu" id="clinic-prices" aria-labelledby="rb-clinic-menu-title">
        <div class="neo-container">
          <p class="rb-eyebrow">Clinic menu</p>
          <h2 class="neo-h2" id="rb-clinic-menu-title">Treatments &amp; guide prices</h2>

          <div class="neo-pricelist neo-pricelist--clinic">

          <div class="neo-price-card" id="clinic-injectables">
            <h2 class="neo-price-card__title neo-h4">Injectables &amp; advanced facial</h2>
            <p class="neo-price-card__intro">Anti-wrinkle and filler treatments, plus PRP-based rejuvenation. Consultation required before your first injectable.</p>
            <div class="neo-price-card__body">
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Aesthetic clinic consultation</p>
                <span class="neo-price-row__price">Consult</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=clinic-consultation">Book</a>
                <p class="neo-price-row__desc">Book to discuss your goals and suitability.</p>
              </div>
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Cosmetic injectables</p>
                <span class="neo-price-row__price">From &pound;27</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=cosmetic-injectables">Book</a>
              </div>
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Cosmetic injectables &amp; treatments</p>
                <span class="neo-price-row__price">&pound;299</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=cosmetic-injectables-package">Book</a>
              </div>
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">PRP vampire facial</p>
                <span class="neo-price-row__price">From &pound;179</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=prp-vampire-facial">Book</a>
              </div>
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Vampire face lift</p>
                <span class="neo-price-row__price">&pound;199</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=vampire-facelift">Book</a>
                <p class="neo-price-row__desc">45 minutes.</p>
              </div>
            </div>
          </div>

          <div class="neo-pricelist__stack neo-pricelist__stack--clinic">
          <div class="neo-price-card" id="clinic-plasma">
            <h2 class="neo-price-card__title neo-h4">Plasma pen</h2>
            <p class="neo-price-card__intro">Fibroblast treatments for skin tightening and scar improvement.</p>
            <div class="neo-price-card__body">
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Plasma pen</p>
                <span class="neo-price-row__price">From &pound;199</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=plasma-pen">Book</a>
              </div>
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Plasma pen for scars</p>
                <span class="neo-price-row__price">&pound;199</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=plasma-pen-scars">Book</a>
                <p class="neo-price-row__desc">45 minutes.</p>
              </div>
            </div>
          </div>

          <aside class="rb-treat-aside rb-clinic-aside" aria-labelledby="rb-clinic-aside-plasma-title">
            <h3 class="rb-treat-aside__title neo-h4" id="rb-clinic-aside-plasma-title">Fibroblast skin tightening</h3>
            <p class="rb-treat-aside__body">Plasma pen uses controlled plasma energy to tighten loose skin and soften scarring. It is often chosen for eyelids, lines around the mouth, and selected scar areas.</p>
            <p class="rb-treat-aside__body">You may have redness and small carbon dots after treatment. Downtime varies by area treated. We confirm suitability, pricing and aftercare at your clinic consultation.</p>
            <a href="/book/?treatment=clinic-consultation" class="rb-treat-aside__link">Book a clinic consultation</a>
          </aside>
          </div>

          <div class="neo-price-card" id="clinic-skin">
            <h2 class="neo-price-card__title neo-h4">Skin rejuvenation &amp; body</h2>
            <p class="neo-price-card__intro">Microneedling, hand and foot care. Full face menu on our treatments page.</p>
            <div class="neo-price-card__cta">
              <a href="treatments.html#face" class="neo-price-card__cta-btn">View face &amp; skin menu</a>
            </div>
            <div class="neo-price-card__body">
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Microneedling Basic</p>
                <span class="neo-price-row__price">&pound;42.50</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=microneedling-basic">Book</a>
              </div>
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Microneedling Deluxe</p>
                <span class="neo-price-row__price">&pound;102</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=microneedling-deluxe">Book</a>
              </div>
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Hand treatment</p>
                <span class="neo-price-row__price">&pound;55</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=hand-treatment">Book</a>
                <p class="neo-price-row__desc">30 minutes.</p>
              </div>
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Foot treatment</p>
                <span class="neo-price-row__price">&pound;55</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=foot-treatment">Book</a>
                <p class="neo-price-row__desc">30 minutes.</p>
              </div>
            </div>
          </div>

          </div>
        </div>
      </section>

      <section class="rb-section rb-clinic-process" aria-labelledby="rb-clinic-process-title">
        <div class="neo-container">
          <p class="rb-eyebrow">Your appointment</p>
          <h2 class="neo-h2" id="rb-clinic-process-title">How clinic bookings work</h2>
          <ol class="rb-clinic-steps" data-neo-reveal>
            <li class="rb-clinic-step">
              <span class="rb-clinic-step__num" aria-hidden="true">1</span>
              <div>
                <h3 class="neo-h4">Send a booking request</h3>
                <p class="neo-body rb-muted">Choose your treatment or book a clinic consultation online. We confirm by phone with available times.</p>
              </div>
            </li>
            <li class="rb-clinic-step">
              <span class="rb-clinic-step__num" aria-hidden="true">2</span>
              <div>
                <h3 class="neo-h4">Consultation &amp; consent</h3>
                <p class="neo-body rb-muted">We review your medical history, explain the procedure, and answer questions before treatment begins.</p>
              </div>
            </li>
            <li class="rb-clinic-step">
              <span class="rb-clinic-step__num" aria-hidden="true">3</span>
              <div>
                <h3 class="neo-h4">Treatment &amp; aftercare</h3>
                <p class="neo-body rb-muted">Your practitioner carries out the treatment and gives you clear aftercare instructions to take home.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section class="rb-section rb-clinic-consult neo-surface-inset" aria-labelledby="rb-clinic-consult-title">
        <div class="neo-container">
          <div class="rb-clinic-consult__layout" data-neo-reveal>
            <div>
              <p class="rb-eyebrow">Lead practitioner</p>
              <h2 class="neo-h2" id="rb-clinic-consult-title">Book with Nabila Salman</h2>
              <p class="neo-body rb-muted">Nabila founded Radiance Glamour Lounge and leads medical aesthetics alongside the wider salon team. For complex goals or your first injectable visit, book a consultation with her directly.</p>
            </div>
            <div class="rb-clinic-consult__cta">
              <a href="/book/?treatment=consultation-nabila" class="neo-btn neo-btn--primary">Consultation with Nabila</a>
              <a href="index.html#nabila" class="neo-btn neo-btn--secondary">About Nabila</a>
            </div>
          </div>
        </div>
      </section>

      <section class="rb-section" aria-label="Important information">
        <div class="neo-container">
          <aside class="rb-clinic-disclaimer neo-card neo-surface-raised" data-neo-reveal>
            <h2 class="neo-h4">Important information</h2>
            <p class="neo-body rb-muted">All aesthetic treatments carry individual risk. Results vary by person, skin type, and lifestyle. A full consultation is required before injectable treatments. If you are pregnant, breastfeeding, or have a medical condition, tell us when you book so we can advise safely. This page is for information only and does not replace professional medical advice.</p>
          </aside>
        </div>
      </section>

    </main>

<?php get_footer(); ?>
