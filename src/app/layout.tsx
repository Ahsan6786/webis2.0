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
            radial-gradient(ellipse 80% 60% at 30% 60%, rgba(0,212,255,0.1) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 70% 40%, rgba(0,120,200,0.12) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(100,0,255,0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'gradientMove 30s ease-in-out infinite',
          filter: 'blur(150px)',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
