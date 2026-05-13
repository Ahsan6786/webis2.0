'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const testimonials = [
  {
    quote: "Webis didn't just build a website; they crafted a high-end digital flagship for Blingish. Their ability to translate premium brand values into technical reality is unmatched. Our conversion rates have skyrocketed since launch.",
    author: "Harsh Vardhan",
    role: "Founder, Blingish",
    accent: "#ff2a6d",
  },
  {
    quote: "The Webis team immediately understood our vision and delivered a clean, professional website exactly as needed. Their rapid response time and technical execution made the entire process seamless and results-driven for us.",
    author: "Ziya Murad Khan",
    role: "Proprietor, Daily Greens",
    accent: "#05df97",
  },
  {
    quote: "Webis understood exactly what I needed with very little conversation and delivered a perfect website. They are a highly efficient and result-oriented agency that I would recommend to any growing business.",
    author: "Yassh Agarwal",
    role: "Fitness Professional",
    accent: "#ff5c00",
  },
  {
    quote: "Webis did an exceptional job bringing my vision to life. They built a clean, modern, and highly functional website. Their attention to detail and willingness to accommodate requests set them truly apart from others.",
    author: "Dr. Vaishali Imam",
    role: "Pediatrician",
    accent: "#00f3ff",
  },
  {
    quote: "Working with Webis was a game-changer for our B2B reach. They engineered a robust, high-performance platform for A1 Farms that has significantly boosted our lead generation and overall digital trust score.",
    author: "Tarique Khan",
    role: "Manager, A1 Farms",
    accent: "#7b2cbf",
  },
];

export default function TestimonialsPage() {
  return (
    <main style={{ 
      background: '#0a0a0a', 
      minHeight: '100vh', 
      padding: '120px 24px',
      color: '#ffffff',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Navigation */}
        <Link href="/" style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '12px',
          letterSpacing: '0.1em',
          color: 'rgba(255,255,255,0.4)',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '80px',
          transition: 'color 0.3s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
        >
          ← BACK
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '100px' }}>
          <p className="text-system" style={{ color: 'rgba(0,212,255,0.5)', marginBottom: '16px' }}>
            TESTIMONIALS
          </p>
          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 80px)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: '24px'
          }}>
            VERIFIED SIGNALS.
          </h1>
          <p style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '18px',
            color: 'rgba(255,255,255,0.5)',
            fontWeight: 300,
          }}>
            Real founders. Real systems. Real impact.
          </p>
        </div>

        {/* Testimonials List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '120px' }}>
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '40px',
                position: 'relative',
              }}
            >
              {/* System Signal Label */}
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '11px',
                color: 'rgba(255,255,255,0.25)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                paddingBottom: '12px',
                width: '100%'
              }}>
                SYSTEM SIGNAL // 0{i + 1}
              </div>

              {/* Quote */}
              <blockquote style={{
                fontSize: 'clamp(20px, 3vw, 32px)',
                fontWeight: 300,
                lineHeight: 1.4,
                color: '#ffffff',
                margin: 0,
                letterSpacing: '-0.01em',
              }}>
                "{t.quote}"
              </blockquote>

              {/* Author Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: t.accent,
                  boxShadow: `0 0 10px ${t.accent}`,
                }} />
                <div>
                  <p style={{ fontSize: '16px', fontWeight: 500, color: '#ffffff', marginBottom: '4px' }}>
                    {t.author}
                  </p>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
                    {t.role.toUpperCase()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
