const form = document.getElementById('ranking-form');
const status = document.getElementById('form-status');
form.noValidate = true;
const params = new URLSearchParams(location.search);
for (const key of ['utm_source', 'utm_medium', 'utm_campaign']) {
  form.elements[key].value = params.get(key) || '';
}
const errors = {name:'I need a name to put on it.', business:'Business name is the one field I cannot look you up without.', town:'Pick the town you are closest to.', contact:'Add a phone number or an email so I can send it to you.'};
form.addEventListener('submit', async event => {
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
    const response = await fetch(endpoint, {method:'POST', body:new FormData(form), headers:{Accept:'application/json'}});
    if (!response.ok) throw new Error('Submission failed');
    form.hidden = true;
    document.getElementById('success').hidden = false;
  } catch {
    status.textContent = 'That did not go through. Email me at wesley@crawledseo.com and I will run it anyway.';
  } finally { button.disabled = false; }
});
const bar = document.getElementById('sticky-bar');
const observer = new IntersectionObserver(([entry]) => { bar.hidden = entry.isIntersecting; }, {threshold:0});
observer.observe(document.querySelector('.hero'));
