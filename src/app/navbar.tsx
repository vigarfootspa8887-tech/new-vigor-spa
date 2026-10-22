"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { NAV_LINKS } from "./site-info";

export function Navbar() {
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !menuRef.current?.contains(event.target)
      ) {
        menuRef.current?.removeAttribute("open");
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/80 backdrop-blur-sm">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6"
      >
        <a
          href="#home"
          className="flex min-w-0 items-center gap-2 text-white sm:gap-3"
          onClick={() => menuRef.current?.removeAttribute("open")}
        >
          <Image
            src="/images/logo.png"
            alt=""
            width={56}
            height={56}
            className="size-12 shrink-0 object-contain sm:size-14"
          />
          <span
            className="font-serif text-base leading-tight sm:text-xl"
            translate="no"
          >
            New Vigor Foot Spa
          </span>
        </a>
        <ul className="hidden items-center gap-5 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex min-h-11 items-center text-xs tracking-widest text-white/85 uppercase transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <details
          ref={menuRef}
          className="relative shrink-0 lg:hidden"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              menuRef.current?.removeAttribute("open");
              menuRef.current?.querySelector("summary")?.focus();
            }
          }}
        >
          <summary
            aria-label="Navigation menu"
            className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full border border-white/25 text-white hover:bg-white/10 [&::-webkit-details-marker]:hidden"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="size-6"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </summary>
          <ul className="absolute right-0 top-14 max-h-[calc(100svh-7rem)] w-56 overflow-y-auto rounded-xl border border-white/15 bg-[#211714] p-2 shadow-xl">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-lg px-4 py-3 text-sm text-white/90 hover:bg-white/10 hover:text-white"
                  onClick={() => menuRef.current?.removeAttribute("open")}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </nav>
    </header>
  );
}
