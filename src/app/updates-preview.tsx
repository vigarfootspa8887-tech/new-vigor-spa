import Link from "next/link";
import { getUpdates } from "@/lib/get-updates";
import { ScrollReveal } from "./scroll-reveal";
import { UpdatePreview } from "./update-post";

export function UpdatesPreview() {
  const posts = getUpdates(3);
  if (posts.length === 0) return null;

  return (
    <section id="updates" className="bg-bg-cream py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="mb-9 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-serif text-4xl text-brown-deep md:text-5xl">
              From the Spa
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-gray-600">
              A closer look at our sessions, the small details, and time for
              yourself.
            </p>
          </div>
          <Link
            href="/updates"
            className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-brown-deep/25 px-6 py-3 text-sm font-semibold text-brown-deep hover:bg-brown-deep/5"
          >
            All Updates
          </Link>
        </ScrollReveal>
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((post) => (
            <UpdatePreview key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
