#!/bin/bash
# ═══════════════════════════════════════════════════════════
# NEO SEO AUDIT — Industrial SEO/GEO/LLM gate for every rebuild
# Usage: bash design/neo/seo-audit.sh rebuilds/{project}/
# Exit codes: 0 = PASS, 1 = FAIL
# ═══════════════════════════════════════════════════════════

PASS=0; FAIL=0; WARN=0
DIR="${1:-.}"
DIR="${DIR%/}"

# Client-facing builds (site-config.json: "clientFacing": true) must ship
# deployment deliverables — missing ones FAIL instead of WARN.
CLIENT_FACING=0
HAS_GEO=0
SITE_URL=""
if [ -f "$DIR/site-config.json" ] && command -v python3 &>/dev/null; then
  if python3 -c "import json,sys; sys.exit(0 if json.load(open('$DIR/site-config.json')).get('clientFacing') else 1)" 2>/dev/null; then
    CLIENT_FACING=1
  fi
  if python3 -c "
import json,sys
d=json.load(open('$DIR/site-config.json'))
loc=d.get('locale') or {}
sys.exit(0 if loc.get('lat') is not None and loc.get('lng') is not None else 1)
" 2>/dev/null; then
    HAS_GEO=1
  fi
  SITE_URL=$(python3 -c "import json; print(json.load(open('$DIR/site-config.json')).get('siteUrl') or '')" 2>/dev/null)
fi

echo ""
echo "═══════════════════════════════════════════"
echo "  NEO SEO AUDIT"
echo "  Target: $DIR"
if [ "$CLIENT_FACING" -eq 1 ]; then
  echo "  Mode: client-facing (deliverables + GEO breadcrumbs required)"
fi
echo "═══════════════════════════════════════════"
echo ""

# ── 1. Discovery files exist ──────────────────────────────
echo "── Discovery Files ──"
for f in robots.txt sitemap.xml llms.txt llms-full.txt manifest.webmanifest 404.html; do
  if [ -f "$DIR/$f" ]; then
    echo "  ✅ $f"
    ((PASS++))
  else
    echo "  ❌ MISSING: $f"
    ((FAIL++))
  fi
done

