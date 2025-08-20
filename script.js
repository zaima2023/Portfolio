// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('open');
  });
  // Close menu on link click (mobile)
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Intersection Observer for reveal-on-scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Accessible, client-side contact form validation (no backend here)
/*const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = form.querySelector('.form-status');
    const data = Object.fromEntries(new FormData(form).entries());
    const errors = [];

    if (!data.name || data.name.trim().length < 2) errors.push('Please enter your name.');
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('Please enter a valid email.');
    if (!data.message || data.message.trim().length < 10) errors.push('Message should be at least 10 characters.');

    if (errors.length) {
      status.textContent = errors.join(' ');
      status.style.color = '#ffb4b4';
      return;
    }

    // Demo success (replace with your backend/API endpoint)
    status.textContent = 'Thanks! Your message has been validated locally. Connect a backend to actually send it.';
    status.style.color = '#bde3ff';
    form.reset();
  });
}*/

// Typewriter effect for hero subtitle (respect reduced motion)
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced) {
  const el = document.querySelector('.subtitle.typewriter');
  if (el) {
    const text = el.textContent.trim();
    el.textContent = '';
    let i = 0;
    const speed = 35;
    const tick = () => {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        requestAnimationFrame(() => setTimeout(tick, speed));
      } else {
        // blink
        setInterval(() => {
          el.style.borderRightColor = el.style.borderRightColor ? '' : 'transparent';
        }, 500);
      }
    };
    tick();
  }
}
