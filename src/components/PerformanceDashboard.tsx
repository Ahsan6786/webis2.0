'use client';

import { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

function CountUp({ end, duration = 1500, suffix = '' }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
}

// Mock data based on the image
const growthData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 40 },
  { name: 'Mar', value: 45 },
  { name: 'Apr', value: 60 },
  { name: 'May', value: 70 },
  { name: 'Jun', value: 95 },
  { name: 'Jul', value: 120 },
  { name: 'Aug', value: 150 },
  { name: 'Sep', value: 180 },
  { name: 'Oct', value: 210 },
  { name: 'Nov', value: 250 },
  { name: 'Dec', value: 320 },
];

const conversionData = [
  { name: 'W1', value: 5 },
  { name: 'W2', value: 8 },
  { name: 'W3', value: 12 },
  { name: 'W4', value: 15 },
  { name: 'W5', value: 22 },
  { name: 'W6', value: 30 },
  { name: 'W7', value: 45 },
  { name: 'W8', value: 55 },
];

const valueData = [
  { name: 'Q1', value: 5 },
  { name: 'Q2', value: 25 },
  { name: 'Q3', value: 55 },
  { name: 'Q4', value: 100 },
];

const latencyData = [
  { name: '1', value: 30 },
  { name: '2', value: 28 },
  { name: '3', value: 35 },
  { name: '4', value: 20 },
  { name: '5', value: 45 },
  { name: '6', value: 80 },
  { name: '7', value: 75 },
  { name: '8', value: 40 },
  { name: '9', value: 20 },
];

const sectorData = [
  { name: 'E-com', value: 70 },
  { name: 'B2B', value: 50 },
  { name: 'SaaS', value: 90 },
  { name: 'AI', value: 30 },
];

const uptimeData = [
  { name: '1', value: 98 },
  { name: '2', value: 95 },
  { name: '3', value: 99 },
  { name: '4', value: 97 },
  { name: '5', value: 99.5 },
  { name: '6', value: 98.5 },
  { name: '7', value: 99.9 },
];

const satisfactionData = [
  { name: 'Satisfied', value: 98 },
  { name: 'Unsatisfied', value: 2 },
];

const COLORS = ['#00d4ff', 'rgba(255,255,255,0.1)'];

export default function PerformanceDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section style={{ padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .charts-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .large-charts-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p className="text-system" style={{ color: 'rgba(0,212,255,0.5)', marginBottom: '16px' }}>
            SYSTEM METRICS
          </p>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            marginBottom: '20px'
          }}>
            ENGINEERING PERFORMANCE.
          </h2>
          <p style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '16px',
            color: 'rgba(255,255,255,0.5)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Real-time data visualization of our system architecture and delivery efficiency.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="stats-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '24px',
          marginBottom: '24px'
        }}>
          <StatCard title="Projects Completed" value={<CountUp end={55} suffix="+" />} sub="Across 12 countries" />
          <StatCard title="Fastest Delivery" value={<CountUp end={5} suffix="h" />} sub="Record turnaround" />
          <StatCard title="Client Satisfaction" value={<CountUp end={98} suffix="%" />} sub="5-star rated" />
          <StatCard title="Support Response" value={<CountUp end={1} suffix="hr" />} sub="Average response time" />
        </div>

        <div className="large-charts-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '24px',
          marginBottom: '24px'
        }}>
          {/* Large Charts */}
          <ChartCard title="Active Growth" sub="+24% YOY">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={growthData}>
                <Line type="monotone" dataKey="value" stroke="#00d4ff" strokeWidth={2} dot={false} />
                <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)' }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Conversion Rate" sub="Peak 18.5%">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={conversionData}>
                <Line type="monotone" dataKey="value" stroke="#ff2a6d" strokeWidth={2} dot={{ fill: '#ff2a6d' }} />
                <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)' }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Quarterly Value" sub="Avg ROI 3.2x">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={valueData}>
                <Bar dataKey="value" fill="#00f3ff" radius={[4, 4, 0, 0]} />
                <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)' }} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="charts-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '24px'
        }}>
          {/* Small Charts */}
          <ChartCard title="Client Satisfaction">
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  data={satisfactionData}
                  innerRadius={40}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {satisfactionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#ffffff" style={{ fontFamily: 'Space Grotesk', fontSize: '16px' }}>
                  98%
                </text>
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Latency" sub="Live">
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={latencyData}>
                <Line type="monotone" dataKey="value" stroke="#05df97" strokeWidth={2} dot={false} />
                <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)' }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Sectors">
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={sectorData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" style={{ fontFamily: 'Space Grotesk', fontSize: '12px', fill: 'rgba(255,255,255,0.5)' }} />
                <Bar dataKey="value" fill="#0066ff" radius={[0, 4, 4, 0]} />
                <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)' }} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Network Uptime" sub="Live">
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={uptimeData}>
                <Line type="monotone" dataKey="value" stroke="#05df97" strokeWidth={2} dot={false} />
                <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)' }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </section>
  );
}

// Sub-components for clean structure
function StatCard({ title, value, sub }: { title: string, value: React.ReactNode, sub: string }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '12px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      transition: 'all 0.3s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
      e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
    }}
    >
      <p style={{ fontFamily: 'Space Grotesk', fontSize: '12px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>
        {title.toUpperCase()}
      </p>
      <h3 style={{ fontFamily: 'Inter', fontSize: '36px', fontWeight: 600, color: '#ffffff' }}>
        {value}
      </h3>
      <p style={{ fontFamily: 'Space Grotesk', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
        {sub}
      </p>
    </div>
  );
}

function ChartCard({ title, sub, children }: { title: string, sub?: string, children: React.ReactNode }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '12px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      transition: 'all 0.3s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
    }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontFamily: 'Space Grotesk', fontSize: '12px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}>
          {title.toUpperCase()}
        </p>
        {sub && (
          <span style={{ 
            fontFamily: 'Space Grotesk', 
            fontSize: '10px', 
            color: '#00d4ff',
            background: 'rgba(0,212,255,0.1)',
            padding: '2px 8px',
            borderRadius: '10px'
          }}>
            {sub.toUpperCase()}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
