import React from 'react';

export default function Divider({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-6 py-4 md:py-6 overflow-hidden flex items-center md:justify-center ${flip ? 'justify-end' : 'justify-start'} relative ${className}`}>
      <img 
        src="https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/bee-desing.png" 
        alt="Bee divider line" 
        className={`w-[600px] min-w-[600px] md:min-w-0 md:w-full max-w-none md:max-w-[1000px] h-auto object-contain ${flip ? '-scale-x-100' : ''}`} 
      />
    </div>
  );
}
