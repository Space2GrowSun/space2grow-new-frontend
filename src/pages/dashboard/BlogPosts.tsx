import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, Image as ImageIcon, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import DashboardTopbar from './components/DashboardTopbar';
import StatusBadge from './components/StatusBadge';
import { getDashboardPosts, getDashboardCategories, getDashboardAuthors, deletePost, type DashboardPost, type DashboardCategory, type DashboardAuthor } from '../../lib/dashboardApi';

const PAGE_SIZE = 10;
type StatusFilter = 'all' | 'draft' | 'review' | 'scheduled' | 'published';

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'yesterday';
  return `${days}d ago`;
}

export default function BlogPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<DashboardPost[]>([]);
  const [categories, setCategories] = useState<DashboardCategory[]>([]);
  const [authors, setAuthors] = useState<DashboardAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [authorFilter, setAuthorFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [p, c, a] = await Promise.all([
          getDashboardPosts(),
          getDashboardCategories(),
          getDashboardAuthors(),
        ]);
        setPosts(p);
        setCategories(c);
        setAuthors(a);
      } catch (e: any) {
        console.error('[BlogPosts]', e);
        setFetchError(e?.message || 'Failed to load posts from Sanity.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    let result = posts;
    if (statusFilter !== 'all') result = result.filter((p) => p.status === statusFilter);
    if (categoryFilter !== 'all') result = result.filter((p) => p.categoryTitle === categoryFilter);
    if (authorFilter !== 'all') result = result.filter((p) => p.authorName === authorFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          (p.title || '').toLowerCase().includes(q) ||
          (p.excerpt || '').toLowerCase().includes(q),
      );
    }
    return result;
  }, [posts, statusFilter, categoryFilter, authorFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleBulkDelete = async () => {
    if (!selected.size) return;
    if (!confirm(`Delete ${selected.size} selected post(s) permanently?`)) return;
    
    const idsToDelete = Array.from(selected);
    try {
      await Promise.all(idsToDelete.map((id) => deletePost(id)));
      setPosts((prev) => prev.filter((p) => !selected.has(p._id)));
      setSelected(new Set());
    } catch (e) {
      console.error(e);
      alert('Failed to delete selected posts.');
    }
  };

  const handleClearFilters = () => {
    setStatusFilter('all');
    setCategoryFilter('all');
    setAuthorFilter('all');
    setSearch('');
    setPage(1);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post permanently?')) return;
    setDeleting(id);
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (e) {
      console.error(e);
      alert('Failed to delete post.');
    } finally {
      setDeleting(null);
    }
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const STATUS_TABS: { key: StatusFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'draft', label: 'Draft' },
    { key: 'review', label: 'Ready for review' },
    { key: 'scheduled', label: 'Scheduled' },
    { key: 'published', label: 'Published' },
  ];

  return (
    <>
      <DashboardTopbar
        searchPlaceholder="Search posts..."
        onSearch={(q) => { setSearch(q); setPage(1); }}
      />

      <div className="ds-page">
        {/* Header */}
        <div className="ds-page-header">
          <div>
            <h1 className="ds-page-title">Blog Posts</h1>
            <p className="ds-page-subtitle">
              Manage your community's stories, insights, and updates. Use this space to curate growth and nurture conversation.
            </p>
          </div>
          <button
            className="ds-btn ds-btn-primary"
            onClick={() => navigate('/dashboard/posts/new')}
          >
            <Plus size={15} />
            Create New Post
          </button>
        </div>

        {/* Filter bar */}
        <div className="ds-filter-bar">
          <div className="ds-filter-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="ds-filter-label">Status</span>
              <div className="ds-filter-tabs">
                {STATUS_TABS.map((t) => (
                  <button
                    key={t.key}
                    className={`ds-filter-tab${statusFilter === t.key ? ' active' : ''}`}
                    onClick={() => { setStatusFilter(t.key); setPage(1); }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
              <div>
                <span className="ds-filter-label" style={{ display: 'block', marginBottom: 4 }}>Category</span>
                <select
                  className="ds-filter-select"
                  value={categoryFilter}
                  onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <span className="ds-filter-label" style={{ display: 'block', marginBottom: 4 }}>Author</span>
                <select
                  className="ds-filter-select"
                  value={authorFilter}
                  onChange={(e) => { setAuthorFilter(e.target.value); setPage(1); }}
                >
                  <option value="all">All Authors</option>
                  {authors.map((a) => (
                    <option key={a._id} value={a.name}>{a.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {(statusFilter !== 'all' || categoryFilter !== 'all' || authorFilter !== 'all') && (
            <div className="ds-filter-divider">
              <button className="ds-clear-filters" onClick={handleClearFilters}>
                <RotateCcw size={12} /> Clear Filters
              </button>
            </div>
          )}
        </div>

        {fetchError && (
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#991b1b', padding: '12px 16px', borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
            ⚠️ <strong>Error loading posts:</strong> {fetchError}
          </div>
        )}

        {/* Bulk Actions Banner */}
        {selected.size > 0 && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: 8,
            padding: '10px 16px',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#991b1b' }}>
              <strong>{selected.size}</strong> post(s) selected
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button 
                className="ds-btn" 
                style={{ fontSize: 12, padding: '4px 10px' }}
                onClick={() => setSelected(new Set())}
              >
                Deselect All
              </button>
              <button 
                className="ds-btn ds-btn-danger" 
                style={{ fontSize: 12, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 6 }}
                onClick={handleBulkDelete}
              >
                <Trash2 size={13} /> Delete Selected
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="ds-table-wrap">
          {loading ? (
            <div className="ds-loading" style={{ padding: '40px' }}>Loading posts…</div>
          ) : paginated.length === 0 ? (
            <div className="ds-empty" style={{ padding: '48px' }}>
              <ImageIcon size={40} />
              <p>{search ? 'No posts match your search.' : 'No posts yet. Create your first article!'}</p>
              <button
                className="ds-btn ds-btn-primary"
                onClick={() => navigate('/dashboard/posts/new')}
              >
                <Plus size={14} /> Create New Post
              </button>
            </div>
          ) : (
            <table className="ds-table">
              <thead>
                <tr>
                  <th style={{ width: 40 }}>
                    <input
                      type="checkbox"
                      className="ds-table-checkbox"
                      onChange={(e) => {
                        if (e.target.checked) setSelected(new Set(paginated.map((p) => p._id)));
                        else setSelected(new Set());
                      }}
                      checked={paginated.length > 0 && paginated.every((p) => selected.has(p._id))}
                    />
                  </th>
                  <th>POST</th>
                  <th>CATEGORY</th>
                  <th>AUTHOR</th>
                  <th>STATUS</th>
                  <th>LAST UPDATED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((post) => (
                  <tr key={post._id}>
                    <td>
                      <input
                        type="checkbox"
                        className="ds-table-checkbox"
                        checked={selected.has(post._id)}
                        onChange={() => toggleSelect(post._id)}
                      />
                    </td>

                    {/* Post cell */}
                    <td>
                      <div className="ds-post-cell">
                        {post.featuredImageUrl ? (
                          <img
                            src={post.featuredImageUrl}
                            alt={post.title}
                            className="ds-post-thumbnail"
                          />
                        ) : (
                          <div className="ds-post-thumbnail-placeholder">
                            <ImageIcon size={18} />
                          </div>
                        )}
                        <div className="ds-post-cell-info">
                          <div className="ds-post-cell-title">{post.title || 'Untitled'}</div>
                          <div className="ds-post-cell-excerpt">{post.excerpt || '—'}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td>
                      {post.categoryTitle ? (
                        <span className="ds-cat-badge">{post.categoryTitle}</span>
                      ) : (
                        <span style={{ color: 'var(--ds-muted)', fontSize: 12 }}>—</span>
                      )}
                    </td>

                    {/* Author */}
                    <td>
                      <div className="ds-author-cell">
                        <div className="ds-author-avatar">
                          {post.authorImage ? (
                            <img src={post.authorImage} alt={post.authorName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            (post.authorName || 'A').charAt(0).toUpperCase()
                          )}
                        </div>
                        <span>{post.authorName || '—'}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td>
                      <StatusBadge status={post.status} />
                    </td>

                    {/* Last updated */}
                    <td>
                      <span className="ds-date-cell">{relativeTime(post._updatedAt)}</span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="ds-actions-cell">
                        <button
                          className="ds-action-btn"
                          title="Edit post"
                          onClick={() => navigate(`/dashboard/posts/${post._id}`)}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          className="ds-action-btn danger"
                          title="Delete post"
                          disabled={deleting === post._id}
                          onClick={() => handleDelete(post._id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pagination */}
          {!loading && filtered.length > 0 && (
            <div className="ds-pagination">
              <span className="ds-pagination-info">
                Showing {(page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, filtered.length)} of{' '}
                {filtered.length} posts
              </span>
              <div className="ds-pagination-pages">
                <button
                  className="ds-page-btn"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={14} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
                  .map((n) => (
                    <button
                      key={n}
                      className={`ds-page-btn${page === n ? ' active' : ''}`}
                      onClick={() => setPage(n)}
                    >
                      {n}
                    </button>
                  ))}
                <button
                  className="ds-page-btn"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
