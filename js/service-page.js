/* ---- Package background images per tier ---- */
var spBgImages = {
  premium:  "assets/matric-dance/mtd-3.png",
  standard: "assets/matric-dance/mtd-4.png",
  basic:    "assets/matric-dance/mtd-1.png"
};

function spSwitchTab(tier) {
  /* Tabs */
  document.querySelectorAll('.sp-tab-btn').forEach(function (btn) {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
  });

  /* Panels */
  document.querySelectorAll('.sp-panel').forEach(function (panel) {
    panel.classList.remove('active');
  });

  /* Activate selected */
  var activeBtn   = document.getElementById('sp-tab-' + tier);
  var activePanel = document.getElementById('sp-panel-' + tier);

  if (activeBtn)   { activeBtn.classList.add('active'); activeBtn.setAttribute('aria-selected', 'true'); }
  if (activePanel) { activePanel.classList.add('active'); }

  /* Swap background image */
  var bg = document.getElementById('sp-pkg-bg');
  if (bg && spBgImages[tier]) {
    bg.style.backgroundImage = "url('" + spBgImages[tier] + "')";
  }
}

/* Arrow key navigation */
document.querySelectorAll('.sp-tab-btn').forEach(function (btn, i, all) {
  btn.addEventListener('keydown', function (e) {
    var tiers = ['premium', 'standard', 'basic'];
    if (e.key === 'ArrowRight') { spSwitchTab(tiers[(i + 1) % 3]); all[(i + 1) % 3].focus(); }
    if (e.key === 'ArrowLeft')  { spSwitchTab(tiers[(i + 2) % 3]); all[(i + 2) % 3].focus(); }
  });
});