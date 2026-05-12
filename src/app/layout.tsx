import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WEBIS — Digital Engineering Studio",
  description: "We engineer digital experiences that feel alive. Infrastructure, motion, intelligence — at the intersection of precision and poetry.",
  keywords: ["digital engineering", "web design", "motion design", "WEBIS", "digital studio"],
  authors: [{ name: "WEBIS" }],
  openGraph: {
    title: "WEBIS — Digital Engineering Studio",
    description: "Experiences should feel alive.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WEBIS — Digital Engineering Studio",
    description: "Experiences should feel alive.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
