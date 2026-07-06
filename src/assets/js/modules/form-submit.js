/**
 * Form Submit Module
 * Handles AJAX submission to Netlify Forms and shows inline success state.
 */

export function initFormSubmit() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('.form-submit');
    const btnSpan = btn.querySelector('span');

    btn.disabled = true;
    btnSpan.textContent = 'Sending...';

    try {
      const body = new URLSearchParams(new FormData(form)).toString();

      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });

      if (!res.ok) throw new Error('Submission failed');

      // Hide form + headline, reveal success state
      const wrap = form.closest('.contact-form-wrap');
      const top = document.querySelector('.contact-top');
      const success = document.querySelector('.contact-success');
      if (wrap) wrap.style.display = 'none';
      if (top) top.style.display = 'none';
      if (success) success.removeAttribute('hidden');

    } catch {
      btn.disabled = false;
      btnSpan.textContent = 'Get My Free Quote';

      const errEl = form.querySelector('.form-error');
      if (errEl) errEl.removeAttribute('hidden');
    }
  });
}
