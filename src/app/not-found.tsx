import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-svh flex-col items-center justify-center gap-6 bg-bg-cream px-6 py-16 text-center text-brown-deep"
    >
      <h1 className="font-serif text-4xl">Page Not Found</h1>
      <p className="max-w-md text-gray-600">
        This page may have moved. Return to our homepage to explore services,
        pricing and appointments.
      </p>
      <Link
        href="/"
        className="rounded-full bg-accent px-7 py-3 font-semibold text-white hover:bg-accent-hover"
      >
        Back to Home
      </Link>
    </main>
  );
}
