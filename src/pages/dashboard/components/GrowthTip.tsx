import React from 'react';
import { MapPin } from 'lucide-react';

interface GrowthTipProps {
  text?: string;
}

export default function GrowthTip({
  text = 'Articles with at least 3 high-quality images see 40% higher community engagement.',
}: GrowthTipProps) {
  return (
    <div className="ds-growth-tip">
      <div className="ds-growth-tip-header">
        <MapPin size={13} />
        Growth Tip
      </div>
      <p className="ds-growth-tip-text">{text}</p>
    </div>
  );
}
