<?php
/*
Template Name: Radiance - Register
*/
get_header();
?>

<main id="neo-main" class="neo-page__main" tabindex="-1">
      <div style="display:flex; justify-content:center; padding: 4rem 2rem;">
        <div class="login-box">
    <a href="/" style="display: inline-block; margin-bottom: 2rem;">
      <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo1.png" alt="Radiance Glamour Lounge" style="height: 72px; width: auto; max-width: 100%; object-fit: contain;">
    </a>
    <h1 class="neo-h3" style="margin-bottom: 0.5rem;">Create Account</h1>
    <p class="neo-body rb-muted" style="margin-bottom: 2rem; font-size: 0.875rem;">Join Radiance Glamour Lounge</p>
    
    <form action="index.html" method="GET" id="registerForm">
      <div class="form-group">
        <label class="form-label" for="fname">First Name</label>
        <input type="text" id="fname" class="form-input" placeholder="First Name" autocomplete="given-name" required>
      </div>
      </div>
    </main>

<?php get_footer(); ?>
