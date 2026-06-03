/**
 * lightbox.js
 * ─────────────────────────────────────────────
 * Standalone lightbox for the Ktwoo Visuals gallery system.
 * Reads directly from gallery data — never scrapes the DOM for image URLs.
 *
 * DEPENDENCIES:
 *   - gallery-data.js must be loaded before this file
 *   - gallery.js must be loaded before this file
 *     (lightbox initialises after gallery dispatches "galleryReady")
 *
 * FEATURES:
 *   - Previous / Next navigation
 *   - Keyboard navigation (ArrowLeft, ArrowRight, Escape)
 *   - Overlay click to close
 *   - Image counter
 *   - Preloads adjacent images for instant navigation
 *   - Error handling for missing images
 *   - Supports image type only currently (video reserved for future)
 */

const Lightbox = (() => {

  // ── STATE ──────────────────────────────────
  let currentIndex = 0;
  let galleryData  = [];
  let isOpen       = false;

  // ── ELEMENT REFS ───────────────────────────
  // Populated on init — elements must exist in HTML
  let els = {};

  const ELEMENTS = {
    lightbox : 'spLightbox',
    overlay  : 'spLightboxOverlay',
    close    : 'spLightboxClose',
    prev     : 'spLightboxPrev',
    next     : 'spLightboxNext',
    imgWrap  : 'spLightboxImgWrap',
    img      : 'spLightboxImg',
    counter  : 'spLightboxCounter',
  };


  // ── HELPERS ────────────────────────────────

  function getEl(id) {
    const el = document.getElementById(id);
    if (!el) console.warn(`[lightbox.js] Element #${id} not found in DOM.`);
    return el;
  }

  function resolveElements() {
    const resolved = {};
    for (const [key, id] of Object.entries(ELEMENTS)) {
      resolved[key] = getEl(id);
    }
    return resolved;
  }

  function updateCounter() {
    if (!els.counter) return;
    els.counter.textContent = `${currentIndex + 1} / ${galleryData.length}`;
  }

  /**
   * Preloads adjacent images so navigation feels instant.
   * Only preloads image type — skips video.
   */
  function preloadAdjacent(index) {
    const total = galleryData.length;
    const indices = [
      (index + 1) % total,
      (index - 1 + total) % total,
    ];
    indices.forEach(i => {
      const item = galleryData[i];
      if (!item || (item.type && item.type !== 'image')) return;
      const preload = new Image();
      preload.src = item.src;
    });
  }

  /**
   * Sets the lightbox image.
   * Handles load errors with a fallback state.
   */
  function setImage(index) {
    const item = galleryData[index];
    if (!item || !els.img) return;

    els.img.classList.add('sp-lightbox-img--loading');
    els.imgWrap.classList.remove('sp-lightbox-img-wrap--error');

    els.img.onload = () => {
      els.img.classList.remove('sp-lightbox-img--loading');
    };

    els.img.onerror = () => {
      console.warn(`[lightbox.js] Failed to load image: ${item.src}`);
      els.img.classList.remove('sp-lightbox-img--loading');
      els.imgWrap.classList.add('sp-lightbox-img-wrap--error');
      els.img.alt = 'Image unavailable';
    };

    els.img.src  = item.src;
    els.img.alt  = item.alt || '';
    updateCounter();
    preloadAdjacent(index);
  }


  // ── OPEN / CLOSE ───────────────────────────

  function open(index) {
    if (!els.lightbox) return;
    currentIndex = index;
    setImage(currentIndex);
    els.lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    isOpen = true;
    els.close?.focus();
  }

  function close() {
    if (!els.lightbox) return;
    els.lightbox.classList.remove('open');
    document.body.style.overflow = '';
    isOpen = false;
    els.img.src = '';
    els.img.alt = '';
  }


  // ── NAVIGATION ─────────────────────────────

  function prev() {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    setImage(currentIndex);
  }

  function next() {
    currentIndex = (currentIndex + 1) % galleryData.length;
    setImage(currentIndex);
  }


  // ── EVENT BINDING ──────────────────────────

  function bindControls() {
    els.close?.addEventListener('click', close);
    els.overlay?.addEventListener('click', close);
    els.prev?.addEventListener('click', prev);
    els.next?.addEventListener('click', next);
  }

  function bindKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (!isOpen) return;
      const actions = {
        'Escape'     : close,
        'ArrowLeft'  : prev,
        'ArrowRight' : next,
      };
      actions[e.key]?.();
    });
  }

  /**
   * Binds click events on gallery items after gallery renders.
   * Listens for the galleryReady custom event from gallery.js.
   */
  function bindGalleryItems(data) {
    galleryData = data;
    const grid = document.getElementById('spGalleryGrid');
    if (!grid) return;

    grid.addEventListener('click', (e) => {
      const item = e.target.closest('.sp-gallery-item');
      if (!item) return;
      const index = parseInt(item.dataset.index, 10);
      if (!isNaN(index)) open(index);
    });

    // Keyboard access on gallery items
    grid.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const item = e.target.closest('.sp-gallery-item');
      if (!item) return;
      e.preventDefault();
      const index = parseInt(item.dataset.index, 10);
      if (!isNaN(index)) open(index);
    });
  }
  // ── INIT ───────────────────────────────────

  function init() {
    els = resolveElements();
    bindControls();
    bindKeyboard();
  }

  document.addEventListener('DOMContentLoaded', init);

// Register galleryReady listener at script load time so we don't miss
// the event if gallery.js dispatches it during DOMContentLoaded.
document.addEventListener('galleryReady', (e) => {
  bindGalleryItems(e.detail.data);
});

  // Public API
  return { open, close, prev, next };

})();