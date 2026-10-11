/* Homepage — recent-work mosaic, lightbox and quote form.
   (Menu, nav, dropdown and reveals are handled globally by precision.js.) */
(function () {
  /* recent work — set img to a photo path to replace the texture placeholder */
  var work = [
    { img: null, blend: "tarmac",    title: "Silver Grey driveway", place: "Wells-next-the-Sea", ar: "3 / 4" },
    { img: null, blend: "gravel",    title: "Golden gravel path",   place: "Sheringham",         ar: "4 / 5" },
    { img: null, blend: "tex-block", title: "Block paved frontage", place: "Walsingham",         ar: "3 / 4" },
    { img: null, blend: "tarchip",   title: "Tar & chip drive",     place: "Thorpe Marriot",     ar: "4 / 5" },
    { img: null, blend: "gold",      title: "Resin driveway",       place: "Buxton",             ar: "3 / 4" }
  ];
  function fill(el, item) {
    if (item.img) { var im = document.createElement('img'); im.src = item.img; im.alt = item.title + ', ' + item.place; el.appendChild(im); }
    else { var d = document.createElement('div'); d.className = 'ph ' + (item.blend === 'tex-block' ? 'tex-block' : 'resin ' + item.blend); el.appendChild(d); }
  }
  var m = document.getElementById('mosaic');
  if (m) {
    work.forEach(function (item, i) {
      var t = document.createElement('button'); t.className = 'tile'; t.type = 'button';
      t.style.aspectRatio = item.ar || '3 / 4';
      t.setAttribute('aria-label', 'View ' + item.title + ', ' + item.place);
      fill(t, item);
      t.insertAdjacentHTML('beforeend', '<span class="cap"><span class="cap-place">' + item.place + '</span><span class="cap-title">' + item.title + '</span></span>');
      t.addEventListener('click', function () { openLB(i); });
      m.appendChild(t);
    });
  }

  /* lightbox */
  var lb = document.getElementById('lb'), frame = document.getElementById('lbFrame');
  var cur = 0;
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function render() {
    frame.innerHTML = ''; fill(frame, work[cur]);
    document.getElementById('lbTitle').textContent = work[cur].title;
    document.getElementById('lbPlace').textContent = work[cur].place;
    document.getElementById('lbCount').textContent = pad(cur + 1) + ' / ' + pad(work.length);
  }
  window.openLB = function (i) { if (!lb) return; cur = i; render(); lb.classList.add('open'); document.body.style.overflow = 'hidden'; };
  function closeLB() { if (!lb) return; lb.classList.remove('open'); document.body.style.overflow = ''; }
  if (lb) {
    document.getElementById('lbX').addEventListener('click', closeLB);
    document.getElementById('lbPrev').addEventListener('click', function () { cur = (cur - 1 + work.length) % work.length; render(); });
    document.getElementById('lbNext').addEventListener('click', function () { cur = (cur + 1) % work.length; render(); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLB(); });
    document.addEventListener('keydown', function (e) { if (lb.classList.contains('open') && e.key === 'Escape') closeLB(); });
  }

  /* hero slideshow — a slow cross-fade behind the headline. Only the first photo
     loads on paint; the others stream in lazily so the homepage isn't megabytes of
     images before it's usable. Each photo carries its own caption (data-cap) so a
     visitor can see what the surface is and where it was laid. */
  var slides = [].slice.call(document.querySelectorAll('.hero-media .hs-slide'));
  var cap = document.getElementById('heroCap'), dotWrap = document.getElementById('heroDots');
  function loadSlide(el){ if (el && el.dataset.src){ el.src = el.dataset.src; el.removeAttribute('data-src'); } }
  if (slides.length) {
    var si = 0, dots = [], timer = null;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function show(i) {
      slides[si].classList.remove('is-active');
      si = (i + slides.length) % slides.length;
      loadSlide(slides[si]);
      loadSlide(slides[(si + 1) % slides.length]);     // the next one is ready before it's needed
      slides[si].classList.add('is-active');
      if (cap && slides[si].dataset.cap) cap.textContent = slides[si].dataset.cap;
      dots.forEach(function (d, n) { d.setAttribute('aria-selected', n === si ? 'true' : 'false'); });
    }
    function start() { if (!reduce && slides.length > 1) { clearInterval(timer); timer = setInterval(function () { show(si + 1); }, 6000); } }

    if (dotWrap && slides.length > 1) {
      slides.forEach(function (s, n) {
        var d = document.createElement('button');
        d.type = 'button'; d.setAttribute('role', 'tab');
        d.setAttribute('aria-selected', n === 0 ? 'true' : 'false');
        d.setAttribute('aria-label', s.dataset.cap || ('Photo ' + (n + 1)));
        d.addEventListener('click', function () { show(n); start(); });   // tapping restarts the clock
        dotWrap.appendChild(d); dots.push(d);
      });
    }

    /* Swipe left/right across the hero to move between photos. Only acts on a
       clearly horizontal drag, so it never fights with scrolling down the page. */
    var hero = document.querySelector('.hero--full');
    if (hero && slides.length > 1) {
      var tx = 0, ty = 0;
      hero.addEventListener('touchstart', function (e) {
        tx = e.changedTouches[0].clientX; ty = e.changedTouches[0].clientY;
      }, { passive: true });
      hero.addEventListener('touchend', function (e) {
        var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
        if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;   // a scroll, not a swipe
        show(si + (dx < 0 ? 1 : -1));
        start();                                                        // restart the clock
      }, { passive: true });
    }

    loadSlide(slides[1]);
    start();
    /* once the page is loaded, quietly pull in the rest so they're cached */
    window.addEventListener('load', function () {
      var idle = window.requestIdleCallback || function (f) { setTimeout(f, 800); };
      idle(function () { slides.forEach(function (s, i) { setTimeout(function () { loadSlide(s); }, i * 250); }); });
    });
  }

  /* "Who we are" figures count up the first time they scroll into view. The final
     value lives in the markup, so with no JS (or with reduced motion on) it simply
     shows as written. Any prefix/suffix — £, m, hr — is kept and only the number runs. */
  var figs = [].slice.call(document.querySelectorAll('.facts .fig'));
  if (figs.length) {
    var noMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var parsed = figs.map(function (el) {
      var m = /^(\D*)(\d+)(.*)$/.exec(el.textContent.trim());
      return m ? { el: el, pre: m[1], to: parseInt(m[2], 10), post: m[3] } : null;
    }).filter(Boolean);

    function run(f) {
      if (noMotion || f.to === 0) return;              // nothing to count to
      var dur = 900 + Math.min(f.to, 30) * 12, start = 0;
      f.el.textContent = f.pre + '0' + f.post;
      requestAnimationFrame(function tick(now) {
        if (!start) start = now;
        var p = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);            // easeOutCubic — quick, then settles
        f.el.textContent = f.pre + Math.round(f.to * eased) + f.post;
        if (p < 1) requestAnimationFrame(tick);
      });
    }

    /* The list is watched as a whole and the figures then run one after another,
       in step with the rows fading in, so the sequence reads top to bottom. */
    var list = document.querySelector('.facts');
    if (list && 'IntersectionObserver' in window && !noMotion) {
      var fio = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        fio.disconnect();
        parsed.forEach(function (f, i) { setTimeout(function () { run(f); }, 260 + i * 320); });
      }, { threshold: 0.25 });
      fio.observe(list);
    }
  }

})();
