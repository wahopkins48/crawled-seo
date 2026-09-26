# Crawled conversion architecture: Codex implementation brief

## Read this first

**Purpose:** improve the website for software buyers nationwide and home-service owners in the Shoals, while preserving one Crawled brand and every existing acquisition path.

This brief is for a future implementation task. Reviewing or editing it does not itself authorize website changes. When Wesley asks you to implement it, complete Phase 1 and all independent work in Phase 2. Ask focused questions where an unresolved business decision changes a promise, price, or scope. Continue unrelated work while awaiting answers. Do not stop the entire project because a photo, headline, or acquisition schedule is missing.

Work in a feature branch, preserve unrelated changes, and prepare a reviewable result. Keep the static HTML/CSS/JS architecture and no required production build step. Development-only validation tools are acceptable.

Production deployment, DNS changes, provider settings, paid subscriptions, and actual form submissions require authorization. Before pushing a branch or opening the requested PR, inspect the repository's deployment integration: a branch push can create a Vercel preview. If preview deployment is not authorized, finish locally and present the diff and PR text until that specific boundary is resolved. Never push directly to the production branch. [Vercel environment behavior](https://vercel.com/docs/deployments/environments)

**Completion has three distinct states:** implemented locally, verified for release, and observed working after an authorized launch. Report them separately. Do not claim production readiness for a check that could not be performed.

## 1. Business, audience, and success

Crawled is Wesley Hopkins's founder-led SEO business. It helps companies become easier to find and evaluate through Google and AI-assisted search. The business serves:

- Software companies nationwide: apps, SaaS, developer tools, and technical B2B products. A California founder must see relevant product expertise immediately.
- Home-service businesses in Florence, Muscle Shoals, Sheffield, and Tuscumbia. A local owner must see a practical connection between search visibility and customer inquiries.

The supplied business context says Crawled has not yet signed its first paying client. Treat this as internal planning context, not public copy. Confirm the relationship to HVAC/R AI Pro before labeling it a paid client engagement, owned project, or collaboration.

The local acquisition motion includes calls, visits, flyers, QR codes, and social content. Software acquisition is being clarified. Existing relevant articles, referrals, and normal website navigation are valid discovery paths; a missing outbound schedule is **not** a reason to suppress an otherwise useful, approved software page.

The website should produce qualified conversations that Wesley can serve profitably. No design or checklist can guarantee conversion. Treat the architecture and offer as hypotheses, then use actual inquiries, fit, delivery workload, and sales outcomes to improve them.

### Decision hierarchy

Resolve competing requirements in this order:

1. Truthfulness, working inquiry paths, and preservation of printed URLs.
2. Clear buyer fit, a deliverable Wesley can fulfill, and relevant proof.
3. Accessibility, privacy, responsiveness, and resilience.
4. Visual craft, performance, maintainability, and measurement.
5. Optional features and experiments.

All five matter. This ordering prevents cosmetic decisions from damaging the first four.

## 2. Owner decisions and dependency rules

Record answers here or link to the explicit conversation answer. Never fill an answer with an assumption and call it approved. A recommended default may be used for a local draft when labeled as such.

| Decision | Current status | What it affects | Safe action while pending |
| --- | --- | --- | --- |
| Primary software buyer and product maturity | Pending. Suggested focus: launched apps and small SaaS businesses with a clear buyer | Hero examples, qualification, objections | Draft inclusively; do not invent a funding or revenue threshold |
| Software first offer: free or paid, deliverables, format, turnaround, weekly capacity | Pending | Offer, CTA, form introduction, success copy | Draft offer options privately; make no new public promise |
| Local PDF scope and one-business-day commitment still fulfillable | Existing published promise; reconfirm | Revised local offer and response wording | Preserve existing commitment provisionally; flag any inability to meet it before release |
| Software acquisition channel, owner, cadence | Pending | Campaign message match and post-launch plan | Build the approved useful page; do not buy traffic or send outreach |
| HVAC/R AI Pro relationship, timeline, and permitted evidence | Public case study exists; details need verification | Proof wording and attribution | Cite specific documented observations; avoid implying paid-client status |
| Canonical GA4 property | Two IDs found: G-XP7L167LNN and G-158F1ZSV4K | Analytics consolidation and reporting | Prepare adapter/configuration; do not silently remove a property's reporting |
| Final homepage message | Propose a recommended headline plus two alternatives | Final homepage copy | Build the layout with the recommended draft |
| Founder photograph | Not supplied in this brief | Optional founder module | Use a text biography and the existing wordmark; no placeholder face |
| Paid service scope and price disclosure | Current page says custom quote; older internal figures exist | Packages and qualification copy | Preserve custom pricing; do not resurrect old prices or invent a minimum |
| Active local promotion, if any | Not confirmed | Promotional module only | Omit promotions and scarcity |
| Preferred visual references | Pending; default direction in section 8 | Art direction | Refine the existing brand with the specified design standards |
| Preview/PR and production permissions | Confirm from current task authorization and integration | External release steps only | Complete local implementation, review, and validation |

