import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black py-8">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="mb-2 font-serif text-lg text-white/80">
          New Vigor Foot Spa
        </p>
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} New Vigor Foot Spa. All rights
          reserved.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs text-gray-400">
          <Link
            href="/updates"
            className="inline-flex min-h-11 items-center hover:text-white/80"
          >
            Updates
          </Link>
          <Link
            href="/privacy"
            className="inline-flex min-h-11 items-center hover:text-white/80"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="inline-flex min-h-11 items-center hover:text-white/80"
          >
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
}
