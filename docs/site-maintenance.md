# Site maintenance

Static HTML/CSS/JS. No build step. Deploys as-is on Vercel.

## Shared files (loaded on every commercial page)

- `site.css` — design tokens (`:root` custom properties for color, spacing, type) and shared components: header/nav, footer, buttons (`.action`), forms, route cards, steps list, evidence figures. Legacy per-page stylesheets (`styles.css`, `local/styles.css`) still carry page-specific layout for sections not yet rebuilt on the new component set; both load, `site.css` second so its tokens/components win.
- `site-config.js` — `window.CrawledConfig`: the sitewide analytics IDs (`defaultAnalyticsIds`, `localAnalyticsIds`), the full allowlist of indexable paths (`approvedPaths`, used to sanitize any path sent to analytics), and the allowed campaign label values (`campaigns`). Add a new page's path here before it can appear as a sanitized `landing_page`/`submission_page` value. Add a new printed campaign value here (not just in the flyer copy) before it will be captured.
- `measurement.js` — `window.CrawledMeasurement`. Owns first-touch attribution (`sessionStorage`, key `crawled-attribution-v1`), the opt-in analytics gate (`localStorage` key `crawled-analytics`), GA4 initialization, and the `generate_lead` / `click_phone` / `click_book_call` events. Respects Global Privacy Control / Do Not Track by refusing to store attribution or enable analytics. Only fires on `crawledseo.com` / `www.crawledseo.com` (checked via `location.hostname`), so local/staging never sends real events.
- `forms.js` — progressive AJAX enhancement for every `form[data-form-name]`. Validates client-side (blocks submission, shows per-field errors, preserves values), submits via `fetch` with a 12s timeout, and maps Formspree's response to one of: success (audience-specific receipt from the `receipts` map, keyed by `data-form-name`), 429, 4xx field errors, 5xx/timeout ("could not confirm receipt," never resubmits), and JS-disabled fallback (real POST, `noValidate` never set). Add a new form's receipt copy to the `receipts` object here.
- `script.js` — small shared page behavior not specific to forms/measurement (mobile menu toggle, etc.). Guards every selector for a missing element so pages without a given component don't throw.

## Adding a new page

1. Copy the `<head>` block from an existing commercial page (`index.html` is the simplest reference): meta/OG tags, `site.css`, then `site-config.js` → `measurement.js` → `script.js` → `forms.js` in that order (all `defer`).
2. Set `data-audience` on `<body>` to `software`, `local`, or `general` — this drives which GA4 property ID set is used and what analytics events are labeled.
3. Add the page's canonical path (with trailing slash) to `approvedPaths` in `site-config.js`.
4. Add the URL to `sitemap.xml` with a truthful `lastmod`.
5. If the page has a form, give it `data-form-name`, matching hidden `form_name`/`audience` inputs, a `[data-form-status]` element, and add a receipt string to `forms.js`.

## Forms and endpoints

| Form | `data-form-name` | Endpoint |
| --- | --- | --- |
| Homepage contact | `general_contact` | `https://formspree.io/f/mjgeogor` |
| Audit page | `visibility_audit` | `https://formspree.io/f/xrealgwd` |
| Local ranking check | `free_ranking_check` | `https://formspree.io/f/xppwlnlb` |
| Software visibility audit | `software_roadmap` | `https://formspree.io/f/xrealgwd` (shared endpoint with the audit page; hidden `_subject` field and `data-form-name` keep submissions distinguishable) |

Do not add a new endpoint without checking the Formspree dashboard for recipients, spam filtering, and quota — see `docs/conversion-validation.md`.

## Seasonal / campaign content

`local/index.html` has one HTML region (the flyer note box near the hero, `class="flyer-note"`) for campaign-specific messaging. It is an aside, not the universal hero copy, so the page reads correctly for a visitor with no flyer. If a seasonal campaign needs copy in more than one place, list every edit location in this file before shipping the change, and remove/refresh it when the campaign ends so old flyers stay coherent.

Printed campaign values live in two places that must agree: `site-config.js` (`campaigns.utm_source`, etc. — controls what analytics accepts) and the actual printed QR/flyer URLs (`local/assets/qr-destinations.md`). Adding a new flyer means updating both.

## Deployment exclusions

Nothing in this repository should be treated as confidential by relying on `robots.txt` or `noindex` alone (both are indexing hints, not access control). Internal planning docs (this brief, `docs/proposals/`) are plain files in the repo; if they must not be publicly fetchable from the deployed site, exclude them via Vercel project settings or a `.vercelignore`/build step, not just by omitting links.

## Known technical debt

- `styles.css` and `local/styles.css` remain in place for pages not yet migrated to the `site.css` component set (blog templates, and parts of the case study, Florence, terms, and video pages). Full migration was out of scope for this pass — the brief explicitly excludes rewriting the entire blog.
- Both existing GA4 property IDs (`G-XP7L167LNN`, `G-158F1ZSV4K`) are still sent to on `general`/`software` pages pending a decision on the canonical property; `local/` audience only sends to `G-XP7L167LNN`. Reconcile and drop one ID once Wesley confirms which property is canonical.
