'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'DIMENSIONS', href: '#dimensions' },
  { label: 'WORK', href: '#showcase' },
  { label: 'PROCESS', href: '#process' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navigation() {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sy = window.scrollY;
          setScrolled(sy > 40);
          setVisible(sy > window.innerHeight * 0.3);
          lastScrollY.current = sy;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Navigation */}
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9997,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: scrolled ? 'rgba(0,0,0,0.8)' : 'transparent',
              border: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
              backdropFilter: scrolled ? 'blur(20px)' : 'none',
              borderRadius: '100px',
              padding: '12px 24px',
              transition: 'background 0.4s ease, border-color 0.4s ease',
            }}
          >
            {/* Logo */}
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              color: '#ffffff',
              marginRight: '20px',
            }}>
              WB
            </span>

            <div style={{
              width: '1px', height: '12px',
              background: 'rgba(255,255,255,0.12)',
              marginRight: '16px',
            }} />

            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '10px',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.45)',
                  padding: '6px 14px',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                  borderRadius: '100px',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              >
                {item.label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
