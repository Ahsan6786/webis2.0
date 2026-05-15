'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
  });
  const [startTime] = useState(Date.now());
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'leads'), {
        ...formData,
        source: 'contact_section',
        timeSpent: Math.floor((Date.now() - startTime) / 1000), // in seconds
        timestamp: serverTimestamp(),
      });
      setIsSubmitted(true);
      setFormData({ name: '', email: '', mobile: '', message: '' });
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error submitting request. Please try again.');
    }
  };

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

    let isAnimating = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isAnimating) {
          isAnimating = true;
          draw();
        } else if (!entry.isIntersecting) {
          isAnimating = false;
          cancelAnimationFrame(rafRef.current);
        }
      });
    }, { threshold: 0.1 });

    const section = sectionRef.current;
    if (section) observer.observe(section);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      if (section) observer.unobserve(section);
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
          <span style={{ color: '#ffffff' }}>THE FUTURE?</span>
        </h2>

        <div ref={ctaRef} style={{ opacity: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <p style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '16px',
            color: '#ffffff',
            textAlign: 'center',
            maxWidth: '600px',
            lineHeight: 1.6,
            marginBottom: '10px',
          }}>
            For pricing and quotation, and idea discussion, feel free to contact.
          </p>
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '40px 24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', width: '100%', maxWidth: '450px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(0,212,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"></polyline></svg>
              </div>
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '20px', fontWeight: 600, color: '#ffffff', marginBottom: '8px' }}>
                Thank You!
              </h3>
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                We have received your message and will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '450px' }}>
              {/* Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                <label style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    color: '#ffffff',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
                />
              </div>

              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                <label style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    color: '#ffffff',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
                />
              </div>

              {/* Mobile */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                <label style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
                  MOBILE NUMBER
                </label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="+1 234 567 890"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    color: '#ffffff',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
                />
              </div>

              {/* Message */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                <label style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
                  MESSAGE
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project..."
                  rows={4}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    color: '#ffffff',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'none',
                    transition: 'border-color 0.3s',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  background: '#ffffff',
                  color: '#030508',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '14px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  marginTop: '10px',
                  transition: 'background 0.3s, transform 0.3s',
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
                SUBMIT REQUEST
              </button>
            </form>
          )}

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
            {/* Email Button */}
            <a href="mailto:mitraai0001@gmail.com" style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '30px',
              padding: '12px 24px',
              color: '#ffffff',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '13px',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#00d4ff'; e.currentTarget.style.background = 'rgba(0,212,255,0.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              mitraai0001@gmail.com
            </a>

            {/* Insta Button */}
            <a href="https://instagram.com/webis001" target="_blank" rel="noopener noreferrer" style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '30px',
              padding: '12px 24px',
              color: '#ffffff',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '13px',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#ff2a6d'; e.currentTarget.style.background = 'rgba(255,42,109,0.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              @webis001
            </a>

            {/* Location Badge */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '30px',
              padding: '12px 24px',
              color: '#ffffff',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#05df97" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              Based in Pune
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <style>{`
        @media (max-width: 768px) {
          .footer-container {
            flex-direction: column !important;
            gap: 16px !important;
            text-align: center !important;
            bottom: 20px !important;
            position: relative !important;
            padding: 40px 24px !important;
          }
        }
      `}</style>
      <div className="footer-container" style={{
        marginTop: 'auto',
        width: '100%',
        padding: '30px clamp(24px, 6vw, 96px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        zIndex: 2,
        borderTop: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(3, 5, 8, 0.8)',
        backdropFilter: 'blur(10px)',
      }}>
        <span className="text-system" style={{ color: '#ffffff' }}>
          WEBIS STUDIO
        </span>
        <span className="text-system" style={{ color: '#ffffff' }}>
          © 2026 — ALL RIGHTS RESERVED
        </span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            transition: 'color 0.3s ease',
            textTransform: 'uppercase',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#00d4ff'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
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
