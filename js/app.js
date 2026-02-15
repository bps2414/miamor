/**
 * Thalita & Bryan - Main Application Logic
 */

// Utility: Debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Utility: Selector
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// ==========================================
// TYPEWRITER EFFECT
// ==========================================
const typewriter = {
    el: null,
    text: "6 meses de amor, aprendizado e muita cumplicidade...",
    speed: 50,
    init() {
        this.el = $('.typewriter-text');
        if (!this.el) return;
        this.el.innerHTML = '<span class="cursor"></span>';
        setTimeout(() => this.type(), 1000); // Start after intro
    },
    type(i = 0) {
        if (i < this.text.length) {
            const char = this.text.charAt(i);
            const cursor = this.el.querySelector('.cursor');
            this.el.insertBefore(document.createTextNode(char), cursor);
            setTimeout(() => this.type(i + 1), this.speed + Math.random() * 30);
        }
    }
};

// ==========================================
// COUNTDOWN TIMER
// ==========================================
const countdown = {
    // Start date: August 14, 2023 (Example - user can update)
    startDate: new Date('2023-08-14T00:00:00'),
    init() {
        this.update();
        setInterval(() => this.update(), 1000);
    },
    update() {
        const now = new Date();
        const diff = now - this.startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        $('#c-days').innerText = days.toString().padStart(2, '0');
        $('#c-hours').innerText = hours.toString().padStart(2, '0');
        $('#c-minutes').innerText = minutes.toString().padStart(2, '0');
        $('#c-seconds').innerText = seconds.toString().padStart(2, '0');
    }
};

// ==========================================
// LIGHTBOX
// ==========================================
const lightbox = {
    el: null,
    img: null,
    images: [],
    currentIndex: 0,
    init() {
        this.el = $('.lightbox');
        this.img = $('.lightbox__img');
        const cards = $$('.gallery-card img');

        if (!cards.length) return;

        cards.forEach((img, index) => {
            // Collect low-res sources for now, assume high-res logic is handled or same src
            this.images.push(img.src);
            img.parentElement.addEventListener('click', () => this.open(index));
        });

        $('.lightbox__close').addEventListener('click', () => this.close());
        $('.lightbox__prev').addEventListener('click', (e) => { e.stopPropagation(); this.prev(); });
        $('.lightbox__next').addEventListener('click', (e) => { e.stopPropagation(); this.next(); });
        this.el.addEventListener('click', (e) => { if (e.target === this.el) this.close(); });

        document.addEventListener('keydown', (e) => {
            if (!this.el.classList.contains('active')) return;
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
    },
    open(index) {
        this.currentIndex = index;
        this.updateImage();
        this.el.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    close() {
        this.el.classList.remove('active');
        document.body.style.overflow = '';
    },
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImage();
    },
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    },
    updateImage() {
        this.img.style.opacity = 0;
        setTimeout(() => {
            this.img.src = this.images[this.currentIndex];
            this.img.onload = () => this.img.style.opacity = 1;
        }, 200);
    }
};

// ==========================================
// CONFETTI ENGINE
// ==========================================
const confetti = {
    canvas: null,
    ctx: null,
    particles: [],
    animId: null,
    init() {
        this.canvas = $('#confetti-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
    },
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },
    burst(count, originX, originY) {
        const ox = originX || window.innerWidth / 2;
        const oy = originY || window.innerHeight / 2;
        for (let i = 0; i < count; i++) {
            this.particles.push(new this.Particle(ox, oy, this.ctx));
        }
        if (!this.animId) this.animate();
    },
    Particle: class {
        constructor(x, y, ctx) {
            this.ctx = ctx;
            this.x = x;
            this.y = y;
            this.size = Math.random() * 8 + 4;
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 15 + 2;
            this.vx = Math.cos(angle) * velocity;
            this.vy = Math.sin(angle) * velocity;
            this.gravity = 0.5;
            this.friction = 0.96;
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.01;
            this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 10;
        }
        update() {
            this.vx *= this.friction;
            this.vy *= this.friction;
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= this.decay;
            this.rotation += this.rotationSpeed;
        }
        draw() {
            this.ctx.save();
            this.ctx.translate(this.x, this.y);
            this.ctx.rotate(this.rotation * Math.PI / 180);
            this.ctx.fillStyle = this.color;
            this.ctx.globalAlpha = this.alpha;
            this.ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            this.ctx.restore();
        }
    },
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles = this.particles.filter(p => p.alpha > 0);
        this.particles.forEach(p => {
            p.update();
            p.draw();
        });
        if (this.particles.length > 0) {
            this.animId = requestAnimationFrame(() => this.animate());
        } else {
            this.animId = null;
        }
    }
};

