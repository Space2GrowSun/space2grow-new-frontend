import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  FileText,
  Users,
  Tag,
  Image,
  Plus,
  LogOut,
  ExternalLink,
} from 'lucide-react';

// Deployed Sanity Studio URL — swap this to your hosted studio domain.
// For local dev on port 3333 use: 'http://localhost:3333'
const STUDIO_URL =
  (import.meta.env.VITE_SANITY_STUDIO_URL as string | undefined) ||
  'https://space2grow.sanity.studio';

interface DashboardSidebarProps {
  onSignOut: () => void;
}

export default function DashboardSidebar({ onSignOut }: DashboardSidebarProps) {
  const navigate = useNavigate();

  const navItems = [
    { to: '/dashboard', label: 'Home', icon: Home, end: true },
    { to: '/dashboard/posts', label: 'Blog Posts', icon: FileText },
    { to: '/dashboard/authors', label: 'Authors', icon: Users },
    { to: '/dashboard/categories', label: 'Categories', icon: Tag },
    { to: '/dashboard/media', label: 'Media Library', icon: Image },
  ];

  return (
    <aside className="ds-sidebar">
      {/* Brand */}
      <div className="ds-sidebar-brand">
        <div className="ds-sidebar-brand-name">A Space to Grow</div>
        <div className="ds-sidebar-brand-role">Community Manager</div>
      </div>

      {/* Navigation */}
      <nav className="ds-sidebar-nav">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `ds-nav-item${isActive ? ' active' : ''}`}
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="ds-sidebar-bottom">
        <button
          className="ds-create-btn"
          onClick={() => navigate('/dashboard/posts/new')}
        >
          <Plus size={15} />
          Create New Post
        </button>

        <button className="ds-sidebar-utility-btn ds-signout-btn" onClick={onSignOut}>
          <LogOut size={14} />
          Sign Out
        </button>
      </div>

      {/* Decorative circle */}
      <div className="ds-sidebar-decor" />
    </aside>
  );
}
