# Neo Social Media Card

TikTok Live-style follow section with review chat, gift toasts, side-rail taps, and bottom social logos.

## Files

| File | Role |
|------|------|
| `components/social-media-card.css` | Styles (ships via `neo-design.css`) |
| `components/social-media-card.html` | Markup template |
| `social-media-card.js` | Data hydration + live motion |
| `social-media-card.schema.json` | JSON config shape |
| `assets/social/*.svg` | Brand logos (TikTok, Instagram, Facebook, YouTube, Google) |
| `scripts/build_social_media_card_config.py` | Build config from `contact.json` |

## Add to a rebuild

1. Paste `components/social-media-card.html` into the homepage (section `id="follow"` is typical).
2. Add `social-media-card.json` at the site root (hand-write or run the build script).
3. Load `neo/social-media-card.js` (defer) before `</body>`.
4. Ensure `client-reviews.json` exists or put reviews in the config.
5. Styles are included when you import `neo-design.css`.

## Data (`social-media-card.json`)

The card fetches this file from `data-neo-social-card-src` (default: `social-media-card.json`).

- **social** — URLs for TikTok, Instagram, Facebook, YouTube, Google review
- **media** — background and avatar image paths
- **stats** — viewer count, hearts, comments, bookmarks, shares
- **reviews** or **reviewsUrl** — chat loop (falls back to `client-reviews.json`)

Generate from scrape contact:

```bash
python3 design/neo/scripts/build_social_media_card_config.py rebuilds/your-client --contact path/to/contact.json
```

## Salon template

Neo Salon builds include this card by default. See `.cursor/rules/neo-salon-pro.mdc`.
