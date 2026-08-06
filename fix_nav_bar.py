import glob, re, os

desktop_nav_template = """        <ul class="neo-desktop-nav__links">
          <li><a href="{prefix}index.html" {home_attrs}>Home</a></li>
          <li><a href="{prefix}treatments.html" {treatments_attrs}>Treatments</a></li>
          <li><a href="{prefix}clinic.html" {clinic_attrs}>Clinic</a></li>
          <li><a href="{prefix}shop.html" {shop_attrs}>Shop</a></li>
          <li><a href="{prefix}about.html" {about_attrs}>About Us</a></li>
          <li><a href="{prefix}contact.html" {contact_attrs}>Contact</a></li>
        </ul>"""

mobile_nav_template = """        <ul class="neo-mobile-menu__links">
          <li><a href="{prefix}index.html" {home_attrs_mob}>Home</a></li>
          <li><a href="{prefix}treatments.html" {treatments_attrs_mob}>Treatments</a></li>
          <li><a href="{prefix}clinic.html" {clinic_attrs_mob}>Clinic</a></li>
          <li><a href="{prefix}shop.html" {shop_attrs_mob}>Shop</a></li>
          <li><a href="{prefix}about.html" {about_attrs_mob}>About Us</a></li>
          <li><a href="{prefix}contact.html" {contact_attrs_mob}>Contact</a></li>
        </ul>"""

for filepath in glob.glob("production_site/**/*.html", recursive=True):
    with open(filepath, "r") as f:
        content = f.read()
    
    prefix = "../" if "services/" in filepath else ""
    basename = os.path.basename(filepath)
    is_service = "services/" in filepath
    
    # default all to empty
    attrs = {k: "" for k in [
        "home_attrs", "treatments_attrs", "clinic_attrs", "shop_attrs", "about_attrs", "contact_attrs"
    ]}
    
    # default all mobile to data-neo-menu-close
    attrs_mob = {k: 'data-neo-menu-close' for k in [
        "home_attrs_mob", "treatments_attrs_mob", "clinic_attrs_mob", 
        "shop_attrs_mob", "about_attrs_mob", "contact_attrs_mob"
    ]}
    
    active_attr = 'class="neo-nav-link--active" aria-current="page"'
    active_attr_mob = 'class="neo-nav-link--active" data-neo-menu-close aria-current="page"'

    if basename == "index.html" and not is_service:
        attrs["home_attrs"] = active_attr
        attrs_mob["home_attrs_mob"] = active_attr_mob
    elif basename == "treatments.html" or is_service:
        attrs["treatments_attrs"] = active_attr
        attrs_mob["treatments_attrs_mob"] = active_attr_mob
    elif basename == "clinic.html":
        attrs["clinic_attrs"] = active_attr
        attrs_mob["clinic_attrs_mob"] = active_attr_mob
    elif basename == "shop.html":
        attrs["shop_attrs"] = active_attr
        attrs_mob["shop_attrs_mob"] = active_attr_mob
    elif basename == "about.html":
        attrs["about_attrs"] = active_attr
        attrs_mob["about_attrs_mob"] = active_attr_mob
    elif basename == "contact.html":
        attrs["contact_attrs"] = active_attr
        attrs_mob["contact_attrs_mob"] = active_attr_mob
        
    desktop_nav_html = desktop_nav_template.format(prefix=prefix, **attrs)
    mobile_nav_html = mobile_nav_template.format(prefix=prefix, **attrs_mob)
    
    # Replace desktop nav
    content = re.sub(r'<ul class="neo-desktop-nav__links">.*?</ul>', desktop_nav_html, content, flags=re.DOTALL)
    
    # Replace mobile nav
    content = re.sub(r'<ul class="neo-mobile-menu__links">.*?</ul>', mobile_nav_html, content, flags=re.DOTALL)
    
    with open(filepath, "w") as f:
        f.write(content)
        
    print(f"Updated navs in {filepath}")
