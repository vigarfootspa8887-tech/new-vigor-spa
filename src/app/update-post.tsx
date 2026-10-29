import Image from "next/image";
import Link from "next/link";
import { formatUpdateDate, type UpdatePost as Post } from "@/lib/updates";
import { BOOKING_URL, PHONE_URL } from "./site-info";

export function UpdateDate({ post }: { post: Post }) {
  const date = post.publication.publishedOn!;
  return (
    <time dateTime={date} className="text-sm text-brown-warm">
      {formatUpdateDate(date)}
    </time>
  );
}

export function UpdateImage({
  post,
  preview = false,
  preload = false,
}: {
  post: Post;
  preview?: boolean;
  preload?: boolean;
}) {
  return (
    <Image
      src={post.image.src}
      alt={post.image.alt}
      width={post.image.width}
      height={post.image.height}
      sizes={
        preview
          ? "(min-width: 1280px) 384px, (min-width: 768px) 31vw, (min-width: 640px) 46vw, 100vw"
          : "(min-width: 1024px) 400px, (min-width: 768px) 40vw, 100vw"
      }
      preload={preload}
      className="h-auto w-full rounded-lg"
    />
  );
}

export function UpdatePreview({ post }: { post: Post }) {
  const href = `/updates#${post.id}`;
  const excerpt = post.caption.split(/(?<=[.!?])\s/)[0];
  return (
    <article className="flex h-full flex-col" data-update-id={post.id}>
      <Link href={href} aria-label={`Read ${post.title}`} className="block">
        <UpdateImage post={post} preview />
      </Link>
      <div className="flex flex-1 flex-col items-start pt-5">
        <UpdateDate post={post} />
        <h3 className="mt-2 font-serif text-2xl leading-snug text-brown-deep">
          <Link href={href} className="hover:text-accent">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 mb-4 max-w-prose leading-relaxed text-gray-600">
          {excerpt}
        </p>
        <Link
          href={href}
          className="mt-auto inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent underline underline-offset-4 hover:text-brown-deep"
          aria-label={`Read update: ${post.title}`}
        >
          Read update
        </Link>
      </div>
    </article>
  );
}

export function FullUpdate({ post, first }: { post: Post; first: boolean }) {
  const paragraphs = post.caption.split(/\n\s*\n/);
  return (
    <article
      id={post.id}
      aria-labelledby={`${post.id}-title`}
      className="scroll-mt-28 grid gap-6 border-t border-brown-deep/15 py-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-center md:gap-12 md:py-12"
      data-update-id={post.id}
    >
      <figure>
        <UpdateImage post={post} preload={first} />
        {post.source.kind === "ai_concept" && (
          <figcaption className="mt-2 text-xs text-gray-500">
            Concept image created with AI.
          </figcaption>
        )}
      </figure>
      <div>
        <UpdateDate post={post} />
        <h2
          id={`${post.id}-title`}
          className="mt-3 font-serif text-3xl leading-snug text-brown-deep lg:text-4xl"
        >
          <a href={`#${post.id}`} className="hover:text-accent">
            {post.title}
          </a>
        </h2>
        <div className="mt-5 max-w-prose space-y-4 leading-relaxed text-gray-600">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={
                paragraph.startsWith("#")
                  ? "text-sm text-gray-500 [overflow-wrap:anywhere]"
                  : ""
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href={BOOKING_URL}
            className="inline-flex min-h-11 items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-hover"
          >
            Book Online
          </a>
          <a
            href={PHONE_URL}
            className="inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4 hover:text-brown-deep"
          >
            Call Us
          </a>
          {post.googlePostUrl && (
            <a
              href={post.googlePostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-sm text-gray-600 underline underline-offset-4 hover:text-brown-deep"
            >
              View on Google{" "}
              <span className="ml-1" aria-hidden="true">
                ↗
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
