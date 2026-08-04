<?php
/*
Template Name: Radiance - Testimonials
*/
get_header();
?>

<main id="neo-main" class="neo-page__main" tabindex="-1">
      <nav aria-label="Breadcrumb" class="neo-breadcrumbs-wrap">
        <ol class="neo-breadcrumbs">
          <li><a href="/">Home</a></li>
          <li aria-current="page">Reviews</li>
        </ol>
      </nav>
      <div class="neo-container rb-page-hero">
        <p class="rb-eyebrow">Reviews</p>
        <h1 class="neo-h1 rb-page-hero__title">What clients say</h1>
        <div class="rb-rating-header" data-neo-reveal>
          <span class="rb-rating-header__score">4.4</span>
          <span class="rb-rating-header__meta">322 reviews on Treatwell</span>
        </div>
        <p class="neo-body rb-muted rb-page-hero__lead">Verified reviews from Treatwell clients. These are real quotes from recent appointments at Radiance Glamour Lounge.</p>

        <div class="rb-reviews-grid" id="reviews-container" data-neo-reveal>
          <!-- Reviews will be loaded here dynamically -->
        </div>
        <script>
          document.addEventListener('DOMContentLoaded', function() {
            fetch('client-reviews.json')
              .then(response => response.json())
              .then(data => {
                const container = document.getElementById('reviews-container');
                if (!container) return;
                
                let html = '';
                data.forEach(review => {
                  html += `
                    <article class="rb-review-card">
                      <blockquote cite="https://www.treatwell.co.uk/place/radiance-glamour-lounge-ladies-only-salon/">
                        <p>&ldquo;${review.text}&rdquo;</p>
                      </blockquote>
                      <footer>${review.name} &middot; Verified on Treatwell</footer>
                    </article>
                  `;
                });
                container.innerHTML = html;
              })
              .catch(error => console.error('Error loading reviews:', error));
          });
        </script>

        <section class="neo-section neo-section--inset" style="margin-top: var(--neo-space-8);" data-neo-reveal>
          <h2 class="neo-h3">Book your visit</h2>
          <p class="neo-body rb-muted">Join hundreds of happy clients. Request an appointment on our website or call us to ask about availability.</p>
          <div class="rb-cta-row" style="margin-top: var(--neo-space-4);">
            <a href="/book/" class="neo-btn neo-btn--primary">Book online</a>
            <a href="tel:07857579631" class="neo-btn neo-btn--secondary">Call 07857 579631</a>
          </div>
        </section>
      </div>
    </main>

<?php get_footer(); ?>
