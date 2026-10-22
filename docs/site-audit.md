# Website audit - 2026-10-22

This release audits the existing New Vigor Foot Spa website and preserves its
established design, twelve-photo masonry Gallery, natural image proportions,
scroll reveals, and photo lightbox. Photographs come from the owner's local
photo collection. Google customer reviews remain live provider data.

## Findings and changes

| Area | Finding | Change |
| --- | --- | --- |
| Dependencies | Runtime dependencies had known security advisories. | Update Next.js and its matching ESLint configuration to 16.4.2 and apply compatible lockfile fixes. |
| Mobile navigation | The desktop navigation did not provide a usable small-screen menu. | Add a native details menu, Pricing link, adequate touch targets, Escape handling, and outside-click dismissal. |
| Reviews | Selected pagination could disagree with the leftmost card; automatic movement lacked a user control. | Align pagination with the left edge; retain three/two/one full cards by screen size; add Pause/Resume and keyboard controls. |
| Review availability | A slow or malformed Google response could delay or break the review content. | Bound requests to six seconds, validate review data, and preserve the page with a Google Maps fallback link. |
| Images | The hero and other large images bypassed responsive image delivery. | Use a 176 KB WebP hero and Next Image with responsive sizes, explicit dimensions, and appropriate loading priority. |
| Gallery dialog | Backdrop detection and short landscape viewports needed more robust handling. | Dismiss only outside the dialog bounds and allow the dialog to scroll when needed. |
| Accessibility | Missing skip navigation, weak focus treatment, font variable collisions, and motion preferences reduced usability. | Add a main landmark and skip link, visible keyboard focus, corrected font variables, stronger contrast, and reactive reduced-motion support. |
| Pricing | The poster was the only readable source of prices. | Retain the poster and add an expandable text price list matching its six categories. |
| Contact and booking | Address and directions were hard to reach; the booking link contained an expired tracking token. | Add address, phone, directions, and booking links; retain the verified booking destination without the expired token. |
| Search and sharing | Canonical links, crawler files, and page-specific sharing metadata were incomplete. | Add robots.txt, sitemap.xml, canonical links, social metadata, and DaySpa structured data. |
| Reliability | Default error pages and local Analytics errors obscured failures. | Add useful 404/error recovery pages, scope Analytics to Vercel, and set basic response security headers. |

## Verification

- `npm run build`, `npm run lint`, and `npx tsc --noEmit --incremental false`.
- `npm run test:reviews`: missing API key, valid data, Google 403, empty reviews,
  wrong business, malformed JSON, malformed review entries, and request timeout.
  Fixtures exist only in the integration-test process and are never published
  as customer reviews.
- Chromium layouts at 1440x1000, 768x1024, 390x844, 320x568, and 844x390:
  navigation, horizontal overflow, full review cards at both ends, pagination,
  wraparound, keyboard control, twelve loaded uncropped photographs, lightbox
  navigation/dismissal, scroll restoration, and text prices.
- Firefox and WebKit mobile checks: navigation, layout, Gallery dialog,
  body-scroll restoration, live reviews, correct pagination, and runtime errors.
- Actual review Pause/Resume timers, resize behavior, runtime changes to
  reduced-motion preferences, keyboard skip link, and internal anchors.
- JavaScript-disabled page visibility and native mobile menu; reduced-motion
  page visibility and disabled automatic review movement.
- Canonical and sharing metadata on the homepage and legal pages, crawler
  files, custom 404 status, and response security headers.
- Axe reported no violations on desktop/mobile homepages, legal pages, and
  the custom 404. Cross-origin map internals and some visual contrast checks
  remain outside complete automated coverage.
- Local production Lighthouse: performance 95, accessibility 100, best
  practices 100, SEO 100, and cumulative layout shift 0. The earlier online
  baseline was 73/92/100/100. Online and localhost runs are different
  environments, so these are diagnostic measurements rather than a controlled
  claim about production speed.
- The booking destination returned HTTP 200 and the expected business booking
  page. No appointment was submitted.

Browser artifacts and measured outputs are stored outside the repository in
`../output/site-audit/`. The Google failure regression can be rerun from this
checkout after building with `npm run test:reviews`.

## Remaining limits

`npm audit --omit=dev` reports zero known vulnerabilities at audit time.
The full audit reports five high entries in one development-only dependency
chain: eslint-config-next -> @next/eslint-plugin-next -> fast-glob ->
micromatch -> braces. Advisory GHSA-vfj7-8cjw-p6xm lists braces through 3.0.3
as affected with no patched release as of this audit. The suggested forced
ESLint-config downgrade is incompatible with this release's framework version
and was not applied. Recheck the upstream fix during dependency maintenance.

Google currently supplies up to five relevance-ordered reviews through the
existing Places integration. Availability and selection depend on Google and
the configured project; this site does not manufacture reviews to reach ten.
Google billing, account restrictions, third-party booking fulfillment, and
real customer assistive-technology sessions were not audited.

Publishing and live smoke verification are separate release steps. Local
passing checks alone do not prove the deployment is serving this revision.
