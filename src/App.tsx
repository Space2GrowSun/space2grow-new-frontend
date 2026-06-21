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

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/get-involved" element={<GetInvolved />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}
