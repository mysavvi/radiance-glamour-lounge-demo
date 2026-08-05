import os
import glob
import subprocess

SSH_CMD = ["sshpass", "-p", "Burningice@1", "ssh", "-o", "StrictHostKeyChecking=no", "-p", "65002", "u331878517@194.36.184.124"]
WP_PATH = "domains/radianceglamourlounge.com/public_html/"

def run_ssh_wp(command):
    cmd = SSH_CMD + [f"cd {WP_PATH} && {command}"]
    result = subprocess.run(cmd, capture_output=True, text=True)
    return result.stdout.strip()

def main():
    pages_files = glob.glob("pages/*.html")
    if not pages_files:
        print("No files found in pages/ directory.")
        return
        
    print("Compressing pages...")
    subprocess.run(["tar", "-czf", "pages.tar.gz", "pages"], check=True)
    subprocess.run(["split", "-b", "500k", "pages.tar.gz", "pages_part_"], check=True)
    
    print("Uploading chunks via SCP...")
    for part in sorted(glob.glob("pages_part_*")):
        print(f"Uploading {part}...")
        scp_cmd = ["sshpass", "-p", "Burningice@1", "scp", "-O", "-o", "StrictHostKeyChecking=no", "-P", "65002", part, "u331878517@194.36.184.124:~/domains/radianceglamourlounge.com/public_html/"]
        subprocess.run(scp_cmd, check=True)
        
    print("Reassembling and extracting remotely...")
    run_ssh_wp("cat pages_part_* > pages.tar.gz && tar -xzf pages.tar.gz")
    
    print("Executing WP-CLI to create/update pages...")
    for file_path in pages_files:
        filename = os.path.basename(file_path)
        slug = filename.replace(".html", "")
        # Remove -stockport suffix for cleaner titles
        title = slug.replace("-", " ").title()
        remote_file = f"pages/{filename}"
        
        # Check if page exists
        existing_id = run_ssh_wp(f"wp post list --post_type=page --name={slug} --format=ids")
        
        if existing_id:
            print(f"Updating existing page '{title}' (ID: {existing_id})...")
            run_ssh_wp(f"wp post update {existing_id} {remote_file} --post_title='{title}' --page_template='elementor_canvas'")
        else:
            print(f"Creating new page '{title}'...")
            run_ssh_wp(f"wp post create {remote_file} --post_type=page --post_name='{slug}' --post_status=publish --post_title='{title}' --page_template='elementor_canvas'")
            
    # Clean up remote pages
    run_ssh_wp("rm -rf pages pages.tar.gz pages_part_*")
    
    # Clean up local chunks
    subprocess.run("rm -f pages_part_* pages.tar.gz", shell=True)
    
    print("Deployment complete!")

if __name__ == "__main__":
    main()
