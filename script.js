// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const toggle = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

// Staggered scroll reveal
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach((el, i) => {
  // Auto-stagger siblings
  const parent = el.parentElement;
  const siblings = Array.from(parent.querySelectorAll('.reveal'));
  const index = siblings.indexOf(el);
  if (index > 0 && !el.dataset.delay) {
    el.dataset.delay = index * 100;
  }
  revealObserver.observe(el);
});

// Count-up animation for stat numbers
function animateCount(el) {
  if (el.dataset.custom) {
    el.textContent = el.dataset.custom;
    return;
  }
  const num = parseInt(el.dataset.target) || 0;
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(num * eased);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = num + suffix;
  }
  requestAnimationFrame(tick);
}

const statEls = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statEls.forEach(el => statObserver.observe(el));

// Hero tagline typing effect
const tagline = document.querySelector('.hero-tagline');
if (tagline) {
  const text = tagline.textContent;
  tagline.textContent = '';
  tagline.style.borderRight = '2px solid rgba(212,168,83,0.8)';
  let i = 0;
  
  setTimeout(() => {
    function type() {
      if (i < text.length) {
        tagline.textContent += text.charAt(i);
        i++;
        setTimeout(type, 35 + Math.random() * 25);
      } else {
        // Remove cursor after typing
        setTimeout(() => { tagline.style.borderRight = 'none'; }, 1500);
      }
    }
    type();
  }, 800);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
