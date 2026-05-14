'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const showcaseItems = [
  {
    id: 'sc-1',
    category: 'DEVELOPMENT',
    title: 'FULL STACK APPLICATIONS',
    subtitle: 'Scalable Digital Solutions',
    desc: 'We build high-converting, robust applications with modern stacks.',
    color: '#0a0a0f',
    accent: '#00d4ff',
    gradient: 'radial-gradient(ellipse at 30% 60%, rgba(0,100,150,0.9) 0%, rgba(0,0,0,0) 70%)',
  },
  {
    id: 'sc-2',
    category: 'GROWTH',
    title: 'SEO & OPTIMIZATION',
    subtitle: 'Visibility & Performance',
    desc: 'Dominate search rankings and optimize for maximum speed and conversion.',
    color: '#060608',
    accent: '#8888aa',
    gradient: 'radial-gradient(ellipse at 70% 40%, rgba(60,40,120,0.8) 0%, rgba(0,0,0,0) 70%)',
  },
  {
    id: 'sc-3',
    category: 'MARKETING',
    title: 'DIGITAL MARKETING',
    subtitle: 'Strategic Outreach',
    desc: 'Targeted campaigns that drive real-world impacts and growth.',
    color: '#040404',
    accent: '#ffffff',
    gradient: 'radial-gradient(ellipse at 50% 50%, rgba(40,40,40,1) 0%, rgba(0,0,0,0) 80%)',
  },
  {
    id: 'sc-4',
    category: 'SOCIAL',
    title: 'SOCIAL MEDIA HANDLING',
    subtitle: 'Brand Presence',
    desc: 'We manage and grow your social presence with engaging content.',
    color: '#080808',
    accent: '#00d4ff',
    gradient: 'radial-gradient(ellipse at 30% 40%, rgba(0,80,120,0.8) 0%, rgba(0,0,0,0) 70%)',
  },
];

function ShowcaseScene({ item, isActive }: { item: typeof showcaseItems[0], isActive: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);

      // Atmospheric gradient
      const grd = ctx.createRadialGradient(W * 0.4, H * 0.5, 0, W * 0.4, H * 0.5, W * 0.7);
      grd.addColorStop(0, item.accent === '#00d4ff' ? 'rgba(0,60,80,0.3)' : 'rgba(40,30,60,0.2)');
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      // Abstract geometric form
      const cx = W * 0.5, cy = H * 0.5;
      const r = Math.min(W, H) * 0.25;

      for (let ring = 0; ring < 5; ring++) {
        const ringR = r * (0.4 + ring * 0.2);
        const alpha = (0.08 - ring * 0.012) * ((Math.sin(frame * 0.01 + ring * 0.8) + 1) * 0.5 + 0.3);
        ctx.beginPath();
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${item.accent === '#00d4ff' ? '0,212,255' : '150,140,200'},${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Scanning line
      const scanY = ((frame * 0.8) % H);
      const scanGrad = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 2);
      scanGrad.addColorStop(0, 'rgba(0,0,0,0)');
      scanGrad.addColorStop(1, `rgba(${item.accent === '#00d4ff' ? '0,212,255' : '200,200,255'},0.04)`);
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 20, W, 22);

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [isActive, item.accent]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
}

export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Mobile scroll trigger for services
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
      if (isMobile) {
        showcaseItems.forEach((_, i) => {
          ScrollTrigger.create({
            trigger: `.module-${i}`,
            start: 'top 70%',
            end: 'bottom 30%',
            onToggle: (self) => {
              if (self.isActive) setHoveredIndex(i);
            },
          });
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent, idx: number) => {
    const el = imgRefs.current[idx];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.04;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.04;
    el.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
  };

  const handleMouseLeave = (idx: number) => {
    const el = imgRefs.current[idx];
    if (!el) return;
    el.style.transform = 'translate(0px, 0px) scale(1)';
    setHoveredIndex(null);
  };

  return (
    <section
      ref={sectionRef}
      id="showcase"
      style={{
        background: 'rgba(3, 5, 8, 0.5)',
        padding: 'clamp(80px, 12vh, 160px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Section header */}
      <div
        ref={titleRef}
        style={{
          padding: '0 clamp(24px, 6vw, 96px)',
          marginBottom: 'clamp(60px, 8vh, 100px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          opacity: 0,
        }}
      >
        <div>
          <p className="text-system" style={{ color: 'rgba(0,212,255,0.5)', marginBottom: '16px' }}>
            OUR SERVICES
          </p>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(32px, 5vw, 72px)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            color: '#ffffff',
          }}>
            SYSTEMS WE<br />
            <span style={{ color: '#ffffff' }}>ENGINEER.</span>
          </h2>
        </div>
      </div>

      {/* Projects */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px',
        padding: '0 clamp(24px, 6vw, 96px)',
      }} className="modular-grid">
        <style>{`
          @media (min-width: 1024px) {
            .modular-grid {
              grid-template-columns: repeat(3, 1fr) !important;
            }
            .module-0 { grid-column: span 2; }
            .module-3 { grid-column: span 2; }
          }
          @media (max-width: 1023px) {
            .modular-grid > div {
              opacity: 1 !important;
              transform: none !important;
            }
            .card-desc {
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>
        {showcaseItems.map((item, i) => (
          <div
            key={item.id}
            className={`module-${i}`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              background: `${item.gradient}, rgba(5, 5, 5, 0.95)`,
              border: '1px solid rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: i === 0 || i === 3 ? '360px' : '280px',
              opacity: hoveredIndex !== null && hoveredIndex !== i ? 0.5 : 1,
              transform: hoveredIndex === i ? 'translateY(-5px)' : 'translateY(0)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            {/* Subtle edge lighting */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '1px',
              background: `linear-gradient(90deg, ${item.accent}, transparent)`,
              opacity: hoveredIndex === i ? 0.8 : 0.2,
              transition: 'opacity 0.5s ease',
            }} />

            <div>
              <div style={{ marginBottom: '16px' }}>
                <span style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '11px',
                  color: item.accent,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}>
                  {item.category}
                </span>
              </div>

              <h3 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '24px',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: '16px',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}>
                {item.title}
              </h3>
              
              <p className="card-desc" style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.6,
                maxWidth: '400px',
                opacity: hoveredIndex === i ? 1 : 0,
                transform: hoveredIndex === i ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}>
                {item.desc}
              </p>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '11px',
              color: '#ffffff',
              letterSpacing: '0.05em',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255,255,255,0.05)',
            }}>
              <span style={{ opacity: 0.6 }}>{item.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
