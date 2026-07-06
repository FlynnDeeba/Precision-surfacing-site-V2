/**
 * Mobile Menu Module
 * Handles burger menu and slide-out menu functionality
 */

export function initMobileMenu() {
  const burger = document.getElementById('burgerMenu');
  const slideMenu = document.getElementById('slideMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuClose = document.getElementById('menuClose');
  const menuLinks = document.querySelectorAll('.slide-menu-link, .slide-menu-header-title, .slide-menu-action');

  if (!burger || !slideMenu || !menuOverlay) {
    console.warn('Mobile menu elements not found');
    return;
  }

  /**
   * Open the mobile menu
   */
  function openMenu() {
    slideMenu.classList.add('active');
    menuOverlay.classList.add('active');
    burger.classList.add('active');
    document.body.classList.add('menu-open');
  }

  /**
   * Close the mobile menu
   */
  function closeMenu() {
    slideMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    burger.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  // Toggle menu on burger click
  burger.addEventListener('click', () => {
    if (slideMenu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu on overlay click
  menuOverlay.addEventListener('click', closeMenu);

  // Close menu on close button click
  if (menuClose) {
    menuClose.addEventListener('click', closeMenu);
  }

  // Close menu on link click (with slight delay for UX)
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(closeMenu, 150);
    });
  });
}
