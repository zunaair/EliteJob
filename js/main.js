// js/main.js — Global interactions: theme, toast, nav, scroll

document.addEventListener('DOMContentLoaded', () => {

  // ── Theme ─────────────────────────────────────────────────────
  const root        = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme  = localStorage.getItem('theme') || 'dark';

  root.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next    = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.innerHTML = theme === 'dark'
      ? '<i data-lucide="sun"></i>'
      : '<i data-lucide="moon"></i>';
    if (window.lucide) lucide.createIcons({ el: themeToggle });
  }

  // ── Lucide Icons ───────────────────────────────────────────────
  if (window.lucide) lucide.createIcons();

  // ── Toast Notification ─────────────────────────────────────────
  window.showToast = function (message, iconName = 'check-circle') {
    let toast = document.getElementById('globalToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'globalToast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i data-lucide="${iconName}"></i><span>${message}</span>`;
    if (window.lucide) lucide.createIcons({ el: toast });
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove('show'), 3200);
  };

  // ── Active Nav Link ────────────────────────────────────────────
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href      = link.getAttribute('href') || '';
    const cleanHref = href.split('/').pop().replace('.html', '') || 'index';
    const cleanPath = currentPath.split('/').pop().replace('.html', '') || 'index';
    if (cleanPath === cleanHref) link.classList.add('active');
    else link.classList.remove('active');
  });

  // ── Mobile Menu ────────────────────────────────────────────────
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navLinks     = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen
        ? '<i data-lucide="x"></i>'
        : '<i data-lucide="menu"></i>';
      if (window.lucide) lucide.createIcons({ el: mobileToggle });
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
        if (window.lucide) lucide.createIcons({ el: mobileToggle });
      });
    });
  }

  // ── Smooth Scrolling ───────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Scroll Reveal ──────────────────────────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.card:not(.animate-fade), .section-header').forEach(el => {
    observer.observe(el);
  });

  // ── Generic Button Handlers ────────────────────────────────────
  document.addEventListener('click', e => {
    const btn = e.target.closest('button.btn, a.btn');
    if (!btn) return;
    const text = btn.textContent.trim();

    if (btn.id === 'themeToggle') return;

    if (text === 'Apply Now') {
      showToast('Application sent to recruiters!', 'send');
      return;
    }
    if (text === 'Post a Job') {
      showToast('Opening employer hub…', 'external-link');
      return;
    }
    const prepActions = ['Start Learning', 'View Notes', 'Practice Now', 'Explore'];
    if (prepActions.includes(text)) {
      showToast(`Opening ${text.split(' ').pop()} resources…`, 'book-open');
    }
  });

});
