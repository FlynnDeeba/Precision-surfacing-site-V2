/**
 * Build Carousel Module
 * Handles the mobile swipe between layer diagram and process steps,
 * keeping the dot indicators in sync with scroll position and tap-to-jump.
 */

export function initBuildCarousel() {
  const carousel = document.querySelector('.build-carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.build-slide');
  const dots = document.querySelectorAll('.build-dot');
  if (!slides.length || !dots.length) return;

  // Tap dot → scroll to that slide
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const slide = slides[i];
      if (!slide) return;
      carousel.scrollTo({ left: slide.offsetLeft - carousel.offsetLeft, behavior: 'smooth' });
    });
  });

  // Update active dot based on scroll position
  let scrollTimer;
  carousel.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const idx = Math.round(carousel.scrollLeft / carousel.clientWidth);
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }, 50);
  });
}
