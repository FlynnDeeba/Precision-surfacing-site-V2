/**
 * Desktop Navigation Module
 * Handles scroll behavior: hide on scroll down, show on scroll up
 */

export function initNavigation() {
  const desktopNav = document.getElementById('desktopNav');

  if (!desktopNav) {
    console.warn('Desktop nav not found');
    return;
  }

  let lastScrollY = window.scrollY;
  let ticking = false;

  /**
   * Handle scroll behavior
   */
  function handleScroll() {
    const currentScrollY = window.scrollY;

    // Add/remove scrolled class for background
    if (currentScrollY > 50) {
      desktopNav.classList.add('scrolled');
    } else {
      desktopNav.classList.remove('scrolled');
    }

    // Hide/show based on scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down & past threshold - hide
      desktopNav.classList.add('hidden');
    } else {
      // Scrolling up - show
      desktopNav.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  /**
   * Request animation frame for smooth scroll handling
   */
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
      });
      ticking = true;
    }
  });
}
