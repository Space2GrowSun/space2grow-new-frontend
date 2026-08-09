import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { getImageUrl } from '../../lib/sanityImage';
import { formatDate } from '../../utils/formatDate';
import { calculateReadingTime } from '../../utils/calculateReadingTime';
import type { SanityPostCard } from '../../types/blog';

interface BlogCardProps {
  post: SanityPostCard;
}

/**
 * Reusable blog card component for the post grid.
 * Matches the existing card design: rounded-3xl, hover lift, image zoom, overlay category badge.
 */
export function BlogCard({ post }: BlogCardProps) {
  const imageUrl = getImageUrl(post.featuredImage, { width: 600, height: 400 });
  const readingTime = calculateReadingTime(null); // body not available on listing — show 0
  const dateLabel = formatDate(post.publishedAt);

  return (
    <article className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group translate-y-0 hover:-translate-y-1">
      <Link
        to={`/blog/${post.slug}`}
        className="flex flex-col flex-grow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-inset"
        aria-label={`Read article: ${post.title}`}
      >
        {/* Featured image */}
        <div className="relative overflow-hidden flex-shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={post.featuredImage?.alt || post.title}
              className="w-full h-[240px] object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              width={600}
              height={400}
            />
          ) : (
            <div className="w-full h-[240px] bg-[#E8F3E5] flex items-center justify-center">
              <span className="text-brand-dark/30 text-sm">No image</span>
            </div>
          )}

          {/* Category badge */}
          {post.categoryTitle && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-brand-dark text-xs font-bold tracking-wider rounded-md shadow-sm">
                {post.categoryTitle.toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="p-8 flex flex-col flex-grow">
          {/* Excerpt (hidden visually, keeps card consistent height) */}
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>

          {/* Title */}
          <h3 className="text-xl font-bold text-brand-dark flex-grow group-hover:text-[#356b60] transition-colors leading-snug mb-4">
            {post.title}
          </h3>

          {/* Footer: author + date */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3 min-w-0">
              {post.image ? (
                <img
                  src={getImageUrl(post.image, { width: 64, height: 64 })}
                  alt={post.name}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  loading="lazy"
                  width={32}
                  height={32}
                />
              ) : (
                <div
                  className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <span className="text-brand-dark text-xs font-bold">
                    {post.name?.charAt(0) || '?'}
                  </span>
                </div>
              )}
              <p className="text-gray-600 font-medium text-sm truncate">{post.name}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400 font-semibold flex-shrink-0 ml-2">
              <time dateTime={post.publishedAt}>{dateLabel}</time>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
