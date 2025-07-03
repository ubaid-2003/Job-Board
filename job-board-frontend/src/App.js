import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Companies from './pages/Companies';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Authentication/Login';
import SignUp from './pages/Authentication/SignUp';
import JobDetail from './pages/JobDetail';
import EmployerRegistration from './pages/EmployerRegistration';
import JobApplicationForm from './pages/JobApplicationForm';
import { JobProvider } from './context/JobContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <Router>
          <Routes>
            {/* Public route: Dashboard */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
            </Route>

            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected routes inside Layout */}
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="jobs" element={<Jobs />} />
              <Route path="jobs/:id" element={<JobDetail />} />
              <Route path="apply/:id" element={<JobApplicationForm />} />
              <Route path="companies" element={<Companies />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
              <Route path="employer-register" element={<EmployerRegistration />} />
            </Route>

            {/* 404 fallback */}
            <Route path="*" element={<div className="p-6">404 Not Found</div>} />
          </Routes>
        </Router>
      </JobProvider>
    </AuthProvider>
  );
}

export default App;
