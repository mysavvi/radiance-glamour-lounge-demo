import os
import glob
import subprocess
from bs4 import BeautifulSoup

from deploy_services import process_service_html

SSH_CMD = ["sshpass", "-p", "Burningice@1", "ssh", "-o", "StrictHostKeyChecking=no", "-p", "65002", "u331878517@194.36.184.124"]
WP_PATH = "domains/radianceglamourlounge.com/public_html/"

def run_ssh_wp(command):
    cmd = SSH_CMD + [f"cd {WP_PATH} && {command}"]
    result = subprocess.run(cmd, capture_output=True, text=True)
    return result.stdout.strip()

def main():
    os.makedirs("dist_wp", exist_ok=True)
    
    print("Bundling pages locally...")
    service_files = glob.glob("services/*.html")
    
    for file_path in service_files:
        filename = os.path.basename(file_path)
        slug = filename.replace(".html", "")
        # Remove -stockport suffix for cleaner titles
        title = slug.replace("-stockport", "").replace("-", " ").title()
        
        print(f"Bundling {slug}...")
        with open(file_path, "r", encoding="utf-8") as f:
            raw_html = f.read()
            
        bundled_html = process_service_html(raw_html, slug)
        
        # Write bundled HTML to dist_wp
        dist_path = os.path.join("dist_wp", filename)
        with open(dist_path, "w", encoding="utf-8") as f:
            f.write(bundled_html)
            
    print("Uploading bundled files via SCP...")
    scp_cmd = ["sshpass", "-p", "Burningice@1", "scp", "-o", "StrictHostKeyChecking=no", "-P", "65002", "-r", "dist_wp", "u331878517@194.36.184.124:~/domains/radianceglamourlounge.com/public_html/"]
    subprocess.run(scp_cmd, check=True)
    
    print("Executing WP-CLI to create/update pages...")
    for file_path in service_files:
        filename = os.path.basename(file_path)
        slug = filename.replace(".html", "")
        title = slug.replace("-stockport", "").replace("-", " ").title()
        remote_file = f"dist_wp/{filename}"
        
        # Check if page exists
        existing_id = run_ssh_wp(f"wp post list --post_type=page --name={slug} --format=ids")
        
        if existing_id:
            print(f"Updating existing page '{title}' (ID: {existing_id})...")
            # Update post
            run_ssh_wp(f"wp post update {existing_id} {remote_file} --post_title='{title}' --page_template='elementor_canvas'")
        else:
            print(f"Creating new page '{title}'...")
            # Create post
            run_ssh_wp(f"wp post create {remote_file} --post_type=page --post_name='{slug}' --post_status=publish --post_title='{title}' --page_template='elementor_canvas'")
            
    # Clean up remote dist_wp
    run_ssh_wp("rm -rf dist_wp")
    print("Deployment complete!")

if __name__ == "__main__":
    main()
