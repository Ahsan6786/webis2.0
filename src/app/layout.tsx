import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import LeadPopup from "@/components/LeadPopup";

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
      <body style={{ position: 'relative' }}>
        <style>{`
          @keyframes gradientMove {
            0% { transform: translate(-10%, -10%) rotate(0deg); }
            50% { transform: translate(10%, 10%) rotate(180deg); }
            100% { transform: translate(-10%, -10%) rotate(360deg); }
          }
        `}</style>
        {/* Global Moving Gradient */}
        <div style={{
          position: 'fixed',
          top: '-25%', left: '-25%',
          width: '150vw', height: '150vh',
          background: `
            radial-gradient(ellipse 60% 40% at 30% 60%, rgba(0,212,255,0.08) 0%, rgba(0,212,255,0.03) 30%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 70% 40%, rgba(0,120,200,0.1) 0%, rgba(0,120,200,0.04) 25%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
