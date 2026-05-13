'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const projects = [
  { slug: 'blingish', name: 'BLINGISH', id: 'SYS.001', category: 'E-COMMERCE SYSTEM', firstImage: '1.png' },
  { slug: 'daily', name: 'DAILY', id: 'SYS.002', category: 'PRODUCTIVITY PLATFORM', firstImage: 'a.png' },
  { slug: 'farm', name: 'A1 FARMS', id: 'SYS.003', category: 'AGRICULTURAL SYSTEM', firstImage: 'f1.png' },
  { slug: 'ziya', name: 'ZIYA', id: 'SYS.004', category: 'AI INTERFACE', firstImage: 'z1.png' },
];

export default function ProjectBrowser() {
  useEffect(() => {
    // Preload first image of each project to make loading instant
    projects.forEach(project => {
      const img = new (window as any).Image();
      img.src = `/projects/${project.slug}/${project.firstImage}`;
    });
  }, []);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section style={{ padding: '100px 24px', background: 'rgba(3, 5, 8, 0.5)', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(32px, 5vw, 72px)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            color: '#ffffff',
            marginBottom: '32px',
            textTransform: 'uppercase',
          }}>
            PROJECTS
          </h2>

          <Link href="/projects/blingish" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'rgba(0,212,255,0.05)',
              border: '1px solid rgba(0,212,255,0.3)',
              color: '#00d4ff',
              padding: '14px 32px',
              fontFamily: 'Space Grotesk',
              fontSize: '14px',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              borderRadius: '30px',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              VIEW PROJECTS
              <span style={{ fontSize: '16px' }}>→</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
