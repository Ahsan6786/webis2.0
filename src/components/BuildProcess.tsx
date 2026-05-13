'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 'step-vision',
    label: 'VISION',
    index: 0,
    desc: 'Translating intent into architecture. The blueprint before a single line of code.',
    x: 12, y: 50,
    coords: 'LOC: 12.04 // SYS.INIT',
  },
  {
    id: 'step-design',
    label: 'DESIGN',
    index: 1,
    desc: 'Form that carries meaning. Every surface, every space, deliberate.',
    x: 32, y: 25,
    coords: 'LOC: 32.81 // VIS.DEV',
  },
  {
    id: 'step-motion',
    label: 'MOTION',
    index: 2,
    desc: 'Animation as language. Movement that communicates state, intent, feeling.',
    x: 52, y: 65,
    coords: 'LOC: 52.44 // KIN.SYS',
  },
  {
    id: 'step-engineering',
    label: 'ENGINEERING',
    index: 3,
    desc: 'Systems built to last. Code that scales, infrastructure that breathes.',
    x: 72, y: 30,
    coords: 'LOC: 72.19 // STRUC.ENG',
  },
  {
    id: 'step-launch',
    label: 'LAUNCH',
    index: 4,
    desc: 'The moment precision meets the world. Controlled. Inevitable.',
    x: 88, y: 55,
    coords: 'LOC: 88.92 // ORB.DEPLOY',
  },
];

