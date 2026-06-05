/**
 * booked-dates.js
 * ─────────────────────────────────────────────────────────────
 * Centralized list of booked dates for the Ktwoo Visuals
 * booking calendar.
 *
 * HOW TO BLOCK A DATE:
 *   Add a line inside bookedDates:
 *   "2025-11-08": "Photoshoot — Durban",
 *   Save and push to GitHub. Done.
 *
 * HOW TO UNBLOCK A DATE:
 *   Delete the line. Save and push.
 *
 * FORMAT:
 *   "YYYY-MM-DD": "Internal note (not shown to client)"
 *
 * NOTE:
 *   Internal notes are for Mbuso's reference only.
 *   Clients only see the date as unavailable.
 *   They never see the reason.
 *
 * FUTURE:
 *   When the backend is ready this file gets replaced
 *   by an API call to GET /api/bookings/dates
 *   No other files need to change.
 */

const bookedDates = {

  // ── ADD BOOKED DATES BELOW ──────────────────────────────
  // Format: "YYYY-MM-DD": "Internal note",

  // Example entries — delete these and add real ones:
  // "2025-11-08": "Matric Dance — Durban North",
  // "2025-11-09": "Matric Dance — Durban North",
  // "2025-11-15": "Graduation Shoot — PMB",
  // "2025-11-22": "Music Video — Johannesburg",
  // "2025-12-06": "Promo Video — Cape Town",
  // "2025-12-07": "Promo Video — Cape Town",

};