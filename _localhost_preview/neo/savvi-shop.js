/*
 * Neo x SAVVI POS — public shop widget.
 *
 * Hydrates <div data-savvi-mount="shop"> into a retail basket that talks to the
 * SAVVI POS public REST API and hands off to Stripe hosted Checkout. Stock is
 * reserved server-side when checkout starts and released if the session expires.
 *
 * Config via attributes on the mount element:
 *   data-api      REST base (default "/wp-json/savvi-pos/v1")
 *   data-currency Currency symbol for display (default "£")
 *
 * Zero dependencies. Progressive enhancement: if the API is unreachable the
 * mount stays hidden and any server-rendered fallback content remains.
 */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') { fn(); }
    else { document.addEventListener('DOMContentLoaded', fn); }
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      if (k === 'class') { node.className = attrs[k]; }
      else if (k === 'text') { node.textContent = attrs[k]; }
      else if (k === 'html') { node.innerHTML = attrs[k]; }
      else if (k.slice(0, 2) === 'on' && typeof attrs[k] === 'function') {
        node.addEventListener(k.slice(2), attrs[k]);
      } else if (attrs[k] !== null && attrs[k] !== undefined) {
        node.setAttribute(k, attrs[k]);
      }
    });
    (children || []).forEach(function (c) {
      if (c === null || c === undefined) { return; }
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  }

  function money(sym, amount) {
    return sym + Number(amount || 0).toFixed(2);
  }

  function Shop(mount) {
    this.mount = mount;
    this.api = (mount.getAttribute('data-api') || '/wp-json/savvi-pos/v1').replace(/\/$/, '');
    this.sym = mount.getAttribute('data-currency') || '£';
    this.state = { products: [], basket: {} }; // basket: { productId: qty }
  }

  Shop.prototype.get = function (path) {
    return fetch(this.api + path, { headers: { 'Accept': 'application/json' } })
      .then(function (r) { return r.json(); });
  };

  Shop.prototype.post = function (path, body) {
    return fetch(this.api + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(body)
    }).then(function (r) { return r.json(); });
  };

  Shop.prototype.render = function (node) { this.mount.innerHTML = ''; this.mount.appendChild(node); };

  Shop.prototype.boot = function () {
    var self = this;
    var order = new URLSearchParams(window.location.search).get('order');
    if (order === 'success') { this.mount.hidden = false; return this.renderThanks(); }

    this.mount.hidden = false;
    this.render(el('p', { class: 'neo-caption', text: 'Loading shop…' }));
    this.get('/public/products').then(function (res) {
      if (!res || !res.success || !res.data) { throw new Error('no products'); }
      self.state.products = res.data.products || [];
      var fb = self.mount.parentNode ? self.mount.parentNode.querySelector('[data-savvi-fallback]') : null;
      if (fb) { fb.hidden = true; }
      self.renderShop(order === 'cancelled');
    }).catch(function () {
      // Leave any fallback content in place.
      self.mount.hidden = true;
    });
  };

  Shop.prototype.renderThanks = function () {
    this.render(el('div', { class: 'savvi-shop savvi-shop--success' }, [
      el('p', { class: 'neo-h3', text: 'Thank you for your order' }),
      el('p', { class: 'neo-body', text: 'Your payment has gone through and a receipt is on its way to your email.' }),
      el('p', { class: 'neo-caption', text: 'Collect in salon or we will be in touch about delivery.' }),
      el('a', { class: 'neo-btn neo-btn--secondary', href: window.location.pathname, text: 'Back to the shop' })
    ]));
  };

  Shop.prototype.msg = function (text, kind) {
    var box = this.mount.querySelector('.savvi-shop__msg');
    if (!box) { return; }
    box.textContent = text || '';
    box.className = 'savvi-shop__msg' + (kind ? ' is-' + kind : '');
  };

  Shop.prototype.renderShop = function (wasCancelled) {
    var self = this;
    var s = this.state;

    if (!s.products.length) {
      this.render(el('p', { class: 'neo-body rb-muted', text: 'Our online shop is coming soon. Please call the salon to buy products.' }));
      return;
    }

    var grid = el('div', { class: 'savvi-shop__grid' });
    s.products.forEach(function (p) {
      grid.appendChild(self.productCard(p));
    });

    var name = el('input', { class: 'neo-input', type: 'text', id: 'savvi-shop-name', autocomplete: 'name' });
    var email = el('input', { class: 'neo-input', type: 'email', id: 'savvi-shop-email', autocomplete: 'email', required: 'required' });

    this.els = {
      grid: grid,
      name: name,
      email: email,
      summary: el('div', { class: 'savvi-shop__summary' }),
      checkoutWrap: el('div', { class: 'savvi-shop__checkout' })
    };

    this.render(el('div', { class: 'savvi-shop' }, [
      el('div', { class: 'savvi-shop__msg', role: 'status', 'aria-live': 'polite',
        text: wasCancelled ? 'No worries, your basket is still here. Nothing was charged.' : '' }),
      grid,
      el('div', { class: 'savvi-shop__basket' }, [
        el('h3', { class: 'neo-h3', text: 'Your basket' }),
        this.els.summary,
        el('label', { class: 'neo-field' }, [
          el('span', { class: 'neo-field__label', text: 'Full name' }),
          name
        ]),
        el('label', { class: 'neo-field' }, [
          el('span', { class: 'neo-field__label', text: 'Email *' }),
          email
        ]),
        el('p', { class: 'neo-caption', text: 'Secure card payment via Stripe. A receipt is emailed to you.' }),
        this.els.checkoutWrap
      ])
    ]));

    this.refreshBasket();
  };

  Shop.prototype.productCard = function (p) {
    var self = this;
    var stock = parseInt(p.stock_count, 10) || 0;
    var qtyLabel = el('span', { class: 'savvi-shop__qty', text: '0' });

    function setQty(next) {
      next = Math.max(0, Math.min(stock, next));
      if (next === 0) { delete self.state.basket[p.id]; }
      else { self.state.basket[p.id] = next; }
      qtyLabel.textContent = String(next);
      self.refreshBasket();
    }

    var media = p.image_url
      ? el('img', { class: 'savvi-shop__img', src: p.image_url, alt: p.name, loading: 'lazy' })
      : el('div', { class: 'savvi-shop__img savvi-shop__img--placeholder', 'aria-hidden': 'true' });

    return el('article', { class: 'neo-card neo-surface-raised savvi-shop__card' }, [
      media,
      el('h3', { class: 'neo-h4 savvi-shop__name', text: p.name }),
      p.description ? el('p', { class: 'neo-caption savvi-shop__desc', text: p.description }) : null,
      el('p', { class: 'savvi-shop__price', text: money(self.sym, p.price) }),
      el('div', { class: 'savvi-shop__stepper' }, [
        el('button', { type: 'button', class: 'neo-btn neo-btn--ghost neo-btn--sm', 'aria-label': 'Remove one ' + p.name, text: '−',
          onclick: function () { setQty((self.state.basket[p.id] || 0) - 1); } }),
        qtyLabel,
        el('button', { type: 'button', class: 'neo-btn neo-btn--ghost neo-btn--sm', 'aria-label': 'Add one ' + p.name, text: '+',
          onclick: function () { setQty((self.state.basket[p.id] || 0) + 1); } })
      ])
    ]);
  };

  Shop.prototype.total = function () {
    var self = this, total = 0;
    Object.keys(this.state.basket).forEach(function (pid) {
      var p = self.state.products.filter(function (x) { return String(x.id) === String(pid); })[0];
      if (p) { total += (parseFloat(p.price) || 0) * self.state.basket[pid]; }
    });
    return total;
  };

  Shop.prototype.refreshBasket = function () {
    var self = this;
    var keys = Object.keys(this.state.basket);
    var sum = this.els.summary;
    var co = this.els.checkoutWrap;
    sum.innerHTML = '';
    co.innerHTML = '';

    if (!keys.length) {
      sum.appendChild(el('p', { class: 'neo-caption', text: 'Your basket is empty. Add a product above.' }));
      return;
    }

    var list = el('ul', { class: 'savvi-shop__lines' });
    keys.forEach(function (pid) {
      var p = self.state.products.filter(function (x) { return String(x.id) === String(pid); })[0];
      if (!p) { return; }
      var qty = self.state.basket[pid];
      list.appendChild(el('li', { class: 'savvi-shop__line' }, [
        el('span', { text: qty + ' × ' + p.name }),
        el('span', { text: money(self.sym, (parseFloat(p.price) || 0) * qty) })
      ]));
    });
    sum.appendChild(list);
    sum.appendChild(el('p', { class: 'savvi-shop__total', text: 'Total ' + money(self.sym, this.total()) }));

    co.appendChild(el('button', {
      type: 'button', class: 'neo-btn neo-btn--primary',
      text: 'Pay ' + money(self.sym, this.total()),
      onclick: function () { self.checkout(); }
    }));
  };

  Shop.prototype.checkout = function () {
    var self = this;
    var email = this.els.email.value.trim();
    if (!email) { return this.msg('Please enter your email for the receipt.', 'error'); }
    if (!Object.keys(this.state.basket).length) { return this.msg('Your basket is empty.', 'error'); }

    var items = Object.keys(this.state.basket).map(function (pid) {
      return { product_id: parseInt(pid, 10), qty: self.state.basket[pid] };
    });

    this.msg('Taking you to secure checkout…');
    Array.prototype.forEach.call(this.mount.querySelectorAll('button'), function (b) { b.disabled = true; });

    this.post('/public/shop-checkout', {
      items: items,
      name: this.els.name.value.trim(),
      email: email
    }).then(function (res) {
      if (res && res.success && res.data && res.data.checkout_url) {
        window.location.href = res.data.checkout_url;
        return;
      }
      self.msg((res && res.message) ? res.message : 'Sorry, we could not start your order. Please try again.', 'error');
      Array.prototype.forEach.call(self.mount.querySelectorAll('button'), function (b) { b.disabled = false; });
    }).catch(function () {
      self.msg('Network error. Please try again.', 'error');
      Array.prototype.forEach.call(self.mount.querySelectorAll('button'), function (b) { b.disabled = false; });
    });
  };

  ready(function () {
    Array.prototype.forEach.call(document.querySelectorAll('[data-savvi-mount="shop"]'), function (m) { new Shop(m).boot(); });
  });
})();
