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

  const goToReview = useCallback(
    (index: number) => {
      const nextIndex = (index + reviews.length) % reviews.length;
      const card = trackRef.current?.children[nextIndex] as HTMLElement | undefined;

      card?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setActiveIndex(nextIndex);
    },
    [reviews.length],
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isPaused || prefersReducedMotion || reviews.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      goToReview(activeIndex + 1);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [activeIndex, goToReview, isPaused, reviews.length]);

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

    setActiveIndex(closestIndex);
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
        className="reviews-track -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-5 scroll-smooth md:mx-0 md:px-[calc(50%_-_190px)]"
        aria-label="Google customer reviews"
      >
        {reviews.map((review, index) => (
          <article
            key={`${review.authorName}-${index}`}
            className="flex w-[84vw] max-w-[390px] shrink-0 snap-center flex-col rounded-2xl border border-black/5 bg-white p-7 shadow-sm transition-shadow hover:shadow-md sm:w-[380px]"
          >
            <div className="mb-5 flex items-center gap-3">
              {review.photoUri ? (
                <img
                  src={review.photoUri}
                  alt={`${review.authorName}'s Google profile`}
                  className="size-12 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="flex size-12 items-center justify-center rounded-full bg-bg-warm font-serif text-lg text-brown-deep">
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
            <p className="mt-4 flex-1 leading-relaxed text-gray-600">
              “{review.text}”
            </p>
            <a
              href={review.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 text-sm font-semibold text-accent hover:text-accent-hover"
            >
              View on Google Maps <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>

      {reviews.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => goToReview(activeIndex - 1)}
            className="flex size-10 items-center justify-center rounded-full border border-brown-deep/15 bg-white text-xl text-brown-deep shadow-sm transition-colors hover:border-accent hover:text-accent"
            aria-label="Previous review"
          >
            ←
          </button>

          <div className="flex gap-2" aria-label="Select a review">
            {reviews.map((review, index) => (
              <button
                key={`${review.authorName}-dot-${index}`}
                type="button"
                onClick={() => goToReview(index)}
                className={`size-2 rounded-full transition-all ${
                  index === activeIndex ? "w-6 bg-accent" : "bg-brown-deep/20"
                }`}
                aria-label={`Go to review ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goToReview(activeIndex + 1)}
            className="flex size-10 items-center justify-center rounded-full border border-brown-deep/15 bg-white text-xl text-brown-deep shadow-sm transition-colors hover:border-accent hover:text-accent"
            aria-label="Next review"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