export default function BuildProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [dims, setDims] = useState({ w: 1200, h: 400 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateDims = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setDims({ w: rect.width, h: rect.height });
      }
    };
    updateDims();
    window.addEventListener('resize', updateDims);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', updateDims);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Cinematic fade in for the section title
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );

      // Progressive activation of nodes on scroll
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: `top+=${i * 150} 60%`,
          onEnter: () => setActiveStep(i),
          onLeaveBack: () => setActiveStep(i - 1),
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Calculate pixel positions
  const getPos = (s: typeof steps[0]) => ({
    x: (s.x / 100) * dims.w,
    y: (s.y / 100) * dims.h,
  });

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{
        background: '#000000',
        padding: 'clamp(100px, 15vh, 200px) clamp(24px, 6vw, 96px)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* 1. DEPTH & ATMOSPHERE */}
      {/* Volumetric glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
        transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
        transition: 'transform 0.2s ease-out',
      }} />
      
      {/* Infinite grid background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        opacity: 0.5,
        pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)',
        transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
        transition: 'transform 0.2s ease-out',
      }} />

      {/* Floating particles (simulated with CSS for performance) */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            style={{
              position: 'absolute',
              width: '2px', height: '2px',
              background: '#00d4ff',
              borderRadius: '50%',
              opacity: 0.3 + Math.random() * 0.4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-particle ${5 + Math.random() * 5}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float-particle {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
        }
        @keyframes rotate-ring {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>

      {/* 4. TYPOGRAPHY (Monumental) */}
      <div ref={titleRef} style={{ marginBottom: '80px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <p className="text-system" style={{ color: 'rgba(0,212,255,0.6)', marginBottom: '16px', letterSpacing: '0.4em', fontSize: '11px' }}>
          ENGINEERING SYSTEM
        </p>
        <h2 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(40px, 6vw, 90px)',
          fontWeight: 200,
          letterSpacing: '-0.03em',
          lineHeight: 1.0,
          color: '#ffffff',
          textTransform: 'uppercase',
        }}>
          How We<br />
          <span style={{ color: 'rgba(255,255,255,0.2)', WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>Engineer.</span>
        </h2>
      </div>

      {/* 2. ENGINEERING PATH & 3. NODES */}
      <div style={{ position: 'relative', height: '500px', marginBottom: '40px' }}>
        <svg
          ref={svgRef}
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            <filter id="intense-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComponentTransfer in="blur" result="boost">
                <feFuncA type="linear" slope="2"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="boost" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0,212,255,0.2)" />
              <stop offset="50%" stopColor="rgba(0,212,255,0.8)" />
              <stop offset="100%" stopColor="rgba(0,212,255,0.2)" />
            </linearGradient>
          </defs>

          {/* Connection paths (Living Energy Stream) */}
          {steps.slice(0, -1).map((step, i) => {
            const from = getPos(step);
            const to = getPos(steps[i + 1]);
            const isActive = i < activeStep;
            const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
            const pathD = `M ${from.x} ${from.y} Q ${mid.x} ${mid.y - 60} ${to.x} ${to.y}`;

            return (
              <g key={`path-${i}`}>
                {/* Base atmospheric path */}
                <path
                  d={pathD}
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="2"
                  fill="none"
                />
                
                {/* Active energy path */}
                <path
                  d={pathD}
                  stroke={isActive ? "url(#pathGradient)" : "rgba(255,255,255,0.05)"}
                  strokeWidth={isActive ? "2" : "1"}
                  fill="none"
                  filter={isActive ? "url(#glow)" : "none"}
                  style={{ transition: 'stroke 0.8s ease, stroke-width 0.8s ease' }}
                  strokeDasharray={isActive ? "none" : "4 8"}
                />

                {/* Living stream (glowing core) */}
                {isActive && (
                  <path
                    d={pathD}
                    stroke="#ffffff"
                    strokeWidth="0.5"
                    fill="none"
                    opacity="0.8"
                  />
                )}

                {/* Energy particles traveling through path */}
                {isActive && (
                  <>
                    <circle r="3" fill="#ffffff" filter="url(#intense-glow)">
                      <animateMotion
                        dur="3s"
                        repeatCount="indefinite"
                        path={pathD}
                      />
                    </circle>
                    <circle r="1.5" fill="#00d4ff">
                      <animateMotion
                        dur="3s"
                        repeatCount="indefinite"
                        path={pathD}
                        begin="1s"
                      />
                    </circle>
                  </>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {steps.map((step, i) => {
            const pos = getPos(step);
            const isActive = i <= activeStep;
            const isCurrent = i === activeStep;

            return (
              <g key={step.id} style={{ cursor: 'pointer' }}>
                {/* Large soft aura for active nodes */}
                {isActive && (
                  <circle
                    cx={pos.x} cy={pos.y} r="50"
                    fill="radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)"
                    opacity="0.5"
                    style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
                  />
                )}

                {/* Outer Rotating Micro-Ring */}
                <circle
                  cx={pos.x} cy={pos.y} r="18"
                  fill="none"
                  stroke={isActive ? "rgba(0,212,255,0.6)" : "rgba(255,255,255,0.1)"}
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  style={{ 
                    transformOrigin: `${pos.x}px ${pos.y}px`,
                    animation: `rotate-ring ${isActive ? 5 : 10}s linear infinite`,
                    transition: 'stroke 0.5s ease'
                  }}
                />

                {/* Inner Solid Ring */}
                <circle
                  cx={pos.x} cy={pos.y} r="10"
                  fill="none"
                  stroke={isActive ? "#00d4ff" : "rgba(255,255,255,0.2)"}
                  strokeWidth="1.5"
                  transition="stroke 0.5s ease"
                  filter={isActive ? "url(#intense-glow)" : "none"}
                />

                {/* Core Node */}
                <circle
                  cx={pos.x} cy={pos.y} r={isActive ? "4" : "3"}
                  fill={isActive ? "#ffffff" : "rgba(255,255,255,0.4)"}
                  transition="all 0.5s ease"
                />

                {/* Active HUD pulse */}
                {isCurrent && (
                  <circle
                    cx={pos.x} cy={pos.y} r="30"
                    fill="none"
                    stroke="#00d4ff"
                    strokeWidth="0.5"
                    opacity="0.8"
                  >
                    <animate attributeName="r" values="10;40" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* 6. MICRODETAILS (HUD Labels & Coordinates) */}
                <g transform={`translate(${pos.x + 25}, ${pos.y - 25})`}>
                  {/* Technical Line */}
                  <line x1="-15" y1="15" x2="0" y2="0" stroke="rgba(0,212,255,0.4)" strokeWidth="0.5" />
                  <line x1="0" y1="0" x2="100" y2="0" stroke="rgba(0,212,255,0.4)" strokeWidth="0.5" />
                  
                  {/* Coords / Micro text */}
                  <text
                    x="5" y="-5"
                    fontFamily="Space Grotesk, sans-serif"
                    fontSize="9px"
                    letterSpacing="0.1em"
                    fill={isActive ? "rgba(0,212,255,0.7)" : "rgba(255,255,255,0.3)"}
                    transition="fill 0.5s ease"
                  >
                    {step.coords}
                  </text>

                  {/* Step Label */}
                  <text
                    x="5" y="15"
                    fontFamily="Space Grotesk, sans-serif"
                    fontSize="14px"
                    fontWeight="400"
                    letterSpacing="0.2em"
                    fill={isActive ? "#ffffff" : "rgba(255,255,255,0.4)"}
                    transition="fill 0.5s ease"
                  >
                    {step.label}
                  </text>

                  {/* Step Description */}
                  <text
                    x="5" y="32"
                    fontFamily="Space Grotesk, sans-serif"
                    fontSize="11px"
                    fontWeight="300"
                    fill="rgba(255,255,255,0.4)"
                    opacity={isActive ? 1 : 0.2}
                    width="200"
                    style={{ transition: 'opacity 0.5s ease' }}
                  >
                    {step.desc.length > 35 ? step.desc.substring(0, 35) + '...' : step.desc}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Detail description for the ACTIVE step (at the bottom) */}
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        textAlign: 'center', 
        height: '60px',
        position: 'relative',
        zIndex: 2 
      }}>
        {steps.map((step, i) => (
          <div
            key={`desc-${step.id}`}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: i === activeStep ? 1 : 0,
              transform: i === activeStep ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
              pointerEvents: i === activeStep ? 'auto' : 'none',
            }}
          >
            <p style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '16px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.6,
            }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
