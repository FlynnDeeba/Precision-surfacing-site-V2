/**
 * Colour Modal Module
 * Handles lightbox display when clicking colour swatches
 */

export function initColourModal() {
  const modal = document.getElementById('colourModal');
  if (!modal) return;

  const modalOverlay = modal.querySelector('.colour-modal-overlay');
  const modalClose = modal.querySelector('.colour-modal-close');
  const modalBg = modal.querySelector('.colour-modal-bg');
  const modalImg = modal.querySelector('.colour-modal-img');
  const swatches = document.querySelectorAll('.colour-swatch');

  // Open modal when clicking a swatch
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const colourName = swatch.dataset.colourName;
      const colourImage = swatch.dataset.colourImage;
      const bgElement = swatch.querySelector('.colour-swatch-bg');

      // Show image if available, otherwise use gradient class
      if (colourImage && modalImg) {
        modalImg.src = colourImage;
        modalImg.alt = `Resin bound ${colourName} aggregate sample`;
        modalImg.style.display = 'block';
        modalBg.style.display = 'none';
      } else {
        if (modalImg) {
          modalImg.style.display = 'none';
        }
        modalBg.style.display = 'block';
        const bgClass = bgElement.className.replace('colour-swatch-bg ', '').replace('colour-swatch-bg', '');
        modalBg.className = `colour-modal-bg ${bgClass}`;
      }

      // Show modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal functions
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}
