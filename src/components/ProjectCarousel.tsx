'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

interface Project {
  slug: string;
  images: string[];
}

interface ProjectCarouselProps {
  projects: Project[];
  initialSlug: string;
}

export default function ProjectCarousel({ projects, initialSlug }: ProjectCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the initial project
    if (containerRef.current) {
      const activeProjectElement = document.getElementById(`project-${initialSlug}`);
      if (activeProjectElement) {
        activeProjectElement.scrollIntoView({ behavior: 'auto', inline: 'start' });
      }
    }
  }, [initialSlug]);

  return (
    <main style={{ background: '#030508', minHeight: '100vh', color: '#ffffff', overflow: 'hidden' }}>
      {/* Fixed Header */}
      <div style={{ 
        position: 'fixed', 
        top: 0, left: 0, right: 0, 
        padding: '20px 24px', 
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(3, 5, 8, 0.8)',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '14px', fontFamily: 'Space Grotesk' }}>
          ← BACK TO ARCHIVE
        </Link>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', fontFamily: 'Space Grotesk' }}>
          SWIPE HORIZONTALLY TO SWITCH PROJECTS
        </span>
      </div>

      {/* Horizontal Container */}
      <div 
        ref={containerRef}
        style={{ 
          display: 'flex', 
          overflowX: 'auto', 
          scrollSnapType: 'x mandatory',
          width: '100vw',
          height: '100vh',
          marginTop: '60px', // Space for fixed header
        }}
      >
        {projects.map((project) => (
          <div 
            key={project.slug}
            id={`project-${project.slug}`}
            style={{ 
              minWidth: '100vw', 
              height: 'calc(100vh - 60px)', 
              overflowY: 'auto', 
              scrollSnapAlign: 'start',
              padding: '20px',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h1 style={{ 
                fontFamily: 'Inter', 
                fontSize: 'clamp(24px, 4vw, 48px)', 
                fontWeight: 300, 
                letterSpacing: '-0.02em', 
                textTransform: 'uppercase',
                marginBottom: '40px',
                color: '#ffffff'
              }}>
                {project.slug}
              </h1>

              {/* Vertical Stack with 0 gap */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {project.images.map((img, i) => (
                  <div key={img} style={{ width: '100%', position: 'relative' }}>
                    <img
                      src={`/projects/${project.slug}/${img}`}
                      alt={`${project.slug} screenshot`}
                      loading={i === 0 ? "eager" : "lazy"}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
