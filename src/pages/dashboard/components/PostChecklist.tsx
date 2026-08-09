import React from 'react';
import { Check } from 'lucide-react';

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

const DEFAULT_ITEMS: ChecklistItem[] = [
  { id: 'title',    label: 'Add a title',           done: false },
  { id: 'words',    label: 'Write 300+ words',       done: false },
  { id: 'image',    label: 'Upload featured image',  done: false },
  { id: 'category', label: 'Set primary category',   done: false },
  { id: 'seo',      label: 'Add SEO meta tags',      done: false },
];

interface PostChecklistProps {
  titleFilled?: boolean;
  wordCountOk?: boolean;
  imageFilled?: boolean;
  categoryFilled?: boolean;
  seoFilled?: boolean;
}

export default function PostChecklist({
  titleFilled = false,
  wordCountOk = false,
  imageFilled = false,
  categoryFilled = false,
  seoFilled = false,
}: PostChecklistProps) {
  const items: ChecklistItem[] = [
    { id: 'title',    label: 'Add a title',           done: titleFilled },
    { id: 'words',    label: 'Write 300+ words',       done: wordCountOk },
    { id: 'image',    label: 'Upload featured image',  done: imageFilled },
    { id: 'category', label: 'Set primary category',   done: categoryFilled },
    { id: 'seo',      label: 'Add SEO meta tags',      done: seoFilled },
  ];

  const doneCount = items.filter((i) => i.done).length;

  return (
    <>
      <div className="ds-checklist-header">
        <span className="ds-panel-section-title">Post Checklist</span>
        <span className="ds-checklist-done">{doneCount}/{items.length} Done</span>
      </div>
      <div className="ds-checklist">
        {items.map((item) => (
          <label key={item.id} className={`ds-checklist-item${item.done ? ' done' : ''}`}>
            <input
              type="checkbox"
              className="ds-checklist-cb"
              checked={item.done}
              readOnly
            />
            {item.done ? <Check size={12} style={{ color: 'var(--ds-green-500)', flexShrink: 0 }} /> : null}
            {item.label}
          </label>
        ))}
      </div>
    </>
  );
}
