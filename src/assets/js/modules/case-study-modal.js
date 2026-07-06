/**
 * Case Study Modal Module
 * Handles the case study walkthrough carousel triggered from gallery
 */

export function initCaseStudyModal() {
  const modal = document.getElementById('caseStudyModal');
  if (!modal) return;

  const overlay = modal.querySelector('.case-study-overlay');
  const closeBtn = modal.querySelector('.case-study-close');
  const track = modal.querySelector('.case-study-track');
  const slides = modal.querySelectorAll('.case-study-slide');
  const counter = modal.querySelector('.case-study-counter');
  const progressFill = modal.querySelector('.case-study-progress-fill');
  const trigger = document.querySelector('.gallery-item[data-case-study]');
  const prevBtn = modal.querySelector('.case-study-prev');
  const nextBtn = modal.querySelector('.case-study-next');

  const totalSteps = slides.length;
  let currentStep = 0;

  function updateProgress() {
    counter.innerHTML = `Step <strong>${currentStep + 1}</strong> of ${totalSteps}`;
    const pct = ((currentStep + 1) / totalSteps) * 100;
    progressFill.style.width = `${pct}%`;
  }

  function handleScroll() {
    const scrollLeft = track.scrollLeft;
    const slideWidth = track.offsetWidth;
    const newStep = Math.round(scrollLeft / slideWidth);
    if (newStep !== currentStep && newStep >= 0 && newStep < totalSteps) {
      currentStep = newStep;
      updateProgress();
    }
  }

  function goToStep(index) {
    const clamped = Math.max(0, Math.min(index, totalSteps - 1));
    track.scrollTo({
      left: clamped * track.offsetWidth,
      behavior: 'smooth'
    });
  }

  function openModal() {
    currentStep = 0;
    track.scrollLeft = 0;
    updateProgress();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (trigger) {
    trigger.addEventListener('click', openModal);
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') goToStep(currentStep + 1);
    if (e.key === 'ArrowLeft') goToStep(currentStep - 1);
  });

  track.addEventListener('scroll', handleScroll, { passive: true });

  if (prevBtn) prevBtn.addEventListener('click', () => goToStep(currentStep - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToStep(currentStep + 1));

  // Handle resize (e.g. phone rotation)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (modal.classList.contains('active')) {
        goToStep(currentStep);
      }
    }, 150);
  });
}
