'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'HOME', href: '#hero' },
  { label: 'OUR PRODUCTS', href: '/projects' },
  { label: 'WORK', href: '#showcase' },
  { label: 'PROCESS', href: '#process' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sy = window.scrollY;
          setScrolled(sy > 40);
          lastScrollY.current = sy;
          ticking = false;
        });
        ticking = true;
      }
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = href;
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      {!isMobile && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
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
            background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
            border: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderRadius: '100px',
            padding: '12px 24px',
            transition: 'background 0.4s ease, border-color 0.4s ease',
            boxShadow: scrolled ? '0 10px 30px -10px rgba(0,0,0,0.5)' : 'none',
          }}
        >
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
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#ffffff',
                padding: '6px 14px',
                cursor: 'pointer',
                transition: 'color 0.3s ease, background 0.3s ease',
                borderRadius: '100px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#030508';
                e.currentTarget.style.background = '#ffffff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {item.label}
            </button>
          ))}
        </motion.nav>
      )}

      {/* Mobile Hamburger Button */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'fixed',
            top: '16px',
            right: '16px',
            zIndex: 9999,
            background: 'rgba(3, 5, 8, 0.9)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span style={{ width: '16px', height: '1px', background: '#ffffff', transition: 'transform 0.3s', transform: isOpen ? 'rotate(45deg) translate(3.5px, 3.5px)' : 'none' }}></span>
          <span style={{ width: '16px', height: '1px', background: '#ffffff', opacity: isOpen ? 0 : 1, transition: 'opacity 0.3s' }}></span>
          <span style={{ width: '16px', height: '1px', background: '#ffffff', transition: 'transform 0.3s', transform: isOpen ? 'rotate(-45deg) translate(3.5px, -3.5px)' : 'none' }}></span>
        </button>
      )}

      {/* Mobile Full-Page Sidebar */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#030508',
              zIndex: 9998,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '24px',
            }}
          >
            {/* Tabular List Container */}
            <div style={{ width: '100%', maxWidth: '320px' }}>
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                  onClick={() => handleNavClick(item.href)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: 'none',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '18px',
                    fontWeight: 300,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: '#ffffff',
                    padding: '16px 8px',
                    width: '100%',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'background 0.3s, color 0.3s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
              
              {/* Social Links */}
              <div style={{ display: 'flex', gap: '24px', marginTop: '30px', padding: '16px 8px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <a href="mailto:mitraai0001@gmail.com" style={{
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  transition: 'color 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#00d4ff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  EMAIL
                </a>
                <a href="https://instagram.com/webis001" target="_blank" rel="noopener noreferrer" style={{
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  transition: 'color 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#ff2a6d'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  INSTAGRAM
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
