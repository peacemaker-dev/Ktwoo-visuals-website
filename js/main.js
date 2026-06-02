// ── NAVBAR ──────────────────────────────────

const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

// Scroll — toggle .scrolled class
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── FAQ ACCORDION (global) ────────────────────
document.addEventListener('DOMContentLoaded', function () {
  const faqItems = document.querySelectorAll('.ct-faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.ct-faq-question');
    const answer   = item.querySelector('.ct-faq-answer');

    question.addEventListener('click', function () {
      const isOpen = question.getAttribute('aria-expanded') === 'true';

      faqItems.forEach(function (other) {
        other.querySelector('.ct-faq-question').setAttribute('aria-expanded', 'false');
        other.querySelector('.ct-faq-answer').classList.remove('open');
      });

      if (!isOpen) {
        question.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });
});

//Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();