'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500); // Show for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#000000',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Logo/Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center' }}
          >
            <h1 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(40px, 8vw, 120px)',
              fontWeight: 800,
              letterSpacing: '0.2em',
              color: '#ffffff',
              margin: 0,
              textTransform: 'uppercase',
            }}>
              WEBIS
            </h1>
            <p style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '12px',
              color: '#00d4ff',
              letterSpacing: '0.4em',
              marginTop: '16px',
              textTransform: 'uppercase',
              opacity: 0.8
            }}>
              CRAFTING THE FUTURE
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
