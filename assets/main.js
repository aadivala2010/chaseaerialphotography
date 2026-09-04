/* Chase Property Media — no dependencies */
(() => {
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  $('#yr').textContent = new Date().getFullYear();

  /* ── scroll reveal ─────────────────────────────── */
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  $$('.reveal').forEach(el => io.observe(el));

  /* ── nav: blur when scrolled, hide on scroll down ─ */
  const nav  = $('#nav');
  const dock = $('#dock');
  const hero = $('.hero');
  const heroImg = $('.hero__media img');
  let last = 0, ticking = false, menuOpen = false;

  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-stuck', y > 24);
    nav.classList.toggle('is-hidden', y > 420 && y > last && !menuOpen);
    dock.classList.toggle('is-up', y > hero.offsetHeight * 0.55);

    // hero parallax — transform only, never layout
    if (!calm && y < hero.offsetHeight) {
      heroImg.style.transform = `scale(1.06) translate3d(0, ${y * 0.16}px, 0)`;
    }
    last = y;
    ticking = false;
  };
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(onScroll);
  }, { passive: true });
  onScroll();

  /* ── mobile menu ───────────────────────────────── */
  const burger = $('#burger');
  const menu   = $('#menu');

  $$('.menu__links a span').forEach((s, i) => s.style.setProperty('--i', i));

  const setMenu = (open) => {
    menuOpen = open;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add('is-open'));
    } else {
      menu.classList.remove('is-open');
      setTimeout(() => { if (!menuOpen) menu.hidden = true; }, calm ? 0 : 400);
    }
  };

  burger.addEventListener('click', () => setMenu(!menuOpen));
  $$('.menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  /* ── lightbox ──────────────────────────────────── */
  const shots = $$('.shot');
  const lb    = $('#lb');
  const lbImg = $('#lbImg');
  let idx = 0;

  const show = (i) => {
    idx = (i + shots.length) % shots.length;
    const fig = shots[idx];
    lbImg.src = fig.dataset.full;
    lbImg.alt = $('img', fig).alt;
  };

  const openLb = (i) => {
    show(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => lb.classList.add('is-open'));
    $('#lbClose').focus();
  };

  const closeLb = () => {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => { lb.hidden = true; }, calm ? 0 : 350);
  };

  shots.forEach((fig, i) => {
    fig.tabIndex = 0;
    fig.setAttribute('role', 'button');
    fig.setAttribute('aria-label', `Enlarge: ${$('figcaption', fig).textContent}`);
    fig.addEventListener('click', () => openLb(i));
    fig.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(i); }
    });
  });

  $('#lbClose').addEventListener('click', closeLb);
  $('#lbPrev').addEventListener('click', () => show(idx - 1));
  $('#lbNext').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });

  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { if (!lb.hidden) closeLb(); if (menuOpen) setMenu(false); }
    if (lb.hidden) return;
    if (e.key === 'ArrowLeft')  show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  // swipe the lightbox on touch
  let x0 = null;
  lb.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 55) show(idx + (dx < 0 ? 1 : -1));
    x0 = null;
  }, { passive: true });

  /* ── contact form ──────────────────────────────── */
  const form   = $('#form');
  const status = $('#status');
  // ponytail: falls back to mailto until a real Formspree id is pasted into the action.
  const MAILTO = 'hello@chasepropertymedia.com';

  form.addEventListener('submit', async (e) => {
    if (form.action.includes('YOUR_FORM_ID')) {
      e.preventDefault();
      const d = new FormData(form);
      location.href = `mailto:${MAILTO}?subject=${encodeURIComponent('Shoot request — ' + d.get('name'))}`
        + `&body=${encodeURIComponent(`${d.get('message')}\n\nReach me at: ${d.get('contact')}`)}`;
      status.className = 'form__status';
      status.textContent = 'Opening your email app…';
      return;
    }

    e.preventDefault();
    const btn = $('button[type=submit]', form);
    btn.disabled = true;
    status.className = 'form__status';
    status.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      status.textContent = 'Got it — I’ll reply today.';
    } catch {
      status.className = 'form__status err';
      status.textContent = `Didn’t send. Email me directly at ${MAILTO}.`;
    } finally {
      btn.disabled = false;
    }
  });
})();
