"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./reduced-motion";

export type ReviewCardData = {
  authorName: string;
  authorUri?: string;
  photoUri?: string;
  rating: number;
  relativeTime: string;
  text: string;
  reviewUrl: string;
};

function Stars({ rating }: { rating: number }) {
  return (
    <span
      className="inline-flex gap-0.5 text-amber-700"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 20 20"
          className={`size-5 ${star <= Math.round(rating) ? "fill-current" : "fill-gray-200"}`}
          aria-hidden="true"
        >
          <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.12 3.45a1 1 0 0 0 .95.69h3.63c.97 0 1.37 1.24.59 1.81l-2.94 2.13a1 1 0 0 0-.36 1.12l1.12 3.45c.3.92-.75 1.69-1.54 1.12l-2.93-2.14a1 1 0 0 0-1.18 0L6.48 16.7c-.79.57-1.84-.2-1.54-1.12l1.12-3.45a1 1 0 0 0-.36-1.12L2.76 8.88c-.78-.57-.38-1.81.59-1.81h3.63a1 1 0 0 0 .95-.69l1.12-3.45Z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewerAvatar({ name, src }: { name: string; src?: string }) {
  const [failed, setFailed] = useState(false);
  return src && !failed ? (
    // Google profile URLs vary by author; preserve their attribution without proxying.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={40}
      height={40}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="size-10 shrink-0 rounded-full object-cover"
    />
  ) : (
    <span
      aria-hidden="true"
      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-bg-warm font-serif text-base text-brown-deep"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

export function ReviewsCarousel({ reviews }: { reviews: ReviewCardData[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const reducedMotion = useReducedMotion();
  const maxStartIndex = Math.max(0, reviews.length - visibleCount);
  const currentIndex = Math.min(activeIndex, maxStartIndex);

  const goToReview = useCallback(
    (index: number) => {
      const nextIndex =
        index > maxStartIndex ? 0 : index < 0 ? maxStartIndex : index;
      const track = trackRef.current;
      const first = track?.firstElementChild as HTMLElement | null;
      const target = track?.children[nextIndex] as HTMLElement | undefined;
      if (first && target) {
        track?.scrollTo({
          left: target.offsetLeft - first.offsetLeft,
          behavior: reducedMotion ? "instant" : "smooth",
        });
      }
      setActiveIndex(nextIndex);
    },
    [maxStartIndex, reducedMotion],
  );

  const syncActiveCard = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    // Pagination represents the leftmost card, not the card at the viewport center.
    const index = Math.round(track.scrollLeft / (first.offsetWidth + gap));
    setActiveIndex(Math.max(0, Math.min(index, maxStartIndex)));
  }, [maxStartIndex]);

  useEffect(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;
    const measure = () => {
      const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
      setVisibleCount(
        Math.min(
          reviews.length,
          Math.max(
            1,
            Math.round((track.clientWidth + gap) / (first.offsetWidth + gap)),
          ),
        ),
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(first);
    return () => observer.disconnect();
  }, [reviews.length]);

  useEffect(() => {
    if (isPaused || isInteracting || reducedMotion || maxStartIndex === 0)
      return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") goToReview(currentIndex + 1);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [
    currentIndex,
    goToReview,
    isInteracting,
    isPaused,
    maxStartIndex,
    reducedMotion,
  ]);

  if (reviews.length === 0) return null;

  return (
    <section
      aria-label="Google customer reviews"
      aria-roledescription="carousel"
      className="relative"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocusCapture={(event) => {
        if (!(
          event.target instanceof HTMLElement &&
          event.target.closest("[data-rotation-control]")
        ))
          setIsPaused(true);
      }}
      onTouchStart={() => setIsPaused(true)}
    >
      <div
        ref={trackRef}
        id="reviews-track"
        role="group"
        onScroll={syncActiveCard}
        className="reviews-track relative flex snap-x snap-mandatory gap-6 overflow-x-auto pb-3 motion-safe:scroll-smooth"
        aria-label="Review cards"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            setIsPaused(true);
            goToReview(currentIndex + (event.key === "ArrowRight" ? 1 : -1));
          }
        }}
      >
        {reviews.map((review, index) => (
          <article
            key={`${review.authorName}-${index}`}
            aria-label={`Review ${index + 1} of ${reviews.length}`}
            aria-roledescription="slide"
            className="flex w-full shrink-0 snap-start flex-col rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-shadow hover:shadow-md md:w-[calc((100%_-_1.5rem)/2)] md:p-6 lg:w-[calc((100%_-_3rem)/3)]"
          >
            <div className="mb-4 flex items-center gap-3">
              <ReviewerAvatar name={review.authorName} src={review.photoUri} />
              <div className="min-w-0">
                {review.authorUri ? (
                  <a
                    href={review.authorUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block truncate font-semibold text-brown-deep hover:text-accent"
                  >
                    {review.authorName}
                  </a>
                ) : (
                  <span className="block truncate font-semibold text-brown-deep">
                    {review.authorName}
                  </span>
                )}
                <span className="text-xs text-gray-600">
                  {review.relativeTime}
                </span>
              </div>
            </div>
            <Stars rating={review.rating} />
            <p className="mt-3 line-clamp-5 flex-1 text-sm leading-6 break-words text-gray-600">
              “{review.text}”
            </p>
            <a
              href={review.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-sm font-semibold text-accent hover:text-accent-hover"
            >
              View on Google Maps <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
      {maxStartIndex > 0 && (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => goToReview(currentIndex - 1)}
            aria-label="Previous review"
            aria-controls="reviews-track"
            className="flex size-11 items-center justify-center rounded-full border border-brown-deep/20 bg-white text-lg text-brown-deep hover:text-accent"
          >
            ←
          </button>
          <div className="flex" role="group" aria-label="Select a review">
            {Array.from({ length: maxStartIndex + 1 }, (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToReview(index)}
                aria-label={`Go to review ${index + 1}`}
                aria-controls="reviews-track"
                aria-current={index === currentIndex ? "true" : undefined}
                className="flex size-8 items-center justify-center rounded-full"
              >
                <span
                  aria-hidden="true"
                  className={`h-2 rounded-full transition-[width,background-color] ${index === currentIndex ? "w-5 bg-accent" : "w-2 bg-brown-deep/40"}`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => goToReview(currentIndex + 1)}
            aria-label="Next review"
            aria-controls="reviews-track"
            className="flex size-11 items-center justify-center rounded-full border border-brown-deep/20 bg-white text-lg text-brown-deep hover:text-accent"
          >
            →
          </button>
          {!reducedMotion && (
            <button
              type="button"
              data-rotation-control
              onClick={() => setIsPaused(!isPaused)}
              aria-label={
                isPaused
                  ? "Resume automatic reviews"
                  : "Pause automatic reviews"
              }
              className="min-h-11 rounded-full px-3 text-xs font-semibold text-brown-deep hover:text-accent"
            >
              {isPaused ? "Resume" : "Pause"}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
