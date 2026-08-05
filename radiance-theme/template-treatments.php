<?php
/*
Template Name: Radiance - Treatments
*/
get_header();
?>

<main id="neo-main" class="neo-page__main" tabindex="-1">
      <nav aria-label="Breadcrumb" class="neo-breadcrumbs-wrap">
        <ol class="neo-breadcrumbs">
          <li><a href="/">Home</a></li>
          <li aria-current="page">Treatments</li>
        </ol>
      </nav>
      <div class="neo-container rb-page-hero rb-page-hero--treatments">
        <div class="rb-treat-hero__layout" data-neo-reveal>
          <div class="rb-treat-hero__intro">
            <p class="rb-treat-hero__kicker">The treatment menu</p>
            <h1 class="neo-h1 rb-page-hero__title">Treatments &amp; prices</h1>
            <p class="neo-body rb-treat-hero__lead">Hair, beauty, nails and more under one roof.</p>
            <p class="neo-body rb-treat-hero__note">Prices shown are guide prices and may vary by stylist or therapist. Send a booking request on our website and we will confirm by phone.</p>
          </div>

          <aside class="rb-treat-hero__index" aria-labelledby="rb-treat-index-label">
            <p class="rb-treat-hero__index-label" id="rb-treat-index-label">Jump to a section</p>
            <nav class="rb-treat-jump" aria-label="Treatment categories">
              <a href="#hair" class="rb-treat-jump__chip">Hair</a>
              <a href="#face" class="rb-treat-jump__chip">Face &amp; skin</a>
              <a href="#clinic" class="rb-treat-jump__chip">Aesthetic clinic</a>
              <a href="#nails" class="rb-treat-jump__chip">Nails</a>
              <a href="#waxing" class="rb-treat-jump__chip">Waxing</a>
              <a href="#laser" class="rb-treat-jump__chip">Laser</a>
              <a href="#massage" class="rb-treat-jump__chip">Massage &amp; body</a>
            </nav>
          </aside>
        </div>

        <div class="neo-pricelist neo-pricelist--menu">

          <div class="neo-pricelist__col">
          <div class="neo-price-card" id="hair">
            <h2 class="neo-price-card__title neo-h3">Hair</h2>
            <p class="neo-price-card__intro">Ladies&rsquo; cuts, colour and treatments from our experienced team in Prince&rsquo;s Street.</p>
            <div class="neo-price-row neo-price-row--bookable">
              <p class="neo-price-row__name">Ladies&rsquo; haircuts</p>
              <span class="neo-price-row__price">From &pound;10</span>
              <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=ladies-haircuts">Book</a>
            </div>
            <div class="neo-price-row neo-price-row--bookable">
              <p class="neo-price-row__name">Colour &amp; highlights</p>
              <span class="neo-price-row__price">From &pound;15</span>
              <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=colour-highlights">Book</a>
            </div>
            <div class="neo-price-row neo-price-row--bookable">
              <p class="neo-price-row__name">Hair treatments</p>
              <span class="neo-price-row__price">From &pound;35</span>
              <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=hair-treatments">Book</a>
            </div>
          </div>

          <aside class="rb-treat-aside" aria-labelledby="rb-treat-aside-hair-title">
            <h3 class="rb-treat-aside__title neo-h4" id="rb-treat-aside-hair-title">Hair colour &amp; cuts in Stockport</h3>
            <p class="rb-treat-aside__body">Our stylists on Prince&rsquo;s Street offer ladies&rsquo; cuts, colour and highlights. A patch test is required before colour services if you are new or changing formula.</p>
            <p class="rb-treat-aside__body">Radiance Glamour Lounge is in Merseyway Shopping Centre, Stockport SK1 1SE.</p>
            <a href="/reviews/" class="rb-treat-aside__link">Read client reviews</a>
          </aside>

          <div class="neo-price-card neo-price-card--spotlight" id="clinic">
            <h2 class="neo-price-card__title neo-h3">Aesthetic clinic</h2>
            <p class="neo-price-card__intro">Injectables, PRP, plasma pen and advanced rejuvenation. Full prices and treatment detail live on our clinic page.</p>
            <div class="neo-price-card__cta">
              <a href="/clinic/" class="neo-price-card__cta-btn">View full clinic menu</a>
            </div>
            <div class="neo-price-card__body">
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Clinic consultation</p>
                <span class="neo-price-row__price">Consult</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/request-appointment/?treatment=clinic-consultation">Book</a>
              </div>
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Cosmetic injectables</p>
                <span class="neo-price-row__price">From &pound;27</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=cosmetic-injectables">Book</a>
              </div>
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">PRP vampire facial</p>
                <span class="neo-price-row__price">From &pound;179</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=prp-vampire-facial">Book</a>
              </div>
            </div>
          </div>
          </div>

          <div class="neo-pricelist__col">
          <div class="neo-price-card" id="face">
            <h2 class="neo-price-card__title neo-h3">Face &amp; skin</h2>
            <p class="neo-price-card__intro">Facials, microneedling, brows, lashes and makeup. For injectables and advanced aesthetics, explore our dedicated clinic menu.</p>
            <div class="neo-price-card__cta">
              <a href="/clinic/" class="neo-price-card__cta-btn">Explore aesthetic clinic</a>
            </div>
            <div class="neo-price-card__body">
            <div class="neo-price-row neo-price-row--bookable">
              <p class="neo-price-row__name">Ladies&rsquo; facials</p>
              <span class="neo-price-row__price">From &pound;20</span>
              <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=ladies-facials">Book</a>
            </div>
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
              <p class="neo-price-row__name">Eyebrows &amp; lashes</p>
              <span class="neo-price-row__price">From &pound;7</span>
              <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=eyebrows-lashes">Book</a>
            </div>
            <div class="neo-price-row neo-price-row--bookable">
              <p class="neo-price-row__name">Makeup</p>
              <span class="neo-price-row__price">From &pound;45</span>
              <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=makeup">Book</a>
            </div>
            </div>
          </div>

          <div class="neo-price-card" id="nails">
            <h2 class="neo-price-card__title neo-h3">Nails</h2>
            <p class="neo-price-card__intro">Manicures, pedicures, gel nails and nail art for a polished finish.</p>
            <div class="neo-price-row neo-price-row--bookable">
              <p class="neo-price-row__name">Nail services</p>
              <span class="neo-price-row__price">From &pound;10</span>
              <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=nail-services">Book</a>
            </div>
          </div>

          <aside class="rb-treat-aside" aria-labelledby="rb-treat-aside-nails-title">
            <h3 class="rb-treat-aside__title neo-h4" id="rb-treat-aside-nails-title">Manicures &amp; gel nails</h3>
            <p class="rb-treat-aside__body">Classic manicures, gel polish and nail art, with pedicures for a full finish. Allow extra time for gel removals, infills or detailed nail art when you book.</p>
            <p class="rb-treat-aside__body">Browse our gallery for recent nail work, or send a booking request with the look you have in mind.</p>
            <a href="/#gallery" class="rb-treat-aside__link">See our gallery</a>
          </aside>
          </div>

          <div class="neo-price-card neo-price-card--wide" id="waxing">
            <h2 class="neo-price-card__title neo-h3">Waxing</h2>
            <p class="neo-price-card__intro">Warm wax and hot wax for smooth, long-lasting results.</p>
            <div class="neo-price-card__body">
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Hair removal</p>
                <span class="neo-price-row__price">From &pound;5</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=hair-removal">Book</a>
              </div>
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Underarm wax</p>
                <span class="neo-price-row__price">&pound;8.50</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=underarm-wax">Book</a>
              </div>
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Bikini wax</p>
                <span class="neo-price-row__price">&pound;10.20</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=bikini-wax">Book</a>
              </div>
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Half leg wax</p>
                <span class="neo-price-row__price">&pound;17</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=half-leg-wax">Book</a>
              </div>
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Full leg wax</p>
                <span class="neo-price-row__price">&pound;21.25</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=full-leg-wax">Book</a>
              </div>
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Full body warm wax</p>
                <span class="neo-price-row__price">&pound;72.25</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=full-body-warm-wax">Book</a>
              </div>
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Hot wax Brazilian / Hollywood</p>
                <span class="neo-price-row__price">&pound;25.50</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=hot-wax-brazilian-hollywood">Book</a>
              </div>
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Face wax (eyebrows)</p>
                <span class="neo-price-row__price">&pound;6.80</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=face-wax-eyebrows">Book</a>
              </div>
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Full face wax</p>
                <span class="neo-price-row__price">&pound;18.70</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=full-face-wax">Book</a>
              </div>
            </div>
          </div>

          <div class="neo-price-card" id="laser">
            <h2 class="neo-price-card__title neo-h3">Laser hair removal</h2>
            <p class="neo-price-card__intro">Long-lasting laser treatments for legs, body and more.</p>
            <div class="neo-price-card__body">
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Laser hair removal</p>
                <span class="neo-price-row__price">From &pound;21.25</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=laser-hair-removal">Book</a>
              </div>
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Laser half leg</p>
                <span class="neo-price-row__price">&pound;25.50</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=laser-half-leg">Book</a>
              </div>
              <div class="neo-price-row neo-price-row--bookable">
                <p class="neo-price-row__name">Laser full body</p>
                <span class="neo-price-row__price">&pound;136</span>
                <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=laser-full-body">Book</a>
              </div>
            </div>
          </div>

          <div class="neo-price-card" id="massage">
            <h2 class="neo-price-card__title neo-h3">Massage &amp; body</h2>
            <p class="neo-price-card__intro">Relaxing massage, body treatments and patch tests before colour or waxing where required.</p>
            <div class="neo-price-row neo-price-row--bookable">
              <p class="neo-price-row__name">Massage</p>
              <span class="neo-price-row__price">From &pound;18</span>
              <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=massage">Book</a>
            </div>
            <div class="neo-price-row neo-price-row--bookable">
              <p class="neo-price-row__name">Body treatments</p>
              <span class="neo-price-row__price">From &pound;25</span>
              <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=body-treatments">Book</a>
            </div>
            <div class="neo-price-row neo-price-row--bookable">
              <p class="neo-price-row__name">Patch tests</p>
              <span class="neo-price-row__price">&pound;10</span>
              <a class="neo-price-row__book neo-btn neo-btn--secondary neo-btn--sm" href="/book/?treatment=patch-test">Book</a>
            </div>
          </div>

        </div>

        <section class="rb-book-cta-card" data-neo-reveal aria-labelledby="rb-book-cta-heading">
          <div class="rb-book-cta-card__surface">
            <div class="rb-book-cta-card__content">
              <h2 class="rb-book-cta-card__title neo-h3" id="rb-book-cta-heading">Ready to book?</h2>
              <p class="rb-book-cta-card__body">Choose your treatment and send a booking request on our website, or call us if you have questions first.</p>
            </div>
            <div class="rb-book-cta-card__actions">
              <a href="/book/" class="neo-btn neo-btn--primary">Book online</a>
              <a href="tel:07857579631" class="neo-btn neo-btn--secondary">Call 07857 579631</a>
            </div>
          </div>
        </section>
      </div>
    </main>

<?php get_footer(); ?>
