/**
 * Stat Counter — tickers up sequentially when scrolled into view
 */

export function initStatCounter() {
  const statsRow = document.querySelector('.home-about-stats');
  if (!statsRow) return;

  const stats = [...statsRow.querySelectorAll('.home-about-stat-value')];
  if (!stats.length) return;

  const parseValue = (text) => {
    const num = parseInt(text.replace(/\D/g, ''), 10);
    const suffix = text.replace(/\d/g, '').trim();
    return { num, suffix };
  };

  const animate = (el, target, suffix, duration = 1600) => {
    return new Promise((resolve) => {
      const start = performance.now();
      const update = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * target) + suffix;
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(update);
    });
  };

  // Store targets and zero out all values immediately
  const targets = stats.map((el) => {
    const parsed = parseValue(el.textContent);
    el.textContent = '0' + parsed.suffix;
    return parsed;
  });

  const runSequence = async () => {
    for (let i = 0; i < stats.length; i++) {
      await animate(stats[i], targets[i].num, targets[i].suffix);
    }
  };

  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    observer.disconnect();
    runSequence();
  }, { threshold: 0.5 });

  observer.observe(statsRow);
}
