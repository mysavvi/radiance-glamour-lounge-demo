# Radiance Glamour Lounge demo

## Share with a client (recommended)

From the repo root:

```bash
./rebuilds/radiance-glamour-lounge/deploy_pages.sh
```

Live URL: https://mysavvi.github.io/radiance-glamour-lounge-demo/

## Local preview

```bash
python3 rebuilds/radiance-glamour-lounge/bundle_demo.py
cd rebuilds/radiance-glamour-lounge/demo
python3 -m http.server 8765
```

Open http://localhost:8765/index.html
