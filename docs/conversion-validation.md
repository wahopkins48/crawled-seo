# Conversion architecture: validation record

Branch: `feature/conversion-architecture`. Baseline checkout for the brief: `42f467f`. This record covers the Phase 1 + Phase 2 work implemented on top of that baseline (started by a Codex session, completed by Claude Code on 2026-09-26). Nothing in this branch has been pushed, previewed, or deployed.

## Route inventory (indexable, in `sitemap.xml`)

`/`, `/software-seo/`, `/local/`, `/florence-al-seo/`, `/packages/`, `/audit/`, `/faqs/`, `/about/`, `/case-studies/`, `/case-studies/hvacrai/`, `/privacy/`, `/terms/`, `/blog/` + posts, `/guides/ai-search-visibility/`.

Intentionally not indexed: `/video/` (outreach landing page, `noindex`), `/404.html`.

## Checks performed and results

| Area | Result | Evidence / notes |
| --- | --- | --- |
| All core routes return 200 locally | **Passed** | `python3 -m http.server`, curl status check across all routes above plus `/site.css`, `/forms.js`, `/measurement.js`, `/site-config.js`, `/script.js`, `/404.html`. |
| Console errors on load | **Passed** (own code) | Chrome console read across `/`, `/software-seo/`, `/local/`, `/packages/`, `/case-studies/hvacrai/`. No errors from site JS; only browser-extension noise. |
| Homepage buyer understanding | **Passed** | First screen states what Crawled does, both audiences by name, two equally-weighted route cards, a quiet case-study link, contact section. |
| Mobile layout (375px) | **Passed** | Homepage audience routes stack without truncation; hamburger menu opens/closes and lists all nav links; verified visually. |
| Reflow at 320px | **Not tested this pass** | Only 375px verified. Recommend a 320px pass before release. |
| Desktop layout (1400px) | **Passed** | Visual check on homepage, local, packages, case study. |
| Form client-side validation | **Passed** | Empty-state submit on homepage contact form: no network request sent, per-field errors rendered next to fields, summary message shown, first invalid field (`Name`) focused, all typed values preserved on re-render. Matches section 9's "invalid input" row. |
| Form success/failure network states (mocked/offline/5xx/429) | **Not tested this pass** | `forms.js` implements all documented states (see code read below) but this pass did not intercept network requests to exercise them. Needs a mocked-network pass before release per section 9's "complete form test" requirement. |
| No accidental duplicate POST on failure | **Passed by code inspection** | `local/script.js`'s old `form.submit()` fallback in the AJAX catch block is removed entirely; `forms.js`'s catch block only updates UI state, never resubmits. |
| Auto-repost regression (brief's flagged bug) | **Fixed** | Same as above — confirmed removed from `local/script.js`. |
| Button/action color contrast | **Passed by calculation** | `#075da8` white-text button: ~6.7:1 contrast (was `#45ADFF`, ~2.4:1). Applied consistently in `styles.css`, `local/styles.css`, and `site.css`. |
| "MOST POPULAR" badge | **Confirmed removed** | `packages/index.html` has no popularity badge or claim; three tiers all say "Custom quote." |
| Duplicate form IDs | **Confirmed not an issue** | `auditForm` (audit page) and `contactForm`/`software-form` etc. are unique within their own documents; the brief's original claim of a cross-page collision was already corrected. |
| Referenced image assets exist | **Passed** | `favicon.png`, `crawled_logo_main.png`, `local/assets/crawled-logo-384.png`, and the case study's evidence screenshots all present. |
| Sitemap completeness | **Fixed this pass** | `/software-seo/` and `/case-studies/` were missing from `sitemap.xml`; added with `lastmod` dates matching this change. |
| GA4 duplicate initialization | **Passed by code inspection** | `measurement.js` guards with `if (window.CrawledMeasurement) return;` and a single `init()` gated on `permitted && !initialized`; only fires on `crawledseo.com`/`www.crawledseo.com`. |
| Analytics opt-in / GPC / DNT | **Passed by code inspection** | `localStorage` gate defaults to off; `navigator.globalPrivacyControl`/`doNotTrack` force attribution and analytics off regardless of stored preference. |
| Attribution sanitization | **Passed by code inspection** | `measurement.js` only accepts campaign values enumerated in `site-config.js`; `landing_page`/`submission_page` are restricted to `approvedPaths`, with an unrecognized path mapped to `/404/` rather than passing raw `location.pathname`. |
| Printed campaign URLs | **Not independently re-tested this pass** | Relies on existing `local/assets/qr-destinations.md` inventory; the four printed URLs in the brief (flyer-a/flyer-b/video/#contact) are covered by `site-config.js`'s `campaigns` allowlist and by `#contact` remaining in place on the homepage. No new printed asset was issued this pass. |
| Claims: HVAC/R AI Pro relationship | **Corrected this pass** | Wesley confirmed the engagement was a trade of services (his HVAC repair for Wesley's SEO work), not a cash transaction. `case-studies/hvacrai/index.html` now states this explicitly rather than leaving "first client" to imply a paid engagement. |
| Claims: software offer turnaround | **Confirmed live per Wesley** | Wesley confirmed he can deliver the "free visibility audit within 24 hours, no call required" commitment published on `/software-seo/` and `/audit/`; kept as-is. |
| Screen-reader / full keyboard pass | **Not tested this pass** | Skip link, landmarks, labels, and `aria-live` status regions are present in the markup; no assistive-tech spot check was performed. |
| Performance budget (transferred bytes, Core Web Vitals) | **Not tested this pass** | No cold-load network trace or Lighthouse run performed. `forms.js`/`measurement.js`/`site-config.js`/`site.css` combined are well under the stated JS/CSS budgets by file size alone, but this hasn't been measured as transferred/compressed bytes. |
| Vercel-specific routing (trailing slash, redirects, headers) | **Not tested this pass** | A local static server does not exercise `vercel.json` redirects/headers. `vercel.json` itself was not modified. |

## Claims register

| Claim | Source / observation date | Supports | Limit | Approved wording location |
| --- | --- | --- | --- | --- |
| HVAC/R AI Pro named first for "hvac ai app" in Google's AI Overview | Case study appendix, capture dated 2026-09-13 | Software SEO proof point on homepage and `/software-seo/` | One query, one date, one signed-out US session — not a durable ranking | `case-studies/hvacrai/index.html`, linked from `index.html` and `/software-seo/` |
| 93 clicks / ~3.84K impressions | Search Console capture, dated 2026-09-13 | Visibility evidence only | Not leads, customers, or revenue; stated explicitly next to the figures | `index.html`, `case-studies/hvacrai/index.html` |
| "HVAC/R AI Pro was my first client" | Wesley, 2026-09-26 (this session) | Case study framing | Traded services (his HVAC repair for Wesley's SEO work), not a cash engagement — stated in the same sentence | `case-studies/hvacrai/index.html` |
| Free visibility audit within 24 hours, no call required (software) | Wesley, 2026-09-26 (this session) | `/software-seo/` and `/audit/` primary offer | Wesley confirmed current capacity supports this; revisit if volume changes | `software-seo/index.html`, `audit/index.html` |

## Not yet done / blocked

- **Docs proposal file**: `docs/proposals/software-path.md` was not created — the software offer (turnaround, format, price) is no longer a pending business decision as of this session (Wesley confirmed it live), so there is no unresolved proposal left to track separately.
- **Canonical GA4 property**: still undecided; both IDs remain wired via `site-config.js` per the brief's "prepare adapter, don't silently remove" instruction. Revisit once Wesley confirms.
- **Founder photograph**: not supplied; `/about/` uses text bio only, per the brief's default.
- **Mocked-network form test matrix** (success/429/5xx/offline/timeout/analytics-exception/rapid-click) and **320px reflow**, **screen-reader pass**, **Core Web Vitals / transfer-size measurement**, and **live Vercel redirect/header behavior** are all still open — none can be verified from a local static server or without an authorized preview deployment.
- **No preview/PR opened.** Per the brief, a branch push can trigger a Vercel preview; that has not been authorized in this session, so the branch remains local only.

## Rollback

This branch has not been pushed and nothing has been merged. To discard this work entirely: `git checkout main` (or the prior working branch) and leave `feature/conversion-architecture` as-is or delete it — no production state has changed. If this is merged later, the pre-merge commit on the target branch is the rollback point.
