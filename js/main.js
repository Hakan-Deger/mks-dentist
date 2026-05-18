/* ── Navbar scroll shadow ─────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Mobile menu ──────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const overlay    = document.getElementById('mobileOverlay');

function openMenu() {
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}
hamburger.addEventListener('click', () =>
  hamburger.classList.contains('open') ? closeMenu() : openMenu()
);
overlay.addEventListener('click', closeMenu);
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

/* ── Count-up (setInterval) ───────────────────────── */
const countEl = document.getElementById('statsCount');
let counted   = false;

function countUp(el, target, duration) {
  const steps    = 60;
  const interval = duration / steps;
  let   step     = 0;
  const timer    = setInterval(() => {
    step++;
    const progress = step / steps;
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString('tr-TR') + (step >= steps ? '+' : '');
    if (step >= steps) clearInterval(timer);
  }, interval);
}

new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !counted) {
    counted = true;
    countUp(countEl, 3000, 1800);
  }
}, { threshold: 0.5 }).observe(countEl);

/* ── Stats cards stagger ──────────────────────────── */
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const card  = entry.target;
    const delay = parseInt(card.dataset.delay || 0, 10);
    setTimeout(() => card.classList.add('visible'), delay);
    cardObserver.unobserve(card);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.stats-card').forEach(c => cardObserver.observe(c));

/* ── Universal scroll-reveal ──────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el    = entry.target;
    const delay = parseInt(el.dataset.revDelay || 0, 10);
    setTimeout(() => el.classList.add('visible'), delay);
    revealObserver.unobserve(el);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Services photo swap ──────────────────────────── */
const serviceImg = document.getElementById('service-img');
let   swapTimer  = null;

document.querySelectorAll('.service-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    document.querySelectorAll('.service-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const src = item.dataset.img;
    if (!src || !serviceImg) return;
    clearTimeout(swapTimer);
    serviceImg.style.opacity = '0';
    swapTimer = setTimeout(() => {
      serviceImg.src = src;
      serviceImg.style.opacity = '1';
    }, 300);
  });
});

/* ── Appointment form ─────────────────────────────── */
const apptForm    = document.getElementById('apptForm');
const apptSuccess = document.getElementById('apptSuccess');
const apptFields  = ['apptName','apptEmail','apptDate','apptTime','apptPhone']
                      .map(id => document.getElementById(id));

if (apptForm) {
  apptForm.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    apptFields.forEach(f => {
      f.classList.remove('error');
      if (!f.value.trim()) { f.classList.add('error'); valid = false; }
    });
    if (!valid) return;
    apptForm.reset();
    apptSuccess.classList.add('show');
    setTimeout(() => apptSuccess.classList.remove('show'), 4000);
  });
  apptFields.forEach(f => f && f.addEventListener('input', () => f.classList.remove('error')));
}

/* ── Team slider ──────────────────────────────────── */
(function () {
  const track   = document.getElementById('teamTrack');
  const btnPrev = document.getElementById('teamPrev');
  const btnNext = document.getElementById('teamNext');
  if (!track) return;

  let current = 0;

  function getVisible() {
    const wrapW = track.parentElement.offsetWidth;
    const cardW = track.children[0] ? track.children[0].offsetWidth : wrapW / 2;
    return Math.max(1, Math.round(wrapW / (cardW + 24)));
  }

  function slide(dir) {
    const total   = track.children.length;
    const max     = Math.max(0, total - getVisible());
    current       = Math.min(Math.max(current + dir, 0), max);
    const cardW   = track.children[0] ? track.children[0].offsetWidth : 0;
    track.style.transform = `translateX(-${current * (cardW + 24)}px)`;
    btnPrev.style.opacity = current === 0    ? '0.4' : '1';
    btnNext.style.opacity = current >= max   ? '0.4' : '1';
  }

  btnNext.addEventListener('click', () => slide(1));
  btnPrev.addEventListener('click', () => slide(-1));
  btnPrev.style.opacity = '0.4';
  window.addEventListener('resize', () => slide(0), { passive: true });
})();
