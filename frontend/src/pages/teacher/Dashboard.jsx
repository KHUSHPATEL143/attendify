import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', padding: '24px' }}>
      <div style={{ fontSize: '4rem' }}>👨‍🏫</div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Teacher Dashboard</h1>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '400px' }}>
        This portal will include attendance marking, test management, student management, and class schedules.
      </p>
      <span style={{ padding: '8px 20px', borderRadius: '50px', background: 'rgba(14, 165, 233, 0.1)', border: '1px solid rgba(14, 165, 233, 0.3)', color: 'var(--secondary)', fontSize: '0.85rem', fontWeight: 500 }}>
        🚧 Coming in Phase 6
      </span>
      <Link to="/" className="btn btn-outline" style={{ marginTop: '12px' }}>
        ← Back to Home
      </Link>
    </div>
  );
}

export default Dashboard;
