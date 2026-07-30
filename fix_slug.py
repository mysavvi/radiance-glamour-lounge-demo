import os, requests
env = {}
with open('.env', 'r') as f:
    for line in f:
        if '=' in line and not line.strip().startswith('#'):
            k, v = line.strip().split('=', 1)
            env[k.strip()] = v.strip()
url_base = env.get("WP_API_URL", "https://radianceglamourlounge.com/wp-json/wp/v2/pages")
username = env.get("WP_USERNAME")
password = env.get("WP_APP_PASSWORD")

# Update page 190 slug to privacy-policy
resp = requests.post(
    f"{url_base}/190",
    auth=(username, password),
    json={"slug": "privacy-policy"}
)
if resp.status_code == 200:
    print("Slug updated to privacy-policy!")
else:
    print("Error:", resp.text)
