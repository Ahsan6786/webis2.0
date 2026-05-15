'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, getDocs, query, orderBy, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import Link from 'next/link';

interface Lead {
  id: string;
  name: string;
  email?: string;
  mobile: string;
  purpose?: string;
  message?: string;
  source?: string;
  timeSpent?: number;
  checked?: boolean;
  timestamp?: any;
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        fetchLeads();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchLeads = async () => {
    try {
      const q = query(collection(db, 'leads'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const leadsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lead[];
      setLeads(leadsData);
    } catch (err) {
      console.error('Error fetching leads:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setLeads([]);
  };

  const handleToggleCheck = async (leadId: string, currentStatus: boolean) => {
    try {
      const leadRef = doc(db, 'leads', leadId);
      await updateDoc(leadRef, {
        checked: !currentStatus
      });
      setLeads(leads.map(lead => 
        lead.id === leadId ? { ...lead, checked: !currentStatus } : lead
      ));
    } catch (err) {
      console.error('Error updating lead status:', err);
    }
  };

  const handleDelete = async (leadId: string) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const leadRef = doc(db, 'leads', leadId);
      await deleteDoc(leadRef);
      setLeads(leads.filter(lead => lead.id !== leadId));
    } catch (err) {
      console.error('Error deleting lead:', err);
      alert('Failed to delete lead. Check permissions.');
    }
  };

  // Process leads for charts
  const getLeadsByDate = () => {
    const counts: { [key: string]: number } = {};
    leads.forEach(lead => {
      if (lead.timestamp?.toDate) {
        const date = lead.timestamp.toDate().toLocaleDateString();
        counts[date] = (counts[date] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value })).reverse();
  };

  const getLeadsBySource = () => {
    const counts: { [key: string]: number } = {};
    leads.forEach(lead => {
      const source = lead.source === 'contact_section' ? 'Section' : 'Popup';
      counts[source] = (counts[source] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const leadsByDate = getLeadsByDate();
  const leadsBySource = getLeadsBySource();
  const COLORS = ['#00d4ff', '#ff2a6d'];

  const getAvgTimeSpent = () => {
    const validLeads = leads.filter(l => l.timeSpent !== undefined);
    if (validLeads.length === 0) return 0;
    const total = validLeads.reduce((acc, lead) => acc + (lead.timeSpent || 0), 0);
    return Math.round(total / validLeads.length);
  };
  const avgTimeSpent = getAvgTimeSpent();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#030508', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
        Loading...
      </div>
    );
  }

  // Login View
  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: '#030508', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ width: '100%', maxWidth: '400px', background: '#0a0d10', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <p className="text-system" style={{ color: 'rgba(0,212,255,0.5)', marginBottom: '12px' }}>
              ADMIN PORTAL
            </p>
            <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: '28px', fontWeight: 600, color: '#ffffff' }}>
              Sign In
            </h1>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
                EMAIL
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@example.com"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  color: '#ffffff',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
                PASSWORD
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  color: '#ffffff',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            {error && (
              <p style={{ color: '#ff4a4a', fontSize: '12px', fontFamily: 'Space Grotesk' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              style={{
                background: '#ffffff',
                color: '#030508',
                border: 'none',
                borderRadius: '30px',
                padding: '14px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                marginTop: '10px',
                transition: 'background 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#00d4ff'}
              onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div style={{ minHeight: '100vh', background: '#030508', padding: '40px 24px' }}>
      <style>{`
        @media (max-width: 768px) {
          .lead-card {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 20px !important;
          }
          .lead-card-right {
            text-align: left !important;
            width: 100% !important;
            flex-direction: column-reverse !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .lead-card-msg {
            text-align: left !important;
            max-width: 100% !important;
          }
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
          .charts-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <p className="text-system" style={{ color: '#00d4ff', marginBottom: '8px', fontWeight: 500 }}>
              ADMIN DASHBOARD
            </p>
            <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: '32px', fontWeight: 600, color: '#ffffff' }}>
              Leads & Inquiries
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Link href="/admin/broadcast" style={{
              background: '#00d4ff',
              color: '#030508',
              border: 'none',
              borderRadius: '20px',
              padding: '10px 20px',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.3s',
            }}>
              EMAIL BROADCAST
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: 'transparent',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.4)',
                borderRadius: '20px',
                padding: '10px 20px',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#ff4a4a';
                e.currentTarget.style.color = '#ff4a4a';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              LOGOUT
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ background: '#0a0d10', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ fontFamily: 'Space Grotesk', fontSize: '11px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>TOTAL LEADS</p>
            <h3 style={{ fontFamily: 'Inter', fontSize: '36px', fontWeight: 600, color: '#ffffff', marginTop: '8px' }}>{leads.length}</h3>
          </div>
          <div style={{ background: '#0a0d10', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ fontFamily: 'Space Grotesk', fontSize: '11px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>LIVE VIEWERS</p>
            <h3 style={{ fontFamily: 'Inter', fontSize: '36px', fontWeight: 600, color: '#00d4ff', marginTop: '8px' }}>1</h3>
          </div>
          <div style={{ background: '#0a0d10', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ fontFamily: 'Space Grotesk', fontSize: '11px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>AVG TIME SPENT</p>
            <h3 style={{ fontFamily: 'Inter', fontSize: '36px', fontWeight: 600, color: '#ffffff', marginTop: '8px' }}>{avgTimeSpent}s</h3>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="charts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {/* Leads Over Time */}
          <div style={{ background: '#0a0d10', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ fontFamily: 'Space Grotesk', fontSize: '11px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em', marginBottom: '16px' }}>LEADS OVER TIME</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={leadsByDate}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '10px', fontFamily: 'Space Grotesk' }} />
                <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '10px', fontFamily: 'Space Grotesk' }} />
                <Tooltip contentStyle={{ background: '#0a0d10', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff' }} />
                <Area type="monotone" dataKey="value" stroke="#00d4ff" strokeWidth={3} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Source Breakdown */}
          <div style={{ background: '#0a0d10', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ fontFamily: 'Space Grotesk', fontSize: '11px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em', marginBottom: '16px' }}>SOURCE BREAKDOWN</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={leadsBySource}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  style={{ fontFamily: 'Space Grotesk', fontSize: '10px', fill: '#ffffff' }}
                >
                  {leadsBySource.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0a0d10', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leads Cards List */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontFamily: 'Space Grotesk', fontSize: '11px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em', marginBottom: '16px' }}>RECENT INQUIRIES</p>
          
          {leads.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontFamily: 'Space Grotesk', background: '#0a0d10', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              No leads found.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {leads.map(lead => (
                <div key={lead.id} className="lead-card" style={{ 
                  background: lead.checked ? 'rgba(0,212,255,0.05)' : 'rgba(10,13,16,0.8)',
                  backdropFilter: 'blur(10px)',
                  padding: '24px', 
                  borderRadius: '12px', 
                  border: lead.checked ? '1px solid #00d4ff' : '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    {/* Checkbox */}
                    <div 
                      onClick={() => handleToggleCheck(lead.id, lead.checked || false)}
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '6px',
                        border: '2px solid',
                        borderColor: lead.checked ? '#00d4ff' : 'rgba(255,255,255,0.4)',
                        background: lead.checked ? '#00d4ff' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {lead.checked && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#030508" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"></polyline></svg>
                      )}
                    </div>

                    {/* Lead Info */}
                    <div>
                      <h3 style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 600, color: '#ffffff' }}>{lead.name}</h3>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '6px' }}>
                        <span style={{ fontFamily: 'Space Grotesk', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>{lead.mobile}</span>
                        {lead.email && (
                          <>
                            <span style={{ width: '4px', height: '4px', background: 'rgba(255,255,255,0.4)', borderRadius: '50%' }}></span>
                            <span style={{ fontFamily: 'Space Grotesk', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
                              <a href={`mailto:${lead.email}`} style={{ color: 'inherit', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = '#00d4ff'} onMouseLeave={e => e.currentTarget.style.color = 'inherit'}>{lead.email}</a>
                            </span>
                          </>
                        )}
                        <button 
                          onClick={(e) => {
                            navigator.clipboard.writeText(lead.mobile);
                            const btn = e.currentTarget;
                            btn.innerText = 'COPIED!';
                            setTimeout(() => btn.innerText = 'COPY', 1500);
                          }}
                          style={{
                            background: 'rgba(0,212,255,0.1)',
                            border: 'none',
                            color: '#00d4ff',
                            fontSize: '10px',
                            cursor: 'pointer',
                            marginLeft: '8px',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontFamily: 'Space Grotesk',
                            letterSpacing: '0.05em',
                            fontWeight: 500
                          }}
                        >
                          COPY
                        </button>
                        <span style={{ width: '4px', height: '4px', background: 'rgba(255,255,255,0.4)', borderRadius: '50%' }}></span>
                        <span style={{ fontFamily: 'Space Grotesk', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                          {lead.timestamp?.toDate ? lead.timestamp.toDate().toLocaleString() : 'Just now'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Message & Tags */}
                  <div className="lead-card-right" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div className="lead-card-msg" style={{ maxWidth: '400px', textAlign: 'right' }}>
                      <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#ffffff', lineHeight: '1.5' }}>
                        {lead.purpose || lead.message || 'No message'}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(lead.id)}
                        style={{
                          background: 'rgba(255, 74, 74, 0.1)',
                          border: 'none',
                          color: '#ff4a4a',
                          fontSize: '11px',
                          cursor: 'pointer',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontFamily: 'Space Grotesk',
                          letterSpacing: '0.05em',
                          fontWeight: 500,
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = '#ff4a4a';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'rgba(255, 74, 74, 0.1)';
                          e.currentTarget.style.color = '#ff4a4a';
                        }}
                      >
                        DELETE
                      </button>

                      {/* Source Tag */}
                      <span style={{ 
                        fontSize: '11px', 
                        fontFamily: 'Space Grotesk',
                        background: lead.source === 'contact_section' ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.1)',
                        color: lead.source === 'contact_section' ? '#00d4ff' : '#ffffff',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        letterSpacing: '0.05em',
                        fontWeight: 500
                      }}>
                        {lead.source === 'contact_section' ? 'SECTION' : 'POPUP'}
                      </span>

                      {/* Time Spent Tag */}
                      {lead.timeSpent && (
                        <span style={{ 
                          fontSize: '11px', 
                          fontFamily: 'Space Grotesk',
                          background: 'rgba(5,223,151,0.15)',
                          color: '#05df97',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          letterSpacing: '0.05em',
                          fontWeight: 500
                        }}>
                          {lead.timeSpent}s STAY
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
