import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "New Vigor Foot Spa | Relax. Recharge. Revitalize.",
  description:
    "Experience the ultimate relaxation at New Vigor Foot Spa. Foot reflexology, body massage, hot stone therapy, and aromatherapy in a peaceful setting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable}`}
    >
      <body className="font-sans antialiased">
          {children}
          <Analytics />
        </body>
    </html>
  );
}
