'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 500) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headlineRef.current,
        { opacity: 0, y: 80, filter: 'blur(30px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          ease: 'power3.out',
          duration: 1.5,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            onEnter: () => setIsRevealed(true),
          },
        }
      );

      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          ease: 'power2.out',
          delay: 0.6,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Deep space canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const W = canvas.width, H = canvas.height;

    interface Star {
      x: number; y: number;
      size: number;
      opacity: number;
      speed: number;
    }

    const stars: Star[] = Array.from({ length: 200 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      size: Math.random() * 1,
      opacity: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.1 + 0.02,
    }));

    let frame = 0;
    let mx = W / 2, my = H / 2;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener('mousemove', onMove);

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);

      // Deep space background
      const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.8);
      bg.addColorStop(0, 'rgba(0,6,14,1)');
      bg.addColorStop(0.5, 'rgba(0,0,6,1)');
      bg.addColorStop(1, 'rgba(0,0,0,1)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Mouse glow
      const mglow = ctx.createRadialGradient(mx, my, 0, mx, my, 300);
      mglow.addColorStop(0, 'rgba(0,212,255,0.04)');
      mglow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = mglow;
      ctx.fillRect(0, 0, W, H);

      // Light rings
      for (let ring = 0; ring < 4; ring++) {
        const r = 80 + ring * 120 + Math.sin(frame * 0.008 + ring * 1.2) * 20;
        const alpha = (0.05 - ring * 0.008) * ((Math.sin(frame * 0.01 + ring * 0.5) + 1) * 0.5 + 0.5);
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Stars
      stars.forEach(s => {
        s.opacity = 0.1 + Math.sin(frame * s.speed + s.x) * 0.2 + 0.15;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.fill();
      });

      // Ambient distortion particles
      for (let i = 0; i < 3; i++) {
        const px = W * 0.2 + Math.sin(frame * 0.005 + i * 2) * W * 0.3;
        const py = H * 0.3 + Math.cos(frame * 0.005 + i * 2) * H * 0.3;
        const pr = 2 + Math.sin(frame * 0.02 + i) * 1;
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,0.15)`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#00d4ff';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.12,
      y: (e.clientY - rect.top - rect.height / 2) * 0.12,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Space canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      />

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center',
        padding: '0 clamp(24px, 6vw, 96px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '60px',
      }}>
        {isRevealed && (
          <div style={{ overflow: 'hidden' }}>
            <p className="text-system" style={{
              color: 'rgba(0,212,255,0.4)',
              marginBottom: '40px',
            }}>
              — THE NEXT CHAPTER
            </p>
          </div>
        )}

        <h2
          ref={headlineRef}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(32px, 7vw, 110px)',
            fontWeight: 200,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            opacity: 0,
            maxWidth: '900px',
          }}
        >
          READY TO BUILD<br />
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>THE FUTURE?</span>
        </h2>

        <div ref={ctaRef} style={{ opacity: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="mailto:mitraai0001@gmail.com"
              className="cta-btn"
              style={{
                minWidth: '200px',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              EMAIL US
              <span className="btn-icon" />
            </a>
            <a
              href="https://instagram.com/webis001"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
              style={{
                minWidth: '200px',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              INSTAGRAM
              <span className="btn-icon" />
            </a>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '13px',
              fontWeight: 300,
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '8px'
            }}>
              mitraai0001@gmail.com
            </p>
            <p style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '13px',
              fontWeight: 300,
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.5)',
            }}>
              INSTA: @webis001
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: 0, right: 0,
        padding: '0 clamp(24px, 6vw, 96px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2,
      }}>
        <span className="text-system" style={{ color: 'rgba(255,255,255,0.15)' }}>
          WEBIS STUDIO
        </span>
        <span className="text-system" style={{ color: 'rgba(255,255,255,0.15)' }}>
          © 2025 — ALL RIGHTS RESERVED
        </span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.3)',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            transition: 'color 0.3s ease',
            textTransform: 'uppercase',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
        >
          BACK TO TOP ↑
        </button>
      </div>

      {/* Floating Back to Top Button */}
      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: '#ffffff',
            color: '#000000',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            zIndex: 100,
            transition: 'transform 0.3s ease, background-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.backgroundColor = '#00d4ff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = '#ffffff';
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        </button>
      )}
    </section>
  );
}
