import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./scroll-fix.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TDA Global - Connect Vietnamese Products with Global Markets",
    template: "%s | TDA Global"
  },
  description: "TDA Global brings precision, creativity, and clarity to global eCommerce. From product design to order fulfillment, we connect Vietnamese products with global markets.",
  keywords: [
    "TDA Global",
    "eCommerce",
    "Vietnamese products",
    "global markets",
    "product design",
    "order fulfillment",
    "international trade",
    "Vietnam export",
    "handmade products",
    "Etsy",
    "Amazon",
    "Shopify"
  ],
  authors: [{ name: "TDA Global" }],
  creator: "TDA Global",
  publisher: "TDA Global",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
    languages: {
      "en": "/en",
      "vi": "/vi",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    title: "TDA Global - Connect Vietnamese Products with Global Markets",
    description: "TDA Global brings precision, creativity, and clarity to global eCommerce. From product design to order fulfillment, we connect Vietnamese products with global markets.",
    siteName: "TDA Global",
    images: [
      {
        url: "/images/tda-global-logo.png",
        width: 1200,
        height: 630,
        alt: "TDA Global Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TDA Global - Connect Vietnamese Products with Global Markets",
    description: "TDA Global brings precision, creativity, and clarity to global eCommerce. From product design to order fulfillment, we connect Vietnamese products with global markets.",
    images: ["/images/tda-global-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    // yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    // yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32', type: 'image/x-icon' },
      { url: '/images/tda-global-logo.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/tda-global-logo.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/images/tda-global-logo.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/images/tda-global-logo.png',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
        {children}
      </body>
    </html>
  );
}
