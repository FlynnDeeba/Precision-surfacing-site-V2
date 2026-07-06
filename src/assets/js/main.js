/**
 * Main JavaScript Entry Point
 * Imports and initializes all modules when DOM is ready
 */

// Disable browser scroll restoration so pages always load at the top
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Signal that JS is running — CSS reveal animations depend on this
document.documentElement.classList.add('js-ready');

import { initMobileMenu } from './modules/mobile-menu.js';
import { initNavigation } from './modules/navigation.js';
import { initAccordion } from './modules/accordion.js';
import { initColourToggle } from './modules/colour-toggle.js';
import { initColourModal } from './modules/colour-modal.js';
import { initBlocksToggle } from './modules/blocks-toggle.js';
import { initSectionObserver } from './modules/section-observer.js';
import { initCaseStudyModal } from './modules/case-study-modal.js';
import { initPhotoLightbox } from './modules/photo-lightbox.js';
import { initFormFocus } from './modules/form-focus.js';
import { initFormSubmit } from './modules/form-submit.js';
import { initCustomLightbox } from './modules/custom-lightbox.js';
import { initStatCounter } from './modules/stat-counter.js';
import { initBenefitsReveal } from './modules/benefits-reveal.js';
import { initBuildCarousel } from './modules/build-carousel.js';
import { initFaqAccordion } from './modules/faq-accordion.js';

/**
 * Initialize all modules
 */

function init() {
  try {
    initMobileMenu();
    initNavigation();

    initAccordion();
    initColourToggle();
    initColourModal();
    initBlocksToggle();
    initSectionObserver();
    initCaseStudyModal();
    initPhotoLightbox();
    initFormFocus();
    initFormSubmit();
    initCustomLightbox();
    initStatCounter();
    initBenefitsReveal();
    initBuildCarousel();
    initFaqAccordion();

    console.log('✅ All modules initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing modules:', error);
  }
}

// Wait for DOM to be ready before initializing
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOM is already loaded
  init();
}
