#!/usr/bin/env python3
"""Neo visual QA — screenshot rebuild pages at key widths for agent review.

Usage (from repo root):
    python3 design/neo/visual_qa.py rebuilds/<project> [--widths 375,1440] [--pages index.html,contact.html]

Serves the repository root over a local HTTP server (pages reference
../../design/neo/ assets), screenshots each page at each width, and writes
PNGs to rebuilds/<project>/_qa/. Prints the file list so the agent can read
and review every image before handoff.
"""

import argparse
import http.server
import socketserver
import sys
import threading
from pathlib import Path

DEFAULT_WIDTHS = [375, 1440]
EXTRA_INDEX_WIDTHS = [320, 768]  # index.html also gets these
VIEWPORT_HEIGHT = 900
SKIP_PREFIXES = ("outreach-",)


def find_repo_root(target: Path) -> Path:
    for parent in [target, *target.parents]:
        if (parent / "design" / "neo" / "neo-design.css").exists():
            return parent
    sys.exit("Could not locate repo root (design/neo/neo-design.css) above target")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("target", help="rebuild folder, e.g. rebuilds/my-client")
    parser.add_argument("--widths", default=None, help="comma-separated widths")
    parser.add_argument("--pages", default=None, help="comma-separated page filenames")
    args = parser.parse_args()

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        sys.exit(
            "playwright not installed. Install with:\n"
            "  python3 -m pip install playwright && python3 -m playwright install chromium"
        )

    target = Path(args.target).resolve()
    if not target.is_dir():
        sys.exit(f"Not a directory: {target}")

    root = find_repo_root(target)
    rel = target.relative_to(root)

    if args.pages:
        pages = [p.strip() for p in args.pages.split(",") if p.strip()]
    else:
        pages = sorted(
            p.name
            for p in target.glob("*.html")
            if not p.name.startswith(SKIP_PREFIXES) and p.name != "404.html"
        )
    if not pages:
        sys.exit("No pages to screenshot")

    widths = (
        [int(w) for w in args.widths.split(",")]
        if args.widths
        else DEFAULT_WIDTHS
    )

    qa_dir = target / "_qa"
    qa_dir.mkdir(exist_ok=True)

    handler = type(
        "Quiet",
        (http.server.SimpleHTTPRequestHandler,),
        {
            "log_message": lambda *a, **k: None,
            "directory": str(root),
        },
    )
    # Bind port 0 for an ephemeral free port
    server = socketserver.TCPServer(("127.0.0.1", 0), lambda *a, **k: handler(*a, directory=str(root), **k))
    port = server.server_address[1]
    threading.Thread(target=server.serve_forever, daemon=True).start()

    written = []
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        try:
            for page_name in pages:
                page_widths = list(widths)
                if page_name == "index.html":
                    page_widths = sorted(set(page_widths + EXTRA_INDEX_WIDTHS))
                for width in page_widths:
                    ctx = browser.new_context(
                        viewport={"width": width, "height": VIEWPORT_HEIGHT}
                    )
                    pg = ctx.new_page()
                    url = f"http://127.0.0.1:{port}/{rel}/{page_name}"
                    pg.goto(url, wait_until="networkidle", timeout=30000)
                    # Scroll through the page so IntersectionObserver reveals
                    # (scroll-reveal.js) fire and lazy images load; full-page
                    # screenshots don't scroll on their own.
                    pg.evaluate(
                        """async () => {
                            const step = window.innerHeight;
                            const max = document.body.scrollHeight;
                            for (let y = 0; y <= max; y += step) {
                                window.scrollTo(0, y);
                                await new Promise(r => setTimeout(r, 120));
                            }
                            window.scrollTo(0, 0);
                            // Belt and braces: force any remaining reveals
                            document.querySelectorAll('[data-neo-reveal] > *')
                                .forEach(el => el.classList.add('is-revealed'));
                        }"""
                    )
                    try:
                        pg.wait_for_load_state("networkidle", timeout=10000)
                    except Exception:
                        pass  # slow straggler images; capture what we have
                    pg.wait_for_timeout(400)
                    out = qa_dir / f"{page_name.replace('.html', '')}-{width}.png"
                    pg.screenshot(path=str(out), full_page=True)
                    written.append(out)
                    ctx.close()
        finally:
            browser.close()
    server.shutdown()

    print(f"Wrote {len(written)} screenshot(s) to {qa_dir}:")
    for path in written:
        print(f"  {path}")
    print(
        "\nAgent: read EVERY image above and check — hero intact, no overflow or"
        " overlapping text, nav/drawer/bottom-nav correct, footer complete,"
        " spacing rhythm sane. Fix and re-run before handoff."
    )


if __name__ == "__main__":
    main()
