/**
 * contact.js
 * General enquiry form for contact.html
 *
 * DEPENDENCIES:
 *   EmailJS CDN must be loaded before this file.
 *   emailjs.init('YOUR_PUBLIC_KEY') must be called before this file.
 *
 * EMAILJS TEMPLATE VARIABLES:
 *   {{fullName}}
 *   {{phone}}
 *   {{email}}
 *   {{subject}}
 *   {{message}}
 *
 * NOTE:
 *   Use a separate EmailJS template from the booking form.
 *   Suggested template name: ktwo_contact
 */

const ContactForm = (() => {

  // ── ELEMENT CACHE ─────────────────────────────────────────
  const el = {};

  function cacheElements() {
    el.form     = document.getElementById('ctForm');
    el.fullName = document.getElementById('fullName');
    el.phone    = document.getElementById('phone');
    el.email    = document.getElementById('email');
    el.subject  = document.getElementById('subject');
    el.message  = document.getElementById('message');
    el.submit   = document.getElementById('ctSubmit');
    el.success  = document.getElementById('ctSuccess');
    el.error    = document.getElementById('ctError');
  }


  // ── VALIDATION ────────────────────────────────────────────
  function isValidPhone(val) {
    return /^(\+27|0)[6-8][0-9]{8}$/.test(val.replace(/\s/g, ''));
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

  function validate() {
    const name    = el.fullName.value.trim();
    const phone   = el.phone.value.trim();
    const email   = el.email.value.trim();
    const subject = el.subject.value;
    const message = el.message.value.trim();

    if (name.length < 2)          return 'Please enter your full name.';
    if (!isValidPhone(phone))     return 'Please enter a valid SA number e.g. 071 234 5678.';
    if (!isValidEmail(email))     return 'Please enter a valid email address.';
    if (!subject)                 return 'Please select a subject.';
    if (message.length < 5)       return 'Please enter a message.';

    return null;
  }


  // ── UI HELPERS ────────────────────────────────────────────
  function showSuccess() {
    el.success.style.display = 'flex';
    el.error.style.display   = 'none';
    el.form.reset();
    el.submit.disabled    = false;
    el.submit.textContent = 'Send Message';
  }

  function showError() {
    el.error.style.display   = 'block';
    el.success.style.display = 'none';
    el.submit.disabled    = false;
    el.submit.textContent = 'Send Message';
  }

  function hideMessages() {
    el.success.style.display = 'none';
    el.error.style.display   = 'none';
  }

  function setSending() {
    el.submit.disabled    = true;
    el.submit.textContent = 'Sending...';
    hideMessages();
  }


  // ── SUBMIT ────────────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault();
    hideMessages();

    const validationError = validate();
    if (validationError) {
      el.error.textContent   = validationError;
      el.error.style.display = 'block';
      return;
    }

    setSending();

    emailjs.send('service_4hv70ko', 'template_pruccy7', {
      fullName: el.fullName.value.trim(),
      phone:    el.phone.value.trim(),
      email:    el.email.value.trim(),
      subject:  el.subject.value,
      message:  el.message.value.trim()
    })
    .then(() => {
      showSuccess();
    })
    .catch(err => {
      console.error('[contact.js] EmailJS error:', err);
      el.error.textContent = 'Something went wrong. Please try again or reach out directly on WhatsApp.';
      showError();
    });
  }


  // ── FAQ ACCORDION ─────────────────────────────────────────
  function initFaq() {
    const items = document.querySelectorAll('.ct-faq-item');

    items.forEach(item => {
      const question = item.querySelector('.ct-faq-question');
      const answer   = item.querySelector('.ct-faq-answer');
      if (!question || !answer) return;

      question.addEventListener('click', () => {
        const isOpen = question.getAttribute('aria-expanded') === 'true';

        // Close all
        items.forEach(other => {
          other.querySelector('.ct-faq-question')
            ?.setAttribute('aria-expanded', 'false');
          other.querySelector('.ct-faq-answer')
            ?.classList.remove('open');
        });

        // Open clicked if it was closed
        if (!isOpen) {
          question.setAttribute('aria-expanded', 'true');
          answer.classList.add('open');
        }
      });
    });
  }


  // ── T&C MODAL ─────────────────────────────────────────────
  function initTcModal() {
    const overlay = document.getElementById('tcModalOverlay');
    const openBtn = document.getElementById('openTcModal');
    const closeBtn = document.getElementById('tcModalClose');
    const agreeBtn = document.getElementById('tcModalAgree');

    if (!overlay) return;

    openBtn?.addEventListener('click', () => {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    closeBtn?.addEventListener('click', closeTc);

    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeTc();
    });

    agreeBtn?.addEventListener('click', closeTc);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        closeTc();
      }
    });

    function closeTc() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }


  // ── INIT ──────────────────────────────────────────────────
  function init() {
    cacheElements();

    if (!el.form) {
      console.warn('[contact.js] #ctForm not found.');
      return;
    }

    el.form.addEventListener('submit', handleSubmit);
    initFaq();
    initTcModal();
  }

  document.addEventListener('DOMContentLoaded', init);

})();