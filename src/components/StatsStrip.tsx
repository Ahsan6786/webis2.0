'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '38+', label: 'PROJECTS DELIVERED' },
  { value: '98%', label: 'CLIENT RETENTION' },
  { value: '4YRS', label: 'IN OPERATION' },
  { value: '∞', label: 'LINES OF INTENT' },
];

export default function StatsStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.1,
          }
        );
      });
    }, sectionRef.current!);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#000000',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        padding: 'clamp(48px, 8vh, 80px) clamp(24px, 6vw, 96px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '2px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, rgba(0,212,255,0.01) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      {stats.map((stat, i) => (
        <div
          key={stat.label}
          ref={el => { itemRefs.current[i] = el; }}
          style={{
            opacity: 0,
            padding: 'clamp(24px, 3vw, 48px) clamp(16px, 2vw, 32px)',
            borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(32px, 4vw, 64px)',
            fontWeight: 100,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            lineHeight: 1,
          }}>
            {stat.value}
          </span>
          <span className="text-system" style={{ color: 'rgba(255,255,255,0.25)' }}>
            {stat.label}
          </span>
        </div>
      ))}
    </section>
  );
}
