/* ============================================
   PRESENCIA REAL — Interactions & Animations
   ============================================ */

(function () {
  'use strict';

  // --- Reduced Motion Detection ---
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // --- Navbar Scroll Behavior ---
  const navbar = document.querySelector('.navbar');
  let ticking = false;

  function updateNavbar() {
    const scrollY = window.scrollY;

    if (scrollY > 40) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });

  // Initial state
  updateNavbar();


  // --- Mobile Menu ---
  const toggle = document.querySelector('.navbar__toggle');
  const mobileMenu = document.querySelector('.navbar__mobile');
  const mobileLinks = document.querySelectorAll('.navbar__mobile-link, .navbar__mobile-cta');
  let lastFocusedElement = null;

  function openMenu() {
    lastFocusedElement = document.activeElement;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Cerrar menú de navegación');
    mobileMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    mobileLinks[0].focus();
  }

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú de navegación');
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }

  function toggleMenu() {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  toggle.addEventListener('click', toggleMenu);

  // Close menu when clicking a link
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  // Close menu on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });

  // Close menu on resize to desktop
  const tabletBreakpoint = window.matchMedia('(min-width: 769px)');
  tabletBreakpoint.addEventListener('change', function (e) {
    if (e.matches) {
      closeMenu();
    }
  });


  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !prefersReducedMotion.matches) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // If reduced motion or no IntersectionObserver, show everything immediately
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }


  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 72;

        window.scrollTo({
          top: target.offsetTop - navHeight,
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
        });

        // Update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });


  // --- Formspree Form Submission ---
  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var form = e.target;
      var btn = form.querySelector('.form-submit-btn');
      var okEl = document.getElementById('form-success');
      var errEl = document.getElementById('form-error');
      var originalText = btn.textContent;

      btn.textContent = 'Enviando…';
      btn.disabled = true;
      okEl.hidden = true;
      errEl.hidden = true;

      var data = new FormData(form);
      // remove honeypot if present
      data.delete('phone');

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          okEl.hidden = false;
          form.reset();
        } else {
          errEl.hidden = false;
        }
      }).catch(function () {
        errEl.hidden = false;
      }).finally(function () {
        btn.textContent = originalText;
        btn.disabled = false;
      });
    });
  }


  // --- Active Nav Link on Scroll ---
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.navbar__link');

  function setNavLinkState(href) {
    navLinks.forEach(function (link) {
      if (link.getAttribute('href') === href) {
        link.style.opacity = '1';
      } else {
        link.style.opacity = '0.65';
      }
    });
  }

  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;
    let currentId = null;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        currentId = id;
      }
    });

    if (currentId) {
      setNavLinkState('#' + currentId);
    } else {
      navLinks.forEach(function (link) {
        link.style.opacity = '0.85';
      });
    }
  }

  window.addEventListener('scroll', function () {
    if (!prefersReducedMotion.matches) {
      window.requestAnimationFrame(updateActiveLink);
    }
  }, { passive: true });

})();
