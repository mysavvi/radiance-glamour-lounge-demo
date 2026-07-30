# NEO SEO & GEO Specification v1 — Industrial-Grade Standard

> Single source of truth for search-engine optimisation, generative engine optimisation, and AI/LLM discoverability on every Neo rebuild. 24 sections, 4 tiers.

---

# TIER 1 — TECHNICAL SEO INFRASTRUCTURE

---

## §1 — HTML `<head>` Template

Every page in every Neo rebuild **must** include this complete `<head>` block. Populate from scrape data (`contact.json`, `branding.json`, `site_manifest.json`).

```html
<head>
  <!-- ═══ 1. Charset & viewport ═══ -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">

  <!-- ═══ 2. Title (50-60 chars | primary keyword first, brand last) ═══ -->
  <title>{Primary Keyword} | {Business Name}</title>

  <!-- ═══ 3. Meta description (120-160 chars | unique per page | ad-copy style) ═══ -->
  <meta name="description" content="{Compelling, keyword-rich description unique to this page}">

  <!-- ═══ 4. Robots ═══ -->
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">

  <!-- ═══ 5. Canonical (self-referencing, absolute URL, lowercase) ═══ -->
  <link rel="canonical" href="{FULL_CANONICAL_URL}">

  <!-- ═══ 6. Language / locale ═══ -->
  <meta http-equiv="content-language" content="en-GB">
  <link rel="alternate" hreflang="en-gb" href="{FULL_CANONICAL_URL}">

  <!-- ═══ 7. Geo signals (local SEO) ═══ -->
  <meta name="geo.region" content="{ISO_3166_REGION}">
  <meta name="geo.placename" content="{CITY}">
  <meta name="geo.position" content="{LAT};{LNG}">
  <meta name="ICBM" content="{LAT}, {LNG}">

  <!-- ═══ 8. Author / publisher (E-E-A-T) ═══ -->
  <meta name="author" content="{Business Name}">

  <!-- ═══ 9. Open Graph ═══ -->
  <meta property="og:title" content="{OG Title}">
  <meta property="og:description" content="{OG Description — 2-4 sentences}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{CANONICAL_URL}">
  <meta property="og:image" content="{ABSOLUTE_URL_TO_1200x630_IMAGE}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="{Descriptive alt text for OG image}">
  <meta property="og:site_name" content="{Business Name}">
  <meta property="og:locale" content="en_GB">

  <!-- ═══ 10. Twitter Card ═══ -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{Twitter Title}">
  <meta name="twitter:description" content="{Twitter Description}">
  <meta name="twitter:image" content="{ABSOLUTE_URL_TO_1200x630_IMAGE}">
  <meta name="twitter:image:alt" content="{Descriptive alt text}">

  <!-- ═══ 11. Favicons ═══ -->
  <link rel="icon" href="/images/favicon.png" type="image/png">
  <link rel="icon" href="/images/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/images/apple-touch-icon.png">

  <!-- ═══ 12. Web app manifest ═══ -->
  <link rel="manifest" href="/manifest.webmanifest">
  <meta name="theme-color" content="{PRIMARY_COLOR_FROM_BRANDING}">

  <!-- ═══ 13. Mobile-specific meta ═══ -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="format-detection" content="telephone=no">
  <meta name="mobile-web-app-capable" content="yes">

  <!-- ═══ 14. Search engine verification (when known) ═══ -->
  <!-- <meta name="google-site-verification" content="{TOKEN}"> -->
  <!-- <meta name="msvalidate.01" content="{TOKEN}"> -->
  <!-- <meta name="yandex-verification" content="{TOKEN}"> -->

  <!-- ═══ 15. Resource hints ═══ -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">

  <!-- ═══ 16. CSS ═══ -->
  <link rel="stylesheet" href="../../design/neo/neo-design.css">
  <link rel="stylesheet" href="site.css">

  <!-- ═══ 17. Structured data (JSON-LD — see §3) ═══ -->
  <script type="application/ld+json">{ ... }</script>

  <!-- ═══ 18. Neo scripts ═══ -->
  <script>document.documentElement.classList.add('js');</script>
  <script src="../../design/neo/theme-init.js"></script>
  <script src="../../design/neo/a11y-init.js"></script>
  <script src="../../design/neo/scroll-reveal.js"></script>
</head>
```

### Title Tag Rules

| Rule | Detail |
|------|--------|
| Length | 50–60 characters |
| Structure | `{Primary Keyword} — {Secondary} \| {Brand}` |
| Uniqueness | Every page must have a unique title |
| Keyword placement | Primary keyword in first 3 words |
| Never | Duplicate titles, all-caps, keyword stuffing |

