import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import AdminDashboard from './pages/admin/Dashboard.jsx';
import TeacherDashboard from './pages/teacher/Dashboard.jsx';
import StudentDashboard from './pages/student/Dashboard.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      {/* Teacher Routes */}
      <Route path="/teacher/dashboard" element={<TeacherDashboard />} />

      {/* Student Routes */}
      <Route path="/student/dashboard" element={<StudentDashboard />} />

      {/* 404 Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
