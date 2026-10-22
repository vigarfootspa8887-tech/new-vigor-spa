"use client";

import { PHONE_LABEL, PHONE_URL } from "./site-info";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-svh flex-col items-center justify-center gap-6 bg-bg-cream px-6 py-16 text-center text-brown-deep"
    >
      <h1 className="font-serif text-4xl">Let’s Try That Again</h1>
      <p className="max-w-md text-gray-600">
        The page could not load. Please try again, or call us to make an
        appointment.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-accent px-7 py-3 font-semibold text-white hover:bg-accent-hover"
      >
        Try Again
      </button>
      <a href={PHONE_URL} className="underline underline-offset-4">
        Call {PHONE_LABEL}
      </a>
    </main>
  );
}
