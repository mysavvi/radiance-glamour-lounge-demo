#!/bin/bash
# ═══════════════════════════════════════════════════════════
# NEO CRAFT AUDIT — Machine gate for build-phase Craft QA
# Usage:
#   bash production_site/neo/craft-audit.sh production_site
#   bash production_site/neo/craft-audit.sh pages
# Exit codes: 0 = PASS, 1 = FAIL
#
# Complements seo-audit.sh (SEO layer). This gate covers the
# Neo build contract + WP paste delivery bans + impeccable bans.
# ═══════════════════════════════════════════════════════════

PASS=0; FAIL=0; WARN=0
DIR="${1:-.}"
DIR="${DIR%/}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# neo/ lives at production_site/neo → repo root is two levels up
ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
NEO_DIR="$SCRIPT_DIR"
DETECT="$ROOT/.cursor/skills/impeccable/scripts/detect.mjs"

# detect.mjs antipatterns that hard-fail a Neo build (absolute bans + breakage)
HARD_FAIL_IDS="gradient-text side-tab border-accent-on-rounded broken-image low-contrast text-overflow nested-cards skipped-heading tiny-text"

echo ""
echo "═══════════════════════════════════════════"
echo "  NEO CRAFT AUDIT"
echo "  Target: $DIR"
echo "═══════════════════════════════════════════"
echo ""

