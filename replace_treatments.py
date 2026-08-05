import re

with open("pages/treatments.html", "r") as f:
    html = f.read()

pattern = re.compile(r'(<div class="neo-pricelist neo-pricelist--menu">.*?)(?:</section>)', re.DOTALL)
match = pattern.search(html)
if match:
    print("Found! Tail of match:")
    print(match.group(0)[-200:])
else:
    print("Not found")
