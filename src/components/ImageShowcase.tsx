'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ImageShowcase() {
  return (
    <section style={{ 
      padding: '120px 24px', 
      position: 'relative', 
      overflow: 'hidden',
      background: 'radial-gradient(circle at center, rgba(255,255,255,0.01) 0%, #000000 100%)',
    }}>
      <style>{`
        @media (max-width: 768px) {
          .desktop-image { display: none !important; }
          .mobile-image { display: block !important; }
        }
      `}</style>
      {/* Ambient background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p className="text-system" style={{ color: 'rgba(0,212,255,0.5)', marginBottom: '16px' }}>
            TESTIMONIALS
          </p>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#ffffff',
            marginBottom: '24px',
            textTransform: 'uppercase',
          }}>
            ENGINEERED TRUST.
          </h2>
          <p style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '16px',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.05em',
            fontWeight: 300,
          }}>
            Real founders. Real systems. Real impact.
          </p>
        </div>

        {/* Centerpiece Image */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginBottom: '80px',
          position: 'relative',
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.02, y: -5 }}
            style={{
              position: 'relative',
              maxWidth: '800px',
              width: '100%',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              cursor: 'pointer',
              maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)',
              opacity: 0.7,
            }}
          >
            <div className="desktop-image">
              <Image
                src="/companies.png"
                alt="Network of brands and systems"
                width={1600}
                height={900}
                layout="responsive"
                objectFit="contain"
                priority
                style={{
                  display: 'block',
                  filter: 'grayscale(100%)',
                }}
              />
            </div>
            <div className="mobile-image" style={{ display: 'none' }}>
              <Image
                src="/company-mobile.png"
                alt="Network of brands and systems"
                width={900}
                height={1600}
                layout="responsive"
                objectFit="contain"
                priority
                style={{
                  display: 'block',
                  filter: 'grayscale(100%)',
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Button */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link href="/testimonials" style={{ textDecoration: 'none' }}>
            <motion.div
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                padding: '16px 40px',
                borderRadius: '30px',
                color: '#ffffff',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '14px',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              whileHover={{ 
                scale: 1.05,
                background: 'rgba(255,255,255,0.05)',
                borderColor: 'rgba(0,212,255,0.3)',
                boxShadow: '0 0 30px rgba(0,212,255,0.15)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glowing edge effect on hover */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                borderRadius: '30px',
                background: 'linear-gradient(45deg, transparent, rgba(0,212,255,0.1), transparent)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
              }}
              className="btn-glow"
              />
              VIEW TESTIMONIALS →
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
