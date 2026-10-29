export type UpdatePost = {
  id: string;
  title: string;
  caption: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  publication: {
    status: "draft" | "scheduled" | "published" | "archived";
    publishedOn: string | null;
    verifiedOn: string | null;
    order: number;
    evidence: string;
    dateEvidence: string;
  };
  googlePostUrl: string | null;
  source: {
    package: string;
    kind: string;
    record: string;
    imageFile: string;
    captionFile: string;
    imageSha256: string;
    captionSha256: string;
    processing: string;
  };
};

export function isPublicationDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}(-\d{2})?$/.test(value)) {
    return false;
  }
  const fullDate = value.length === 7 ? `${value}-01` : value;
  const parsed = new Date(`${fullDate}T12:00:00Z`);
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === fullDate
  );
}

export function isGooglePostUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      [
        "google.com",
        "www.google.com",
        "maps.google.com",
        "share.google",
        "posts.gle",
      ].includes(url.hostname)
    );
  } catch {
    return false;
  }
}

export function validateUpdates(value: unknown): UpdatePost[] {
  if (!Array.isArray(value)) throw new Error("Updates must be an array.");
  const ids = new Set<string>();
  const orders = new Set<number>();

  for (const post of value) {
    const fail = () => {
      throw new Error(`Invalid update: ${post?.id ?? "unknown"}`);
    };
    if (
      !post ||
      typeof post.id !== "string" ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.id) ||
      ids.has(post.id) ||
      typeof post.title !== "string" ||
      !post.title.trim() ||
      typeof post.caption !== "string" ||
      !post.caption.trim() ||
      post.image?.src !== `/images/updates/${post.id}.webp` ||
      typeof post.image?.alt !== "string" ||
      !post.image.alt.trim() ||
      !Number.isInteger(post.image.width) ||
      post.image.width <= 0 ||
      !Number.isInteger(post.image.height) ||
      post.image.height <= 0
    ) {
      fail();
    }
    const publication = post.publication;
    if (
      !publication ||
      !["draft", "scheduled", "published", "archived"].includes(
        publication.status,
      ) ||
      !Number.isSafeInteger(publication.order) ||
      publication.order < 1 ||
      orders.has(publication.order) ||
      (publication.publishedOn !== null &&
        !isPublicationDate(publication.publishedOn)) ||
      (publication.verifiedOn !== null &&
        (!isPublicationDate(publication.verifiedOn) ||
          publication.verifiedOn.length !== 10)) ||
      (post.googlePostUrl !== null && !isGooglePostUrl(post.googlePostUrl))
    ) {
      fail();
    }
    if (
      publication.status === "published" &&
      (!publication.publishedOn ||
        !publication.verifiedOn ||
        typeof publication.evidence !== "string" ||
        !publication.evidence.trim() ||
        typeof publication.dateEvidence !== "string" ||
        !publication.dateEvidence.trim() ||
        publication.publishedOn > publication.verifiedOn)
    ) {
      fail();
    }
    if (
      !post.source ||
      typeof post.source.kind !== "string" ||
      !post.source.kind ||
      typeof post.source.record !== "string" ||
      !post.source.record ||
      !/^[a-f0-9]{64}$/.test(post.source.imageSha256) ||
      !/^[a-f0-9]{64}$/.test(post.source.captionSha256)
    ) {
      fail();
    }
    ids.add(post.id);
    orders.add(publication.order);
  }
  return value as UpdatePost[];
}

export function selectPublishedUpdates(
  posts: readonly UpdatePost[],
  { now = new Date(), limit }: { now?: Date; limit?: number } = {},
): UpdatePost[] {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

  const published = posts
    .filter(({ publication }) => {
      return (
        publication.status === "published" &&
        publication.publishedOn !== null &&
        publication.verifiedOn !== null &&
        publication.evidence.trim() !== "" &&
        publication.publishedOn <= today &&
        publication.verifiedOn <= today
      );
    })
    // Explicit observed order preserves chronology when Google only shows a month.
    .sort((a, b) => b.publication.order - a.publication.order);

  return limit === undefined ? published : published.slice(0, limit);
}

export function formatUpdateDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    ...(date.length === 10 ? { day: "numeric" } : {}),
    timeZone: "UTC",
  }).format(new Date(`${date.length === 7 ? `${date}-01` : date}T12:00:00Z`));
}
