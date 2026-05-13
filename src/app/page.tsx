'use client';

import dynamic from 'next/dynamic';

import HeroSection from '@/components/HeroSection';

// Lazy load heavy components
const LogoMatrix = dynamic(() => import('@/components/LogoMatrix'), { ssr: false });
const BuildProcess = dynamic(() => import('@/components/BuildProcess'), { ssr: false });
const ShowcaseSection = dynamic(() => import('@/components/ShowcaseSection'), { ssr: false });
const ProjectBrowser = dynamic(() => import('@/components/ProjectBrowser'), { ssr: false });
const ImageShowcase = dynamic(() => import('@/components/ImageShowcase'), { ssr: false });
const FinalCTA = dynamic(() => import('@/components/FinalCTA'), { ssr: false });

export default function Home() {
  return (
    <>
      <main>
        {/* 1. HERO */}
        <HeroSection />

        {/* 2. TRUST / LOGO MATRIX */}
        <LogoMatrix />

        {/* 3. PROCESS */}
        <BuildProcess />

        {/* 4. SERVICES */}
        <ShowcaseSection />

        {/* 5. PROJECT ARCHIVE */}
        <ProjectBrowser />

        {/* 6. TESTIMONIALS */}
        <ImageShowcase />

        {/* 7. FINAL CTA */}
        <FinalCTA />
      </main>
    </>
  );
}
