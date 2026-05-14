'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';

const team = [
  {
    name: 'Ahsan Imam Khan',
    role: 'Founder & Full Stack Developer',
    image: '/ahsan.webp',
    bio: 'The visionary architect behind the Webis platform. Ahsan blends deep technical mastery with creative design to build digital ecosystems that are as beautiful as they are performant.',
    skills: ['Architecture', 'Full Stack', 'UI/UX', 'Problem solving', 'Logic'],
  },
  {
    name: 'Navneet Kumar',
    role: 'Full Stack Developer',
    image: '/navneet.webp',
    bio: 'The engineering engine of the team. Navneet specializes in crafting robust, high-performance backend systems and fluid frontend experiences that set new standards for reliability.',
    skills: ['Technical Logic', 'Performance', 'Scalability'],
  },
  {
    name: 'Akshat Raj',
    role: 'Sponsor & Advertisement',
    image: '/akshat.webp',
    bio: 'The growth strategist driving Webis\'s global visibility. Akshat ensures our brand reached the right audience through high-impact marketing and strategic sponsorship initiatives.',
    skills: ['Growth Hacking', 'Partnerships', 'Public Relations'],
  },
];

export default function TeamPage() {
  return (
    <main style={{ background: '#030508', minHeight: '100vh', color: '#ffffff', overflow: 'hidden' }}>
      <Navigation />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '160px 24px 80px' }}>
        
        {/* Back Button */}
        <button
          onClick={() => window.location.href = '/'}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#ffffff',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#00d4ff';
            e.currentTarget.style.color = '#00d4ff';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.color = '#ffffff';
          }}
        >
          ←
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p className="text-system" style={{ color: 'rgba(0,212,255,0.5)', marginBottom: '16px', letterSpacing: '0.2em' }}>
            THE COLLECTIVE
          </p>
          <h1 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(40px, 7vw, 80px)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#ffffff',
            marginBottom: '24px',
            textTransform: 'uppercase',
          }}>
            MEET THE TEAM.
          </h1>
          <p style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '16px',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.05em',
            fontWeight: 300,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            A small team of hyper-focused individuals dedicated to pushing the boundaries of digital experiences.
          </p>
        </div>

        {/* Team Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '40px' 
        }}>
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
                border: '1px solid rgba(0, 212, 255, 0.2)',
                borderRadius: '24px',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Image Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ 
                  position: 'relative', 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%', 
                  overflow: 'hidden',
                  border: '2px solid rgba(0,212,255,0.2)'
                }}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '22px', fontWeight: 400, color: '#ffffff', marginBottom: '4px' }}>
                    {member.name}
                  </h2>
                  <span style={{ fontFamily: 'Space Grotesk', fontSize: '12px', color: '#00d4ff', letterSpacing: '0.05em' }}>
                    {member.role}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '14px',
                color: '#ffffff',
                lineHeight: 1.6,
                fontWeight: 300,
                minHeight: '80px',
              }}>
                {member.bio}
              </p>

              {/* Skills Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: 'auto' }}>
                {member.skills.map(skill => (
                  <span 
                    key={skill}
                    style={{
                      fontFamily: 'Space Grotesk',
                      fontSize: '11px',
                      color: '#ffffff',
                      background: 'rgba(255,255,255,0.1)',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </main>
  );
}
