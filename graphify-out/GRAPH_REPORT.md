# Graph Report - .  (2026-07-31)

## Corpus Check
- Large corpus: 515 files · ~1,169,596 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 2042 nodes · 3470 edges · 192 communities (145 shown, 47 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 88 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45
- Community 46
- Community 47
- Community 48
- Community 49
- Community 50
- Community 51
- Community 52
- Community 53
- Community 54
- Community 55
- Community 56
- Community 57
- Community 58
- Community 59
- Community 60
- Community 61
- Community 62
- Community 63
- Community 64
- Community 65
- Community 66
- Community 67
- Community 68
- Community 69
- Community 70
- Community 71
- Community 72
- Community 73
- Community 74
- Community 75
- Community 76
- Community 77
- Community 78
- Community 79
- Community 80
- Community 81
- Community 82
- Community 83
- Community 84
- Community 85
- Community 86
- Community 87
- Community 88
- Community 89
- Community 90
- Community 91
- Community 92
- Community 93
- Community 94
- Community 95
- Community 96
- Community 97
- Community 98
- Community 99
- Community 100
- Community 101
- Community 102
- Community 103
- Community 104
- Community 105
- Community 106
- Community 107
- Community 108
- Community 109
- Community 110
- Community 111
- Community 112
- Community 113
- Community 114
- Community 115
- Community 116
- Community 117
- Community 118
- Community 119
- Community 120
- Community 121
- Community 122
- Community 123
- Community 124
- Community 125
- Community 126
- Community 127
- Community 128
- Community 129
- Community 130
- Community 132
- Community 134
- Community 135
- Community 136
- Community 137
- Community 138
- Community 139
- Community 140
- Community 141
- Community 142
- Community 143
- Community 144
- Community 145
- Community 146
- Community 147
- Community 148
- Community 149
- Community 150
- Community 151
- Community 152
- Community 153
- Community 158
- Community 159
- Community 162
- Community 179

## God Nodes (most connected - your core abstractions)
1. `run_comparison()` - 28 edges
2. `validate_url()` - 28 edges
3. `validate_url_strict()` - 27 edges
4. `generate_report()` - 23 edges
5. `render_page()` - 22 edges
6. `safe_requests_get()` - 22 edges
7. `URLSafetyError` - 21 edges
8. `_make_finding()` - 19 edges
9. `load_config()` - 16 edges
10. `get_oauth_credentials()` - 16 edges

## Surprising Connections (you probably didn't know these)
- `compute_statistics()` --calls--> `_percentile()`  [INFERRED]
  claude-seo/scripts/dataforseo_normalize.py → claude-seo/scripts/lcp_subparts.py
- `_render_with_fake_browser()` --indirect_call--> `render_page()`  [INFERRED]
  claude-seo/tests/test_render_page.py → claude-seo/scripts/render_page.py
- `test_extract_json_ld_enforces_block_and_count_limits()` --indirect_call--> `render_page()`  [INFERRED]
  claude-seo/tests/test_render_page.py → claude-seo/scripts/render_page.py
- `audit()` --calls--> `render_page()`  [EXTRACTED]
  claude-seo/scripts/agent_ux_check.py → claude-seo/scripts/render_page.py
- `analyze_visual()` --calls--> `validate_url_strict()`  [EXTRACTED]
  claude-seo/scripts/analyze_visual.py → claude-seo/scripts/url_safety.py

## Import Cycles
- None detected.

## Communities (192 total, 47 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (58): _build_ga4_client(), country_breakdown(), device_breakdown(), main(), organic_traffic_report(), Get top organic landing pages from GA4. Args: property_id: GA4 property ID.…, Organic sessions broken down by device category. Args: property_id: GA4…, Organic sessions broken down by country. Args: property_id: GA4 property ID.… (+50 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (28): humanize(), main(), _preserve_case(), Apply every replacement; return the cleaned text plus a change log., If the original starts uppercase, capitalise the replacement., analyse(), _count_phrase_hits(), main() (+20 more)

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (45): _field_p75(), load_baseline(), main(), _make_finding(), Connection, Create a standardized finding dict., CRITICAL: Schema/JSON-LD completely removed., CRITICAL: Canonical URL changed. (+37 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (42): api_get(), _atomic_write(), attribution_header(), _authed_headers(), _base_headers(), body_lines_after_frontmatter(), content_url(), escape_cell() (+34 more)

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (44): applyConfig(), applyMotionPreference(), applyReviewPlatforms(), bindMotionPreference(), bindScrollPause(), bumpRailCount(), burstLikes(), createChatItem() (+36 more)

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (30): _all_types(), _has_type(), _iter_typed(), main(), Yield every dict in ``payload`` whose @type matches ``target_type``., validate(), discussion(), main() (+22 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (41): _count_agent_files(), _count_skill_dirs(), _extract_count(), _extract_frontmatter(), _extract_section(), Tests that ensure the plugin's manifest and user-visible docs claim counts that…, README, CLAUDE.md, AGENTS.md must reference the canonical sub-skills count., plugin.json version must equal CITATION.cff version. (+33 more)

### Community 7 - "Community 7"
Cohesion: 0.11
Nodes (35): detect_trends(), main(), query_history(), Analyze p75 timeseries to detect trends. Compares the average of the last 4…, Query CrUX History API for weekly CWV trends. Args: url_or_origin: Full URL or…, get_api_key(), google_api_key_headers(), Validate a URL for use with Google APIs. Rejects private/loopback addresses.… (+27 more)

### Community 8 - "Community 8"
Cohesion: 0.16
Nodes (28): ArgumentParser, build_parser(), command_doctor(), command_run(), command_setup(), _configure_utf8(), _configured_data_dir(), _data_dir() (+20 more)

### Community 9 - "Community 9"
Cohesion: 0.08
Nodes (28): _load_sync_flow_module(), Tests for scripts/sync_flow.py, _base_headers() must not include an Authorization header (VULN-A02)., _authed_headers() returns base headers if gh CLI is not on PATH (VULN-A06)., GitHub may return 429 instead of 403 when the anonymous pool is spent., _validate_github_url must reject any host other than api.github.com (VULN-A10)., _validate_github_url must block @evil.com userinfo bypass (VULN-A10)., _validate_github_url must not raise for api.github.com URLs (VULN-A10). (+20 more)

### Community 10 - "Community 10"
Cohesion: 0.12
Nodes (27): _detect_lazy_method(), main(), parse_html(), Return a coarse classification of the image's lazy-loading mechanism. Order of…, Parse HTML and extract SEO-relevant elements. Args: html: HTML content to parse…, FakeResponse, Deterministic response decoding for fetch_page.py., test_explicit_charset_from_content_type_wins() (+19 more)

### Community 11 - "Community 11"
Cohesion: 0.15
Nodes (28): _auth_header(), cmd_compare(), cmd_search(), cmd_sellers(), _extract_items(), _extract_task_id(), _get_credentials(), main() (+20 more)

### Community 12 - "Community 12"
Cohesion: 0.13
Nodes (28): compute_statistics(), _default_columns(), extract_items(), format_markdown_table(), main(), _normalize_availability(), _normalize_currency(), normalize_merchant() (+20 more)

### Community 13 - "Community 13"
Cohesion: 0.15
Nodes (25): cmd_check(), cmd_config(), cmd_estimate(), cmd_log(), cmd_reset(), cmd_summary(), cmd_today(), _load_config() (+17 more)

### Community 14 - "Community 14"
Cohesion: 0.15
Nodes (24): get_bing_api_key(), get_bing_verified_sites(), Get the Bing Webmaster API key from config or environment., Get the list of Bing-verified sites from config., _bing_payload(), _bing_request(), _bounded_int(), compare_links() (+16 more)

### Community 15 - "Community 15"
Cohesion: 0.08
Nodes (23): last_verified, policy, $schema, _schema_doc, unverified[], updates[], secondary_sources, source_of_truth (+15 more)

### Community 16 - "Community 16"
Cohesion: 0.14
Nodes (20): capture_baseline(), fetch_cwv_data(), fetch_page_data(), hash_content(), init_db(), main(), normalize_url(), Connection (+12 more)

### Community 17 - "Community 17"
Cohesion: 0.14
Nodes (23): check_credentials(), _chmod_quiet(), detect_tier(), _exchange_code(), _load_oauth_client(), _load_oauth_token(), main(), _persist_oauth_client_path() (+15 more)

### Community 19 - "Community 19"
Cohesion: 0.13
Nodes (23): bindMotionPreference(), bindScrollPause(), bumpRailCount(), burstLikes(), formatCount(), initLive(), parseRailCount(), pick() (+15 more)

### Community 20 - "Community 20"
Cohesion: 0.21
Nodes (22): announce(), applyAll(), applyTextScale(), buildUI(), clearContrastModes(), closePanel(), getFocusable(), handleTool() (+14 more)

### Community 21 - "Community 21"
Cohesion: 0.13
Nodes (23): bindMotionPreference(), bindScrollPause(), bumpRailCount(), burstLikes(), formatCount(), initLive(), parseRailCount(), pick() (+15 more)

### Community 22 - "Community 22"
Cohesion: 0.14
Nodes (21): _get_cache_path(), get_domain_metrics(), get_graph_info(), _get_latest_release(), _graph_file_url(), _is_cached(), main(), Get the cache file path for a domain's data. (+13 more)

### Community 23 - "Community 23"
Cohesion: 0.13
Nodes (12): count_page(), detail_page(), error(), ok(), parametrize, Bounded Bing Webmaster link regressions for issue #153., test_cli_invalid_url_errors_do_not_echo_userinfo_or_query(), test_link_counts_cap_is_explicitly_partial() (+4 more)

### Community 24 - "Community 24"
Cohesion: 0.13
Nodes (12): _Exec, GSC total-limit and blank-dimension regressions for issues #130 and #173., _run(), _SearchAnalytics, _Service, test_dimensionless_primary_query_is_reused_for_totals(), test_exact_api_page_limit_does_not_fetch_an_extra_dimension_page(), test_filters_are_copied_to_dimensionless_aggregate() (+4 more)

### Community 25 - "Community 25"
Cohesion: 0.11
Nodes (10): parametrize, Tests for scripts/render_page.py. Focus areas: - SPA heuristic (covers…, Single live-network check. example.com is the canonical IETF-reserved test…, _StabilityPage, test_is_spa_negative(), test_is_spa_positive(), test_render_page_blocks_ssrf(), test_render_page_never_mode_against_example_com() (+2 more)

### Community 26 - "Community 26"
Cohesion: 0.15
Nodes (19): _decode_bytes(), _decode_response_content(), _extract_charset_from_content_type(), _extract_meta_charset(), fetch_page(), main(), Fetch a web page and return response details. SSRF protection is delegated to…, Decode HTTP bytes deterministically for stable SEO snapshots. (+11 more)

### Community 27 - "Community 27"
Cohesion: 0.11
Nodes (10): check_one(), _find_skill_files(), main(), _parse_frontmatter(), Path, Every SKILL.md under skills/ and extensions/., Light YAML-ish parser. Doesn't require PyYAML — we accept the documented subset…, Tests for v2 Checkpoint 7 (Phase G + I): scripts/portability_check.py —… (+2 more)

### Community 28 - "Community 28"
Cohesion: 0.14
Nodes (20): _bounded_fetch(), discover_sitemaps(), _display_url(), main(), _origin(), Check a text-sitemap entry without resolving or connecting to its host., Return a safe-to-display URL with userinfo, query, and fragment removed., Fetch at most max_bytes after decompression without exposing response text. (+12 more)

### Community 29 - "Community 29"
Cohesion: 0.15
Nodes (21): announce(), applyAll(), applyTextScale(), buildUI(), clearContrastModes(), closePanel(), handleTool(), init() (+13 more)

### Community 30 - "Community 30"
Cohesion: 0.15
Nodes (21): announce(), applyAll(), applyTextScale(), buildUI(), clearContrastModes(), closePanel(), handleTool(), init() (+13 more)

### Community 31 - "Community 31"
Cohesion: 0.15
Nodes (19): _build_audit_action_plan(), _build_executive_summary(), _build_full_audit_categories(), _coerce_items(), _finding_description(), _finding_severity(), _finding_title(), _img_tag() (+11 more)

### Community 32 - "Community 32"
Cohesion: 0.16
Nodes (20): _build_title_page(), chart_cwv_distributions(), chart_cwv_timeline(), chart_index_status(), chart_lighthouse_gauges(), chart_top_queries(), generate_report(), generate_xlsx() (+12 more)

### Community 33 - "Community 33"
Cohesion: 0.19
Nodes (19): applyConfig(), applyReviewPlatforms(), clearExit(), createChatItem(), fetchJson(), goTo(), loadData(), pickReview() (+11 more)

### Community 34 - "Community 34"
Cohesion: 0.19
Nodes (19): applyConfig(), applyReviewPlatforms(), clearExit(), createChatItem(), fetchJson(), goTo(), loadData(), pickReview() (+11 more)

### Community 36 - "Community 36"
Cohesion: 0.15
Nodes (15): _FakeRequest, _FakeRoute, data:, blob:, chrome-extension: schemes are not DNS-bound., A redirect or subresource targeting metadata.google.internal. (with trailing…, Chromium might be tricked into fetching http://2130706433/... via a crafted…, Dual-stack regression: AF_UNSPEC returns both IPv4 and IPv6. If any record…, test_route_handler_aborts_on_dns_failure(), test_route_handler_aborts_private_resolution() (+7 more)

### Community 37 - "Community 37"
Cohesion: 0.25
Nodes (5): depositFor(), el(), money(), SuccessWidget(), Widget()

### Community 38 - "Community 38"
Cohesion: 0.28
Nodes (16): CaptureFixture, _fixture_root(), Path, Managed runtime and safe-dispatch regressions., test_browser_marker_requires_browser_files(), test_child_environment_forces_utf8_and_persistent_browser_path(), test_configured_data_dir_rejects_filesystem_root_and_user_home(), test_dispatch_is_allowlisted_and_rejects_traversal() (+8 more)

### Community 39 - "Community 39"
Cohesion: 0.20
Nodes (18): Render or fetch ``url`` per the chosen mode. See module docstring.…, render_page(), _fake_response(), _mock_validate_strict(), Skip the real DNS resolution that validate_url_strict does., auto mode + non-SPA raw HTML → no Playwright invocation., When Playwright is uninstalled, always-mode returns a clear error., When safe_requests_get raises, render_page returns an informative error rather… (+10 more)

### Community 40 - "Community 40"
Cohesion: 0.15
Nodes (11): parametrize, Tests for scripts/url_safety.py. These tests exercise the SSRF policy, DNS-…, Reject URL forms where urllib and the eventual HTTP stack can disagree about…, Each of these would have bypassed v1.x parse-mode validation., test_is_safe_ip(), test_normalize_hostname(), test_validate_url_accepts_public(), test_validate_url_blocks_authority_confusion() (+3 more)

### Community 41 - "Community 41"
Cohesion: 0.11
Nodes (18): format, type, format, type, format, type, facebook, googleReview (+10 more)

### Community 42 - "Community 42"
Cohesion: 0.21
Nodes (16): cmd_estimate(), cmd_log(), cmd_reset(), cmd_summary(), cmd_today(), _load_ledger(), _load_pricing_config(), _lookup_cost() (+8 more)

### Community 43 - "Community 43"
Cohesion: 0.27
Nodes (16): check_agent_refs(), check_flow_lock(), check_orphan_files(), check_references(), check_research_refs(), check_routing(), check_runtime_invocations(), check_script_refs() (+8 more)

### Community 44 - "Community 44"
Cohesion: 0.18
Nodes (15): audit_site(), _cli(), discovery_url_for(), parse_profile(), probe_endpoint(), HEAD-probe a declared capability endpoint via url_safety., Fetch and audit a site's UCP profile. Returns a JSON-serializable dict., Return the canonical UCP discovery URL for a site root. (+7 more)

### Community 45 - "Community 45"
Cohesion: 0.12
Nodes (17): type, type, type, type, properties, businessName, caption, cta (+9 more)

### Community 46 - "Community 46"
Cohesion: 0.21
Nodes (13): animateAngle(), createGlow(), disable(), enable(), handleMove(), refresh(), startListening(), stopListening() (+5 more)

### Community 47 - "Community 47"
Cohesion: 0.22
Nodes (15): cmd_create(), cmd_delete(), cmd_list(), cmd_show(), _ensure_dir(), _load_preset(), main(), _preset_path() (+7 more)

### Community 48 - "Community 48"
Cohesion: 0.18
Nodes (14): analyze_visual(), main(), normalize_url(), ParseResult, Normalize URL and return (url, parsed_url)., Analyze visual aspects of a web page. Args: url: URL to analyze timeout: Page…, capture_screenshot(), main() (+6 more)

### Community 49 - "Community 49"
Cohesion: 0.21
Nodes (15): get_anchor_text(), get_linking_domains(), get_top_pages(), get_url_metrics(), main(), _moz_basic_auth_header(), _moz_request(), _rate_limit() (+7 more)

### Community 50 - "Community 50"
Cohesion: 0.18
Nodes (15): main(), Check H1 findings for misleading data., Check Common Crawl findings for misleading interpretations., Detect reciprocal link patterns (A links to B and B links back)., Validate health score data sufficiency., Run all validations on a backlink report. Args: report_data: Dictionary with…, Check schema findings for false positives., Check verification findings for false negatives and inconsistencies. (+7 more)

### Community 51 - "Community 51"
Cohesion: 0.28
Nodes (3): el(), money(), Shop()

### Community 52 - "Community 52"
Cohesion: 0.18
Nodes (11): parametrize, Tests for the v2 Checkpoint 5 deliverables: scripts/parasite_risk.py…, All extensions ship executable install.sh + uninstall.sh — including v1 ones., _row(), test_classify_drift_detection(), test_classify_flags_high_on_third_party_authorship(), test_classify_flags_high_risk_review_section(), test_every_extension_install_and_uninstall_is_executable() (+3 more)

### Community 53 - "Community 53"
Cohesion: 0.15
Nodes (6): _FakeBrowserPage, _FakeBrowserResponse, _FakePlaywrightManager, _render_with_fake_browser(), test_render_navigation_timeout_returns_degraded_dom(), test_render_uses_domcontentloaded_for_persistent_socket_pages()

### Community 54 - "Community 54"
Cohesion: 0.36
Nodes (14): boot(), getEmbedRoot(), getFocusable(), getMenu(), getMenuButton(), hideThemeHeaders(), initMenuA11y(), initScrollNav() (+6 more)

### Community 55 - "Community 55"
Cohesion: 0.22
Nodes (13): check_credentials(), detect_tier(), get_cache_dir(), get_moz_api_key(), load_config(), main(), print_setup_instructions(), Validate credentials for a specific backlink data service. Args: service: One… (+5 more)

### Community 56 - "Community 56"
Cohesion: 0.23
Nodes (13): build_manifest(), compare(), _git(), _git_or_none(), main(), Path, Build the SHA-256 manifest for the current working tree., Diff two manifests; return added / removed / changed files. (+5 more)

### Community 57 - "Community 57"
Cohesion: 0.20
Nodes (13): normalize_hostname(), _pin_dns(), Raised when a URL fails SSRF safety checks., Return the undecoded authority substring between scheme and path., Reject forms where URL parsers or HTTP stacks can disagree. Backslashes,…, Canonicalize a hostname so that obfuscated forms cannot bypass the SSRF policy.…, Temporarily override ``socket.getaddrinfo`` so the named host resolves only to…, ``requests.head`` with DNS-rebinding protection. The request's hostname is… (+5 more)

### Community 58 - "Community 58"
Cohesion: 0.20
Nodes (8): _dump(), _ErrorResponse, Regression tests for Google API key handling. These tests ensure API keys are…, test_crux_history_uses_header_and_redacts_errors(), test_crux_uses_header_and_redacts_errors(), test_lcp_subparts_uses_header_not_query_key(), test_nlp_uses_header_and_redacts_errors(), test_pagespeed_uses_header_and_redacts_errors()

### Community 59 - "Community 59"
Cohesion: 0.26
Nodes (14): applyMotionPreference(), canRun(), clearTimer(), enabled(), initScrollNav(), onScroll(), scheduleNext(), setActive() (+6 more)

### Community 60 - "Community 60"
Cohesion: 0.26
Nodes (14): applyMotionPreference(), canRun(), clearTimer(), enabled(), initScrollNav(), onScroll(), scheduleNext(), setActive() (+6 more)

### Community 62 - "Community 62"
Cohesion: 0.21
Nodes (13): type, type, type, bookmarks, comments, hearts, shares, viewers (+5 more)

### Community 63 - "Community 63"
Cohesion: 0.36
Nodes (12): apply(), currentTheme(), init(), inject(), injectIntoDrawer(), injectIntoFooter(), injectIntoHeader(), makeButton() (+4 more)

### Community 64 - "Community 64"
Cohesion: 0.29
Nodes (11): check_setup(), load_settings(), main(), Load Claude Code settings.json., Save Claude Code settings.json., Check if MCP is already configured., Remove MCP configuration., Configure MCP server in Claude Code settings. (+3 more)

### Community 65 - "Community 65"
Cohesion: 0.24
Nodes (11): analyze_accessibility_tree(), analyze_html(), audit(), _cli(), Walk a Playwright accessibility snapshot for the checklist items., Combine HTML + a11y-tree findings into a 0-100 agent-UX score., Audit a URL for agent-friendliness. Forces rendered mode., Yield every node in a Playwright accessibility snapshot. (+3 more)

### Community 66 - "Community 66"
Cohesion: 0.26
Nodes (11): assess_risk(), _extract(), lookup(), main(), _parse_date(), Fallback: ask IANA for the authoritative whois server, then ask that server for…, Best-effort ISO-8601 normalisation., Combine WHOIS heritage with optional topical signals to produce a… (+3 more)

### Community 67 - "Community 67"
Cohesion: 0.33
Nodes (11): audit(), _cli(), exiftool_available(), inject(), _iter_images(), Path, Inject XMP-iptcExt:DigitalSourceType into a single image., Return True iff ``exiftool`` is on PATH. (+3 more)

### Community 68 - "Community 68"
Cohesion: 0.21
Nodes (6): _Exec, Regression for issue #130: GSC site totals must come from a dimensionless…, Query-dimension rows hide clicks (anonymized); the dimensionless aggregate…, _SearchAnalytics, _Service, test_totals_use_aggregate_not_query_sum()

### Community 69 - "Community 69"
Cohesion: 0.29
Nodes (12): applyMetrics(), clearFocus(), closeGallery(), endDrag(), focusPhoto(), isMobileView(), measureWidth(), metrics() (+4 more)

### Community 70 - "Community 70"
Cohesion: 0.17
Nodes (12): properties, required, type, type, name, reviews, text, items (+4 more)

### Community 71 - "Community 71"
Cohesion: 0.29
Nodes (12): applyMetrics(), clearFocus(), closeGallery(), endDrag(), focusPhoto(), isMobileView(), measureWidth(), metrics() (+4 more)

### Community 72 - "Community 72"
Cohesion: 0.27
Nodes (9): main(), Find every deprecated GBP feature reference in the HTML., scan(), analyse(), _extract_speculation_actions(), main(), Pull the unique 'action' field values out of a speculationrules JSON., ``requests.get`` with DNS-rebinding protection. The request's hostname is… (+1 more)

### Community 73 - "Community 73"
Cohesion: 0.24
Nodes (10): _cli(), _extract_json_ld(), _is_spa(), Collect bounded @type values without recursive attacker-controlled calls., Extract full-page JSON-LD with strict block, byte, and traversal bounds., Heuristic SPA detector. Conservative: any positive signal flips True., Wait up to five seconds for meaningful body text and a stable DOM., _schema_types() (+2 more)

### Community 74 - "Community 74"
Cohesion: 0.18
Nodes (3): Tests for v2 Checkpoint 6 (Phase F — local + international + privacy polish):…, Intercom / drift / custom chat widgets are fine — we only flag GBP-chat., test_does_not_flag_generic_chat_widget()

### Community 75 - "Community 75"
Cohesion: 0.18
Nodes (11): type, type, type, type, properties, type, avatar, avatarPosition (+3 more)

### Community 76 - "Community 76"
Cohesion: 0.33
Nodes (9): batch_notify(), _build_indexing_service(), get_notification_metadata(), main(), notify_url(), Get the latest notification metadata for a URL. Args: url: The URL to check.…, Batch notify multiple URLs with quota awareness. Args: urls: List of URLs.…, Build the Indexing API v3 service. (+1 more)

### Community 77 - "Community 77"
Cohesion: 0.33
Nodes (9): _build_youtube_service(), get_channel_info(), get_video_details(), main(), Get detailed information about a specific YouTube video. Args: video_id:…, Get channel information. Args: channel_id: YouTube channel ID. api_key:…, Build the YouTube Data API v3 service., Search YouTube for videos matching a query. Args: query: Search query string.… (+1 more)

### Community 78 - "Community 78"
Cohesion: 0.24
Nodes (10): apply(), currentTheme(), inject(), injectIntoDrawer(), injectIntoFooter(), injectIntoHeader(), makeButton(), savedPref() (+2 more)

### Community 79 - "Community 79"
Cohesion: 0.24
Nodes (10): apply(), currentTheme(), inject(), injectIntoDrawer(), injectIntoFooter(), injectIntoHeader(), makeButton(), savedPref() (+2 more)

### Community 80 - "Community 80"
Cohesion: 0.36
Nodes (8): _belongs_to_host(), _load_urls(), main(), _normalized_host(), Fetch the published key file and confirm it matches. IndexNow requires the key…, Submit a batch of URLs to IndexNow. Returns a result dict., submit(), verify_key_published()

### Community 81 - "Community 81"
Cohesion: 0.39
Nodes (8): _capture_exit_output(), _http_error_with_key(), _load_module(), Path, Regression tests for Banana direct REST fallback API-key redaction., test_banana_edit_redacts_upstream_http_error_body(), test_banana_generate_redacts_upstream_http_error_body(), HTTPError

### Community 82 - "Community 82"
Cohesion: 0.36
Nodes (8): Path, Banana script references must match core and standalone install layouts., _runtime_extension_scripts(), test_core_image_skill_does_not_assume_banana_scripts_are_local(), test_standalone_extension_uses_managed_runtime_for_every_script(), test_standalone_installer_copies_scripts_beside_skill_file(), test_top_level_installer_keeps_extension_scripts_under_core_extension_tree(), _text()

### Community 83 - "Community 83"
Cohesion: 0.36
Nodes (9): getFocusable(), getMenu(), getMenuButton(), initMenuA11y(), isOpen(), onKeydown(), setBackgroundInert(), setMenuOpen() (+1 more)

### Community 84 - "Community 84"
Cohesion: 0.22
Nodes (8): required, $schema, title, type, businessName, handle, social, title

### Community 85 - "Community 85"
Cohesion: 0.36
Nodes (9): getFocusable(), getMenu(), getMenuButton(), initMenuA11y(), isOpen(), onKeydown(), setBackgroundInert(), setMenuOpen() (+1 more)

### Community 86 - "Community 86"
Cohesion: 0.25
Nodes (7): metadata, description, name, owner, name, plugins, $schema

### Community 87 - "Community 87"
Cohesion: 0.36
Nodes (7): main(), File path from argv (exec-form template) or the stdin hook-event JSON. Claude…, Validate JSON-LD blocks in HTML content., Validate a single schema object., _resolve_filepath(), validate_jsonld(), _validate_schema_object()

### Community 88 - "Community 88"
Cohesion: 0.25
Nodes (8): _build_gsc_section(), _build_indexation_section(), _date_range_overlaps(), _gsc_anomaly_warning(), _metric_card(), Build the GSC Search Performance section., Build the Indexation Status section., Build a metric card HTML block.

### Community 89 - "Community 89"
Cohesion: 0.39
Nodes (7): _audit_page(), _classify(), main(), Aggregate signals per subfolder and emit a risk label., Return the first path segment of a URL as the section key., scan(), _subfolder()

### Community 90 - "Community 90"
Cohesion: 0.39
Nodes (7): Path, MCP agent permission and fail-closed regressions., test_dataforseo_agent_bodies_stay_mirrored(), test_dataforseo_agent_mirrors_allow_only_sanctioned_mcp_path(), test_dataforseo_agent_mirrors_fail_closed_without_mcp(), test_dataforseo_installers_use_matching_mcp_server_name(), _text()

### Community 91 - "Community 91"
Cohesion: 0.29
Nodes (5): _post_tool_handler(), Path, Cross-platform hook configuration regressions., test_hook_launcher_preserves_blocking_exit_code_two(), test_schema_hook_uses_exec_form_args_and_tool_input_placeholder()

### Community 92 - "Community 92"
Cohesion: 0.39
Nodes (7): Path, Full audit report generation from non-Google audit data., test_chart_report_returns_dependency_error_at_runtime(), test_full_audit_html_includes_summary_categories_and_roadmap(), test_html_report_without_chart_data_does_not_require_native_report_dependencies(), test_module_import_is_safe_without_native_report_dependencies(), test_pdf_report_returns_dependency_error_at_runtime()

### Community 95 - "Community 95"
Cohesion: 0.48
Nodes (6): isStoreStubOutput(), main(), probe(), pythonCandidates(), { spawnSync }, stripWrappingQuotes()

### Community 97 - "Community 97"
Cohesion: 0.38
Nodes (6): _extract_writer(), parametrize, Path, Regression: extension installers must not source-inject credentials. Before the…, test_installer_credential_injection_is_inert(), test_installer_uses_safe_credential_pattern()

### Community 98 - "Community 98"
Cohesion: 0.47
Nodes (5): edit_image(), main(), Remove Google API keys from standalone fallback error output., Call Gemini API to edit an image., _redact_google_api_key()

### Community 99 - "Community 99"
Cohesion: 0.47
Nodes (5): generate_image(), main(), Remove Google API keys from standalone fallback error output., Call Gemini API to generate an image., _redact_google_api_key()

### Community 100 - "Community 100"
Cohesion: 0.47
Nodes (5): _escape(), generate_html(), main(), HTML-escape a value, handling None., Generate a self-contained HTML report from comparison data.

### Community 101 - "Community 101"
Cohesion: 0.33
Nodes (6): _build_cwv_section(), _chart_html(), Build the Core Web Vitals audit section., Return brand color based on Lighthouse-style score thresholds., Build a complete chart container with figure caption., _score_color()

### Community 102 - "Community 102"
Cohesion: 0.53
Nodes (5): main(), Path, Compare a manifest against the working tree at ``root``. Returns a dict with:…, _sha256(), verify()

### Community 103 - "Community 103"
Cohesion: 0.47
Nodes (5): Path, Policy regression for the JSON-LD validation hook. FAQPage must NOT block…, _run(), test_deprecated_type_still_blocks(), test_faqpage_not_blocked()

### Community 104 - "Community 104"
Cohesion: 0.60
Nodes (4): check(), main(), parse_args(), Namespace

### Community 106 - "Community 106"
Cohesion: 0.60
Nodes (4): Reference-graph consistency gate. Runs scripts/consistency_check.py and asserts…, run_checker(), test_checker_scans_whole_tree(), test_no_consistency_errors()

### Community 110 - "Community 110"
Cohesion: 0.70
Nodes (4): assetUrl(), boot(), loadScript(), loadScriptsSequential()

### Community 111 - "Community 111"
Cohesion: 0.67
Nodes (3): estimate_cost(), main(), Estimate cost for a single image from a user-verified unit cost.

### Community 112 - "Community 112"
Cohesion: 0.83
Nodes (3): Invoke-External(), Resolve-Python(), Test-PythonCandidate()

### Community 113 - "Community 113"
Cohesion: 0.33
Nodes (4): _build_css(), _build_recommendations(), Build prioritized recommendations section based on discovered issues., Professional A4 report CSS adapted from generate_pdf.py. Uses Times New Roman /…

### Community 114 - "Community 114"
Cohesion: 0.50
Nodes (4): _build_toc(), Build a Table of Contents page. sections_info: list of dicts with keys 'num',…, Return CSS class for TOC score badges., _score_class()

### Community 115 - "Community 115"
Cohesion: 0.83
Nodes (3): clearError(), showError(), validateField()

### Community 116 - "Community 116"
Cohesion: 0.83
Nodes (3): boot(), initLedFrames(), revealAll()

### Community 117 - "Community 117"
Cohesion: 0.83
Nodes (3): find_repo_root(), main(), Path

### Community 118 - "Community 118"
Cohesion: 0.83
Nodes (3): boot(), initLedFrames(), revealAll()

## Knowledge Gaps
- **75 isolated node(s):** `fs`, `html`, `$schema`, `name`, `name` (+70 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **47 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `URLSafetyError` connect `Community 57` to `Community 3`, `Community 7`, `Community 72`, `Community 73`, `Community 44`, `Community 48`, `Community 80`, `Community 89`, `Community 26`, `Community 28`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `validate_url()` connect `Community 7` to `Community 0`, `Community 2`, `Community 76`, `Community 14`, `Community 16`, `Community 17`, `Community 49`, `Community 22`, `Community 26`, `Community 28`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `validate_url()` connect `Community 28` to `Community 17`, `Community 7`, `Community 57`, `Community 55`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Are the 10 inferred relationships involving `render_page()` (e.g. with `_render_with_fake_browser()` and `test_extract_json_ld_enforces_block_and_count_limits()`) actually correct?**
  _`render_page()` has 10 INFERRED edges - model-reasoned connections that need verification._
- **What connects `fs`, `html`, `$schema` to the rest of the system?**
  _75 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.0506558118498417 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.04846938775510204 - nodes in this community are weakly interconnected._