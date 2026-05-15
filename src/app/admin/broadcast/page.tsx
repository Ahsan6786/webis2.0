'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User, getIdToken } from 'firebase/auth';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Search, Send, Users, Activity, CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BroadcastPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);
  
  // Data state
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({ total: 0, sent: 0, failed: 0 });
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchInitialData(currentUser);
      } else {
        router.push('/admin');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const fetchInitialData = async (currentUser: User) => {
    try {
      // 1. Fetch Users from API
      const token = await currentUser.getIdToken();
      const res = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
        setFilteredUsers(data.users || []);
        setStats(prev => ({ ...prev, total: (data.users || []).length }));
      }

      // 2. Fetch Broadcast Logs from Firestore directly
      const q = query(collection(db, 'broadcastLogs'), orderBy('createdAt', 'desc'), limit(5));
      const logsSnapshot = await getDocs(q);
      const logs = logsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecentLogs(logs);

    } catch (error) {
      console.error('Error fetching data:', error);
      showToast('Failed to load initial data', 'error');
    }
  };

  useEffect(() => {
    // Search filtering
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      setFilteredUsers(users.filter(u => 
        (u.email && u.email.toLowerCase().includes(lowerQuery)) || 
        (u.name && u.name.toLowerCase().includes(lowerQuery))
      ));
    }
    setCurrentPage(1); // Reset to first page on search
  }, [searchQuery, users]);

  const handleSendBroadcast = async () => {
    if (!subject.trim() || !message.trim()) {
      showToast('Please provide both subject and message', 'error');
      return;
    }
    if (!confirm(`Are you sure you want to send this broadcast to ${users.length} users?`)) {
      return;
    }

    setIsSending(true);
    showToast('Sending broadcast...', 'info');

    try {
      const token = await user?.getIdToken();
      const res = await fetch('/api/admin/broadcast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ subject, message })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send broadcast');
      }

      showToast(`Broadcast completed. Sent: ${data.stats.sentCount}, Failed: ${data.stats.failedCount}`, 'success');
      setSubject('');
      setMessage('');
      
      // Update stats and fetch logs again
      setStats(prev => ({
        ...prev,
        sent: prev.sent + data.stats.sentCount,
        failed: prev.failed + data.stats.failedCount
      }));
      if (user) fetchInitialData(user);

    } catch (error: any) {
      console.error('Error sending broadcast:', error);
      showToast(error.message || 'Error sending broadcast', 'error');
    } finally {
      setIsSending(false);
    }
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#030508', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin text-[#00d4ff]" size={48} />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={{ minHeight: '100vh', background: '#030508', color: '#ffffff', padding: '40px 24px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 1000,
          background: toast.type === 'error' ? 'rgba(255, 74, 74, 0.9)' : 
                      toast.type === 'success' ? 'rgba(5, 223, 151, 0.9)' : 'rgba(0, 212, 255, 0.9)',
          backdropFilter: 'blur(10px)', padding: '16px 24px', borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', gap: '12px',
          animation: 'slideIn 0.3s ease-out'
        }}>
          {toast.type === 'error' && <AlertCircle size={20} />}
          {toast.type === 'success' && <CheckCircle2 size={20} />}
          {toast.type === 'info' && <Activity size={20} />}
          <span style={{ fontWeight: 500, fontSize: '14px' }}>{toast.message}</span>
        </div>
      )}

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <p style={{ fontFamily: 'Space Grotesk', fontSize: '12px', color: '#00d4ff', letterSpacing: '0.1em', marginBottom: '8px' }}>
              WEBIS EMAIL CENTER
            </p>
            <h1 style={{ fontSize: '32px', fontWeight: 600 }}>Broadcast Dashboard</h1>
          </div>
          <button
            onClick={() => router.push('/admin')}
            style={{
              background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff',
              padding: '10px 20px', borderRadius: '30px', fontSize: '14px', cursor: 'pointer', transition: 'all 0.3s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            Back to Admin
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <div style={{ background: 'linear-gradient(145deg, #0a0d10 0%, #030508 100%)', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ padding: '10px', background: 'rgba(0,212,255,0.1)', borderRadius: '12px' }}><Users size={24} color="#00d4ff" /></div>
              <p style={{ fontFamily: 'Space Grotesk', fontSize: '12px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>TOTAL USERS</p>
            </div>
            <h3 style={{ fontSize: '36px', fontWeight: 600 }}>{stats.total}</h3>
          </div>
          
          <div style={{ background: 'linear-gradient(145deg, #0a0d10 0%, #030508 100%)', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ padding: '10px', background: 'rgba(5,223,151,0.1)', borderRadius: '12px' }}><CheckCircle2 size={24} color="#05df97" /></div>
              <p style={{ fontFamily: 'Space Grotesk', fontSize: '12px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>TOTAL SENT</p>
            </div>
            <h3 style={{ fontSize: '36px', fontWeight: 600 }}>{stats.sent}</h3>
          </div>

          <div style={{ background: 'linear-gradient(145deg, #0a0d10 0%, #030508 100%)', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ padding: '10px', background: 'rgba(255,74,74,0.1)', borderRadius: '12px' }}><XCircle size={24} color="#ff4a4a" /></div>
              <p style={{ fontFamily: 'Space Grotesk', fontSize: '12px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>FAILED</p>
            </div>
            <h3 style={{ fontSize: '36px', fontWeight: 600 }}>{stats.failed}</h3>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', '@media (minWidth: 1024px)': { gridTemplateColumns: '1fr 1fr' } } as any}>
          
          {/* Composer Section */}
          <div style={{ background: 'linear-gradient(145deg, #0a0d10 0%, #030508 100%)', border: '1px solid rgba(255,255,255,0.05)', padding: '32px', borderRadius: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Send size={20} color="#00d4ff" /> Compose Broadcast
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'Space Grotesk', fontSize: '12px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', marginBottom: '8px' }}>SUBJECT</label>
                <input
                  type="text"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="E.g. Thanks for Showing Interest"
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px', padding: '14px', color: '#ffffff', fontSize: '15px', outline: 'none', transition: 'border 0.3s'
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = '#00d4ff'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'Space Grotesk', fontSize: '12px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', marginBottom: '8px' }}>MESSAGE (Supports basic HTML formatting if needed, but text is preferred)</label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Hey there,\n\nThank you for showing interest in our platform..."
                  rows={8}
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px', padding: '14px', color: '#ffffff', fontSize: '15px', outline: 'none', resize: 'vertical', transition: 'border 0.3s'
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = '#00d4ff'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              <button
                onClick={handleSendBroadcast}
                disabled={isSending || users.length === 0}
                style={{
                  background: isSending ? 'rgba(255,255,255,0.1)' : '#ffffff',
                  color: isSending ? 'rgba(255,255,255,0.5)' : '#030508',
                  border: 'none', borderRadius: '30px', padding: '16px', fontSize: '15px', fontWeight: 600,
                  cursor: isSending || users.length === 0 ? 'not-allowed' : 'pointer', transition: 'all 0.3s',
                  display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
                }}
                onMouseEnter={e => { if (!isSending && users.length > 0) e.currentTarget.style.background = '#00d4ff'; }}
                onMouseLeave={e => { if (!isSending && users.length > 0) e.currentTarget.style.background = '#ffffff'; }}
              >
                {isSending ? <><Loader2 className="animate-spin" size={20} /> SENDING...</> : <><Send size={20} /> SEND BROADCAST TO {users.length} USERS</>}
              </button>
            </div>
          </div>

          {/* Users List & Logs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            {/* Users Table section */}
            <div style={{ background: 'linear-gradient(145deg, #0a0d10 0%, #030508 100%)', border: '1px solid rgba(255,255,255,0.05)', padding: '32px', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={20} color="#00d4ff" /> Mailing List
                </h2>
                
                <div style={{ position: 'relative' }}>
                  <Search size={16} color="rgba(255,255,255,0.5)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="text" 
                    placeholder="Search email..." 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{
                      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '30px', padding: '8px 16px 8px 36px', color: '#ffffff', fontSize: '13px', outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Space Grotesk', fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textAlign: 'left' }}>
                      <th style={{ padding: '12px 16px' }}>EMAIL</th>
                      <th style={{ padding: '12px 16px' }}>JOINED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((u, i) => (
                      <tr key={u.id || i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                        <td style={{ padding: '16px', fontSize: '14px' }}>{u.email}</td>
                        <td style={{ padding: '16px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                          {u.timestamp?.toDate ? u.timestamp.toDate().toLocaleDateString() : u.createdAt?.toDate ? u.createdAt.toDate().toLocaleDateString() : 'N/A'}
                        </td>
                      </tr>
                    ))}
                    {currentUsers.length === 0 && (
                      <tr>
                        <td colSpan={2} style={{ padding: '32px', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '4px 12px', borderRadius: '4px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                  >Prev</button>
                  <span style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                    {currentPage} / {totalPages}
                  </span>
                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '4px 12px', borderRadius: '4px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                  >Next</button>
                </div>
              )}
            </div>

            {/* Recent Broadcasts */}
            <div style={{ background: 'linear-gradient(145deg, #0a0d10 0%, #030508 100%)', border: '1px solid rgba(255,255,255,0.05)', padding: '32px', borderRadius: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={20} color="#00d4ff" /> Recent Broadcasts
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {recentLogs.map((log) => (
                  <div key={log.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h4 style={{ fontWeight: 600, fontSize: '15px' }}>{log.subject}</h4>
                      <span style={{ 
                        fontSize: '11px', fontFamily: 'Space Grotesk', padding: '4px 8px', borderRadius: '4px',
                        background: log.status === 'completed' ? 'rgba(5,223,151,0.1)' : log.status === 'failed' ? 'rgba(255,74,74,0.1)' : 'rgba(0,212,255,0.1)',
                        color: log.status === 'completed' ? '#05df97' : log.status === 'failed' ? '#ff4a4a' : '#00d4ff'
                      }}>
                        {log.status.toUpperCase()}
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
                      {log.createdAt?.toDate ? log.createdAt.toDate().toLocaleString() : 'N/A'}
                    </p>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '13px' }}>
                      <span style={{ color: 'rgba(255,255,255,0.7)' }}>Target: {log.targetCount || 0}</span>
                      <span style={{ color: '#05df97' }}>Sent: {log.sentCount || 0}</span>
                      <span style={{ color: '#ff4a4a' }}>Failed: {log.failedCount || 0}</span>
                    </div>
                  </div>
                ))}
                {recentLogs.length === 0 && (
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', textAlign: 'center', padding: '20px 0' }}>No broadcasts yet.</p>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
