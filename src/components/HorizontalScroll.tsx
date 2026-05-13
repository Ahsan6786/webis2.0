'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const dimensions = [
  {
    id: 'dim-motion',
    number: '01',
    label: 'MOTION',
    headline: 'Every project is a system,\nnot just a website.',
    sub: 'Movement communicates. Every transition carries meaning.',
    accent: '#00d4ff',
    bg: 'transparent',
    content: 'motion' as const,
  },
  {
    id: 'dim-projects',
    number: '02',
    label: 'WORK',
    headline: 'FEATURED PROJECTS',
    sub: 'Hover to explore depth.',
    accent: '#ffffff',
    bg: 'transparent',
    content: 'projects' as const,
  },
];

const projects: any[] = [];

/* ── Background visuals ── */

function MotionVisual() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }} />
  );
}

function ProjectsVisual() {
  const gradients = [
    'linear-gradient(135deg, rgba(255,42,109,0.35) 0%, rgba(123,44,191,0.35) 100%)', // Pink-Purple
    'linear-gradient(135deg, rgba(5,223,151,0.35) 0%, rgba(0,243,255,0.35) 100%)',   // Green-Teal
    'linear-gradient(135deg, rgba(255,92,0,0.35) 0%, rgba(255,42,109,0.35) 100%)',   // Orange-Red
    'linear-gradient(135deg, rgba(0,102,255,0.35) 0%, rgba(0,243,255,0.35) 100%)',  // Blue-Cyan
    'linear-gradient(135deg, rgba(123,44,191,0.35) 0%, rgba(5,223,151,0.35) 100%)', // Purple-Green
  ];

  const messages = [
    "We solve the problems others avoid.",
    "We build to be remembered.",
    "We craft precision in every interaction.",
    "We create digital experiences that feel alive.",
    "BEYOND EXPECTATIONS.",
  ];

  return (
    <div style={{ display: 'flex', gap: '30vw', alignItems: 'center', height: '100%' }}>
      {/* Long Project Blocks */}
      {projects.map((proj, i) => (
        <div key={`proj-${i}`} style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', marginLeft: i === 0 ? '20vw' : 0 }}>
          <div
            style={{
              flexShrink: 0,
              width: 'clamp(220px, 35vw, 380px)', // Tall width!
              height: 'clamp(350px, 65vh, 550px)', // Tall height!
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '24px',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '12px',
              background: '#0a0a0a',
              backgroundImage: `url(${proj.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(100%)', // Consistent black/white visual language!
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.5s ease, box-shadow 0.5s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)';
              e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0,212,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px) scale(1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Dark overlay for text contrast */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)',
              zIndex: 1
            }} />
            
            {/* Content inside card */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '24px',
                fontWeight: 300,
                color: '#ffffff',
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
                marginBottom: '4px'
              }}>
                {proj.title}
              </h2>
              <p style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {proj.category}
              </p>
            </div>
          </div>
          {/* Button below */}
          <div style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.1em',
            color: '#00d4ff',
            cursor: 'pointer',
            padding: '4px 12px',
            border: '1px solid rgba(0,212,255,0.2)',
            borderRadius: '4px',
          }}>
            View
          </div>
        </div>
      ))}

      {/* Messages (Stacked for sequence) */}
      <div id="text-sequence-container" style={{ flexShrink: 0, width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        {messages.map((msg, i) => (
          <h2 key={`msg-${i}`} data-msg-idx={i} style={{
            position: 'absolute',
            left: '50%',
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(24px, 5vw, 80px)',
            fontWeight: 200,
            color: '#ffffff',
            textAlign: 'center',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            textTransform: 'uppercase',
            opacity: i === 0 ? 1 : 0,
            maxWidth: '80vw',
            width: 'max-content',
          }}>
            {msg.split(' ').map((word, idx) => {
              const isHighlight = word.includes('SOLVE') || word.includes('PROBLEM');
              return (
                <span key={idx} style={{ color: isHighlight ? '#00d4ff' : '#ffffff' }}>
                  {word}{' '}
                </span>
              );
            })}
          </h2>
        ))}
      </div>
    </div>
  );
}

/* ── Main component ── */

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const panelsEl = panelsRef.current;
    if (!section || !panelsEl) return;

    const W = window.innerWidth;
    // Calculate scroll distance based on actual content width
    const scrollDistance = panelsEl.scrollWidth - W;

    // Set text elements invisible for the first panel
    const firstPanel = document.getElementById(dimensions[0].id);
    if (firstPanel) {
      gsap.set(firstPanel.querySelector('[data-headline]'), { opacity: 0, y: 50 });
      gsap.set(firstPanel.querySelector('[data-sub]'), { opacity: 0, y: 20 });
    }

    const ctx = gsap.context(() => {
      // ── Main horizontal scroll timeline with hold ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${scrollDistance * 3 + 2500}`, // Increased to make horizontal scroll slower and more impactful
          scrub: 3, // Increased for a more delayed, ultra-smooth catch-up
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Hold the first panel/message for a bit
      tl.to({}, { duration: 1.5 });

      // Translate to the end (where the stacked container fills the screen)
      tl.to(panelsEl, {
        x: -scrollDistance,
        ease: 'none',
        duration: 2,
      });

      // Text Sequence Animation (In-Place)
      const msgs = gsap.utils.toArray('[data-msg-idx]') as any[];
      const bgColors = ['#030303', '#0a3a1e', '#004a66', '#1a0a3a'];
      
      // Center all messages horizontally using GSAP
      gsap.set(msgs, { xPercent: -50 });
      
      msgs.forEach((msg: any, i) => {
        if (i > 0) {
          // Set initial state for hidden messages
          gsap.set(msg, { opacity: 0, y: 20 });
          
          // Fade out previous message
          tl.to(msgs[i-1], { opacity: 0, y: -20, filter: 'blur(5px)', duration: 0.8, ease: 'power2.inOut' });
          
          // Fade in current message
          tl.to(msg, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' }, '+=0.3');
          
          // Hold current message
          tl.to({}, { duration: 1.5 });
        }
          
          // Change background color of the panel
          tl.to('#dim-projects', { backgroundColor: bgColors[i], duration: 0.5, ease: 'power2.out' }, '<');
        }
      });

      // ── Text reveal for the first panel ──
      const el = document.getElementById(dimensions[0].id);
      if (el) {
        const headline = el.querySelector('[data-headline]');
        const sub = el.querySelector('[data-sub]');

        gsap.to(headline, {
          opacity: 1, y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'top+=200 top',
            scrub: 0.4,
          },
        });

        gsap.to(sub, {
          opacity: 1, y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top+=50 top',
            end: 'top+=250 top',
            scrub: 0.4,
          },
        });
      }
    }, section);

    const t = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      ctx.revert();
      clearTimeout(t);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="dimensions"
      style={{ position: 'relative', height: '100vh', background: 'rgba(7, 9, 11, 0.6)' }}
    >
      <div style={{ overflow: 'hidden', width: '100vw', height: '100vh' }}>
        <div
          ref={panelsRef}
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: 'max-content',
            height: '100%',
            willChange: 'transform',
          }}
        >
          {dimensions.map((dim) => (
            <div
              key={dim.id}
              id={dim.id}
              style={{
                flexShrink: 0,
                width: dim.content === 'projects' ? 'max-content' : '100vw',
                height: '100vh',
                background: dim.bg,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Background visual */}
              {dim.content === 'motion' && <MotionVisual />}
              {dim.content === 'projects' && <ProjectsVisual />}

              {/* Film noise */}
              <div className="noise-overlay" />

              {/* Text content (Only for Motion panel) */}
              {dim.content === 'motion' && (
                <div style={{
                  position: 'relative', zIndex: 2,
                  textAlign: 'center',
                  padding: '0 clamp(24px, 6vw, 120px)',
                  maxWidth: '860px',
                  width: '100%',
                }}>


                  <h2
                    data-headline
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 'clamp(28px, 5.2vw, 78px)',
                      fontWeight: 300,
                      lineHeight: 1.05,
                      letterSpacing: '-0.02em',
                      color: '#ffffff',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {dim.headline}
                  </h2>

                  <p
                    data-sub
                    style={{
                      marginTop: '32px',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 'clamp(13px, 1.3vw, 16px)',
                      fontWeight: 400,
                      letterSpacing: '0.05em',
                      color: 'rgba(255,255,255,0.35)',
                      maxWidth: '440px',
                      margin: '28px auto 0',
                      lineHeight: 1.75,
                    }}
                  >
                    {dim.sub}
                  </p>
                </div>
              )}

              {/* Panel number */}
              <span
                className="text-system"
                style={{
                  position: 'absolute',
                  bottom: '36px', right: '44px',
                  color: 'rgba(255,255,255,0.12)',
                }}
              >
                {dim.number} / 02
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
