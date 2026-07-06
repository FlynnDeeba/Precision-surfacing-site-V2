/**
 * Colour Carousel & Toggle Module
 * Handles dot indicators, group labels, and optional heritage/contemporary toggle
 */

export function initColourToggle() {
  const coloursSection = document.getElementById('coloursSection');
  if (!coloursSection) return;

  const toggleBtns = coloursSection.querySelectorAll('.toggle-btn');
  const groupLabel = document.getElementById('colourGroupLabel');

  // Wire up dots for each carousel
  const carousels = coloursSection.querySelectorAll('.colour-carousel');
  carousels.forEach(carousel => {
    const isHeritage = carousel.classList.contains('heritage-carousel');
    const isContemporary = carousel.classList.contains('contemporary-carousel');

    let dotsSelector = '.carousel-dots:not(.heritage-dots):not(.contemporary-dots) .carousel-dot';
    if (isHeritage) dotsSelector = '.heritage-dots .carousel-dot';
    if (isContemporary) dotsSelector = '.contemporary-dots .carousel-dot';

    const dots = coloursSection.querySelectorAll(dotsSelector);

    // Parse group names from data attribute
    const groups = carousel.dataset.groups ? JSON.parse(carousel.dataset.groups) : null;

    carousel.addEventListener('scroll', () => {
      const pageWidth = carousel.offsetWidth;
      if (pageWidth === 0) return;
      const activeIndex = Math.round(carousel.scrollLeft / pageWidth);

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
      });

      // Update group label
      if (groups && groupLabel) {
        groupLabel.textContent = groups[activeIndex] || '';
      }
    });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const page = parseInt(dot.dataset.page, 10);
        carousel.scrollTo({ left: page * carousel.offsetWidth, behavior: 'smooth' });
      });
    });
  });

  // Arrow buttons (desktop only — CSS hides on mobile)
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const mainCarousel = coloursSection.querySelector('.colour-carousel:not(.heritage-carousel):not(.contemporary-carousel)');
  if (prevBtn && nextBtn && mainCarousel) {
    prevBtn.addEventListener('click', () => {
      mainCarousel.scrollBy({ left: -mainCarousel.offsetWidth, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      mainCarousel.scrollBy({ left: mainCarousel.offsetWidth, behavior: 'smooth' });
    });
  }

  // Toggle logic (only if toggle buttons exist)
  if (toggleBtns.length > 0) {
    function resetDots(dotsSelector) {
      const dots = coloursSection.querySelectorAll(dotsSelector);
      dots.forEach((dot, i) => dot.classList.toggle('active', i === 0));
    }

    function setColourMode(mode) {
      if (mode === toggleBtns[1].textContent.toLowerCase()) {
        coloursSection.classList.add('contemporary');
      } else {
        coloursSection.classList.remove('contemporary');
      }

      carousels.forEach(c => c.scrollLeft = 0);
      resetDots('.heritage-dots .carousel-dot');
      resetDots('.contemporary-dots .carousel-dot');

      toggleBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === mode) {
          btn.classList.add('active');
        }
      });
    }

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        setColourMode(btn.textContent.toLowerCase());
      });
    });
  }
}
