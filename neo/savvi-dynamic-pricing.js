/**
 * Savvi POS Dynamic Pricing
 * Fetches live pricing from the Savvi POS API and updates matching elements.
 * Usage: <span data-savvi-service="vampire-face-lift">£150</span>
 */
(function() {
    function slugify(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }

    function formatPrice(priceStr) {
        var price = parseFloat(priceStr);
        if (isNaN(price)) return priceStr;
        // Format to remove decimals if they are .00
        if (price % 1 === 0) {
            return '£' + price.toString();
        }
        return '£' + price.toFixed(2);
    }

    function initDynamicPricing() {
        var elements = document.querySelectorAll('[data-savvi-service]');
        if (elements.length === 0) return; // Nothing to update on this page

        // Find the API base URL from the book widget if available, otherwise default
        var apiBase = '/wp-json/savvi-pos/v1';
        var mount = document.querySelector('[data-savvi-mount="book"]') || document.querySelector('[data-savvi-mount="shop"]');
        if (mount && mount.getAttribute('data-api')) {
            apiBase = mount.getAttribute('data-api').replace(/\/$/, '');
        }

        fetch(apiBase + '/public/services', { headers: { 'Accept': 'application/json' } })
            .then(function(response) {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(function(json) {
                if (json.status !== 'success' || !json.data) return;
                
                // Build a pricing map keyed by slug
                var pricingMap = {};
                json.data.forEach(function(category) {
                    if (category.services) {
                        category.services.forEach(function(service) {
                            var slug = slugify(service.name);
                            pricingMap[slug] = formatPrice(service.price);
                        });
                    }
                });

                // Update all matching elements
                elements.forEach(function(el) {
                    var serviceSlug = el.getAttribute('data-savvi-service');
                    if (pricingMap[serviceSlug]) {
                        // Keep any existing innerHTML structure if we want, or just replace text.
                        // Usually, it's just a text node inside a span.
                        el.textContent = pricingMap[serviceSlug];
                    }
                });
            })
            .catch(function(error) {
                console.error('Savvi Dynamic Pricing Error:', error);
            });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDynamicPricing);
    } else {
        initDynamicPricing();
    }
})();
