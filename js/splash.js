/**
 * Thalita & Bryan - Splash Screen Logic
 */

const splash = {
    el: null,
    enterBtn: null,
    init() {
        this.el = document.querySelector('.splash');
        this.enterBtn = document.querySelector('.splash__enter');

        if (!this.el || !this.enterBtn) return;

        this.enterBtn.addEventListener('click', () => this.enter());
    },
    enter() {
        // 1. Fade out splash
        this.el.classList.add('leaving');

        // 2. Reveal site
        const wrapper = document.querySelector('.site-wrapper');
        if (wrapper) wrapper.classList.add('revealed');

        // 3. Start Audio with fade-in
        if (window.APP && window.APP.audio) {
            const audioCtx = window.APP.audio;
            // Set volume to 0 initially
            audioCtx.el.volume = 0;
            audioCtx.play(); // This sets valid isPlaying state

            // Fade in volume over 10 seconds?
            // "15s fade-in" per user request
            this.fadeInAudio(audioCtx.el, 15000);
        }

        // 4. Trigger Cinema Mode for dramatic effect? 
        // Or just let the user explore. Let's just create a nice confetti burst.
        if (window.APP && window.APP.confetti) {
            setTimeout(() => {
                window.APP.confetti.burst(100, window.innerWidth / 2, window.innerHeight / 2);
            }, 500);
        }

        // 5. Remove splash from DOM after animation
        setTimeout(() => {
            this.el.remove();
        }, 1000);
    },
    fadeInAudio(audioEl, duration) {
        let vol = 0;
        const targetVol = 0.5; // Max volume
        const interval = 200; // Step every 200ms
        const step = (targetVol / duration) * interval;

        const timer = setInterval(() => {
            if (!audioEl) { clearInterval(timer); return; }
            vol += step;
            if (vol >= targetVol) {
                vol = targetVol;
                clearInterval(timer);
            }
            audioEl.volume = vol;
        }, interval);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    splash.init();
});
