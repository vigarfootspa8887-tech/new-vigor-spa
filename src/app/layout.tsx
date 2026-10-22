import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SITE_URL, SOCIAL_METADATA } from "./site-info";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "New Vigor Foot Spa | Relax. Recharge. Revitalize.",
  description:
    "Experience the ultimate relaxation at New Vigor Foot Spa. Foot reflexology, body massage, hot stone therapy, and aromatherapy in a peaceful setting.",
  icons: { icon: "/images/logo.png" },
  openGraph: {
    ...SOCIAL_METADATA,
    url: SITE_URL,
    title: "New Vigor Foot Spa | Smithtown, NY",
    description:
      "Foot reflexology, body massage and hot stone therapy at 27 W Main St, Smithtown, NY. Call (631) 656-8887 or book online.",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Skip to Content
        </a>
        {children}
        {process.env.VERCEL === "1" && <Analytics />}
      </body>
    </html>
  );
}
