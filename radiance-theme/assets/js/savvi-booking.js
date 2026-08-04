/*
 * Neo x SAVVI POS — public booking widget.
 *
 * Hydrates <div data-savvi-mount="book"> into a guest booking flow that talks to
 * the SAVVI POS public REST API and hands off to Stripe hosted Checkout with a
 * Two-Button choice (Pay deposit / Pay full).
 *
 * Config via attributes on the mount element:
 *   data-api      REST base (default "/wp-json/savvi-pos/v1")
 *   data-currency Currency symbol for display (default "£")
 *
 * Zero dependencies. Progressive enhancement: if the API is unreachable the
 * mount stays empty and any server-rendered fallback form remains usable.
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

  function depositFor(service) {
    var price = parseFloat(service.price) || 0;
    var val = parseFloat(service.deposit_value) || 0;
    var dep = service.deposit_type === 'flat' ? val : Math.round(price * (val / 100) * 100) / 100;
    return Math.min(dep, price);
  }

  function Widget(mount) {
    this.mount = mount;
    this.api = (mount.getAttribute('data-api') || '/wp-json/savvi-pos/v1').replace(/\/$/, '');
    this.sym = mount.getAttribute('data-currency') || '£';
    this.state = { services: [], staff: [], service: null, staffId: 0, date: '', slot: '', slots: [] };
  }

  Widget.prototype.get = function (path) {
    return fetch(this.api + path, { headers: { 'Accept': 'application/json' } })
      .then(function (r) { return r.json(); });
  };

  Widget.prototype.post = function (path, body) {
    return fetch(this.api + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(body)
    }).then(function (r) { return r.json(); });
  };

  Widget.prototype.boot = function () {
    var self = this;
    
    var params = new URLSearchParams(window.location.search);
    var treatmentParam = params.get('treatment') || '';
    if (treatmentParam.indexOf('consultation') !== -1) {
      this.mount.hidden = true;
      var fb = document.querySelector('[data-savvi-fallback]');
      if (fb) { 
        fb.hidden = false; 
        var select = fb.querySelector('select[name="treatment"]');
        if (select) { select.value = treatmentParam; }
      }
      return;
    }

    this.render(el('p', { class: 'neo-caption', text: 'Loading booking…' }));
    this.get('/public/services').then(function (res) {
      if (!res || !res.success || !res.data || !res.data.services || !res.data.services.length) {
        throw new Error('no services');
      }
      self.state.services = res.data.services;
      return self.get('/public/staff');
    }).then(function (res) {
      self.state.staff = (res && res.data && res.data.staff) ? res.data.staff : [];
      // Reveal the widget; hide any fallback form.
      var fb = document.querySelector('[data-savvi-fallback]');
      if (fb) { fb.hidden = true; }
      self.mount.hidden = false;
      self.renderForm();
    }).catch(function () {
      // Leave the fallback form in place.
      self.mount.hidden = true;
    });
  };

  Widget.prototype.render = function (node) {
    this.mount.innerHTML = '';
    this.mount.appendChild(node);
  };

  Widget.prototype.msg = function (text, kind) {
    var box = this.mount.querySelector('.savvi-book__msg');
    if (!box) { return; }
    box.textContent = text || '';
    box.className = 'savvi-book__msg' + (kind ? ' is-' + kind : '');
  };

  Widget.prototype.renderForm = function () {
    var self = this;
    var s = this.state;

    var serviceSel = el('select', { class: 'neo-select', id: 'savvi-service' }, [
      el('option', { value: '', disabled: 'disabled', selected: 'selected', text: 'Choose a treatment' })
    ]);
    s.services.forEach(function (svc) {
      serviceSel.appendChild(el('option', {
        value: String(svc.id),
        text: svc.name + '  —  ' + money(self.sym, svc.price) + ' · ' + svc.duration_mins + ' min'
      }));
    });
    serviceSel.addEventListener('change', function () {
      s.service = s.services.filter(function (x) { return String(x.id) === serviceSel.value; })[0] || null;
      self.refreshSlots();
      self.refreshPay();
    });

    var staffSel = el('select', { class: 'neo-select', id: 'savvi-staff' }, [
      el('option', { value: '', disabled: 'disabled', selected: 'selected', text: 'Choose a team member' })
    ]);
    s.staff.forEach(function (m) {
      staffSel.appendChild(el('option', { value: String(m.id), text: m.display_name }));
    });
    staffSel.addEventListener('change', function () {
      s.staffId = parseInt(staffSel.value, 10) || 0;
      self.refreshSlots();
    });

    var today = new Date().toISOString().slice(0, 10);
    var dateInp = el('input', { class: 'neo-input', type: 'date', id: 'savvi-date', min: today });
    dateInp.addEventListener('change', function () {
      s.date = dateInp.value;
      self.refreshSlots();
    });

    var slotsWrap = el('div', { class: 'savvi-book__slots', id: 'savvi-slots' }, [
      el('p', { class: 'neo-caption', text: 'Pick a treatment, team member and date to see available times.' })
    ]);

    var name = el('input', { class: 'neo-input', type: 'text', id: 'savvi-name', autocomplete: 'name', required: 'required' });
    var email = el('input', { class: 'neo-input', type: 'email', id: 'savvi-email', autocomplete: 'email', required: 'required' });
    var phone = el('input', { class: 'neo-input', type: 'tel', id: 'savvi-phone', autocomplete: 'tel' });

    var payWrap = el('div', { class: 'savvi-book__pay', id: 'savvi-pay' });

    this.render(el('div', { class: 'savvi-book' }, [
      el('div', { class: 'savvi-book__msg', role: 'status', 'aria-live': 'polite' }),
      field('Treatment *', serviceSel),
      field('Team member *', staffSel),
      field('Date *', dateInp),
      el('div', { class: 'neo-field' }, [
        el('span', { class: 'neo-field__label', text: 'Available times *' }),
        slotsWrap
      ]),
      row([field('Full name *', name), field('Phone', phone)]),
      field('Email *', email),
      payWrap
    ]));

    this.els = { serviceSel: serviceSel, staffSel: staffSel, dateInp: dateInp, slotsWrap: slotsWrap, name: name, email: email, phone: phone, payWrap: payWrap };
    this.refreshPay();

    function field(label, control) {
      return el('label', { class: 'neo-field' }, [
        el('span', { class: 'neo-field__label', text: label }),
        control
      ]);
    }
    function row(items) { return el('div', { class: 'rb-form-row rb-form-row--2' }, items); }
  };

  Widget.prototype.refreshSlots = function () {
    var self = this;
    var s = this.state;
    var wrap = this.els.slotsWrap;
    s.slot = '';
    if (!s.service || !s.staffId || !s.date) {
      wrap.innerHTML = '';
      wrap.appendChild(el('p', { class: 'neo-caption', text: 'Pick a treatment, team member and date to see available times.' }));
      return;
    }
    wrap.innerHTML = '';
    wrap.appendChild(el('p', { class: 'neo-caption', text: 'Checking availability…' }));

    var q = '?staff_id=' + s.staffId + '&service_id=' + s.service.id + '&date=' + encodeURIComponent(s.date);
    this.get('/public/availability' + q).then(function (res) {
      var slots = (res && res.data && res.data.slots) ? res.data.slots : [];
      s.slots = slots;
      wrap.innerHTML = '';
      if (!slots.length) {
        wrap.appendChild(el('p', { class: 'neo-caption', text: 'No times available on this date. Try another day.' }));
        return;
      }
      slots.forEach(function (iso) {
        var t = new Date(iso);
        var label = t.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        var btn = el('button', {
          type: 'button', class: 'neo-btn neo-btn--ghost savvi-book__slot', 'data-iso': iso, text: label,
          onclick: function () {
            s.slot = iso;
            Array.prototype.forEach.call(wrap.querySelectorAll('.savvi-book__slot'), function (b) {
              b.classList.toggle('is-active', b === btn);
            });
          }
        });
        wrap.appendChild(btn);
      });
    }).catch(function () {
      wrap.innerHTML = '';
      wrap.appendChild(el('p', { class: 'neo-caption', text: 'Could not load times. Please try again.' }));
    });
  };

  Widget.prototype.refreshPay = function () {
    var self = this;
    var s = this.state;
    var wrap = this.els.payWrap;
    wrap.innerHTML = '';
    if (!s.service) { return; }

    var price = parseFloat(s.service.price) || 0;
    var deposit = depositFor(s.service);

    var buttons = [];
    if (deposit > 0 && deposit < price) {
      buttons.push(el('button', {
        type: 'button', class: 'neo-btn neo-btn--secondary',
        text: 'Pay deposit ' + money(self.sym, deposit),
        onclick: function () { self.submit('deposit'); }
      }));
    }
    buttons.push(el('button', {
      type: 'button', class: 'neo-btn neo-btn--primary',
      text: 'Pay full ' + money(self.sym, price),
      onclick: function () { self.submit('full'); }
    }));

    wrap.appendChild(el('p', { class: 'neo-caption', text: 'Secure payment by card via Stripe. Any balance is settled in the salon.' }));
    wrap.appendChild(el('div', { class: 'savvi-book__paybtns' }, buttons));
  };

  Widget.prototype.submit = function (payMode) {
    var self = this;
    var s = this.state;
    var e = this.els;

    if (!s.service) { return this.msg('Please choose a treatment.', 'error'); }
    if (!s.staffId) { return this.msg('Please choose a team member.', 'error'); }
    if (!s.slot) { return this.msg('Please pick an available time.', 'error'); }
    var name = e.name.value.trim();
    var email = e.email.value.trim();
    if (!name) { return this.msg('Please enter your name.', 'error'); }
    if (!email) { return this.msg('Please enter your email.', 'error'); }

    this.msg('Taking you to secure checkout…');
    Array.prototype.forEach.call(this.mount.querySelectorAll('button'), function (b) { b.disabled = true; });

    this.post('/public/book', {
      service_id: s.service.id,
      staff_id: s.staffId,
      appointment_dt: s.slot,
      pay_mode: payMode,
      name: name,
      email: email,
      phone: e.phone.value.trim()
    }).then(function (res) {
      if (res && res.success && res.data && res.data.checkout_url) {
        window.location.href = res.data.checkout_url;
        return;
      }
      var m = (res && res.message) ? res.message : 'Sorry, we could not start your booking. Please try again.';
      self.msg(m, 'error');
      Array.prototype.forEach.call(self.mount.querySelectorAll('button'), function (b) { b.disabled = false; });
    }).catch(function () {
      self.msg('Network error. Please try again.', 'error');
      Array.prototype.forEach.call(self.mount.querySelectorAll('button'), function (b) { b.disabled = false; });
    });
  };

  function SuccessWidget(mount) {
    this.mount = mount;
    this.api = (mount.getAttribute('data-api') || '/wp-json/savvi-pos/v1').replace(/\/$/, '');
    this.sym = mount.getAttribute('data-currency') || '£';
  }

  SuccessWidget.prototype.boot = function () {
    var self = this;
    var params = new URLSearchParams(window.location.search);
    var sid = params.get('session_id');
    this.mount.hidden = false;
    if (!sid) {
      this.render(el('p', { class: 'neo-body', text: 'We could not find your booking reference.' }));
      return;
    }
    this.render(el('p', { class: 'neo-caption', text: 'Confirming your booking…' }));

    // Retry briefly in case the webhook is still catching up.
    var attempts = 0;
    (function poll() {
      attempts++;
      fetch(self.api + '/public/confirm?session_id=' + encodeURIComponent(sid), { headers: { 'Accept': 'application/json' } })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res && res.success && res.data && res.data.booking) { self.renderBooking(res.data.booking); return; }
          if (attempts < 4) { setTimeout(poll, 1500); return; }
          self.render(el('p', { class: 'neo-body', text: (res && res.message) ? res.message : 'Your payment is processing. You will receive an email shortly.' }));
        })
        .catch(function () {
          if (attempts < 4) { setTimeout(poll, 1500); return; }
          self.render(el('p', { class: 'neo-body', text: 'Your payment is processing. You will receive a confirmation email shortly.' }));
        });
    })();
  };

  SuccessWidget.prototype.render = function (node) { this.mount.innerHTML = ''; this.mount.appendChild(node); };

  SuccessWidget.prototype.renderBooking = function (b) {
    var when = b.appointment_dt ? new Date(b.appointment_dt.replace(' ', 'T')) : null;
    var whenText = when ? when.toLocaleString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }) : b.appointment_dt;
    var balance = parseFloat(b.balance_due) || 0;
    this.render(el('div', { class: 'savvi-book savvi-book--success' }, [
      el('p', { class: 'neo-h3', text: 'You are booked in' }),
      el('p', { class: 'neo-body', text: b.service + ' with ' + b.staff }),
      el('p', { class: 'neo-body', text: whenText }),
      el('p', { class: 'neo-caption', text: balance > 0
        ? 'Deposit paid. Balance of ' + money(this.sym, balance) + ' is due in the salon.'
        : 'Paid in full. Nothing further to pay.' }),
      el('p', { class: 'neo-caption', text: 'A confirmation email is on its way.' })
    ]));
  };

  ready(function () {
    Array.prototype.forEach.call(document.querySelectorAll('[data-savvi-mount="book"]'), function (m) { new Widget(m).boot(); });
    Array.prototype.forEach.call(document.querySelectorAll('[data-savvi-mount="book-success"]'), function (m) { new SuccessWidget(m).boot(); });
  });
})();
