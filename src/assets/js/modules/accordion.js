/**
 * Accordion Module
 * Handles benefits accordion toggle functionality (mobile only)
 */

export function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  if (!accordionHeaders.length) {
    console.warn('Accordion headers not found');
    return;
  }

  /**
   * Toggle accordion item
   * @param {HTMLElement} header - The accordion header element
   */
  function toggleAccordion(header) {
    const item = header.parentElement;
    const wasActive = item.classList.contains('active');

    // Close all accordion items
    document.querySelectorAll('.accordion-item').forEach(accordionItem => {
      accordionItem.classList.remove('active');
    });

    // Open clicked item if it wasn't active
    if (!wasActive) {
      item.classList.add('active');
    }
  }

  // Add click listeners to all accordion headers
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      toggleAccordion(header);
    });
  });
}
