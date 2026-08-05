import subprocess
import base64
import os

SSH_CMD = ["sshpass", "-p", "Burningice@1", "ssh", "-o", "StrictHostKeyChecking=no", "-p", "65002", "u331878517@194.36.184.124"]
WP_PATH = "domains/radianceglamourlounge.com/public_html/"

def run_ssh_wp(command, stdin=None):
    cmd = SSH_CMD + [f"cd {WP_PATH} && {command}"]
    result = subprocess.run(cmd, input=stdin, capture_output=True, text=True)
    return result

def deploy_page(filepath):
    filename = os.path.basename(filepath)
    slug = filename.replace(".html", "")
    title = slug.replace("-", " ").title()
    
    with open(filepath, "rb") as f:
        b64_data = base64.b64encode(f.read()).decode('utf-8')
    
    # Send to remote server as a temporary file
    print(f"Uploading {filename} to remote...")
    run_ssh_wp(f"cat > temp_{filename}.b64", stdin=b64_data)
    run_ssh_wp(f"base64 -d temp_{filename}.b64 > temp_{filename}")
    
    # Update via WP-CLI
    print(f"Updating WP for {slug}...")
    existing_id = run_ssh_wp(f"wp post list --post_type=page --name={slug} --format=ids").stdout.strip()
    if existing_id:
        out = run_ssh_wp(f"wp post update {existing_id} temp_{filename} --post_title='{title}' --page_template='elementor_canvas'")
        print(out.stdout)
        print(out.stderr)
    else:
        out = run_ssh_wp(f"wp post create temp_{filename} --post_type=page --post_name='{slug}' --post_status=publish --post_title='{title}' --page_template='elementor_canvas'")
        print(out.stdout)
        print(out.stderr)
    
    run_ssh_wp(f"rm temp_{filename}.b64 temp_{filename}")

deploy_page("pages/cart.html")
deploy_page("pages/shop.html")
print("Done!")
