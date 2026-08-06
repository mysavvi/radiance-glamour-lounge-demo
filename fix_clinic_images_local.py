import re

html_path = 'production_site/clinic.html'

with open(html_path, 'r') as f:
    content = f.read()

# Mapping of the broken wordpress images to local ones
image_map = {
    'consultation_hero_1785906262133.png': 'images/clinic-treatment.jpg',
    'injectables_hero_1785862416413.png': 'images/hero-1.jpg',
    'vampire_facial_hero_1785906212658.png': 'images/gallery-facial.jpg',
    'vampire_facelift_hero_1785906269162.png': 'images/hero-2.jpg',
    'plasma_pen_hero_1785862425813.png': 'images/gallery-wax-laser.jpg',
    'microneedling_hero_1785906196548.png': 'images/hero-3.jpg',
    'jalupro_hero_1785906205941.png': 'images/clinic-treatment.jpg',
    'sunekos_hero_1785906236540.png': 'images/hero-4.jpg',
    'fat_dissolving_hero_1785906253996.png': 'images/gallery-massage.jpg',
    'chemical_peel_hero_1785906188642.png': 'images/hero-5.jpg',
    'dermaplaning_hero_1785906246303.png': 'images/gallery-facial.jpg',
    'injectables_package_hero_1785906228571.png': 'images/clinic-treatment.jpg'
}

for wp_filename, local_path in image_map.items():
    # Replace both occurrences: the one in the grid and the one in the mobile list
    pattern = r'src="[^"]*/' + wp_filename + r'"'
    content = re.sub(pattern, f'src="{local_path}"', content)

with open(html_path, 'w') as f:
    f.write(content)

print("Clinic images replaced with local fallbacks.")
