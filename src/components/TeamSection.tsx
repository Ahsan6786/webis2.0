'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function TeamSection() {
  return (
    <section id="team" style={{ 
      padding: '120px 24px', 
      position: 'relative', 
      overflow: 'hidden',
      background: '#030508',
    }}>
      {/* Ambient background glow */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(0,212,255,0.03) 0%, transparent 70%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
          
          {/* Text Content */}
          <div>
            <p className="text-system" style={{ color: 'rgba(0,212,255,0.5)', marginBottom: '16px', letterSpacing: '0.2em' }}>
              THE MINDS BEHIND
            </p>
            <h2 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#ffffff',
              marginBottom: '24px',
              textTransform: 'uppercase',
            }}>
              MEET OUR<br />FOUNDER.
            </h2>
            <p style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '16px',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.05em',
              fontWeight: 300,
              lineHeight: 1.6,
              marginBottom: '32px',
              maxWidth: '500px',
            }}>
              We are a collective of designers, engineers, and strategists obsessed with building the future of the web. Led by Ahsan, we push the boundaries of what's possible.
            </p>

            <Link href="/team" style={{ textDecoration: 'none' }}>
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
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                VIEW FULL TEAM
                <span style={{ fontSize: '16px' }}>→</span>
              </button>
            </Link>
          </div>

          {/* Founder Card */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '400px',
                aspectRatio: '0.8',
                borderRadius: '24px',
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <Image
                src="/ahsan.webp"
                alt="Ahsan"
                fill
                style={{ objectFit: 'cover', opacity: 0.9 }}
              />
              
              {/* Gradient Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 60%, rgba(3, 5, 8, 0.9) 100%)',
              }} />

              {/* Info */}
              <div style={{ position: 'absolute', bottom: '30px', left: '30px', right: '30px' }}>
                <span style={{ fontFamily: 'Space Grotesk', fontSize: '14px', color: '#ffffff', letterSpacing: '0.1em', fontWeight: 600 }}>
                  FOUNDER / LEAD ARCHITECT
                </span>
                <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '28px', fontWeight: 400, color: '#ffffff', marginTop: '4px' }}>
                  Ahsan Imam Khan
                </h3>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
