'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Working with Webis was a game-changer. They didn't just build a website; they created a high-converting system that scales with our growth.",
    author: "Sarah Chen",
    role: "CEO, Revial",
    accent: "#ffffff",
    bgColor: "#ff2a6d", // Pink
  },
  {
    quote: "The attention to detail and engineering excellence is unmatched. They delivered a platform that feels alive and drives real results.",
    author: "Alex Rivers",
    role: "Founder, Mitra Ai",
    accent: "#ffffff",
    bgColor: "#05df97", // Green
  },
  {
    quote: "They understand that design is not just how it looks, but how it works. Our conversion rate doubled after the launch.",
    author: "Elena Rostova",
    role: "Product Lead, Dailygreens",
    accent: "#ffffff",
    bgColor: "#ff5c00", // Orange
  },
  {
    quote: "Their team brought a level of technical sophistication we hadn't found anywhere else. Truly a partner in innovation.",
    author: "David Park",
    role: "CTO, a1 farms",
    accent: "#ffffff",
    bgColor: "#00f3ff", // Waterblue
  },
  {
    quote: "Precision, speed, and vision. Webis transformed our legacy portal into a state-of-the-art digital experience.",
    author: "James Wilson",
    role: "Director, LTC Portal",
    accent: "#ffffff",
    bgColor: "#7b2cbf", // Purple
  },
];

export default function ImageShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(section.querySelector('[data-header]'),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      style={{
        background: '#000000',
        padding: 'clamp(80px, 12vh, 160px) 0',
        position: 'relative',
        borderTop: '1px solid rgba(255,255,255,0.03)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        .marquee-track {
          display: flex;
          gap: 32px;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .testimonial-card {
          background: linear-gradient(135deg, #060606 0%, #020202 100%);
          border: 1px solid rgba(255,255,255,0.03);
          padding: clamp(16px, 4vw, 32px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: clamp(220px, 70vw, 360px);
          min-height: 220px;
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          flex-shrink: 0;
          transition: border-color 0.4s ease, transform 0.4s ease;
        }
        .testimonial-card:hover {
          border-color: rgba(0,212,255,0.15);
          transform: translateY(-4px);
        }
        .quote-bg {
          position: absolute;
          top: -10px;
          left: 20px;
          font-size: 140px;
          font-family: 'Inter', sans-serif;
          font-weight: 900;
          color: rgba(255,255,255,0.015);
          line-height: 1;
          pointer-events: none;
        }
        .testimonial-card p {
          font-weight: 400 !important;
        }
      `}</style>

      {/* Section header */}
      <div data-header style={{
        marginBottom: 'clamp(48px, 8vh, 80px)',
        padding: '0 clamp(24px, 6vw, 64px)',
        textAlign: 'center',
      }}>
        <p className="text-system" style={{ color: 'rgba(0,212,255,0.5)', marginBottom: '16px' }}>
          TESTIMONIALS
        </p>
        <h2 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(28px, 4vw, 64px)',
          fontWeight: 300,
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
          color: '#ffffff',
        }}>
          WHAT OUR CLIENTS<br />
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>SAY ABOUT US.</span>
        </h2>
      </div>

      {/* Testimonials Marquee */}
      <div style={{ overflow: 'hidden', width: '100vw' }}>
        <div className="marquee-track">
          {/* First set of cards */}
          {testimonials.map((t, i) => (
            <div key={`set1-${i}`} className="testimonial-card" style={{ background: `${t.bgColor}B3` }}>
              <div className="quote-bg">“</div>
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '1px',
                background: `linear-gradient(90deg, ${t.accent}, transparent)`,
                opacity: 0.2,
              }} />
              <p style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                lineHeight: 1.6,
                color: '#ffffff',
                position: 'relative',
                zIndex: 2,
              }}>
                "{t.quote}"
              </p>
              <div style={{ marginTop: 'auto', position: 'relative', zIndex: 2 }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#ffffff',
                  marginBottom: '4px',
                }}>
                  {t.author}
                </p>
                <p style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  color: 'rgba(255,255,255,0.7)',
                  textTransform: 'uppercase',
                }}>
                  {t.role}
                </p>
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {testimonials.map((t, i) => (
            <div key={`set2-${i}`} className="testimonial-card" style={{ background: `${t.bgColor}B3` }}>
              <div className="quote-bg">“</div>
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '1px',
                background: `linear-gradient(90deg, ${t.accent}, transparent)`,
                opacity: 0.2,
              }} />
              <p style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                lineHeight: 1.6,
                color: '#ffffff',
                position: 'relative',
                zIndex: 2,
              }}>
                "{t.quote}"
              </p>
              <div style={{ marginTop: 'auto', position: 'relative', zIndex: 2 }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#ffffff',
                  marginBottom: '4px',
                }}>
                  {t.author}
                </p>
                <p style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  color: 'rgba(255,255,255,0.7)',
                  textTransform: 'uppercase',
                }}>
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
