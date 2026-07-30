# WordPress paste guide — Radiance Glamour Lounge

No plugins, no FTP, no coding. Each file in `pages/` is a complete,
self-contained block — everything it needs is already inside it.

## Generate / refresh `pages/` (required)

**Do not hand-edit `pages/*.html`.** Source of truth is `production_site/`.
After any design change, rebuild pastes with the inline bundler only:

```bash
python3 scripts/bundle_wordpress.py
# equivalent:
python3 scripts/rebuild_pages.py
```

Then gate the handoff:

```bash
bash production_site/neo/craft-audit.sh production_site
bash production_site/neo/craft-audit.sh pages
```

See [`production_site/neo/WP_DELIVERY.md`](production_site/neo/WP_DELIVERY.md) for Neo’s non-negotiable WP delivery contract.

Pastes must contain real `<style>` and `<script>` blocks. If you see
`data:text/css` or `data:text/javascript`, the paste is invalid — rebuild.

## Before you start

Images load from https://mysavvi.github.io/radiance-glamour-lounge-demo — make sure that demo is deployed (`./deploy_pages.sh`) before you rely on these pages.

## For each of the 10 pages

1. **Pages → Add New** in WordPress. Set the title and slug from `PAGE_MAP.md`.
2. Look at **Page Attributes → Template** in the sidebar. Choose **Full Width**
   or **Blank** if your theme offers one (most modern themes do — no plugin
   needed). If your theme has no such option and you have Elementor
   installed, use the **Canvas** template instead.
3. Add a **Custom HTML** block (built into WordPress — search for "Custom
   HTML" when adding a block). If you use Elementor instead, add an
   **HTML** widget.
4. Open the matching file in `pages/` from this folder, select all, copy.
5. Paste the entire thing into the Custom HTML block / HTML widget.
6. Publish.

Repeat for each page. That's it — nothing to upload separately, nothing
shared to configure first.

## SEO (title and meta description)

See the table at the bottom of `PAGE_MAP.md`. Paste those values into your
SEO plugin's fields for each page (Yoast, Rank Math, or All in One SEO —
whichever you use). A Custom HTML block cannot set these itself.

## Booking/contact form

Booking and shop are powered by the **SAVVI POS** plugin, not a form. The pages carry hydration mounts (`data-savvi-mount`) that come alive once the plugin is active and Stripe keys are set (see the commerce section below). Until then, each page shows a graceful fallback (call the salon).

## Commerce (SAVVI POS booking + shop)

These pages talk to the **SAVVI POS** WordPress plugin. Booking and shop
mounts stay hidden and show a fallback until the plugin is live.

1. Install and activate the **SAVVI POS** plugin on this WordPress site.
2. In **SAVVI POS → Settings**, set your Stripe keys, webhook secret,
   business name, brand colour, salon email, and the booking success URL
   (`/book/success/`) and shop URL (`/shop/`).
3. Seed your services, staff and working hours (or run the provided seeder).
4. Add the Stripe webhook endpoint `{site}/wp-json/savvi-pos/v1/webhooks/stripe` and enable
   `checkout.session.completed`, `checkout.session.expired`, and
   `payment_intent.succeeded`.
5. Exclude `/wp-json/savvi-pos/v1/` from any page cache so live availability and checkout work.

The mounts hydrate automatically once the plugin responds; no shortcodes and
nothing else to paste.

## When your design changes

### Automated Deployment (Recommended)
If you have your WordPress Application Password saved in `.env`, you can deploy all changes automatically:
1. Re-run `python3 scripts/bundle_wordpress.py` (required — never skip).
2. Confirm `bash production_site/neo/craft-audit.sh pages` PASS.
3. Run `python3 scripts/deploy_wp.py` to update all pages on the live WordPress site via the REST API.

### Manual Deployment (Fallback)
1. Re-run `python3 scripts/bundle_wordpress.py`.
2. Confirm craft-audit on `pages/` PASS.
3. Re-paste only the pages that changed — select all in the WordPress
   Custom HTML block, paste over it with the new file's contents.

## Troubleshooting

- **Layout looks boxed / squeezed:** confirm the page template is Full
  Width, Blank, or Canvas (step 2) — a normal template keeps the theme's
  narrower content column.
- **Images missing:** confirm `demo.pagesUrl` is set in `site-config.json`
  and that the demo is actually deployed and reachable.
- **Menu or accessibility button not working:** confirm you pasted the
  *entire* file, including everything above and below the visible content
  — the styles and scripts at the top/bottom are part of the same paste.
  If the file still contains `data:text/`, rebuild with `bundle_wordpress.py`.
- **Sideways scroll on mobile:** do not remove `overflow-x: clip`. Rebuild
  from `production_site/` and re-run craft-audit — see `WP_DELIVERY.md`.
