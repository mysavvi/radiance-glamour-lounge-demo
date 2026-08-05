import json
import os

OUTPUT_DIR = "content_data"
LOCATIONS_STRING = "Stockport, Heaton Moor, Heaton Mersey, Heaton Chapel, Heaton Norris, Davenport, Great Moor, Woodsmoor, Offerton, Edgeley, Adswood, Bramhall, Hazel Grove, Cheadle, Cheadle Hulme, Gatley, Heald Green, Burnage, Levenshulme, Didsbury, Reddish, and South Reddish"

def generate_schema(title, desc, slug):
    return json.dumps({
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "MedicalBusiness",
                "@id": f"https://www.radianceglamourlounge.co.uk/#business",
                "name": "Radiance Glamour Lounge",
                "url": "https://www.radianceglamourlounge.co.uk",
                "telephone": "07857 579631",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "12-16 Prince's St",
                    "addressLocality": "Stockport",
                    "addressRegion": "Greater Manchester",
                    "postalCode": "SK1 1SE",
                    "addressCountry": "GB"
                }
            },
            {
                "@type": "Service",
                "name": title,
                "description": desc,
                "provider": {"@id": "https://www.radianceglamourlounge.co.uk/#business"}
            },
            {
                "@type": "WebPage",
                "@id": f"https://www.radianceglamourlounge.co.uk/services/{slug}.html",
                "url": f"https://www.radianceglamourlounge.co.uk/services/{slug}.html",
                "name": title,
                "description": desc
            }
        ]
    }, indent=2)

def generate_html_content(service_data):
    return f"""
    <!-- Hero Section -->
    <section class="neo-hero" style="background-image: linear-gradient(to right, rgba(42, 46, 53, 0.95), rgba(42, 46, 53, 0.7)), url('../{service_data['image']}'); background-size: cover; background-position: center; padding: 120px 20px;">
        <div class="neo-container">
            <h1 class="neo-h1" style="color: var(--neo-accent);">{service_data['h1']}</h1>
            <p class="neo-lead" style="max-width: 600px; color: var(--neo-text-primary); margin-top: 20px;">{service_data['hero_sub']}</p>
            <div style="margin-top: 40px; display: flex; gap: 20px; flex-wrap: wrap;">
                <a href="../book/?treatment=clinic" class="neo-btn neo-btn--primary">Book Consultation</a>
                <a href="#pricing" class="neo-btn neo-btn--secondary">View Pricing</a>
            </div>
        </div>
    </section>

    <!-- Introduction -->
    <section class="neo-section" style="padding: 80px 20px;">
        <div class="neo-container">
            <div class="neo-card neo-surface-raised" style="padding: 40px;">
                <h2 class="neo-h2">Understanding {service_data['title']}</h2>
                <div style="margin-top: 30px; line-height: 1.8; color: var(--neo-text-primary);">
                    {service_data['intro_paragraphs']}
                </div>
            </div>
        </div>
    </section>

    <!-- Benefits & Candidates -->
    <section class="neo-section" style="padding: 80px 20px; background: var(--neo-bg-inset);">
        <div class="neo-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px;">
            <div class="neo-card neo-surface-raised" style="padding: 40px;">
                <h3 class="neo-h3" style="color: var(--neo-accent);">Key Benefits</h3>
                <ul style="margin-top: 20px; padding-left: 20px; line-height: 1.8;">{service_data['benefits']}</ul>
            </div>
            <div class="neo-card neo-surface-raised" style="padding: 40px;">
                <h3 class="neo-h3" style="color: var(--neo-accent);">Suitable Candidates</h3>
                <p style="margin-top: 20px;">{service_data['candidates']}</p>
                <h4 class="neo-h4" style="margin-top: 20px; color: #ef5350;">Who Should Avoid</h4>
                <ul style="margin-top: 10px; padding-left: 20px; line-height: 1.8;">{service_data['avoid']}</ul>
            </div>
        </div>
    </section>

    <!-- Process & Timeline -->
    <section class="neo-section" style="padding: 80px 20px;">
        <div class="neo-container">
            <h2 class="neo-h2" style="text-align: center; margin-bottom: 50px;">The Treatment Journey</h2>
            <div class="neo-card neo-surface-raised" style="padding: 40px; margin-bottom: 30px;">
                <h3 class="neo-h3">1. Step-by-Step Procedure</h3>
                <ol style="margin-top: 15px; padding-left: 20px; line-height: 1.8;">{service_data['step_by_step']}</ol>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
                <div class="neo-card neo-surface-inset" style="padding: 30px;"><h4 class="neo-h4">Recovery</h4><p>{service_data['recovery']}</p></div>
                <div class="neo-card neo-surface-inset" style="padding: 30px;"><h4 class="neo-h4">Results</h4><p>{service_data['results_timeline']}</p></div>
                <div class="neo-card neo-surface-inset" style="padding: 30px;"><h4 class="neo-h4">Maintenance</h4><p>{service_data['maintenance']}</p></div>
            </div>
        </div>
    </section>

    <!-- Safety & Aftercare -->
    <section class="neo-section" style="padding: 80px 20px; background: var(--neo-bg-inset);">
        <div class="neo-container">
            <div class="neo-card neo-surface-raised" style="padding: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
                <div><h3 class="neo-h3">Risks</h3><p>{service_data['risks']}</p></div>
                <div><h3 class="neo-h3">Aftercare</h3><ul style="padding-left: 20px;">{service_data['aftercare']}</ul></div>
            </div>
        </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="neo-section" style="padding: 80px 20px;">
        <div class="neo-container">
            <div class="neo-card neo-surface-raised" style="padding: 40px; text-align: center; max-width: 800px; margin: 0 auto;">
                <h2 class="neo-h2">Transparent Pricing</h2>
                <p style="margin: 20px 0;">Our pricing is dynamically synchronized via Savvi POS.</p>
                <div data-savvi-mount="book" data-api="/wp-json/savvi-pos/v1" data-currency="&pound;" data-category="{service_data['savvi_category']}">
                    <a href="../book/?treatment=clinic" class="neo-btn neo-btn--primary neo-btn--lg">View Live Pricing</a>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQs -->
    <section class="neo-section" style="padding: 80px 20px;"><div class="neo-container"><h2 class="neo-h2" style="text-align: center; margin-bottom: 50px;">FAQs</h2><div style="max-width: 800px; margin: 0 auto;">{service_data['faqs']}</div></div></section>

    <section class="neo-section" style="padding: 60px 20px; background: var(--neo-bg-base);"><div class="neo-container"><p class="neo-caption" style="text-align: center;"><strong>Local Service Area:</strong> Serving clients across {LOCATIONS_STRING}.</p></div></section>
    """

