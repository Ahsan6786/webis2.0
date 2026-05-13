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
        
        // Fade in
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

        // Count up for numbers
        const valEl = el.querySelector('.stat-value');
        if (valEl) {
          const rawValue = stats[i].value;
          const numericValue = parseFloat(rawValue.replace(/[^0-9.]/g, ''));
          
          if (!isNaN(numericValue)) {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: numericValue,
              duration: 2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
              },
              onUpdate: () => {
                const suffix = rawValue.replace(/[0-9.]/g, '');
                valEl.textContent = Math.floor(obj.val) + suffix;
              }
            });
          }
        }
      });
    }, sectionRef.current!);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#000000',
        padding: 'clamp(48px, 8vh, 80px) clamp(24px, 6vw, 96px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes float-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
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
            padding: '40px',
            background: '#0a0a0a',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            animation: `float-subtle 4s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        >
          <span className="stat-value" style={{
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
