import requests
import re

url_login = "https://radianceglamourlounge.com/wp-login.php"
url_admin = "https://radianceglamourlounge.com/wp-admin/"
username = "antigravity"
password = "u3Vf w01g IUUA A2Ei KF7L 1IPJ"

session = requests.Session()

# 1. Post to wp-login
login_data = {
    'log': username,
    'pwd': password,
    'wp-submit': 'Log In',
    'redirect_to': url_admin,
    'testcookie': '1'
}

response = session.post(url_login, data=login_data)
if "dashboard" in response.url.lower() or "wp-admin" in response.url.lower():
    print("Login successful! URL:", response.url)
else:
    print("Login failed. Current URL:", response.url)

# 2. Get the REST API nonce from the admin page
html = response.text
nonce_match = re.search(r'"nonce":"([a-f0-9]+)"', html)
if not nonce_match:
    nonce_match = re.search(r'wpApiSettings\s*=\s*{[^}]*"nonce":"([a-f0-9]+)"', html)
if nonce_match:
    print("Found nonce:", nonce_match.group(1))
    
    # 3. Test REST API with cookie & nonce
    headers = {'X-WP-Nonce': nonce_match.group(1)}
    test_req = session.get("https://radianceglamourlounge.com/wp-json/wp/v2/pages?per_page=1", headers=headers)
    print("REST API test status:", test_req.status_code)
else:
    print("Could not find REST API nonce in the HTML.")

