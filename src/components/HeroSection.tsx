'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroSection() {
  const [phase, setPhase] = useState<'init' | 'system' | 'headline' | 'done'>('init');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('system'), 200);
    const t2 = setTimeout(() => setPhase('headline'), 1000);
    const t3 = setTimeout(() => setPhase('done'), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Static atmospheric layers — no animation, no twinkling */}
      {/* Deep radial glow — fixed, subtle */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 60% 40% at 30% 60%, rgba(0,212,255,0.08) 0%, transparent 50%),
          radial-gradient(ellipse 40% 30% at 70% 40%, rgba(0,80,120,0.1) 0%, transparent 45%)
        `,
        pointerEvents: 'none',
      }} />

      {/* Hairline horizontal rule */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '6vw', right: '6vw',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.035) 30%, rgba(255,255,255,0.035) 70%, transparent)',
        pointerEvents: 'none',
      }} />

      {/* Main headline and content */}
      <motion.div layout style={{ textAlign: 'center', position: 'relative', zIndex: 2, padding: '0 24px' }}>
        <AnimatePresence>
          {(phase === 'system' || phase === 'headline' || phase === 'done') && (
            <motion.p
              key="brand"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '11px',
                fontWeight: 300,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '24px',
              }}
            >
              WEBIS
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(phase === 'headline' || phase === 'done') && (
            <motion.h1
              layout
              key="headline"
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(36px, 6.5vw, 100px)',
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                maxWidth: '900px',
                margin: '0 auto',
              }}
            >
              DIGITAL EXPERIENCES
              <br />
              <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
                SHOULD FEEL ALIVE.
              </span>
            </motion.h1>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === 'done' && (
            <motion.p
              key="sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginTop: '32px',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(13px, 1.4vw, 16px)',
                fontWeight: 300,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.28)',
              }}
            >
              Digital Engineering Studio
            </motion.p>
          )}
        </AnimatePresence>

        {/* Stats in Center */}
        <AnimatePresence>
          {phase === 'done' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginTop: '64px',
                display: 'flex',
                justifyContent: 'center',
                gap: 'clamp(24px, 5vw, 64px)',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(24px, 3.5vw, 48px)', fontWeight: 300, color: '#ffffff', display: 'block', lineHeight: 1 }}>38+</span>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Projects Delivered</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(24px, 3.5vw, 48px)', fontWeight: 300, color: '#ffffff', display: 'block', lineHeight: 1 }}>98%</span>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Client Retention</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(24px, 3.5vw, 48px)', fontWeight: 300, color: '#ffffff', display: 'block', lineHeight: 1 }}>4YRS</span>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>In Operation</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(24px, 3.5vw, 48px)', fontWeight: 300, color: '#ffffff', display: 'block', lineHeight: 1 }}>∞</span>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Lines of Intent</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