### Meta Description Rules

| Rule | Detail |
|------|--------|
| Length | 120–160 characters |
| Tone | Ad copy — persuasive, action-oriented, includes CTA |
| Uniqueness | Every page must have a unique description |
| Content | Must include: primary keyword, location (if local), value proposition |

---

## §2 — URL Architecture

| Rule | Example |
|------|---------|
| Lowercase only | `treatments.html` not `Treatments.html` |
| Hyphens for word separation | `lash-extensions.html` not `lash_extensions.html` |
| 3–5 words max in slug | `training-courses.html` |
| No dates, numbers, or IDs | `faq.html` not `faq-2026.html` |
| No stop words | `beauty-treatments.html` not `our-beauty-treatments-page.html` |
| Consistent trailing slash policy | Neo uses no trailing slash on `.html` files |
| Flat hierarchy | Max 2 levels from root |

---

## §3 — Structured Data (JSON-LD)

All structured data uses **JSON-LD** format in `<head>`. Every page gets a **stacked schema** — multiple `@type` blocks in a `@graph` array.

### Business Type Detection

| Business Category | Schema.org `@type` | Detection Keywords |
|---|---|---|
| Beauty salon/spa | `BeautySalon` | beauty, salon, spa, aesthetics, lashes, nails |
| Hair salon | `HairSalon` | hair, barber, stylist, colourist |
| Restaurant/café | `Restaurant` | restaurant, café, menu, dining |
| Medical/dental | `MedicalBusiness` | clinic, medical, dental, doctor |
| Legal/accounting | `ProfessionalService` | solicitor, accountant, legal |
| Fitness/gym | `HealthClub` | gym, fitness, personal trainer |
| Retail/shop | `Store` | shop, store, retail, boutique |
| Generic/unknown | `LocalBusiness` | safe fallback |

### Homepage Schema Stack

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "{DetectedBusinessType}",
      "@id": "{SITE_URL}/#business",
      "name": "{BUSINESS_NAME}",
      "description": "{BUSINESS_DESCRIPTION}",
      "url": "{SITE_URL}",
      "telephone": "{PHONE}",
      "email": "{EMAIL}",
      "image": "{HERO_IMAGE}",
      "logo": "{LOGO_IMAGE}",
      "priceRange": "{PRICE_RANGE}",
      "currenciesAccepted": "GBP",
      "paymentAccepted": "Cash, Credit Card",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "{STREET}",
        "addressLocality": "{CITY}",
        "addressRegion": "{REGION}",
        "postalCode": "{POSTCODE}",
        "addressCountry": "GB"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "{LAT}",
        "longitude": "{LNG}"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
      "areaServed": [
        { "@type": "City", "name": "{CITY}" }
      ],
      "sameAs": ["{INSTAGRAM_URL}", "{FACEBOOK_URL}"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "{SERVICE}" } }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "{SITE_URL}/#website",
      "name": "{BUSINESS_NAME}",
      "url": "{SITE_URL}",
      "publisher": { "@id": "{SITE_URL}/#business" }
    },
    {
      "@type": "WebPage",
      "@id": "{PAGE_URL}",
      "name": "{PAGE_TITLE}",
      "url": "{PAGE_URL}",
      "isPartOf": { "@id": "{SITE_URL}/#website" },
      "about": { "@id": "{SITE_URL}/#business" },
      "description": "{META_DESCRIPTION}",
      "breadcrumb": { "@id": "{PAGE_URL}/#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "{PAGE_URL}/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "{SITE_URL}" }
      ]
    }
  ]
}
```

### Service Page: add per-category `Service` schema
### Training Page: add `Course` schema per course
### FAQ Page: add `FAQPage` with `mainEntity` array
### About Page: add `Person` schema (E-E-A-T — see §11)
### Contact Page: add `ContactPoint` schema

### AggregateRating (When Testimonials Available)

If `testimonials.json` contains reviews, add to `LocalBusiness`:

```json
{
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{AVG}",
    "reviewCount": "{COUNT}",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "{NAME}" },
      "datePublished": "{DATE}",
      "reviewBody": "{TEXT}",
      "reviewRating": { "@type": "Rating", "ratingValue": "{RATING}", "bestRating": "5" }
    }
  ]
}
```

> Only use genuine first-party reviews. Never fabricate reviews or ratings.

### BreadcrumbList (Every Page Except Homepage)

Schema + visible HTML:

```html
<nav aria-label="Breadcrumb" class="neo-breadcrumbs-wrap">
  <ol class="neo-breadcrumbs">
    <li><a href="index.html">Home</a></li>
    <li aria-current="page">{Current Page}</li>
  </ol>
