import React, { useEffect, useState } from 'react';
import { ExternalLink, Tag } from 'lucide-react';
import DashboardTopbar from './components/DashboardTopbar';
import { getDashboardCategories, type DashboardCategory } from '../../lib/dashboardApi';

const STUDIO_URL =
  (import.meta.env.VITE_SANITY_STUDIO_URL as string | undefined) ||
  'https://space2grow.sanity.studio';

const PALETTE = [
  { bg: '#d8f3dc', text: '#1b4332' },
  { bg: '#fce7f3', text: '#9d174d' },
  { bg: '#dbeafe', text: '#1e40af' },
  { bg: '#fef3c7', text: '#92400e' },
  { bg: '#ede9fe', text: '#5b21b6' },
  { bg: '#fce7f3', text: '#831843' },
];

export default function Categories() {
  const [categories, setCategories] = useState<DashboardCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getDashboardCategories()
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = search.trim()
    ? categories.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
    : categories;

  return (
    <>
      <DashboardTopbar
        searchPlaceholder="Search categories..."
        onSearch={setSearch}
      />

      <div className="ds-page">
        <div className="ds-page-header">
          <div>
            <h1 className="ds-page-title">Categories</h1>
            <p className="ds-page-subtitle">
              Organise your content into themes that resonate with the community.
            </p>
          </div>
          <a
            href={`${STUDIO_URL}/structure/category`}
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
            Loading categories…
          </div>
        ) : filtered.length === 0 ? (
          <div className="ds-empty">
            <Tag size={40} />
            <p>{search ? 'No categories match your search.' : 'No categories found. Add them in Sanity Studio.'}</p>
            <a href={STUDIO_URL} target="_blank" rel="noopener noreferrer" className="ds-btn ds-btn-secondary">
              <ExternalLink size={14} /> Open Studio
            </a>
          </div>
        ) : (
          <div className="ds-card-grid">
            {filtered.map((cat, i) => {
              const palette = PALETTE[i % PALETTE.length];
              return (
                <div key={cat._id} className="ds-person-card" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {/* Color swatch header */}
                  <div
                    style={{
                      height: 8,
                      borderRadius: '10px 10px 0 0',
                      background: palette.bg,
                      margin: '-24px -24px 16px',
                      width: 'calc(100% + 48px)',
                    }}
                  />

                  {/* Badge */}
                  <div style={{ marginBottom: 10 }}>
                    <span
                      style={{
                        background: palette.bg,
                        color: palette.text,
                        padding: '4px 12px',
                        borderRadius: 20,
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      {cat.title}
                    </span>
                  </div>

                  {cat.description && (
                    <p style={{ fontSize: 13, color: 'var(--ds-text-secondary)', lineHeight: 1.5, marginBottom: 14, flex: 1 }}>
                      {cat.description}
                    </p>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span className="ds-person-post-count">
                      {cat.postCount} {cat.postCount === 1 ? 'post' : 'posts'}
                    </span>
                    <a
                      href={`${STUDIO_URL}/structure/category`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ds-btn ds-btn-ghost"
                      style={{ fontSize: 12, padding: '4px 10px' }}
                    >
                      Edit in Studio <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