services = [
    {
        "slug": "chemical-peel-stockport",
        "title": "Chemical Peel",
        "h1": "Advanced Chemical Peels in Stockport",
        "hero_sub": "Reveal a brighter, smoother, and more youthful complexion by removing dead skin cells with our medical-grade chemical peels.",
        "image": "images/skin-rejuvenation-stockport-hero.jpg",
        "savvi_category": "skin",
        "intro_paragraphs": "<p>A chemical peel is a deeply exfoliating skin treatment wherein a non-toxic chemical solution is applied to the skin, causing it to safely peel off the damaged outer layers. The new, regenerated skin underneath is typically smoother, less wrinkled, and more even in tone.</p><p>We offer a range of peels from superficial to medium depth, tailoring the acid blend (such as Glycolic, Salicylic, or Lactic acid) to target your specific concerns, whether that's acne, hyperpigmentation, fine lines, or simply a dull complexion.</p>",
        "benefits": "<li>Dramatically improves skin texture and tone.</li><li>Reduces hyperpigmentation, melasma, and age spots.</li><li>Unclogs pores and clears acne breakouts.</li><li>Softens fine lines and superficial wrinkles.</li>",
        "candidates": "Suitable for most skin types depending on the acid used. Excellent for acne-prone skin, sun damage, and aging skin.",
        "avoid": "<li>Active cold sores or undiagnosed lesions.</li><li>Recent use of Isotretinoin (Accutane) within the last 6 months.</li><li>Sunburnt or compromised skin.</li>",
        "step_by_step": "<li><strong>Deep Cleanse:</strong> Removing all oils and makeup.</li><li><strong>Application:</strong> The chemical solution is applied with a brush. You will feel a tingling or warm sensation.</li><li><strong>Neutralization:</strong> The acid is neutralized and removed once the desired endpoint is reached.</li>",
        "recovery": "Varies by depth. Superficial peels have no downtime. Medium peels cause visible peeling and flaking for 3-7 days.",
        "results_timeline": "Once the peeling finishes (usually within a week), the fresh skin is revealed.",
        "maintenance": "Superficial peels can be done monthly; deeper peels are usually done 1-3 times a year.",
        "risks": "Prolonged redness, increased sun sensitivity, and rare risks of hyperpigmentation if proper aftercare (SPF) is not followed.",
        "aftercare": "<li>ABSOLUTELY NO picking or pulling at peeling skin.</li><li>Apply a thick, unscented moisturizer frequently.</li><li>Strict sun avoidance and daily SPF application.</li>",
        "faqs": '<div class="neo-card neo-surface-inset" style="padding: 20px;"><h4 class="neo-h4">Does it hurt?</h4><p>You will feel a spicy, tingling sensation while the peel is active on the skin, but it is neutralized quickly. We use a fan to keep you comfortable.</p></div>'
    },
    {
        "slug": "microneedling-stockport",
        "title": "Microneedling",
        "h1": "Professional Microneedling in Stockport",
        "hero_sub": "Stimulate your skin's healing process for unparalleled collagen production and texture refinement.",
        "image": "images/skin-rejuvenation-stockport-hero.jpg",
        "savvi_category": "skin",
        "intro_paragraphs": "<p>Microneedling (also known as Collagen Induction Therapy) involves the use of a medical-grade device containing fine, sterile needles to create thousands of micro-punctures in the skin. This controlled trauma triggers the body's natural wound-healing cascade, stimulating massive production of collagen and elastin.</p><p>It is one of the most effective treatments available for refining skin texture, shrinking enlarged pores, and significantly reducing the appearance of both acne scars and surgical scars.</p>",
        "benefits": "<li>Stimulates massive natural collagen production.</li><li>Dramatically reduces acne scarring and pore size.</li><li>Improves skin firmness and elasticity.</li><li>Allows for deep penetration of topical serums used during treatment.</li>",
        "candidates": "Ideal for clients with acne scarring, enlarged pores, uneven skin texture, and fine lines. Safe for all Fitzpatrick skin types.",
        "avoid": "<li>Active acne breakouts (can spread bacteria).</li><li>Active cold sores.</li><li>Bleeding disorders.</li>",
        "step_by_step": "<li><strong>Numbing:</strong> Topical anesthetic is applied for comfort.</li><li><strong>Needling:</strong> The device is passed over the skin, applying specific serums (like Hyaluronic Acid) to aid glide and absorption.</li><li><strong>Cooling:</strong> A soothing sheet mask is applied.</li>",
        "recovery": "Skin will appear red (like a sunburn) and feel tight for 24-48 hours. Mild flaking may occur on day 3-4.",
        "results_timeline": "Initial glow is seen within days. True collagen remodeling occurs over 4-6 weeks.",
        "maintenance": "A course of 3-6 treatments spaced 4 weeks apart is recommended for optimal results.",
        "risks": "Temporary redness, pinpoint bleeding, and very low risk of infection if aftercare is followed.",
        "aftercare": "<li>Keep the skin completely bare for 24 hours (no makeup, no sunscreen).</li><li>Change your pillowcase to a fresh, clean one on the night of treatment.</li><li>Avoid sweating, gyms, and saunas for 48 hours.</li>",
        "faqs": '<div class="neo-card neo-surface-inset" style="padding: 20px;"><h4 class="neo-h4">How deep do the needles go?</h4><p>The depth is adjustable by the practitioner based on the area being treated and the specific skin concern, usually ranging from 0.5mm to 2.5mm.</p></div>'
    },
    {
        "slug": "dermaplaning-stockport",
        "title": "Dermaplaning",
        "h1": "Luxury Dermaplaning in Stockport",
        "hero_sub": "Achieve instantly smooth, glowing skin with our professional physical exfoliation treatment.",
        "image": "images/skin-rejuvenation-stockport-hero.jpg",
        "savvi_category": "skin",
        "intro_paragraphs": "<p>Dermaplaning is a highly effective, physical exfoliation procedure. Using a sterile, surgical scalpel, our expert practitioners gently shave the skin's surface, removing the uppermost layer of dead skin cells along with fine, vellus hair (peach fuzz).</p><p>The result is instantly brighter, incredibly smooth skin. Not only does it provide a flawless canvas for makeup application, but it also allows your expensive skincare products to penetrate deeper and work more effectively.</p>",
        "benefits": "<li>Instantly radiant and silky-smooth skin.</li><li>Removes vellus hair (peach fuzz) that traps dirt and oil.</li><li>Enhances the penetration of skincare products.</li><li>Creates a flawless base for makeup application.</li>",
        "candidates": "Suitable for almost everyone. It is a fantastic 'red carpet' treatment to have right before a big event.",
        "avoid": "<li>Active, cystic acne breakouts.</li><li>Clients with severe rosacea or highly reactive, inflamed skin.</li>",
        "step_by_step": "<li><strong>Cleanse & Prep:</strong> The skin is thoroughly cleansed and dried.</li><li><strong>Dermaplaning:</strong> The practitioner gently strokes the scalpel at a 45-degree angle across the taut skin.</li><li><strong>Hydration:</strong> Application of soothing serums and a hydrating mask.</li>",
        "recovery": "Zero downtime. You can return to your activities immediately with glowing skin.",
        "results_timeline": "Results are instant.",
        "maintenance": "Every 4 to 6 weeks, aligned with your natural skin cycle.",
        "risks": "Virtually risk-free. A rare, minor nick from the blade is possible but heals very quickly.",
        "aftercare": "<li>Avoid direct sun exposure and wear SPF daily (newly exfoliated skin is vulnerable).</li><li>Avoid strong acids (AHA/BHA) or retinol for 48 hours.</li>",
        "faqs": '<div class="neo-card neo-surface-inset" style="padding: 20px;"><h4 class="neo-h4">Will my hair grow back thicker or darker?</h4><p>No, this is a common myth. Dermaplaning does not interact with the hair follicle, so your vellus hair will grow back exactly the same texture and color as before.</p></div>'
    }
]

for s in services:
    meta_title = s['h1'] + " | Radiance Glamour Lounge"
    slug = s['slug']
    schema = generate_schema(s['title'], s['hero_sub'], slug)
    html = generate_html_content(s)
    
    out_path = os.path.join(OUTPUT_DIR, f"{slug}.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump({"slug": slug, "meta_title": meta_title, "meta_description": s['hero_sub'], "schema_json": schema, "html_content": html}, f, indent=2)

print("Generated content for batch 4")
