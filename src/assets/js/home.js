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

})();
