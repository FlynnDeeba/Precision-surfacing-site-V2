/**
 * Section Observer Module
 * Adds/removes hero-active class on burger when hero image is in view
 */

export function initSectionObserver() {
  const burger = document.getElementById('burgerMenu');
  const mobileLogo = document.getElementById('mobileNavLogo');
  const heroImage = document.querySelector('.hero-image');

  if (!burger || !heroImage) return;

  const observer = new IntersectionObserver(([entry]) => {
    burger.classList.toggle('hero-active', entry.isIntersecting);
    if (mobileLogo) {
      mobileLogo.classList.toggle('hero-active', entry.isIntersecting);
    }
  }, {
    threshold: 0.05
  });

  observer.observe(heroImage);
}
