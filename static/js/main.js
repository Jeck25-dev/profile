// === CUSTOM CURSOR ===
const cursorDot    = document.getElementById('cursorDot');
const cursorCircle = document.getElementById('cursorCircle');

let mouseX = 0, mouseY = 0;
let circX = 0, circY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top  = mouseY + 'px';
    }
});

function animateCircle() {
    circX += (mouseX - circX) * 0.12;
    circY += (mouseY - circY) * 0.12;
    if (cursorCircle) {
        cursorCircle.style.left = circX + 'px';
        cursorCircle.style.top  = circY + 'px';
    }
    requestAnimationFrame(animateCircle);
}
animateCircle();

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursorCircle?.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorCircle?.classList.remove('hovered'));
});

document.addEventListener('mouseleave', () => {
    if (cursorDot)    cursorDot.style.opacity    = '0';
    if (cursorCircle) cursorCircle.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
    if (cursorDot)    cursorDot.style.opacity    = '1';
    if (cursorCircle) cursorCircle.style.opacity = '1';
});

// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 60);
});

// === MOBILE NAV ===
const burger  = document.getElementById('navBurger');
const navMenu = document.getElementById('navMenu');

burger?.addEventListener('click', () => {
    const isOpen = navMenu?.classList.toggle('open');
    // animasikan ikon burger
    const spans = burger.querySelectorAll('span');
    if (isOpen) {
        spans[0].style.transform = 'translateY(6px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '1';
        spans[2].style.transform = '';
    }
});

// Tutup menu saat link diklik
navMenu?.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const spans = burger?.querySelectorAll('span');
        if (spans) {
            spans[0].style.transform = '';
            spans[1].style.opacity   = '1';
            spans[2].style.transform = '';
        }
    });
});

// === REVEAL ON SCROLL ===
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// === AUTO DISMISS TOAST ===
document.querySelectorAll('.toast').forEach(toast => {
    setTimeout(() => {
        toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        toast.style.opacity    = '0';
        toast.style.transform  = 'translateX(20px)';
        setTimeout(() => toast.remove(), 400);
    }, 5000);
});

// === COUNTER ANIMATION untuk stat-number ===
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el      = entry.target;
            const text    = el.textContent.trim();
            const num     = parseInt(text.replace(/\D/g, ''));
            const suffix  = text.replace(/[\d]/g, '');
            if (!isNaN(num) && num > 0) {
                let start     = 0;
                const step    = num / 60;
                const timer   = setInterval(() => {
                    start += step;
                    if (start >= num) {
                        el.textContent = num + suffix;
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(start) + suffix;
                    }
                }, 20);
            }
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
