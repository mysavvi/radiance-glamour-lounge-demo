import requests
import os

env = {}
with open('.env', 'r') as f:
    for line in f:
        if '=' in line and not line.strip().startswith('#'):
            k, v = line.strip().split('=', 1)
            env[k.strip()] = v.strip()

url_base = env.get("WP_API_URL")
username = env.get("WP_USERNAME")
password = env.get("WP_APP_PASSWORD")

page_id = 17 # home

data = {
    "meta": {
        "_yoast_wpseo_title": "Radiance Glamour Lounge | Ladies-Only Hair & Beauty Salon, Stockport",
        "_yoast_wpseo_metadesc": "Radiance Glamour Lounge: Stockport's premier destination for luxury aesthetics and bespoke beauty treatments. Book your consultation at our welcoming sanctuary in Merseyway."
    }
}

resp = requests.post(f"{url_base}/{page_id}", auth=(username, password), json=data)
if resp.status_code == 200:
    print("Success")
    meta = resp.json().get('meta', {})
    print("Meta after update:", meta)
    
    # Try another way: Yoast REST API endpoint if standard meta fails
else:
    print(resp.status_code)
    print(resp.text)
