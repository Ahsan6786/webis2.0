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
  },
  {
    id: 'step-design',
    label: 'DESIGN',
    index: 1,
    desc: 'Form that carries meaning. Every surface, every space, deliberate.',
    x: 32, y: 25,
  },
  {
    id: 'step-motion',
    label: 'MOTION',
    index: 2,
    desc: 'Animation as language. Movement that communicates state, intent, feeling.',
    x: 52, y: 60,
  },
  {
    id: 'step-engineering',
    label: 'ENGINEERING',
    index: 3,
    desc: 'Systems built to last. Code that scales, infrastructure that breathes.',
    x: 72, y: 30,
  },
  {
    id: 'step-launch',
    label: 'LAUNCH',
    index: 4,
    desc: 'Our teams operate with obsessive precision. We deliver nothing short of absolute perfection.',
    x: 88, y: 55,
  },
];

export default function BuildProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [dims, setDims] = useState({ w: 1200, h: 400 });

  useEffect(() => {
    const updateDims = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setDims({ w: rect.width, h: rect.height });
      }
    };
    updateDims();
    window.addEventListener('resize', updateDims);
    return () => window.removeEventListener('resize', updateDims);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: `top+=${i * 100} 60%`,
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
        background: 'rgba(10, 13, 16, 0.7)',
        padding: 'clamp(80px, 12vh, 160px) clamp(24px, 6vw, 96px)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Subtle background texture */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.02) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ marginBottom: '60px', textAlign: 'center' }}>
        <p className="text-system" style={{ color: 'rgba(0,212,255,0.5)', marginBottom: '16px' }}>
          THE BUILD
        </p>
        <h2 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(32px, 5vw, 72px)',
          fontWeight: 300,
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
          color: '#ffffff',
        }}>
          HOW WE<br />
          <span style={{ color: '#ffffff' }}>ENGINEER.</span>
        </h2>
      </div>

      {/* Node graph */}
      <div style={{ position: 'relative', height: '400px', marginBottom: '60px' }}>
        <svg
          ref={svgRef}
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection paths */}
          {steps.slice(0, -1).map((step, i) => {
            const from = getPos(step);
            const to = getPos(steps[i + 1]);
            const isActive = i < activeStep;
            const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };

            return (
              <g key={`path-${i}`}>
                {/* Base path */}
                <path
                  d={`M ${from.x} ${from.y} Q ${mid.x} ${mid.y - 40} ${to.x} ${to.y}`}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="4 8"
                />
                {/* Active path */}
                {isActive && (
                  <path
                    d={`M ${from.x} ${from.y} Q ${mid.x} ${mid.y - 40} ${to.x} ${to.y}`}
                    stroke="rgba(0,212,255,0.4)"
                    strokeWidth="1"
                    fill="none"
                    filter="url(#glow)"
                    strokeDasharray="4 8"
                  />
                )}
                {/* Energy particle */}
                {isActive && (
                  <circle r="2" fill="#00d4ff" filter="url(#glow)" opacity="0.8">
                    <animateMotion
                      dur="2s"
                      repeatCount="indefinite"
                      path={`M ${from.x} ${from.y} Q ${mid.x} ${mid.y - 40} ${to.x} ${to.y}`}
                    />
                  </circle>
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
              <g key={step.id} style={{ cursor: 'none' }}>
                {/* Pulse ring */}
                {isCurrent && (
                  <circle
                    cx={pos.x} cy={pos.y} r="24"
                    fill="none"
                    stroke="rgba(0,212,255,0.2)"
                    strokeWidth="1"
                    style={{ animation: 'pulse-ring 2s ease-out infinite' }}
                  />
                )}

                {/* Outer ring */}
                <circle
                  cx={pos.x} cy={pos.y} r="16"
                  fill="none"
                  stroke={isActive ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.1)'}
                  strokeWidth="1"
                  style={{
                    transition: 'stroke 0.5s ease',
                    filter: isActive ? 'url(#glow)' : 'none',
                  }}
                />

                {/* Inner dot */}
                <circle
                  cx={pos.x} cy={pos.y} r={isCurrent ? 5 : 3}
                  fill={isActive ? '#00d4ff' : 'rgba(255,255,255,0.2)'}
                  style={{
                    transition: 'all 0.5s ease',
                    filter: isActive ? 'url(#glow)' : 'none',
                  }}
                />

                {/* Label */}
                <text
                  x={pos.x} y={pos.y + 34}
                  textAnchor="middle"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '10px',
                    fontWeight: 400,
                    letterSpacing: '0.3em',
                    fill: isActive ? '#00d4ff' : '#ffffff',
                    transition: 'fill 0.5s ease',
                  }}
                >
                  {step.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Active step description */}
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {activeStep >= 0 && (
          <div style={{
            padding: '24px',
            textAlign: 'center',
            position: 'relative',
          }}>


            <h3 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '24px',
              fontWeight: 300,
              color: '#ffffff',
              marginBottom: '12px',
              letterSpacing: '0.05em'
            }}>
              {steps[activeStep]?.label}
            </h3>
            <p style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '14px',
              fontWeight: 300,
              color: '#ffffff',
              lineHeight: 1.6,
            }}>
              {steps[activeStep]?.desc}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
