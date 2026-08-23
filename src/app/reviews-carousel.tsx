"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
  const filledStars = Math.round(rating);

  return (
    <span
      className="inline-flex gap-0.5 text-amber-400"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 20 20"
          className={`size-5 ${star <= filledStars ? "fill-current" : "fill-gray-200"}`}
          aria-hidden="true"
        >
          <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.12 3.45a1 1 0 0 0 .95.69h3.63c.97 0 1.37 1.24.59 1.81l-2.94 2.13a1 1 0 0 0-.36 1.12l1.12 3.45c.3.92-.75 1.69-1.54 1.12l-2.93-2.14a1 1 0 0 0-1.18 0L6.48 16.7c-.79.57-1.84-.2-1.54-1.12l1.12-3.45a1 1 0 0 0-.36-1.12L2.76 8.88c-.78-.57-.38-1.81.59-1.81h3.63a1 1 0 0 0 .95-.69l1.12-3.45Z" />
        </svg>
      ))}
    </span>
  );
}

export function ReviewsCarousel({ reviews }: { reviews: ReviewCardData[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(1);
  const maxStartIndex = Math.max(0, reviews.length - visibleCount);
  const currentIndex = Math.min(activeIndex, maxStartIndex);

  const goToReview = useCallback(
    (index: number) => {
      const nextIndex =
        index > maxStartIndex ? 0 : index < 0 ? maxStartIndex : index;
      const track = trackRef.current;
      const cards = Array.from(track?.children ?? []) as HTMLElement[];
      const firstCard = cards[0];
      const card = cards[nextIndex];

      track?.scrollTo({
        left: card && firstCard ? card.offsetLeft - firstCard.offsetLeft : 0,
        behavior: "smooth",
      });
      setActiveIndex(nextIndex);
    },
    [maxStartIndex],
  );

  useEffect(() => {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild as HTMLElement | null;

    if (!track || !firstCard) {
      return;
    }

    const measureVisibleCards = () => {
      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
      const count = Math.max(
        1,
        Math.floor((track.clientWidth + gap) / (firstCard.offsetWidth + gap)),
      );

      setVisibleCount(Math.min(count, reviews.length));
    };

    measureVisibleCards();
    const observer = new ResizeObserver(measureVisibleCards);
    observer.observe(track);

    return () => observer.disconnect();
  }, [reviews.length]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isPaused || prefersReducedMotion || maxStartIndex < 1) {
      return;
    }

    const timer = window.setInterval(() => {
      goToReview(currentIndex + 1);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [currentIndex, goToReview, isPaused, maxStartIndex]);

  const syncActiveCard = () => {
    const track = trackRef.current;
    const cards = Array.from(track?.children ?? []) as HTMLElement[];

    if (!track || cards.length === 0) {
      return;
    }

    const center = track.scrollLeft + track.clientWidth / 2;
    const closestIndex = cards.reduce((bestIndex, card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const bestCard = cards[bestIndex];
      const bestCenter = bestCard.offsetLeft + bestCard.offsetWidth / 2;

      return Math.abs(cardCenter - center) < Math.abs(bestCenter - center)
        ? index
        : bestIndex;
    }, 0);

    setActiveIndex(Math.min(closestIndex, maxStartIndex));
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div
        ref={trackRef}
        onScroll={syncActiveCard}
        className="reviews-track -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-3 scroll-smooth md:mx-0 md:px-0"
        aria-label="Google customer reviews"
      >
        {reviews.map((review, index) => (
          <article
            key={`${review.authorName}-${index}`}
            className="flex w-[82vw] max-w-[350px] shrink-0 snap-start flex-col rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:w-[340px] md:w-[calc((100%_-_1.5rem)/2)] md:max-w-none md:p-6 lg:w-[calc((100%_-_3rem)/3)]"
          >
            <div className="mb-5 flex items-center gap-3">
              {review.photoUri ? (
                <img
                  src={review.photoUri}
                  alt={`${review.authorName}'s Google profile`}
                className="size-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="flex size-10 items-center justify-center rounded-full bg-bg-warm font-serif text-base text-brown-deep">
                  {review.authorName.charAt(0).toUpperCase()}
                </span>
              )}
              <span className="min-w-0">
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
                <span className="text-xs text-gray-500">{review.relativeTime}</span>
              </span>
            </div>

            <Stars rating={review.rating} />
            <p className="mt-3 line-clamp-5 flex-1 text-sm leading-6 text-gray-600">
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
        <div className="mt-2 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => goToReview(currentIndex - 1)}
            className="flex size-9 items-center justify-center rounded-full border border-brown-deep/15 bg-white text-lg text-brown-deep shadow-sm transition-colors hover:border-accent hover:text-accent"
            aria-label="Previous review"
          >
            ←
          </button>

          <div className="flex gap-2" aria-label="Select a review">
            {Array.from({ length: maxStartIndex + 1 }, (_, index) => (
              <button
                key={`review-position-${index}`}
                type="button"
                onClick={() => goToReview(index)}
                className={`size-2 rounded-full transition-all ${
                  index === currentIndex ? "w-6 bg-accent" : "bg-brown-deep/20"
                }`}
                aria-label={`Go to review ${index + 1}`}
                aria-current={index === currentIndex ? "true" : undefined}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goToReview(currentIndex + 1)}
            className="flex size-9 items-center justify-center rounded-full border border-brown-deep/15 bg-white text-lg text-brown-deep shadow-sm transition-colors hover:border-accent hover:text-accent"
            aria-label="Next review"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
