/* Shared navigation; all page-specific elements are optional. */
(() => {
  'use strict';
  const header = document.querySelector('.brand-header');
  const toggle = header?.querySelector('.menu-toggle');
  const links = header?.querySelector('.brand-links');
  if (toggle && links) {
    header.classList.add('nav-enhanced');
    const close = (restore = false) => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      if (restore) toggle.focus();
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      links.classList.toggle('is-open', open);
    });
    header.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') close(true);
    });
    document.addEventListener('click', event => {
      if (!header.contains(event.target)) close();
      if (event.target.closest('.brand-links a')) close();
    });
    header.addEventListener('focusout', event => {
      if (!header.contains(event.relatedTarget)) close();
    });
    matchMedia('(min-width: 851px)').addEventListener('change', () => close());
  }
  window.toggleMenu = () => {
    const nav = document.querySelector('.navbar');
    const list = nav?.querySelector('.nav-links');
    const button = nav?.querySelector('.hamburger-icon');
    if (!list) return;
    list.classList.toggle('active');
    button?.setAttribute('aria-expanded', String(list.classList.contains('active')));
  };
})();
