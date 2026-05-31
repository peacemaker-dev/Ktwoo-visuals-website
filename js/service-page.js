// ── GALLERY LIGHTBOX ─────────────────────────

const galleryItems   = document.querySelectorAll('.sp-gallery-item');
const lightbox       = document.getElementById('spLightbox');
const lightboxImg    = document.getElementById('spLightboxImg');
const lightboxOverlay = document.getElementById('spLightboxOverlay');
const lightboxClose  = document.getElementById('spLightboxClose');
const lightboxPrev   = document.getElementById('spLightboxPrev');
const lightboxNext   = document.getElementById('spLightboxNext');
const lightboxCounter = document.getElementById('spLightboxCounter');

let currentIndex = 0;
const images = [];

// Collect image URLs from gallery
galleryItems.forEach((item, i) => {
  const bg = item.querySelector('.sp-gallery-img');
  const url = bg.style.backgroundImage.replace(/url\(["']?|["']?\)/g, '');
  images.push(url);

  item.addEventListener('click', () => {
    currentIndex = i;
    openLightbox();
  });
});

function openLightbox() {
  lightboxImg.src = images[currentIndex];
  lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex];
  lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex];
  lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', prevImage);
lightboxNext.addEventListener('click', nextImage);

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  prevImage();
  if (e.key === 'ArrowRight') nextImage();
});