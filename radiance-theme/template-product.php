<?php
/*
Template Name: Radiance - Product
*/
get_header();
?>

<main id="neo-main" class="neo-page__main" tabindex="-1">
      <nav aria-label="Breadcrumb" class="neo-breadcrumbs-wrap">
        <ol class="neo-breadcrumbs">
          <li><a href="/">Home</a></li>
          <li><a href="/shop/">Shop</a></li>
          <li aria-current="page">Radiance Beauty Serum</li>
        </ol>
      </nav>
      <div class="neo-container" style="padding-top: 2rem; padding-bottom: 4rem;">
        <style>
          .neo-product-layout {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          @media (min-width: 768px) {
            .neo-product-layout {
              grid-template-columns: 1fr 1fr;
              gap: 4rem;
            }
          }
          .neo-carousel {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 1rem;
            scrollbar-width: none;
            -ms-overflow-style: none;
            border-radius: var(--neo-radius-2xl);
          }
          .neo-carousel::-webkit-scrollbar {
            display: none;
          }
          .neo-carousel-item {
            scroll-snap-align: center;
            container-type: scroll-state;
            flex: 0 0 100%;
            height: auto;
            position: relative;
          }
          .neo-carousel-card {
            transition: scale 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            border-radius: var(--neo-radius-2xl);
            aspect-ratio: 1/1;
            padding: 2rem;
          }
          @media (prefers-reduced-motion: no-preference) {
            @container scroll-state(snapped: x) {
              .neo-carousel-card {
                scale: 1.02;
              }
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .neo-carousel-card {
              transition: none !important;
              scale: 1 !important;
            }
          }
        </style>
        <div class="neo-product-layout" style="max-width: 1100px; margin: 0 auto;">
          <!-- Image Gallery -->
          <div style="position: relative;">
            <div class="neo-carousel neo-surface-inset">
              <div class="neo-carousel-item">
                <div class="neo-carousel-card">
                  <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo1.png" alt="Radiance Beauty Serum Image 1" style="width: 100%; max-width: 100%; height: auto; object-fit: contain;">
                </div>
              </div>
              <div class="neo-carousel-item">
                <div class="neo-carousel-card">
                  <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo1.png" alt="Radiance Beauty Serum Image 2" style="width: 100%; max-width: 100%; height: auto; object-fit: contain; filter: grayscale(1);">
                </div>
              </div>
              <div class="neo-carousel-item">
                <div class="neo-carousel-card">
                  <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo1.png" alt="Radiance Beauty Serum Image 3" style="width: 100%; max-width: 100%; height: auto; object-fit: contain; filter: sepia(1);">
                </div>
              </div>
            </div>
            <!-- Snap Indicators / Instructions -->
            <p class="neo-body rb-muted" style="text-align: center; font-size: 0.75rem; margin-top: 1rem;">Swipe or scroll to see more images</p>
          </div>

          <!-- Product Details -->
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div>
              <p class="neo-body rb-muted" style="font-size: var(--neo-text-sm); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem;">Skincare &middot; 50ml</p>
              <h1 class="neo-h2" style="margin-top: 0; margin-bottom: 0.5rem;">Radiance Beauty Serum</h1>
              <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0;">
                <div style="display: flex; align-items: center; gap: 1rem;">
                  <p id="product-price-display" data-unit-price="45.00" class="neo-h3" style="font-weight: 500; margin: 0;">&pound;45.00</p>
                  <span data-points-per-unit="45" style="display: inline-flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; font-weight: 600; background: var(--neo-bg-surface); padding: 0.25rem 0.5rem; border-radius: var(--neo-radius-full); color: var(--neo-text-secondary); border: 1px solid var(--neo-border-subtle);">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--neo-accent)" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--neo-accent);"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span id="product-points-text">Earn 45 Glamour Points</span>
                  </span>
                </div>
                <p class="neo-body rb-muted" style="margin: 0; font-size: 0.75rem;">
                  <a href="#" style="color: var(--neo-accent); text-decoration: underline;">Sign in</a> to earn and redeem Glamour Points.
                </p>
              </div>
            </div>
            
            <p class="neo-body rb-muted" style="line-height: 1.6;">
              A deeply hydrating, antioxidant-rich serum designed to restore your skin's natural glow. Formulated with our signature blend of botanical extracts, it penetrates quickly to smooth fine lines and improve elasticity.
            </p>

            <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
              <label class="neo-body" style="font-weight: 600; font-size: var(--neo-text-sm);">Quantity</label>
              <div style="display: inline-flex; align-items: center; border-radius: var(--neo-radius-full); border: var(--neo-border-1) solid var(--neo-border-subtle); background: var(--neo-bg-base); width: fit-content;">
                <button type="button" id="product-qty-minus" style="padding: 0.75rem 1rem; background: transparent; border: none; color: var(--neo-text-primary); cursor: pointer; border-radius: 9999px 0 0 9999px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
                <span id="product-qty-display" style="width: 3rem; text-align: center; font-size: var(--neo-text-base); font-weight: 600;">1</span>
                <button type="button" id="product-qty-plus" style="padding: 0.75rem 1rem; background: transparent; border: none; color: var(--neo-text-primary); cursor: pointer; border-radius: 0 9999px 9999px 0;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
              </div>
            </div>

            <div style="display: flex; gap: 1rem; margin-top: 1rem;">
              <button type="button" id="product-add-to-cart" class="neo-btn neo-btn--primary" data-id="radiance-beauty-serum" data-title="Radiance Beauty Serum" data-price="45.00" data-image="images/logo1.png" data-category="Skincare" data-size="50ml" style="flex: 1; justify-content: center; padding: 1.25rem; font-size: var(--neo-text-base); border-radius: var(--neo-radius-full); transition: all 0.3s ease;">Add to cart</button>
              <button type="button" class="neo-btn neo-btn--secondary" aria-label="Add to Wishlist" style="padding: 1.25rem; border-radius: var(--neo-radius-full); aspect-ratio: 1/1; display: flex; align-items: center; justify-content: center; flex: 0 0 auto;" onclick="this.style.color='var(--neo-accent)'; this.querySelector('svg').style.fill='var(--neo-accent)';">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>

            <!-- Shipping Information -->
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-top: 1.5rem; padding: 1rem; background: var(--neo-bg-inset); border-radius: var(--neo-radius-lg); color: var(--neo-text-primary);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--neo-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
              <div style="font-size: 0.875rem;">
                <p style="margin: 0; font-weight: 600;">Free Shipping on orders over &pound;50</p>
                <p class="rb-muted" style="margin: 0; font-size: 0.75rem;">Standard delivery takes 3-5 business days.</p>
              </div>
            </div>

            <!-- Accordion Details -->
            <div style="margin-top: 2rem; border-top: var(--neo-border-1) solid var(--neo-border-subtle);">
              <details class="neo-details" style="padding: 1rem 0; border-bottom: var(--neo-border-1) solid var(--neo-border-subtle);">
                <summary style="font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                  Ingredients
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </summary>
                <p class="neo-body rb-muted" style="margin-top: 1rem; font-size: var(--neo-text-sm);">Aqua, Glycerin, Niacinamide, Sodium Hyaluronate, Botanical Extracts.</p>
              </details>
              <details class="neo-details" style="padding: 1rem 0; border-bottom: var(--neo-border-1) solid var(--neo-border-subtle);">
                <summary style="font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                  How to Use
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </summary>
                <p class="neo-body rb-muted" style="margin-top: 1rem; font-size: var(--neo-text-sm);">Apply 2-3 drops to clean skin morning and night. Massage gently until fully absorbed.</p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </main>

<?php get_footer(); ?>
