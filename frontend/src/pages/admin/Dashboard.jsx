import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', padding: '24px' }}>
      <div style={{ fontSize: '4rem' }}>🔐</div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Admin Dashboard</h1>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '400px' }}>
        This portal will include teacher management, student management, class management, timetables, holidays, and reports.
      </p>
      <span style={{ padding: '8px 20px', borderRadius: '50px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', color: 'var(--primary-light)', fontSize: '0.85rem', fontWeight: 500 }}>
        🚧 Coming in Phase 4
      </span>
      <Link to="/" className="btn btn-outline" style={{ marginTop: '12px' }}>
        ← Back to Home
      </Link>
    </div>
  );
}

export default Dashboard;
