/**
 * Photo Lightbox Module
 * Opens a swipeable photo gallery when clicking gallery items
 */

export function initPhotoLightbox() {
  const lightbox = document.getElementById('photoLightbox');
  if (!lightbox) return;

  const dataEl = document.getElementById('galleryPhotosData');
  if (!dataEl) return;

  let projects;
  try {
    projects = JSON.parse(dataEl.textContent);
  } catch (e) {
    return;
  }

  const overlay = lightbox.querySelector('.photo-lightbox-overlay');
  const closeBtn = lightbox.querySelector('.photo-lightbox-close');
  const track = lightbox.querySelector('.photo-lightbox-track');
  const counter = lightbox.querySelector('.photo-lightbox-counter');
  const progressFill = lightbox.querySelector('.photo-lightbox-progress-fill');
  const locationEl = lightbox.querySelector('.photo-lightbox-location');
  const titleEl = lightbox.querySelector('.photo-lightbox-title');
  const prevBtn = lightbox.querySelector('.photo-lightbox-prev');
  const nextBtn = lightbox.querySelector('.photo-lightbox-next');
  const triggers = document.querySelectorAll('.gallery-item[data-gallery-index]');

  let currentIndex = 0;
  let totalPhotos = 0;

  function updateCounter() {
    counter.innerHTML = `<strong>${currentIndex + 1}</strong> of <strong>${totalPhotos}</strong>`;
    const pct = ((currentIndex + 1) / totalPhotos) * 100;
    progressFill.style.width = `${pct}%`;
  }

  function handleScroll() {
    const scrollLeft = track.scrollLeft;
    const slideWidth = track.offsetWidth;
    const newIndex = Math.round(scrollLeft / slideWidth);
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalPhotos) {
      currentIndex = newIndex;
      updateCounter();
    }
  }

  function goTo(index) {
    const clamped = Math.max(0, Math.min(index, totalPhotos - 1));
    track.scrollTo({
      left: clamped * track.offsetWidth,
      behavior: 'smooth'
    });
  }

  function openLightbox(projectIndex) {
    const project = projects[projectIndex];
    if (!project || !project.photos || project.photos.length === 0) return;

    totalPhotos = project.photos.length;
    currentIndex = 0;

    // Set project info
    locationEl.textContent = project.location;
    titleEl.textContent = project.title;

    // Build slides
    track.innerHTML = project.photos.map((src, i) =>
      `<div class="photo-lightbox-slide">
        <img src="${src}" alt="${project.title} — Photo ${i + 1}" ${i > 0 ? 'loading="lazy"' : ''}>
      </div>`
    ).join('');

    track.scrollLeft = 0;
    updateCounter();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Bind gallery item clicks
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const idx = parseInt(trigger.dataset.galleryIndex, 10);
      openLightbox(idx);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', closeLightbox);

  // Tap anywhere that isn't the photo or an interactive control closes the lightbox.
  // Listens at the lightbox root so it catches clicks on any non-image area —
  // header, info, padding, nav buttons' surrounding space, etc.
  // Guard: only close when the lightbox is actually active (prevents close from
  // firing during the open click on touch devices where touch events bubble).
  lightbox.addEventListener('click', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.target.closest('img')) return;
    if (e.target.closest('button')) return;
    closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
    if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
  });

  track.addEventListener('scroll', handleScroll, { passive: true });

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  // Handle resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (lightbox.classList.contains('active')) {
        goTo(currentIndex);
      }
    }, 150);
  });
}
