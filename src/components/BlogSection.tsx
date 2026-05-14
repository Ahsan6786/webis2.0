'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const blogs = [
  {
    slug: 'website-helps-business-grow',
    title: 'How a Custom Website Accelerates Business Growth',
    date: 'May 12, 2026',
    readTime: '5 min read',
    excerpt: 'Discover how a tailored digital solution can automate operations, increase lead conversion by 200%, and position your brand as a market leader in a crowded space.',
    category: 'GROWTH',
  },
  {
    slug: 'why-static-business-needs-website',
    title: 'Why Even Static Businesses Need a Website in 2026',
    date: 'May 10, 2026',
    readTime: '4 min read',
    excerpt: 'Think a website isn\'t necessary for your offline business? Learn how 85% of customers research online before visiting a physical location, and how you are losing them.',
    category: 'STRATEGY',
  },
  {
    slug: 'roi-of-premium-web-design',
    title: 'The Real ROI of Premium Web Design',
    date: 'May 08, 2026',
    readTime: '6 min read',
    excerpt: 'It\'s not just about looking good. Premium design builds instant trust, reduces bounce rates, and directly impacts your bottom line by converting visitors into loyal clients.',
    category: 'DESIGN',
  },
];

export default function BlogSection() {
  return (
    <section id="blogs" style={{ 
      padding: '120px 24px', 
      position: 'relative', 
      overflow: 'hidden',
      background: '#030508',
    }}>
      {/* Ambient background glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(0,212,255,0.03) 0%, transparent 70%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p className="text-system" style={{ color: 'rgba(0,212,255,0.5)', marginBottom: '16px', letterSpacing: '0.2em' }}>
            INSIGHTS & ARTICLES
          </p>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#ffffff',
            marginBottom: '24px',
            textTransform: 'uppercase',
          }}>
            BLOGS
          </h2>
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
            Thoughts on design, engineering, and how digital architecture drives real business results.
          </p>
        </div>

        {/* Blog Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px',
          marginBottom: '60px'
        }}>
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10 }}
              style={{
                background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
                border: '1px solid rgba(0, 212, 255, 0.1)',
                borderRadius: '12px',
                padding: '40px 30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '380px',
                cursor: 'pointer',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)';
                e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0,212,255,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Corner Accent */}
              <div style={{
                position: 'absolute',
                top: 0, right: 0,
                width: '0', height: '0',
                borderStyle: 'solid',
                borderWidth: '0 40px 40px 0',
                borderColor: `transparent ${index === 0 ? '#00d4ff' : 'rgba(255,255,255,0.1)'} transparent transparent`,
                opacity: 0.2,
                transition: 'opacity 0.3s ease',
              }} />

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ 
                    fontFamily: 'Space Grotesk', 
                    fontSize: '11px', 
                    color: '#00d4ff', 
                    letterSpacing: '0.1em',
                    fontWeight: 500
                  }}>
                    {blog.category}
                  </span>
                  <span style={{ 
                    fontFamily: 'Space Grotesk', 
                    fontSize: '11px', 
                    color: 'rgba(255,255,255,0.3)',
                    letterSpacing: '0.05em'
                  }}>
                    {blog.readTime}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '22px',
                  fontWeight: 400,
                  color: '#ffffff',
                  marginBottom: '16px',
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                }}>
                  {blog.title}
                </h3>

                <p style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.4)',
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}>
                  {blog.excerpt}
                </p>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ 
                  fontFamily: 'Space Grotesk', 
                  fontSize: '12px', 
                  color: 'rgba(255,255,255,0.3)'
                }}>
                  {blog.date}
                </span>
                <Link href={`/blogs?slug=${blog.slug}`} style={{ textDecoration: 'none' }}>
                  <span style={{ 
                    fontFamily: 'Space Grotesk', 
                    fontSize: '12px', 
                    color: '#ffffff',
                    letterSpacing: '0.05em',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'color 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#00d4ff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}
                  >
                    READ MORE →
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link href="/blogs" style={{ textDecoration: 'none' }}>
            <button
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#ffffff',
                padding: '14px 32px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                cursor: 'pointer',
                borderRadius: '30px',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#00d4ff';
                e.currentTarget.style.color = '#00d4ff';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              VIEW ALL INSIGHTS
              <span style={{ fontSize: '16px' }}>→</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