</nav>
```

---

## §4 — Discovery Files

### robots.txt

```
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: {SITE_URL}/sitemap.xml

# ═══ Traditional search engines ═══
User-agent: Bingbot
Allow: /
User-agent: DuckDuckBot
Allow: /
User-agent: YandexBot
Allow: /
User-agent: Applebot
Allow: /
User-agent: Slurp
Allow: /

# ═══ AI SEARCH BOTS ═══
User-agent: OAI-SearchBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Amazonbot
Allow: /

# ═══ AI USER-TRIGGERED FETCHERS ═══
User-agent: ChatGPT-User
Allow: /
User-agent: Claude-User
Allow: /
User-agent: Perplexity-User
Allow: /

# ═══ AI TRAINING BOTS ═══
User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: GoogleOther
Allow: /
User-agent: Meta-ExternalAgent
Allow: /
User-agent: CCBot
Allow: /
```

### sitemap.xml (auto-generated)

- Include only indexable, 200-status pages
- `<lastmod>` = build date (ISO 8601)
- Omit `<priority>` and `<changefreq>` (Google ignores them)
- Use `image:` extension for pages with images
- Reference in `robots.txt`

### llms.txt — LLM site guide (markdown)
### llms-full.txt — Full content dump (all pages concatenated)
### manifest.webmanifest — PWA manifest

---

## §5 — Image SEO

| Position | Attributes |
|---|---|
| Hero / above fold | `fetchpriority="high" decoding="async"` |
| Below fold | `loading="lazy" decoding="async"` |
| **All images** | `width="X" height="Y"` (explicit dimensions) |
| **All images** | Descriptive `alt` text (80–125 chars) |

### Format & Dimensions

| Use Case | Format | Max Dimensions | Max Size |
|---|---|---|---|
| Hero images | WebP/JPEG | 1920×1080 | 200KB |
| OG share | JPEG/PNG | 1200×630 | 300KB |
| Thumbnails | WebP | 600×400 | 80KB |
| Icons/logos | SVG/PNG | As needed | 30KB |

---

## §6 — HTTP Headers & Security Trust Signals

| Header | Value | Purpose |
|---|---|---|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | Forces HTTPS |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME sniffing |
| `X-Frame-Options` | `SAMEORIGIN` | Prevents clickjacking |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controls referrer leakage |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=()` | Restricts browser APIs |
| `Cache-Control` | `public, max-age=31536000, immutable` (versioned assets) | Performance |
| `Cache-Control` | `public, max-age=3600, must-revalidate` (HTML) | Freshness |

---

## §7 — Core Web Vitals

| Metric | Target |
|---|---|
| LCP | ≤ 2.5s |
| INP | ≤ 200ms |
| CLS | ≤ 0.1 |

Font loading: `font-display: swap` + system font fallback stack.

---

## §8 — Custom 404 Page

Every rebuild includes `404.html`: branded, returns HTTP 404, links to homepage and main pages.

---

# TIER 2 — CONTENT & GEO ARCHITECTURE

---

## §9 — Content Architecture

### Definition-Lead: First 200 words must directly answer the page's core question.
### Heading Hierarchy: Single `<h1>`, sequential nesting, headings as search queries.
### Semantic HTML5: `<section>`, `<article>`, `<nav>`, `<main>`, `<footer>`, `<aside>`.
### Modular Formatting: Short paragraphs (2–4 sentences), lists, tables, FAQ accordions.
### Entity-Rich Language: Full business name, location, specific service names.
### Inline FAQs: 3–5 questions per service page with FAQPage schema.

---

## §10 — Content Brief Template

| Page Type | Primary Keyword | Word Count | Readability |
|---|---|---|---|
| Homepage | `{business type} {city}` | 800–1200 | Flesch 60–70 |
| Service | `{service} {city}` | 1000–1500 | Flesch 60–70 |
| Training | `{training} courses {city}` | 1000–1500 | Flesch 60–70 |
| FAQ | `{business type} FAQ` | 1500–2500 | Flesch 60–70 |
| Contact | `{business} {city} contact` | 300–500 | Flesch 60–70 |
| About | `{owner/business} {city}` | 600–1000 | Flesch 60–70 |

---

## §11 — E-E-A-T Implementation

