// ── SERVICES FAQ ACCORDION ───────────────────

const svFaqItems = document.querySelectorAll('.sv-faq-item');

svFaqItems.forEach(item => {
  const question = item.querySelector('.sv-faq-question');
  const answer   = item.querySelector('.sv-faq-answer');

  question.addEventListener('click', () => {
    const isOpen = question.getAttribute('aria-expanded') === 'true';

    // Close all
    svFaqItems.forEach(other => {
      other.querySelector('.sv-faq-question').setAttribute('aria-expanded', 'false');
      other.querySelector('.sv-faq-answer').classList.remove('open');
    });

    // Toggle clicked
    if (!isOpen) {
      question.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});