import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, ExternalLink, TrendingUp, BookOpen, Users, Tag } from 'lucide-react';
import DashboardTopbar from './components/DashboardTopbar';
import StatusBadge from './components/StatusBadge';
import { getDashboardStats, getRecentActivity, type DashboardPost, type DashboardStats } from '../../lib/dashboardApi';

const STUDIO_URL =
  (import.meta.env.VITE_SANITY_STUDIO_URL as string | undefined) ||
  'https://space2grow.sanity.studio';

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function DashboardHome() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recent, setRecent] = useState<DashboardPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [s, r] = await Promise.all([getDashboardStats(), getRecentActivity(5)]);
        setStats(s);
        setRecent(r);
      } catch (e) {
        console.error('[DashboardHome]', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const statCards = stats
    ? [
        { label: 'Total Posts', value: stats.total, icon: BookOpen, color: '#40916c' },
        { label: 'Published', value: stats.published, icon: TrendingUp, color: '#52b788' },
        { label: 'Drafts', value: stats.drafts, icon: FileText, color: '#ca8a04' },
        { label: 'Scheduled', value: stats.scheduled, icon: Tag, color: '#3b82f6' },
      ]
    : [];

  return (
    <>
      <DashboardTopbar searchPlaceholder="Search posts..." />

      <div className="ds-page">
        {/* Page header */}
        <div className="ds-page-header">
          <div>
            <h1 className="ds-page-title">Dashboard</h1>
            <p className="ds-page-subtitle">
              Welcome back! Here's an overview of your community's content.
            </p>
          </div>
        </div>

        {/* Stats cards */}
        {loading ? (
          <div className="ds-loading">
            <div
              style={{
                width: 20,
                height: 20,
                border: '2px solid var(--ds-border)',
                borderTopColor: 'var(--ds-green-500)',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            Loading stats…
          </div>
        ) : (
          <div className="ds-stats-grid">
            {statCards.map((s) => (
              <div key={s.label} className="ds-stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className="ds-stat-label">{s.label}</span>
                  <span
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: `${s.color}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: s.color,
                      flexShrink: 0,
                    }}
                  >
                    <s.icon size={16} />
                  </span>
                </div>
                <div className="ds-stat-value">{s.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Quick actions */}
        <div className="ds-quick-actions">
          <button
            className="ds-btn ds-btn-primary"
            onClick={() => navigate('/dashboard/posts/new')}
          >
            <Plus size={15} />
            Create New Post
          </button>
          <button
            className="ds-btn ds-btn-secondary"
            onClick={() => navigate('/dashboard/posts')}
          >
            <FileText size={15} />
            View All Posts
          </button>

        </div>

        {/* Recent activity */}
        <div className="ds-recent-list">
          <div className="ds-recent-list-header">Recent Activity</div>
          {loading && (
            <div className="ds-loading" style={{ padding: '24px' }}>
              Loading…
            </div>
          )}
          {!loading && recent.length === 0 && (
            <div className="ds-empty" style={{ padding: '32px' }}>
              <FileText size={32} />
              <p>No posts yet. Create your first article!</p>
            </div>
          )}
          {recent.map((post) => (
            <div
              key={post._id}
              className="ds-recent-item"
              onClick={() => navigate(`/dashboard/posts/${post._id}`)}
            >
              <div className="ds-recent-icon">
                <FileText size={16} />
              </div>
              <div className="ds-recent-info">
                <div className="ds-recent-title">{post.title || 'Untitled'}</div>
                <div className="ds-recent-meta">
                  Updated {relativeTime(post._updatedAt)}
                  {post.authorName ? ` · ${post.authorName}` : ''}
                </div>
              </div>
              <StatusBadge status={post.status} />
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
