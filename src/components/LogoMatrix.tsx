'use client';

import React from 'react';

export default function LogoMatrix() {
  const logos = [
    'SYSTEM.X', 'QUANTUM', 'NEXUS', 'VERTEX', 'MATRIX', 'VECTOR'
  ];

  return (
    <section style={{ padding: '100px 24px', background: 'transparent', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <p className="text-system" style={{ color: 'rgba(0,212,255,0.5)', marginBottom: '16px' }}>
          TRUST
        </p>
        <h2 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 300,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          color: '#ffffff',
          marginBottom: '60px',
          textTransform: 'uppercase',
        }}>
          SELECTED COLLABORATIONS
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '40px',
          alignItems: 'center',
          opacity: 0.3,
        }}>
          {logos.map((name, i) => (
            <div key={i} style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '20px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '0.2em',
              textAlign: 'center',
              padding: '20px',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '8px',
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.parentElement!.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.parentElement!.style.opacity = '0.3'}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
