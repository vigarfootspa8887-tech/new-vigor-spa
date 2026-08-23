import Link from "next/link";
import type { ReactNode } from "react";

type LegalPageProps = {
  title: string;
  updated: string;
  children: ReactNode;
};

export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-bg-cream px-6 py-12 text-gray-700 md:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-5 border-b border-brown-deep/10 pb-8 sm:flex-row sm:items-center">
          <Link href="/" className="font-serif text-xl text-brown-deep hover:text-accent">
            New Vigor Foot Spa
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold tracking-wide text-accent hover:text-accent-hover"
          >
            ← Back to home
          </Link>
        </div>

        <header className="mb-12">
          <h1 className="font-serif text-4xl text-brown-deep md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-gray-500">Last updated: {updated}</p>
        </header>

        <div className="space-y-9 leading-7 [&_a]:font-medium [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-brown-deep [&_li]:ml-5 [&_li]:list-disc [&_p]:mt-3 [&_ul]:mt-3">
          {children}
        </div>
      </div>
    </main>
  );
}
