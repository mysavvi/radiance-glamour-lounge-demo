# Go live — radiance-glamour-lounge

This folder is a complete, ready-to-publish website. No WordPress, no
plugins, no code. Pick whichever of these matches your situation.

## Booking/contact form status

Configured and working — test-submit once before telling the client it's live.

## Option 1 — You already have web hosting

1. Log into your hosting account's control panel (cPanel, Hostinger
   hPanel, IONOS, GoDaddy, etc.) and open **File Manager**.
2. Open the `public_html` folder (sometimes called `www` or `htdocs`).
3. Upload every file and folder from this `production/` folder into it
   (drag and drop, or upload a zip and extract it there).
4. Visit your domain. Most hosts issue a free SSL certificate (the
   padlock/`https://`) automatically within a few hours.

## Option 2 — No hosting yet

Keep the site on the same free GitHub Pages hosting used for the demo,
and point your domain at it:

```bash
./rebuilds/radiance-glamour-lounge/deploy_pages.sh
```

Then at your domain registrar, add **one CNAME record** pointing your
domain at the Pages URL (https://mysavvi.github.io/radiance-glamour-lounge-demo/). Most registrars have a
"connect a domain" or "point this domain" wizard — no code involved.

Two things that are normal, not broken:
- DNS changes can take **up to 24-48 hours** to fully take effect.
- Tick **Enforce HTTPS** in the GitHub repo's Pages settings once the
  domain is verified there.

## Booking/contact form setup (if not done already)

1. Create a free account at Formspree or Web3Forms (about two minutes).
2. Copy the form endpoint URL they give you.
3. Paste it into `site-config.json` under `"form": {"action": "...", ...}`.
4. Re-run: `python3 rebuilds/_shared/bundle_demo.py rebuilds/radiance-glamour-lounge/ --production`
5. Test-submit the form once yourself before telling the client it's live.

## Local preview

```bash
python3 rebuilds/_shared/bundle_demo.py rebuilds/radiance-glamour-lounge/ --production
cd rebuilds/radiance-glamour-lounge/production
python3 -m http.server 8765
```

Open http://localhost:8765/index.html