Only unresolved decisions that affect the intended release block that release. A missing photograph does not block a site. An undefined paid/free offer blocks publishing that offer, not unrelated technical work. If the software offer remains unresolved, preserve the existing contact route and keep the new offer copy in a proposal, with no broken or placeholder links.

Do not repeatedly ask questions already answered. Ask for business decisions, not routine HTML, spacing, or file-organization choices.

## 3. Evidence and current implementation

Repository: `/home/wesley/crawled-seo`. Source observations below were made against checkout `42f467f`. Reinspect it before changing anything, because source and live deployment may differ.

### Confirmed references

| Item | Current location or value |
| --- | --- |
| Homepage and printed contact anchor | `index.html`, `/#contact` |
| Local landing page | `local/index.html`, `/local/` |
| Existing audit page | `audit/index.html`, `/audit/` |
| Software proof | `case-studies/hvacrai/index.html` |
| Supporting pages | `/about/`, `/packages/`, `/faqs/`, `/florence-al-seo/`, `/blog/` |
| Local form endpoint | `https://formspree.io/f/xppwlnlb` |
| General contact endpoint | `https://formspree.io/f/mjgeogor` |
| Audit/roadmap endpoint | `https://formspree.io/f/xrealgwd` |
| Phone and business email | 256-335-3979; wesley@crawledseo.com |
| Booking route | `/book`, currently redirecting to Calendly |
| Deployment configuration | `vercel.json`; retain security headers, cache policy, and existing legacy redirects |
| QR inventory | `local/assets/qr-destinations.md` plus supplied printed assets |

These form URLs are public submission endpoints, not credentials.

### Corrections and risks found during this brief's review

- The earlier duplicate-ID claim was incorrect. Current `index.html` has one `auditForm`; `audit/index.html` has a separate one. IDs must be unique **within each document**, not across the site. Audit first; do not rename working controls to fix an unverified bug.
- The homepage configures two GA4 measurement IDs and loads the Google tag twice. It also contains a tag-manager-style iframe using a GA4 `G-` ID. Inventory and reconcile this with the actual intended setup.
- `local/script.js` automatically sends a native form POST after any AJAX error. A timeout may follow a successful server-side acceptance, and an analytics exception may also enter this catch block. This creates a duplicate-send risk. Section 9 defines the replacement behavior.
- Local asset references were already made root-relative in the inspected checkout. Do not assume the old slash-related defect remains. Inspect every affected route and choose the smallest verified fix.
- Current CSS pairs white button text with `#45ADFF`, approximately 2.42:1 contrast. Refine action colors or foregrounds to meet the accessibility requirement.
- Packages contains a “MOST POPULAR” badge. With no evidence of purchase preference, remove it. Do not replace it with another unsupported popularity or performance claim.
- The case study has timeline wording that needs reconciliation: the product was already live, while the engagement summary says pre-launch. Establish whether “launch” refers to the product, website, or search work. Preserve dated evidence and distinguish each milestone.

These are source observations, not a claim that every live route has been tested.

## 4. Rules for claims, proof, and commercial honesty

No invented clients, results, testimonials, logos, review totals, revenue, rankings, AI citations, capacity limits, or response times. No ranking guarantees, fake countdowns, invented scarcity, unsupported “most popular” labels, or implied affiliation with Google or AI providers.

Use verified statements about search behavior. Adding “can” or “often” to an unsupported mechanism does not make it substantiated. Explain the actual work and supported benefits; remove unsupported causation.

Maintain a short claims register for materially changed sales copy:

| Claim | Exact source and observation date | What it supports | Limit or qualification | Approved wording |
| --- | --- | --- | --- | --- |

Distinguish a provider screenshot, a search-result snapshot, owner-provided testimony, and an inference. Existing marketing prose alone is not independent evidence.

For HVAC/R AI Pro:

- Identify it immediately as software used by HVAC technicians.
- Verify screenshots and source dates before repeating figures. Preserve the actual query and capture date near ranking evidence.
- Describe an AI Overview appearance as an observed mention for that query and date, not a universal or durable “AI ranking.”
- Separate impressions, clicks, search positions, leads, and revenue. Do not infer revenue or customers from visibility.
- Attribute work honestly. Separate product launch, website launch, and Wesley's involvement.
- Keep the local page's distinction that this was not a local contractor or Maps result.
- Do not strip dates from evidence to make it appear evergreen.

