import json
import glob
import os

expert_section_html = """
    <!-- Meet Your Expert -->
    <section class="neo-section" style="padding: 80px 20px; background: var(--neo-bg-base);">
        <div class="neo-container">
            <div class="neo-card neo-surface-raised" style="padding: 40px; display: flex; gap: 40px; align-items: center; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 300px;">
                    <img src="../images/nabila-profile.jpg" alt="Nabila Salman - Lead Aesthetic Practitioner" style="width: 100%; border-radius: 12px; object-fit: cover;" onerror="this.src='../images/clinic-treatment.jpg'">
                </div>
                <div style="flex: 2; min-width: 300px;">
                    <p class="rb-eyebrow" style="color: var(--neo-accent);">Your Trusted Expert Practitioner</p>
                    <h2 class="neo-h2">Meet Nabila Salman</h2>
                    <p style="margin-top: 20px; line-height: 1.8; color: var(--neo-text-primary); font-size: 1.1rem;">
                        As the visionary founder and lead medical aesthetic practitioner at Radiance Glamour Lounge, <strong>Nabila Salman</strong> brings years of unparalleled expertise, rigorous professional training, and a meticulous eye for detail to every single treatment. Her profound understanding of facial anatomy and unwavering commitment to medical-grade hygiene and safety protocols ensures that you are in the most capable, secure hands in Stockport.
                    </p>
                    <p style="margin-top: 15px; line-height: 1.8; color: var(--neo-text-primary); font-size: 1.1rem;">
                        Nabila believes in transformative, natural-looking results that enhance your unique beauty. She continuously updates her advanced qualifications to bring you the very latest, evidence-based aesthetic innovations from around the world. When you book a treatment, Nabila personally tailors a bespoke journey designed to empower you, restore your confidence, and reveal your ultimate radiance.
                    </p>
                </div>
            </div>
        </div>
    </section>
"""

# We'll inject expert_section_html right before the pricing section in the html_content
for json_file in glob.glob('content_data/*.json'):
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    html = data['html_content']
    
    # Check if we already injected it to avoid duplicates
    if "Meet Nabila Salman" not in html:
        # Inject right before <!-- Pricing -->
        html = html.replace('<!-- Pricing -->', expert_section_html + '\n    <!-- Pricing -->')
    
    service_title = data['meta_title'].split(' | ')[0]
    hook = f"<p style='font-size: 1.15rem; font-weight: 600; color: var(--neo-accent); margin-bottom: 20px;'>Experience the pinnacle of aesthetic excellence with our {service_title} treatment, masterfully delivered by our renowned founder, Nabila Salman.</p>"
    
    # Update html_content directly in the JSON
    if "Experience the pinnacle of aesthetic excellence" not in html:
        # Find the Understanding section and inject the hook
        html = html.replace(f'<h2 class="neo-h2">Understanding {service_title}</h2>\n                <div style="margin-top: 30px; line-height: 1.8; color: var(--neo-text-primary);">',
                            f'<h2 class="neo-h2">Understanding {service_title}</h2>\n                <div style="margin-top: 30px; line-height: 1.8; color: var(--neo-text-primary);">\n                    {hook}')

    data['html_content'] = html
    
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

print("Marketing copy enhanced and Nabila Salman profile injected successfully.")
