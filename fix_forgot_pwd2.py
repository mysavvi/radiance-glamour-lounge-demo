import re

with open("production_site/forgot-password.html", "r") as f:
    content = f.read()

new_form = """<h1 class="login-card__title">Reset Password</h1>
            <p class="login-card__subtitle">Enter your email and we'll send you a link to reset your password.</p>
          </div>

          <form id="forgotPasswordForm" onsubmit="event.preventDefault(); document.getElementById('resetSuccessMessage').style.display='block'; this.style.display='none';">
            <div class="form-group">
              <label class="form-label" for="email">Email address</label>
              <input type="email" id="email" class="form-input" placeholder="you@example.com" autocomplete="email" required>
            </div>
            <button type="submit" class="neo-btn neo-btn--primary" style="width: 100%; justify-content: center; min-height: 48px; font-size: var(--neo-text-base);">Send Reset Link</button>
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
    r'<h1 class="login-card__title">Welcome back</h1>.*?<div class="login-card__footer">.*?</div>',
    new_form,
    content,
    flags=re.DOTALL
)

with open("production_site/forgot-password.html", "w") as f:
    f.write(content)

