import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

// Auth Pages
import AdminLogin from './pages/admin/Login.jsx';
import TeacherLogin from './pages/teacher/Login.jsx';
import StudentLogin from './pages/student/Login.jsx';

// Dashboards (Protected)
import AdminDashboard from './pages/admin/Dashboard.jsx';
import TeacherDashboard from './pages/teacher/Dashboard.jsx';
import StudentDashboard from './pages/student/Dashboard.jsx';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/teacher/login" element={<TeacherLogin />} />
      <Route path="/student/login" element={<StudentLogin />} />

      {/* Admin Routes (Protected) */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      {/* Teacher Routes (Protected) */}
      <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
      </Route>

      {/* Student Routes (Protected) */}
      <Route element={<ProtectedRoute allowedRoles={['student']} />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Route>

      {/* 404 Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
