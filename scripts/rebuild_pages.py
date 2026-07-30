#!/usr/bin/env python3
"""Rebuild all WordPress paste pages from production_site (inline CSS/JS)."""

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

if __name__ == "__main__":
    r = subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "bundle_wordpress.py")],
        cwd=str(ROOT),
    )
    raise SystemExit(r.returncode)
