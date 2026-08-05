import re

files = ["production_site/clinic.html", "production_site/treatments.html"]

replacements = {
    "Aesthetic clinic consultation": "/services/aesthetic-clinic-consultation-stockport/",
    "Clinic consultation": "/services/aesthetic-clinic-consultation-stockport/",
    "Cosmetic injectables": "/services/cosmetic-injectables-stockport/",
    "Cosmetic injectables &amp; treatments": "/services/cosmetic-injectables-and-treatments-stockport/",
    "PRP vampire facial": "/services/prp-vampire-facial-stockport/",
    "Vampire face lift": "/services/vampire-face-lift-stockport/",
    "Plasma pen": "/services/plasma-pen-stockport/",
    "Plasma pen for scars": "/services/plasma-pen-for-scars-stockport/",
    "Microneedling Basic": "/services/microneedling-stockport/",
    "Microneedling Deluxe": "/services/microneedling-stockport/",
    "Hand treatment": "/services/hand-treatment-stockport/",
    "Foot treatment": "/services/foot-treatment-stockport/"
}

for filepath in files:
    with open(filepath, "r") as f:
        html = f.read()

    for name, url in replacements.items():
        old_str = f'<p class="neo-price-row__name">{name}</p>'
        new_str = f'<a class="neo-price-row__name" href="{url}" style="color: inherit; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 4px;">{name}</a>'
        html = html.replace(old_str, new_str)
        
    with open(filepath, "w") as f:
        f.write(html)
    print(f"Updated price links in {filepath}")
