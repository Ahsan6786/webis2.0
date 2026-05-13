'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Webis didn't just build a website; they crafted a high-end digital flagship for Blingish. Their ability to translate premium brand values into technical reality is unmatched. Our conversion rates have skyrocketed since launch.",
    author: "Harsh Vardhan",
    role: "Founder, Blingish",
    accent: "#ffffff",
    bgColor: "#ff2a6d",
  },
  {
    quote: "The Webis team immediately understood our vision and delivered a clean, professional website exactly as needed. Their rapid response time and technical execution made the entire process seamless and results-driven for us.",
    author: "Ziya Murad Khan",
    role: "Proprietor, Daily Greens",
    accent: "#ffffff",
    bgColor: "#05df97",
  },
  {
    quote: "Webis understood exactly what I needed with very little conversation and delivered a perfect website. They are a highly efficient and result-oriented agency that I would recommend to any growing business.",
    author: "Yassh Agarwal",
    role: "Fitness Professional",
    accent: "#ffffff",
    bgColor: "#ff5c00",
  },
  {
    quote: "Webis did an exceptional job bringing my vision to life. They built a clean, modern, and highly functional website. Their attention to detail and willingness to accommodate requests set them truly apart from others.",
    author: "Dr. Vaishali Imam",
    role: "Pediatrician",
    accent: "#ffffff",
    bgColor: "#00f3ff",
  },
  {
    quote: "Working with Webis was a game-changer for our B2B reach. They engineered a robust, high-performance platform for A1 Farms that has significantly boosted our lead generation and overall digital trust score.",
    author: "Tarique Khan",
    role: "Manager, A1 Farms",
    accent: "#ffffff",
    bgColor: "#7b2cbf",
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

      const track = section.querySelector('.marquee-track');
      const tl = gsap.to(track, {
        xPercent: -50,
        ease: 'none',
        duration: 40,
        repeat: -1,
      });

      track?.addEventListener('mouseenter', () => tl.pause());
      track?.addEventListener('mouseleave', () => tl.play());
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
          will-change: transform;
        }
        .testimonial-card {
          background: rgba(10, 10, 10, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          padding: clamp(16px, 4vw, 32px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: clamp(260px, 70vw, 400px);
          min-height: 220px;
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          flex-shrink: 0;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .testimonial-card:hover {
          border-color: rgba(0, 212, 255, 0.2);
          background: rgba(15, 15, 15, 0.9);
        }
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
          ENGINEERED TRUST.
        </h2>
      </div>

      {/* Testimonials Marquee */}
      <div style={{ overflow: 'hidden', width: '100vw' }}>
        <div className="marquee-track">
          {/* First set of cards */}
          {testimonials.map((t, i) => (
            <div key={`set1-${i}`} className="testimonial-card">
              {/* Subtle edge lighting */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, rgba(0,212,255,0.2), transparent)',
              }} />
              
              {/* Tiny technical label */}
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '10px',
                color: 'rgba(255,255,255,0.25)',
                letterSpacing: '0.1em',
                marginBottom: '16px',
                textTransform: 'uppercase',
              }}>
                SYSTEM SIGNAL // 0{i + 1}
              </div>

              <p style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.85)',
                position: 'relative',
                zIndex: 2,
              }}>
                "{t.quote}"
              </p>
              
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '24px' }}>
                <div style={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                <div>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#ffffff',
                    letterSpacing: '0.02em',
                  }}>
                    {t.author}
                  </p>
                  <p style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '10px',
                    fontWeight: 400,
                    letterSpacing: '0.05em',
                    color: 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase',
                    marginTop: '2px',
                  }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {testimonials.map((t, i) => (
            <div key={`set2-${i}`} className="testimonial-card">
              {/* Subtle edge lighting */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, rgba(0,212,255,0.2), transparent)',
              }} />
              
              {/* Tiny technical label */}
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '10px',
                color: 'rgba(255,255,255,0.25)',
                letterSpacing: '0.1em',
                marginBottom: '16px',
                textTransform: 'uppercase',
              }}>
                SYSTEM SIGNAL // 0{i + 1}
              </div>

              <p style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.85)',
                position: 'relative',
                zIndex: 2,
              }}>
                "{t.quote}"
              </p>
              
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '24px' }}>
                <div style={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                <div>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#ffffff',
                    letterSpacing: '0.02em',
                  }}>
                    {t.author}
                  </p>
                  <p style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '10px',
                    fontWeight: 400,
                    letterSpacing: '0.05em',
                    color: 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase',
                    marginTop: '2px',
                  }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
