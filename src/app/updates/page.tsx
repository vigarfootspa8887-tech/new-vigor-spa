import type { Metadata } from "next";
import Link from "next/link";
import { getUpdates } from "@/lib/get-updates";
import { Footer } from "../footer";
import { Navbar } from "../navbar";
import { FullUpdate } from "../update-post";
import { GOOGLE_PROFILE_URL, SOCIAL_METADATA } from "../site-info";

const title = "Updates | New Vigor Foot Spa";
const description =
  "The latest from New Vigor Foot Spa in Smithtown: a closer look at foot reflexology, bodywork, and the small details of a visit.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/updates" },
  openGraph: {
    ...SOCIAL_METADATA,
    title,
    description,
    url: "/updates",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: SOCIAL_METADATA.images,
  },
};

export default function UpdatesPage() {
  const posts = getUpdates();

  return (
    <>
      <Navbar currentPage="/updates" />
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-svh bg-bg-cream pt-28 pb-16 md:pt-36 md:pb-24"
      >
        <div className="mx-auto max-w-5xl px-6">
          <Link
            href="/#home"
            className="inline-flex min-h-11 items-center text-sm text-brown-warm underline underline-offset-4 hover:text-brown-deep"
          >
            Back to the Spa
          </Link>
          <div className="pt-5 pb-9 md:pb-12">
            <h1 className="font-serif text-5xl text-brown-deep md:text-6xl">
              From the Spa
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
              A closer look at our sessions, the small details, and time for
              yourself. News and notes from our team, also shared on Google.
            </p>
          </div>
          {posts.length ? (
            <div aria-label="Spa updates">
              {posts.map((post, index) => (
                <FullUpdate key={post.id} post={post} first={index === 0} />
              ))}
            </div>
          ) : (
            <p className="border-t border-brown-deep/15 py-12 text-gray-600">
              More from the spa is coming soon. Visit our Google profile for
              updates, or get in touch to plan your next visit.
            </p>
          )}
          <div className="flex flex-col items-start justify-between gap-3 border-t border-brown-deep/15 pt-8 text-sm sm:flex-row sm:items-center">
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-accent underline underline-offset-4 hover:text-brown-deep"
            >
              Visit Us on Google Maps <span aria-hidden="true">↗</span>
            </a>
            <Link
              href="/#contact"
              className="inline-flex min-h-11 items-center text-brown-warm underline underline-offset-4 hover:text-brown-deep"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
