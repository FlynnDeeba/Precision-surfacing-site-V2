/**
 * Form Focus Handler
 * Scrolls the form into view once on first field tap.
 * Uses double-rAF after iOS keyboard settles to override its correction scroll.
 */

export function initFormFocus() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const formInputs = form.querySelectorAll('input, textarea');
  if (!formInputs.length) return;

  const wrap = form.closest('.contact-form-wrap') || form;
  let hasScrolled = false;

  const scrollWrapToTop = () => {
    const rect = wrap.getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + rect.top - 80, behavior: 'instant' });
  };

  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      if (hasScrolled) return;
      hasScrolled = true;

      // Wait for keyboard to finish appearing, then override iOS's scroll
      setTimeout(() => {
        scrollWrapToTop();
        // Double rAF: fires after iOS applies its own correction, so we win
        requestAnimationFrame(() => {
          requestAnimationFrame(scrollWrapToTop);
        });
      }, 500);
    });

    // Reset when user leaves the form entirely
    input.addEventListener('blur', () => {
      setTimeout(() => {
        if (!form.contains(document.activeElement)) {
          hasScrolled = false;
        }
      }, 100);
    });
  });
}
