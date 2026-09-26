/* Progressive Formspree enhancement. Never retry an ambiguous POST automatically. */
(() => {
  'use strict';
  const receipts = {
    general_contact: 'Your inquiry was received. Wesley will reply using the contact details you provided.',
    visibility_audit: 'Your visibility audit request was received. Wesley will send your audit within 24 hours. No call is required.',
    software_roadmap: 'Your software visibility audit request was received. Wesley will send your audit within 24 hours. No call is required.',
    free_ranking_check: 'Your ranking check request was received. Wesley will send your two-page PDF within two days using the contact details you provided.'
  };
  const ambiguous = 'We could not confirm receipt. Your details are still here. We have not sent another request. Call or email Wesley to check, or choose to try again; a retry could create a duplicate.';
  const validContact = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
    (/^\+?[\d\s().-]+$/.test(value) && value.replace(/\D/g, '').length >= 7 && value.replace(/\D/g, '').length <= 15);

  document.querySelectorAll('form[data-form-name]').forEach(form => {
    if (!window.fetch || !window.AbortController) return;
    const status = form.querySelector('[data-form-status]');
    const button = form.querySelector('[type="submit"]');
    if (!status || !button) return;
    form.noValidate = true;
    let busy = false;
    let accepted = false;
    const originalLabel = button.textContent;
    const controls = Array.from(form.elements).filter(field => field.matches('input:not([type="hidden"]), textarea, select'));
    controls.forEach(field => {
      const error = document.createElement('span');
      error.className = 'field-error';
      error.id = field.id + '-error';
      field.insertAdjacentElement('afterend', error);
      field.setAttribute('aria-describedby', [field.getAttribute('aria-describedby'), error.id].filter(Boolean).join(' '));
      field.addEventListener('input', () => {
        field.setCustomValidity('');
        field.removeAttribute('aria-invalid');
        error.textContent = '';
      });
    });
    function show(message, state) {
      status.dataset.state = state;
      status.textContent = message;
    }
    function fieldError(field, message) {
      field.setAttribute('aria-invalid', 'true');
      document.getElementById(field.id + '-error').textContent = message;
    }
    function validate() {
      let first = null;
      controls.forEach(field => {
        field.setCustomValidity('');
        field.removeAttribute('aria-invalid');
        document.getElementById(field.id + '-error').textContent = '';
        let message = '';
        if (field.required && !field.value.trim()) message = 'Please enter ' + (field.labels?.[0]?.textContent.toLowerCase().replace(/\bi\b/g, 'I') || 'this field') + '.';
        if (field.value.trim() && field.hasAttribute('data-website')) {
          let value = field.value.trim();
          if (!/^[a-z][a-z0-9+.-]*:/i.test(value)) value = 'https://' + value;
          try {
            const url = new URL(value);
            if (!['http:', 'https:'].includes(url.protocol) || !url.hostname.includes('.') || /\s/.test(value) || url.username || url.password) throw new Error();
            field.value = url.href;
          } catch { message = 'Enter a website such as example.com, using http or https.'; }
        }
        if (field.value.trim() && field.hasAttribute('data-contact') && !validContact(field.value.trim())) message = 'Enter an email such as you@example.com or a phone number such as +1 (256) 335-3979.';
        if (!message && !field.validity.valid) message = field.type === 'email' ? 'Enter an email such as you@example.com.' : field.validationMessage;
        if (message) {
          fieldError(field, message);
          first ||= field;
        }
      });
      if (first) {
        show('Please check the highlighted fields. Nothing has been sent.', 'error');
        first.focus();
      }
      return !first;
    }
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (busy || accepted || !validate()) return;
      busy = true;
      form.setAttribute('aria-busy', 'true');
      button.disabled = true;
      button.textContent = 'Sending…';
      show('Sending your request…', 'sending');
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 12000);
      try {
        try { window.CrawledMeasurement?.attach(form); } catch {}
        const response = await fetch(form.action, {
          method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' },
          redirect: 'error', credentials: 'omit', signal: controller.signal
        });
        const json = response.headers.get('content-type')?.includes('application/json') ? await response.json() : null;
        if (!response.ok) {
          if (response.status === 429) show('The form service is receiving too many requests. Please wait before trying again, or contact Wesley by phone or email. Your details are still here.', 'error');
          else if (response.status >= 500) show(ambiguous, 'error');
          else {
            const errors = Array.isArray(json?.errors) ? json.errors : [];
            const fields = errors.map(error => controls.find(field => field.name === error.field)).filter(Boolean);
            fields.forEach(field => fieldError(field, 'The form service could not accept this field. Please check it.'));
            show('The form service did not accept this request. Check your details and try again, or contact Wesley directly. Your details are still here.', 'error');
            fields[0]?.focus();
          }
          return;
        }
        if (!json || json.ok !== true) throw new Error('Unconfirmed response');
        accepted = true;
        button.textContent = 'Request received';
        show(receipts[form.dataset.formName] || receipts.general_contact, 'success');
        status.focus();
        try { window.CrawledMeasurement?.lead(form); } catch {}
      } catch {
        if (!accepted) show(ambiguous, 'error');
      } finally {
        clearTimeout(timer);
        busy = false;
        form.removeAttribute('aria-busy');
        if (!accepted) { button.disabled = false; button.textContent = originalLabel; }
      }
    });
  });
})();
