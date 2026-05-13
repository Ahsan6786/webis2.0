'use client';

import { useState } from 'react';
import Link from 'next/link';

const projects = [
  { slug: 'blingish', name: 'BLINGISH', id: 'SYS.001', category: 'E-COMMERCE SYSTEM' },
  { slug: 'daily', name: 'DAILY', id: 'SYS.002', category: 'PRODUCTIVITY PLATFORM' },
  { slug: 'farm', name: 'A1 FARMS', id: 'SYS.003', category: 'AGRICULTURAL SYSTEM' },
  { slug: 'ziya', name: 'ZIYA', id: 'SYS.004', category: 'AI INTERFACE' },
];

export default function ProjectBrowser() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section style={{ padding: '100px 24px', background: 'rgba(3, 5, 8, 0.5)', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p className="text-system" style={{ color: 'rgba(0,212,255,0.5)', marginBottom: '16px' }}>
          PROJECT BROWSER
        </p>
        <h2 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(32px, 5vw, 72px)',
          fontWeight: 300,
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
          color: '#ffffff',
          marginBottom: '60px',
        }}>
          SELECTED<br />
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>SYSTEMS.</span>
        </h2>

        {/* Asymmetrical Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '32px',
          position: 'relative',
        }}>
          {projects.map((project, i) => {
            const isHovered = hoveredIndex === i;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== i;

            // Asymmetrical column spans
            const colSpan = i === 0 ? 'span 7' : i === 1 ? 'span 5' : i === 2 ? 'span 5' : 'span 7';
            const height = i === 0 || i === 3 ? '450px' : '350px';

            return (
              <div
                key={project.slug}
                style={{
                  gridColumn: colSpan,
                  height: height,
                  position: 'relative',
                  opacity: isDimmed ? 0.3 : 1,
                  transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link href={`/projects/${project.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255,255,255,0.02)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '4px',
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <p className="text-system" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px' }}>
                          {project.id}
                        </p>
                        <h3 style={{ fontFamily: 'Inter', fontSize: '24px', fontWeight: 300, color: '#ffffff', marginTop: '4px' }}>
                          {project.name}
                        </h3>
                      </div>
                      <span style={{
                        fontFamily: 'Space Grotesk',
                        fontSize: '10px',
                        color: '#00d4ff',
                        border: '1px solid rgba(0,212,255,0.2)',
                        padding: '2px 6px',
                        borderRadius: '2px',
                      }}>
                        {project.category}
                      </span>
                    </div>

                    {/* Footer */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontFamily: 'Space Grotesk' }}>
                        VIEW SYSTEM →
                      </span>
                      <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px', fontFamily: 'Space Grotesk' }}>
                        LOC // 00{i + 1}
                      </span>
                    </div>

                    {/* Subtle glow */}
                    <div style={{
                      position: 'absolute',
                      bottom: '-20px',
                      right: '-20px',
                      width: '100px',
                      height: '100px',
                      background: 'radial-gradient(circle at center, rgba(0,212,255,0.05) 0%, transparent 70%)',
                      pointerEvents: 'none',
                    }} />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="gridColumn"] {
            grid-column: span 1 !important;
            height: 350px !important;
          }
        }
      `}</style>
    </section>
  );
}
