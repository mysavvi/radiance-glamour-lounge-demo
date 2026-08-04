<?php
/*
Template Name: Radiance - Login
*/
get_header();
?>

<main id="neo-main" class="neo-page__main" tabindex="-1">
      <div style="display:flex; justify-content:center; padding: 4rem 2rem;">
        <div class="login-box">
    <a href="/" style="display: inline-block; margin-bottom: 2rem;">
      <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo1.png" alt="Radiance Glamour Lounge" style="height: 72px; width: auto; max-width: 100%; object-fit: contain;">
    </a>
    <h1 class="neo-h3" style="margin-bottom: 0.5rem;">Welcome back</h1>
    <p class="neo-body rb-muted" style="margin-bottom: 2rem; font-size: 0.875rem;">Sign in to your account</p>
    
    <form action="index.html" method="GET" id="loginForm">
      <div class="form-group">
        <label class="form-label" for="email">Email address</label>
        <input type="email" id="email" class="form-input" placeholder="you@example.com" autocomplete="email" required>
      </div>
      </div>
    </main>

<?php get_footer(); ?>
