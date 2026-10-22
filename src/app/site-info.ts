export const SITE_URL = "https://newvigorspa.com";
export const BUSINESS_NAME = "New Vigor Foot Spa";
export const PHONE_LABEL = "(631) 656-8887";
export const PHONE_URL = `tel:+1${PHONE_LABEL.replace(/\D/g, "")}`;
export const BOOKING_URL =
  "https://go.bychronos.com/l/smithtown-11787-new-vigor-foot-spa-806098/a/services?p=g";
export const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=New+Vigor+Foot+Spa%2C+27+W+Main+St%2C+Smithtown%2C+NY+11787";

export const SOCIAL_METADATA = {
  type: "website" as const,
  locale: "en_US",
  siteName: BUSINESS_NAME,
  images: [
    {
      url: "/images/gallery-reception-full.webp",
      width: 1280,
      height: 853,
      alt: "New Vigor Foot Spa reception",
    },
  ],
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#prices" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
] as const;
