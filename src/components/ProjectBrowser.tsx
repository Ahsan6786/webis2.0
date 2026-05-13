'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const projects = [
  { slug: 'blingish', name: 'BLINGISH', id: 'SYS.001', category: 'E-COMMERCE SYSTEM' },
  { slug: 'daily', name: 'DAILY', id: 'SYS.002', category: 'PRODUCTIVITY PLATFORM' },
  { slug: 'farm', name: 'A1 FARMS', id: 'SYS.003', category: 'AGRICULTURAL SYSTEM' },
  { slug: 'ziya', name: 'ZIYA', id: 'SYS.004', category: 'AI INTERFACE' },
];

export default function ProjectBrowser() {
  useEffect(() => {
    // Preload first image of each project to make loading instant
    projects.forEach(project => {
      const img = new (window as any).Image();
      img.src = `/projects/${project.slug}/a.png`;
    });
  }, []);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section style={{ padding: '100px 24px', background: 'rgba(3, 5, 8, 0.5)', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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

        <Link href="/projects/daily" style={{ textDecoration: 'none' }}>
          <button style={{
            background: 'transparent',
            border: '1px solid rgba(0,212,255,0.4)',
            color: '#00d4ff',
            padding: '12px 24px',
            fontFamily: 'Space Grotesk',
            fontSize: '14px',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            borderRadius: '4px',
            transition: 'all 0.3s ease',
          }}>
            VIEW PROJECTS →
          </button>
        </Link>
      </div>
    </section>
  );
}
