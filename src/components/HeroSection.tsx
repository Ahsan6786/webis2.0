'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function HeroSection() {
  const [phase, setPhase] = useState<'init' | 'system' | 'headline' | 'done'>('init');
  const sectionRef = useRef<HTMLDivElement>(null);

  // Mouse position for Pressure Field Interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for delayed inertia (Temporal Motion Design)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  // Parallax transforms for Invisible Depth System
  const bgTranslateX = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const bgTranslateY = useTransform(springY, [-0.5, 0.5], [-15, 15]);
  const textTranslateX = useTransform(springX, [-0.5, 0.5], [-5, 5]);
  const textTranslateY = useTransform(springY, [-0.5, 0.5], [-5, 5]);
  const statsTranslateX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const statsTranslateY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('system'), 300);
    const t2 = setTimeout(() => setPhase('headline'), 1800);
    const t3 = setTimeout(() => setPhase('done'), 3400);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: '#030303', // Slightly lifted black
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── 3. REACTIVE DARKNESS & DEPTH ── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-10%', // Bleed for parallax
          background: `
            radial-gradient(ellipse 70% 50% at 30% 60%, rgba(0,212,255,0.02) 0%, transparent 80%),
            radial-gradient(ellipse 50% 40% at 70% 40%, rgba(0,80,120,0.03) 0%, transparent 70%),
            radial-gradient(circle at 50% 50%, rgba(5, 5, 5, 1) 0%, rgba(0, 0, 0, 1) 100%)
          `,
          x: bgTranslateX,
          y: bgTranslateY,
          pointerEvents: 'none',
        }}
      />

      {/* ── 8. MICRODETAILS (Engineering Lines) ── */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '4vw', right: '4vw',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.015) 20%, rgba(255,255,255,0.015) 80%, transparent)',
        pointerEvents: 'none',
      }} />
      
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '15vh', bottom: '15vh',
        width: '1px',
        background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.01) 20%, rgba(255,255,255,0.01) 80%, transparent)',
        pointerEvents: 'none',
      }} />

      {/* Technical Marker */}
      <div style={{
        position: 'absolute',
        top: '15vh',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: '10px',
        color: 'rgba(255,255,255,0.15)',
        letterSpacing: '0.2em',
        pointerEvents: 'none',
      }}>
        [ SYSTEM.INIT ]
      </div>

      {/* ── 4. TYPOGRAPHY ENGINEERING ── */}
      <motion.div
        style={{
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
          padding: '0 24px',
          x: textTranslateX,
          y: textTranslateY,
        }}
      >
        <AnimatePresence>
          {(phase === 'headline' || phase === 'done') && (
            <motion.h1
              key="headline"
              initial={{ opacity: 0, y: 30, filter: 'blur(15px)', letterSpacing: '-0.03em' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', letterSpacing: '-0.01em' }}
              transition={{ 
                duration: 2.2, 
                ease: [0.16, 1, 0.3, 1],
                letterSpacing: { duration: 3, ease: [0.16, 1, 0.3, 1] }
              }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(32px, 6vw, 90px)',
                fontWeight: 300,
                lineHeight: 1.05,
                color: '#ffffff',
                maxWidth: '1000px',
                margin: '0 auto',
              }}
            >
              DIGITAL EXPERIENCES
              <br />
              <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>
                SHOULD FEEL ALIVE.
              </span>
            </motion.h1>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === 'done' && (
            <motion.p
              key="sub"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginTop: '40px',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(11px, 1.2vw, 14px)',
                fontWeight: 300,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
              }}
            >
              Engineering Studio / System Design
            </motion.p>
          )}
        </AnimatePresence>

        {/* ── 6. STATS REFINEMENT ── */}
        <AnimatePresence>
          {phase === 'done' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginTop: '80px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 'clamp(16px, 3vw, 40px)',
                x: statsTranslateX,
                y: statsTranslateY,
              }}
            >
              {/* Stat 1 */}
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(20px, 3vw, 36px)', fontWeight: 300, color: '#ffffff', display: 'block', lineHeight: 1 }}>
                  <AnimatedNumber value={38} />+
                </span>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '9px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '8px', display: 'block' }}>Projects</span>
              </div>

              {/* Divider */}
              <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.05)' }} />

              {/* Stat 2 */}
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(20px, 3vw, 36px)', fontWeight: 300, color: '#ffffff', display: 'block', lineHeight: 1 }}>
                  <AnimatedNumber value={98} />%
                </span>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '9px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '8px', display: 'block' }}>Retention</span>
              </div>

              {/* Divider */}
              <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.05)' }} />

              {/* Stat 3 */}
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(20px, 3vw, 36px)', fontWeight: 300, color: '#ffffff', display: 'block', lineHeight: 1 }}>
                  4 YRS
                </span>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '9px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '8px', display: 'block' }}>Operation</span>
              </div>

              {/* Divider */}
              <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.05)' }} />

              {/* Stat 4 */}
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(20px, 3vw, 36px)', fontWeight: 300, color: '#ffffff', display: 'block', lineHeight: 1 }}>
                  [ ∞ ]
                </span>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '9px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '8px', display: 'block' }}>Intent</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bottom technical markers */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '4vw', right: '4vw',
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: '9px',
        color: 'rgba(255,255,255,0.15)',
        letterSpacing: '0.1em',
        pointerEvents: 'none',
      }}>
        <span>CORE.v1.0</span>
        <span>SCROLL TO EXPLORE</span>
        <span>01 // 05</span>
      </div>
    </section>
  );
}

// Subtle counting component
function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      
      const current = Math.floor(ease * end);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, [value]);

  return <>{displayValue}</>;
}
