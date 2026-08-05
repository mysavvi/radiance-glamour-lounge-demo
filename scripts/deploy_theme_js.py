import subprocess
import base64
import os

SSH_CMD = ["sshpass", "-p", "Burningice@1", "ssh", "-o", "StrictHostKeyChecking=no", "-p", "65002", "u331878517@194.36.184.124"]
THEME_JS_PATH = "domains/radianceglamourlounge.com/public_html/wp-content/themes/radiance-theme-v1.0.15/assets/js/"

def run_ssh_theme(command, stdin=None):
    cmd = SSH_CMD + [f"cd {THEME_JS_PATH} && {command}"]
    result = subprocess.run(cmd, input=stdin, capture_output=True, text=True)
    return result

def deploy_js(filepath):
    filename = os.path.basename(filepath)
    
    with open(filepath, "rb") as f:
        b64_data = base64.b64encode(f.read()).decode('utf-8')
    
    print(f"Uploading {filename} to theme...")
    run_ssh_theme(f"cat > temp_{filename}.b64", stdin=b64_data)
    run_ssh_theme(f"base64 -d temp_{filename}.b64 > {filename}")
    run_ssh_theme(f"rm temp_{filename}.b64")

deploy_js("neo/cart-ui.js")
print("Done!")
