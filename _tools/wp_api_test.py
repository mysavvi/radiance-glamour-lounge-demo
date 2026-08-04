import requests
import json

url = "https://radianceglamourlounge.com/wp-json/wp/v2/users/me"
username = "antigravity"
password = "u3Vf w01g IUUA A2Ei KF7L 1IPJ"

response = requests.get(url, auth=(username, password))

print(f"Status: {response.status_code}")
print(response.text)
