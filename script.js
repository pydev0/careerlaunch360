// FAQ Toggle Function
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
    if (!isActive) faqItem.classList.add('active');
}

// Contact Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            const response = await fetch('https://formspree.io/f/dummy@example.com', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(contactForm)
            });
            if (response.ok) {
                submitBtn.textContent = 'Message Sent!';
                contactForm.reset();
            } else {
                submitBtn.textContent = 'Failed. Try Again.';
                submitBtn.disabled = false;
            }
        });
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.pageYOffset > 100
        ? '0 2px 20px rgba(0,0,0,0.1)'
        : 'none';
});

// ─── Scroll Reveal ───────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    // Cards with stagger delay based on position in grid
    const cardSelectors = [
        '.service-card', '.program-card', '.country-card',
        '.process-step', '.testimonial-card', '.value-card'
    ];
    cardSelectors.forEach(selector => {
        const groups = {};
        document.querySelectorAll(selector).forEach(el => {
            const parent = el.parentElement;
            if (!groups[parent]) groups[parent] = [];
            groups[parent].push(el);
        });
        Object.values(groups).forEach(group => {
            group.forEach((el, i) => {
                el.classList.add('reveal');
                el.style.transitionDelay = `${i * 0.1}s`;
                revealObserver.observe(el);
            });
        });
    });

    // Section headers slide up
    document.querySelectorAll('.section-header, .page-hero-content').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Contact items slide in from left
    document.querySelectorAll('.contact-item').forEach((el, i) => {
        el.classList.add('reveal-left');
        el.style.transitionDelay = `${i * 0.12}s`;
        revealObserver.observe(el);
    });

    // About sections
    document.querySelectorAll('.about-section').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i * 0.1}s`;
        revealObserver.observe(el);
    });

    // FAQ items
    document.querySelectorAll('.faq-item').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i * 0.06}s`;
        revealObserver.observe(el);
    });

    // Course details
    document.querySelectorAll('.course-detail').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i * 0.12}s`;
        revealObserver.observe(el);
    });
});

// ─── Floating Orbs in Hero ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const orbs = [
        { width: 420, height: 420, top: '8%',  left: '-5%', color: 'rgba(99,102,241,0.18)',  duration: 10, x: '30px', y: '-20px' },
        { width: 320, height: 320, top: '50%', right: '-3%', color: 'rgba(14,165,233,0.15)', duration: 13, x: '-25px', y: '20px' },
        { width: 220, height: 220, top: '25%', left: '55%',  color: 'rgba(6,182,212,0.14)',  duration: 8,  x: '20px', y: '25px' },
    ];

    orbs.forEach(o => {
        const div = document.createElement('div');
        div.className = 'hero-orb';
        div.style.cssText = `
            width:${o.width}px; height:${o.height}px;
            top:${o.top || 'auto'}; left:${o.left || 'auto'}; right:${o.right || 'auto'};
            background:${o.color};
            --orb-duration:${o.duration}s; --orb-x:${o.x}; --orb-y:${o.y};
        `;
        hero.appendChild(div);
    });
});

// ─── Mobile Menu ─────────────────────────────────────────────────
function toggleMobileMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
    document.querySelector('.hamburger').classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.remove('active');
            document.querySelector('.hamburger').classList.remove('active');
        });
    });
    document.addEventListener('click', function(e) {
        if (!document.querySelector('.navbar').contains(e.target)) {
            document.querySelector('.nav-links').classList.remove('active');
            document.querySelector('.hamburger').classList.remove('active');
        }
    });
});

// ─── Stats Counter ────────────────────────────────────────────────
function animateCounter(element, target, suffix, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target.querySelector('.stat-number');
            if (el && !el.classList.contains('animated')) {
                el.classList.add('animated');
                const original = el.textContent.trim();
                const number = parseInt(original.replace(/\D/g, ''));
                const suffix = original.replace(/[0-9]/g, '');
                animateCounter(el, number, suffix);
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.stat-item').forEach(stat => statsObserver.observe(stat));
});

// ─── Init ─────────────────────────────────────────────────────────
if (typeof lucide !== 'undefined') lucide.createIcons();
