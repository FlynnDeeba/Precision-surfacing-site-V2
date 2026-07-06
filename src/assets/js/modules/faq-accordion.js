/**
 * FAQ Accordion Module
 * Handles expanding/collapsing FAQ items.
 *
 * Uses delegated click handling at the accordion root so it works regardless
 * of where the trigger nested SVG/span the user actually clicks on.
 */

export function initFaqAccordion() {
  const accordion = document.getElementById('faqAccordion');
  if (!accordion) return;

  accordion.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-faq-trigger]');
    if (!trigger || !accordion.contains(trigger)) return;

    const item = trigger.closest('[data-faq-item]');
    if (!item) return;

    const content = item.querySelector('[data-faq-content]');
    if (!content) return;

    const isActive = item.getAttribute('data-active') === 'true';

    // Close all other items (accordion behavior - only one open at a time)
    accordion.querySelectorAll('[data-faq-item]').forEach((otherItem) => {
      if (otherItem === item) return;
      otherItem.setAttribute('data-active', 'false');
      const otherTrigger = otherItem.querySelector('[data-faq-trigger]');
      const otherContent = otherItem.querySelector('[data-faq-content]');
      if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
      if (otherContent) otherContent.style.maxHeight = '0px';
    });

    // Toggle current item
    if (isActive) {
      item.setAttribute('data-active', 'false');
      trigger.setAttribute('aria-expanded', 'false');
      content.style.maxHeight = '0px';
    } else {
      item.setAttribute('data-active', 'true');
      trigger.setAttribute('aria-expanded', 'true');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
}
