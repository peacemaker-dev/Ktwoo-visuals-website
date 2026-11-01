/**
 * site-config.js
 * ─────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH for site-wide values.
 *
 * Change a phone number, email, WhatsApp message or social link
 * HERE ONLY — never in the HTML.
 *
 * MUST be loaded before main.js on every page.
 *
 * ── Anti-spam note ──
 * The email address is stored split into user + domain and is only
 * joined together at runtime by main.js. It therefore never appears
 * as a complete, scrapeable address in any HTML source file.
 */

const SiteConfig = {
  // ── BUSINESS DETAILS ──────────────────────
  business: {
    name: "KTwo Visuals",
    tagline: "A Moment Happens Once",

    phone: "+27797442467",            // tel: href value
    phoneDisplay: "+27 79 744 2467",  // what the visitor sees

    emailUser: "info",                 // never store the full address
    emailDomain: "ktwovisuals.co.za",  // joined at runtime only

    location: "KZN, South Africa",
  },

  // ── WHATSAPP ──────────────────────────────
  // url is built from number + message, so there is one place to edit.
  whatsapp: {
    number: "27797442467",
    message:
      "Hi%20KTwo%20Visuals%2C%20I%27d%20like%20to%20enquire%20about%20a%20booking.",
    get url() {
      return "https://wa.me/" + this.number + "?text=" + this.message;
    },
  },

  // ── SOCIAL LINKS ──────────────────────────
  social: {
    instagram: "https://www.instagram.com/ktwovisuals/",
    facebook: "https://www.facebook.com/mbusoandilemthembu",
    tiktok: "https://www.tiktok.com/@ktwovisuals",
    youtube: "https://youtube.com/@ktwovisualsofficial",
  },
};
