import os, requests
env_path = '.env'
env = {}
with open(env_path) as f:
    for line in f:
        if '=' in line and not line.startswith('#'):
            k, v = line.strip().split('=', 1)
            env[k.strip()] = v.strip()
url = "https://radianceglamourlounge.com/wp-json/wp/v2/users/me"
response = requests.get(url, auth=(env['WP_USERNAME'], env['WP_APP_PASSWORD']))
print(response.status_code, response.text)
