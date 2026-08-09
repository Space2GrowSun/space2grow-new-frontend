import React from 'react';
import { Leaf, X } from 'lucide-react';

interface BlogEmptyStateProps {
  /** Whether filters or search are active (changes the message). */
  hasActiveFilters: boolean;
  /** Called when the user clicks Clear filters. */
  onClearFilters: () => void;
}

/**
 * Friendly empty-content state shown when no posts match the current filters/search.
 */
export function BlogEmptyState({ hasActiveFilters, onClearFilters }: BlogEmptyStateProps) {
  return (
    <section
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-[#E8F3E5] flex items-center justify-center mb-6">
        <Leaf size={28} className="text-brand-dark" aria-hidden="true" />
      </div>

      {hasActiveFilters ? (
        <>
          <h2 className="text-2xl font-bold text-brand-dark mb-3">No stories found</h2>
          <p className="text-gray-600 max-w-sm mb-8 leading-relaxed">
            No articles match your current search or category. Try adjusting your filters or clearing
            them to see all stories.
          </p>
          <button
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 bg-brand-dark text-white font-semibold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2"
          >
            <X size={16} aria-hidden="true" />
            Clear filters
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-brand-dark mb-3">No stories yet</h2>
          <p className="text-gray-600 max-w-sm leading-relaxed">
            We haven't published any stories yet. Check back soon — there's lots happening at the
            garden!
          </p>
        </>
      )}
    </section>
  );
}
