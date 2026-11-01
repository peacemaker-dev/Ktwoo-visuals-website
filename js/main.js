/**
 * main.js — runs on every page.
 *
 * Handles:
 *   - Navbar scroll + hamburger menu
 *   - FAQ accordion
 *   - Footer year
 *   - Email obfuscation       (anti-spam — see note below)
 *   - WhatsApp link injection (from SiteConfig)
 *   - Footer contact details  (from SiteConfig)
 *
 * DEPENDENCY: site-config.js must be loaded BEFORE this file.
 *
 * Every lookup below is null-guarded, because not every page has
 * every element (booking.html, for example, has no navbar).
 */

// ── NAVBAR ──────────────────────────────────

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Scroll — toggle .scrolled class
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

if (hamburger && navLinks) {
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
}

// ── FAQ ACCORDION (global) ────────────────────
document.addEventListener('DOMContentLoaded', function () {
  const faqItems = document.querySelectorAll('.ct-faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.ct-faq-question');
    const answer = item.querySelector('.ct-faq-answer');

    if (!question || !answer) return;

    question.addEventListener('click', function () {
      const isOpen = question.getAttribute('aria-expanded') === 'true';

      faqItems.forEach(function (other) {
        const q = other.querySelector('.ct-faq-question');
        const a = other.querySelector('.ct-faq-answer');
        if (q) q.setAttribute('aria-expanded', 'false');
        if (a) a.classList.remove('open');
      });

      if (!isOpen) {
        question.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });
});

// ── FOOTER YEAR ──────────────────────────────
function initFooterYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ─────────────────────────────────────────────
 * EMAIL OBFUSCATION  (anti-spam)
 * ─────────────────────────────────────────────
 * Spam bots scrape the raw HTML source. Because the address is
 * stored split (user + domain) in site-config.js and only joined
 * here at runtime, a complete address never appears in any file
 * a bot can read.
 *
 * Two independent passes, so neither can clobber the other:
 *
 *   .email-link  ->  only the href is set   (never the text)
 *   .email-text  ->  only the text is set   (never the href)
 *
 * Markup:
 *   <a href="#" class="email-link"
 *      data-user="info" data-domain="ktwovisuals.co.za">
 *     <span class="email-text"></span>
 *   </a>
 *
 * data-user / data-domain are optional — if absent, the values
 * come from SiteConfig.
 */

function getEmailAddress(el) {
  let user = el && el.getAttribute('data-user');
  let domain = el && el.getAttribute('data-domain');

  if ((!user || !domain) && typeof SiteConfig !== 'undefined') {
    user = user || SiteConfig.business.emailUser;
    domain = domain || SiteConfig.business.emailDomain;
  }

  if (!user || !domain) return null;
  return user + String.fromCharCode(64) + domain;
}

function initEmailObfuscation() {
  // Pass 1 — hrefs only
  document.querySelectorAll('.email-link').forEach(link => {
    const address = getEmailAddress(link);
    if (address) link.href = 'mailto:' + address;
  });

  // Pass 2 — visible text only
  document.querySelectorAll('.email-text').forEach(span => {
    const address = getEmailAddress(span);
    if (address) span.textContent = address;
  });
}

// ── WHATSAPP LINK INJECTION ──────────────────
// Any <a class="wa-link"> gets its href from SiteConfig.
// No WhatsApp URL is hardcoded in the HTML.

function initWhatsAppLinks() {
  if (typeof SiteConfig === 'undefined') return;

  const url = SiteConfig.whatsapp.url;

  document.querySelectorAll('.wa-link').forEach(link => {
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}

// ── FOOTER CONTACT DETAILS ───────────────────
// Phone and location come from SiteConfig so they only ever
// need changing in one place. (Email is handled above.)

function initFooterContact() {
  if (typeof SiteConfig === 'undefined') return;

  const cfg = SiteConfig.business;

  const phone = document.getElementById('footer-phone');
  if (phone) {
    phone.href = 'tel:' + cfg.phone;
    phone.textContent = cfg.phoneDisplay;
  }

  const location = document.getElementById('footer-location');
  if (location) location.textContent = cfg.location;
}

// ── JSON-LD SCHEMA EMAIL ──────────────────
// The LocalBusiness schema deliberately ships WITHOUT an email
// property, so the address is not sitting in the page source for
// bots to scrape. Search engines render JavaScript, so we add it
// back at runtime — they still see a complete schema.

function initSchemaEmail() {
  if (typeof SiteConfig === 'undefined') return;

  const script = document.querySelector('script[type="application/ld+json"]');
  if (!script) return;

  try {
    const data = JSON.parse(script.textContent);
    if (data['@type'] !== 'LocalBusiness' || data.email) return;

    data.email =
      SiteConfig.business.emailUser +
      String.fromCharCode(64) +
      SiteConfig.business.emailDomain;

    script.textContent = JSON.stringify(data, null, 2);
  } catch (e) {
    /* malformed schema — leave it alone */
  }
}

// ── INIT ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initEmailObfuscation();
  initWhatsAppLinks();
  initFooterContact();
  initSchemaEmail();
  initFooterYear();
});