| Signal | Implementation |
|---|---|
| Experience | Years of experience statement, case examples |
| Expertise | Accreditations, qualifications, technique knowledge |
| Authoritativeness | `sameAs` links, consistent NAP |
| Trustworthiness | HTTPS, privacy policy, terms, clear contact info |

Trust pages required: `privacy-policy.html` + `terms.html` (linked in footer).

---

## §12 — Internal Linking

| Rule | Detail |
|------|--------|
| Min 3 links per page | To other internal pages |
| Descriptive anchor text | Not "click here" |
| Breadcrumbs on subpages | Visual + schema |
| CTA on every page | Link to booking/contact |
| No orphan pages | Every page reachable from ≥2 others |

---

# TIER 3 — AI / LLM DISCOVERABILITY

---

## §13 — AI Crawler Management

| Category | Bots | Action |
|---|---|---|
| Search | OAI-SearchBot, Claude-SearchBot, PerplexityBot | Always allow |
| User-triggered | ChatGPT-User, Claude-User, Perplexity-User | Always allow |
| Training | GPTBot, ClaudeBot, Google-Extended, CCBot | Allow by default |
| Aggressive | Bytespider | Monitor/block |

RAG-optimised content: one topic per section, self-contained paragraphs, entities over pronouns.

---

## §14 — Voice Search & Speakable

Add `SpeakableSpecification` to WebPage schema on homepage, about, FAQ. Use conversational headings and 40–60 word answers.

---

# TIER 4 — INDUSTRIAL INFRASTRUCTURE

---

## §15 — Multi-Engine Search Strategy

Cover Google, Bing (+ Copilot), DuckDuckGo, Yandex, Apple/Siri. Additional robots.txt rules for Bingbot, DuckDuckBot, YandexBot, Applebot, Slurp.

---

## §16 — IndexNow Protocol

POST changed URLs to `api.indexnow.org` after deployment for instant Bing/Yandex indexing. Deploy key file at domain root.

---

## §17 — Local Citation & NAP Audit

Every rebuild includes `citation-checklist.md` with master NAP format and Tier 1/Tier 2 UK directory checklist.

**Tier 1** (must-claim): Google Business Profile, Bing Places, Apple Business Connect, Yelp UK, Yell, Thomson Local, Facebook Business, Instagram Business.

**Tier 2** (industry-specific): Treatwell, Fresha, TripAdvisor, NHS Choices, etc.

---

## §18 — Entity & Knowledge Graph

`sameAs` in LocalBusiness must link to all verified profiles. Consistent `@id` cross-references. Knowledge Panel pathway via GBP + citations + Wikidata.

---

## §19 — Redirect Mapping

Every rebuild includes `redirects.md` and `.htaccess` template. Map all scraped URLs to new equivalents. 301 only, no chains, no loops.

---

## §20 — Duplicate Content Prevention

Enforce: www/non-www choice, HTTPS, lowercase URLs, self-referencing canonicals, min 300 words unique body copy per page.

---

## §21 — Page Speed Budget

| Page Type | Max Total Weight |
|---|---|
| Homepage | 650KB |
| Service | 545KB |
| Contact | 335KB |
| About | 440KB |
| FAQ | 240KB |

Third-party script policy: Google Fonts ✅, GA4 ✅ (async), GTM ⚠️, chat widgets ❌.

---

## §22 — Accessibility ↔ SEO Overlap

WCAG compliance strengthens SEO. Required: `<html lang="en-GB">`, skip-link, `aria-label` on navs, `<main>`, `<footer role="contentinfo">`, colour contrast ≥ 4.5:1.

---

## §23 — Automated SEO Validation

Run `bash design/neo/seo-audit.sh rebuilds/{project}/` before delivery. Must exit 0.

Hard fails include: missing discovery files, missing managed `neo-seo` head
block, canonical/siteUrl mismatch, GEO meta when lat/lng are set,
sitemap↔page parity, duplicate titles/descriptions (outreach + 404 excluded),
and for `clientFacing: true` builds: deployment deliverables, IndexNow key
file, and visible breadcrumbs on subpages.

Warnings cover title/description length, image alt/dims, and soft GEO polish.

---

## §24 — Post-Deployment Monitoring

Every rebuild includes `deployment-checklist.md`:
- **Day 1**: Submit sitemaps (Google + Bing), ping IndexNow, validate schema, test OG/Twitter
- **72 hours**: Lighthouse audit (90+), verify indexing, check mobile usability
- **7 days**: Monitor impressions, verify redirects, begin Tier 1 citations

---

_Full specification with code examples, templates, and schemas: see the approved implementation plan._
