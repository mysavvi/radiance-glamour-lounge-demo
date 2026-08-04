<?php
/*
Template Name: Radiance - Shop
*/
get_header();
?>

<main id="neo-main" class="neo-page__main" tabindex="-1">
      <nav aria-label="Breadcrumb" class="neo-breadcrumbs-wrap">
        <ol class="neo-breadcrumbs">
          <li><a href="/">Home</a></li>
          <li aria-current="page">Shop</li>
        </ol>
      </nav>
      <div class="neo-container rb-page-hero">
        <p class="rb-eyebrow">Shop</p>
        <h1 class="neo-h1 rb-page-hero__title">Salon products, online</h1>
        <p class="neo-body rb-muted rb-page-hero__lead">The hair, skin and beauty products we use and trust, ready to buy. Pay securely by card, then collect in salon or arrange delivery with us.</p>

        <section aria-labelledby="rb-shop-title">
          <div class="neo-shop-header" style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem;">
            <div>
              <h2 class="neo-h3" id="rb-shop-title" style="margin-bottom: 0;">Our products</h2>
              <p class="neo-body rb-muted" style="margin-top: 0.5rem; max-width: 600px;">Explore our curated selection of premium hair, skin, and beauty products.</p>
            </div>
            <a href="/cart/" class="neo-btn neo-btn--secondary" style="border-radius: var(--neo-radius-full);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              <span>View Cart</span>
            </a>
          </div>
          <style>
            .neo-shop-layout {
              display: grid;
              grid-template-columns: 1fr;
              gap: 2rem;
            }
            @media (min-width: 900px) {
              .neo-shop-layout {
                grid-template-columns: 240px 1fr;
                gap: 3rem;
                align-items: start;
              }
              .neo-sidebar {
                position: sticky;
                top: 100px;
              }
            }
            .neo-sidebar-list {
              list-style: none;
              padding: 0;
              margin: 0;
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
            }
            .neo-sidebar-link {
              text-decoration: none;
              color: var(--neo-text-secondary);
              padding: 0.75rem 1rem;
              border-radius: var(--neo-radius-lg);
              display: block;
              transition: background 0.2s, color 0.2s;
              font-weight: 500;
            }
            .neo-sidebar-link:hover {
              background: var(--neo-bg-inset);
              color: var(--neo-text-primary);
            }
            .neo-sidebar-link[aria-current="page"] {
              background: var(--neo-accent);
              color: #fff;
            }
            .rb-wishlist-btn {
              position: absolute;
              top: 1rem;
              right: 1rem;
              width: 2.5rem;
              height: 2.5rem;
              border-radius: 9999px;
              background: var(--neo-bg-base);
              border: none;
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--neo-text-primary);
              cursor: pointer;
              box-shadow: var(--neo-shadow-sm);
              transition: transform 0.2s, color 0.2s;
              z-index: 2;
            }
            .rb-wishlist-btn:hover {
              transform: scale(1.1);
            }
            .rb-wishlist-btn svg {
              transition: fill 0.2s;
            }
          </style>

          <div class="neo-shop-layout">
            <aside class="neo-sidebar" aria-label="Product Categories">
              <h3 class="neo-body" style="font-weight: 600; font-size: var(--neo-text-sm); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem; color: var(--neo-text-secondary);">Categories</h3>
              <ul class="neo-sidebar-list">
                <li><a href="#" class="neo-sidebar-link" aria-current="page">All Products</a></li>
                <li><a href="#" class="neo-sidebar-link">Skincare</a></li>
                <li><a href="#" class="neo-sidebar-link">Haircare</a></li>
                <li><a href="#" class="neo-sidebar-link">Fragrance</a></li>
                <li><a href="#" class="neo-sidebar-link">Accessories</a></li>
                <li><a href="#" class="neo-sidebar-link">Gifts & Sets</a></li>
              </ul>
            </aside>
            <div class="neo-shop-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem;">
            <!-- Product 1 -->
            <article class="neo-card neo-surface-raised" style="padding: 0; overflow: hidden; border-radius: var(--neo-radius-2xl); position: relative;">
              <button type="button" class="rb-wishlist-btn" aria-label="Add to Wishlist" onclick="this.style.color='var(--neo-accent)'; this.querySelector('svg').style.fill='var(--neo-accent)';">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
              <a href="/product/" class="neo-product-img-wrap" style="display: block; aspect-ratio: 1/1; background: var(--neo-bg-inset); padding: 1.5rem;">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo1.png" alt="Radiance Beauty Serum" style="width: 100%; height: 100%; object-fit: contain;">
              </a>
              <div class="neo-product-info" style="padding: 1.5rem;">
                <a href="/product/" style="text-decoration: none; color: inherit;">
                  <h3 class="neo-body" style="font-weight: 600; margin: 0 0 0.25rem 0;">Radiance Beauty Serum</h3>
                </a>
                <p class="neo-body rb-muted" style="font-size: var(--neo-text-sm); margin: 0 0 1rem 0;">Skincare &middot; 50ml</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="neo-body" style="font-weight: 700; font-size: var(--neo-text-lg);">&pound;45.00</span>
                  <button type="button" class="neo-btn neo-btn--primary shop-add-to-cart" data-id="radiance-beauty-serum" data-title="Radiance Beauty Serum" data-price="45.0" data-image="images/logo1.png" data-category="Skincare" data-size="50ml" aria-label="Add Radiance Beauty Serum to cart">Add to cart</button>
                </div>
              </div>
            </article>

            <!-- Product 2 -->
            <article class="neo-card neo-surface-raised" style="padding: 0; overflow: hidden; border-radius: var(--neo-radius-2xl); position: relative;">
              <button type="button" class="rb-wishlist-btn" aria-label="Add to Wishlist" onclick="this.style.color='var(--neo-accent)'; this.querySelector('svg').style.fill='var(--neo-accent)';">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
              <a href="/product/" class="neo-product-img-wrap" style="display: block; aspect-ratio: 1/1; background: var(--neo-bg-inset); padding: 1.5rem;">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo1.png" alt="Glamour Hair Mask" style="width: 100%; height: 100%; object-fit: contain;">
              </a>
              <div class="neo-product-info" style="padding: 1.5rem;">
                <a href="/product/" style="text-decoration: none; color: inherit;">
                  <h3 class="neo-body" style="font-weight: 600; margin: 0 0 0.25rem 0;">Glamour Hair Mask</h3>
                </a>
                <p class="neo-body rb-muted" style="font-size: var(--neo-text-sm); margin: 0 0 1rem 0;">Haircare &middot; 200ml</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="neo-body" style="font-weight: 700; font-size: var(--neo-text-lg);">&pound;32.00</span>
                  <button type="button" class="neo-btn neo-btn--primary shop-add-to-cart" data-id="glamour-hair-mask" data-title="Glamour Hair Mask" data-price="32.0" data-image="images/logo1.png" data-category="Haircare" data-size="200ml" aria-label="Add Glamour Hair Mask to cart">Add to cart</button>
                </div>
              </div>
            </article>

            <!-- Product 3 -->
            <article class="neo-card neo-surface-raised" style="padding: 0; overflow: hidden; border-radius: var(--neo-radius-2xl); position: relative;">
              <button type="button" class="rb-wishlist-btn" aria-label="Add to Wishlist" onclick="this.style.color='var(--neo-accent)'; this.querySelector('svg').style.fill='var(--neo-accent)';">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
              <a href="/product/" class="neo-product-img-wrap" style="display: block; aspect-ratio: 1/1; background: var(--neo-bg-inset); padding: 1.5rem;">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo1.png" alt="Hydrating Mist" style="width: 100%; height: 100%; object-fit: contain;">
              </a>
              <div class="neo-product-info" style="padding: 1.5rem;">
                <a href="/product/" style="text-decoration: none; color: inherit;">
                  <h3 class="neo-body" style="font-weight: 600; margin: 0 0 0.25rem 0;">Hydrating Mist</h3>
                </a>
                <p class="neo-body rb-muted" style="font-size: var(--neo-text-sm); margin: 0 0 1rem 0;">Skincare &middot; 100ml</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="neo-body" style="font-weight: 700; font-size: var(--neo-text-lg);">&pound;28.00</span>
                  <button type="button" class="neo-btn neo-btn--primary shop-add-to-cart" data-id="hydrating-mist" data-title="Hydrating Mist" data-price="28.0" data-image="images/logo1.png" data-category="Skincare" data-size="100ml" aria-label="Add Hydrating Mist to cart">Add to cart</button>
                </div>
              </div>
            </article>

            <!-- Product 4 -->
            <article class="neo-card neo-surface-raised" style="padding: 0; overflow: hidden; border-radius: var(--neo-radius-2xl); position: relative;">
              <button type="button" class="rb-wishlist-btn" aria-label="Add to Wishlist" onclick="this.style.color='var(--neo-accent)'; this.querySelector('svg').style.fill='var(--neo-accent)';">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
              <a href="/product/" class="neo-product-img-wrap" style="display: block; aspect-ratio: 1/1; background: var(--neo-bg-inset); padding: 1.5rem;">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo1.png" alt="Lounge Signature Perfume" style="width: 100%; height: 100%; object-fit: contain;">
              </a>
              <div class="neo-product-info" style="padding: 1.5rem;">
                <a href="/product/" style="text-decoration: none; color: inherit;">
                  <h3 class="neo-body" style="font-weight: 600; margin: 0 0 0.25rem 0;">Lounge Signature Perfume</h3>
                </a>
                <p class="neo-body rb-muted" style="font-size: var(--neo-text-sm); margin: 0 0 1rem 0;">Fragrance &middot; 50ml</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="neo-body" style="font-weight: 700; font-size: var(--neo-text-lg);">&pound;65.00</span>
                  <button type="button" class="neo-btn neo-btn--primary shop-add-to-cart" data-id="lounge-signature-perfume" data-title="Lounge Signature Perfume" data-price="65.0" data-image="images/logo1.png" data-category="Fragrance" data-size="50ml" aria-label="Add Lounge Signature Perfume to cart">Add to cart</button>
                </div>
              </div>
            </article>
          </div>
          </div>
        </section>
      </div>
    </main>

<?php get_footer(); ?>
