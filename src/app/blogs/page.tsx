'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

const blogs = [
  {
    slug: 'website-helps-business-grow',
    title: 'How a Custom Website Accelerates Business Growth',
    date: 'May 12, 2026',
    readTime: '5 min read',
    category: 'GROWTH',
    excerpt: 'Discover how a tailored digital solution can automate operations, increase lead conversion by 200%, and position your brand as a market leader in a crowded space.',
    content: `
      <p>In 2026, a website is no longer just a digital brochure. It is the engine of your business growth. When we build custom systems, we aren't just thinking about aesthetics; we are engineering solutions that solve real business problems.</p>
      
      <h3>1. Automation of Operations</h3>
      <p>A well-built website can automate tasks that your team does manually every day. From booking appointments to processing orders and handling customer inquiries through AI-driven interfaces. This frees up your human capital to focus on high-value tasks.</p>
      
      <h3>2. Data-Driven Decisions</h3>
      <p>Custom websites allow for deep analytics integration. You can track exactly where your users are coming from, what they are looking at, and where they drop off. This data is gold for optimizing your marketing spend and product offerings.</p>
      
      <h3>3. 24/7 Sales Force</h3>
      <p>Your website never sleeps, never takes a sick day, and can handle thousands of customers at once. It is the ultimate sales tool that works for you around the clock, presenting your best self to the world.</p>
      
      <p>Investing in a custom website is investing in the scalability of your business. Stop using templates that limit your potential and start building systems that drive growth.</p>
    `,
  },
  {
    slug: 'why-static-business-needs-website',
    title: 'Why Even Static Businesses Need a Website in 2026',
    date: 'May 10, 2026',
    readTime: '4 min read',
    category: 'STRATEGY',
    excerpt: 'Think a website isn\'t necessary for your offline business? Learn how 85% of customers research online before visiting a physical location, and how you are losing them.',
    content: `
      <p>We often hear from traditional, offline businesses that they "don't need a website" because their business comes from word of mouth or foot traffic. This is a dangerous misconception in 2026.</p>
      
      <h3>1. The Digital First Impression</h3>
      <p>Even if someone hears about your business via word of mouth, the first thing they do is search for you online. If they find nothing, or a poorly made social media page, you instantly lose credibility. Your website is your digital storefront.</p>
      
      <h3>2. Discovery</h3>
      <p>New residents moving to your area or people looking for services you offer use search engines. Without a website optimized for local SEO, you are invisible to a massive pool of potential customers who are ready to buy.</p>
      
      <h3>3. Control the Narrative</h3>
      <p>If you don't have a website, review platforms and third-party directories control what people see about your business. A website allows you to tell your story, showcase your work, and present your business exactly how you want it to be seen.</p>
      
      <p>A static business doesn't need a complex e-commerce system, but it absolutely needs a high-converting, professional landing page to capture the modern consumer.</p>
    `,
  },
  {
    slug: 'roi-of-premium-web-design',
    title: 'The Real ROI of Premium Web Design',
    date: 'May 08, 2026',
    readTime: '6 min read',
    category: 'DESIGN',
    excerpt: 'It\'s not just about looking good. Premium design builds instant trust, reduces bounce rates, and directly impacts your bottom line by converting visitors into loyal clients.',
    content: `
      <p>When businesses look to cut costs, marketing and design budgets are often the first to go. However, data consistently shows that premium design is one of the highest ROI investments a business can make.</p>
      
      <h3>1. The Trust Factor</h3>
      <p>Users form an opinion about your website in 0.05 seconds. In that fraction of a second, design is the only thing that matters. Premium design signals that you are a premium business. Cheap design signals high risk.</p>
      
      <h3>2. Reduced Bounce Rates</h3>
      <p>A beautiful, immersive experience keeps users on the page longer. The longer they stay, the more likely they are to understand your value proposition and take action. Good design guides the user smoothly to the conversion point.</p>
      
      <h3>3. Higher Perceived Value</h3>
      <p>You can charge more for your services if your digital presence looks expensive. Premium design elevates your brand above competitors, allowing you to compete on value rather than price.</p>
      
      <p>Don't view design as an expense. View it as a multiplier for all your other business efforts. A great product behind a poor website will always struggle to sell.</p>
    `,
  },
];