if ! ls "$DIR"/*.html >/dev/null 2>&1; then
  echo "  ❌ No HTML pages found in $DIR"
  exit 1
fi

# Detect WordPress paste output (inline self-contained blocks)
WP_MODE=0
if grep -l 'wp-html-module\|data-neo-wp-embed\|<!-- wp:html -->' "$DIR"/*.html >/dev/null 2>&1; then
  WP_MODE=1
  echo "── Mode: WordPress paste ──"
else
  echo "── Mode: Neo production ──"
fi
echo ""

# ── 0. WP paste hard-fails (delivery contract) ────────────
if [ "$WP_MODE" -eq 1 ]; then
  echo "── WP Paste Delivery Contract ──"
  for html in "$DIR"/*.html; do
    [ ! -f "$html" ] && continue
    page=$(basename "$html")
    case "$page" in
      outreach-*.html|404.html) continue ;;
    esac
    errors=0

    if grep -q 'data:text/css\|data:text/javascript' "$html"; then
      echo "  ❌ $page: banned data: URI CSS/JS (use inline <style>/<script> via bundle_wordpress.py)"
      ((FAIL++)); ((errors++))
    fi

    if ! grep -q 'neo-mobile-menu--open' "$html"; then
      echo "  ❌ $page: missing .neo-mobile-menu--open CSS (drawer cannot open)"
      ((FAIL++)); ((errors++))
    fi

    if ! grep -q 'overflow-x:[[:space:]]*clip' "$html"; then
      echo "  ❌ $page: missing overflow-x: clip (horizontal scroll risk)"
      ((FAIL++)); ((errors++))
    fi

    if ! grep -q 'toggleNeoMobileMenu\|data-neo-menu-toggle' "$html"; then
      echo "  ❌ $page: missing mobile menu wiring (toggleNeoMobileMenu / data-neo-menu-toggle)"
      ((FAIL++)); ((errors++))
    fi

    if ! grep -q 'data-neo-wp-embed\|\[data-neo-wp-embed\]' "$html"; then
      echo "  ❌ $page: missing data-neo-wp-embed embed root"
      ((FAIL++)); ((errors++))
    fi

    # Classic 100vw full-bleed breakout that widens scrollWidth on mobile
    if grep -qE 'width:[[:space:]]*100vw' "$html" && grep -qE 'margin-left:[[:space:]]*-50vw|margin-left:[[:space:]]*calc\(50% - 50vw\)' "$html"; then
      echo "  ❌ $page: banned 100vw / -50vw breakout (causes sideways scroll)"
      ((FAIL++)); ((errors++))
    fi

    # Scripts must be real <script> blocks after embed, not only early data: links
    if grep -q '<script' "$html"; then
      wrap_line=$(grep -n 'data-neo-wp-embed\|class="wp-html-module"' "$html" | head -1 | cut -d: -f1)
      last_script=$(grep -n '<script' "$html" | tail -1 | cut -d: -f1)
      if [ -n "$wrap_line" ] && [ -n "$last_script" ] && [ "$last_script" -lt "$wrap_line" ]; then
        echo "  ❌ $page: all <script> tags appear before embed content (interactions will miss DOM)"
        ((FAIL++)); ((errors++))
      fi
    fi

    # Home paste: hero + folder markup and inlined JS
    if [ "$page" = "home.html" ] || [ "$page" = "index.html" ]; then
      if ! grep -q 'data-rb-hero-scroll' "$html"; then
        echo "  ❌ $page: missing data-rb-hero-scroll"
        ((FAIL++)); ((errors++))
      elif ! grep -q 'HOLD_MS\|rb-hero-scroll__frame' "$html"; then
        echo "  ❌ $page: hero markup present but hero-scroll JS not inlined"
        ((FAIL++)); ((errors++))
      fi
      if ! grep -q 'data-rb-folder-gallery' "$html"; then
        echo "  ❌ $page: missing data-rb-folder-gallery"
        ((FAIL++)); ((errors++))
      elif ! grep -q 'is-mobile-open\|MOBILE_AUTO_MS' "$html"; then
        echo "  ❌ $page: folder gallery markup present but folder-gallery JS not inlined"
        ((FAIL++)); ((errors++))
      fi
    fi

    if [ "$errors" -eq 0 ]; then
      echo "  ✅ $page: WP paste delivery checks passed"
      ((PASS+=3))
    fi
  done
  echo ""
fi

# ── 1. Per-page Neo contract ──────────────────────────────
echo "── Per-Page Contract ──"
for html in "$DIR"/*.html; do
  [ ! -f "$html" ] && continue
  page=$(basename "$html")
  case "$page" in
    outreach-*.html|404.html) continue ;;
  esac

  errors=0

  # Palette + theme attributes
  if ! grep -q 'data-neo-palette=' "$html"; then
    echo "  ❌ $page: missing data-neo-palette"; ((FAIL++)); ((errors++))
  fi
  if ! grep -q 'data-neo-theme=' "$html"; then
    echo "  ❌ $page: missing data-neo-theme"; ((FAIL++)); ((errors++))
  fi

  # Dark/light toggle stack (file src OR inlined comment marker from bundler)
  has_theme_init=0
  if grep -q 'theme-init\.js' "$html"; then has_theme_init=1; fi
  if [ "$has_theme_init" -eq 0 ]; then
    echo "  ❌ $page: missing theme-init.js"; ((FAIL++)); ((errors++))
  else
    ti_line=$(grep -n 'theme-init\.js' "$html" | head -1 | cut -d: -f1)
    ai_line=$(grep -n 'a11y-init\.js' "$html" | head -1 | cut -d: -f1)
    if [ -n "$ti_line" ] && [ -n "$ai_line" ] && [ "$ti_line" -gt "$ai_line" ]; then
      echo "  ❌ $page: theme-init.js loads after a11y-init.js"; ((FAIL++)); ((errors++))
    fi
  fi
  if ! grep -q 'theme-toggle\.js' "$html"; then
    echo "  ❌ $page: missing theme-toggle.js"; ((FAIL++)); ((errors++))
  fi

  # Accessibility wiring
  if ! grep -q 'neo-skip-link' "$html"; then
    echo "  ❌ $page: missing skip link"; ((FAIL++)); ((errors++))
  fi
  if ! grep -q 'id="neo-a11y-root"' "$html"; then
    echo "  ❌ $page: missing #neo-a11y-root"; ((FAIL++)); ((errors++))
  fi
  if ! grep -q 'a11y-toolbar\.js' "$html"; then
    echo "  ❌ $page: missing a11y-toolbar.js"; ((FAIL++)); ((errors++))
  fi
  if ! grep -q 'data-neo-a11y-open' "$html"; then
    echo "  ❌ $page: missing footer a11y button (data-neo-a11y-open)"; ((FAIL++)); ((errors++))
  fi

  # Mobile chrome (five pieces)
  for piece in neo-mobile-header neo-mobile-menu neo-footer neo-bottom-nav; do
    if ! grep -q "$piece" "$html"; then
      echo "  ❌ $page: missing .$piece"; ((FAIL++)); ((errors++))
    fi
  done
  if ! grep -q 'id="neo-main"' "$html"; then
    echo "  ❌ $page: missing <main id=\"neo-main\">"; ((FAIL++)); ((errors++))
  fi

  # Cookie consent
  if ! grep -q 'neo-cookie-banner' "$html"; then
    echo "  ❌ $page: missing cookie banner"; ((FAIL++)); ((errors++))
  fi
  if ! grep -q 'cookie-consent\.js' "$html"; then
    echo "  ❌ $page: missing cookie-consent.js"; ((FAIL++)); ((errors++))
  fi

  # Footer legal links
  if ! grep -q 'neo-footer__legal' "$html"; then
    echo "  ❌ $page: missing footer legal links (neo-footer__legal)"; ((FAIL++)); ((errors++))
  fi

  # Drawer is an accessible dialog
  if grep -q 'neo-mobile-menu' "$html"; then
    if ! grep -q 'aria-modal="true"' "$html"; then
      echo "  ⚠️  $page: mobile drawer missing aria-modal=\"true\""; ((WARN++))
    fi
  fi

  # Nav active state present somewhere on the page
  if ! grep -q 'aria-current="page"' "$html"; then
    echo "  ⚠️  $page: no aria-current=\"page\" (nav active state)"; ((WARN++))
  fi

  # Motion wiring: data-neo-reveal requires scroll-reveal.js
  if grep -q 'data-neo-reveal' "$html" && ! grep -q 'scroll-reveal\.js' "$html"; then
    echo "  ❌ $page: data-neo-reveal used but scroll-reveal.js not loaded"; ((FAIL++)); ((errors++))
  fi

  if [ "$errors" -eq 0 ]; then
    echo "  ✅ $page: contract checks passed"
    ((PASS+=5))
  fi
done
echo ""

# ── 2. Required pages ────────────────────────────────────
echo "── Required Pages ──"
if [ "$WP_MODE" -eq 1 ]; then
  for f in privacy.html terms.html; do
    if [ -f "$DIR/$f" ]; then
      echo "  ✅ $f"; ((PASS++))
    else
      echo "  ❌ MISSING: $f (required WP paste)"; ((FAIL++))
    fi
  done
else
  for f in privacy-policy.html terms.html; do
    if [ -f "$DIR/$f" ]; then
      echo "  ✅ $f"; ((PASS++))
    else
      echo "  ❌ MISSING: $f (required on every client build)"; ((FAIL++))
    fi
  done
fi
echo ""

# ── 2b. Production JS contract (WP embed + DOM-ready) ─────
echo "── Neo Runtime Contract ──"
NAV_JS="$NEO_DIR/mobile-nav.js"
HERO_JS=""
FOLDER_JS=""
# Prefer sibling production_site scripts when auditing production_site
if [ -f "$DIR/hero-scroll.js" ]; then HERO_JS="$DIR/hero-scroll.js"; fi
if [ -f "$DIR/folder-gallery.js" ]; then FOLDER_JS="$DIR/folder-gallery.js"; fi
if [ -z "$HERO_JS" ] && [ -f "$DIR/../hero-scroll.js" ]; then HERO_JS="$DIR/../hero-scroll.js"; fi
if [ -z "$FOLDER_JS" ] && [ -f "$DIR/../folder-gallery.js" ]; then FOLDER_JS="$DIR/../folder-gallery.js"; fi
# When auditing pages/, check neo source files
if [ ! -f "$NAV_JS" ]; then NAV_JS="$ROOT/production_site/neo/mobile-nav.js"; fi
if [ -z "$HERO_JS" ] || [ ! -f "$HERO_JS" ]; then HERO_JS="$ROOT/production_site/hero-scroll.js"; fi
if [ -z "$FOLDER_JS" ] || [ ! -f "$FOLDER_JS" ]; then FOLDER_JS="$ROOT/production_site/folder-gallery.js"; fi

if [ -f "$NAV_JS" ]; then
  if grep -q 'data-neo-wp-embed' "$NAV_JS" && grep -q 'neo-menu-open' "$NAV_JS"; then
    echo "  ✅ mobile-nav.js applies neo-menu-open to WP embed root"; ((PASS++))
  else
    echo "  ❌ mobile-nav.js must toggle neo-menu-open on [data-neo-wp-embed]"; ((FAIL++))
  fi
  if grep -q 'hideThemeHeaders' "$NAV_JS"; then
    echo "  ✅ mobile-nav.js hides conflicting theme headers"; ((PASS++))
  else
    echo "  ⚠️  mobile-nav.js missing hideThemeHeaders"; ((WARN++))
  fi
else
  echo "  ⚠️  mobile-nav.js not found — skipped"; ((WARN++))
fi

if [ -f "$HERO_JS" ]; then
  if grep -q 'DOMContentLoaded' "$HERO_JS"; then
    echo "  ✅ hero-scroll.js boots on DOMContentLoaded"; ((PASS++))
  else
    echo "  ❌ hero-scroll.js must wait for DOMContentLoaded (WP paste-safe)"; ((FAIL++))
  fi
else
  echo "  ⚠️  hero-scroll.js not found — skipped"; ((WARN++))
fi

if [ -f "$FOLDER_JS" ]; then
  if grep -q 'DOMContentLoaded' "$FOLDER_JS"; then
    echo "  ✅ folder-gallery.js boots on DOMContentLoaded"; ((PASS++))
  else
    echo "  ❌ folder-gallery.js must wait for DOMContentLoaded (WP paste-safe)"; ((FAIL++))
  fi
else
  echo "  ⚠️  folder-gallery.js not found — skipped"; ((WARN++))
fi

# overflow-x: clip in neo CSS sources
CLIP_OK=0
for css in "$NEO_DIR/components/mobile-layout.css" "$NEO_DIR/components/wp-embed.css" "$DIR/site.css" "$ROOT/production_site/site.css"; do
  if [ -f "$css" ] && grep -q 'overflow-x:[[:space:]]*clip' "$css"; then
    CLIP_OK=1
    break
  fi
done
if [ "$CLIP_OK" -eq 1 ]; then
  echo "  ✅ Neo CSS uses overflow-x: clip"; ((PASS++))
else
  echo "  ❌ Neo CSS missing overflow-x: clip on page/embed shell"; ((FAIL++))
fi
echo ""

# ── 3. CSS bans (impeccable absolute bans) ───────────────
echo "── CSS Bans ──"
css_files=$(ls "$DIR"/*.css 2>/dev/null)
if [ -n "$css_files" ]; then
  # Gradient text
  if grep -l 'background-clip:[[:space:]]*text\|-webkit-background-clip:[[:space:]]*text' $css_files >/dev/null 2>&1; then
    echo "  ❌ gradient text (background-clip: text) found in per-build CSS"; ((FAIL++))
  else
    echo "  ✅ no gradient text"; ((PASS++))
  fi
  # Side-stripe accents (border-left/right >= 2px)
  if grep -E 'border-(left|right):[[:space:]]*[2-9][0-9]*px[[:space:]]+solid' $css_files >/dev/null 2>&1; then
    echo "  ❌ side-stripe accent border (border-left/right ≥ 2px solid) in per-build CSS"; ((FAIL++))
  else
    echo "  ✅ no side-stripe accent borders"; ((PASS++))
  fi
  # Fixed shell width
  if grep -E '\.neo-(page|container)[^{]*\{[^}]*max-width' $css_files >/dev/null 2>&1; then
    echo "  ❌ fixed max-width on .neo-page/.neo-container in per-build CSS"; ((FAIL++))
  else
    echo "  ✅ shell width untouched"; ((PASS++))
  fi
  # Custom keyframes need reduced-motion cover
  if grep -q '@keyframes' $css_files 2>/dev/null; then
    if ! grep -q 'prefers-reduced-motion' $css_files 2>/dev/null; then
      echo "  ⚠️  custom @keyframes without prefers-reduced-motion in per-build CSS"; ((WARN++))
    else
      echo "  ✅ custom animation has reduced-motion cover"; ((PASS++))
    fi
  fi
  # Ban 100vw breakouts in per-build CSS
  if grep -E 'width:[[:space:]]*100vw' $css_files >/dev/null 2>&1 && grep -E 'margin-left:[[:space:]]*(-50vw|calc\(50% - 50vw\))' $css_files >/dev/null 2>&1; then
    echo "  ❌ 100vw / -50vw breakout in per-build CSS"; ((FAIL++))
  else
    echo "  ✅ no 100vw/-50vw breakout in per-build CSS"; ((PASS++))
  fi
else
  if [ "$WP_MODE" -eq 1 ]; then
    echo "  ✅ WP pastes use inlined CSS (no separate .css files)"; ((PASS++))
  else
    echo "  ⚠️  no per-build CSS found"; ((WARN++))
  fi
fi
echo ""

# ── 4. Impeccable detector ────────────────────────────────
echo "── Impeccable Detector ──"
if command -v node >/dev/null 2>&1 && [ -f "$DETECT" ]; then
  detect_json=$(node "$DETECT" --json "$DIR" 2>/dev/null)
  if [ -n "$detect_json" ] && command -v python3 >/dev/null 2>&1; then
    result=$(echo "$detect_json" | python3 -c "
import json, sys
hard = set('''$HARD_FAIL_IDS'''.split())
try:
    findings = json.load(sys.stdin)
except Exception:
    findings = []

def in_scope(f):
    path = f.get('file', '')
    # Generated bundles and QA artefacts are not the source of truth
    for part in ('/demo/', '/wordpress/', '/_qa/'):
        if part in path:
            return False
    # Only source markup and styles; JS template strings false-positive
    return path.endswith(('.html', '.css'))

findings = [f for f in findings if in_scope(f)]
hard_hits = [f for f in findings if f.get('antipattern') in hard]
other = len(findings) - len(hard_hits)
seen = set()
for f in hard_hits:
    key = (f['antipattern'], f['file'], f.get('line', 0))
    if key in seen:
        continue
    seen.add(key)
    print(f\"HARD|{f['antipattern']}|{f['file'].split('/')[-1]}:{f.get('line', 0)}|{f.get('snippet','')[:60]}\")
print(f'SUMMARY|{len(seen)}|{other}')
")
    hard_count=$(echo "$result" | grep '^SUMMARY|' | cut -d'|' -f2)
    other_count=$(echo "$result" | grep '^SUMMARY|' | cut -d'|' -f3)
    echo "$result" | grep '^HARD|' | while IFS='|' read -r _ id loc snip; do
      echo "  ❌ ban hit [$id] $loc — $snip"
    done
    if [ "${hard_count:-0}" -gt 0 ]; then
      ((FAIL+=hard_count))
    else
      echo "  ✅ no hard-fail antipatterns"; ((PASS++))
    fi
    if [ "${other_count:-0}" -gt 0 ]; then
      echo "  ⚠️  $other_count advisory/warning finding(s) — review with: node $DETECT --json $DIR"
      ((WARN++))
    fi
  else
    echo "  ⚠️  detector produced no output — skipped"; ((WARN++))
  fi
else
  echo "  ⚠️  node or detect.mjs unavailable — detector skipped"; ((WARN++))
fi
echo ""

# ── Summary ──────────────────────────────────────────────
echo "═══════════════════════════════════════════"
echo "  PASS: $PASS  |  FAIL: $FAIL  |  WARN: $WARN"
echo ""
if [ $FAIL -gt 0 ]; then
  echo "  RESULT: ❌ FAILED — fix $FAIL issue(s) before handoff"
  echo "═══════════════════════════════════════════"
  exit 1
else
  echo "  RESULT: ✅ PASSED"
  echo "═══════════════════════════════════════════"
  exit 0
fi
