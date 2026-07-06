/* Service pages — builds the gallery mosaic, finish swatches and lightbox.
   Data is injected per page:  window.WORK = [{blend,title,place,wide}], window.FINISHES = [[blend,name,note], ...]
   (Menu, nav and reveals are handled globally by precision.js.) */
(function () {
  var work = window.WORK || [];
  var finishes = window.FINISHES || [];

  function fill(el, item) {
    if (item.img) { var im = document.createElement('img'); im.src = item.img; im.alt = item.title + ', ' + item.place; el.appendChild(im); }
    else { var d = document.createElement('div'); d.className = 'ph resin ' + item.blend; el.appendChild(d); }
  }

  /* ---- mosaic ---- */
  var m = document.getElementById('mosaic');
  function makeTile(item, i, ar) {
    var t = document.createElement('button');
    t.className = 'tile'; t.type = 'button';
    if (ar) t.style.aspectRatio = ar;
    t.setAttribute('aria-label', 'View ' + item.title + ', ' + item.place);
    fill(t, item);
    t.insertAdjacentHTML('beforeend', '<span class="exp"><svg viewBox="0 0 24 24"><path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5"/></svg></span><span class="cap">' + item.place + '</span>');
    t.addEventListener('click', function () { openLB(i); });
    return t;
  }
  if (m && window.WORK_LAYOUT === 'stack') {
    /* single full-width column of wide cover images. Tiles are appended straight
       to the mosaic (block layout, explicit CSS height) — no flex/aspect-ratio,
       so they can't collapse. */
    m.classList.add('stack');
    work.forEach(function (item, i) { m.appendChild(makeTile(item, i, '')); });
  } else if (m) {
    /* two staggered columns */
    var colL = document.createElement('div'); colL.className = 'mcol left';
    var colR = document.createElement('div'); colR.className = 'mcol right';
    work.forEach(function (item, i) {
      (i % 2 === 0 ? colL : colR).appendChild(makeTile(item, i, item.wide ? '4 / 5' : '3 / 4'));
    });
    m.appendChild(colL); m.appendChild(colR);
  }

  /* ---- lightbox — swipes within ONE project's image set, not across projects ---- */
  var lb = document.getElementById('lb'), frame = document.getElementById('lbFrame');
  var lbPrev = document.getElementById('lbPrev'), lbNext = document.getElementById('lbNext');
  var cur = 0, sub = 0, gal = null;   // cur = project index, sub = image index within it, gal = that project's images
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function galleryOf(item) {
    if (item.images && item.images.length) return item.images;
    if (item.img) return [item.img];
    return null;                       // swatch-only project (block paving / gravel)
  }
  function render() {
    if (!frame) return;
    var item = work[cur];
    frame.innerHTML = '';
    if (gal) {
      var im = document.createElement('img');
      im.src = gal[sub]; im.alt = item.title + ', ' + item.place; frame.appendChild(im);
      document.getElementById('lbCount').textContent = pad(sub + 1) + ' / ' + pad(gal.length);
    } else {
      fill(frame, item);
      document.getElementById('lbCount').textContent = '01 / 01';
    }
    document.getElementById('lbTitle').textContent = item.title;
    document.getElementById('lbPlace').textContent = item.place;
    var multi = !!(gal && gal.length > 1);   // hide arrows for single-image sets
    if (lbPrev) lbPrev.style.display = multi ? '' : 'none';
    if (lbNext) lbNext.style.display = multi ? '' : 'none';
  }
  window.openLB = function (i) {
    if (!lb) return;
    cur = i; gal = galleryOf(work[i]);
    sub = gal ? Math.max(0, gal.indexOf(work[i].img)) : 0;   // open on the cover image
    lb.classList.toggle('is-portrait', !!work[i].portrait);  // show tall images uncropped
    render(); lb.classList.add('open'); document.body.style.overflow = 'hidden';
  };
  function closeLB() { if (!lb) return; lb.classList.remove('open'); document.body.style.overflow = ''; }
  function step(d) { if (gal && gal.length) { sub = (sub + d + gal.length) % gal.length; render(); } }
  if (lb) {
    var x = document.getElementById('lbX');
    if (x) x.addEventListener('click', closeLB);
    if (lbPrev) lbPrev.addEventListener('click', function () { step(-1); });
    if (lbNext) lbNext.addEventListener('click', function () { step(1); });
    /* click anywhere outside the image (or the buttons) closes the lightbox */
    lb.addEventListener('click', function (e) {
      if (!e.target.closest('.lb-frame') && !e.target.closest('button')) closeLB();
    });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLB();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
    /* swipe left/right to move between this project's images */
    var tx = 0;
    lb.addEventListener('touchstart', function (e) { tx = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  /* ---- finish swatches ---- */
  var sw = document.getElementById('swatches');
  if (sw) {
    finishes.forEach(function (f, i) {
      var b = document.createElement('button');
      b.className = 'sw rv' + (i === 0 ? ' active' : ''); b.type = 'button';
      var chip = f[3]
        ? '<div class="chip photo"><img src="' + f[3] + '" alt="' + f[1] + ' finish" loading="lazy" decoding="async"></div>'
        : '<div class="chip resin ' + f[0] + '"></div>';
      b.innerHTML = chip + '<div class="nm"><b>' + f[1] + '</b><i>' + f[2] + '</i></div>';
      b.addEventListener('click', function () {
        sw.querySelectorAll('.sw').forEach(function (z) { z.classList.remove('active'); });
        b.classList.add('active');
      });
      sw.appendChild(b);
      if (window.PS && window.PS.reveal) window.PS.reveal(b);
    });
  }

  /* ---- FAQ accordion: opening one closes the rest ---- */
  var faqEls = document.querySelectorAll('.faqs .faq');
  faqEls.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) faqEls.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });
})();
