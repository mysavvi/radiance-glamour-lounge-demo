/**
 * Neo Cart UI - Handles localStorage cart state and DOM updates
 * for product, cart, and checkout pages.
 */
(function() {
  "use strict";

  const CART_KEY = "radiance_cart";

  function getCart() {
    try {
      const data = localStorage.getItem(CART_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  // Shop Configuration
  let shopConfig = {
    vat_enabled: true,
    prices_include_vat: true,
    vat_rate: 20
  };

  async function loadConfig() {
    try {
      const res = await fetch('/wp-json/savvi-pos/v1/public/config');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          shopConfig = json.data;
        }
      }
    } catch (e) {
      console.warn('Could not load shop config, using defaults.');
    }
    // Dispatch event so UI can re-render totals once config is loaded
    window.dispatchEvent(new Event('cart_config_loaded'));
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateBadges();
    
    // Trigger custom event so other pages can listen
    window.dispatchEvent(new Event('cart_updated'));
  }

  function updateBadges() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + parseInt(item.qty, 10), 0);
    
    // Update any badge with class neo-cart-badge
    const badges = document.querySelectorAll('.neo-cart-badge, [data-cart-badge]');
    badges.forEach(badge => {
      badge.textContent = totalItems;
      badge.style.display = totalItems > 0 ? 'inline-flex' : 'none'; // or just rely on CSS
    });
  }

  // API for adding/removing/updating
  window.CartAPI = {
    getCart,
    saveCart,
    updateBadges,
    addItem: function(product) {
      const cart = getCart();
      const existing = cart.find(i => i.id === product.id);
      if (existing) {
        existing.qty += parseInt(product.qty, 10);
      } else {
        cart.push(product);
      }
      saveCart(cart);
    },
    updateQty: function(id, qty) {
      let cart = getCart();
      const existing = cart.find(i => i.id === id);
      if (existing) {
        if (qty <= 0) {
          cart = cart.filter(i => i.id !== id);
        } else {
          existing.qty = qty;
        }
        saveCart(cart);
      }
    },
    removeItem: function(id) {
      let cart = getCart();
      cart = cart.filter(i => i.id !== id);
      saveCart(cart);
    }
  };

  // ---------------------------------------------------------
  // Page Initializers
  // ---------------------------------------------------------

  function initProductPage() {
    const minusBtn = document.getElementById('product-qty-minus');
    const plusBtn = document.getElementById('product-qty-plus');
    const qtyDisplay = document.getElementById('product-qty-display');
    const addBtn = document.getElementById('product-add-to-cart');

    if (!minusBtn || !plusBtn || !qtyDisplay || !addBtn) return;

    let qty = 1;

    function updatePrice() {
      const priceDisplay = document.getElementById('product-price-display');
      if (priceDisplay) {
        priceDisplay.innerHTML = `&pound;${(45.00 * qty).toFixed(2)}`;
      }
    }

    minusBtn.addEventListener('click', () => {
      if (qty > 1) {
        qty--;
        qtyDisplay.textContent = qty;
        updatePrice();
      }
    });

    plusBtn.addEventListener('click', () => {
      qty++;
      qtyDisplay.textContent = qty;
      updatePrice();
    });

    addBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Hardcoded product details for the prototype
      const product = {
        id: 'radiance-beauty-serum',
        title: 'Radiance Beauty Serum',
        price: 45.00,
        qty: qty,
        image: 'images/logo1.png',
        category: 'Skincare',
        size: '50ml'
      };
      
      window.CartAPI.addItem(product);
      
      // Visual feedback
      const originalText = addBtn.textContent;
      addBtn.textContent = 'Added to Cart!';
      addBtn.style.backgroundColor = 'var(--neo-accent)';
      addBtn.style.color = '#fff';
      
      setTimeout(() => {
        addBtn.textContent = originalText;
        addBtn.style.backgroundColor = '';
        addBtn.style.color = '';
      }, 2000);
    });
  }

  function renderCartItems(containerId, isCheckout) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const cart = getCart();
    
    if (cart.length === 0) {
      container.innerHTML = `
        <div style="padding: 2rem; text-align: center; background: var(--neo-bg-surface); border-radius: var(--neo-radius-2xl);">
          <p class="neo-h3" style="margin-bottom: 1rem;">Your cart is empty</p>
          <a href="shop.html" class="neo-btn neo-btn--primary" style="display: inline-flex;">Continue Shopping</a>
        </div>
      `;
      return;
    }

    let html = '';
    
    cart.forEach(item => {
      if (isCheckout) {
        // Checkout layout (smaller items, sidebar)
        html += `
          <div class="summary-item" data-id="${item.id}">
            <div class="summary-img-wrap">
              <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="summary-details">
              <p class="summary-title">${item.title}</p>
              <p class="neo-body rb-muted" style="margin: 0; font-size: 0.875rem;">${item.category} &middot; ${item.size}</p>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                <button type="button" class="qty-btn qty-minus" data-id="${item.id}" style="width: 24px; height: 24px; border-radius: 50%; border: 1px solid var(--neo-border-subtle); background: var(--neo-bg-base); display: flex; align-items: center; justify-content: center; cursor: pointer;">-</button>
                <span style="font-size: 0.875rem; font-weight: 500;">${item.qty}</span>
                <button type="button" class="qty-btn qty-plus" data-id="${item.id}" style="width: 24px; height: 24px; border-radius: 50%; border: 1px solid var(--neo-border-subtle); background: var(--neo-bg-base); display: flex; align-items: center; justify-content: center; cursor: pointer;">+</button>
              </div>
            </div>
            <div class="summary-price">&pound;${(item.price * item.qty).toFixed(2)}</div>
          </div>
        `;
      } else {
        // Full Cart layout
        html += `
          <article class="neo-card neo-surface-raised" style="display: flex; gap: 1.5rem; border-radius: var(--neo-radius-2xl); margin-bottom: 1rem;">
            <a href="product.html" style="flex-shrink: 0; width: 6rem; aspect-ratio: 4/5; border-radius: var(--neo-radius-xl); overflow: hidden; background: var(--neo-bg-inset); padding: 0.5rem; border: var(--neo-border-1) solid var(--neo-border-subtle);">
              <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: contain;">
            </a>
            <div style="flex: 1; display: flex; flex-direction: column; min-width: 0;">
              <div style="display: flex; justify-content: space-between; gap: 1rem;">
                <div style="min-width: 0;">
                  <a href="product.html" class="neo-body" style="font-weight: 600; color: var(--neo-text-primary); text-decoration: none;">${item.title}</a>
                  <p class="neo-body rb-muted" style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0.25rem;">${item.category} &middot; ${item.size}</p>
                </div>
                <button type="button" aria-label="Remove item" class="remove-btn" data-id="${item.id}" style="flex-shrink: 0; padding: 0.5rem; background: transparent; border: none; color: var(--neo-text-muted); cursor: pointer;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </div>
              <div style="margin-top: auto; padding-top: 1rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;">
                <div style="display: inline-flex; align-items: center; border-radius: var(--neo-radius-full); border: var(--neo-border-1) solid var(--neo-border-subtle); background: var(--neo-bg-base);">
                  <button type="button" class="qty-btn qty-minus" data-id="${item.id}" style="padding: 0.625rem; background: transparent; border: none; color: var(--neo-text-primary); cursor: pointer; border-radius: 9999px 0 0 9999px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
                  <span style="width: 2.5rem; text-align: center; font-size: var(--neo-text-sm); font-weight: 600;">${item.qty}</span>
                  <button type="button" class="qty-btn qty-plus" data-id="${item.id}" style="padding: 0.625rem; background: transparent; border: none; color: var(--neo-text-primary); cursor: pointer; border-radius: 0 9999px 9999px 0;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
                </div>
                <div style="text-align: right;">
                  <p class="neo-h4" style="margin: 0;">&pound;${(item.price * item.qty).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </article>
        `;
      }
    });

    container.innerHTML = html;

    // Attach events for dynamically created buttons
    container.querySelectorAll('.qty-minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const item = getCart().find(i => i.id === id);
        if (item) {
          window.CartAPI.updateQty(id, item.qty - 1);
        }
      });
    });

    container.querySelectorAll('.qty-plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const item = getCart().find(i => i.id === id);
        if (item) {
          window.CartAPI.updateQty(id, item.qty + 1);
        }
      });
    });

    container.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        window.CartAPI.removeItem(id);
      });
    });
  }

  function updateTotals(isCheckout) {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    // Default flat shipping
    const shipping = cart.length > 0 ? 5.00 : 0;
    
    let taxes = 0;
    let total = subtotal + shipping;
    let taxLabel = 'Taxes';

    if (shopConfig.vat_enabled && cart.length > 0) {
      if (shopConfig.prices_include_vat) {
        // Tax is already in the subtotal and shipping
        taxes = total - (total / (1 + (shopConfig.vat_rate / 100)));
        taxLabel = `Tax (Included)`;
      } else {
        // Tax needs to be added on top
        taxes = total * (shopConfig.vat_rate / 100);
        total += taxes;
        taxLabel = `Tax (${shopConfig.vat_rate}%)`;
      }
    }

    // Update Subtotal element (for cart page)
    const subtotalEl = document.getElementById('cart-subtotal');
    if (subtotalEl) {
      subtotalEl.innerHTML = `&pound;${subtotal.toFixed(2)}`;
    }
    
    // Update total everywhere
    const cartTotalEl = document.getElementById('cart-total');
    if (cartTotalEl) {
      cartTotalEl.innerHTML = `&pound;${total.toFixed(2)}`;
    }

    // If checkout, update shipping, taxes, and total
    if (isCheckout) {
      const checkoutTotalEls = document.querySelectorAll('.checkout-total-val');
      const checkoutSubtotalEl = document.getElementById('checkout-subtotal');
      const checkoutShippingEl = document.getElementById('checkout-shipping');
      const checkoutTaxesEl = document.getElementById('checkout-taxes');
      const checkoutTaxesLabel = document.getElementById('checkout-taxes-label');
      const checkoutTaxesRow = document.getElementById('checkout-taxes-row');
      const checkoutPayBtn = document.getElementById('checkout-pay-btn');

      if (checkoutSubtotalEl) checkoutSubtotalEl.innerHTML = `&pound;${subtotal.toFixed(2)}`;
      if (checkoutShippingEl) checkoutShippingEl.innerHTML = `&pound;${shipping.toFixed(2)}`;
      
      if (checkoutTaxesRow) {
        if (shopConfig.vat_enabled && cart.length > 0) {
          checkoutTaxesRow.style.display = '';
          if (checkoutTaxesEl) checkoutTaxesEl.innerHTML = `&pound;${taxes.toFixed(2)}`;
          if (checkoutTaxesLabel) checkoutTaxesLabel.textContent = taxLabel;
        } else {
          checkoutTaxesRow.style.display = 'none';
        }
      }

      checkoutTotalEls.forEach(el => el.innerHTML = `&pound;${total.toFixed(2)}`);
      
      if (checkoutPayBtn) {
        checkoutPayBtn.innerHTML = `Pay &pound;${total.toFixed(2)}`;
        checkoutPayBtn.disabled = cart.length === 0;
        if (cart.length === 0) {
          checkoutPayBtn.style.opacity = '0.5';
          checkoutPayBtn.style.cursor = 'not-allowed';
        } else {
          checkoutPayBtn.style.opacity = '1';
          checkoutPayBtn.style.cursor = 'pointer';
        }
      }
    }
  }

  function initCartPage() {
    if (!document.getElementById('cart-items-container')) return;

    renderCartItems('cart-items-container', false);
    updateTotals(false);

    window.addEventListener('cart_updated', () => {
      renderCartItems('cart-items-container', false);
      updateTotals(false);
    });
  }

  function initCheckoutPage() {
    if (!document.getElementById('checkout-items-container')) return;

    renderCartItems('checkout-items-container', true);
    updateTotals(true);

    window.addEventListener('cart_updated', () => {
      renderCartItems('checkout-items-container', true);
      updateTotals(true);
    });
  }

  function initShopPage() {
    const shopAddBtns = document.querySelectorAll('.shop-add-to-cart');
    shopAddBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const product = {
          id: btn.getAttribute('data-id'),
          title: btn.getAttribute('data-title'),
          price: parseFloat(btn.getAttribute('data-price')),
          qty: 1,
          image: btn.getAttribute('data-image'),
          category: btn.getAttribute('data-category'),
          size: btn.getAttribute('data-size')
        };
        
        window.CartAPI.addItem(product);
        
        // Visual feedback
        const originalText = btn.textContent;
        btn.textContent = 'Added!';
        btn.style.backgroundColor = 'var(--neo-accent)';
        btn.style.color = '#fff';
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
          btn.style.color = '';
        }, 2000);
      });
    });
  }

  // Boot
  document.addEventListener("DOMContentLoaded", function() {
    updateBadges();
    initProductPage();
    initShopPage();
    initCartPage();
    initCheckoutPage();
    
    // Load config and update
    loadConfig();
    window.addEventListener('cart_config_loaded', () => {
      updateTotals(!!document.getElementById('checkout-items-container'));
    });
  });

})();
