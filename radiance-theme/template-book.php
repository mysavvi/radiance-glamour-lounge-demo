<?php
/*
Template Name: Radiance - Book
*/
get_header();
?>

<main id="neo-main" class="neo-page__main" tabindex="-1">
      <nav aria-label="Breadcrumb" class="neo-breadcrumbs-wrap">
        <ol class="neo-breadcrumbs">
          <li><a href="/">Home</a></li>
          <li aria-current="page">Book</li>
        </ol>
      </nav>
      <div class="neo-container rb-page-hero">
        <p class="rb-eyebrow">Book now</p>
        <h1 class="neo-h1 rb-page-hero__title">Book an appointment</h1>
        <p class="neo-body rb-muted rb-page-hero__lead">Select your service, choose a time, and book your appointment online.</p>

        <div class="rb-booking-grid">
          <section class="neo-card neo-surface-raised rb-page-card" aria-labelledby="rb-book-form-title">
            <h2 class="neo-h3" id="rb-book-form-title">Book online</h2>
            <div class="neo-form">
              <?php echo do_shortcode('[savvi_book]'); ?>
            </div>
          </section>

          <aside class="neo-card neo-surface-raised rb-booking-aside" aria-labelledby="rb-book-how-title">
            <h2 class="rb-booking-aside__title" id="rb-book-how-title">How booking works</h2>
            <ol class="rb-booking-steps">
              <li><span><strong>Send your request.</strong> Pick a treatment and a time that suits you.</span></li>
              <li><span><strong>We confirm.</strong> We will call you to agree the appointment.</span></li>
              <li><span><strong>Visit the salon.</strong> 12-16 Prince&rsquo;s St, Stockport SK1 1SE, Merseyway Shopping Centre.</span></li>
              <li><span><strong>Patch tests.</strong> Some waxing, tinting and laser treatments need a patch test first.</span></li>
            </ol>
            <div class="rb-booking-aside__contact">
              <p class="neo-caption">Salon</p>
              <span class="neo-body">12-16 Prince&rsquo;s St, Stockport SK1 1SE</span>
              <a href="tel:07857579631">07857 579631</a>
              <a href="https://www.instagram.com/radiance_glamour_lounge/" target="_blank" rel="noopener noreferrer">@radiance_glamour_lounge</a>
            </div>
          </aside>
        </div>
      </div>
    </main>

<?php get_footer(); ?>
