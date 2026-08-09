import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Image as ImageIcon, Upload, AlertTriangle, Filter, Clock, X, Copy, Check, ExternalLink } from 'lucide-react';
import DashboardTopbar from './components/DashboardTopbar';
import { getDashboardAssets, uploadAsset, type DashboardAsset } from '../../lib/dashboardApi';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatDimensions(asset: DashboardAsset): string {
  const d = asset.metadata?.dimensions;
  if (!d) return '';
  return `${d.width} × ${d.height}`;
}

export default function MediaLibrary() {
  const [assets, setAssets] = useState<DashboardAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [search, setSearch] = useState('');
  
  // Filter & Sort State
  const [filterMode, setFilterMode] = useState<'all' | 'no-alt'>('all');
  const [sortMode, setSortMode] = useState<'newest' | 'oldest' | 'name' | 'size'>('newest');
  const [selectedAsset, setSelectedAsset] = useState<DashboardAsset | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const fetchAssets = async () => {
    try {
      const data = await getDashboardAssets();
      setAssets(data);
    } catch (e) {
      console.error('[MediaLibrary]', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAssets(); }, []);

  const handleFiles = async (files: FileList) => {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (!imageFiles.length) return;

    setUploading(true);
    try {
      const uploaded = await Promise.all(imageFiles.map((f) => uploadAsset(f)));
      setAssets((prev) => [...uploaded, ...prev]);
      showToast(`Successfully uploaded ${imageFiles.length} asset(s)`);
    } catch (e) {
      console.error('[MediaLibrary] upload failed', e);
      alert('Upload failed. Check console for details.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  };

  const hasNoAlt = (asset: DashboardAsset) => !asset.metadata?.altText;

  const processedAssets = useMemo(() => {
    let result = [...assets];

    // Filter
    if (filterMode === 'no-alt') {
      result = result.filter(hasNoAlt);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((a) => (a.originalFilename || '').toLowerCase().includes(q));
    }

    // Sort
    result.sort((a, b) => {
      if (sortMode === 'newest') return new Date(b._updatedAt).getTime() - new Date(a._updatedAt).getTime();
      if (sortMode === 'oldest') return new Date(a._updatedAt).getTime() - new Date(b._updatedAt).getTime();
      if (sortMode === 'name') return (a.originalFilename || '').localeCompare(b.originalFilename || '');
      if (sortMode === 'size') return (b.size || 0) - (a.size || 0);
      return 0;
    });

    return result;
  }, [assets, search, filterMode, sortMode]);

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    showToast('Copied image URL to clipboard!');
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <>
      <DashboardTopbar
        searchPlaceholder="Search your media library..."
        onSearch={setSearch}
      />

      <div className="ds-page">
        <div className="ds-page-header">
          <div>
            <h1 className="ds-page-title">Media Library</h1>
            <p className="ds-page-subtitle">
              Manage your images, videos, and assets in one botanical workspace.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {/* Filter select */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid var(--ds-border)', borderRadius: 6, padding: '4px 10px', fontSize: 13 }}>
              <Filter size={14} style={{ color: 'var(--ds-muted)' }} />
              <select 
                value={filterMode} 
                onChange={(e) => setFilterMode(e.target.value as any)}
                style={{ border: 'none', background: 'transparent', outline: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--ds-text)' }}
              >
                <option value="all">All Assets</option>
                <option value="no-alt">Missing Alt Text</option>
              </select>
            </div>

            {/* Sort select */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid var(--ds-border)', borderRadius: 6, padding: '4px 10px', fontSize: 13 }}>
              <Clock size={14} style={{ color: 'var(--ds-muted)' }} />
              <select 
                value={sortMode} 
                onChange={(e) => setSortMode(e.target.value as any)}
                style={{ border: 'none', background: 'transparent', outline: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--ds-text)' }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name (A-Z)</option>
                <option value="size">Size (Largest)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Upload Zone */}
        <label
          className={`ds-media-upload-zone${dragOver ? ' drag-over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
          <div className="ds-media-upload-icon">
            {uploading ? (
              <div style={{ width: 24, height: 24, border: '2px solid var(--ds-green-200)', borderTopColor: 'var(--ds-green-500)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            ) : (
              <Upload size={24} />
            )}
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ds-text)', marginBottom: 4 }}>
            {uploading ? 'Uploading…' : 'Upload New Assets'}
          </div>
          <div style={{ fontSize: 13, color: 'var(--ds-muted)' }}>
            Drag and drop images here, or browse your computer
          </div>
        </label>

        {/* Asset Grid */}
        {loading ? (
          <div className="ds-loading">
            <div style={{ width: 20, height: 20, border: '2px solid var(--ds-border)', borderTopColor: 'var(--ds-green-500)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            Loading assets…
          </div>
        ) : processedAssets.length === 0 ? (
          <div className="ds-empty">
            <ImageIcon size={40} />
            <p>{search || filterMode !== 'all' ? 'No assets match your search/filter.' : 'No assets uploaded yet. Drop images above to get started!'}</p>
          </div>
        ) : (
          <div className="ds-media-grid">
            {processedAssets.map((asset) => (
              <div 
                key={asset._id} 
                className="ds-media-card"
                onClick={() => setSelectedAsset(asset)}
                style={{ cursor: 'pointer' }}
              >
                <div className="ds-media-card-img-wrap">
                  {asset.url ? (
                    <img
                      src={`${asset.url}?w=400&h=300&fit=crop&auto=format`}
                      alt={asset.originalFilename}
                      className="ds-media-card-img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="ds-media-card-img-placeholder">
                      <ImageIcon size={32} />
                    </div>
                  )}

                  {/* No alt text badge */}
                  {hasNoAlt(asset) && (
                    <div className="ds-no-alt-badge">
                      <AlertTriangle size={9} />
                      NO ALT TEXT
                    </div>
                  )}
                </div>

                <div className="ds-media-card-info">
                  <div className="ds-media-card-filename" title={asset.originalFilename}>
                    {asset.originalFilename}
                  </div>
                  <div className="ds-media-card-meta">
                    {formatBytes(asset.size)}
                    {formatDimensions(asset) && ` · ${formatDimensions(asset)}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Asset Detail Modal */}
      {selectedAsset && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: 20
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 14,
            width: '100%',
            maxWidth: 680,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            overflow: 'hidden',
            border: '1px solid var(--ds-border)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--ds-border)', background: '#fafafa' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <ImageIcon size={18} style={{ color: 'var(--ds-green-700)' }} />
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--ds-text)' }}>Asset Details</h3>
              </div>
              <button 
                onClick={() => setSelectedAsset(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ds-muted)', padding: 4 }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, padding: 20 }}>
              {/* Image Preview */}
              <div style={{ borderRadius: 10, overflow: 'hidden', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', maxHeight: 280, border: '1px solid var(--ds-border)' }}>
                <img 
                  src={selectedAsset.url} 
                  alt={selectedAsset.originalFilename} 
                  style={{ maxWidth: '100%', maxHeight: 280, objectFit: 'contain' }}
                />
              </div>

              {/* Info & Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--ds-muted)', textTransform: 'uppercase' }}>File Name</label>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ds-text)', wordBreak: 'break-all' }}>{selectedAsset.originalFilename}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--ds-muted)', textTransform: 'uppercase' }}>File Size</label>
                    <div style={{ fontSize: 13, color: 'var(--ds-text)' }}>{formatBytes(selectedAsset.size)}</div>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--ds-muted)', textTransform: 'uppercase' }}>Dimensions</label>
                    <div style={{ fontSize: 13, color: 'var(--ds-text)' }}>{formatDimensions(selectedAsset) || 'N/A'}</div>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--ds-muted)', textTransform: 'uppercase' }}>MIME Type</label>
                  <div style={{ fontSize: 13, color: 'var(--ds-text)' }}>{selectedAsset.mimeType}</div>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button 
                    className="ds-btn ds-btn-primary" 
                    style={{ width: '100%', justifyContent: 'center', gap: 6 }}
                    onClick={() => handleCopyUrl(selectedAsset.url)}
                  >
                    {copiedUrl ? <Check size={14} /> : <Copy size={14} />}
                    {copiedUrl ? 'Copied Link!' : 'Copy Asset URL'}
                  </button>
                  <a 
                    href={selectedAsset.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="ds-btn"
                    style={{ width: '100%', justifyContent: 'center', gap: 6 }}
                  >
                    <ExternalLink size={14} /> Open Full Size
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="ds-toast">{toast}</div>}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
