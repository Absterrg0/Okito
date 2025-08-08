import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: "Okito -  Supercharged Solana Development",
    template: "%s | Okito",
  },
  description: "Your comprehensive description that explains what your app does and why users should care. Keep it under 160 characters.",
  
  // Keywords for SEO (use sparingly and relevantly)
  keywords: ["keyword1", "keyword2", "keyword3", "relevant", "terms"],
  
  // Author and creator information
  authors: [{ name: "Okito", url: "https://okito.dev" }],
  creator: "Okito",
  publisher: "Okito",
  
  // Canonical URL and robots
  metadataBase: new URL("https://okito.dev"),
  
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
  
  // Open Graph metadata for social sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://okito.dev",
    title: "Okito -  Supercharged Solana Development",
    description: "Your comprehensive description for social media sharing.",
    siteName: "Okito",
    images: [
      {
        url: "/og-image.png", // 1200x630px recommended
        width: 1200,
        height: 630,
        alt: "Okito -  Supercharged Solana Development",
      },
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Okito -  Supercharged Solana Development",
    description: "Okito is a supercharged Solana development toolkit that makes building production-ready applications easy and efficient.",
    creator: "@notabbytwt",
    site: "@okitoLabs",
    images: ["/twitter-image.png"], // 1200x675px recommended
  },
  

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Analytics></Analytics>

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}