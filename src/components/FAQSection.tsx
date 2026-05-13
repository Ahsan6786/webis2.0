'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer: "A standard business or portfolio website typically takes 1 to 2 weeks. Custom web applications or highly interactive platforms can take 4 to 8 weeks depending on the features required."
  },
  {
    question: "Do you provide hosting and domain names?",
    answer: "Yes! We can handle the entire deployment process. We offer premium, high-speed hosting solutions and can assist you in acquiring the perfect domain name for your brand."
  },
  {
    question: "Will my website look good on mobile phones?",
    answer: "Absolutely. Every experience we build is 100% responsive, meaning it will look pixel-perfect and perform flawlessly on smartphones, tablets, and desktop computers alike."
  },
  {
    question: "What is the ₹5,999 starting price for?",
    answer: "Our ₹5,999 package is designed for rapid deployment of a single-page, high-converting professional professional landing page. It's perfect for small businesses or portfolios looking to establish immediate, premium digital trust."
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer: "Yes, we build long-term relationships with our clients. We offer ongoing maintenance, optimizations, and technical support to ensure your product continues to perform at its absolute peak."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{ padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p className="text-system" style={{ color: 'rgba(0,212,255,0.5)', marginBottom: '16px' }}>
            QUESTIONS
          </p>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            marginBottom: '20px'
          }}>
            FREQUENTLY ASKED.
          </h2>
          <p style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '16px',
            color: 'rgba(255,255,255,0.5)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Everything you need to know about working with us.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
              >
                <button
                  onClick={() => toggleFAQ(i)}
                  style={{
                    width: '100%',
                    padding: '24px',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#ffffff',
                    letterSpacing: '0.02em',
                  }}>
                    {faq.question}
                  </span>
                  <span style={{
                    color: '#00d4ff',
                    fontSize: '20px',
                    transition: 'transform 0.3s ease',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}>
                    +
                  </span>
                </button>
                <div style={{
                  maxHeight: isOpen ? '200px' : '0',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: 'rgba(0,0,0,0.1)',
                }}>
                  <p style={{
                    padding: '24px',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.6)',
                    lineHeight: 1.6,
                    borderTop: '1px solid rgba(255,255,255,0.03)',
                  }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
