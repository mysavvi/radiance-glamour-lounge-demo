#!/bin/bash
# ═══════════════════════════════════════════════════════════
# NEO CRAFT AUDIT — Machine gate for build-phase Craft QA
# Usage: bash design/neo/craft-audit.sh rebuilds/{project}/
# Exit codes: 0 = PASS, 1 = FAIL
#
# Complements seo-audit.sh (SEO layer). This gate covers the
# Neo build contract + impeccable bans + motion/a11y wiring.
# ═══════════════════════════════════════════════════════════

PASS=0; FAIL=0; WARN=0
DIR="${1:-.}"
DIR="${DIR%/}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
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

  # Dark/light toggle stack: theme-init before a11y-init, toggle deferred
  if ! grep -q 'theme-init\.js' "$html"; then
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
for f in privacy-policy.html terms.html; do
  if [ -f "$DIR/$f" ]; then
    echo "  ✅ $f"; ((PASS++))
  else
    echo "  ❌ MISSING: $f (required on every client build)"; ((FAIL++))
  fi
done
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
else
  echo "  ⚠️  no per-build CSS found"; ((WARN++))
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
