/**
 * Block Modal Module
 * Handles lightbox display when clicking block cards (block paving)
 */

export function initBlockModal() {
  const modal = document.getElementById('blockModal');
  if (!modal) return;

  const modalOverlay = modal.querySelector('.block-modal-overlay');
  const modalClose = modal.querySelector('.block-modal-close');
  const modalBg = modal.querySelector('.block-modal-bg');
  const modalImg = modal.querySelector('.block-modal-img');
  const modalName = modal.querySelector('.block-modal-name');
  const modalDescription = modal.querySelector('.block-modal-description');
  const cards = document.querySelectorAll('.block-card');

  // Open modal when clicking a block card
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const blockName = card.dataset.blockName;
      const blockDescription = card.dataset.blockDescription;
      const blockImage = card.dataset.blockImage;

      // Update modal content
      modalName.textContent = blockName;
      modalDescription.textContent = blockDescription;

      // Show image if available, otherwise use gradient
      if (blockImage && modalImg) {
        modalImg.src = blockImage;
        modalImg.alt = `${blockName} block paving sample`;
        modalImg.style.display = 'block';
        modalBg.style.display = 'none';
      } else {
        if (modalImg) {
          modalImg.style.display = 'none';
        }
        modalBg.style.display = 'block';
        const bgElement = card.querySelector('.block-bg');
        modalBg.style.background = bgElement.style.background;
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
