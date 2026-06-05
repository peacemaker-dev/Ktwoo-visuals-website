/**
 * calendar.js
 * ─────────────────────────────────────────────────────────────
 * Standalone visual calendar renderer for the booking page.
 *
 * DEPENDENCIES:
 *   booked-dates.js must be loaded before this file.
 *
 * USAGE:
 *   CalendarRenderer.init({
 *     container:      HTMLElement,   — the .bk-calendar div
 *     bookedDates:    object,        — from booked-dates.js
 *     onDateSelected: function(str)  — called with "YYYY-MM-DD"
 *   });
 *
 * FEATURES:
 *   - Renders current month by default
 *   - Previous / next month navigation
 *   - Cannot navigate to past months
 *   - Past dates visually blocked — not selectable
 *   - Booked dates visually blocked — red dot + strikethrough
 *   - Booked date tooltip on hover — "This date is unavailable"
 *   - Today highlighted with gold border
 *   - Selected date filled gold
 *   - Calls onDateSelected when user picks a valid date
 *   - Keyboard accessible — Enter or Space to select
 *
 * FUTURE:
 *   Replace bookedDates object with API fetch from backend.
 *   CalendarRenderer code stays exactly the same.
 */

const CalendarRenderer = (() => {

  // ── CONFIG & STATE ──────────────────────────────────────────
  let cfg          = {};
  let currentYear  = 0;
  let currentMonth = 0;


  // ── STATIC DATA ────────────────────────────────────────────
  const MONTH_NAMES = [
    'January',   'February', 'March',    'April',
    'May',       'June',     'July',     'August',
    'September', 'October',  'November', 'December'
  ];

  const DAY_NAMES = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  // SVG arrows reused for prev/next buttons
  const ARROW_LEFT = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
      fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707
        8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1
        0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>`;

  const ARROW_RIGHT = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
      fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6
        6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293
        8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>`;


  // ── HELPERS ────────────────────────────────────────────────

  /**
   * Returns today as a Date with time zeroed out.
   */
  function getToday() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }

  /**
   * Converts year, month (0-indexed), day to "YYYY-MM-DD" string.
   */
  function toDateStr(year, month, day) {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  }

  /**
   * Checks if a date string exists in the bookedDates object.
   */
  function isBooked(dateStr) {
    return Object.prototype.hasOwnProperty.call(
      cfg.bookedDates || {}, dateStr
    );
  }

  /**
   * Checks if a Date is before today.
   */
  function isPast(date) {
    return date < getToday();
  }

  /**
   * Returns today as a "YYYY-MM-DD" string.
   */
  function todayStr() {
    const t = getToday();
    return toDateStr(t.getFullYear(), t.getMonth(), t.getDate());
  }

  /**
   * Checks if the calendar is currently showing the
   * current or a past month — used to disable prev button.
   */
  function isCurrentOrPastMonth() {
    const t = getToday();
    return (
      currentYear < t.getFullYear() ||
      (currentYear === t.getFullYear() && currentMonth <= t.getMonth())
    );
  }


  // ── RENDER ─────────────────────────────────────────────────

  function render() {
    const container = cfg.container;
    if (!container) {
      console.warn('[calendar.js] No container element provided.');
      return;
    }

    const firstDay    = new Date(currentYear, currentMonth, 1);
    const lastDay     = new Date(currentYear, currentMonth + 1, 0);
    const prevDisabled = isCurrentOrPastMonth();

    // Day of week first day falls on — adjusted for Mon start
    let startOffset = firstDay.getDay() - 1;
    if (startOffset < 0) startOffset = 6;

    // Build calendar shell
    container.innerHTML = `
      <div class="bk-cal-header">
        <button
          class="bk-cal-nav"
          id="bkCalPrev"
          aria-label="Previous month"
          ${prevDisabled ? 'disabled' : ''}
        >${ARROW_LEFT}</button>

        <span class="bk-cal-title">
          ${MONTH_NAMES[currentMonth]} ${currentYear}
        </span>

        <button
          class="bk-cal-nav"
          id="bkCalNext"
          aria-label="Next month"
        >${ARROW_RIGHT}</button>
      </div>

      <div class="bk-cal-weekdays">
        ${DAY_NAMES.map(d =>
          `<div class="bk-cal-weekday">${d}</div>`
        ).join('')}
      </div>

      <div class="bk-cal-days" id="bkCalDays"
        role="grid" aria-label="Available dates">
      </div>
    `;

    // Bind navigation
    document.getElementById('bkCalPrev')
      ?.addEventListener('click', goToPrevMonth);
    document.getElementById('bkCalNext')
      ?.addEventListener('click', goToNextMonth);

    buildDays(lastDay.getDate(), startOffset);
  }


  // ── BUILD DAYS ─────────────────────────────────────────────

  function buildDays(totalDays, startOffset) {
    const grid = document.getElementById('bkCalDays');
    if (!grid) return;

    const fragment = document.createDocumentFragment();

    // Empty cells before first day of month
    for (let i = 0; i < startOffset; i++) {
      const empty = document.createElement('div');
      empty.className = 'bk-cal-day empty';
      empty.setAttribute('aria-hidden', 'true');
      fragment.appendChild(empty);
    }

    // Day cells
    for (let day = 1; day <= totalDays; day++) {
      const date    = new Date(currentYear, currentMonth, day);
      const dateStr = toDateStr(currentYear, currentMonth, day);
      const past    = isPast(date);
      const booked  = isBooked(dateStr);
      const isToday = dateStr === todayStr();
      const selected = dateStr === cfg.selectedDate;
      const blocked  = past || booked;

      const classes = [
        'bk-cal-day',
        past     ? 'past'     : '',
        booked   ? 'booked'   : '',
        isToday  ? 'today'    : '',
        selected ? 'selected' : ''
      ].filter(Boolean).join(' ');

      const cell = document.createElement('div');
      cell.className   = classes;
      cell.textContent = day;
      cell.setAttribute('role', blocked ? 'presentation' : 'button');
      cell.setAttribute('aria-label',
        `${day} ${MONTH_NAMES[currentMonth]} ${currentYear}` +
        (booked ? ' — Unavailable' : '') +
        (past   ? ' — Past date'   : '')
      );

      if (!blocked) {
        cell.setAttribute('tabindex', '0');
        cell.addEventListener('click', () => handleDateSelect(dateStr));
        cell.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleDateSelect(dateStr);
          }
        });
      }

      if (booked) {
        cell.title = 'This date is unavailable. Please select another date.';
        cell.setAttribute('aria-disabled', 'true');
      }

      if (past) {
        cell.setAttribute('aria-disabled', 'true');
      }

      fragment.appendChild(cell);
    }

    grid.appendChild(fragment);
  }


  // ── DATE SELECTION ─────────────────────────────────────────

  function handleDateSelect(dateStr) {
  // Clear previous selection
  cfg.container
    ?.querySelectorAll('.bk-cal-day.selected')
    .forEach(d => d.classList.remove('selected'));

  // Mark new selection by matching date string
  cfg.container
    ?.querySelectorAll(
      '.bk-cal-day:not(.empty):not(.past):not(.booked)'
    )
    .forEach(d => {
      const day = parseInt(d.textContent.trim(), 10);
      if (!isNaN(day)) {
        const str = toDateStr(currentYear, currentMonth, day);
        if (str === dateStr) d.classList.add('selected');
      }
    });

  cfg.selectedDate = dateStr;

  if (typeof cfg.onDateSelected === 'function') {
    cfg.onDateSelected(dateStr);
  }
}


  // ── MONTH NAVIGATION ───────────────────────────────────────

  function goToPrevMonth() {
    if (isCurrentOrPastMonth()) return;
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    render();
  }

  function goToNextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    render();
  }


  // ── INIT ───────────────────────────────────────────────────

  function init(options = {}) {
    if (!options.container) {
      console.error('[calendar.js] init() requires a container element.');
      return;
    }

    cfg = {
      container:      options.container,
      bookedDates:    options.bookedDates    || {},
      onDateSelected: options.onDateSelected || null,
      selectedDate:   null
    };

    const t      = getToday();
    currentYear  = t.getFullYear();
    currentMonth = t.getMonth();

    render();
  }


  // ── PUBLIC API ─────────────────────────────────────────────
  return { init };

})();