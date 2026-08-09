import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getImageUrl } from '../../lib/sanityImage';
import { formatDate } from '../../utils/formatDate';
import type { SanityPostCard } from '../../types/blog';

interface BlogHeroProps {
  post: SanityPostCard;
}

/**
 * Full-width hero section showing the featured blog post.
 * Preserves the existing gradient overlay design from the original Blog.tsx.
 */
export function BlogHero({ post }: BlogHeroProps) {
  const imageUrl = getImageUrl(post.featuredImage, { width: 1920, height: 800 });
  const altText = post.featuredImage?.alt || post.title;
  const dateLabel = formatDate(post.publishedAt);

  return (
    <section
      aria-labelledby="featured-post-title"
      className="relative w-full h-[600px] mb-16 overflow-hidden"
    >
      {/* Background image */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={altText}
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="absolute inset-0 bg-brand-dark" aria-hidden="true" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 to-black/40" aria-hidden="true" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            {/* Featured badge */}
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm border border-white/30">
              Featured Story
            </span>

            {/* Category */}
            {post.categoryTitle && (
              <p className="text-brand-accent text-xs font-bold tracking-widest uppercase mb-3">
                {post.categoryTitle}
              </p>
            )}

            {/* Title */}
            <h1
              id="featured-post-title"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg md:text-xl text-gray-200 mb-4 max-w-lg line-clamp-3">
              {post.excerpt}
            </p>

            {/* Meta */}
            <p className="text-white/60 text-sm mb-8">
              By {post.name}{dateLabel ? ` · ${dateLabel}` : ''}
            </p>

            {/* CTA */}
            <Link
              to={`/blog/${post.slug}`}
              className="bg-brand-accent hover:bg-opacity-90 text-brand-dark font-semibold py-4 px-8 rounded-full transition-all inline-flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Read the Story
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={20}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Fallback hero shown when no featured post exists.
 */
export function BlogHeroFallback() {
  return (
    <section className="w-full py-20 px-6 mb-16 bg-brand-dark">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Stories & News</h1>
        <p className="text-gray-300 text-lg max-w-xl">
          The latest from A Space 2 Grow — events, community updates, and garden life.
        </p>
      </div>
    </section>
  );
}
