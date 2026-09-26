/* No form values, raw URLs, fragments or arbitrary UTM strings enter analytics. */
(() => {
  'use strict';
  if (window.CrawledMeasurement) return;
  const config = window.CrawledConfig;
  if (!config) return;
  const origin = 'https://crawledseo.com';
  const safePath = value => {
    const path = String(value || '').replace(/\/index\.html$/, '/');
    const candidate = path.endsWith('/') ? path : path + '/';
    return config.approvedPaths.includes(candidate) ? candidate : '/404/';
  };
  const currentPath = safePath(location.pathname);
  const key = 'crawled-attribution-v1';
  function sanitize(record) {
    const clean = {};
    if (!record || typeof record !== 'object') return clean;
    for (const [name, allowed] of Object.entries(config.campaigns)) {
      if (allowed.includes(record[name])) clean[name] = record[name];
    }
    if (config.approvedPaths.includes(record.landing_page)) clean.landing_page = record.landing_page;
    return clean;
  }
  const privacySignal = navigator.globalPrivacyControl === true || navigator.doNotTrack === '1';
  let first = {};
  try { first = sanitize(JSON.parse(sessionStorage.getItem(key))); } catch {}
  const incoming = sanitize(Object.fromEntries(new URLSearchParams(location.search)));
  // Capture first recognized campaign; an untagged navigation cannot overwrite it.
  if (!first.utm_source && incoming.utm_source) first = { ...incoming, landing_page: currentPath };
  if (!first.landing_page) first.landing_page = currentPath;
  if (privacySignal) {
    first = { landing_page: currentPath };
    try { sessionStorage.removeItem(key); } catch {}
  } else {
    try { sessionStorage.setItem(key, JSON.stringify(first)); } catch {}
  }
  const audience = ['local', 'software'].includes(document.body.dataset.audience) ? document.body.dataset.audience : 'general';
  const ids = audience === 'local' ? config.localAnalyticsIds : config.defaultAnalyticsIds;
  let permitted = false;
  let initialized = false;
  try { permitted = localStorage.getItem('crawled-analytics') === 'granted' && !privacySignal; } catch {}
  const production = ['crawledseo.com', 'www.crawledseo.com'].includes(location.hostname);
  function init() {
    if (!permitted || initialized || !production || !ids.length) return;
    initialized = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('set', {
      page_location: origin + currentPath, page_referrer: '',
      allow_google_signals: false, allow_ad_personalization_signals: false
    });
    for (const id of new Set(ids)) {
      window['ga-disable-' + id] = false;
      window.gtag('config', id, {
        send_page_view: false, page_location: origin + currentPath,
        page_referrer: '', allow_google_signals: false,
        allow_ad_personalization_signals: false
      });
    }
    window.gtag('event', 'page_view', {
      send_to: [...new Set(ids)], page_location: origin + currentPath,
      page_referrer: '', page_title: document.title
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ids[0];
    document.head.append(script);
  }
  function event(name, parameters) {
    if (!permitted || !production || typeof window.gtag !== 'function') return;
    try {
      window.gtag('event', name, {
        ...parameters, send_to: [...new Set(ids)],
        page_location: origin + currentPath, page_referrer: ''
      });
    } catch {}
  }
  function attach(form) {
    const fields = { ...first, submission_page: currentPath };
    // Never leave old untrusted metadata in a form.
    for (const name of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'landing_page', 'submission_page']) {
      let input = form.querySelector('input[type="hidden"][name="' + name + '"]');
      if (!input) { input = document.createElement('input'); input.type = 'hidden'; input.name = name; form.append(input); }
      input.value = fields[name] || '';
    }
  }
  const counted = new WeakSet();
  window.CrawledMeasurement = {
    attach,
    lead(form) {
      if (counted.has(form)) return;
      counted.add(form);
      event('generate_lead', {
        form_name: form.dataset.formName, audience: form.dataset.audience || 'general', ...first
      });
    }
  };
  document.querySelectorAll('form[data-form-name]').forEach(attach);
  document.addEventListener('click', e => {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    if (anchor.getAttribute('href')?.startsWith('tel:')) event('click_phone', { audience, source_page: currentPath });
    else if (anchor.pathname === '/book' || anchor.hostname === 'calendly.com') event('click_book_call', { audience, source_page: currentPath });
  });
  const buttons = document.querySelectorAll('[data-analytics-toggle]');
  function refresh() {
    buttons.forEach(button => {
      button.hidden = false;
      button.textContent = permitted ? 'Turn off analytics' : 'Allow optional usage analytics';
      button.setAttribute('aria-pressed', String(permitted));
      if (privacySignal) { button.disabled = true; button.textContent = 'Analytics off: browser privacy signal'; }
    });
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    permitted = !permitted;
    try { localStorage.setItem('crawled-analytics', permitted ? 'granted' : 'denied'); } catch {}
    for (const id of ids) window['ga-disable-' + id] = !permitted;
    if (permitted) init();
    refresh();
  }));
  refresh();
  init();
})();
