import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', padding: '24px', textAlign: 'center' }}>
      <div style={{ fontSize: '5rem' }}>🔍</div>
      <h1 style={{ fontSize: '6rem', fontWeight: 900, background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>404</h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '400px' }}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: '12px' }}>
        ← Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
