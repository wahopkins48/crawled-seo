const form = document.getElementById('ranking-form');
const status = document.getElementById('form-status');
form.noValidate = true;
const params = new URLSearchParams(location.search);
for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
  form.elements[key].value = params.get(key) || '';
}
form.elements.landing_page.value = location.href;

if (params.get('utm_source') && typeof window.gtag === 'function') {
  window.gtag('event', 'qr_scan', {
    campaign_source: params.get('utm_source'),
    campaign_medium: params.get('utm_medium') || '',
    campaign_name: params.get('utm_campaign') || '',
    campaign_content: params.get('utm_content') || '',
    campaign_term: params.get('utm_term') || ''
  });
}
const errors = {name:'I need a name to put on it.', business:'Business name is the one field I cannot look you up without.', town:'Pick the town you are closest to.', contact:'Add a phone number or an email so I can send it to you.'};
async function submitRankingCheck(event) {
  event.preventDefault();
  status.textContent = '';
  for (const key of Object.keys(errors)) {
    if (!form.elements[key].value.trim()) {
      status.textContent = errors[key]; form.elements[key].focus(); return;
    }
  }
  const endpoint = form.action;
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    const response = await fetch(endpoint, {method:'POST', body:new FormData(form), headers:{Accept:'application/json'}, signal:controller.signal});
    clearTimeout(timeout);
    if (!response.ok) throw new Error('Submission failed');
    if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', {form_name:'free_ranking_check'});
    form.hidden = true;
    document.getElementById('success').hidden = false;
  } catch {
    status.textContent = 'The quick submit was blocked. Opening the secure form confirmation…';
    form.removeEventListener('submit', submitRankingCheck);
    form.submit();
  } finally { button.disabled = false; }
}
form.addEventListener('submit', submitRankingCheck);
const bar = document.getElementById('sticky-bar');
const observer = new IntersectionObserver(([entry]) => { bar.hidden = entry.isIntersecting; }, {threshold:0});
observer.observe(document.querySelector('.hero'));
