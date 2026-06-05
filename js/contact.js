// ── TERMS CHECKBOX & SUBMIT ──────────────────
/*
const termsCheck = document.getElementById('termsCheck');
const ctSubmit   = document.getElementById('ctSubmit');

termsCheck.addEventListener('change', () => {
  ctSubmit.disabled = !termsCheck.checked;
});


// ── PHONE VALIDATION ─────────────────────────

const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', () => {
  // Strip everything except digits and +
  let val = phoneInput.value.replace(/[^\d+]/g, '');
  phoneInput.value = val;
});

phoneInput.addEventListener('blur', () => {
  const val = phoneInput.value.trim();
  const valid = /^(\+27|0)[6-8][0-9]{8}$/.test(val.replace(/\s/g, ''));
  if (!valid && val.length > 0) {
    phoneInput.style.borderColor = 'rgba(255, 80, 80, 0.6)';
    phoneInput.style.background  = 'rgba(255, 80, 80, 0.04)';
  } else {
    phoneInput.style.borderColor = '';
    phoneInput.style.background  = '';
  }
});


// ── DATE VALIDATION ──────────────────────────
// Prevent past dates from being selected

const dateInput = document.getElementById('date');
const today     = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);


// ── FORM VALIDATION ──────────────────────────

const ctForm   = document.getElementById('ctForm');
const ctSuccess = document.getElementById('ctSuccess');
const ctError   = document.getElementById('ctError');

function showMessage(el) {
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 6000);
}

function validateForm() {
  const fields = ctForm.querySelectorAll('[required]');
  let valid = true;

  fields.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = 'rgba(255, 80, 80, 0.6)';
      valid = false;
    } else {
      field.style.borderColor = '';
    }
  });

  // Phone check
  const phone = phoneInput.value.trim().replace(/\s/g, '');
  const phoneValid = /^(\+27|0)[6-8][0-9]{8}$/.test(phone);
  if (!phoneValid) {
    phoneInput.style.borderColor = 'rgba(255, 80, 80, 0.6)';
    valid = false;
  }

  return valid;
}

// Clear field error on input
ctForm.querySelectorAll('input, select, textarea').forEach(field => {
  field.addEventListener('input', () => {
    field.style.borderColor = '';
    field.style.background  = '';
  });
});


// ── EMAILJS SUBMISSION ───────────────────────

ctForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  ctSubmit.textContent    = 'Sending...';
  ctSubmit.disabled       = true;

  // EmailJS — replace with your actual IDs
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    fullName : document.getElementById('fullName').value,
    phone    : document.getElementById('phone').value,
    email    : document.getElementById('email').value,
    service  : document.getElementById('service').value,
    package  : document.getElementById('package').value,
    date     : document.getElementById('date').value,
    location : document.getElementById('location').value,
    notes    : document.getElementById('notes').value,
  })
  .then(() => {
    ctForm.reset();
    termsCheck.checked  = false;
    ctSubmit.disabled   = true;
    ctSubmit.textContent = 'Send Booking Request';
    showMessage(ctSuccess);
  })
  .catch(() => {
    ctSubmit.textContent = 'Send Booking Request';
    ctSubmit.disabled   = false;
    showMessage(ctError);
  });
});

// ── TERMS & CONDITIONS MODAL ─────────────────

const tcModalOverlay = document.getElementById('tcModalOverlay');
const openTcModal    = document.getElementById('openTcModal');
const tcModalClose   = document.getElementById('tcModalClose');
const tcModalAgree   = document.getElementById('tcModalAgree');

// Open modal
openTcModal.addEventListener('click', () => {
  tcModalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
});

// Close via X button
tcModalClose.addEventListener('click', () => {
  tcModalOverlay.classList.remove('open');
  document.body.style.overflow = '';
});

// Close via overlay click
tcModalOverlay.addEventListener('click', (e) => {
  if (e.target === tcModalOverlay) {
    tcModalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Close via Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && tcModalOverlay.classList.contains('open')) {
    tcModalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// I Understand — tick checkbox and close
tcModalAgree.addEventListener('click', () => {
  termsCheck.checked  = true;
  ctSubmit.disabled   = false;
  tcModalOverlay.classList.remove('open');
  document.body.style.overflow = '';
});*/