// ==========================================
// AUDIO PLAYER
// ==========================================
const audio = {
    el: null,
    btn: null,
    progress: null,
    title: null,
    time: null,
    volume: null,
    isPlaying: false,
    init() {
        this.el = $('#song');
        this.btn = $('#audio-btn');
        this.progress = $('#audio-progress');
        this.title = $('#audio-title');
        this.time = $('#audio-time');
        this.volume = $('#audio-volume');

        if (!this.el) return;

        this.btn.addEventListener('click', () => this.toggle());

        this.el.addEventListener('timeupdate', () => {
            const pct = (this.el.currentTime / this.el.duration) * 100;
            this.progress.value = pct;
            this.progress.style.setProperty('--progress', `${pct}%`);
            this.time.innerText = this.formatTime(this.el.currentTime);
        });

        this.progress.addEventListener('input', (e) => {
            const time = (e.target.value / 100) * this.el.duration;
            this.el.currentTime = time;
        });

        this.volume.addEventListener('input', (e) => {
            this.el.volume = e.target.value;
        });

        // Set initial volume
        this.el.volume = 0.5;
    },
    toggle() {
        if (this.el.paused) {
            this.play();
        } else {
            this.pause();
        }
    },
    play() {
        this.el.play().then(() => {
            this.isPlaying = true;
            this.btn.textContent = '⏸';
            this.btn.setAttribute('aria-label', 'Pausar música');
            this.btn.classList.add('is-playing');
        }).catch(err => console.log('Audio play blocked', err));
    },
    pause() {
        this.el.pause();
        this.isPlaying = false;
        this.btn.textContent = '▶';
        this.btn.setAttribute('aria-label', 'Tocar música');
        this.btn.classList.remove('is-playing');
    },
    formatTime(s) {
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${m}:${sec.toString().padStart(2, '0')}`;
    }
};

// ==========================================
// GUESTBOOK (LocalStorage)
// ==========================================
const guestbook = {
    form: null,
    input: null,
    list: null,
    storageKey: 'tb_guestbook',
    init() {
        this.form = $('.guestbook-form');
        this.input = $('#gb-input');
        this.list = $('.guestbook-messages');

        if (!this.form) return;

        this.render();

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = this.sanitize(this.input.value.trim());
            if (!text) return;

            const msgs = this.load();
            msgs.unshift({ text, date: new Date().toLocaleString('pt-BR') });
            if (msgs.length > 50) msgs.length = 50; // limit to 50

            this.save(msgs);
            this.input.value = '';
            this.render();

            // Celebration effect
            confetti.burst(30, window.innerWidth / 2, window.innerHeight * 0.8);
        });
    },
    load() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        } catch { return []; }
    },
    save(data) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    },
    render() {
        const msgs = this.load();
        this.list.innerHTML = msgs.map(m => `
            <div class="guestbook-msg glass">
                <strong>${m.date}</strong>: ${m.text}
            </div>
        `).join('');
    },
    sanitize(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
};

// ==========================================
// THEME SWITCHER
// ==========================================
const theme = {
    btn: null,
    isDark: true,
    init() {
        this.btn = $('#theme-toggle');
        // Check saved preference
        try {
            const saved = localStorage.getItem('tb_theme');
            if (saved === 'light') {
                this.isDark = false;
                document.body.classList.add('theme-light');
                this.btn.textContent = '🌙';
            }
        } catch { }

        this.btn.addEventListener('click', () => this.toggle());
    },
    toggle() {
        this.isDark = !this.isDark;
        document.body.classList.toggle('theme-light');
        this.btn.textContent = this.isDark ? '☀️' : '🌙';
        localStorage.setItem('tb_theme', this.isDark ? 'dark' : 'light');
    }
};

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
const scrollAnim = {
    init() {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        $$('.fade-in').forEach(el => obs.observe(el));
    }
};

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================
const shortcuts = {
    init() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            const key = e.key.toLowerCase();
            if (key === 'c') confetti.burst(100);
            if (key === 'p') audio.toggle();
            if (key === 'g') $('#gallery-section').scrollIntoView({ behavior: 'smooth' });
        });
    }
};

// ==========================================
// CELEBRATE BUTTON
// ==========================================
const celebrate = {
    init() {
        const btn = $('.btn-celebrate');
        if (!btn) return;
        btn.addEventListener('click', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            confetti.burst(150, x, y);

            // Spawn floating hearts
            this.spawnHearts();
        });
    },
    spawnHearts() {
        const container = document.body;
        for (let i = 0; i < 5; i++) {
            const h = document.createElement('div');
            h.classList.add('heart-particle');
            h.textContent = '❤️';
            h.style.left = Math.random() * 100 + 'vw';
            h.style.top = '100vh';
            h.style.animationDuration = (Math.random() * 2 + 3) + 's';
            container.appendChild(h);
            setTimeout(() => h.remove(), 5000);
        }
    }
};

// ==========================================
// TOGETHER COUNTER (YEARS/MONTHS)
// ==========================================
const togetherCounter = {
    init() {
        // Example logic for "Time Together" breakdown
        const start = new Date('2023-08-14'); // Same as countdown

        const update = () => {
            const now = new Date();
            let years = now.getFullYear() - start.getFullYear();
            let months = now.getMonth() - start.getMonth();
            let days = now.getDate() - start.getDate();

            if (days < 0) {
                months--;
                // Get days in previous month
                const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                days += prevMonth.getDate();
            }
            if (months < 0) {
                years--;
                months += 12;
            }

            // We can also calculate total hours/seconds if we want roughly
            const diff = now - start;
            const totalHours = Math.floor(diff / (1000 * 60 * 60));

            const elY = $('#t-years');
            const elM = $('#t-months');
            const elD = $('#t-days');
            const elH = $('#t-hours');

            if (elY) elY.innerText = years;
            if (elM) elM.innerText = months;
            if (elD) elD.innerText = days;
            if (elH) elH.innerText = totalHours.toLocaleString();
        };

        update();
        setInterval(update, 60000); // update every minute
    }
};

// ==========================================
// LOVE CARDS ANIMATION
// ==========================================
const loveCards = {
    init() {
        const cards = $$('.love-card');
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const idx = Array.from(cards).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, idx * 100); // stagger
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(c => obs.observe(c));
    }
};

// ==========================================
// LETTER MODAL
// ==========================================
const letterModal = {
    modal: null,
    trigger: null,
    closeBtn: null,
    init() {
        this.modal = $('.letter-modal');
        this.trigger = $('.letter-trigger');
        this.closeBtn = $('.letter-modal__close');

        if (!this.modal || !this.trigger) return;

        this.trigger.addEventListener('click', () => this.open());
        this.closeBtn.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) this.close();
        });
    },
    open() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// ==========================================
// CINEMA MODE
// ==========================================
const cinemaMode = {
    overlay: null,
    isActive: false,
    timeout: null,
    init() {
        this.overlay = $('.cinema-overlay');
        if (!this.overlay) return;

        // Trigger on celebrate click (optional) or maybe random?
        // For now, let's hook it to the celebrate button as a "special" effect sometimes
        // Or exposed via API for console users
    },
    activate() {
        if (this.isActive) return;
        this.isActive = true;

        // Ensure audio plays
        if (audio.el && audio.el.paused) audio.play();

        this.overlay.classList.add('active');

        // Reset animations
        const els = this.overlay.querySelectorAll('*');
        els.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; /* trigger reflow */
            el.style.animation = '';
        });

        confetti.burst(100);

        // Auto hide
        this.timeout = setTimeout(() => this.deactivate(), 6000);

        this.overlay.addEventListener('click', () => this.deactivate(), { once: true });
    },
    deactivate() {
        this.isActive = false;
        this.overlay.classList.remove('active');
        clearTimeout(this.timeout);
    }
};

// Hook celebrate button to cinema mode roughly 20% chance?
// Or just let it be manual. Let's keep it simple for now.

// ==========================================
// GLOBAL INIT
// ==========================================
function initApp() {
    typewriter.init();
    countdown.init();
    lightbox.init();
    confetti.init();
    audio.init();
    guestbook.init();
    theme.init();
    scrollAnim.init();
    shortcuts.init();
    celebrate.init();
    togetherCounter.init();
    loveCards.init();
    letterModal.init();
    cinemaMode.init();

    // QR Generation
    if (window.APP_QR && typeof window.APP_QR.init === 'function') {
        window.APP_QR.init();
    }
}

// Export for other scripts
window.APP = {
    init: initApp,
    audio,
    confetti,
    cinemaMode
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // If not waiting for splash, init immediately.
    // But we have splash.js which will call init logic or we wait for user interaction.
    // Actually, splash usually gates the main site.
    // We'll let splash.js handle the "reveal" but we can init the logic in background.
    initApp();
});
