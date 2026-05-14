'use client';

import dynamic from 'next/dynamic';

import HeroSection from '@/components/HeroSection';
import Navigation from '@/components/Navigation';
import SplashScreen from '@/components/SplashScreen';

// Lazy load heavy components
const HorizontalScroll = dynamic(() => import('@/components/HorizontalScroll'), { ssr: false });
const ImageShowcase = dynamic(() => import('@/components/ImageShowcase'), { ssr: false });
const BuildProcess = dynamic(() => import('@/components/BuildProcess'), { ssr: false });
const ShowcaseSection = dynamic(() => import('@/components/ShowcaseSection'), { ssr: false });
const ProjectBrowser = dynamic(() => import('@/components/ProjectBrowser'), { ssr: false });
const FinalCTA = dynamic(() => import('@/components/FinalCTA'), { ssr: false });
const PerformanceDashboard = dynamic(() => import('@/components/PerformanceDashboard'), { ssr: false });
const BlogSection = dynamic(() => import('@/components/BlogSection'), { ssr: false });
const TeamSection = dynamic(() => import('@/components/TeamSection'), { ssr: false });
const FAQSection = dynamic(() => import('@/components/FAQSection'), { ssr: false });

export default function Home() {
  return (
    <>
      <SplashScreen />
      <Navigation />
      <main>
        {/* SECTION 1 — Hero / Opening */}
        <HeroSection />

        {/* SECTION 2 — Horizontal Scroll Dimensions */}
        <HorizontalScroll />

        {/* SECTION 3 — Build Process */}
        <BuildProcess />

        {/* SECTION 4 — Services Showcase */}
        <ShowcaseSection />

        {/* SECTION 5 — Project Browser */}
        <ProjectBrowser />

        {/* SECTION 6 — Engineering Performance */}
        <PerformanceDashboard />

        {/* SECTION 7 — Immersive Image Showcase (Testimonials) */}
        <ImageShowcase />

        {/* SECTION 8 — Blogs */}
        <BlogSection />

        {/* SECTION 9 — Team */}
        <TeamSection />

        {/* SECTION 10 — FAQs */}
        <FAQSection />

        {/* SECTION 9 — Final CTA */}
        <FinalCTA />
      </main>
    </>
  );
}
