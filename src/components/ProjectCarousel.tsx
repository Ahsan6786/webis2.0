'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

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
      {/* Fixed Header with Pill Buttons */}
      <div style={{ 
        position: 'fixed', 
        top: '20px', left: '20px', right: '20px', 
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pointerEvents: 'none',
      }}>
        <button 
          onClick={() => router.back()}
          style={{ 
            color: '#ffffff', 
            fontSize: '12px', 
            fontFamily: 'Space Grotesk',
            background: 'rgba(255,255,255,0.05)',
            padding: '10px 20px',
            borderRadius: '30px',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            pointerEvents: 'auto',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
        >
          ← BACK
        </button>

        <div style={{ 
          color: '#00d4ff', 
          fontSize: '12px', 
          fontFamily: 'Space Grotesk', 
          letterSpacing: '0.05em',
          background: 'rgba(0,212,255,0.05)',
          padding: '10px 20px',
          borderRadius: '30px',
          border: '1px solid rgba(0,212,255,0.1)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          pointerEvents: 'auto',
        }}>
          SWIPE LEFT TO VIEW MORE PROJECTS →
        </div>
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
                height: '100vh', 
                overflowY: 'auto', 
                scrollSnapAlign: 'start',
                padding: '100px 20px 40px 20px',
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

              {/* Vertical Stack with 0 gap and window decoration */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '12px',
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.01)',
              }}>
                {project.images.map((img, i) => (
                  <div key={img} style={{ width: '100%', position: 'relative' }}>
                    {/* Window header for the first image */}
                    {i === 0 && (
                      <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                      }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
                        <span style={{ marginLeft: '8px', color: 'rgba(255,255,255,0.25)', fontSize: '11px', fontFamily: 'Space Grotesk' }}>
                          system_window.exe
                        </span>
                      </div>
                    )}
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