Use a representative, clearly labeled sample deliverable to explain the service if useful. It must be a real permissible sample or an explicitly illustrative example, with no invented business results. Never publish a prospect's private findings or identifiable screenshots without permission. Leave future local proof absent until evidence exists; an HTML comment identifying a future insertion point is sufficient.

No em dashes in newly authored or revised public copy, including rendered HTML entities. Do not blanket-rewrite unrelated historical posts or alter quoted evidence just to satisfy this style rule.

## 5. Architecture and preserved journeys

| Route | Job | Primary action |
| --- | --- | --- |
| `/` | Explain Crawled and help visitors select the relevant service | One decision with two audience routes |
| `/software-seo/` | Convert software prospects nationwide | Approved product visibility offer |
| `/local/` | Convert Shoals home-service prospects | Approved free ranking check |
| `/#contact` | Preserve printed/general inquiry path | Send an inquiry relevant to either audience |
| `/audit/` | Preserve existing audit links | Existing or approved roadmap request |
| `/case-studies/hvacrai/` | Supply inspectable software evidence | Software offer when ready; working contact route meanwhile |
| `/florence-al-seo/` | Explain Florence service relevance | Local ranking check |
| `/packages/` | Explain engagement options and buying expectations | Relevant inquiry without implying identical services for both audiences |
| `/about/`, `/faqs/` | Resolve trust and practical objections | Relevant service route or inquiry |
| Relevant blog posts | Answer the reader's actual question | Contextual software or local next step |

“One primary action” permits repeat buttons for the same action. The homepage is an explicit exception: its primary task is audience selection, so it has two equally legible routes. Helpful phone and booking alternatives may remain secondary.

Do not infer a visitor's audience from their physical location, use IP geolocation, or force redirects. A software founder in Alabama still belongs on the software path. No new California city pages or mass-produced location pages.

### Printed URLs are a compatibility contract

Preserve these known destinations exactly, including campaign spelling:

- `https://crawledseo.com/local/?utm_source=flyer-a&utm_medium=qr&utm_campaign=local`
- `https://crawledseo.com/local/?utm_source=flyer-b&utm_medium=qr&utm_campaign=local`
- `https://crawledseo.com/local/?utm_source=video&utm_medium=social&utm_campaign=local`
- `https://crawledseo.com/#contact`

The supplied revision also reports legacy `business_card`, `flyer_a`, and `flyer_b` source values on homepage contact links. Locate their exact encoded URLs in original assets before declaring them tested. Do not silently equate underscores and hyphens.

Normal query syntax is `/?utm_source=business_card&utm_medium=qr#contact`. If an actual printed code instead puts parameters after the fragment, preserve that exact destination and handle only the known legacy format deliberately. Do not invent such URLs or broadly parse arbitrary fragments.

The contact anchor must remain visible, keyboard reachable, and clear of sticky navigation. Do not automatically redirect a printed contact link to another page. With JavaScript disabled, the destination and contact form still work; cross-page session attribution may be unavailable and must not block inquiry.

## 6. Phase 1: reliability and consistency

### 6.1 Establish a baseline

Read applicable repository instructions. Inspect Git status, current routes, forms, shared scripts/styles, deployment rules, and the actual rendered pages. Preserve screenshots and a concise inventory of defects before changes. Distinguish existing issues from introduced regressions.

Scope includes core commercial pages and every page affected by shared CSS, navigation, or JS. Do not rewrite the entire blog; use representative templates for visual regression and check affected links across all pages.

### 6.2 Routing and assets

Prefer root-relative asset paths for folder pages. Audit `src`, `srcset`, stylesheets, CSS URLs, scripts, and social images. Root-relative assets and URL canonicalization solve different problems; they are not interchangeable alternatives.

