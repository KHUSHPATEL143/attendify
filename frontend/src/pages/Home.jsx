import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      {/* Animated background orbs */}
      <div className="bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Navbar */}
      <nav className="navbar glass">
        <div className="container navbar-inner">
          <div className="logo">
            <span className="logo-icon">📚</span>
            <span className="logo-text">Attendify</span>
          </div>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#portals" className="nav-link">Portals</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-badge animate-fadeInUp">
            <span className="badge-dot"></span>
            School Management System
          </div>
          <h1 className="hero-title animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            Manage Your School
            <span className="gradient-text"> Effortlessly</span>
          </h1>
          <p className="hero-subtitle animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            A complete platform for managing attendance, classes, tests, and academic records
            through Admin, Teacher, and Student portals.
          </p>
          <div className="hero-actions animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <Link to="/admin/login" className="btn btn-primary">
              🔐 Admin Login
            </Link>
            <Link to="/teacher/login" className="btn btn-outline">
              👨‍🏫 Teacher Login
            </Link>
            <Link to="/student/login" className="btn btn-outline">
              🎓 Student Login
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container stats-grid">
          {[
            { number: '3', label: 'Role-Based Portals', icon: '🛡️' },
            { number: '11', label: 'Database Collections', icon: '🗄️' },
            { number: '24/7', label: 'Access Anywhere', icon: '🌐' },
            { number: '100%', label: 'Attendance Tracking', icon: '✅' },
          ].map((stat, i) => (
            <div className="stat-card card animate-fadeInUp" key={i} style={{ animationDelay: `${0.1 * i}s` }}>
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <h2 className="section-title">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="section-subtitle">Everything you need to manage your school effectively</p>
          <div className="features-grid">
            {[
              { icon: '📋', title: 'Attendance Tracking', desc: 'Mark present, absent, or late with time-window constraints and substitute support.' },
              { icon: '📝', title: 'Test Management', desc: 'Create tests, enter marks, and auto-calculate grades from A+ to F.' },
              { icon: '📅', title: 'Timetable System', desc: 'Create weekly timetables, assign subjects, and copy between classes.' },
              { icon: '🔔', title: 'Parent Notifications', desc: 'Automatic SMS/WhatsApp alerts when students are marked absent.' },
              { icon: '📊', title: 'Reports & Analytics', desc: 'Monthly attendance reports, individual history, and test performance.' },
              { icon: '🗓️', title: 'Holiday Calendar', desc: 'Manage school holidays with a visual color-coded calendar.' },
            ].map((feature, i) => (
              <div className="feature-card card animate-fadeInUp" key={i} style={{ animationDelay: `${0.1 * i}s` }}>
                <span className="feature-icon">{feature.icon}</span>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portals Section */}
      <section className="portals" id="portals">
        <div className="container">
          <h2 className="section-title">
            Choose Your <span className="gradient-text">Portal</span>
          </h2>
          <p className="section-subtitle">Each role has secure authentication and permission-based access</p>
          <div className="portals-grid">
            <Link to="/admin/login" className="portal-card card">
              <div className="portal-icon-wrap admin-bg">🔐</div>
              <h3 className="portal-title">Admin Portal</h3>
              <p className="portal-desc">Full system control — manage teachers, students, classes, timetables, holidays, and generate reports.</p>
              <span className="portal-link">Login with Email & Password →</span>
            </Link>
            <Link to="/teacher/login" className="portal-card card">
              <div className="portal-icon-wrap teacher-bg">👨‍🏫</div>
              <h3 className="portal-title">Teacher Portal</h3>
              <p className="portal-desc">Mark attendance, create tests, manage students, and view class schedules.</p>
              <span className="portal-link">Login with Email & Password →</span>
            </Link>
            <Link to="/student/login" className="portal-card card">
              <div className="portal-icon-wrap student-bg">🎓</div>
              <h3 className="portal-title">Student Portal</h3>
              <p className="portal-desc">View attendance calendar, test results, timetable, and personal profile.</p>
              <span className="portal-link">Login with GR Number & DOB →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <span className="logo-icon">📚</span>
            <span className="logo-text">Attendify</span>
          </div>
          <p className="footer-text">Built by <strong>Khush Patel</strong> — MERN Stack School Management System</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
