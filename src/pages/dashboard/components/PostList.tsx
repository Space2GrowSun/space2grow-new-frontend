import React, { useState, useRef } from 'react';
import { FileText, Plus } from 'lucide-react';

export interface PostSummary {
  _id: string;
  title: string;
  slug?: { current: string };
  publishedAt?: string;
  _updatedAt: string;
  isDraft: boolean;
}

interface PostListProps {
  posts: PostSummary[];
  activeId: string | null;
  loading: boolean;
  onSelect: (post: PostSummary) => void;
  onNew: () => void;
}

export default function PostList({ posts, activeId, loading, onSelect, onNew }: PostListProps) {
  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = posts.filter((p) =>
    (p.title || 'Untitled').toLowerCase().includes(search.toLowerCase()),
  );

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  return (
    <>
      <div className="db-sidebar-header">
        <div className="db-brand">
          <span className="db-brand-dot" />
          space2grow
        </div>
        <button className="db-new-btn" onClick={onNew}>
          <Plus size={14} /> New post
        </button>
        {posts.length > 5 && (
          <input
            ref={searchRef}
            style={{
              marginTop: 10,
              width: '100%',
              border: '1px solid #e0e0e0',
              borderRadius: 6,
              padding: '6px 10px',
              fontSize: 13,
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
            placeholder="Search posts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
      </div>

      <div className="db-post-list">
        {loading && (
          <div style={{ padding: '20px', color: '#888', fontSize: 13 }}>
            Loading posts…
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ padding: '20px', color: '#aaa', fontSize: 13, textAlign: 'center' }}>
            {search ? 'No matches' : 'No posts yet'}
          </div>
        )}

        {filtered.map((post) => (
          <div
            key={post._id}
            className={`db-post-item${post._id === activeId ? ' active' : ''}`}
            onClick={() => onSelect(post)}
          >
            <div className="db-post-item-title">{post.title || 'Untitled'}</div>
            <div className="db-post-item-meta">
              <span
                className={`db-status-dot ${post.isDraft ? 'draft' : 'published'}`}
                title={post.isDraft ? 'Draft' : 'Published'}
              />
              <span>{post.isDraft ? 'Draft' : 'Published'}</span>
              <span>·</span>
              <span>{fmt(post._updatedAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
