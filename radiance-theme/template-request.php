<?php
/*
Template Name: Radiance - Request Appointment
*/
get_header();
?>

<main id="neo-main" class="neo-page__main" tabindex="-1">
      <nav aria-label="Breadcrumb" class="neo-breadcrumbs-wrap">
        <ol class="neo-breadcrumbs">
          <li><a href="/">Home</a></li>
          <li aria-current="page">Request an Appointment</li>
        </ol>
      </nav>
      <div class="neo-container rb-page-hero">
        <p class="rb-eyebrow">Book now</p>
        <h1 class="neo-h1 rb-page-hero__title">Request an appointment</h1>
        <p class="neo-body rb-muted rb-page-hero__lead">Tell us what you would like and when suits you. This is a booking request, not a confirmed time. We will call you on the number you provide to confirm your appointment.</p>

        <div class="rb-booking-grid">
          <section class="neo-card neo-surface-raised rb-page-card" aria-labelledby="rb-book-form-title">
            <h2 class="neo-h3" id="rb-book-form-title">Your booking request</h2>
            <p class="neo-caption">Fields marked with * are required.</p>

            <!-- SAVVI POS live booking widget (hydrates when the plugin API is reachable). -->
            <div data-savvi-mount="book" data-api="/wp-json/savvi-pos/v1" data-currency="&pound;" hidden></div>

            <!-- Fallback booking request form (used when the widget cannot load). -->
            <form class="neo-form neo-form--validate rb-booking-form" id="rgl-booking-form" action="https://formsubmit.co/ajax/info@radianceglamourlounge.com" method="POST" data-savvi-fallback data-neo-form-live>
              <input type="hidden" name="_subject" value="New booking request — Radiance Glamour Lounge">
              <input type="hidden" name="_captcha" value="false">
              <input type="hidden" name="_template" value="table">
              <div class="rb-form-row rb-form-row--2">
                <label class="neo-field">
                  <span class="neo-field__label">Full name *</span>
                  <input class="neo-input" type="text" name="name" autocomplete="name" required>
                </label>
                <label class="neo-field">
                  <span class="neo-field__label">Phone *</span>
                  <input class="neo-input" type="tel" name="phone" autocomplete="tel" required>
                </label>
              </div>
              <label class="neo-field">
                <span class="neo-field__label">Email</span>
                <input class="neo-input" type="email" name="email" autocomplete="email" placeholder="Optional, if you prefer email confirmation">
              </label>
              <label class="neo-field">
                <span class="neo-field__label">Treatment *</span>
                <select class="neo-select" name="treatment" id="rgl-treatment-select" required>
                  <option value="" disabled selected>Choose a treatment</option>
                  <optgroup label="Consultation">
                    <option value="consultation">Consultation (not sure where to start)</option>
                    <option value="consultation-nabila">Consultation with Nabila (Salon Owner)</option>
                  </optgroup>
                  <optgroup label="Hair">
                    <option value="ladies-haircuts">Ladies&rsquo; haircuts</option>
                    <option value="colour-highlights">Colour &amp; highlights</option>
                    <option value="hair-treatments">Hair treatments</option>
                  </optgroup>
                  <optgroup label="Face &amp; skin">
                    <option value="ladies-facials">Ladies&rsquo; facials</option>
                    <option value="microneedling-basic">Microneedling Basic</option>
                    <option value="microneedling-deluxe">Microneedling Deluxe</option>
                    <option value="eyebrows-lashes">Eyebrows &amp; lashes</option>
                    <option value="makeup">Makeup</option>
                  </optgroup>
                  <optgroup label="Aesthetic clinic">
                    <option value="clinic-consultation">Aesthetic clinic consultation</option>
                    <option value="cosmetic-injectables">Cosmetic injectables</option>
                    <option value="cosmetic-injectables-package">Cosmetic injectables &amp; treatments</option>
                    <option value="prp-vampire-facial">PRP vampire facial</option>
                    <option value="vampire-facelift">Vampire face lift</option>
                    <option value="plasma-pen">Plasma pen</option>
                    <option value="plasma-pen-scars">Plasma pen for scars</option>
                    <option value="hand-treatment">Hand treatment</option>
                    <option value="foot-treatment">Foot treatment</option>
                  </optgroup>
                  <optgroup label="Nails">
                    <option value="nail-services">Nail services</option>
                  </optgroup>
                  <optgroup label="Waxing &amp; laser">
                    <option value="hair-removal">Hair removal</option>
                    <option value="underarm-wax">Underarm wax</option>
                    <option value="bikini-wax">Bikini wax</option>
                    <option value="half-leg-wax">Half leg wax</option>
                    <option value="full-leg-wax">Full leg wax</option>
                    <option value="full-body-warm-wax">Full body warm wax</option>
                    <option value="hot-wax-brazilian-hollywood">Hot wax Brazilian / Hollywood</option>
                    <option value="face-wax-eyebrows">Face wax (eyebrows)</option>
                    <option value="full-face-wax">Full face wax</option>
                    <option value="laser-hair-removal">Laser hair removal</option>
                    <option value="laser-half-leg">Laser half leg</option>
                    <option value="laser-full-body">Laser full body</option>
                  </optgroup>
                  <optgroup label="Massage &amp; body">
                    <option value="massage">Massage</option>
                    <option value="body-treatments">Body treatments</option>
                    <option value="patch-test">Patch tests</option>
                  </optgroup>
                </select>
              </label>
              <div class="rb-form-row rb-form-row--2">
                <label class="neo-field">
                  <span class="neo-field__label">Preferred date</span>
                  <input class="neo-input" type="date" name="preferred_date">
                </label>
                <label class="neo-field">
                  <span class="neo-field__label">Preferred time</span>
                  <select class="neo-select" name="preferred_time">
                    <option value="" selected>No preference</option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                </label>
              </div>
              <label class="neo-field">
                <span class="neo-field__label">Anything else?</span>
                <textarea class="neo-input" name="message" rows="4" placeholder="Tell us about previous treatments, what you would like, or any questions."></textarea>
              </label>
              <label class="neo-toggle-field rb-booking-form__consent">
                <span class="neo-toggle">
                  <input type="checkbox" name="consent" required>
                  <span class="neo-toggle__track"><span class="neo-toggle__fill"></span><span class="neo-toggle__knob"></span></span>
                </span>
                <span class="neo-toggle-field__label neo-body">I consent to being contacted about my booking request. See our <a href="/privacy/">Privacy Policy</a>.</span>
              </label>
              <button type="submit" class="neo-btn neo-btn--primary">Send booking request</button>
              <p class="rb-booking-note">Prefer to talk? Call <a href="tel:07857579631">07857 579631</a> or message us on <a href="https://www.instagram.com/radiance_glamour_lounge/" target="_blank" rel="noopener noreferrer">Instagram</a>. Patch tests may be required for some treatments. See our <a href="/terms/">Terms</a>.</p>
            </form>
            <div id="rgl-booking-thanks" class="neo-card neo-surface-inset rb-booking-thanks" hidden>
              <h3 class="neo-h3">Request received</h3>
              <p class="neo-body rb-muted">Thank you. We will call you shortly to confirm your appointment. If you need to reach us sooner, call <a href="tel:07857579631">07857 579631</a>.</p>
            </div>
          </section>

          <aside class="neo-card neo-surface-raised rb-booking-aside" aria-labelledby="rb-book-how-title">
            <h2 class="rb-booking-aside__title" id="rb-book-how-title">How booking works</h2>
            <ol class="rb-booking-steps">
              <li><span><strong>Send your request.</strong> Pick a treatment and a time that suits you.</span></li>
              <li><span><strong>We confirm.</strong> We will call you to agree the appointment.</span></li>
              <li><span><strong>Visit the salon.</strong> 12-16 Prince&rsquo;s St, Stockport SK1 1SE, Merseyway Shopping Centre.</span></li>
              <li><span><strong>Patch tests.</strong> Some waxing, tinting and laser treatments need a patch test first.</span></li>
            </ol>
            <div class="rb-booking-aside__contact">
              <p class="neo-caption">Salon</p>
              <span class="neo-body">12-16 Prince&rsquo;s St, Stockport SK1 1SE</span>
              <a href="tel:07857579631">07857 579631</a>
              <a href="https://www.instagram.com/radiance_glamour_lounge/" target="_blank" rel="noopener noreferrer">@radiance_glamour_lounge</a>
            </div>
          </aside>
        </div>
      </div>
    </main>

<?php get_footer(); ?>