export default function BlogsPage() {
  const [selectedBlog, setSelectedBlog] = useState<typeof blogs[0] | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    if (slug) {
      const blog = blogs.find(b => b.slug === slug);
      if (blog) setSelectedBlog(blog);
    }
  }, []);

  return (
    <main style={{ background: '#030508', minHeight: '100vh', color: '#ffffff', overflow: 'hidden' }}>
      <Navigation />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '160px 24px 80px' }}>
        
        <AnimatePresence mode="wait">
          {!selectedBlog ? (
            /* Blog List View */
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
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

              <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                <p className="text-system" style={{ color: 'rgba(0,212,255,0.5)', marginBottom: '16px', letterSpacing: '0.2em' }}>
                  KNOWLEDGE BASE
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
                  INSIGHTS.
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
                  In-depth articles on how we bridge the gap between complex engineering and human experience.
                </p>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                gap: '40px' 
              }}>
                {blogs.map((blog, index) => (
                  <motion.div
                    key={blog.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
                      border: '1px solid rgba(0, 212, 255, 0.1)',
                      borderRadius: '16px',
                      padding: '40px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: '350px',
                      transition: 'all 0.3s ease',
                    }}
                    onClick={() => {
                      setSelectedBlog(blog);
                      window.scrollTo(0, 0);
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.1)';
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)';
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <span style={{ fontFamily: 'Space Grotesk', fontSize: '11px', color: '#00d4ff', letterSpacing: '0.1em' }}>
                          {blog.category}
                        </span>
                        <span style={{ fontFamily: 'Space Grotesk', fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
                          {blog.readTime}
                        </span>
                      </div>
                      <h2 style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '24px',
                        fontWeight: 400,
                        color: '#ffffff',
                        marginBottom: '16px',
                        lineHeight: 1.3,
                      }}>
                        {blog.title}
                      </h2>
                      <p style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.4)',
                        lineHeight: 1.6,
                      }}>
                        {blog.excerpt}
                      </p>
                    </div>
                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'Space Grotesk', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
                        {blog.date}
                      </span>
                      <span style={{ fontFamily: 'Space Grotesk', fontSize: '12px', color: '#ffffff', fontWeight: 500 }}>
                        READ ARTICLE →
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Blog Detail View */
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{ maxWidth: '800px', margin: '0 auto' }}
            >
              <button
                onClick={() => setSelectedBlog(null)}
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

              <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ 
                    fontFamily: 'Space Grotesk', 
                    fontSize: '12px', 
                    color: '#00d4ff', 
                    letterSpacing: '0.1em',
                    background: 'rgba(0,212,255,0.1)',
                    padding: '4px 12px',
                    borderRadius: '20px'
                  }}>
                    {selectedBlog.category}
                  </span>
                  <span style={{ fontFamily: 'Space Grotesk', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                    {selectedBlog.date}
                  </span>
                  <span style={{ fontFamily: 'Space Grotesk', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                    {selectedBlog.readTime}
                  </span>
                </div>

                <h1 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(32px, 5vw, 56px)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  color: '#ffffff',
                  marginBottom: '24px',
                }}>
                  {selectedBlog.title}
                </h1>
              </div>

              <div 
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
                dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
              />
              
              <style jsx>{`
                h3 {
                  font-family: 'Inter', sans-serif;
                  font-size: 22px;
                  font-weight: 400;
                  color: #ffffff;
                  margin-top: 40px;
                  margin-bottom: 16px;
                  letter-spacing: -0.01em;
                }
                p {
                  margin-bottom: 24px;
                }
              `}</style>
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </main>
  );
}
