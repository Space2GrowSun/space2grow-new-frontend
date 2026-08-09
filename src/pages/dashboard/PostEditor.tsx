import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { ArrowLeft, Camera, Eye, Plus, X, Heading2, Heading3, Quote, List, Sparkles } from 'lucide-react';

import BubbleToolbar from './components/BubbleToolbar';
import PostChecklist from './components/PostChecklist';
import GrowthTip from './components/GrowthTip';
import StatusBadge from './components/StatusBadge';
import { writeClient, slugify } from '../../lib/sanityWriteClient';
import { useAuth } from '../../context/AuthContext';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Author   { _id: string; name: string; }
interface Category { _id: string; title: string; }

// ── Helpers ───────────────────────────────────────────────────────────────────

async function uploadImageToSanity(file: File): Promise<{ _type: 'image'; asset: { _ref: string } }> {
  if (!writeClient) throw new Error('No write client');
  const asset = await writeClient.assets.upload('image', file, { filename: file.name });
  return { _type: 'image', asset: { _ref: asset._id } };
}

/** Convert TipTap HTML → minimal Portable Text for Sanity */
function htmlToPortableText(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const blocks: object[] = [];

  const processNode = (node: Element): object | null => {
    const tag = node.tagName;

    if (tag === 'IMG') {
      return {
        _type: 'image',
        _key: Math.random().toString(36).slice(2),
        asset: { _ref: node.getAttribute('src') || '' },
      };
    }

    const styleMap: Record<string, string> = {
      P: 'normal', H2: 'h2', H3: 'h3', BLOCKQUOTE: 'blockquote',
    };
    const isList = tag === 'UL' || tag === 'OL';

    if (styleMap[tag]) {
      const spans: object[] = [];
      const linkDefs: Record<string, { _type: string; href: string }> = {};

      const walk = (n: Node, marks: string[]) => {
        if (n.nodeType === Node.TEXT_NODE) {
          const text = n.textContent || '';
          if (text) spans.push({ _type: 'span', _key: Math.random().toString(36).slice(2), text, marks });
        } else {
          const el = n as Element;
          const t = el.tagName;
          let nextMarks = [...marks];
          if (t === 'STRONG' || t === 'B') nextMarks.push('strong');
          if (t === 'EM' || t === 'I') nextMarks.push('em');
          if (t === 'A') {
            const key = `lnk${Math.random().toString(36).slice(2)}`;
            linkDefs[key] = { _type: 'link', href: el.getAttribute('href') || '' };
            nextMarks.push(key);
          }
          el.childNodes.forEach((c) => walk(c, nextMarks));
        }
      };

      node.childNodes.forEach((c) => walk(c, []));
      const markDefs = Object.entries(linkDefs).map(([key, val]) => ({ _key: key, ...val }));

      return {
        _type: 'block',
        _key: Math.random().toString(36).slice(2),
        style: styleMap[tag],
        children: spans.length ? spans : [{ _type: 'span', _key: 'empty', text: '', marks: [] }],
        markDefs,
      };
    }

    if (isList) {
      const listItem = tag === 'UL' ? 'bullet' : 'number';
      return Array.from(node.querySelectorAll('li')).map((li) => ({
        _type: 'block',
        _key: Math.random().toString(36).slice(2),
        style: 'normal',
        listItem,
        level: 1,
        children: [{ _type: 'span', _key: 'sp', text: li.textContent || '', marks: [] }],
        markDefs: [],
      }));
    }
    return null;
  };

  doc.body.childNodes.forEach((node) => {
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const result = processNode(node as Element);
    if (Array.isArray(result)) blocks.push(...result);
    else if (result) blocks.push(result);
  });

  return blocks.length
    ? blocks
    : [{ _type: 'block', _key: 'empty', style: 'normal', children: [{ _type: 'span', _key: 'sp', text: '', marks: [] }], markDefs: [] }];
}

// ── Main PostEditorPage ───────────────────────────────────────────────────────

