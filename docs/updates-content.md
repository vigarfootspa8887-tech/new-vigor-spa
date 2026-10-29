# Shared Updates content

The homepage and `/updates` read the same `src/content/updates.json`. The homepage
shows the latest three verified entries; the archive displays the complete original
captions, including hashtags. No Google API credentials or new content service are
needed. This version does not automatically retrieve posts from Google.

## Design

This addition follows the owner's accepted website and keeps the existing Gallery.
Its palette is cream `#fdf6ee`, warm cream `#faf0e6`, deep brown `#4a1c1c`,
terracotta `#a9522c`, and white `#ffffff`. Playfair Display continues to carry the
headings; Inter carries the dates, captions and actions.

Homepage previews use three image-led columns on desktop, two on small tablets,
and one on phones. The archive pairs each complete square graphic with its full
caption and booking/call actions, stacking image above text on mobile. Text is
left-aligned. Original square graphics supply the character; extra badges,
decorative numbering, cropped campaign lettering and unnecessary animation are
omitted. The section heading uses the existing accessible scroll reveal.

```text
Home:    Gallery -> From the Spa [three previews] -> Contact
Archive: From the Spa
         [complete graphic] [date, title, complete caption, book/call]
         [complete graphic] [date, title, complete caption, book/call]
```

The design review deliberately retained the existing site's palette and typography
because the owner asked for an addition to that site. The promotional images already
contain designed title panels, so their surrounding page stays simple.

## Import verified original content

1. Verify the post is publicly available on the correct Google business profile.
   A future scheduling confirmation or a file inside `planned-posts/published/`
   does not prove publication.
2. Add a selection to `content/updates-source.json`, referring to its existing
   `weekNN` package and post number. Record publication status, date, verification
   date, the observed newest-first order, and concrete publication/date evidence.
   Larger order values appear first. A changed or withdrawn entry can be marked
   `archived`; `draft` and `scheduled` entries are not imported.
3. Set `googlePostUrl` only when the actual public post URL has been verified.
   Owner-management/edit URLs are not public links. Leave it `null` otherwise.
4. Run these commands from the website checkout, with Node 22 or later for tests:

   ```powershell
   npm run content:import
   npm run content:check
   npm run test:updates
   npm run lint
   npm run build
   ```

   The importer's default asset root is the website's parent directory. For a
   different local arrangement:

   ```powershell
   npm run content:import -- --assets-root "F:\path\to\Vigor Foot Spa"
   ```

5. Review both pages, commit the source manifest, generated JSON and generated
   `public/images/updates/*.webp` images, and deploy through the existing source
   repository and production fork.

The importer reads each original package's Markdown caption and generation
manifest. It does not use the package's planning dates as publication dates. When
both original sources contain a caption they must agree. It converts each selected
image to WebP without cropping or changing its dimensions, preserving all original
files. SHA-256 fingerprints and the real-video/AI provenance remain in the content
record. Generated JSON and image assets are committed so Vercel needs no access to
the local content folders. Import is an explicit editorial step, never part of the
deployment build.

`content:check` compares committed content and images with the verified local
originals without modifying either. `test:updates` checks the publication boundary,
future dates, New York's calendar, honest month-only dates, observed ordering and
unsafe external URLs.

## Dates and initial content

Four posts were publicly verified on October 29, 2026:

| Post                  | Date displayed   |
| --------------------- | ---------------- |
| Your Range, Your Pace | October 2026     |
| Beyond the Sole       | October 2026     |
| A Different Touch     | October 21, 2026 |
| After the Extra Steps | October 19, 2026 |

The first two only exposed relative times. They intentionally display the verified
month rather than a guessed exact day. Their observed chronology is maintained by
the explicit order field. Future scheduled November 2 and November 4 posts are
excluded. Individual public post URLs were unavailable; the archive instead offers
a clearly labeled link to the verified business profile.

All four selected originals use real video stills in AI-assisted promotional
layouts, as recorded in their production manifests. If a future imported original
is `ai_concept`, the full post displays a concept-image caption.

Publication evidence for this release is retained outside the Git repository in
`output/site-audit/updates-source-verification.json`.
