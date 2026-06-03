/**
 * gallery.js
 * ─────────────────────────────────────────────
 * Renders the gallery grid from gallery-data.js.
 * Reads the data-gallery attribute from the grid container
 * to automatically determine which service gallery to render.
 *
 * DEPENDENCIES:
 *   - gallery-data.js must be loaded before this file
 *   - lightbox.js must be loaded after this file
 *
 * USAGE:
 *   <div id="spGalleryGrid" data-gallery="matric-dance"></div>
 *
 * TO ADD IMAGES:
 *   Edit gallery-data.js only. No changes needed here.
 */

const GalleryRenderer = (() => {

  // ── CONSTANTS ──────────────────────────────
  const FALLBACK_COLOR = '#111111';
  const EXPAND_ICON = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3z
               M11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5z
               M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5z
               M15 11a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
    </svg>`;


  // ── HELPERS ────────────────────────────────

  /**
   * Detects which gallery to render from the grid element's
   * data-gallery attribute. No hardcoded service names.
   */
  function detectServiceKey(gridEl) {
    return gridEl.dataset.gallery || null;
  }

  /**
   * Retrieves gallery data for a given service key.
   * Gracefully handles missing or empty galleries.
   */
  function getGalleryData(key) {
    if (typeof galleries === 'undefined') {
      console.error('[gallery.js] gallery-data.js is not loaded. Make sure it is included before gallery.js.');
      return [];
    }
    if (!galleries[key]) {
      console.warn(`[gallery.js] No gallery found for key: "${key}". Check gallery-data.js.`);
      return [];
    }
    if (galleries[key].length === 0) {
      console.warn(`[gallery.js] Gallery "${key}" exists but has no images yet.`);
      return [];
    }
    return galleries[key];
  }


  // ── ITEM BUILDERS ──────────────────────────

  /**
   * Builds a single gallery item element for type: "image".
   * Handles load errors with fallback placeholder.
   */
  function buildImageItem(item, index) {
    const el = document.createElement('div');
    el.className = 'sp-gallery-item';
    el.dataset.index = index;
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', `View image: ${item.alt}`);

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;
    img.className = 'sp-gallery-img';
    img.loading = index < 4 ? 'eager' : 'lazy';
    img.decoding = 'async';

    // Error handling — show fallback on load failure
    img.addEventListener('error', () => {
      console.warn(`[gallery.js] Image failed to load: ${item.src}`);
      img.style.display = 'none';
      el.classList.add('sp-gallery-item--broken');
      const fallback = document.createElement('div');
      fallback.className = 'sp-gallery-fallback';
      fallback.setAttribute('aria-label', 'Image unavailable');
      fallback.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
          fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
          <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
        </svg>
        <span>Image unavailable</span>
      `;
      el.appendChild(fallback);
    });

    const overlay = document.createElement('div');
    overlay.className = 'sp-gallery-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = EXPAND_ICON;

    el.appendChild(img);
    el.appendChild(overlay);
    return el;
  }

  /**
   * Builds a placeholder for future video support.
   * Currently renders a "coming soon" tile.
   * Replace this when video lightbox is implemented.
   */
  function buildVideoItem(item, index) {
    const el = document.createElement('div');
    el.className = 'sp-gallery-item sp-gallery-item--video';
    el.dataset.index = index;
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', `View video: ${item.alt}`);

    const poster = document.createElement('img');
    poster.src = item.poster || item.src;
    poster.alt = item.alt;
    poster.className = 'sp-gallery-img';
    poster.loading = 'lazy';
    poster.decoding = 'async';

    poster.addEventListener('error', () => {
      console.warn(`[gallery.js] Video poster failed to load: ${poster.src}`);
    });

    const overlay = document.createElement('div');
    overlay.className = 'sp-gallery-overlay sp-gallery-overlay--video';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
        fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
      </svg>`;

    el.appendChild(poster);
    el.appendChild(overlay);
    return el;
  }

  /**
   * Routes item to the correct builder based on type.
   * Defaults to image if type is missing.
   */
  function buildItem(item, index) {
    const type = item.type || 'image';
    if (type === 'video') return buildVideoItem(item, index);
    return buildImageItem(item, index);
  }


  // ── RENDERER ───────────────────────────────

  /**
   * Main render function.
   * Detects service key, fetches data, builds and injects grid items.
   * Dispatches a custom event when complete so lightbox.js can initialise.
   */
  function render() {
    const grid = document.getElementById('spGalleryGrid');
    if (!grid) return;

    const key = detectServiceKey(grid);
    if (!key) {
      console.error('[gallery.js] No data-gallery attribute found on #spGalleryGrid.');
      return;
    }

    const data = getGalleryData(key);
    if (data.length === 0) {
      grid.innerHTML = `
        <p class="sp-gallery-empty">
          No gallery images available for this service yet.
        </p>`;
      return;
    }

    const fragment = document.createDocumentFragment();
    data.forEach((item, index) => {
      fragment.appendChild(buildItem(item, index));
    });

    grid.appendChild(fragment);

    // Notify lightbox.js that gallery is ready
    grid.dispatchEvent(new CustomEvent('galleryReady', {
      bubbles: true,
      detail: { key, data }
    }));
  }


  // ── INIT ───────────────────────────────────
  document.addEventListener('DOMContentLoaded', render);

  // Public API — exposed in case manual re-render is needed
  return { render };

})();