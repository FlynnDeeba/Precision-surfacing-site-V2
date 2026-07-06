/**
 * Benefits Reveal Module
 * Adds .in-view to .benefits-section when it enters the viewport,
 * triggering the staggered fadeUp + line reveal animations.
 */

export function initBenefitsReveal() {
  const section = document.getElementById('benefits');
  if (!section) return;

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      section.classList.add('in-view');
      observer.disconnect();
    }
  }, {
    threshold: 0.05
  });

  observer.observe(section);
}
