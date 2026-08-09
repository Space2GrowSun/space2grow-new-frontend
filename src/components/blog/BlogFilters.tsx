import React, { useId } from 'react';
import { Search, X } from 'lucide-react';
import type { SanityCategory } from '../../types/blog';

interface BlogFiltersProps {
  categories: SanityCategory[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClear: () => void;
  totalResults: number;
}

const ALL_LABEL = 'All Stories';

/**
 * Category pill filters + search input for the blog listing page.
 * Category and search work together — both filter the same post list.
 */
export function BlogFilters({
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  onClear,
  totalResults,
}: BlogFiltersProps) {
  const searchId = useId();
  const hasActiveFilters = activeCategory !== ALL_LABEL || searchQuery.trim().length > 0;

  return (
    <div className="mb-16">
      {/* Search input */}
      <div className="mb-6">
        <label htmlFor={searchId} className="sr-only">
          Search articles
        </label>
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id={searchId}
            type="search"
            placeholder="Search stories…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-white text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent text-sm"
            aria-label="Search blog articles by title or content"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark rounded"
              aria-label="Clear search"
            >
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-3 items-center" role="group" aria-label="Filter by category">
        {/* All Stories pill */}
        <button
          onClick={() => onCategoryChange(ALL_LABEL)}
          aria-pressed={activeCategory === ALL_LABEL}
          className={`px-6 py-2.5 rounded-full font-medium text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 ${
            activeCategory === ALL_LABEL
              ? 'bg-brand-dark text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          {ALL_LABEL}
        </button>

        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => onCategoryChange(cat.title)}
            aria-pressed={activeCategory === cat.title}
            className={`px-6 py-2.5 rounded-full font-medium text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 ${
              activeCategory === cat.title
                ? 'bg-brand-dark text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {cat.title}
          </button>
        ))}

        {/* Clear filters */}
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm text-gray-500 hover:text-brand-dark transition-colors underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2"
            aria-label="Clear all filters and search"
          >
            <X size={14} aria-hidden="true" />
            Clear
          </button>
        )}
      </div>

      {/* Live result count (for screen readers) */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {totalResults === 1
          ? '1 article found'
          : `${totalResults} articles found`}
      </p>
    </div>
  );
}
