'use client';

import dynamic from 'next/dynamic';

import HeroSection from '@/components/HeroSection';

// Lazy load heavy components
const HorizontalScroll = dynamic(() => import('@/components/HorizontalScroll'), { ssr: false });
const ImageShowcase = dynamic(() => import('@/components/ImageShowcase'), { ssr: false });
const BuildProcess = dynamic(() => import('@/components/BuildProcess'), { ssr: false });
const ShowcaseSection = dynamic(() => import('@/components/ShowcaseSection'), { ssr: false });
const ProjectBrowser = dynamic(() => import('@/components/ProjectBrowser'), { ssr: false });
const FinalCTA = dynamic(() => import('@/components/FinalCTA'), { ssr: false });
const PerformanceDashboard = dynamic(() => import('@/components/PerformanceDashboard'), { ssr: false });

export default function Home() {
  return (
    <>
      <main>
        {/* SECTION 1 — Hero / Opening */}
        <HeroSection />

        {/* SECTION 2 — Horizontal Scroll Dimensions */}
        <HorizontalScroll />

        {/* SECTION 3 — Build Process */}
        <BuildProcess />

        {/* SECTION 4 — Services Showcase */}
        <ShowcaseSection />

        {/* SECTION 5 — Engineering Performance */}
        <PerformanceDashboard />

        {/* SECTION 6 — Project Browser */}
        <ProjectBrowser />

        {/* SECTION 7 — Immersive Image Showcase (Testimonials) */}
        <ImageShowcase />

        {/* SECTION 8 — Final CTA */}
        <FinalCTA />
      </main>
    </>
  );
}
