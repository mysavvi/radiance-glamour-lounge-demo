import re

with open("production_site/clinic.html", "r") as f:
    html = f.read()

# The section we want to replace starts with:
# <section class="rb-section" aria-labelledby="rb-clinic-pillars-title">
# And ends with:
#           </div>
#         </div>
#       </section>
# BEFORE the <section class="rb-section rb-clinic-menu"

pattern = re.compile(r'<section class="rb-section" aria-labelledby="rb-clinic-pillars-title">.*?(?:<section class="rb-section rb-clinic-menu")', re.DOTALL)

grid_html = """<section class="rb-section" aria-labelledby="rb-clinic-pillars-title">
        <div class="neo-container">
          <p class="rb-eyebrow">Treatment menu</p>
          <h2 class="neo-h2" id="rb-clinic-pillars-title">Clinic Services</h2>
          <p class="neo-body rb-muted rb-clinic-pillars__intro">Click a service to learn more about the procedure, benefits, and to book your consultation with Nabila Salman.</p>

          <ul class="neo-grid" style="margin-top: 32px; padding: 0;">
            <li class="neo-grid-item" style="list-style: none;">
              <a href="/services/aesthetic-clinic-consultation-stockport/" style="text-decoration: none; color: inherit; display: block; transition: transform 0.3s ease;">
                <img src="/wp-content/uploads/2026/08/consultation_hero_1785906262133.png" alt="Aesthetic Clinic Consultation" style="width:100%; border-radius: var(--neo-radius-md); aspect-ratio: 16/9; object-fit: cover; margin-bottom: 12px; box-shadow: var(--neo-shadow-raised);">
                <h3 class="neo-h4" style="text-align: center; margin-bottom: 4px;">Clinic Consultation</h3>
                <p class="neo-body rb-muted" style="text-align: center; font-size: 0.9rem;">Discuss your goals and suitability</p>
              </a>
            </li>
            <li class="neo-grid-item" style="list-style: none;">
              <a href="/services/cosmetic-injectables-stockport/" style="text-decoration: none; color: inherit; display: block; transition: transform 0.3s ease;">
                <img src="/wp-content/uploads/2026/08/injectables_hero_1785862416413.png" alt="Cosmetic Injectables" style="width:100%; border-radius: var(--neo-radius-md); aspect-ratio: 16/9; object-fit: cover; margin-bottom: 12px; box-shadow: var(--neo-shadow-raised);">
                <h3 class="neo-h4" style="text-align: center; margin-bottom: 4px;">Cosmetic Injectables</h3>
                <p class="neo-body rb-muted" style="text-align: center; font-size: 0.9rem;">Targeted volume and smoothness</p>
              </a>
            </li>
            <li class="neo-grid-item" style="list-style: none;">
              <a href="/services/prp-vampire-facial-stockport/" style="text-decoration: none; color: inherit; display: block; transition: transform 0.3s ease;">
                <img src="/wp-content/uploads/2026/08/vampire_facial_hero_1785906212658.png" alt="PRP Vampire Facial" style="width:100%; border-radius: var(--neo-radius-md); aspect-ratio: 16/9; object-fit: cover; margin-bottom: 12px; box-shadow: var(--neo-shadow-raised);">
                <h3 class="neo-h4" style="text-align: center; margin-bottom: 4px;">PRP Vampire Facial</h3>
                <p class="neo-body rb-muted" style="text-align: center; font-size: 0.9rem;">Natural collagen stimulation</p>
              </a>
            </li>
            <li class="neo-grid-item" style="list-style: none;">
              <a href="/services/vampire-face-lift-stockport/" style="text-decoration: none; color: inherit; display: block; transition: transform 0.3s ease;">
                <img src="/wp-content/uploads/2026/08/vampire_facelift_hero_1785906269162.png" alt="Vampire Face Lift" style="width:100%; border-radius: var(--neo-radius-md); aspect-ratio: 16/9; object-fit: cover; margin-bottom: 12px; box-shadow: var(--neo-shadow-raised);">
                <h3 class="neo-h4" style="text-align: center; margin-bottom: 4px;">Vampire Face Lift</h3>
                <p class="neo-body rb-muted" style="text-align: center; font-size: 0.9rem;">Advanced rejuvenation</p>
              </a>
            </li>
            <li class="neo-grid-item" style="list-style: none;">
              <a href="/services/plasma-pen-stockport/" style="text-decoration: none; color: inherit; display: block; transition: transform 0.3s ease;">
                <img src="/wp-content/uploads/2026/08/plasma_pen_hero_1785862425813.png" alt="Plasma Pen" style="width:100%; border-radius: var(--neo-radius-md); aspect-ratio: 16/9; object-fit: cover; margin-bottom: 12px; box-shadow: var(--neo-shadow-raised);">
                <h3 class="neo-h4" style="text-align: center; margin-bottom: 4px;">Plasma Pen</h3>
                <p class="neo-body rb-muted" style="text-align: center; font-size: 0.9rem;">Fibroblast skin tightening</p>
              </a>
            </li>
            <li class="neo-grid-item" style="list-style: none;">
              <a href="/services/microneedling-stockport/" style="text-decoration: none; color: inherit; display: block; transition: transform 0.3s ease;">
                <img src="/wp-content/uploads/2026/08/microneedling_hero_1785906196548.png" alt="Microneedling" style="width:100%; border-radius: var(--neo-radius-md); aspect-ratio: 16/9; object-fit: cover; margin-bottom: 12px; box-shadow: var(--neo-shadow-raised);">
                <h3 class="neo-h4" style="text-align: center; margin-bottom: 4px;">Microneedling</h3>
                <p class="neo-body rb-muted" style="text-align: center; font-size: 0.9rem;">Skin texture & tone</p>
              </a>
            </li>
            <li class="neo-grid-item" style="list-style: none;">
              <a href="/services/jalupro-stockport/" style="text-decoration: none; color: inherit; display: block; transition: transform 0.3s ease;">
                <img src="/wp-content/uploads/2026/08/jalupro_hero_1785906205941.png" alt="Jalupro" style="width:100%; border-radius: var(--neo-radius-md); aspect-ratio: 16/9; object-fit: cover; margin-bottom: 12px; box-shadow: var(--neo-shadow-raised);">
                <h3 class="neo-h4" style="text-align: center; margin-bottom: 4px;">Jalupro</h3>
                <p class="neo-body rb-muted" style="text-align: center; font-size: 0.9rem;">Amino acid skin boosting</p>
              </a>
            </li>
            <li class="neo-grid-item" style="list-style: none;">
              <a href="/services/sunekos-stockport/" style="text-decoration: none; color: inherit; display: block; transition: transform 0.3s ease;">
                <img src="/wp-content/uploads/2026/08/sunekos_hero_1785906236540.png" alt="Sunekos" style="width:100%; border-radius: var(--neo-radius-md); aspect-ratio: 16/9; object-fit: cover; margin-bottom: 12px; box-shadow: var(--neo-shadow-raised);">
                <h3 class="neo-h4" style="text-align: center; margin-bottom: 4px;">Sunekos</h3>
                <p class="neo-body rb-muted" style="text-align: center; font-size: 0.9rem;">Restore elasticity & hydration</p>
              </a>
            </li>
            <li class="neo-grid-item" style="list-style: none;">
              <a href="/services/aqualyx-fat-dissolving-stockport/" style="text-decoration: none; color: inherit; display: block; transition: transform 0.3s ease;">
                <img src="/wp-content/uploads/2026/08/fat_dissolving_hero_1785906253996.png" alt="Aqualyx Fat Dissolving" style="width:100%; border-radius: var(--neo-radius-md); aspect-ratio: 16/9; object-fit: cover; margin-bottom: 12px; box-shadow: var(--neo-shadow-raised);">
                <h3 class="neo-h4" style="text-align: center; margin-bottom: 4px;">Fat Dissolving</h3>
                <p class="neo-body rb-muted" style="text-align: center; font-size: 0.9rem;">Targeted contouring</p>
              </a>
            </li>
            <li class="neo-grid-item" style="list-style: none;">
              <a href="/services/chemical-peel-stockport/" style="text-decoration: none; color: inherit; display: block; transition: transform 0.3s ease;">
                <img src="/wp-content/uploads/2026/08/chemical_peel_hero_1785906188642.png" alt="Chemical Peel" style="width:100%; border-radius: var(--neo-radius-md); aspect-ratio: 16/9; object-fit: cover; margin-bottom: 12px; box-shadow: var(--neo-shadow-raised);">
                <h3 class="neo-h4" style="text-align: center; margin-bottom: 4px;">Chemical Peel</h3>
                <p class="neo-body rb-muted" style="text-align: center; font-size: 0.9rem;">Deep exfoliation & renewal</p>
              </a>
            </li>
            <li class="neo-grid-item" style="list-style: none;">
              <a href="/services/dermaplaning-stockport/" style="text-decoration: none; color: inherit; display: block; transition: transform 0.3s ease;">
                <img src="/wp-content/uploads/2026/08/dermaplaning_hero_1785906246303.png" alt="Dermaplaning" style="width:100%; border-radius: var(--neo-radius-md); aspect-ratio: 16/9; object-fit: cover; margin-bottom: 12px; box-shadow: var(--neo-shadow-raised);">
                <h3 class="neo-h4" style="text-align: center; margin-bottom: 4px;">Dermaplaning</h3>
                <p class="neo-body rb-muted" style="text-align: center; font-size: 0.9rem;">Smooth, glowing skin</p>
              </a>
            </li>
            <li class="neo-grid-item" style="list-style: none;">
              <a href="/services/cosmetic-injectables-and-treatments-stockport/" style="text-decoration: none; color: inherit; display: block; transition: transform 0.3s ease;">
                <img src="/wp-content/uploads/2026/08/injectables_package_hero_1785906228571.png" alt="Injectables Package" style="width:100%; border-radius: var(--neo-radius-md); aspect-ratio: 16/9; object-fit: cover; margin-bottom: 12px; box-shadow: var(--neo-shadow-raised);">
                <h3 class="neo-h4" style="text-align: center; margin-bottom: 4px;">Injectables Package</h3>
                <p class="neo-body rb-muted" style="text-align: center; font-size: 0.9rem;">Comprehensive treatment</p>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section class="rb-section rb-clinic-menu"
"""

if pattern.search(html):
    new_html = pattern.sub(grid_html, html)
    with open("production_site/clinic.html", "w") as f:
        f.write(new_html)
    print("Replaced in clinic.html")
else:
    print("Pattern not found in clinic.html")
