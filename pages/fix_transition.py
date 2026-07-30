import os
import glob

target_dir = "/Users/user/Desktop/Radiance Glamour Lounge/pages"

for filepath in glob.glob(os.path.join(target_dir, "*.html")):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the transition block
    old_transition = """    border-color var(--neo-duration-normal),
    -webkit-backdrop-filter var(--neo-duration-normal),
    backdrop-filter var(--neo-duration-normal);"""
    
    new_transition = """    border-color var(--neo-duration-normal);
  -webkit-transform: translateZ(0);
  transform: translateZ(0);"""
  
    new_content = content.replace(old_transition, new_transition)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Fixed: {os.path.basename(filepath)}")

# Also fix the mobile header transition if it has the same issue
