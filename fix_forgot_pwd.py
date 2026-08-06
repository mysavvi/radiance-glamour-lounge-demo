import re

with open("production_site/forgot-password.html", "r") as f:
    content = f.read()

# Change title
content = content.replace("<title>Sign In | Radiance Glamour Lounge, Stockport</title>", "<title>Forgot Password | Radiance Glamour Lounge, Stockport</title>")
content = content.replace("Sign In - Radiance Glamour Lounge", "Forgot Password - Radiance Glamour Lounge")
content = content.replace("Sign in to your Radiance Glamour Lounge account", "Reset your Radiance Glamour Lounge password")

# Replace header/form area
old_form = r"""<h1 class="login-card__title">Sign In</h1>
            <p class="login-card__subtitle">Welcome back. Please enter your details.</p>

            <form class="login-form" id="loginForm">
              <div class="login-form__group">
                <label for="email" class="login-form__label">Email</label>
                <input type="email" id="email" name="email" class="login-form__input" placeholder="Enter your email" required>
              </div>
              
              <div class="login-form__group">
                <label for="password" class="login-form__label">Password</label>
                <div class="login-form__input-wrapper">
                  <input type="password" id="password" name="password" class="login-form__input" placeholder="Enter your password" required>
                  <button type="button" class="login-form__toggle-pw" aria-label="Show password" onclick="togglePasswordVisibility('password', this)">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </button>
                </div>
              </div>

              <div class="login-form__actions">
                <button type="submit" class="neo-btn neo-btn--primary login-form__submit" id="loginSubmitBtn">Sign in</button>
              </div>
            </form>

            <div class="login-card__footer">
              <p>
                <a href="#" class="login-card__link">Forgot password?</a> &middot; <a href="register.html" class="login-card__link" id="createAccountLink">Create account</a>
              </p>
            </div>"""

new_form = """<h1 class="login-card__title">Reset Password</h1>
            <p class="login-card__subtitle">Enter your email and we'll send you a link to reset your password.</p>

            <form class="login-form" id="forgotPasswordForm" onsubmit="event.preventDefault(); document.getElementById('resetSuccessMessage').style.display='block'; this.style.display='none';">
              <div class="login-form__group">
                <label for="email" class="login-form__label">Email</label>
                <input type="email" id="email" name="email" class="login-form__input" placeholder="Enter your email" required>
              </div>

              <div class="login-form__actions">
                <button type="submit" class="neo-btn neo-btn--primary login-form__submit">Send Reset Link</button>
              </div>
            </form>
            
            <div id="resetSuccessMessage" style="display: none; background: rgba(var(--neo-accent-rgb), 0.1); border-left: 4px solid var(--neo-accent); padding: 1.5rem; border-radius: var(--neo-radius); margin-bottom: 2rem;">
              <h3 style="font-family: var(--neo-font-heading); font-size: 1.125rem; font-weight: 500; margin-bottom: 0.5rem; color: var(--neo-text-primary);">Check your inbox</h3>
              <p style="font-size: 0.875rem; color: var(--neo-text-secondary); line-height: 1.5;">If an account exists with that email, we've sent instructions on how to reset your password.</p>
            </div>

            <div class="login-card__footer">
              <p>
                Remembered your password? <a href="login.html" class="login-card__link">Sign in here</a>
              </p>
            </div>"""

# Ensure exact match by using a regex replacement with appropriate flags
content = re.sub(
    r'<h1 class="login-card__title">Sign In</h1>.*?<div class="login-card__footer">.*?</div>',
    new_form,
    content,
    flags=re.DOTALL
)

with open("production_site/forgot-password.html", "w") as f:
    f.write(content)

