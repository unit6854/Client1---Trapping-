// ===========================
// KEVIN'S SEALING & COATING
// Main JavaScript
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  // ===========================
  // NAV SCROLL
  // ===========================
  const nav = document.getElementById('nav');
  const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // ===========================
  // MOBILE MENU
  // ===========================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  let open = false;
  hamburger.addEventListener('click', () => {
    open = !open;
    hamburger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  document.querySelectorAll('.mm-link').forEach(l => {
    l.addEventListener('click', () => {
      open = false;
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ===========================
  // HERO IMAGE LOAD
  // ===========================
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    if (heroImg.complete) {
      heroImg.classList.add('loaded');
    } else {
      heroImg.addEventListener('load', () => heroImg.classList.add('loaded'));
    }
  }

  // ===========================
  // HERO TITLE LINES
  // ===========================
  const titleLines = document.querySelectorAll('.title-line');
  titleLines.forEach((line, i) => {
    setTimeout(() => line.classList.add('visible'), 200 + i * 130);
  });

  // ===========================
  // REVEAL ON SCROLL
  // ===========================
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObs.observe(el));

  // ===========================
  // SERVICE CARD STAGGER
  // ===========================
  document.querySelectorAll('.service-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.06}s`;
  });

  // ===========================
  // COUNTER ANIMATION
  // ===========================
  const counters = document.querySelectorAll('.stat-num');
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      countObs.unobserve(e.target);
      const target = parseInt(e.target.dataset.target, 10);
      const dur = 1600;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        e.target.textContent = Math.round(ease * target);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  counters.forEach(c => countObs.observe(c));

  // ===========================
  // HERO PARALLAX
  // ===========================
  if (window.matchMedia('(pointer: fine)').matches) {
    const heroImgEl = document.querySelector('.hero-img');
    if (heroImgEl) {
      window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          heroImgEl.style.transform = `scale(1) translateY(${y * 0.25}px)`;
        }
      }, { passive: true });
    }
  }

  // ===========================
  // CONTACT FORM
  // ===========================
  const form = document.getElementById('contactForm');
  const successEl = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.btn-primary');
      const btnText = btn.querySelector('.btn-text');
      const orig = btnText.textContent;
      btnText.textContent = 'Sending…';
      btn.disabled = true;
      btn.style.opacity = '0.7';
      // Swap with real form service (Formspree / Netlify Forms)
      setTimeout(() => {
        btn.style.display = 'none';
        successEl.classList.add('show');
        form.reset();
        setTimeout(() => {
          btn.style.display = '';
          btn.style.opacity = '';
          btn.disabled = false;
          btnText.textContent = orig;
          successEl.classList.remove('show');
        }, 5000);
      }, 1200);
    });
  }

});
