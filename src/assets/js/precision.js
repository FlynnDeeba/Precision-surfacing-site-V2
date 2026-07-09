/* Precision Surfacing — shared chrome behaviour (loaded on every page) */
(function () {
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };

  /* ---- slide-out menu ---- */
  var menu = $('#menu'), burger = $('#burger'), mClose = $('#menuClose'), mScrim = $('#menuScrim');
  function openMenu() { if (menu) { menu.classList.add('open'); if (burger) burger.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; } }
  function closeMenu() { if (menu) { menu.classList.remove('open'); if (burger) burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; } }
  if (burger) burger.addEventListener('click', openMenu);
  if (mClose) mClose.addEventListener('click', closeMenu);
  if (mScrim) mScrim.addEventListener('click', closeMenu);

  /* in-page smooth scroll for [data-go] links (homepage) + close menu */
  $$('[data-go]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var sel = a.getAttribute('data-go');
      var target = document.querySelector('.' + sel) || document.getElementById(sel);
      if (target) {
        e.preventDefault();
        var wasOpen = menu && menu.classList.contains('open');
        closeMenu();
        setTimeout(function () { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, wasOpen ? 340 : 0);
      }
    });
  });

  /* ---- desktop nav dropdown ---- */
  var nd = $('.navdrop'), ndBtn = $('.navdrop-btn');
  if (nd && ndBtn) {
    ndBtn.addEventListener('click', function (e) { e.stopPropagation(); var open = nd.classList.toggle('open'); ndBtn.setAttribute('aria-expanded', open ? 'true' : 'false'); });
    document.addEventListener('click', function () { nd.classList.remove('open'); ndBtn.setAttribute('aria-expanded', 'false'); });
  }

  /* ---- nav bar: transparent over hero, reveal on scroll-up, adaptive burger ---- */
  var topnav = $('.sitebar'), hasHero = !!($('.hero') || $('.simple-head') || $('.art-hero') || $('.gal-head'));
  var burgerBtn = burger; // #burger
  var themed = $$('[data-theme]');
  /* On mobile the burger is the only nav element — flip it dark/light to stay
     legible against whichever section currently sits behind it. */
  function updateBurgerTheme() {
    if (!burgerBtn || !themed.length) return;
    var navY = 36, light = false;
    for (var i = 0; i < themed.length; i++) {
      var r = themed[i].getBoundingClientRect();
      if (r.top <= navY && r.bottom > navY) { light = themed[i].getAttribute('data-theme') === 'light'; break; }
    }
    burgerBtn.classList.toggle('on-light', light);
  }
  if (topnav) {
    if (hasHero) topnav.classList.add('has-hero'); // enables the transparent mobile bar
    var lastY = window.pageYOffset || 0, thresh = 70;
    var onScroll = function () {
      var y = window.pageYOffset || 0;
      if (!hasHero || y > thresh) topnav.classList.add('scrolled'); // desktop solid bar
      else topnav.classList.remove('scrolled');
      if (hasHero) {
        topnav.classList.toggle('past-top', y > 60); // hides the logo on mobile
        if (y > thresh && y > lastY + 4) topnav.classList.add('nav-hidden');
        else if (y < lastY - 4 || y <= thresh) topnav.classList.remove('nav-hidden');
        updateBurgerTheme();
      }
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    if (hasHero) window.addEventListener('resize', updateBurgerTheme, { passive: true });
    onScroll();
  }

  /* ---- scroll reveals ---- */
  var io = null;
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach(function (el) { io.observe(el); });
  } else {
    $$('.rv').forEach(function (el) { el.classList.add('in'); });
  }
  /* Page scripts add .rv elements (swatches etc.) after this runs — let them
     register those so they reveal too instead of staying at opacity 0. */
  function reveal(el) { if (io) io.observe(el); else el.classList.add('in'); }

  /* ---- Escape closes menu ---- */
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  // expose for page scripts
  window.PS = { openMenu: openMenu, closeMenu: closeMenu, reveal: reveal };
})();
