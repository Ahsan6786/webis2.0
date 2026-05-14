'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function HeroSection() {
  const words = ['ALIVE.', 'IMMERSIVE.', 'FUTURISTIC.', 'POWERFUL.'];
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const contact = formData.get('contact');

    try {
      await addDoc(collection(db, 'leads'), {
        name,
        mobile: contact,
        timestamp: new Date(),
        purpose: 'Book a Call',
        source: 'hero_popup',
      });
      alert('Booking submitted successfully!');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Failed to submit booking.');
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: 'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.25) 0%, #030508 60%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Main headline and content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 2, padding: '0 24px' }}
      >
        <div style={{ marginBottom: '24px' }}>
          <img
            src="/logo.png"
            alt="WEBIS"
            style={{
              height: '32px',
              width: 'auto',
              opacity: 0.8,
              display: 'inline-block',
            }}
          />
        </div>

        <h1
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(36px, 6.5vw, 100px)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          DIGITAL EXPERIENCES
          <br />
          SHOULD FEEL
          <br />
          <span style={{ display: 'inline-block' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{ color: '#00d4ff', display: 'inline-block' }}
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <p
          style={{
            marginTop: '32px',
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(14px, 1.4vw, 18px)',
            fontWeight: 300,
            letterSpacing: '0.05em',
            color: '#ffffff',
            opacity: 0.8,
          }}
        >
          We engineer digital experiences that feel alive.
        </p>

        <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <a
            href="#showcase"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '16px',
              padding: '14px 40px',
              background: '#ffffff',
              color: '#030508',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '100px',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, background 0.3s ease',
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
            Explore Work
          </a>

          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '16px',
              padding: '14px 40px',
              background: 'transparent',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.2)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              borderRadius: '100px',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, border-color 0.3s ease, color 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#00d4ff';
              e.currentTarget.style.color = '#00d4ff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'translateY(0px)';
            }}
          >
            Book a Call
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(10px)',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                background: 'linear-gradient(135deg, rgba(10,10,15,0.95) 0%, rgba(5,5,5,0.98) 100%)',
                border: '1px solid rgba(0, 212, 255, 0.2)',
                borderRadius: '24px',
                padding: '48px',
                width: '100%',
                maxWidth: '450px',
                position: 'relative',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(0,212,255,0.1)',
                backdropFilter: 'blur(20px)',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Decorative top line */}
              <div style={{
                position: 'absolute',
                top: 0, left: '10%', right: '10%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
              }} />

              <h2 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '28px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '8px',
                letterSpacing: '-0.02em'
              }}>
                Book a Call
              </h2>
              
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '32px',
                fontWeight: 300
              }}>
                Fill in your details and we'll get back to you.
              </p>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', marginBottom: '8px', fontSize: '11px', fontFamily: 'Space Grotesk, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    placeholder="John Doe"
                    style={{ 
                      width: '100%', 
                      padding: '14px 16px', 
                      background: 'rgba(255,255,255,0.03)', 
                      border: '1px solid rgba(255,255,255,0.08)', 
                      color: '#ffffff', 
                      borderRadius: '12px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                    }} 
                    onFocus={e => {
                      e.currentTarget.style.borderColor = '#00d4ff';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.boxShadow = '0 0 15px rgba(0,212,255,0.1)';
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', marginBottom: '8px', fontSize: '11px', fontFamily: 'Space Grotesk, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Phone Number</label>
                  <input 
                    type="tel" 
                    name="contact" 
                    required 
                    placeholder="+1234567890"
                    style={{ 
                      width: '100%', 
                      padding: '14px 16px', 
                      background: 'rgba(255,255,255,0.03)', 
                      border: '1px solid rgba(255,255,255,0.08)', 
                      color: '#ffffff', 
                      borderRadius: '12px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                    }} 
                    onFocus={e => {
                      e.currentTarget.style.borderColor = '#00d4ff';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.boxShadow = '0 0 15px rgba(0,212,255,0.1)';
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
                
                <button 
                  type="submit" 
                  style={{ 
                    width: '100%', 
                    padding: '16px', 
                    background: '#ffffff', 
                    color: '#030508', 
                    border: 'none', 
                    borderRadius: '12px', 
                    cursor: 'pointer', 
                    fontWeight: 600, 
                    fontFamily: 'Inter, sans-serif',
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em',
                    fontSize: '13px',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#00d4ff';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,212,255,0.3)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(0px)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Submit Request
                </button>
              </form>
              
              <button 
                onClick={() => setIsModalOpen(false)} 
                style={{ 
                  position: 'absolute', 
                  top: '24px', 
                  right: '24px', 
                  background: 'none', 
                  border: 'none', 
                  color: 'rgba(255,255,255,0.4)', 
                  cursor: 'pointer', 
                  fontSize: '24px',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
