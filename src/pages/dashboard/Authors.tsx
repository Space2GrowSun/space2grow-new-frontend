import React, { useEffect, useState } from 'react';
import { ExternalLink, Users } from 'lucide-react';
import DashboardTopbar from './components/DashboardTopbar';
import { getDashboardAuthors, type DashboardAuthor } from '../../lib/dashboardApi';

const STUDIO_URL =
  (import.meta.env.VITE_SANITY_STUDIO_URL as string | undefined) ||
  'https://space2grow.sanity.studio';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function Authors() {
  const [authors, setAuthors] = useState<DashboardAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getDashboardAuthors()
      .then(setAuthors)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = search.trim()
    ? authors.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()))
    : authors;

  return (
    <>
      <DashboardTopbar
        searchPlaceholder="Search authors..."
        onSearch={setSearch}
      />

      <div className="ds-page">
        <div className="ds-page-header">
          <div>
            <h1 className="ds-page-title">Authors</h1>
            <p className="ds-page-subtitle">
              Meet the community voices behind A Space to Grow's stories.
            </p>
          </div>
          <a
            href={`${STUDIO_URL}/structure/author`}
            target="_blank"
            rel="noopener noreferrer"
            className="ds-btn ds-btn-secondary"
          >
            <ExternalLink size={14} /> Manage in Studio
          </a>
        </div>

        {loading ? (
          <div className="ds-loading">
            <div style={{ width: 20, height: 20, border: '2px solid var(--ds-border)', borderTopColor: 'var(--ds-green-500)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            Loading authors…
          </div>
        ) : filtered.length === 0 ? (
          <div className="ds-empty">
            <Users size={40} />
            <p>{search ? 'No authors match your search.' : 'No authors found. Add authors in Sanity Studio.'}</p>
            <a href={STUDIO_URL} target="_blank" rel="noopener noreferrer" className="ds-btn ds-btn-secondary">
              <ExternalLink size={14} /> Open Studio
            </a>
          </div>
        ) : (
          <div className="ds-card-grid">
            {filtered.map((author) => (
              <div key={author._id} className="ds-person-card">
                {/* Avatar */}
                <div className="ds-person-avatar">
                  {author.imageUrl ? (
                    <img
                      src={author.imageUrl}
                      alt={author.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                    />
                  ) : (
                    getInitials(author.name)
                  )}
                </div>

                <div className="ds-person-name">{author.name}</div>
                {author.role && <div className="ds-person-role">{author.role}</div>}
                {author.bio && <div className="ds-person-bio">{author.bio}</div>}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                  <span className="ds-person-post-count">
                    {author.postCount} {author.postCount === 1 ? 'post' : 'posts'}
                  </span>
                  <a
                    href={`${STUDIO_URL}/structure/author`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ds-btn ds-btn-ghost"
                    style={{ fontSize: 12, padding: '4px 10px' }}
                  >
                    Edit in Studio <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
