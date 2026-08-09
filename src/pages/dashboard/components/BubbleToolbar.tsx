import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import {
  Bold, Italic, Heading2, Heading3, Quote, Link, Link2Off,
} from 'lucide-react';

interface BubbleToolbarProps {
  onLinkAdd: (url: string) => void;
}

export default function BubbleToolbar({ onLinkAdd }: BubbleToolbarProps) {
  const { editor } = useCurrentEditor();
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const toolbarRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  // Track selection and reposition the toolbar
  const updatePosition = useCallback(() => {
    if (!editor) return;
    const { from, to } = editor.state.selection;

    if (from === to || editor.state.selection.empty) {
      setVisible(false);
      return;
    }

    const domSelection = window.getSelection();
    if (!domSelection || domSelection.rangeCount === 0) {
      setVisible(false);
      return;
    }

    const range = domSelection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    if (!rect || rect.width === 0) {
      setVisible(false);
      return;
    }

    const toolbarH = 36;
    const toolbarW = toolbarRef.current?.offsetWidth ?? 260;

    let top = rect.top + window.scrollY - toolbarH - 10;
    let left = rect.left + window.scrollX + rect.width / 2 - toolbarW / 2;

    // Keep within viewport
    if (left < 8) left = 8;
    if (left + toolbarW > window.innerWidth - 8) left = window.innerWidth - toolbarW - 8;
    if (top < 8) top = rect.bottom + window.scrollY + 10; // flip below

    setPos({ top, left });
    setVisible(true);
  }, [editor]);

  useEffect(() => {
    if (!editor) return;
    editor.on('selectionUpdate', updatePosition);
    editor.on('transaction', updatePosition);
    return () => {
      editor.off('selectionUpdate', updatePosition);
      editor.off('transaction', updatePosition);
    };
  }, [editor, updatePosition]);

  // Hide on outside click
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (toolbarRef.current && !toolbarRef.current.contains(e.target as Node)) {
        setShowLinkInput(false);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  if (!editor || !visible) return null;

  const handleLinkSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const url = linkUrl.trim();
      if (url) onLinkAdd(url);
      setLinkUrl('');
      setShowLinkInput(false);
    }
    if (e.key === 'Escape') setShowLinkInput(false);
  };

  const handleLinkClick = () => {
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
    } else {
      setShowLinkInput(true);
      setTimeout(() => linkRef.current?.focus(), 50);
    }
  };

  return (
    <div
      ref={toolbarRef}
      className="db-bubble-menu"
      style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 9999 }}
      onMouseDown={(e) => e.preventDefault()} // keep editor selection
    >
      {showLinkInput ? (
        <div className="db-link-input-wrap">
          <input
            ref={linkRef}
            className="db-link-input"
            placeholder="https://…"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={handleLinkSubmit}
          />
          <button
            className="db-bubble-btn"
            onMouseDown={(e) => { e.preventDefault(); setShowLinkInput(false); }}
          >✕</button>
        </div>
      ) : (
        <>
          <button
            className={`db-bubble-btn${editor.isActive('bold') ? ' active' : ''}`}
            onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }}
            title="Bold"
          ><Bold size={13} /></button>

          <button
            className={`db-bubble-btn${editor.isActive('italic') ? ' active' : ''}`}
            onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }}
            title="Italic"
          ><Italic size={13} /></button>

          <div className="db-bubble-sep" />

          <button
            className={`db-bubble-btn${editor.isActive('heading', { level: 2 }) ? ' active' : ''}`}
            onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run(); }}
            title="Heading"
          ><Heading2 size={13} /></button>

          <button
            className={`db-bubble-btn${editor.isActive('heading', { level: 3 }) ? ' active' : ''}`}
            onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 3 }).run(); }}
            title="Sub-heading"
          ><Heading3 size={13} /></button>

          <button
            className={`db-bubble-btn${editor.isActive('blockquote') ? ' active' : ''}`}
            onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBlockquote().run(); }}
            title="Quote"
          ><Quote size={13} /></button>

          <div className="db-bubble-sep" />

          <button
            className={`db-bubble-btn${editor.isActive('link') ? ' active' : ''}`}
            onMouseDown={(e) => { e.preventDefault(); handleLinkClick(); }}
            title={editor.isActive('link') ? 'Remove link' : 'Add link'}
          >
            {editor.isActive('link') ? <Link2Off size={13} /> : <Link size={13} />}
          </button>
        </>
      )}
    </div>
  );
}