export default function PostEditorPage() {
  const { id: postId } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Form state
  const [title, setTitle]                 = useState('');
  const [excerpt, setExcerpt]             = useState('');
  const [bodyHtml, setBodyHtml]           = useState('');
  const [slug, setSlug]                   = useState('');
  const [coverFile, setCoverFile]         = useState<File | null>(null);
  const [coverPreview, setCoverPreview]   = useState<string | null>(null);
  const [existingCoverRef, setExistingCoverRef] = useState<string | null>(null);
  const [coverAlt, setCoverAlt]           = useState('');

  // Metadata
  const [authors, setAuthors]             = useState<Author[]>([]);
  const [categories, setCategories]       = useState<Category[]>([]);
  const [authorId, setAuthorId]           = useState('');
  const [categoryId, setCategoryId]       = useState('');
  const [tags, setTags]                   = useState<string[]>([]);
  const [tagInput, setTagInput]           = useState('');
  const [publishedAt, setPublishedAt]     = useState(new Date().toISOString().slice(0, 16));
  const [isPublished, setIsPublished]     = useState(false);
  const [visibility, setVisibility]       = useState('Public');

  // UI state
  const [saving, setSaving]               = useState(false);
  const [saveStatus, setSaveStatus]       = useState('');
  const [toast, setToast]                 = useState<string | null>(null);
  const [loading, setLoading]             = useState(!!postId);
  const [dragOver, setDragOver]           = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showBlockMenu, setShowBlockMenu] = useState(false);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const titleRef      = useRef<HTMLTextAreaElement>(null);
  const editorRef     = useRef<any>(null);

  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'A';

  // ── Load authors + categories ───────────────────────────────────────
  useEffect(() => {
    if (!writeClient) return;
    writeClient.fetch<Author[]>('*[_type == "author"] | order(name asc) { _id, name }').then(setAuthors).catch(console.error);
    writeClient.fetch<Category[]>('*[_type == "category"] | order(title asc) { _id, title }').then(setCategories).catch(console.error);
  }, []);

  // ── Load existing post ──────────────────────────────────────────────
  useEffect(() => {
    if (!postId || !writeClient) return;
    setLoading(true);
    const baseId = postId.replace(/^drafts\./, '');
    const draftId = `drafts.${baseId}`;
    writeClient
      .fetch(
        `*[_id == $draftId || _id == $baseId] | order(select(_id in path("drafts.**") => 1, 0) desc)[0]{
          _id, title, excerpt, publishedAt, slug, tags,
          "authorId": author._ref,
          "categoryId": category._ref,
          "coverRef": featuredImage.asset._ref,
          "coverUrl": featuredImage.asset->url,
          "coverAlt": featuredImage.alt,
          body
        }`,
        { baseId, draftId },
      )
      .then((data: any) => {
        if (!data) return;
        setTitle(data.title || '');
        setExcerpt(data.excerpt || '');
        setSlug(data.slug?.current || '');
        setAuthorId(data.authorId || '');
        setCategoryId(data.categoryId || '');
        setTags(data.tags || []);
        setPublishedAt((data.publishedAt || new Date().toISOString()).slice(0, 16));
        setIsPublished(!!data.publishedAt && !postId?.startsWith('drafts.'));
        if (data.coverRef) setExistingCoverRef(data.coverRef);
        if (data.coverUrl) setCoverPreview(data.coverUrl);
        if (data.coverAlt) setCoverAlt(data.coverAlt);
      })
      .finally(() => setLoading(false));
  }, [postId]);

  // ── Helpers ─────────────────────────────────────────────────────────
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const wordCount = bodyHtml.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length;

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!slug || slug === slugify(title)) setSlug(slugify(val));
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleCoverFile = (file: File) => {
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
    setExistingCoverRef(null);
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleCoverFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) handleCoverFile(file);
  };

  const handleTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      setTags((t) => [...new Set([...t, tagInput.trim()])]);
      setTagInput('');
    }
    if (e.key === 'Backspace' && !tagInput && tags.length) {
      setTags((t) => t.slice(0, -1));
    }
  };

  const handleLinkAdd = useCallback((url: string) => {
    editorRef.current?.chain().focus().setLink({ href: url }).run();
  }, []);

  const handleInsertBlock = (type: string) => {
    const ed = editorRef.current;
    if (!ed) return;
    
    if (type === 'h2') {
      ed.chain().focus().insertContent('<h2>Section Heading</h2>').run();
    } else if (type === 'h3') {
      ed.chain().focus().insertContent('<h3>Sub-heading</h3>').run();
    } else if (type === 'quote') {
      ed.chain().focus().insertContent('<blockquote><p>Add an inspiring quote here...</p></blockquote>').run();
    } else if (type === 'bullet') {
      ed.chain().focus().insertContent('<ul><li>First key takeaway</li><li>Second key takeaway</li></ul>').run();
    } else if (type === 'callout') {
      ed.chain().focus().insertContent('<blockquote style="border-left-color: #2e7d32; background: #f8fdf9;"><p>💡 <strong>Tip:</strong> Share your insights with the garden community.</p></blockquote>').run();
    }
    setShowBlockMenu(false);
  };

  // ── Save / Publish ──────────────────────────────────────────────────
  const handleSave = async (publish = false) => {
    if (!writeClient) return;
    if (!title.trim()) { showToast('Please add a title first.'); return; }
    if (!slug.trim())  { showToast('Please add a URL slug.'); return; }

    setSaving(true);
    setSaveStatus(publish ? 'Publishing…' : 'Saving…');

    try {
      let coverRef = existingCoverRef;
      if (coverFile) {
        const uploaded = await uploadImageToSanity(coverFile);
        coverRef = uploaded.asset._ref;
      }

      let html = bodyHtml;
      try {
        const ed = editorRef.current;
        if (ed && !ed.isDestroyed && ed.view?.docView) html = ed.getHTML();
      } catch { /* use bodyHtml fallback */ }

      const portableText = htmlToPortableText(html);

      const doc: Record<string, any> = {
        _type: 'post',
        title: title.trim(),
        excerpt: excerpt.trim() || undefined,
        slug: { _type: 'slug', current: slug.trim() },
        body: portableText,
        publishedAt: publish ? new Date(publishedAt).toISOString() : undefined,
        tags: tags.length ? tags : undefined,
      };

      if (coverRef) {
        doc.featuredImage = {
          _type: 'image',
          asset: { _type: 'reference', _ref: coverRef },
          alt: coverAlt || undefined,
        };
      }
      if (authorId)   doc.author   = { _type: 'reference', _ref: authorId };
      if (categoryId) doc.category = { _type: 'reference', _ref: categoryId };

      let savedId: string;
      const baseId = postId ? postId.replace(/^drafts\./, '') : crypto.randomUUID();
      const draftId = `drafts.${baseId}`;

      if (publish) {
        // Create or update the published document
        await writeClient.createOrReplace({ ...doc, _id: baseId, _type: 'post' } as any);
        // Delete the draft document if it exists
        await writeClient.delete(draftId).catch(() => {});
        savedId = baseId;
        setIsPublished(true);
      } else {
        // Save as draft document (starts with "drafts.")
        await writeClient.createIfNotExists({ _id: draftId, _type: 'post', title: title.trim() } as any);
        await writeClient.patch(draftId).set(doc).commit();
        savedId = draftId;
      }

      setSaveStatus(publish ? 'Published ✓' : 'Saved ✓');
      showToast(publish ? '🎉 Post published to community!' : 'Draft saved.');
      if (postId !== savedId) {
        navigate(`/dashboard/posts/${savedId}`, { replace: true });
      }
    } catch (err: any) {
      console.error('[PostEditor handleSave error]:', err);
      setSaveStatus('Error');
      const errorMsg = err?.message || err?.details?.description || 'Failed to save post';
      showToast(`Error: ${errorMsg}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!postId || !writeClient) return;
    if (!confirm('Delete this post permanently? This cannot be undone.')) return;
    try {
      const draftId = postId.startsWith('drafts.') ? postId : `drafts.${postId}`;
      const baseId  = postId.startsWith('drafts.') ? postId.replace('drafts.', '') : postId;
      await Promise.allSettled([writeClient.delete(draftId), writeClient.delete(baseId)]);
      showToast('Post deleted.');
      setTimeout(() => navigate('/dashboard/posts'), 500);
    } catch (e) {
      console.error(e);
      showToast('Failed to delete post.');
    }
  };

  // ── TipTap ──────────────────────────────────────────────────────────
  const extensions = [
    StarterKit.configure({ heading: { levels: [2, 3] } }),
    Link.configure({ openOnClick: false }),
    Image,
    Placeholder.configure({ placeholder: 'In the heart of our community, every voice matters…' }),
  ];

  if (loading) {
    return (
      <div className="ds-editor-root">
        <div className="ds-loading">
          <div style={{ width: 20, height: 20, border: '2px solid var(--ds-border)', borderTopColor: 'var(--ds-green-500)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          Loading post…
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const currentStatus = isPublished ? 'published' : (postId ? 'draft' : 'draft');

  return (
    <div className="ds-editor-root">
      {/* ── Top bar ──────────────────────────────────────────────── */}
      <div className="ds-editor-topbar">
        <div className="ds-editor-topbar-left">
          <button className="ds-back-btn" onClick={() => navigate('/dashboard/posts')}>
            <ArrowLeft size={16} /> All posts
          </button>
        </div>

        <div className="ds-editor-topbar-center">
          <div className="ds-editor-doc-title">{title || 'New Draft'}</div>
          {saveStatus && <div className="ds-editor-doc-meta">{saveStatus}</div>}
        </div>

        <div className="ds-editor-topbar-right">
          {postId && (
            <button className="ds-btn ds-btn-ghost ds-btn-danger" onClick={handleDelete} disabled={saving}>
              Delete
            </button>
          )}
          <button className="ds-btn" onClick={() => handleSave(false)} disabled={saving}>
            Save draft
          </button>
          <button 
            className="ds-btn" 
            style={{ display: 'flex', alignItems: 'center', gap: 6 }} 
            disabled={saving}
            onClick={() => setShowPreviewModal(true)}
          >
            <Eye size={14} /> Preview
          </button>
          <button className="ds-btn ds-btn-primary" onClick={() => handleSave(true)} disabled={saving}>
            {saving ? 'Working…' : 'Publish to Community'}
          </button>
          <div className="ds-topbar-avatar" title={user?.email || 'Admin'}>{userInitial}</div>
        </div>
      </div>

      {/* ── Editor body ───────────────────────────────────────────── */}
      <div className="ds-editor-body">
        {/* Canvas */}
        <div className="ds-editor-canvas">
          <div className="ds-editor-canvas-inner">
            {/* Title */}
            <textarea
              ref={titleRef}
              className="ds-editor-title"
              placeholder="Enter article title..."
              value={title}
              onChange={handleTitleChange}
              rows={1}
            />

            {/* Slug + Excerpt row */}
            <div className="ds-editor-meta-row">
              <div className="ds-editor-meta-field">
                <span className="ds-editor-meta-label">URL Slug</span>
                <div className="ds-editor-slug-wrap">
                  <span className="ds-editor-slug-prefix">…/blog/</span>
                  <input
                    className="ds-editor-slug-input"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="my-post-url"
                  />
                </div>
              </div>
              <div className="ds-editor-meta-field">
                <span className="ds-editor-meta-label">Article Excerpt</span>
                <textarea
                  className="ds-editor-excerpt-input"
                  placeholder="Briefly describe what this post is about..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                />
              </div>
            </div>

            {/* Featured Image */}
            <div className="ds-featured-section">
              <div className="ds-featured-section-title">Featured Image</div>

              {coverPreview ? (
                <div className="ds-featured-img-wrap">
                  <img className="ds-featured-img" src={coverPreview} alt={coverAlt || 'Featured'} />
                  <div className="ds-featured-img-actions">
                    <button
                      className="ds-btn"
                      style={{ fontSize: 12, padding: '4px 10px' }}
                      onClick={() => coverInputRef.current?.click()}
                    >
                      Replace image
                    </button>
                    <button
                      className="ds-btn ds-btn-danger"
                      style={{ fontSize: 12, padding: '4px 10px' }}
                      onClick={() => { setCoverPreview(null); setCoverFile(null); setExistingCoverRef(null); }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <label
                  className={`ds-featured-upload-zone${dragOver ? ' drag-over' : ''}`}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                >
                  <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                  />
                  <div className="ds-featured-upload-icon">
                    <Camera size={22} />
                  </div>
                  <div className="ds-featured-upload-text">Click or drag to upload high-resolution image</div>
                  <div className="ds-featured-upload-hint">Recommended: 1600 × 900px</div>
                </label>
              )}

              {coverPreview && (
                <>
                  <label className="ds-alt-label" htmlFor="cover-alt">Image Alt Text (SEO)</label>
                  <input
                    id="cover-alt"
                    className="ds-alt-input"
                    placeholder="Describe the image for screen readers..."
                    value={coverAlt}
                    onChange={(e) => setCoverAlt(e.target.value)}
                  />
                </>
              )}
            </div>

            {/* Body editor */}
            <div className="ds-editor-wrap">
              <EditorProvider
                key={postId ?? 'new'}
                extensions={extensions}
                content={bodyHtml}
                onUpdate={({ editor }) => {
                  setBodyHtml(editor.getHTML());
                  editorRef.current = editor;
                }}
                onCreate={({ editor }) => {
                  editorRef.current = editor;
                }}
              >
                <BubbleToolbar onLinkAdd={handleLinkAdd} />
              </EditorProvider>
            </div>

            {/* Add block */}
            <div style={{ position: 'relative' }}>
              <button 
                className="ds-add-block-btn"
                onClick={() => setShowBlockMenu(!showBlockMenu)}
              >
                <span className="ds-add-block-icon">
                  <Plus size={12} />
                </span>
                Add a block…
              </button>

              {showBlockMenu && (
                <div style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 8px)',
                  left: 0,
                  background: '#fff',
                  border: '1px solid var(--ds-border)',
                  borderRadius: 10,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  minWidth: 220,
                  zIndex: 50,
                  padding: 6,
                }}>
                  <div style={{ padding: '6px 10px', fontSize: 11, fontWeight: 600, color: 'var(--ds-muted)', textTransform: 'uppercase' }}>Insert Block</div>
                  <button 
                    className="ds-sidebar-utility-btn" 
                    style={{ width: '100%', justifyContent: 'flex-start', padding: '8px 10px', background: 'transparent', gap: 8 }}
                    onClick={() => handleInsertBlock('h2')}
                  >
                    <Heading2 size={15} style={{ color: 'var(--ds-green-700)' }} /> Section Heading (H2)
                  </button>
                  <button 
                    className="ds-sidebar-utility-btn" 
                    style={{ width: '100%', justifyContent: 'flex-start', padding: '8px 10px', background: 'transparent', gap: 8 }}
                    onClick={() => handleInsertBlock('h3')}
                  >
                    <Heading3 size={15} style={{ color: 'var(--ds-green-700)' }} /> Sub-heading (H3)
                  </button>
                  <button 
                    className="ds-sidebar-utility-btn" 
                    style={{ width: '100%', justifyContent: 'flex-start', padding: '8px 10px', background: 'transparent', gap: 8 }}
                    onClick={() => handleInsertBlock('quote')}
                  >
                    <Quote size={15} style={{ color: 'var(--ds-green-700)' }} /> Blockquote
                  </button>
                  <button 
                    className="ds-sidebar-utility-btn" 
                    style={{ width: '100%', justifyContent: 'flex-start', padding: '8px 10px', background: 'transparent', gap: 8 }}
                    onClick={() => handleInsertBlock('bullet')}
                  >
                    <List size={15} style={{ color: 'var(--ds-green-700)' }} /> Bullet List
                  </button>
                  <button 
                    className="ds-sidebar-utility-btn" 
                    style={{ width: '100%', justifyContent: 'flex-start', padding: '8px 10px', background: 'transparent', gap: 8 }}
                    onClick={() => handleInsertBlock('callout')}
                  >
                    <Sparkles size={15} style={{ color: 'var(--ds-green-700)' }} /> Callout Box
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="ds-panel">
          {/* Publishing status */}
          <div className="ds-panel-section">
            <div className="ds-panel-section-title">Publishing Status</div>
            <div className="ds-pub-status-row">
              <span className="ds-pub-status-key">Current Status</span>
              <StatusBadge status={currentStatus} />
            </div>
            <div className="ds-pub-status-row">
              <span className="ds-pub-status-key">Visibility</span>
              <select 
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                style={{ border: 'none', background: 'none', fontSize: 13, fontWeight: 500, color: 'var(--ds-green-700)', cursor: 'pointer', outline: 'none' }}
              >
                <option value="Public">Public</option>
                <option value="Draft">Draft / Unlisted</option>
                <option value="Members Only">Members Only</option>
              </select>
            </div>
            <div className="ds-pub-status-row">
              <span className="ds-pub-status-key">Schedule</span>
              <span className="ds-pub-status-val" style={{ fontSize: 12 }}>
                <input
                  type="datetime-local"
                  style={{ border: 'none', background: 'none', fontSize: 12, fontFamily: 'inherit', color: 'var(--ds-green-700)', cursor: 'pointer', outline: 'none' }}
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                />
              </span>
            </div>

            <button className="ds-btn ds-btn-primary" style={{ width: '100%', marginTop: 12, justifyContent: 'center' }} onClick={() => handleSave(true)} disabled={saving}>
              Publish to Community
            </button>
            {postId && (
              <button className="ds-move-trash" onClick={handleDelete}>
                Move to Trash
              </button>
            )}
          </div>

          {/* Checklist */}
          <div className="ds-panel-section">
            <PostChecklist
              titleFilled={title.trim().length > 3}
              wordCountOk={wordCount >= 300}
              imageFilled={!!coverPreview}
              categoryFilled={!!categoryId}
              seoFilled={excerpt.trim().length > 20}
            />
          </div>

          {/* Growth Tip */}
          <div className="ds-panel-section">
            <GrowthTip />
          </div>

          {/* Tags & Categories */}
          <div className="ds-panel-section">
            <div className="ds-panel-section-title">Tags &amp; Categories</div>

            <label className="ds-panel-label">Author</label>
            <select className="ds-panel-select" value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
              <option value="">Select an author…</option>
              {authors.map((a) => <option key={a._id} value={a._id}>{a.name}</option>)}
            </select>

            <label className="ds-panel-label">Categories</label>
            <select className="ds-panel-select" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">Select a category…</option>
              {categories.map((c) => <option key={c._id} value={c._id}>{c.title}</option>)}
            </select>

            <label className="ds-panel-label">Tags</label>
            <div className="ds-tags-wrap" onClick={() => document.getElementById('ds-tag-input')?.focus()}>
              {tags.map((tag) => (
                <span key={tag} className="ds-tag">
                  {tag}
                  <button className="ds-tag-remove" onClick={() => setTags((t) => t.filter((x) => x !== tag))}>×</button>
                </span>
              ))}
              <input
                id="ds-tag-input"
                className="ds-tag-input"
                placeholder={tags.length ? '' : 'Type and press Enter…'}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKey}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Modal */}
      {showPreviewModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: 20
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 16,
            width: '100%',
            maxWidth: 780,
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid var(--ds-border)', background: '#fafafa' }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ds-green-700)' }}>Live Community Post Preview</span>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--ds-text)' }}>{title || 'Untitled Post'}</h3>
              </div>
              <button onClick={() => setShowPreviewModal(false)} className="ds-btn ds-btn-ghost" style={{ padding: 6 }}>
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div style={{ padding: '28px 36px', overflowY: 'auto', flex: 1 }}>
              {/* Category badge */}
              {categoryId && (
                <span style={{ background: '#d8f3dc', color: '#1b4332', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, display: 'inline-block', marginBottom: 12 }}>
                  {categories.find(c => c._id === categoryId)?.title || 'Community'}
                </span>
              )}

              <h1 style={{ fontSize: 32, fontWeight: 700, color: '#1a2e1a', marginBottom: 12, lineHeight: 1.25 }}>{title || 'Untitled Post'}</h1>
              
              {excerpt && (
                <p style={{ fontSize: 18, color: '#4b5563', lineHeight: 1.6, marginBottom: 20, fontStyle: 'italic' }}>{excerpt}</p>
              )}

              {/* Author & Date */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 20, marginBottom: 24, borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--ds-green-100)', color: 'var(--ds-green-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                  {authorId ? (authors.find(a => a._id === authorId)?.name.charAt(0) || 'A') : 'A'}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1f2937' }}>
                    {authorId ? (authors.find(a => a._id === authorId)?.name || 'Space2Grow Team') : 'Space2Grow Team'}
                  </div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>
                    Published {new Date(publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* Featured image */}
              {coverPreview && (
                <div style={{ marginBottom: 28, borderRadius: 12, overflow: 'hidden', maxHeight: 380 }}>
                  <img src={coverPreview} alt={coverAlt || title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}

              {/* Rendered HTML */}
              <div 
                className="prose"
                style={{ fontSize: 16, lineHeight: 1.7, color: '#374151' }}
                dangerouslySetInnerHTML={{ __html: bodyHtml || '<p><em>No post content yet...</em></p>' }}
              />
            </div>
          </div>
        </div>
      )}

      {toast && <div className="ds-toast">{toast}</div>}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
