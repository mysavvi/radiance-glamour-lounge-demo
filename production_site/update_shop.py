import re

with open('shop.html', 'r') as f:
    content = f.read()

products = [
    {
        'id': 'radiance-beauty-serum',
        'title': 'Radiance Beauty Serum',
        'price': 45.00,
        'image': 'images/logo1.png',
        'category': 'Skincare',
        'size': '50ml',
        'search': r'<button type="button" class="neo-btn neo-btn--primary" aria-label="Add Radiance Beauty Serum to cart" onclick="window\.location\.href=\'cart\.html\'">Add to cart</button>'
    },
    {
        'id': 'glamour-hair-mask',
        'title': 'Glamour Hair Mask',
        'price': 32.00,
        'image': 'images/logo1.png',
        'category': 'Haircare',
        'size': '200ml',
        'search': r'<button type="button" class="neo-btn neo-btn--primary" aria-label="Add Glamour Hair Mask to cart" onclick="window\.location\.href=\'cart\.html\'">Add to cart</button>'
    },
    {
        'id': 'hydrating-mist',
        'title': 'Hydrating Mist',
        'price': 28.00,
        'image': 'images/logo1.png',
        'category': 'Skincare',
        'size': '100ml',
        'search': r'<button type="button" class="neo-btn neo-btn--primary" aria-label="Add Hydrating Mist to cart" onclick="window\.location\.href=\'cart\.html\'">Add to cart</button>'
    },
    {
        'id': 'lounge-signature-perfume',
        'title': 'Lounge Signature Perfume',
        'price': 65.00,
        'image': 'images/logo1.png',
        'category': 'Fragrance',
        'size': '50ml',
        'search': r'<button type="button" class="neo-btn neo-btn--primary" aria-label="Add Lounge Signature Perfume to cart" onclick="window\.location\.href=\'cart\.html\'">Add to cart</button>'
    }
]

for p in products:
    replacement = f'<button type="button" class="neo-btn neo-btn--primary shop-add-to-cart" data-id="{p["id"]}" data-title="{p["title"]}" data-price="{p["price"]}" data-image="{p["image"]}" data-category="{p["category"]}" data-size="{p["size"]}" aria-label="Add {p["title"]} to cart">Add to cart</button>'
    content = re.sub(p['search'], replacement, content)

with open('shop.html', 'w') as f:
    f.write(content)

