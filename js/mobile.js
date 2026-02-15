/**
 * Thalita & Bryan - Mobile Enhancements
 */

const MOBILE_ENHANCEMENTS = {
    init() {
        if (this.isMobile()) {
            document.body.classList.add('is-mobile');
            this.fixVH();
            this.touchPolish();
            this.starfield();
        }

        // Listen for orientation change
        window.addEventListener('resize', () => {
            if (this.isMobile()) this.fixVH();
        });
    },
    isMobile() {
        return window.innerWidth <= 768;
    },
    fixVH() {
        // Fix for 100vh on mobile browsers (address bar issue)
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    },
    touchPolish() {
        // Add active states for touch elements
        const touchables = document.querySelectorAll('.btn-celebrate, .gallery-card, .love-card');
        touchables.forEach(el => {
            el.addEventListener('touchstart', () => el.style.transform = 'scale(0.96)', { passive: true });
            el.addEventListener('touchend', () => el.style.transform = '', { passive: true });
        });
    },
    starfield() {
        // Dynamic starfield background for mobile
        const canvas = document.createElement('canvas');
        canvas.id = 'starfield-canvas';
        document.body.prepend(canvas);

        const ctx = canvas.getContext('2d');
        let width, height, stars = [];

        const initStars = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            stars = [];
            const count = 50; // fewer stars for mobile performance
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 1.5,
                    blinkSpeed: Math.random() * 0.05
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#fff';
            stars.forEach(star => {
                ctx.globalAlpha = 0.3 + Math.abs(Math.sin(Date.now() * 0.001 * star.blinkSpeed));
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(draw);
        };

        initStars();
        draw();
        window.addEventListener('resize', initStars);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    MOBILE_ENHANCEMENTS.init();
});
