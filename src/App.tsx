import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';

// Layout
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Careers = lazy(() => import('./pages/Careers'));
const ApplicationDashboard = lazy(() => import('./pages/ApplicationDashboard'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Team = lazy(() => import('./pages/Team'));

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:projectId" element={<ProjectDetail />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/application-dashboard" element={<ApplicationDashboard />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:postId" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/team" element={<Team />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;