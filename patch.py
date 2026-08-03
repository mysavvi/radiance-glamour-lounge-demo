with open("deploy_wp.py", "r") as f:
    lines = f.readlines()

out = []
i = 0
while i < len(lines):
    line = lines[i]
    if "if slug not in slug_to_id:" in line:
        # Skip the block we added
        while i < len(lines) and "continue" not in lines[i]:
            i += 1
        i += 1
        continue
    if "wrapped_content =" in line and "<!-- wp:html -->" in line:
        out.append(line)
        # Add the creation block here!
        out.append("""    if slug not in slug_to_id:
        print(f"Creating {slug}...")
        create_resp = requests.post(
            f"{url_base}",
            auth=(username, password),
            json={
                "title": slug.replace('-', ' ').title(),
                "content": wrapped_content,
                "status": "publish",
                "slug": slug
            }
        )
        if create_resp.status_code == 201:
            print(f"  -> Created! (ID {create_resp.json()['id']})")
        else:
            print(f"  -> Error {create_resp.status_code}: {create_resp.text}")
        continue
""")
        i += 1
        continue
    out.append(line)
    i += 1

with open("deploy_wp.py", "w") as f:
    f.writelines(out)
