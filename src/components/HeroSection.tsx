'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: 'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.25) 0%, #030508 60%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Main headline and content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 2, padding: '0 24px' }}
      >
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#ffffff',
            marginBottom: '24px',
            opacity: 0.6,
          }}
        >
          WEBIS
        </p>

        <h1
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(36px, 6.5vw, 100px)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          DIGITAL EXPERIENCES
          <br />
          SHOULD FEEL ALIVE.
        </h1>

        <p
          style={{
            marginTop: '32px',
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(14px, 1.4vw, 18px)',
            fontWeight: 300,
            letterSpacing: '0.05em',
            color: '#ffffff',
            opacity: 0.8,
          }}
        >
          We engineer digital experiences that feel alive.
        </p>

        <div style={{ marginTop: '48px' }}>
          <a
            href="#showcase"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '16px',
              padding: '14px 40px',
              background: '#ffffff',
              color: '#030508',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '100px',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, background 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#00d4ff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.transform = 'translateY(0px)';
            }}
          >
            Explore Work
            <span style={{ width: '18px', height: '1px', background: '#030508', display: 'inline-block' }}></span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
