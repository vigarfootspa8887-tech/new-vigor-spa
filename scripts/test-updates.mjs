import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  formatUpdateDate,
  isGooglePostUrl,
  isPublicationDate,
  selectPublishedUpdates,
  validateUpdates,
} from "../src/lib/updates.ts";

const records = JSON.parse(
  await readFile(
    new URL("../src/content/updates.json", import.meta.url),
    "utf8",
  ),
);
const posts = validateUpdates(records);
const now = new Date("2026-10-29T16:00:00-04:00");
const copy = () => structuredClone(posts[0]);

test("home uses the three newest verified entries and the archive retains full captions", () => {
  assert.deepEqual(
    selectPublishedUpdates(posts, { now, limit: 3 }).map(({ id }) => id),
    ["your-range-your-pace", "beyond-the-sole", "a-different-touch"],
  );
  assert.equal(selectPublishedUpdates(posts, { now }).length, 4);
  assert.match(posts[0].caption, /#AssistedMovement #ArmCare #YourComfort$/);
});

test("drafts, scheduled content, archived entries and unverified entries stay off the site", () => {
  for (const status of ["draft", "scheduled", "archived"]) {
    const post = copy();
    post.publication.status = status;
    assert.equal(selectPublishedUpdates([post], { now }).length, 0);
  }
  const unverified = copy();
  unverified.publication.verifiedOn = null;
  assert.equal(selectPublishedUpdates([unverified], { now }).length, 0);
  const noEvidence = copy();
  noEvidence.publication.evidence = "";
  assert.equal(selectPublishedUpdates([noEvidence], { now }).length, 0);
  assert.throws(() => validateUpdates([unverified]), /Invalid update/);
});

test("future publication dates and future verification dates stay off the site", () => {
  for (const date of ["2026-11", "2026-11-02", "2026-10-30"]) {
    const post = copy();
    post.publication.publishedOn = date;
    assert.equal(selectPublishedUpdates([post], { now }).length, 0);
  }
  const post = copy();
  post.publication.verifiedOn = "2026-10-30";
  assert.equal(selectPublishedUpdates([post], { now }).length, 0);
});

test("publication gates follow New York's calendar rather than the UTC date", () => {
  const post = copy();
  post.publication.publishedOn = "2026-10-29";
  post.publication.verifiedOn = "2026-10-29";
  assert.equal(
    selectPublishedUpdates([post], { now: new Date("2026-10-29T02:00:00Z") })
      .length,
    0,
  );
  assert.equal(
    selectPublishedUpdates([post], { now: new Date("2026-10-29T04:00:00Z") })
      .length,
    1,
  );
});

test("month precision is displayed honestly without manufacturing a day", () => {
  assert.equal(formatUpdateDate("2026-10"), "October 2026");
  assert.equal(formatUpdateDate("2026-10-21"), "October 21, 2026");
  assert.equal(isPublicationDate("2026-02-29"), false);
  assert.equal(isPublicationDate("2028-02-29"), true);
  assert.equal(isPublicationDate("2026-13"), false);
  assert.equal(isPublicationDate("3 days ago"), false);
});

test("ambiguous dates retain verified post order, independent of array order", () => {
  const reversed = [...posts].reverse();
  assert.deepEqual(
    selectPublishedUpdates(reversed, { now }).map(({ id }) => id),
    posts.map(({ id }) => id),
  );
  assert.equal(reversed[0].id, posts.at(-1).id);
});

test("bad date records, duplicate identifiers and duplicate publication orders fail validation", () => {
  const invalidDate = copy();
  invalidDate.publication.publishedOn = "2026-02-30";
  assert.throws(() => validateUpdates([invalidDate]), /Invalid update/);
  assert.throws(() => validateUpdates([posts[0], posts[0]]), /Invalid update/);
  const duplicateOrder = copy();
  duplicateOrder.id = "duplicate-order";
  duplicateOrder.image.src = "/images/updates/duplicate-order.webp";
  assert.throws(
    () => validateUpdates([posts[0], duplicateOrder]),
    /Invalid update/,
  );
});

test("external links and local image paths cannot be silently replaced with arbitrary URLs", () => {
  assert.equal(isGooglePostUrl("https://share.google/verified-post"), true);
  assert.equal(isGooglePostUrl("https://www.google.com/maps/"), true);
  for (const url of [
    "javascript:alert(1)",
    "http://www.google.com/maps",
    "https://google.com.evil.example/post",
    "https://evil.example/google.com",
    "https://visitor@www.google.com/maps",
  ]) {
    assert.equal(isGooglePostUrl(url), false);
  }
  const post = copy();
  post.googlePostUrl = "https://example.com/not-google";
  assert.throws(() => validateUpdates([post]), /Invalid update/);
  post.googlePostUrl = null;
  post.image.src = "https://example.com/tracking-image.jpg";
  assert.throws(() => validateUpdates([post]), /Invalid update/);
});

test("empty content has a usable empty selection rather than a render error", () => {
  assert.deepEqual(
    selectPublishedUpdates(validateUpdates([]), { now, limit: 3 }),
    [],
  );
});