Keep existing canonical routes unless a verified change is necessary. A global `trailingSlash` change can affect many routes, including `/book` and legacy blog redirects. Use it only after documenting compatibility. Check both slash variants, preserved queries, fragments, redirect loops, file URLs, and final status codes. A generic local file server does not validate Vercel redirect behavior. [Vercel configuration reference](https://vercel.com/docs/project-configuration/vercel-json#trailingslash)

### 6.3 Forms and shared behavior

Implement section 9 on contact, audit, and local forms. Add semantic identifiers such as `data-form-name` and `data-audience`. General contact defaults to `general`, not an inferred local/software identity. Preserve existing field names unless a verified integration change requires migration.

Guard shared JS against absent elements. A page without an audit modal, navigation ID, form, or sticky bar must not throw when a user scrolls or presses Escape. Navigation and primary contact content must not depend on animation initialization.

### 6.4 Header, footer, and local refinements

Use a consistent brand shell with context-appropriate navigation. The local campaign page can retain its focused header with a prominent phone link; it does not need every main-site menu item. Use a real button for mobile navigation, with expanded state and an accessible label.

Footer identity should say “Based in Florence, Alabama. Working with software companies nationwide and home-service businesses across the Shoals,” or equivalent approved wording. Include contact, privacy, case studies, services/packages, About, and FAQ as useful. Do not imply offices in other states.

Preserve the local voice but correct unsupported absolutes such as “nobody scrolls,” “they do not compare,” or “you were never part of that morning.” Explain opportunity without claiming all customers behave identically. A diagram is an illustration, not live evidence; label it visibly.

Support both visitors carrying a flyer and visitors without one. Do not change the universal hero to assume everyone saw a handwritten number. Put that message in an adjacent flyer note, or an optional enhancement for a recognized campaign with a useful default.

Keep core local copy usable year-round. Isolate genuinely seasonal campaign details in one documented HTML region where possible. If a campaign variant must affect several places, list every edit location and verify they agree. Avoid JavaScript-only primary text and automatic calendar-based seasonal switches. Preserve old flyers' relevance after a seasonal change.

### 6.5 Phase 1 boundary

Finish reliability, accessibility, safe tracking preparation, and supported corrections. Unknown response-time answers do not block a neutral success state such as “Your request was received. Wesley will reply using the contact details you provided.” Do not claim email delivery merely because Formspree accepted the request.

If software copy is not ready, link to the homepage/contact or existing case study. Do not ship links to an absent software page.

## 7. Phase 2: audience-specific sales experience

### 7.1 Homepage

Within the first meaningful screen, answer: what Crawled does, who it serves, why to trust Wesley, and where to go.

Recommended draft headline: **“Help the right customers find your business.”**

Offer two alternatives in the proposal, but recommend one and explain why. Prefer plain language and a short heading; do not sacrifice clarity to an arbitrary word limit.

Follow with a sentence explicitly naming software companies nationwide and home-service businesses in the Shoals. Provide two descriptive route choices, each with one short benefit statement:

- **Software SEO**: help buyers discover and evaluate your product.
- **Shoals local SEO**: help nearby customers find your service business.

Use equal clarity, not necessarily two giant competing buttons. On small screens, stack the choices without truncation. Include one quiet case-study link labeled as software proof.

Then show concise evidence, what working directly with Wesley is like, an understandable process, and the existing contact section. Remove repetitive abstract capability blocks. AI integration should receive prominent sales space only if Wesley confirms a defined active offer.

Preserve `#contact` and make it usable by both audiences. Recommend name, email, and a short “What can I help with?” field; company/product URL can be optional. Do not require a town from a nationwide software prospect. If qualification requires an audience selector, include “Something else” and do not erase typed input when it changes.

### 7.2 Software page

Speak first to the approved software buyer. The provisional focus is launched products with a real use case, not a promise to acquire users for every pre-launch idea.

The page must answer, in this order:

1. **Who and what:** the product-discovery problem, intended buyer, and approved next step. Clarify nationwide remote work without geographic keyword stuffing.
2. **Relevant proof:** introduce HVAC/R AI Pro as software, with a short sourced result and a link to inspect it. Put proof near the first CTA.
3. **What the visitor receives:** the approved scope, format, price/free status, turnaround, and whether a call is needed. Separate public-site review from work requiring private analytics or product access.
4. **What paid work involves:** concrete activities such as category/use-case research, product and documentation page improvements, crawlability, useful content, and measurement, only where these are actual services.
5. **How collaboration works:** what Wesley handles, what the founder/team supplies, and how priorities are agreed. Describe advisory versus implementation responsibilities accurately.
6. **Fit and practical limits:** useful for products with a defined buyer and capacity to act on findings. Do not invent a minimum revenue, budget, or guaranteed result.
7. **Short form and relevant FAQ:** repeat the same primary offer and address the objections that would stop a qualified inquiry.

A B2B software visitor cares about discoverability during evaluation. Avoid turning the page into a generic promise of viral growth, paid acquisition, app-store optimization, or AI product engineering.

Recommended form: required email and product/site URL; optional name, role, and one short goal field unless Wesley identifies a specific need for more qualification. Accept personal email providers because solo developers use them. Use “Email” or “Best email,” not an enforced corporate-only address rule. Permit a standard product URL without making the visitor type a scheme.

Use the existing audit endpoint with a stable `form_name=software_roadmap`, `audience=software`, and an appropriate subject. Reusing an endpoint does not mean reusing generic form wording. Keep current audit submissions distinguishable. Confirm provider-supported subject behavior.

If the offer is paid, this form is a request about that service, not a checkout. Do not add payment processing without a separate scope.

### 7.3 Supporting commercial pages

| Page | Required alignment |
| --- | --- |
| About | Wesley's real role, relevant experience, approach, geographic scope, and direct contact. No invented team size or credentials |
| Packages | Explain whose packages they are, what is included, client responsibilities, pricing process, and next step. Do not send software prospects into unexplained GBP/citation packages |
| FAQ | Consistent answers on both audiences, remote work, access, deliverables, timing, contracts, reporting, and pricing where confirmed |
| Audit | Name the offer consistently with its CTA and success state. Retain its URL and existing intake purpose |
| HVAC/R case study | Clear relationship/timeline, sourced and dated observations, readable evidence, and relevant software CTA |
| Florence service page | Local context and useful distinct content, linked to the ranking check without duplicating the campaign page wholesale |
| Privacy/terms | Accurate actual practices and commitments. Do not invent legal assurances, data retention, payment providers, or certifications |

Old internal prices in `packages/README.md` are not automatically current. Keep custom-quote wording until prices are approved. Remove unsupported popularity badges and translate vague service jargon into specific work. Do not quietly replace agreed commercial deliverables.

### 7.4 Content and search

Retain relevant software articles and give them a fitting next step. Keep local content useful to local owners. Link only where the reader benefits; do not mass-replace every article CTA blindly.

Use unique page titles, descriptions, absolute canonical URLs, and social previews. Keep important content and navigation in initial HTML. Match structured data to visible facts, with one consistent organization identity and appropriate audience/service scope. No fabricated ratings or duplicate business identities.

Sitemap entries must be canonical, indexable, working pages. Use truthful modification dates. Preserve robots rules and legacy redirects. Provide a helpful genuine 404 response with working service/contact links if one is missing.

Google says its ordinary SEO practices apply to AI Overviews and AI Mode, with no required special AI markup or files. Do not sell special schema, `llms.txt`, or guessed AI ranking factors as a guaranteed advantage. [Google's AI search guidance](https://developers.google.com/search/docs/appearance/ai-features)

Do not delete, noindex, or expand into large sets of posts based on assumed traffic. Assess usefulness, accurate sourcing, buyer relevance, and available search evidence first. [Google's content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

## 8. Craft standards: sophisticated and maintainable

Default direction: a calm, precise, founder-led professional service. Retain the wordmark with robot, existing font families where practical, white/light surfaces, dark readable text, and blue as a controlled accent.

Sophistication should come from hierarchy, specificity, evidence, typography, and consistency. Avoid generic decorative dashboards, fake data, excessive cards, gratuitous gradients, floating shapes, scroll hijacking, carousels, and stock people. Use actual product/evidence images when they help a buyer judge the work.

Define reusable CSS tokens for text, action colors, surfaces, borders, spacing, type, widths, radii, and focus. Refine existing tokens where necessary. Do not preserve inaccessible colors solely for consistency.

Use a deliberate reading width, comfortable body text, restrained heading scales, and consistent vertical rhythm. Aim for approximately 16-18px body text and readable line lengths; these are design defaults, not reasons to force every component into one size. Buttons need clear hover, focus, loading, and error behavior.

Design review must cover the entire page and all interaction states, not only a hero screenshot. Desktop and mobile should feel intentionally composed. Avoid sparse sections padded into excessive scrolling and dense lists used to fill space.

Prefer a visible section form over a modal-only conversion path. If a modal remains, preserve a normal `/audit/` link fallback and implement accessible opening, focus containment, Escape, and focus restoration.

Do not add stock or synthetic founder portraits. An optional real photograph needs permission, useful cropping, responsive sizing, and an appropriate text alternative. A founder biography works without it.

### Accessibility

Target WCAG 2.2 AA for the changed journeys. Use semantic landmarks, a skip link, sensible headings, real labels, accessible error associations, keyboard operation, visible focus, reduced-motion support, and readable status announcements. Normal text needs at least 4.5:1 contrast; large text and meaningful control boundaries use the applicable 3:1 minimum. Test reflow at 320 CSS pixels and text zoom. Sticky elements must not obscure focus. Use 44px primary tap targets as this project's usability target. Automated checks must be supplemented by manual keyboard and screen-reader checks; an automated score alone is not a conformance claim. [WCAG reference](https://www.w3.org/WAI/WCAG22/quickref/)

## 9. Form contract: do not lose or duplicate inquiries

Keep Formspree and native HTML POST actions. Use progressive enhancement for branded asynchronous feedback. Native submission remains the no-JavaScript fallback; provider-hosted confirmation is acceptable in that mode if the plan cannot supply a branded redirect. Do not promise branded no-JS behavior that the account does not support. [Formspree AJAX documentation](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax/)

### Submission behavior

| State | Required behavior |
| --- | --- |
| Invalid input | Send no request. Explain the specific problem next to the field, focus it or an error summary, and preserve all values |
| Submitting | Prevent double submission, expose a clear busy state, and keep the page usable |
| Provider-confirmed success | Show an audience-specific receipt, announce it accessibly, and record one lead event where analytics is permitted |
| Provider rejection | Show a recoverable message, retain values, and distinguish input problems from rate limiting or service errors |
| Timeout, offline, or ambiguous network failure | Say receipt could not be confirmed. Retain values, offer contact/retry options, and never automatically POST again |
| Analytics failure after acceptance | Keep the success state. Never treat analytics failure as a failed inquiry |
| JavaScript unavailable | Native labeled form and visible contact alternatives remain available |

Inspect the documented provider response before declaring success; handle unexpected HTML, redirects, and malformed responses. Do not clear the form before acceptance. Scope analytics to an isolated best-effort step after business success.

A timeout does not prove the provider rejected the submission. Do not call `form.submit()` in a broad AJAX catch block. Do not claim exactly-once delivery without provider support. Prevent obvious repeat clicks and count the confirmed success once per actual submission in the client.

For local contact, accept a plausible email or a reasonably formatted phone number, including country code and common punctuation. Do not pretend format validation proves deliverability. Use neutral autocomplete behavior on a mixed field or separate controls with correct semantics. Do not require a website.

Normalize an omitted `https://` scheme where appropriate, then validate a normal HTTP(S) URL. Use visible examples and helpful input modes. Hidden fields may contain only the documented routing and safe attribution metadata. Do not collect unrelated form content, credentials, private analytics access, or payment data.

Put a short privacy explanation and link beside submit controls. A service inquiry is not newsletter consent. No prechecked marketing boxes or automatic enrollment.

Read-only dashboard verification, when accessible, should confirm endpoint ownership, recipients, spam protection, domain settings, quotas, archive availability, and confirmation features. Do not claim these are configured based on HTML alone. Use a documented honeypot only after verifying support; keep it unfocusable and hidden from assistive technology. A client-only CAPTCHA is insufficient.

A complete form test must use intercepted/mocked network responses with outbound POSTs to Formspree blocked. Test acceptance, rejection, 429, 5xx, offline, timeout, analytics exception, and rapid repeated clicks. Mocked success tests prove frontend behavior, not provider delivery. Leave one explicitly authorized end-to-end test to the release checklist, verifying the provider record and actual notification receipt.

## 10. Measurement, attribution, and privacy

First inventory the current GA4/GTM setup and determine the intended property with Wesley or accessible property evidence. Prevent accidental duplicate initialization and event routing. Do not introduce another analytics product or marketing pixel.

Keep the initial event set small:

| Event | Meaning | Approved parameters |
| --- | --- | --- |
| `generate_lead` | Formspree accepted the inquiry | Stable `form_name`, `audience`, sanitized `landing_page`, approved campaign labels |
| `click_phone` | Visitor clicked a telephone link | `audience`, sanitized `source_page` |
| `click_book_call` | Visitor clicked /book or Calendly | `audience`, sanitized `source_page` |

These clicks are not completed calls or bookings. A submitted form is not automatically a qualified lead. A thank-you page visit alone is not proof of submission. A campaign URL view is not proof a physical QR code was scanned.

Use `software`, `local`, and `general` as explicit audience values. Context comes from the form/page, not location inference. When Phase 2 launches, an optional `select_audience` click event can answer a concrete routing question. Add other funnel events only when a specific decision needs them.

### Attribution rules

- Capture the first recognized campaign and landing path in the tab session. Preserve it through internal navigation; an untagged next page must not erase it.
- Keep the submission page separate from the landing path. If later campaign touches need tracking, name them separately rather than overwriting first-touch silently.
- Use `sessionStorage` defensively, with an in-memory fallback if unavailable. The fallback lasts only for the current document, so report missing cross-page attribution honestly. Do not persist field contents.
- Preserve printed campaign spellings. Maintain a small allowlist of campaign keys and approved values. Unknown or suspicious values are omitted or mapped to a generic label.
- Sanitize page values to an approved path. Never forward raw `location.href`, arbitrary query strings, fragments, referrer URLs, or user-entered text.
- Campaign values are untrusted input. Character filtering alone does not guarantee they contain no personal information. Forward approved campaign labels, not arbitrary raw UTM contents.
- Attach safe attribution fields to Formspree notifications as well as analytics. With analytics blocked, capture only what is permitted by the actual privacy settings and allow the form to work regardless.
- Account for default GA4 page-location collection and enhanced measurement, not just custom event parameters. Inspect actual outgoing test payloads for unintended data.
- Do not add fake success events to compensate for blockers or no-JS usage.

Google's documentation explains configuration and personal-data restrictions. Use it when reconciling the tags and sanitizing collected URLs. [GA4 configuration](https://developers.google.com/analytics/devguides/collection/ga4/reference/config), [avoiding PII](https://support.google.com/analytics/answer/6366371?hl=en)

Document the actual data flows through Formspree, business email, analytics, and outbound Calendly. Align privacy text with actual practices and existing consent choices. Do not announce blanket legal compliance or invent retention periods. Questions about legal applicability belong with the owner or a qualified adviser; they are not solved by adding a generic banner.

## 11. Performance and engineering durability

Set a launch budget for homepage, local, software, and audit pages: **under 1 MB transferred on a cold first load**, including normally loaded third-party assets. Document browser, cache state, viewport, compression, and measurement method. Measure first-screen load separately from all deferred evidence images. A long case study may need an explicitly documented exception after responsive/lazy-loaded evidence is optimized.

Additional project targets: first-party JS at or below 30 KB compressed and per-page loaded CSS at or below 60 KB compressed, unless an existing baseline or necessary feature warrants a documented exception. Do not sacrifice clarity for minified hand-maintained source.

Use responsive images with dimensions, useful WebP/AVIF where appropriate, and lazy loading below the fold. Keep the primary image eligible for prompt loading. Preserve screenshot legibility and original accessible evidence. Limit font weights, use sensible fallbacks and `font-display`, and avoid unnecessary third-party requests.

Aim for field Core Web Vitals at the 75th percentile: LCP <= 2.5 seconds, INP <= 200 ms, CLS <= 0.1. Low traffic may mean field data is unavailable. Use repeatable mobile lab tests as diagnostics, and do not call a Lighthouse score proof of field INP or conversion. [Web Vitals definitions](https://web.dev/articles/vitals)

Use ordinary HTML, shared CSS, and small deferred JS. Do not add a framework, CMS, required build pipeline, chatbot, autoplay video, or client-rendered navigation/content. Preserve security headers; inspect script dependencies before tightening policies that could break forms.

Use readable source and isolated selectors, especially when sharing `.hero`, `.button`, or navigation rules across existing pages. Keep one documented definition of form metadata, contact details, and campaign labels where practical. With static HTML, some markup repetition is acceptable; document its edit locations instead of hiding important content behind runtime includes.

Check what Vercel deploys from this static repository. Internal plans, evidence logs, test fixtures, lead data, and credentials must not inadvertently become public files. Use a verified deployment exclusion or access restriction appropriate to the actual integration. `noindex` and `robots.txt` are not confidentiality controls.

## 12. Validation matrix and release gates

Record every check as passed, failed, blocked, or not applicable, with evidence. Never silently convert a blocked check into a pass.

| Area | Required acceptance evidence |
| --- | --- |
| Buyer understanding | A reviewer can identify each audience, offer, proof, and next step from the rendered first screen; software is clearly nationwide |
| Full-page craft | Reviewed desktop/mobile captures of all core pages, footer, forms, menus, errors, and success states |
| Printed paths | Exact known QR destinations, source spellings, #contact positioning, and source capture verified; unidentified legacy assets called out |
| Routing | Slash variants, queries, fragments, /book, case-study assets, redirects, actual 404 behavior, sitemap and canonical agreement |
| Browser behavior | 320/375, 768, and 1280+ widths; zoom and reduced motion; Chromium plus Safari/WebKit and Firefox where available |
| Accessibility | Keyboard flow, mobile-menu focus, any modal, labels/errors, contrast, status announcement, reflow, and screen-reader spot check |
| Forms | Mocked success and failure matrix, repeated-click prevention, preserved inputs, no auto-repost, isolated analytics, no live submission |
| Attribution | Cross-page tagged entry, untagged next page, blocked storage, malformed/PII-like parameters, sanitized network payloads |
| Analytics | Intended property routing, no duplicate events, no events on validation/rejection, no production test contamination |
| Search | Initial HTML content, working links, unique metadata, valid truthful structured data, canonical and indexability checks |
| Performance | Cold-load transfer budget and repeatable mobile results, including any exceptions |
| Commercial accuracy | Offer, prices, scope, timelines, case-study relationship, privacy wording, and supporting pages agree |
| Operations | Recipients, quotas, archives, booking destination, response owner, and release test plan documented |
| Release | Reviewed diff, authorized preview/PR path, no unexpected deployment, known rollback commit |

A desktop Chromium viewport does not equal an iPhone/Safari test. Record unavailable environments honestly. A local static server does not prove hosting rewrites. Fix all introduced issues and high-impact existing failures on changed conversion paths before release; list unrelated baseline defects separately.

Do not rely solely on screenshots, a Lighthouse score, generated copy review, or an AI agent saying it looks good. Run the actual interaction and inspect the evidence.

## 13. Lead operations and improvement after launch

The website's promise must fit a one-person delivery operation. Confirm who receives each form and how Wesley reviews the provider archive if a notification is missed. Document quota warnings, spam-review frequency, and the action when turnaround capacity is full. Do not add automated follow-up sequences or contact prospects as part of this build.

Keep a private, lightweight lead record using the existing workflow. Suggested fields: date, audience, campaign/source, requested service, fit, response date, conversation held, proposal, outcome, and reason lost. Do not put identifying lead records in the website repository.

Define a qualified conversation as an actual exchange with a plausible buyer about a service Crawled offers. Report submitted inquiries, qualified conversations, proposals, and clients separately. Track fulfillment time and workload alongside volume. Avoid optimizing for free-review requests that never become viable work.

Suggested manual review cadence, not authorization to create an automation:

- After launch: inspect live navigation and assets; perform the separately authorized delivery test.
- Weekly during active acquisition: reconcile real submissions with notifications, review spam/quality, and check whether response promises are met.
- Monthly: review source quality, objections, workload, and accepted work; choose one substantial change to evaluate.
- Quarterly and when offers change: check links, dates, claims, screenshots, forms, provider limits, and privacy accuracy. Refresh seasonal modules before using the next campaign.

At low volume, review individual inquiries and reasons rather than declaring statistical winners. Show denominators when reporting rates, distinguish consented analytics from all provider submissions, and avoid comparing changed audiences/channels as if they were identical. Brief comprehension tests with actual target buyers can reveal confusion before enough traffic exists for an experiment.

## 14. Agent workflow and deliverables

1. Read this brief, applicable repository instructions, and current source. Record changed-file baseline and verify claims about existing defects.
2. Ask the unresolved business questions in section 2 in small, relevant batches. Record supplied answers. Continue independent work.
3. Complete Phase 1. Prepare homepage/software copy and layout proposals, recommending a coherent direction rather than an unranked collection of options.
4. Implement Phase 2 once its material offer decisions are clear. Keep any remaining unsupported claim out of publishable HTML.
5. Validate the matrix. Fix failures and document genuine environment/provider blockers precisely.
6. Provide the implementation diff, local review instructions, screenshots, results, and an authorized PR when permitted. Keep production release separate.

Keep documentation compact and non-sensitive:

- `docs/site-maintenance.md`: edit locations, tokens/components, seasonal content, metadata/forms, and deployment exclusions.
- `docs/conversion-validation.md`: route inventory, check results, claims references, screenshots/results locations, blocked checks, and rollback instructions.
- `docs/proposals/software-path.md`: only if business decisions remain pending; clearly distinguish recommended copy from approved commitments.

Do not create a sprawling documentation system or duplicate this brief across competing sources of truth.

In the PR or local review report include the concrete before/after behavior, changed scope by phase, evidence for material claims, preserved printed destinations, form and analytics decisions, validation results, remaining decisions, and deployment status. If no PR was opened, explain the exact limitation and provide ready-to-use title/body text.

### Definition of done

- The implemented scope matches approved decisions; incomplete Phase 2 work is explicitly labeled rather than called complete.
- Both intended audiences have coherent, truthful journeys, or the pending software offer remains a clearly identified proposal.
- Printed links and general contact remain working.
- Forms handle confirmed success and ambiguous failure without automatic duplicate submissions.
- Accessible controls, mobile layouts, evidence, metadata, and supporting pages meet the specified checks.
- Measurement distinguishes inquiries from conversations and excludes personal form data.
- Documentation lets a future agent update offers, proof, campaign details, and shared components without reconstructing the project.
- Validation is inspectable, outstanding limitations are named, and nothing has been deployed without authorization.

## 15. Editorial changes made to the team's revision

- Corrected the false duplicate-ID assertion and replaced stale assumptions with a verify-first source inventory.
- Added actual analytics conflicts, form auto-repost risk, action-color contrast, and unsupported package-popularity wording.
- Kept phases but narrowed blockers to the work that depends on them. A photo or acquisition schedule no longer blocks an otherwise useful site.
- Replaced unconditional global trailing-slash changes with explicit asset and routing verification.
- Added full-page art direction, supporting-page alignment, proof/timeline discipline, and accessible interaction requirements.
- Defined submission states, safe attribution, mock testing, no-JS limitations, operational capacity, and post-launch review.
- Preserved dates needed for evidence and clarified that evergreen copy does not mean undated proof.
- Resolved the PR versus no-deployment conflict by accounting for automatic Vercel previews.
