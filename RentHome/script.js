/**
 * RentHome – script.js
 * Handles: mobile nav toggle, sticky nav shadow, scroll reveal, active link highlight
 * Codveda Level 1 Task 1 – Basic JavaScript only, no external libraries
 */

// =============================================
// 1. MOBILE NAVIGATION TOGGLE
// =============================================
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close nav when a link is clicked (single-page smooth scroll)
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

// =============================================
// 2. STICKY NAVBAR SHADOW ON SCROLL
// =============================================
const navbar = document.getElementById('navbar');

function handleNavScroll() {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
// Run once on load in case page is already scrolled
handleNavScroll();

// =============================================
// 3. ACTIVE NAV LINK HIGHLIGHT (scroll spy)
// =============================================
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinksList = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  let currentId = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80; // account for sticky nav height
    if (window.scrollY >= sectionTop) {
      currentId = section.getAttribute('id');
    }
  });

  navLinksList.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentId}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

// =============================================
// 4. SCROLL REVEAL ANIMATION
// =============================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animation to save resources
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,      // trigger when 12% of element is visible
        rootMargin: '0px 0px -30px 0px'
      }
    );

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: just show everything for older browsers
    revealElements.forEach(el => el.classList.add('visible'));
  }
}

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}
