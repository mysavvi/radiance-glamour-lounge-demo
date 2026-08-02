<!DOCTYPE html>
<html lang="en" data-neo-palette="moon" data-neo-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Checkout | Radiance Glamour Lounge</title>
  <link rel="icon" href="images/favicon.png" type="image/x-icon">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap">
  <link rel="stylesheet" href="neo/neo-design.css">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', sans-serif;
      background: var(--neo-bg-base);
    }
    .checkout-layout {
      display: flex;
      flex-direction: column-reverse;
      min-height: 100vh;
    }
    @media (min-width: 900px) {
      .checkout-layout {
        flex-direction: row;
      }
    }
    .checkout-left {
      flex: 1;
      padding: 2rem;
      background: var(--neo-bg-base);
      display: flex;
      justify-content: flex-end;
    }
    .checkout-right {
      flex: 1;
      padding: 2rem;
      background: var(--neo-bg-surface);
      border-left: 1px solid var(--neo-border-subtle);
      display: flex;
      justify-content: flex-start;
    }
    @media (max-width: 899px) {
      .checkout-right {
        border-left: none;
        border-bottom: 1px solid var(--neo-border-subtle);
      }
    }
    .checkout-form-container, .checkout-summary-container {
      width: 100%;
      max-width: 500px;
    }
    .checkout-left {
      padding-right: 4rem;
    }
    .checkout-right {
      padding-left: 4rem;
    }
    @media (max-width: 1100px) {
      .checkout-left, .checkout-right {
        padding: 2rem;
      }
    }
    .checkout-header {
      display: flex;
      align-items: center;
      margin-bottom: 2.5rem;
    }
    .checkout-header a {
      color: var(--neo-text-secondary);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
      transition: color 0.2s;
    }
    .checkout-header a:hover {
      color: var(--neo-text-primary);
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    .form-label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--neo-text-primary);
      font-size: 0.875rem;
    }
    .form-input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid var(--neo-border-subtle);
      border-radius: var(--neo-radius-md);
      background: var(--neo-bg-base);
      color: var(--neo-text-primary);
      font-family: inherit;
      font-size: 1rem;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .form-input:focus {
      outline: none;
      border-color: var(--neo-accent);
      box-shadow: 0 0 0 3px rgba(var(--neo-accent-rgb, 0,0,0), 0.1);
    }
    .form-row {
      display: flex;
      gap: 1rem;
    }
    .form-row > * {
      flex: 1;
    }
    .summary-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .summary-img-wrap {
      width: 64px;
      height: 64px;
      background: var(--neo-bg-inset);
      border-radius: var(--neo-radius-md);
      border: 1px solid var(--neo-border-subtle);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      position: relative;
    }
    .summary-img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .summary-qty {
      position: absolute;
      top: -8px;
      right: -8px;
      background: var(--neo-text-secondary);
      color: var(--neo-bg-base);
      font-size: 0.75rem;
      font-weight: 600;
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .summary-details {
      flex: 1;
    }
    .summary-title {
      font-weight: 600;
      color: var(--neo-text-primary);
      margin: 0 0 0.25rem 0;
    }
    .summary-price {
      font-weight: 500;
      color: var(--neo-text-primary);
    }
    .summary-totals {
      border-top: 1px solid var(--neo-border-subtle);
      padding-top: 1.5rem;
      margin-top: 1.5rem;
    }
    .summary-total-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
      color: var(--neo-text-secondary);
      font-size: 0.875rem;
    }
    .summary-total-row.final {
      color: var(--neo-text-primary);
      font-size: 1.25rem;
      font-weight: 600;
      margin-top: 1.5rem;
      align-items: center;
    }
    .checkout-btn {
      width: 100%;
      padding: 1.25rem;
      background: var(--neo-accent, #000);
      color: #fff;
      border: none;
      border-radius: var(--neo-radius-full);
      font-size: 1.125rem;
      font-weight: 600;
      cursor: pointer;
      margin-top: 2rem;
      transition: opacity 0.2s;
    }
    .checkout-btn:hover {
      opacity: 0.9;
    }
  </style>
</head>
<body>
  <div class="checkout-layout">
    <div class="checkout-left">
      <div class="checkout-form-container">
        <header class="checkout-header" style="justify-content: space-between; width: 100%;">
          <a href="index.html" class="neo-mobile-header__brand">
            <img src="images/logo1.png" alt="Radiance Glamour Lounge" style="height: 48px; width: auto; transform: scale(2); transform-origin: left center;">
          </a>
          <a href="cart.html" style="font-size: 0.875rem;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back to Cart
          </a>
        </header>

        <form action="book-success.html" method="GET">
          <h2 class="neo-h3" style="margin-top: 0; margin-bottom: 1.5rem;">Contact Information</h2>
          <div class="form-group">
            <label class="form-label" for="email">Email address</label>
            <input type="email" id="email" class="form-input" placeholder="you@example.com" required>
          </div>

          <h2 class="neo-h3" style="margin-top: 2.5rem; margin-bottom: 1.5rem;">Shipping Address</h2>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="fname">First name</label>
              <input type="text" id="fname" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="lname">Last name</label>
              <input type="text" id="lname" class="form-input" required>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="address">Address</label>
            <input type="text" id="address" class="form-input" placeholder="123 Main St" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="city">City</label>
              <input type="text" id="city" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="zip">Postal code</label>
              <input type="text" id="zip" class="form-input" required>
            </div>
          </div>

          <h2 class="neo-h3" style="margin-top: 2.5rem; margin-bottom: 1.5rem;">Payment Details</h2>
          <div class="form-group">
            <label class="form-label" for="card">Card number</label>
            <div style="position: relative;">
              <input type="text" id="card" class="form-input" placeholder="0000 0000 0000 0000" style="padding-left: 3rem;" required>
              <svg style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--neo-text-muted);" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="exp">Expiration (MM/YY)</label>
              <input type="text" id="exp" class="form-input" placeholder="MM / YY" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="cvc">CVC</label>
              <input type="text" id="cvc" class="form-input" placeholder="CVC" required>
            </div>
          </div>

          <button type="submit" class="checkout-btn">Pay &pound;122.00</button>
        </form>
      </div>
    </div>

    <div class="checkout-right">
      <div class="checkout-summary-container">
        <h2 class="neo-h3" style="margin-top: 0; margin-bottom: 1.5rem;">Order Summary</h2>
        
        <div class="summary-item">
          <div class="summary-img-wrap">
            <img src="images/logo1.png" alt="Radiance Beauty Serum">
            <span class="summary-qty">1</span>
          </div>
          <div class="summary-details">
            <p class="summary-title">Radiance Beauty Serum</p>
            <p class="neo-body rb-muted" style="margin: 0; font-size: 0.875rem;">Skincare &middot; 50ml</p>
          </div>
          <div class="summary-price">&pound;45.00</div>
        </div>

        <div class="summary-item">
          <div class="summary-img-wrap">
            <img src="images/logo1.png" alt="Lounge Signature Perfume">
            <span class="summary-qty">1</span>
          </div>
          <div class="summary-details">
            <p class="summary-title">Lounge Signature Perfume</p>
            <p class="neo-body rb-muted" style="margin: 0; font-size: 0.875rem;">Fragrance &middot; 50ml</p>
          </div>
          <div class="summary-price">&pound;65.00</div>
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
          <div style="display: flex; gap: 0.75rem;">
            <input type="number" class="form-input" placeholder="Points to spend" max="500" style="flex: 1; padding: 0.75rem 1rem;">
            <button type="button" class="neo-btn neo-btn--secondary" style="border-radius: var(--neo-radius-md); padding: 0.75rem 1.25rem; background: var(--neo-text-primary); color: var(--neo-bg-base); border: none;">Redeem</button>
          </div>
        </div>

        <div class="summary-totals">
          <div class="summary-total-row">
            <span>Subtotal</span>
            <span>&pound;110.00</span>
          </div>
          <div class="summary-total-row">
            <span>Shipping</span>
            <span>&pound;5.00</span>
          </div>
          <div class="summary-total-row">
            <span>Taxes</span>
            <span>&pound;7.00</span>
          </div>
          <div class="summary-total-row final" style="margin-bottom: 0.5rem;">
            <span>Total</span>
            <span>&pound;122.00</span>
          </div>
          <div style="display: flex; justify-content: flex-end; align-items: center; gap: 0.25rem; font-size: 0.75rem; font-weight: 600; color: var(--neo-accent);">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            You will earn 110 Glamour Points with this purchase
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
