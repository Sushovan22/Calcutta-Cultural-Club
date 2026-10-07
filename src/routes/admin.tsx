import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { readCommunityPhotos, readContactSubmissions } from '@/lib/local-community-store';

const AUTH_KEY = 'cultural-club.admin-authorized';
const DEFAULT_PASSWORD = 'CulturalClubOwner2026';
const ADMIN_PASSWORD = import.meta.env.VITE_OWNER_PASSWORD || DEFAULT_PASSWORD;

export const Route = createFileRoute('/admin')({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [contactSubmissions, setContactSubmissions] = useState(readContactSubmissions());
  const [contestPhotos, setContestPhotos] = useState(readCommunityPhotos());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasAccess = window.localStorage.getItem(AUTH_KEY) === '1';
    setAuthorized(hasAccess);
    if (hasAccess) {
      refreshData();
    }

    const handleUpdated = () => {
      if (window.localStorage.getItem(AUTH_KEY) === '1') {
        refreshData();
      }
    };

    window.addEventListener('community-store-updated', handleUpdated);
    return () => window.removeEventListener('community-store-updated', handleUpdated);
  }, []);

  function refreshData() {
    setContactSubmissions(readContactSubmissions());
    setContestPhotos(readCommunityPhotos());
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (typeof window === 'undefined') return;

    if (password === ADMIN_PASSWORD) {
      window.localStorage.setItem(AUTH_KEY, '1');
      setAuthorized(true);
      setError('');
      refreshData();
      return;
    }

    setError('Incorrect owner password.');
  }

  function handleLogout() {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(AUTH_KEY);
    setAuthorized(false);
    setPassword('');
    setError('');
  }

  if (!authorized) {
    return (
      <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem', background: '#f7f1e8' }}>
        <div style={{ maxWidth: '420px', width: '100%', background: '#fffdf9', borderRadius: '18px', padding: '2rem', boxShadow: '0 20px 45px rgba(36, 26, 18, 0.08)' }}>
          <p style={{ letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.75rem', color: '#7a4f2b', marginBottom: '0.5rem' }}>Owner access</p>
          <h1 style={{ margin: '0 0 1rem', fontSize: '2rem', color: '#1d1a17' }}>Admin dashboard</h1>
          <form onSubmit={handleLogin} style={{ display: 'grid', gap: '1rem' }}>
            <label style={{ display: 'grid', gap: '0.5rem', fontWeight: 600, color: '#1d1a17' }}>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter owner password"
                style={{ padding: '0.8rem 0.9rem', border: '1px solid #dcc7b7', borderRadius: '10px', fontSize: '1rem' }}
              />
            </label>
            {error && <p role="alert" style={{ margin: 0, color: '#b42318', fontSize: '0.92rem' }}>{error}</p>}
            <Button type="submit" variant="festival">Open dashboard</Button>
          </form>
          <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#655443' }}>
            This dashboard is for the website owner only.
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: '#f8efe6', padding: '2rem 1rem 4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div>
            <p style={{ letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.75rem', color: '#7a4f2b', margin: 0 }}>Owner panel</p>
            <h1 style={{ margin: '0.3rem 0 0', fontSize: '2.3rem', color: '#1d1a17' }}>Contact and contest entries</h1>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href="/" style={{ color: '#1d1a17', textDecoration: 'none', fontWeight: 600 }}>Back home</a>
            <Button variant="festiveOutline" onClick={handleLogout}>Log out</Button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <section style={{ background: '#fffdf9', borderRadius: '18px', padding: '1.25rem', boxShadow: '0 18px 35px rgba(36, 26, 18, 0.06)' }}>
            <h2 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.5rem', color: '#1d1a17' }}>Contact us submissions</h2>
            {contactSubmissions.length === 0 ? (
              <p style={{ margin: 0, color: '#655443' }}>No contact requests yet.</p>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {contactSubmissions.map((entry) => (
                  <article key={entry.id} style={{ border: '1px solid #e9d8c2', borderRadius: '12px', padding: '0.9rem', background: '#fffaf3' }}>
                    <p style={{ margin: '0 0 0.35rem', fontWeight: 700, color: '#1d1a17' }}>{entry.name}</p>
                    <p style={{ margin: '0 0 0.25rem', color: '#3b312c' }}>{entry.email}</p>
                    <p style={{ margin: '0 0 0.25rem', color: '#3b312c' }}>{entry.phone}</p>
                    <p style={{ margin: '0 0 0.25rem', color: '#3b312c' }}><strong>Interest:</strong> {entry.interest}</p>
                    {entry.thought && <p style={{ margin: '0.25rem 0 0', color: '#3b312c' }}><strong>Message:</strong> {entry.thought}</p>}
                    <p style={{ margin: '0.35rem 0 0', fontSize: '0.75rem', color: '#7a4f2b' }}>{new Date(entry.createdAt).toLocaleString()}</p>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section style={{ background: '#fffdf9', borderRadius: '18px', padding: '1.25rem', boxShadow: '0 18px 35px rgba(36, 26, 18, 0.06)' }}>
            <h2 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.5rem', color: '#1d1a17' }}>Photo contest submissions</h2>
            {contestPhotos.length === 0 ? (
              <p style={{ margin: 0, color: '#655443' }}>No contest photos yet.</p>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {contestPhotos.map((entry) => (
                  <article key={entry.id} style={{ border: '1px solid #e9d8c2', borderRadius: '12px', padding: '0.75rem', background: '#fffaf3' }}>
                    <img src={entry.url} alt={entry.caption || 'Contest photo'} style={{ width: '100%', maxHeight: '220px', objectFit: 'cover', borderRadius: '10px', display: 'block', marginBottom: '0.75rem' }} />
                    <p style={{ margin: '0 0 0.25rem', fontWeight: 700, color: '#1d1a17' }}>{entry.handle}</p>
                    <p style={{ margin: '0', color: '#3b312c' }}>{entry.caption}</p>
                    <p style={{ margin: '0.4rem 0 0', fontSize: '0.75rem', color: '#7a4f2b' }}>{new Date(entry.createdAt).toLocaleString()}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
