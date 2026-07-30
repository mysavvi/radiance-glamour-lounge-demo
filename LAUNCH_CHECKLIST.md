# Launch checklist — Radiance Glamour Lounge
## Commerce (SAVVI POS)

- [ ] SAVVI POS plugin installed and activated
- [ ] Stripe keys + webhook secret set in SAVVI POS → Settings
- [ ] Business name, brand colour, salon email, booking + shop URLs set
- [ ] Services, staff and working hours seeded
- [ ] Stripe webhook enabled: checkout.session.completed, checkout.session.expired, payment_intent.succeeded
- [ ] REST base excluded from page cache
- [ ] Test booking (deposit + full) reaches Booking Confirmed and emails send
- [ ] Test shop order pays, decrements stock, and emails a receipt


## Pages

- [ ] All 10 pages created with the right title + slug (`PAGE_MAP.md`)
- [ ] Each page uses a Full Width / Blank / Canvas template
- [ ] Each page has its Custom HTML / HTML widget block pasted in full

## Links and content

- [ ] Every nav link works (Home, Treatments & Prices, Aesthetic Clinic, Reviews, Contact, Book an Appointment, Booking Confirmed, Shop, Privacy Policy, Terms and Conditions)
- [ ] Footer Privacy and Terms links work
- [ ] Mobile menu opens and closes
- [ ] Bottom nav works on phone

## Functionality

- [ ] Page scripts work (hero scroll, galleries, rotators where used)
- [ ] Social card loads on Home (if used)
- [ ] Booking/contact form actually sends (configured, or replaced with a form plugin)
- [ ] Cookie banner links to Privacy Policy
- [ ] Phone links dial correctly on mobile

## SEO and legal

- [ ] Title + meta description set per page in your SEO plugin (`PAGE_MAP.md` table)
- [ ] SSL active (`https://` everywhere)
- [ ] Google Search Console sitemap submitted
- [ ] Favicon set in Customizer → Site Icon

## After design changes

- [ ] Edit only in `production_site/` (never hand-patch `pages/` overflow/CSS)
- [ ] Re-run `python3 scripts/bundle_wordpress.py` (or `scripts/rebuild_pages.py`)
- [ ] `bash production_site/neo/craft-audit.sh production_site` PASS
- [ ] `bash production_site/neo/craft-audit.sh pages` PASS (no `data:text/` URIs)
- [ ] Smoke at 375px: hamburger, home hero, folder gallery, no sideways scroll
- [ ] Re-paste only the pages that changed (or run `scripts/deploy_wp.py`)
- [ ] Follow [`production_site/neo/WP_DELIVERY.md`](production_site/neo/WP_DELIVERY.md)
