'use client';

import dynamic from 'next/dynamic';

import HeroSection from '@/components/HeroSection';

// Lazy load heavy components
const HorizontalScroll = dynamic(() => import('@/components/HorizontalScroll'), { ssr: false });
const ImageShowcase = dynamic(() => import('@/components/ImageShowcase'), { ssr: false });
const BuildProcess = dynamic(() => import('@/components/BuildProcess'), { ssr: false });
const ShowcaseSection = dynamic(() => import('@/components/ShowcaseSection'), { ssr: false });
const FinalCTA = dynamic(() => import('@/components/FinalCTA'), { ssr: false });

export default function Home() {
  return (
    <>
      <main>
        {/* SECTION 1 — Hero / Opening */}
        <HeroSection />

        {/* SECTION 2 — Horizontal Scroll Dimensions */}
        <HorizontalScroll />

        {/* SECTION 3 — Immersive Image Showcase */}
        <ImageShowcase />

        {/* SECTION 4 — Build Process */}
        <BuildProcess />

        {/* SECTION 5 — Project Showcase */}
        <ShowcaseSection />

        {/* SECTION 6 — Final CTA */}
        <FinalCTA />
      </main>
    </>
  );
}
