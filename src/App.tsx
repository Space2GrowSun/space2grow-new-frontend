import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import GetInvolved from './pages/GetInvolved';
import Dashboard from './pages/dashboard/Dashboard';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* ── Creator dashboard — no site nav/footer ── */}
          <Route path="/dashboard/*" element={<Dashboard />} />

          {/* ── Public site ─────────────────────────── */}
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/get-involved" element={<GetInvolved />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
