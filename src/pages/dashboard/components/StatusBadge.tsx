import React from 'react';

type StatusType = 'published' | 'scheduled' | 'draft' | 'review';

const LABELS: Record<StatusType, string> = {
  published: 'Published',
  scheduled: 'Scheduled',
  draft: 'Draft',
  review: 'Ready for Review',
};

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  return (
    <span className={`ds-badge ds-badge-${status} ${className}`}>
      <span className="ds-badge-dot" />
      {LABELS[status]}
    </span>
  );
}
