/**
 * booking.js
 * Multi-step booking form for booking.html
 *
 * LOAD ORDER (booking.html):
 *   1. booked-dates.js   → bookedDates
 *   2. calendar.js       → CalendarRenderer
 *   3. packages-data.js  → packagesData
 *   4. this file
 */

const Booking = (() => {

  // ── CONSTANTS ────────────────────────────────────────────
  const TOTAL_STEPS = 5;

  const SERVICES = [
    {
      key:  'matric-dance',
      name: 'Matric Dance',
      type: 'Photography & Videography',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
               fill="currentColor" viewBox="0 0 16 16">
               <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13
                 a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5
                 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0
                 0 1 .5-.5h13z"/>
               <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
             </svg>`
    },
    {
      key:  'graduation',
      name: 'Graduation Shoot',
      type: 'Photography & Videography',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
               fill="currentColor" viewBox="0 0 16 16">
               <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0
                 0 .906L8 9.956l7.711-3.503a.5.5 0 0 0 0-.906l-7.5-3.5z"/>
               <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0
                 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0
                 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.5l-3.824-1.468z"/>
             </svg>`
    },
    {
      key:  'photoshoot',
      name: 'Photoshoot',
      type: 'Creative Direction',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
               fill="currentColor" viewBox="0 0 16 16">
               <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1
                 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827
                 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828
                 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2
                 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0
                 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0
                 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
               <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5
                 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
             </svg>`
    },
    {
      key:  'kids-shoot',
      name: "Kid's Shoot",
      type: 'Fun & Creative',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
               fill="currentColor" viewBox="0 0 16 16">
               <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM4.5 7.5a.5.5 0 0
                 1 0-1h7a.5.5 0 0 1 0 1h-7zM6 9.5a.5.5 0 0 1 .5-.5h3a.5.5 0
                 0 1 0 1h-3a.5.5 0 0 1-.5-.5z"/>
             </svg>`
    },
    {
      key:  'music-videos',
      name: 'Music Videos',
      type: 'Full Production',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
               fill="currentColor" viewBox="0 0 16 16">
               <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104
                 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5
                 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
               <path fill-rule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
               <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3
                 L5 4V2.905z"/>
             </svg>`
    },
    {
      key:  'promo-videos',
      name: 'Promo Videos',
      type: 'Brand & Promotion',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
               fill="currentColor" viewBox="0 0 16 16">
               <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1
                 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2
                 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15
                 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2
                 3h-2v2h2v-2z"/>
             </svg>`
    },
    {
      key:  'freelancing',
      name: 'Freelancing',
      type: 'Weddings & Events',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
               fill="currentColor" viewBox="0 0 16 16">
               <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0
                 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0
                 0 0 1.659.753z"/>
             </svg>`
    }
  ];

  const COVERAGE_LABELS = {
    pv: 'Photo & Video',
    po: 'Photo Only',
    vo: 'Video Only'
  };

  const TIER_LABELS = {
    premium:  'Premium',
    standard: 'Standard',
    basic:    'Basic'
  };


  // ── STATE ─────────────────────────────────────────────────
  const state = {
    currentStep: 1,
    service:     null,
    coverage:    null,
    tier:        null,
    eventType:   null,
    fullName:    '',
    phone:       '',
    email:       '',
    date:        '',
    location:    '',
    notes:       ''
  };


  // ── ELEMENT CACHE ─────────────────────────────────────────
  const el = {};

  function cacheElements() {
    el.progress     = document.getElementById('bkProgress');
    el.card         = document.getElementById('bkCard');
    el.btnBack      = document.getElementById('bkBtnBack');
    el.btnNext      = document.getElementById('bkBtnNext');
    el.submit       = document.getElementById('bkSubmit');
    el.errorMsg     = document.getElementById('bkErrorMsg');
    el.success      = document.getElementById('bkSuccess');
    el.formSection  = document.getElementById('bk-form');

    el.steps = [];
    for (let i = 1; i <= TOTAL_STEPS; i++) {
      el.steps[i] = document.getElementById(`bk-step-${i}`);
    }

    // Step 1
    el.serviceGrid   = document.getElementById('bkServiceGrid');

    // Step 2
    el.coverageBlock = document.getElementById('bkCoverageBlock');
    el.tierBlock     = document.getElementById('bkTierBlock');
    el.ratesBlock    = document.getElementById('bkRatesBlock');
    el.coverageGrid  = document.getElementById('bkCoverageGrid');
    el.tierGrid      = document.getElementById('bkTierGrid');
    el.ratesGrid     = document.getElementById('bkRatesGrid');

    // Step 3
    el.fullName      = document.getElementById('bkFullName');
    el.phone         = document.getElementById('bkPhone');
    el.email         = document.getElementById('bkEmail');

    // Step 4
    el.dateInput     = document.getElementById('bkDate');
    el.location      = document.getElementById('bkLocation');
    el.notes         = document.getElementById('bkNotes');

    // Step 5
    el.sumService    = document.getElementById('bkSumService');
    el.sumCoverage   = document.getElementById('bkSumCoverage');
    el.sumPackage    = document.getElementById('bkSumPackage');
    el.sumName       = document.getElementById('bkSumName');
    el.sumPhone      = document.getElementById('bkSumPhone');
    el.sumEmail      = document.getElementById('bkSumEmail');
    el.sumDate       = document.getElementById('bkSumDate');
    el.sumLocation   = document.getElementById('bkSumLocation');
    el.sumNotes      = document.getElementById('bkSumNotes');
    el.sumNotesRow   = document.getElementById('bkSumNotesRow');
    el.termsCheck    = document.getElementById('bkTermsCheck');
    el.successSum    = document.getElementById('bkSuccessSummary');

    // T&C modal
    el.tcOverlay     = document.getElementById('tcModalOverlay');
    el.tcClose       = document.getElementById('tcModalClose');
    el.tcAgree       = document.getElementById('tcModalAgree');
    el.bkOpenTc      = document.getElementById('bkOpenTcModal');
  }


  // ── URL PARAMS ────────────────────────────────────────────
  function readUrlParams() {
    const params   = new URLSearchParams(window.location.search);
    const service  = params.get('service');
    const pkg      = params.get('package');
    const coverage = params.get('coverage');

    if (service && SERVICES.find(s => s.key === service)) {
      state.service = service;
    }
    if (pkg && TIER_LABELS[pkg]) {
      state.tier = pkg;
    }
    if (coverage) {
      const map = {
        'photo-video': 'pv',
        'photo-only':  'po',
        'video-only':  'vo'
      };
      state.coverage = map[coverage] || null;
    }
  }


  // ── PROGRESS STRIP ────────────────────────────────────────
  function updateProgress(step) {
    const dots  = el.progress.querySelectorAll('.bk-progress-step');
    const lines = el.progress.querySelectorAll('.bk-progress-line');

    dots.forEach((dot, i) => {
      const s = i + 1;
      dot.classList.remove('active', 'completed');
      if (s < step)  dot.classList.add('completed');
      if (s === step) dot.classList.add('active');
    });

    lines.forEach((line, i) => {
      line.classList.toggle('completed', i + 1 < step);
    });
  }


  // ── STEP VISIBILITY ───────────────────────────────────────
  function showStep(step) {
    for (let i = 1; i <= TOTAL_STEPS; i++) {
      el.steps[i]?.classList.remove('active');
    }
    el.steps[step]?.classList.add('active');
    updateProgress(step);
    updateNav(step);
    el.formSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }


  // ── NAV BUTTONS ───────────────────────────────────────────
  function updateNav(step) {
    el.btnBack.disabled = step === 1;

    if (step === TOTAL_STEPS) {
      el.btnNext.style.display = 'none';
    } else {
      el.btnNext.style.display = 'inline-flex';
      el.btnNext.disabled = !canProceed(step);
    }
  }

  function canProceed(step) {
    switch (step) {
      case 1: return !!state.service;
      case 2: return canProceedStep2();
      case 3:
        return (
          state.fullName.trim().length > 1 &&
          isValidPhone(state.phone) &&
          isValidEmail(state.email)
        );
      case 4:
        return !!state.date && state.location.trim().length > 1;
      default:
        return true;
    }
  }

  function canProceedStep2() {
    if (!state.service) return false;
    const data = typeof packagesData !== 'undefined'
      ? packagesData[state.service]
      : null;
    if (!data) return false;
    if (data.type === 'rates')  return !!state.eventType;
    if (data.type === 'dual')   return !!state.coverage && !!state.tier;
    if (data.type === 'single') return !!state.tier;
    return false;
  }


  // ── STEP 1 — SERVICE GRID ─────────────────────────────────
  function buildServiceGrid() {
    if (!el.serviceGrid) return;

    el.serviceGrid.innerHTML = SERVICES.map(svc => `
      <div
        class="bk-service-card ${state.service === svc.key ? 'selected' : ''}"
        data-service="${svc.key}"
        role="button"
        tabindex="0"
        aria-pressed="${state.service === svc.key}"
      >
        <div class="bk-service-icon">${svc.icon}</div>
        <div class="bk-service-card-text">
          <span class="bk-service-name">${svc.name}</span>
          <span class="bk-service-type">${svc.type}</span>
        </div>
      </div>
    `).join('');

    el.serviceGrid.querySelectorAll('.bk-service-card').forEach(card => {
      card.addEventListener('click', () => selectService(card.dataset.service));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectService(card.dataset.service);
        }
      });
    });
  }

  function selectService(key) {
    state.service   = key;
    state.coverage  = null;
    state.tier      = null;
    state.eventType = null;

    el.serviceGrid.querySelectorAll('.bk-service-card').forEach(card => {
      const selected = card.dataset.service === key;
      card.classList.toggle('selected', selected);
      card.setAttribute('aria-pressed', selected);
    });

    el.btnNext.disabled = false;
  }


  // ── STEP 2 — PACKAGE BUILDER ──────────────────────────────
  function buildPackageStep() {
    const data = typeof packagesData !== 'undefined'
      ? packagesData[state.service]
      : null;

    if (!data) {
      console.warn('[booking.js] No package data for:', state.service);
      return;
    }

    el.coverageBlock.style.display = 'none';
    el.tierBlock.style.display     = 'none';
    el.ratesBlock.style.display    = 'none';

    if (data.type === 'dual') {
      buildCoverageOptions();
      buildTierOptions();
      el.coverageBlock.style.display = 'flex';
      el.tierBlock.style.display     = 'flex';
    }

    if (data.type === 'single') {
      buildTierOptions();
      el.tierBlock.style.display = 'flex';
    }

    if (data.type === 'rates') {
      buildRatesOptions(data);
      el.ratesBlock.style.display = 'flex';
    }

    el.btnNext.disabled = !canProceedStep2();
  }

  function buildCoverageOptions() {
    const coverages = [
      { key: 'pv', label: 'Photo & Video' },
      { key: 'po', label: 'Photo Only'    },
      { key: 'vo', label: 'Video Only'    }
    ];

    el.coverageGrid.innerHTML = coverages.map(c => `
      <button class="bk-option-btn ${state.coverage === c.key ? 'selected' : ''}"
        data-coverage="${c.key}">${c.label}</button>
    `).join('');

    el.coverageGrid.querySelectorAll('.bk-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.coverage = btn.dataset.coverage;
        el.coverageGrid.querySelectorAll('.bk-option-btn')
          .forEach(b => b.classList.toggle('selected', b === btn));
        el.btnNext.disabled = !canProceedStep2();
      });
    });
  }

  function buildTierOptions() {
    const tiers = [
      { key: 'premium',  label: 'Premium'  },
      { key: 'standard', label: 'Standard' },
      { key: 'basic',    label: 'Basic'    }
    ];

    el.tierGrid.innerHTML = tiers.map(t => `
      <button class="bk-option-btn ${state.tier === t.key ? 'selected' : ''}"
        data-tier="${t.key}">${t.label}</button>
    `).join('');

    el.tierGrid.querySelectorAll('.bk-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.tier = btn.dataset.tier;
        el.tierGrid.querySelectorAll('.bk-option-btn')
          .forEach(b => b.classList.toggle('selected', b === btn));
        el.btnNext.disabled = !canProceedStep2();
      });
    });
  }

  function buildRatesOptions(data) {
    if (!data.rates || !data.rates.length) return;

    el.ratesGrid.innerHTML = data.rates.map(r => `
      <button class="bk-option-btn ${state.eventType === r.service ? 'selected' : ''}"
        data-rate="${r.service}">
        ${r.service}
        <span style="opacity:0.5;font-size:10px;margin-left:8px;">${r.rate}</span>
      </button>
    `).join('');

    el.ratesGrid.querySelectorAll('.bk-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.eventType = btn.dataset.rate;
        el.ratesGrid.querySelectorAll('.bk-option-btn')
          .forEach(b => b.classList.toggle('selected', b === btn));
        el.btnNext.disabled = !canProceedStep2();
      });
    });
  }


  // ── STEP 3 — VALIDATION ───────────────────────────────────
  function isValidPhone(val) {
    return /^(\+27|0)[6-8][0-9]{8}$/.test(val.replace(/\s/g, ''));
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

  function bindDetailsFields() {
    el.fullName.addEventListener('input', () => {
      state.fullName = el.fullName.value;
      clearError('bkFullNameError');
      el.btnNext.disabled = !canProceed(3);
    });

    el.phone.addEventListener('input', () => {
      el.phone.value = el.phone.value.replace(/[^\d+\s]/g, '');
      state.phone = el.phone.value;
      clearError('bkPhoneError');
      el.btnNext.disabled = !canProceed(3);
    });

    el.phone.addEventListener('blur', () => {
      if (el.phone.value && !isValidPhone(el.phone.value)) {
        showError('bkPhoneError', 'Please enter a valid SA number e.g. 071 234 5678');
        el.phone.classList.add('error');
      } else {
        el.phone.classList.remove('error');
      }
    });

    el.email.addEventListener('input', () => {
      state.email = el.email.value;
      clearError('bkEmailError');
      el.btnNext.disabled = !canProceed(3);
    });

    el.email.addEventListener('blur', () => {
      if (el.email.value && !isValidEmail(el.email.value)) {
        showError('bkEmailError', 'Please enter a valid email address');
        el.email.classList.add('error');
      } else {
        el.email.classList.remove('error');
      }
    });
  }

  function validateStep3() {
    let valid = true;
    if (!state.fullName.trim() || state.fullName.trim().length < 2) {
      showError('bkFullNameError', 'Please enter your full name');
      el.fullName.classList.add('error');
      valid = false;
    }
    if (!isValidPhone(state.phone)) {
      showError('bkPhoneError', 'Please enter a valid SA number e.g. 071 234 5678');
      el.phone.classList.add('error');
      valid = false;
    }
    if (!isValidEmail(state.email)) {
      showError('bkEmailError', 'Please enter a valid email address');
      el.email.classList.add('error');
      valid = false;
    }
    return valid;
  }


  // ── STEP 4 — EVENT FIELDS ─────────────────────────────────
  function bindEventFields() {
    el.location.addEventListener('input', () => {
      state.location = el.location.value;
      clearError('bkLocationError');
      el.btnNext.disabled = !canProceed(4);
    });

    el.notes.addEventListener('input', () => {
      state.notes = el.notes.value;
    });
  }

  function validateStep4() {
    if (!state.date) {
      showError('bkDateError', 'Please select a date from the calendar');
      return false;
    }
    if (!state.location.trim() || state.location.trim().length < 2) {
      showError('bkLocationError', 'Please enter a location or area');
      el.location.classList.add('error');
      return false;
    }
    return true;
  }


  // ── STEP 5 — SUMMARY ──────────────────────────────────────
  function buildSummary() {
    const svc  = SERVICES.find(s => s.key === state.service);
    const data = typeof packagesData !== 'undefined'
      ? packagesData[state.service]
      : null;

    el.sumService.textContent = svc?.name || '—';

    const covRow = el.sumCoverage?.closest('.bk-summary-row');
    if (state.coverage && data?.type === 'dual') {
      el.sumCoverage.textContent = COVERAGE_LABELS[state.coverage] || '—';
      if (covRow) covRow.style.display = 'flex';
    } else {
      if (covRow) covRow.style.display = 'none';
    }

    if (data?.type === 'rates') {
      el.sumPackage.textContent = state.eventType || '—';
    } else {
      el.sumPackage.textContent = TIER_LABELS[state.tier] || '—';
    }

    el.sumName.textContent     = state.fullName  || '—';
    el.sumPhone.textContent    = state.phone     || '—';
    el.sumEmail.textContent    = state.email     || '—';
    el.sumDate.textContent     = formatDate(state.date) || '—';
    el.sumLocation.textContent = state.location  || '—';

    if (state.notes.trim()) {
      el.sumNotes.textContent = state.notes;
      el.sumNotesRow.style.display = 'flex';
    } else {
      el.sumNotesRow.style.display = 'none';
    }
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-ZA', {
      weekday: 'long',
      day:     'numeric',
      month:   'long',
      year:    'numeric'
    });
  }


  // ── ERROR HELPERS ─────────────────────────────────────────
  function showError(id, msg) {
    const span = document.getElementById(id);
    if (span) span.textContent = msg;
  }

  function clearError(id) {
    const span = document.getElementById(id);
    if (span) span.textContent = '';
  }


  // ── NAVIGATION ────────────────────────────────────────────
  function goNext() {
    if (state.currentStep === 3 && !validateStep3()) return;
    if (state.currentStep === 4 && !validateStep4()) return;

    if (state.currentStep < TOTAL_STEPS) {
      state.currentStep++;
      if (state.currentStep === 2) buildPackageStep();
      if (state.currentStep === 5) buildSummary();
      showStep(state.currentStep);
    }
  }

  function goBack() {
    if (state.currentStep > 1) {
      state.currentStep--;
      showStep(state.currentStep);
      el.btnNext.disabled = !canProceed(state.currentStep);
    }
  }


  // ── T&C MODAL ─────────────────────────────────────────────
  function bindTcModal() {
    el.bkOpenTc?.addEventListener('click', () => {
      el.tcOverlay?.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    el.tcClose?.addEventListener('click', closeTc);

    el.tcOverlay?.addEventListener('click', e => {
      if (e.target === el.tcOverlay) closeTc();
    });

    el.tcAgree?.addEventListener('click', () => {
      if (el.termsCheck) el.termsCheck.checked = true;
      if (el.submit)     el.submit.disabled = false;
      closeTc();
    });

    el.termsCheck?.addEventListener('change', () => {
      if (el.submit) el.submit.disabled = !el.termsCheck.checked;
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && el.tcOverlay?.classList.contains('open')) {
        closeTc();
      }
    });
  }

  function closeTc() {
    el.tcOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }


  // ── CALENDAR CALLBACK ─────────────────────────────────────
  function onDateSelected(dateStr) {
    state.date = dateStr;
    if (el.dateInput) el.dateInput.value = dateStr;
    clearError('bkDateError');
    el.btnNext.disabled = !canProceed(4);
  }


  // ── EMAILJS SUBMIT ────────────────────────────────────────
  function submitBooking() {
    el.submit.textContent = 'Sending...';
    el.submit.disabled    = true;
    el.errorMsg?.classList.remove('show');

    const svc  = SERVICES.find(s => s.key === state.service);
    const data = typeof packagesData !== 'undefined'
      ? packagesData[state.service]
      : null;

    let packageLabel = '';
    if (data?.type === 'rates') {
      packageLabel = state.eventType;
    } else if (data?.type === 'dual') {
      packageLabel = `${COVERAGE_LABELS[state.coverage]} — ${TIER_LABELS[state.tier]}`;
    } else {
      packageLabel = TIER_LABELS[state.tier] || '';
    }

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
      service:  svc?.name || state.service,
      package:  packageLabel,
      fullName: state.fullName,
      phone:    state.phone,
      email:    state.email,
      date:     formatDate(state.date),
      location: state.location,
      notes:    state.notes || 'None'
    })
    .then(() => showSuccessState(svc, packageLabel))
    .catch(err => {
      console.error('[booking.js] EmailJS error:', err);
      el.submit.textContent = 'Submit Booking Request';
      el.submit.disabled    = false;
      el.errorMsg?.classList.add('show');
    });
  }


  // ── SUCCESS STATE ─────────────────────────────────────────
  function showSuccessState(svc, packageLabel) {
    if (el.formSection) el.formSection.style.display = 'none';

    if (el.successSum) {
      el.successSum.innerHTML = [
        { label: 'Service',  value: svc?.name || state.service },
        { label: 'Package',  value: packageLabel               },
        { label: 'Date',     value: formatDate(state.date)     },
        { label: 'Location', value: state.location             }
      ].map(row => `
        <div class="bk-success-summary-row">
          <span class="bk-success-summary-label">${row.label}</span>
          <span class="bk-success-summary-value">${row.value}</span>
        </div>
      `).join('');
    }

    el.success?.classList.add('show');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  // ── URL PARAM SKIP LOGIC ──────────────────────────────────
  function applyUrlParams() {
    if (!state.service) return;

    const data = typeof packagesData !== 'undefined'
      ? packagesData[state.service]
      : null;

    const fullyPreFilled =
      (data?.type === 'dual'   && state.tier && state.coverage) ||
      (data?.type === 'single' && state.tier) ||
      (data?.type === 'rates'  && state.eventType);

    if (fullyPreFilled) {
      state.currentStep = 3;
      showStep(3);
      el.btnNext.disabled = !canProceed(3);
    } else {
      state.currentStep = 2;
      buildPackageStep();
      showStep(2);
    }
  }


  // ── INIT ──────────────────────────────────────────────────
  function init() {
    cacheElements();
    readUrlParams();
    buildServiceGrid();

    // Pre-highlight service card if URL param was set
    if (state.service) {
      el.serviceGrid?.querySelectorAll('.bk-service-card').forEach(card => {
        card.classList.toggle('selected', card.dataset.service === state.service);
      });
    }

    // Init calendar
    if (typeof CalendarRenderer !== 'undefined') {
      CalendarRenderer.init({
        container:      document.getElementById('bkCalendar'),
        bookedDates:    typeof bookedDates !== 'undefined' ? bookedDates : {},
        onDateSelected: onDateSelected
      });
    }

    el.btnNext.addEventListener('click', goNext);
    el.btnBack.addEventListener('click', goBack);
    bindDetailsFields();
    bindEventFields();
    bindTcModal();
    el.submit?.addEventListener('click', submitBooking);

    // Apply URL params — may skip steps 1 or 2
    applyUrlParams();
    updateNav(state.currentStep);
  }

  document.addEventListener('DOMContentLoaded', init);

  // Expose callback for calendar.js
  return { onDateSelected };

})();