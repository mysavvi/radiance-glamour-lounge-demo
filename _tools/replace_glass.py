import glob

files = glob.glob("pages/*.html")

for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    # We want to replace <div class="neo-glass-panel" with <div class="neo-card neo-surface-raised"
    # ONLY where it is used as a layout container (like in cart.html sidebar)
    # Actually, neo-glass-panel is probably used in multiple places incorrectly.
    # Let's see where it's used before replacing everywhere.
