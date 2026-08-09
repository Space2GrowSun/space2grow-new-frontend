import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './dashboard-v2.css';

import DashboardSidebar from './components/DashboardSidebar';
import DashboardHome from './DashboardHome';
import BlogPosts from './BlogPosts';
import PostEditorPage from './PostEditor';
import Authors from './Authors';
import Categories from './Categories';
import MediaLibrary from './MediaLibrary';
import Login from './Login';

import { isDashboardConfigured } from '../../lib/sanityWriteClient';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';

// ── Config Error ──────────────────────────────────────────────────────────────

function ConfigError() {
  return (
    <div className="ds-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="ds-config-error">
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ds-green-900)', marginBottom: 8 }}>
          Dashboard Not Configured
        </h2>
        <p style={{ fontSize: 14, color: 'var(--ds-muted)', marginBottom: 16 }}>
          Add the following to your <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>.env</code> file,
          then restart the dev server:
        </p>
        <pre style={{ background: '#f8fdf9', border: '1px solid var(--ds-border)', padding: '16px 20px', borderRadius: 8, textAlign: 'left', fontSize: 13, fontFamily: 'monospace', overflowX: 'auto' }}>
{`VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_WRITE_TOKEN=your_editor_token
VITE_FIREBASE_API_KEY=...
`}
        </pre>
      </div>
    </div>
  );
}

// ── Dashboard Shell ───────────────────────────────────────────────────────────

function DashboardShell({ onSignOut }: { onSignOut: () => void }) {
  return (
    <div className="ds-root">
      <div className="ds-shell">
        {/* Sidebar */}
        <DashboardSidebar onSignOut={onSignOut} />

        {/* Main content with nested routes */}
        <main className="ds-main">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="posts" element={<BlogPosts />} />
            <Route path="posts/new" element={<PostEditorPage />} />
            <Route path="posts/:id" element={<PostEditorPage />} />
            <Route path="authors" element={<Authors />} />
            <Route path="categories" element={<Categories />} />
            <Route path="media" element={<MediaLibrary />} />
            {/* Catch-all → home */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function DashboardContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="ds-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>Loading...</div>;
  }

  const handleSignOut = () => {
    signOut(auth);
  };

  if (!user) {
    return (
      <div className="ds-root ds-auth-root">
         <Login />
      </div>
    );
  }

  return <DashboardShell onSignOut={handleSignOut} />;
}

// ── Main Export ───────────────────────────────────────────────────────────────

export default function Dashboard() {
  if (!isDashboardConfigured) return <ConfigError />;
  
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
}
