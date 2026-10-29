import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const siteRoot = fileURLToPath(new URL("../", import.meta.url));
const args = process.argv.slice(2);
const checkOnly = args.includes("--check");
const rootIndex = args.indexOf("--assets-root");
const assetsRoot = path.resolve(
  rootIndex === -1 ? path.join(siteRoot, "..") : args[rootIndex + 1],
);
const source = JSON.parse(
  await readFile(path.join(siteRoot, "content/updates-source.json"), "utf8"),
);
const digest = (data) => createHash("sha256").update(data).digest("hex");
const today = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

if (source.version !== 1 || !Array.isArray(source.entries)) {
  throw new Error("Unsupported Updates source manifest.");
}

const records = [];
const images = [];
const ids = new Set();
const orders = new Set();
for (const selection of source.entries) {
  if (
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(selection.id ?? "") ||
    !/^week\d+$/.test(selection.package ?? "") ||
    !Number.isInteger(selection.post) ||
    ids.has(selection.id) ||
    !Number.isSafeInteger(selection.publication?.order) ||
    selection.publication.order < 1 ||
    orders.has(selection.publication.order)
  ) {
    throw new Error("Invalid or duplicate Updates source selection.");
  }
  ids.add(selection.id);
  orders.add(selection.publication.order);
  const publication = selection.publication;
  // Neither candidate dates nor the published/ asset directory prove publication.
  if (publication.status !== "published") continue;
  if (
    !/^\d{4}-\d{2}(-\d{2})?$/.test(publication.publishedOn ?? "") ||
    !/^\d{4}-\d{2}-\d{2}$/.test(publication.verifiedOn ?? "") ||
    !publication.evidence?.trim() ||
    !publication.dateEvidence?.trim() ||
    publication.publishedOn > today ||
    publication.verifiedOn > today ||
    publication.publishedOn > publication.verifiedOn
  ) {
    throw new Error(
      `Publication verification is missing or future-dated: ${selection.id}`,
    );
  }

  const packageDir = path.join(assetsRoot, "planned-posts", selection.package);
  const manifest = JSON.parse(
    await readFile(path.join(packageDir, "generation-manifest.json"), "utf8"),
  );
  const original = manifest.find((entry) => entry.post === selection.post);
  if (
    !original ||
    typeof original.filename !== "string" ||
    path.basename(original.filename) !== original.filename
  ) {
    throw new Error(`Original asset not found: ${selection.id}`);
  }
  const captionFile = `planned-posts/${selection.package}/vigor-foot-spa-week-${Number(selection.package.slice(4))}-content.md`;
  const markdown = await readFile(path.join(assetsRoot, captionFile), "utf8");
  const block = markdown
    .split(/^## /m)
    .find((section) => section.includes(`Image: \`${original.filename}\``));
  const title = block
    ?.split(/\r?\n/, 1)[0]
    .replace(/^.*? - /, "")
    .trim();
  const quoted = block?.match(/Post:\s*\r?\n((?:>[^\r\n]*(?:\r?\n|$))+)/)?.[1];
  const caption = quoted
    ?.split(/\r?\n/)
    .filter((line) => line.startsWith(">"))
    .map((line) => line.replace(/^> ?/, ""))
    .join("\n")
    .trim();
  const alt =
    original.alt_text ?? block?.match(/^Alt text: (.+)$/m)?.[1]?.trim();
  if (
    !title ||
    !caption ||
    !alt ||
    !original.source_kind ||
    !original.source_record
  ) {
    throw new Error(`Incomplete original content: ${selection.id}`);
  }
  if (original.caption && original.caption !== caption) {
    throw new Error(`Original caption sources disagree: ${selection.id}`);
  }
  const imageBuffer = await readFile(path.join(packageDir, original.filename));
  const { width, height } = await sharp(imageBuffer).metadata();
  const image = await sharp(imageBuffer).webp({ quality: 86 }).toBuffer();
  images.push({ id: selection.id, image });
  records.push({
    id: selection.id,
    title,
    caption,
    image: {
      src: `/images/updates/${selection.id}.webp`,
      alt,
      width,
      height,
    },
    publication,
    googlePostUrl: selection.googlePostUrl ?? null,
    source: {
      package: selection.package,
      kind: original.source_kind,
      record: original.source_record,
      imageFile: `planned-posts/${selection.package}/${original.filename}`,
      captionFile,
      imageSha256: digest(imageBuffer),
      captionSha256: digest(caption),
      processing:
        original.source_kind === "ai_concept"
          ? "AI-created conceptual promotional image."
          : "Promotional layout composed from a real source; original production manifest retained with the source package.",
    },
  });
}

records.sort((a, b) => b.publication.order - a.publication.order);
const contentFile = path.join(siteRoot, "src/content/updates.json");
const outputDir = path.join(siteRoot, "public/images/updates");
if (checkOnly) {
  const existing = JSON.parse(await readFile(contentFile, "utf8"));
  if (JSON.stringify(existing) !== JSON.stringify(records)) {
    throw new Error(
      "Updates content differs from the verified originals. Run npm run content:import.",
    );
  }
  for (const { id, image } of images) {
    const existingImage = await readFile(path.join(outputDir, `${id}.webp`));
    if (digest(existingImage) !== digest(image)) {
      throw new Error(`Updates image differs from its original: ${id}`);
    }
  }
  console.log(
    `Verified ${records.length} Updates against original captions, images and publication records.`,
  );
} else {
  await mkdir(path.dirname(contentFile), { recursive: true });
  await mkdir(outputDir, { recursive: true });
  for (const { id, image } of images) {
    await writeFile(path.join(outputDir, `${id}.webp`), image);
  }
  await writeFile(contentFile, `${JSON.stringify(records, null, 2)}\n`);
  console.log(
    `Imported ${records.length} verified Updates. Original assets were preserved.`,
  );
}
