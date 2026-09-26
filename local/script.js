/* Hide the optional shortcut near the form or footer, including keyboard use. */
(() => {
  const bar = document.getElementById('sticky-bar');
  const hero = document.querySelector('.hero');
  const form = document.getElementById('ranking-check');
  if (!bar || !hero || !form || !window.IntersectionObserver) return;
  let heroVisible = true, formVisible = false;
  const refresh = () => { bar.hidden = heroVisible || formVisible || form.contains(document.activeElement); };
  new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.target === hero) heroVisible = entry.isIntersecting;
      else formVisible = entry.isIntersecting || entry.boundingClientRect.bottom < 0;
    });
    refresh();
  }).observe(hero);
  const formObserver = new IntersectionObserver(([entry]) => {
    formVisible = entry.isIntersecting || entry.boundingClientRect.bottom < 0;
    refresh();
  });
  formObserver.observe(form);
  document.addEventListener('focusin', refresh);
})();