# IndexNow key file (client-facing required)
if [ "$CLIENT_FACING" -eq 1 ]; then
  if [ -f "$DIR/indexnow-key.txt" ] && ls "$DIR"/*.txt >/dev/null 2>&1; then
    KEY=$(head -n1 "$DIR/indexnow-key.txt" | tr -d '[:space:]')
    if [ -n "$KEY" ] && [ -f "$DIR/$KEY.txt" ]; then
      echo "  ✅ IndexNow key ($KEY.txt)"
      ((PASS++))
    else
      echo "  ❌ MISSING: IndexNow host key file ({key}.txt) for client-facing build"
      ((FAIL++))
    fi
  else
    echo "  ❌ MISSING: indexnow-key.txt (run SEO generator for client-facing builds)"
    ((FAIL++))
  fi
fi

# llms.txt must have Contact + Pages sections (GEO/LLM citation surface)
if [ -f "$DIR/llms.txt" ]; then
  if grep -q '^## Contact' "$DIR/llms.txt" && grep -q '^## Pages' "$DIR/llms.txt"; then
    echo "  ✅ llms.txt has Contact + Pages sections"
    ((PASS++))
  else
    echo "  ❌ llms.txt missing Contact/Pages sections (re-run generator)"
    ((FAIL++))
  fi
fi
echo ""

# ── 2. Deployment deliverables ────────────────────────────
echo "── Deployment Deliverables ──"
for f in citation-checklist.md redirects.md deployment-checklist.md; do
  if [ -f "$DIR/$f" ]; then
    echo "  ✅ $f"
    ((PASS++))
  elif [ "$CLIENT_FACING" -eq 1 ]; then
    echo "  ❌ MISSING: $f (required for client-facing builds)"
    ((FAIL++))
  else
    echo "  ⚠️  MISSING: $f (recommended)"
    ((WARN++))
  fi
done
echo ""

# ── 3. Per-page HTML checks ──────────────────────────────
echo "── Per-Page Validation ──"
for html in "$DIR"/*.html; do
  [ ! -f "$html" ] && continue
  page=$(basename "$html")

  # Outreach email artefacts are not site pages — skip entirely.
  case "$page" in
    outreach-*.html) continue ;;
  esac

  # 404.html is noindex: only base checks (title/description/h1/lang) apply.
  INDEXABLE=1
  [ "$page" = "404.html" ] && INDEXABLE=0

  errors=0

  # Title tag
  if ! grep -q '<title>' "$html"; then
    echo "  ❌ $page: missing <title>"
    ((FAIL++)); ((errors++))
  else
    title_text=$(python3 -c "
import re,sys,html as H
t=open('$html').read()
m=re.search(r'<title>(.*?)</title>',t,re.I|re.S)
print(H.unescape(m.group(1)).strip() if m else '')
" 2>/dev/null)
    tlen=${#title_text}
    if [ "$INDEXABLE" -eq 1 ] && [ "$tlen" -gt 0 ]; then
      if [ "$tlen" -lt 15 ]; then
        echo "  ⚠️  $page: title very short ($tlen chars)"
        ((WARN++))
      elif [ "$tlen" -gt 70 ]; then
        echo "  ⚠️  $page: title long ($tlen chars; aim ≤60)"
        ((WARN++))
      fi
    fi
  fi

  # Meta description
  if ! grep -q 'name="description"' "$html"; then
    echo "  ❌ $page: missing meta description"
    ((FAIL++)); ((errors++))
  else
    desc_len=$(python3 -c "
import re,sys,html as H
t=open('$html').read()
m=re.search(r'name=[\"\\']description[\"\\'][^>]*content=[\"\\'](.*?)[\"\\']|content=[\"\\'](.*?)[\"\\'][^>]*name=[\"\\']description[\"\\']',t,re.I|re.S)
raw=(m.group(1) or m.group(2) or '') if m else ''
print(len(H.unescape(raw).strip()))
" 2>/dev/null)
    desc_len=${desc_len:-0}
    if [ "$INDEXABLE" -eq 1 ] && [ "$desc_len" -gt 0 ]; then
      if [ "$desc_len" -lt 50 ]; then
        echo "  ⚠️  $page: meta description short ($desc_len chars)"
        ((WARN++))
      elif [ "$desc_len" -gt 160 ]; then
        echo "  ⚠️  $page: meta description long ($desc_len chars; aim ≤155)"
        ((WARN++))
      fi
    fi
  fi

  if [ "$INDEXABLE" -eq 1 ]; then
  # Managed SEO block (generator ownership)
  if ! grep -q 'neo-seo:begin' "$html"; then
    echo "  ❌ $page: missing neo-seo managed head block (run python3 -m neo_agent.seo.generate)"
    ((FAIL++)); ((errors++))
  else
    ((PASS++))
  fi

  # Canonical
  if ! grep -q 'rel="canonical"' "$html"; then
    echo "  ❌ $page: missing canonical"
    ((FAIL++)); ((errors++))
  elif [ -n "$SITE_URL" ]; then
    if ! grep -q "rel=\"canonical\" href=\"$SITE_URL" "$html"; then
      echo "  ❌ $page: canonical does not start with siteUrl ($SITE_URL)"
      ((FAIL++)); ((errors++))
    fi
  fi

  # OG tags
  if ! grep -q 'og:title' "$html"; then
    echo "  ❌ $page: missing Open Graph tags"
    ((FAIL++)); ((errors++))
  fi
  if ! grep -q 'og:image:width' "$html"; then
    echo "  ⚠️  $page: missing og:image:width (re-run generator)"
    ((WARN++))
  fi
  if ! grep -q 'hreflang="x-default"' "$html"; then
    echo "  ⚠️  $page: missing hreflang x-default"
    ((WARN++))
  fi

  # Twitter card
  if ! grep -q 'twitter:card' "$html"; then
    echo "  ❌ $page: missing Twitter Card"
    ((FAIL++)); ((errors++))
  fi

  # JSON-LD
  if ! grep -q 'application/ld+json' "$html"; then
    echo "  ❌ $page: missing JSON-LD structured data"
    ((FAIL++)); ((errors++))
  fi

  # GEO meta when coordinates configured
  if [ "$HAS_GEO" -eq 1 ]; then
    if ! grep -q 'name="geo.position"' "$html"; then
      echo "  ❌ $page: locale lat/lng set but geo.position missing"
      ((FAIL++)); ((errors++))
    else
      ((PASS++))
    fi
  fi
  fi

  # Single h1
  h1_count=$(grep -c '<h1' "$html" 2>/dev/null | tr -d '[:space:]')
  h1_count=${h1_count:-0}
  if [ "$h1_count" -eq 1 ]; then
    ((PASS++))
  elif [ "$h1_count" -eq 0 ]; then
    echo "  ❌ $page: no <h1> found"
    ((FAIL++)); ((errors++))
  else
    echo "  ❌ $page: has $h1_count h1 tags (expected 1)"
    ((FAIL++)); ((errors++))
  fi

  # Images have alt
  imgs_total=$(grep -c '<img' "$html" 2>/dev/null | tr -d '[:space:]')
  imgs_total=${imgs_total:-0}
  if [ "$imgs_total" -gt 0 ]; then
    imgs_with_alt=$(grep -c 'alt=' "$html" 2>/dev/null | tr -d '[:space:]')
    imgs_with_alt=${imgs_with_alt:-0}
    if [ "$imgs_with_alt" -lt "$imgs_total" ]; then
      missing=$((imgs_total - imgs_with_alt))
      echo "  ⚠️  $page: $missing image(s) missing alt text"
      ((WARN++))
    else
      ((PASS++))
    fi

    # Images have width/height
    imgs_with_dims=$(grep -o '<img[^>]*' "$html" 2>/dev/null | grep -c 'width=' | tr -d '[:space:]')
    imgs_with_dims=${imgs_with_dims:-0}
    if [ "$imgs_with_dims" -lt "$imgs_total" ]; then
      echo "  ⚠️  $page: some images missing width/height (CLS risk)"
      ((WARN++))
    else
      ((PASS++))
    fi
  fi

  # Breadcrumbs (not on index.html or 404.html)
  if [ "$page" != "index.html" ] && [ "$page" != "404.html" ]; then
    if ! grep -q 'aria-label="Breadcrumb"' "$html"; then
      if [ "$CLIENT_FACING" -eq 1 ]; then
        echo "  ❌ $page: missing visible breadcrumbs (required for client-facing)"
        ((FAIL++)); ((errors++))
      else
        echo "  ⚠️  $page: missing visible breadcrumbs"
        ((WARN++))
      fi
    else
      ((PASS++))
    fi
  fi

  # lang attribute
  if ! grep -q 'lang="en' "$html"; then
    echo "  ❌ $page: missing lang attribute on <html>"
    ((FAIL++)); ((errors++))
  else
    ((PASS++))
  fi

  # Count passes for clean pages
  if [ "$errors" -eq 0 ]; then
    echo "  ✅ $page: all checks passed"
    ((PASS+=5))
  fi

done
echo ""

# ── 4. JSON-LD validation ────────────────────────────────
echo "── JSON-LD Validation ──"
if command -v python3 &>/dev/null; then
  for html in "$DIR"/*.html; do
    [ ! -f "$html" ] && continue
    page=$(basename "$html")
    case "$page" in
      outreach-*.html|404.html) continue ;;
    esac
    result=$(python3 -c "
import re, json, sys
with open('$html', 'r') as f:
    content = f.read()
blocks = re.findall(r'<script type=\"application/ld\+json\">(.*?)</script>', content, re.DOTALL)
if not blocks:
    sys.exit(0)
for i, block in enumerate(blocks):
    try:
        data = json.loads(block)
    except json.JSONDecodeError as e:
        print(f'  ❌ $page: invalid JSON-LD block {i+1}: {e}')
        sys.exit(1)
print(f'  ✅ $page: {len(blocks)} JSON-LD block(s) valid')
" 2>/dev/null)
    if [ $? -eq 0 ]; then
      echo "$result"
      ((PASS++))
    else
      echo "$result"
      ((FAIL++))
    fi
  done
else
  echo "  ⚠️  python3 not found — skipping JSON-LD validation"
  ((WARN++))
fi
echo ""

# ── 5. Sitemap validation + page parity ───────────────────
echo "── Sitemap Validation ──"
if [ -f "$DIR/sitemap.xml" ]; then
  if command -v python3 &>/dev/null; then
    if python3 -c "import xml.etree.ElementTree as ET; ET.parse('$DIR/sitemap.xml')" 2>/dev/null; then
      echo "  ✅ sitemap.xml is valid XML"
      ((PASS++))
    else
      echo "  ❌ sitemap.xml is not valid XML"
      ((FAIL++))
    fi
    # Parity: every indexable page ↔ sitemap loc (by path)
    parity=$(python3 -c "
import re, sys, xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlparse
d = Path('$DIR')
site = '''$SITE_URL'''.rstrip('/')
pages = []
for p in sorted(d.glob('*.html')):
    name = p.name
    if name == '404.html' or name.startswith('outreach-'):
        continue
    pages.append('/' if name == 'index.html' else '/' + name)
try:
    root = ET.parse(d / 'sitemap.xml').getroot()
except Exception as e:
    print('parse-fail')
    sys.exit(0)
ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
locs = []
for loc in root.findall('.//sm:loc', ns):
    if loc.text:
        path = urlparse(loc.text.strip()).path or '/'
        if path != '/' and path.endswith('/'):
            path = path.rstrip('/')
        locs.append(path if path else '/')
missing = [p for p in pages if p not in locs]
extra = [p for p in locs if p not in pages]
if missing:
    print('missing:' + ','.join(missing))
if extra:
    print('extra:' + ','.join(extra))
if not missing and not extra:
    print('ok')
" 2>/dev/null)
    if echo "$parity" | grep -q '^ok$'; then
      echo "  ✅ sitemap ↔ page parity"
      ((PASS++))
    elif echo "$parity" | grep -q 'missing:'; then
      echo "  ❌ sitemap missing pages: $(echo "$parity" | grep '^missing:' | sed 's/^missing://')"
      ((FAIL++))
    elif echo "$parity" | grep -q 'extra:'; then
      echo "  ❌ sitemap has unknown locs: $(echo "$parity" | grep '^extra:' | sed 's/^extra://')"
      ((FAIL++))
    fi
  fi
fi

# ── 6. robots.txt references sitemap ──────────────────────
if [ -f "$DIR/robots.txt" ]; then
  if grep -qi 'sitemap' "$DIR/robots.txt"; then
    echo "  ✅ robots.txt references sitemap"
    ((PASS++))
  else
    echo "  ❌ robots.txt does not reference sitemap"
    ((FAIL++))
  fi
fi
echo ""

# ── 7. Duplicate title/description check ─────────────────
echo "── Uniqueness Check ──"
# Exclude outreach + 404 from uniqueness (404 is intentionally distinct)
uniq_files=()
for html in "$DIR"/*.html; do
  [ ! -f "$html" ] && continue
  page=$(basename "$html")
  case "$page" in
    outreach-*.html|404.html) continue ;;
  esac
  uniq_files+=("$html")
done

if [ ${#uniq_files[@]} -gt 0 ]; then
  titles=$(grep -h '<title>' "${uniq_files[@]}" 2>/dev/null | sort)
  dup_titles=$(echo "$titles" | uniq -d | wc -l | tr -d ' ')
  if [ "$dup_titles" -gt 0 ]; then
    echo "  ❌ $dup_titles duplicate <title> tag(s) found"
    ((FAIL++))
  else
    echo "  ✅ All title tags are unique"
    ((PASS++))
  fi

  descs=$(grep -h 'name="description"' "${uniq_files[@]}" 2>/dev/null | sort)
  dup_descs=$(echo "$descs" | uniq -d | wc -l | tr -d ' ')
  if [ "$dup_descs" -gt 0 ]; then
    echo "  ❌ $dup_descs duplicate meta description(s) found"
    ((FAIL++))
  else
    echo "  ✅ All meta descriptions are unique"
    ((PASS++))
  fi
else
  echo "  ⚠️  No indexable HTML pages found"
  ((WARN++))
fi
echo ""

# ── Summary ──────────────────────────────────────────────
echo "═══════════════════════════════════════════"
echo "  PASS: $PASS  |  FAIL: $FAIL  |  WARN: $WARN"
echo ""
if [ $FAIL -gt 0 ]; then
  echo "  RESULT: ❌ FAILED — fix $FAIL issue(s) before delivery"
  echo "═══════════════════════════════════════════"
  exit 1
else
  echo "  RESULT: ✅ PASSED"
  echo "═══════════════════════════════════════════"
  exit 0
fi
