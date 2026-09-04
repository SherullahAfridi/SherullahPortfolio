/* Sher Ullah — Personal Website Scripts */
(function () {
  'use strict';

  /* ---------- Navbar: scrolled state + mobile toggle ---------- */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- Active nav link highlighting ---------- */
  const sections = document.querySelectorAll('section[id]');
  const linkMap = {};
  navLinks.querySelectorAll('a').forEach(a => { linkMap[a.getAttribute('href').slice(1)] = a; });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
        const link = linkMap[entry.target.id];
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => sectionObserver.observe(s));

  /* ---------- Scroll reveal ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---------- Typing effect for hero role ---------- */
  const roles = [
  'Software Engineering Student',
  'Networking & Cybersecurity Enthusiast',
  'CCNA Certified from NetAcad',
];
  const roleEl = document.getElementById('typed-role');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (roleEl && !reduceMotion) {
    let roleIndex = 0, charIndex = 0, deleting = false;
    const tick = () => {
      const full = roles[roleIndex];
      roleEl.textContent = full.slice(0, charIndex);
      let delay = deleting ? 40 : 85;
      if (!deleting && charIndex === full.length) { delay = 2000; deleting = true; }
      else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 500; }
      charIndex += deleting ? -1 : 1;
      setTimeout(tick, delay);
    };
    tick();
  }

/* ---------- CV button placeholder handling ---------- */
  if (roleEl && !reduceMotion) {
    let roleIndex = 0, charIndex = 0, deleting = false;
    const tick = () => {
      const full = roles[roleIndex];
      roleEl.textContent = full.slice(0, charIndex);
      let delay = deleting ? 40 : 85;
      if (!deleting && charIndex === full.length) { delay = 2000; deleting = true; }
      else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 500; }
      charIndex += deleting ? -1 : 1;
      setTimeout(tick, delay);
    };
    tick();
  }

})();
