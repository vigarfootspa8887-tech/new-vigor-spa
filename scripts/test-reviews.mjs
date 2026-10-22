// Integration checks against a production build. Fixtures never reach the public site.
import assert from "node:assert/strict";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import next from "next";

process.env.GOOGLE_PLACES_API_KEY = "local-test-placeholder";
let scenario = "valid";
const originalFetch = global.fetch;
global.fetch = async (input, options = {}) => {
  const url = typeof input === "string" ? input : (input.url ?? String(input));
  if (!url.startsWith("https://places.googleapis.com/"))
    return originalFetch(input, options);
  if (scenario === "timeout") {
    return new Promise((_, reject) => {
      const abort = () => reject(options.signal.reason);
      if (options.signal.aborted) abort();
      else options.signal.addEventListener("abort", abort, { once: true });
    });
  }
  if (scenario === "denied") return new Response("{}", { status: 403 });
  if (scenario === "invalid-json") return new Response("not JSON");
  const place = {
    displayName: {
      text:
        scenario === "wrong-place" ? "Another business" : "New Vigor Foot Spa",
    },
    rating: 4.8,
    userRatingCount: 10,
    reviews:
      scenario === "malformed-reviews"
        ? [null, { text: { text: 42 } }]
        : scenario === "empty"
          ? []
          : [
              {
                rating: 4,
                text: {
                  text: "A review fixture used only for local integration checks.",
                },
                authorAttribution: { displayName: "Local test reviewer" },
                googleMapsUri: "https://maps.google.com/",
              },
            ],
  };
  return Response.json({ places: [place] });
};

(async () => {
  const app = next({
    dev: false,
    dir: path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."),
  });
  await app.prepare();
  const server = http.createServer(app.getRequestHandler());
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  try {
    for (const [mode, expected] of [
      ["missing-key", "missing-key"],
      ["valid", "ready"],
      ["denied", "google-403"],
      ["empty", "no-reviews"],
      ["wrong-place", "place-mismatch"],
      ["invalid-json", "request-error"],
      ["malformed-reviews", "no-reviews"],
      ["timeout", "request-error"],
    ]) {
      scenario = mode;
      if (mode === "missing-key") delete process.env.GOOGLE_PLACES_API_KEY;
      else process.env.GOOGLE_PLACES_API_KEY = "local-test-placeholder";
      const started = Date.now();
      const response = await originalFetch(url);
      const html = await response.text();
      const statuses = [...html.matchAll(/data-review-status="([^"]+)"/g)].map(
        (match) => match[1],
      );
      assert.equal(response.status, 200, mode);
      assert.equal(statuses.at(-1), expected, mode);
      assert.ok(
        html.includes('id="gallery"') && html.includes('id="contact"'),
        "Page content survives review failures",
      );
      if (mode === "timeout")
        assert.ok(Date.now() - started < 8500, "Google requests must time out");
      console.log(`PASS Google reviews: ${mode} → ${expected}`);
    }
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
    await app.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
