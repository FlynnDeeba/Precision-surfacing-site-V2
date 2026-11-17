/* Facebook landing page: surface pre-select, sticky bar, one-screen quote form */
(function () {
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };

  /* ---- chips ---- */
  function press(chip, on) { chip.setAttribute('aria-pressed', on ? 'true' : 'false'); }
  $$('#lpSurf .lp-chip').forEach(function (c) {
    c.addEventListener('click', function () {
      var on = c.getAttribute('aria-pressed') !== 'true';
      if (c.classList.contains('any')) {
        $$('#lpSurf .lp-chip').forEach(function (x) { press(x, false); });
      } else {
        press($('#lpSurf .lp-chip.any'), false);
      }
      press(c, on);
      $('#lpSurf').classList.remove('err');
    });
  });
  $$('#lpTime .lp-chip').forEach(function (c) {
    c.addEventListener('click', function () {
      var on = c.getAttribute('aria-pressed') !== 'true';
      $$('#lpTime .lp-chip').forEach(function (x) { press(x, false); });
      press(c, on);
    });
  });

  /* tapping a surface card or hero photo pre-selects it in the form */
  $$('[data-pick]').forEach(function (a) {
    a.addEventListener('click', function () {
      var chip = $$('#lpSurf .lp-chip').filter(function (c) { return c.dataset.val === a.dataset.pick; })[0];
      if (chip && chip.getAttribute('aria-pressed') !== 'true') chip.click();
    });
  });

  /* ---- sticky call / quote bar (phones): on after the hero, off while the form is on screen ---- */
  var sticky = $('#lpSticky'), hero = $('.lp-hero'), quote = $('#quote');
  if (sticky && hero && quote && 'IntersectionObserver' in window) {
    var pastHero = false, formVisible = false;
    function sync() {
      var on = pastHero && !formVisible;
      sticky.classList.toggle('on', on);
      sticky.setAttribute('aria-hidden', on ? 'false' : 'true');
      $$('a', sticky).forEach(function (a) { a.tabIndex = on ? 0 : -1; });
    }
    new IntersectionObserver(function (e) { pastHero = !e[0].isIntersecting; sync(); }, { threshold: 0.15 }).observe(hero);
    new IntersectionObserver(function (e) { formVisible = e[0].isIntersecting; sync(); }).observe(quote);
  }

  /* ---- form ---- */
  var form = $('#lpForm');
  if (!form) return;
  var btn = $('.lp-submit', form);
  var label = btn.firstChild.textContent;

  function val(n) { return (form.elements[n].value || '').trim(); }
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function setErr(id, on) { $('#' + id).classList.toggle('err', on); return !on; }
  $$('input', form).forEach(function (i) {
    i.addEventListener('input', function () { var f = i.closest('.lp-f'); if (f) f.classList.remove('err'); });
  });

  /* where the visit came from, so leads from the ads can be told apart */
  function source() {
    var p = new URLSearchParams(location.search), bits = ['Landing page ' + location.pathname];
    ['utm_source', 'utm_campaign', 'utm_content'].forEach(function (k) { if (p.get(k)) bits.push(k.replace('utm_', '') + ': ' + p.get(k)); });
    if (p.get('fbclid')) bits.push('Facebook click');
    return bits.join(' · ');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var surfaces = $$('#lpSurf .lp-chip[aria-pressed="true"]').map(function (c) { return c.dataset.val; });
    var time = $('#lpTime .lp-chip[aria-pressed="true"]');
    var ok = true;
    if (!surfaces.length) { $('#lpSurf').classList.add('err'); ok = false; }
    if (!setErr('lf-name', !val('name'))) ok = false;
    if (!setErr('lf-phone', !val('phone'))) ok = false;
    if (!setErr('lf-pc', !val('postcode'))) ok = false;
    if (!setErr('lf-email', !validEmail(val('email')))) ok = false;
    if (!ok) {
      var first = $('.err', form);
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    var data = {
      service: surfaces, application: 'Driveway', timeline: time ? time.dataset.val : '',
      name: val('name'), phone: val('phone'), postcode: val('postcode'), email: val('email'),
      notes: '', source: source(), company: $('#lpHp').value
    };
    btn.disabled = true; btn.firstChild.textContent = 'Sending… ';
    $('#lpErr').hidden = true;
    fetch('/.netlify/functions/submit-lead', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    }).then(function (r) { return r.ok; }).catch(function () { return false; })
      .then(function (sent) {
        /* the thank-you page fires the Google Ads conversion */
        if (sent) { location.href = '/thank-you/'; return; }
        btn.disabled = false; btn.firstChild.textContent = label;
        $('#lpErr').hidden = false;
      });
  });
})();
