'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const projects = [
  { slug: 'blingish', name: 'BLINGISH', id: 'SYS.001', category: 'E-COMMERCE SYSTEM', firstImage: '1.webp' },
  { slug: 'daily', name: 'DAILY', id: 'SYS.002', category: 'PRODUCTIVITY PLATFORM', firstImage: 'a.webp' },
  { slug: 'farm', name: 'A1 FARMS', id: 'SYS.003', category: 'AGRICULTURAL SYSTEM', firstImage: 'f1.webp' },
  { slug: 'ziya', name: 'ZIYA', id: 'SYS.004', category: 'AI INTERFACE', firstImage: 'z1.webp' },
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
    <section style={{ padding: '100px 24px', background: 'transparent', position: 'relative' }}>
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
            OUR PRODUCTS
          </h2>

          <Link href="/projects/blingish" style={{ textDecoration: 'none' }}>
            <button
              style={{
                background: '#ffffff',
                border: 'none',
                color: '#030508',
                padding: '14px 32px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                cursor: 'pointer',
                borderRadius: '30px',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#00d4ff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#ffffff';
              }}
            >
              VIEW PRODUCTS
              <span style={{ fontSize: '16px' }}>→</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
