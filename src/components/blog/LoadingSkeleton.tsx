import React from 'react';

/**
 * Animated skeleton cards shown while blog posts are loading.
 * Matches the same 3-column grid layout as the post grid.
 */
export function BlogGridSkeleton() {
  return (
    <div className="grid md:grid-cols-3 gap-8" aria-busy="true" aria-label="Loading blog posts">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse"
          aria-hidden="true"
        >
          {/* Image placeholder */}
          <div className="w-full h-[240px] bg-gray-200" />
          {/* Content placeholder */}
          <div className="p-8">
            <div className="h-3 w-20 bg-gray-200 rounded mb-4" />
            <div className="h-5 w-full bg-gray-200 rounded mb-2" />
            <div className="h-5 w-3/4 bg-gray-200 rounded mb-8" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
              </div>
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
      <span className="sr-only">Loading articles, please wait…</span>
    </div>
  );
}

/**
 * Skeleton for the hero / featured post area while loading.
 */
export function BlogHeroSkeleton() {
  return (
    <div
      className="relative w-full h-[600px] mb-16 bg-gray-200 animate-pulse rounded-b-3xl"
      aria-hidden="true"
    />
  );
}

/**
 * Skeleton for the single article page while loading.
 */
export function BlogPostSkeleton() {
  return (
    <div className="pt-8 pb-24 animate-pulse" aria-busy="true" aria-label="Loading article">
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="h-4 w-20 bg-gray-200 rounded mb-6" />
        <div className="h-12 w-full bg-gray-200 rounded mb-3" />
        <div className="h-12 w-2/3 bg-gray-200 rounded mb-8" />
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200" />
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-3 w-24 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="rounded-[2rem] aspect-[21/9] bg-gray-200 max-h-[600px]" />
      </div>
      <div className="max-w-3xl mx-auto px-6 space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded" style={{ width: `${70 + (i % 3) * 10}%` }} />
        ))}
      </div>
      <span className="sr-only">Loading article content, please wait…</span>
    </div>
  );
}
