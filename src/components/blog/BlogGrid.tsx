import React from 'react';
import { BlogCard } from './BlogCard';
import type { SanityPostCard } from '../../types/blog';

interface BlogGridProps {
  posts: SanityPostCard[];
}

/**
 * Responsive 3-column grid of BlogCard components.
 * Matching the existing grid layout.
 */
export function BlogGrid({ posts }: BlogGridProps) {
  return (
    <section aria-label="Blog articles">
      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}
