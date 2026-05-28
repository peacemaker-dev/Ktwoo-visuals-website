// ── ABOUT PAGE STATS COUNTER ─────────────────

function animateAboutCounter(el) {
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

const aboutStatNumbers = document.querySelectorAll('.ab-stat-number');

const aboutStatsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      aboutStatNumbers.forEach(el => animateAboutCounter(el));
      aboutStatsObserver.disconnect();
    }
  });
}, { threshold: 0.4 });

const abStatsSection = document.querySelector('.ab-stats');
if (abStatsSection) aboutStatsObserver.observe(abStatsSection);