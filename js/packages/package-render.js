/**
 * packages-renderer.js
 * ─────────────────────────────────────────────────────────────
 * Reads packagesData from packages-data.js and builds the full
 * packages section UI dynamically.
 *
 * DEPENDENCIES:
 *   packages-data.js must be loaded before this file.
 *
 * USAGE:
 *   Add data-service attribute to the packages section:
 *   <section id="sp-packages" data-service="matric-dance">
 *     <div class="sp-pkg-container"></div>
 *   </section>
 *
 * TO UPDATE PRICES OR CONTENT:
 *   Edit packages-data.js only. Never touch this file for content.
 *
 * TO ADD A NEW SERVICE TYPE:
 *   Add a renderer function below and register it in TYPE_RENDERERS.
 */

const PackagesRenderer = (() => {

  // ── STATE ──────────────────────────────────────
  let activeService  = null;
  let activeCoverage = 'pv';
  let activeTier     = 'premium';
  let serviceData    = null;


  // ── ICONS ──────────────────────────────────────
  const ICONS = {
    camera: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
      fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13
        a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5
        0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0
        0 1 .5-.5h13z"/>
      <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
    </svg>`,
    video: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
      fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0
        0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0
        0 0 1.659.753z"/>
    </svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
      fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384
        7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079
        -.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
    </svg>`,
    arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      width="16" height="16" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>`,
    team: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
      fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0
        0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68
        -2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1z
        M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
    </svg>`,
    clock: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
      fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5
        0 0 0 .496-.868L8 8.71V3.5z"/>
      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8
        a7 7 0 0 1 14 0z"/>
    </svg>`
  };


  // ── HELPERS ────────────────────────────────────

  function isPremium(key) {
    return key === 'premium' || key.endsWith('-premium');
  }

  function buildList(items, className, withCheck = false) {
    return `<ul class="${className}">
      ${items.map(item => `
        <li>
          ${withCheck ? `<span class="sp-list-check">${ICONS.check}</span>` : ''}
          ${item}
        </li>`).join('')}
    </ul>`;
  }

  function buildProcessStrip(steps) {
    const items = steps.map((step, i) => {
      const arrow = i < steps.length - 1
        ? `<span class="sp-process-arrow" aria-hidden="true">${ICONS.arrow}</span>`
        : '';
      return `
        <div class="sp-process-step">
          <span class="sp-process-num">${step.number}</span>
          <div class="sp-process-info">
            <strong class="sp-process-title">${step.title}</strong>
            <span class="sp-process-text">${step.text}</span>
          </div>
        </div>
        ${arrow}`;
    }).join('');

    return `
      <div class="sp-process" role="list" aria-label="How it works">
        <div class="sp-process-inner">
          ${items}
        </div>
      </div>`;
  }

  function buildCard(pkg, key, service) {
    const premium = isPremium(key);
    const coverageHtml = pkg.coverage
      ? `<div class="sp-card-coverage">
           ${ICONS.clock}
           <span>${pkg.coverage}</span>
         </div>`
      : '';

    return `
      <div class="sp-glass-card ${premium ? 'sp-glass-card--premium' : ''}">

        <div class="sp-glass-card-inner">

          <!-- Header -->
          <div class="sp-glass-header">
            <div class="sp-glass-header-left">
              <span class="sp-tier-badge ${premium ? 'sp-tier-badge--gold' : ''}">
                ${pkg.label}
              </span>
              <h3 class="sp-glass-title">${pkg.title}</h3>
              ${coverageHtml}
            </div>
            <div class="sp-glass-price-block">
              <span class="sp-glass-price-label">Starting From</span>
              <span class="sp-glass-price">${pkg.price}</span>
            </div>
          </div>

          <!-- Body -->
          <div class="sp-glass-body">

            <div class="sp-glass-col">
              <p class="sp-glass-col-label">
                ${ICONS.team}
                Your Team
              </p>
              ${buildList(pkg.team, 'sp-glass-list sp-glass-list--team')}
            </div>

            <div class="sp-glass-col">
              <p class="sp-glass-col-label">
                ${ICONS.camera}
                What's Included
              </p>
              ${buildList(pkg.included, 'sp-glass-list', true)}
            </div>

            <div class="sp-glass-col">
              <p class="sp-glass-col-label">
                ${ICONS.video}
                Deliverables
              </p>
              ${buildList(pkg.deliverables, 'sp-glass-list', true)}
            </div>

          </div>

          <!-- Footer -->
          <div class="sp-glass-footer">
            <p class="sp-glass-note">
              Starting-from price. Transport, accommodation &amp; studio fees excluded.
            </p>
            <a href="contact.html?service=${service}&package=${key}"
              class="sp-glass-book-btn">
              Book This Package
              ${ICONS.arrow}
            </a>
          </div>

        </div>
      </div>`;
  }


  // ── TYPE RENDERERS ─────────────────────────────

  /**
   * Renders the two-level package selector (dual type).
   * Used by: matric-dance, graduation, photoshoot, kids-shoot
   */
  function renderDual(container, data, service) {
    container.innerHTML = `

      <div class="sp-pkg-header">
        <span class="sp-section-tag">Packages</span>
        <h2 class="sp-section-heading">${data.heading}</h2>
        <p class="sp-section-sub">${data.subheading}</p>
      </div>

      <!-- Step 1 -->
      <div class="sp-step-block">
        <p class="sp-step-label">
          <span class="sp-step-number">01</span>
          Choose Coverage Type
        </p>
        <div class="sp-coverage-tabs" role="tablist"
          aria-label="Coverage type">
          <button class="sp-coverage-btn active"
            id="sp-cov-pv" role="tab" aria-selected="true"
            data-coverage="pv">
            ${ICONS.camera} Photo & Video
          </button>
          <button class="sp-coverage-btn"
            id="sp-cov-po" role="tab" aria-selected="false"
            data-coverage="po">
            ${ICONS.camera} Photo Only
          </button>
          <button class="sp-coverage-btn"
            id="sp-cov-vo" role="tab" aria-selected="false"
            data-coverage="vo">
            ${ICONS.video} Video Only
          </button>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="sp-step-block">
        <p class="sp-step-label">
          <span class="sp-step-number">02</span>
          Choose Package
        </p>
        <div class="sp-tier-tabs" role="tablist"
          aria-label="Package tier">
          <button class="sp-tier-btn active"
            id="sp-tier-premium" role="tab"
            aria-selected="true" data-tier="premium">
            Premium
          </button>
          <button class="sp-tier-btn"
            id="sp-tier-standard" role="tab"
            aria-selected="false" data-tier="standard">
            Standard
          </button>
          <button class="sp-tier-btn"
            id="sp-tier-basic" role="tab"
            aria-selected="false" data-tier="basic">
            Basic
          </button>
        </div>
      </div>

      <!-- Panel container -->
      <div class="sp-panel-wrap" id="spPanelWrap"></div>

      <!-- Disclaimer -->
      <div class="sp-disclaimer" role="note">
        <p><strong>Please note:</strong> All prices are starting-from prices.
        Transportation, accommodation, food, and studio booking costs are
        excluded from all packages and charged separately depending on
        location. Booking is confirmed only after deposit payment.</p>
      </div>`;

    // Render initial panel
    renderDualPanel(service, data);

    // Bind coverage buttons
    container.querySelectorAll('.sp-coverage-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCoverage = btn.dataset.coverage;
        activeTier = 'premium';

        container.querySelectorAll('.sp-coverage-btn').forEach(b => {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-selected', b === btn);
        });

        // Reset tier to premium
        container.querySelectorAll('.sp-tier-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.tier === 'premium');
          b.setAttribute('aria-selected', b.dataset.tier === 'premium');
        });

        renderDualPanel(service, data);
      });
    });

    // Bind tier buttons
    container.querySelectorAll('.sp-tier-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTier = btn.dataset.tier;

        container.querySelectorAll('.sp-tier-btn').forEach(b => {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-selected', b === btn);
        });

        renderDualPanel(service, data);
      });
    });
  }

  function renderDualPanel(service, data) {
    const key = `${activeCoverage}-${activeTier}`;
    const pkg = data.packages[key];
    const wrap = document.getElementById('spPanelWrap');
    if (!wrap) return;

    if (!pkg) {
      console.warn(`[packages-renderer.js] No package found for key: "${key}"`);
      wrap.innerHTML = `<p class="sp-pkg-error">Package details coming soon.</p>`;
      return;
    }

    wrap.innerHTML = buildCard(pkg, key, service);
  }


  /**
   * Renders single-level P/S/B tabs (single type).
   * Used by: music-videos, promo-videos
   */
  function renderSingle(container, data, service) {
    container.innerHTML = `

      <div class="sp-pkg-header">
        <span class="sp-section-tag">Packages</span>
        <h2 class="sp-section-heading">${data.heading}</h2>
        <p class="sp-section-sub">${data.subheading}</p>
      </div>

      <div class="sp-step-block">
        <p class="sp-step-label">
          <span class="sp-step-number">01</span>
          Choose Package
        </p>
        <div class="sp-tier-tabs" role="tablist"
          aria-label="Package tier">
          <button class="sp-tier-btn active"
            role="tab" aria-selected="true" data-tier="premium">
            Premium
          </button>
          <button class="sp-tier-btn"
            role="tab" aria-selected="false" data-tier="standard">
            Standard
          </button>
          <button class="sp-tier-btn"
            role="tab" aria-selected="false" data-tier="basic">
            Basic
          </button>
        </div>
      </div>

      <div class="sp-panel-wrap" id="spPanelWrap"></div>

      <div class="sp-disclaimer" role="note">
        <p><strong>Please note:</strong> All prices are starting-from prices.
        Packages include labour and production services. Transportation,
        food, and accommodation costs are excluded. Full payment is
        required before the shoot date.</p>
      </div>`;

    // Render initial panel
    renderSinglePanel(service, data, 'premium');

    // Bind tier buttons
    container.querySelectorAll('.sp-tier-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTier = btn.dataset.tier;

        container.querySelectorAll('.sp-tier-btn').forEach(b => {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-selected', b === btn);
        });

        renderSinglePanel(service, data, activeTier);
      });
    });
  }

  function renderSinglePanel(service, data, tier) {
    const pkg = data.packages[tier];
    const wrap = document.getElementById('spPanelWrap');
    if (!wrap || !pkg) return;
    wrap.innerHTML = buildCard(pkg, tier, service);
  }


  /**
   * Renders a flat rates table (rates type).
   * Used by: freelancing
   */
  function renderRates(container, data, service) {
    const rows = data.rates.map((r, i) => `
      <tr class="${i % 2 === 0 ? 'sp-rates-row' : 'sp-rates-row sp-rates-row--alt'}">
        <td class="sp-rates-service">${r.service}</td>
        <td class="sp-rates-coverage">${r.coverage}</td>
        <td class="sp-rates-price">${r.rate}</td>
        <td class="sp-rates-action">
          <a href="contact.html?service=${service}&type=${encodeURIComponent(r.service)}"
            class="sp-rates-book-btn">
            Book ${ICONS.arrow}
          </a>
        </td>
      </tr>`).join('');

    container.innerHTML = `

      <div class="sp-pkg-header">
        <span class="sp-section-tag">Rates</span>
        <h2 class="sp-section-heading">${data.heading}</h2>
        <p class="sp-section-sub">${data.subheading}</p>
      </div>

      <div class="sp-rates-wrap">
        <table class="sp-rates-table" role="table"
          aria-label="Freelancing rates">
          <thead>
            <tr>
              <th>Service</th>
              <th>Coverage</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>

      <div class="sp-disclaimer" role="note">
        <p><strong>Please note:</strong> ${data.note}
        Full payment is required before the gig date.</p>
      </div>`;
  }


  // ── TYPE ROUTER ────────────────────────────────
  const TYPE_RENDERERS = {
    dual:   renderDual,
    single: renderSingle,
    rates:  renderRates
  };


  // ── INIT ───────────────────────────────────────

  function init() {
    const section = document.getElementById('sp-packages');
    if (!section) return;

    activeService = section.dataset.service;
    if (!activeService) {
      console.error('[packages-renderer.js] No data-service attribute on #sp-packages.');
      return;
    }

    if (typeof packagesData === 'undefined') {
      console.error('[packages-renderer.js] packages-data.js is not loaded.');
      return;
    }

    serviceData = packagesData[activeService];
    if (!serviceData) {
      console.warn(`[packages-renderer.js] No data for service: "${activeService}".`);
      return;
    }

    // Set background image
    const bg = document.getElementById('spPkgBg');
    if (bg && serviceData.bgImage) {
      bg.style.backgroundImage = `url('${serviceData.bgImage}')`;
    }

    const container = section.querySelector('.sp-pkg-container');
    if (!container) {
      console.error('[packages-renderer.js] No .sp-pkg-container found inside #sp-packages.');
      return;
    }

    const renderer = TYPE_RENDERERS[serviceData.type];
    if (!renderer) {
      console.error(`[packages-renderer.js] Unknown type: "${serviceData.type}".`);
      return;
    }

    renderer(container, serviceData, activeService);

    // Prepend the process strip above all rendered content
    if (serviceData.steps && serviceData.steps.length) {
      container.insertAdjacentHTML('afterbegin', buildProcessStrip(serviceData.steps));
    }
  }

  document.addEventListener('DOMContentLoaded', init);

  return { init };

})();