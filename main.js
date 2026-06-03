/* ============================================================
   JARAMILLO LANDSCAPE — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNav();
  initMobileNav();
  initServicesDropdown();
  initAccordions();
  initGalleryFilter();
  initScrollAnimations();
  initStaggerGrids();
  initStatCounters();
  initFormRedirect();
});

/* --- Sticky Nav Shadow --- */
function initStickyNav() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- Mobile Hamburger --- */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    // Also close any open dropdown
    document.querySelectorAll('.has-dropdown.open').forEach(d => {
      d.classList.remove('open');
      const t = d.querySelector('.nav-dropdown-toggle');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }
}

/* --- Services Dropdown --- */
function initServicesDropdown() {
  const parents = document.querySelectorAll('.has-dropdown');

  parents.forEach(parent => {
    const toggle = parent.querySelector('.nav-dropdown-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = parent.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      // Close siblings
      parents.forEach(other => {
        if (other !== parent) {
          other.classList.remove('open');
          const t = other.querySelector('.nav-dropdown-toggle');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });

  document.addEventListener('click', e => {
    parents.forEach(parent => {
      if (!parent.contains(e.target)) {
        parent.classList.remove('open');
        const t = parent.querySelector('.nav-dropdown-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      parents.forEach(parent => {
        parent.classList.remove('open');
        const t = parent.querySelector('.nav-dropdown-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

/* --- Accordions --- */
function initAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item    = trigger.closest('.accordion-item');
      const content = item.querySelector('.accordion-content');
      const expanded = trigger.getAttribute('aria-expanded') === 'true';

      // Close siblings in same group
      const group = item.closest('.accordion') || item.closest('.faq-category');
      if (group) {
        group.querySelectorAll('.accordion-trigger').forEach(t => {
          if (t !== trigger) {
            t.setAttribute('aria-expanded', 'false');
            const c = t.closest('.accordion-item').querySelector('.accordion-content');
            if (c) c.classList.remove('open');
          }
        });
      }

      trigger.setAttribute('aria-expanded', String(!expanded));
      if (content) content.classList.toggle('open', !expanded);
    });
  });
}

/* --- Gallery Filter --- */
function initGalleryFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      items.forEach(item => {
        item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter);
      });
    });
  });
}

/* --- Scroll Fade-in --- */
function initScrollAnimations() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = document.querySelectorAll('[data-animate]');
  if (!els.length) return;

  if (reduced) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -50px 0px' });

  els.forEach(el => observer.observe(el));
}

/* --- Stagger Grids --- */
function initStaggerGrids() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Auto-apply data-stagger to known grid containers
  document.querySelectorAll(
    '.services-grid, .reviews-grid, .next-steps-grid, .contact-strip-grid, .process-steps'
  ).forEach(grid => grid.setAttribute('data-stagger', ''));

  const grids = document.querySelectorAll('[data-stagger]');
  if (!grids.length) return;

  if (reduced) {
    grids.forEach(g => g.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px' });

  grids.forEach(g => observer.observe(g));
}

/* --- Stat Counters --- */
function initStatCounters() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stats   = document.querySelectorAll('.stat-number');
  if (!stats.length) return;

  // Parse value + suffix from text content ("15+" → {value:15, suffix:'+'})
  function parse(el) {
    const raw = el.textContent.trim();
    const match = raw.match(/^(\d+)(.*)$/);
    if (!match) return null;
    return { value: parseInt(match[1], 10), suffix: match[2] };
  }

  if (reduced) {
    stats.forEach(el => el.classList.add('counted'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el   = entry.target;
      const data = parse(el);
      if (!data) return;
      observer.unobserve(el);
      el.classList.add('counted');
      animateCount(el, data.value, data.suffix);
    });
  }, { rootMargin: '0px 0px -40px 0px' });

  stats.forEach(el => observer.observe(el));
}

function animateCount(el, target, suffix) {
  const duration = 1600;
  const start    = performance.now();

  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* --- Mailto Form Redirect --- */
function initFormRedirect() {
  document.querySelectorAll('form[action^="mailto:"]').forEach(form => {
    form.addEventListener('submit', () => {
      setTimeout(() => { window.location.href = 'thank-you.html'; }, 900);
    });
  });
}

/* --- Lucide Icons --- */
if (typeof lucide !== 'undefined') lucide.createIcons();
