// ── HERO SLIDESHOW ───────────────────────────

const slides = document.querySelectorAll('.hero-slide');
let current = 0;

function nextSlide() {
  const prev = current;
  current = (current + 1) % slides.length;

  slides[prev].classList.remove('active');
  slides[prev].classList.add('exit');

  slides[current].classList.add('active');

  // Clean up exit class after transition completes
  setTimeout(() => {
    slides[prev].classList.remove('exit');
  }, 800);
}

// Change slide every 5 seconds
setInterval(nextSlide, 5000);

// ── STATS COUNTER ────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

// Trigger when hero is in view
const statNumbers = document.querySelectorAll('.hero-stat-number');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statNumbers.forEach(el => animateCounter(el));
      observer.disconnect();
    }
  });
}, { threshold: 0.3 });

const heroSection = document.querySelector('.hero');
if (heroSection) observer.observe(heroSection);