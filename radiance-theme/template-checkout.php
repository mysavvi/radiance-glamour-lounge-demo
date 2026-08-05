<?php
/*
Template Name: Radiance - Checkout
*/
get_header();
?>

<main id="neo-main" class="neo-page__main" tabindex="-1">
      <div style="display:flex; justify-content:center; padding: 4rem 2rem;">
        <div class="checkout-layout">
    <div class="checkout-left">
      <div class="checkout-form-container">
        <header class="checkout-header" style="justify-content: space-between; width: 100%;">
          <a href="/" class="neo-mobile-header__brand">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo1.png" alt="Radiance Glamour Lounge" style="height: 72px; width: auto; max-width: 100%; object-fit: contain;">
          </a>
          <a href="/cart/" style="font-size: 0.875rem;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back to Cart
          </a>
        </header>

        <div style="background: var(--neo-bg-subtle); padding: 1rem 1.5rem; border-radius: var(--neo-radius-lg); margin-bottom: 2rem; display: flex; align-items: center; justify-content: space-between; border: 1px solid var(--neo-border-subtle);">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--neo-text-secondary);"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span class="neo-body" style="margin: 0; font-size: 0.875rem; color: var(--neo-text-primary);">Already a member?</span>
          </div>
          <a href="/login/?redirect=checkout/" class="neo-btn neo-btn--secondary neo-btn--sm" style="border-radius: var(--neo-radius-full); padding: 0.5rem 1rem;">Sign in for faster checkout</a>
        </div>

        <form action="book-success.html" method="GET">
          <h2 class="neo-h3" style="margin-top: 0; margin-bottom: 1.5rem;">Contact Information</h2>
          <div class="form-group">
            <label class="form-label" for="email">Email address</label>
            <input type="email" id="email" class="form-input" placeholder="you@example.com" autocomplete="email" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="phone">Phone number</label>
            <input type="tel" id="phone" class="form-input" placeholder="+44 7700 900000" autocomplete="tel" inputmode="tel" required>
          </div>

          <h2 class="neo-h3" style="margin-top: 2.5rem; margin-bottom: 1.5rem;">Shipping Address</h2>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="fname">First name</label>
              <input type="text" id="fname" class="form-input" autocomplete="given-name" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="lname">Last name</label>
              <input type="text" id="lname" class="form-input" autocomplete="family-name" required>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="address">Address</label>
            <input type="text" id="address" class="form-input" placeholder="123 Main St" autocomplete="street-address" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="city">City</label>
              <input type="text" id="city" class="form-input" autocomplete="address-level2" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="zip">Postal code</label>
              <input type="text" id="zip" class="form-input" autocomplete="postal-code" required>
            </div>
          </div>

          <h2 class="neo-h3" style="margin-top: 2.5rem; margin-bottom: 1.5rem;">Payment Details</h2>
          <div class="form-group">
            <label class="form-label" for="card">Card number</label>
            <div style="position: relative;">
              <input type="tel" id="card" class="form-input" placeholder="0000 0000 0000 0000" autocomplete="cc-number" inputmode="numeric" pattern="[\d ]{10,30}" style="padding-left: 3rem;" required>
              <svg style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--neo-text-muted);" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="exp">Expiration (MM/YY)</label>
              <input type="text" id="exp" class="form-input" placeholder="MM / YY" autocomplete="cc-exp" pattern="\d\d\s*/\s*\d\d" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="cvc">CVC</label>
              <input type="tel" id="cvc" class="form-input" placeholder="CVC" autocomplete="cc-csc" inputmode="numeric" pattern="\d{3,4}" required>
            </div>
          </div>

          <button type="submit" id="checkout-pay-btn" class="checkout-btn">Pay &pound;122.00</button>
        </form>
      </div>
    </div>

    <div class="checkout-right">
      <div class="checkout-summary-container">
        <h2 class="neo-h3" style="margin-top: 0; margin-bottom: 1.5rem;">Order Summary</h2>
        
        <div id="checkout-items-container" style="display: flex; flex-direction: column; gap: 1.5rem;">
          <!-- Handled by cart-ui.js -->
        </div>

        <div style="border-top: 1px solid var(--neo-border-subtle); padding-top: 1.5rem; margin-top: 1.5rem; display: flex; gap: 0.75rem;">
          <input type="text" class="form-input" placeholder="Discount code" style="flex: 1; padding: 0.75rem 1rem;">
          <button type="button" class="neo-btn neo-btn--secondary" style="border-radius: var(--neo-radius-md); padding: 0.75rem 1.25rem;">Apply</button>
        </div>

        <div style="border-top: 1px solid var(--neo-border-subtle); padding-top: 1.5rem; margin-top: 1.5rem; background: var(--neo-bg-base); padding: 1.25rem; border-radius: var(--neo-radius-lg); border: 1px solid var(--neo-border-subtle);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <div>
              <p class="summary-title" style="display: flex; align-items: center; gap: 0.5rem;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--neo-accent)" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--neo-accent);"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Glamour Points
              </p>
              <p class="neo-body rb-muted" style="margin: 0; font-size: 0.875rem;">You have <strong>500 points</strong> available.</p>
              <p class="neo-body rb-muted" style="margin: 0; font-size: 0.75rem; margin-top: 0.25rem;">
                <a href="#" style="color: var(--neo-accent); text-decoration: underline;">Sign in</a> to earn or redeem points.
              </p>
            </div>
          </div>
      </div>
    </main>

<?php get_footer(); ?>
