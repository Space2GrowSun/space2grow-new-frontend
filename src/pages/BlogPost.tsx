import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import SEO from '../components/SEO';
import { BlogPostBody } from '../components/blog/BlogPostBody';
import { BlogCard } from '../components/blog/BlogCard';
import { BlogErrorState } from '../components/blog/BlogErrorState';
import { BlogPostSkeleton } from '../components/blog/LoadingSkeleton';
import { getPostBySlug, getRelatedPosts } from '../lib/blogApi';
import { isSanityConfigured } from '../lib/sanityClient';
import { getImageUrl } from '../lib/sanityImage';
import { formatFullDate, toISODateString } from '../utils/formatDate';
import { calculateReadingTime } from '../utils/calculateReadingTime';
import type { SanityPost, SanityPostCard } from '../types/blog';

/**
 * Blog article page (/blog/:slug).
 * Reads the full post from Sanity CMS including Portable Text body.
 * Preserves the existing Space2Grow article design.
 */
export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const [post, setPost] = useState<SanityPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<SanityPostCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // ── Data fetching ──────────────────────────────────────────────────────────
  const loadPost = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    setNotFound(false);

    try {
      const fetchedPost = await getPostBySlug(slug);

      if (!fetchedPost) {
        setNotFound(true);
        return;
      }

      setPost(fetchedPost);

      // Load related posts (non-critical — failure degrades gracefully)
      if (fetchedPost.category?._id) {
        const related = await getRelatedPosts(fetchedPost.category._id, fetchedPost._id);
        setRelatedPosts(related);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load article.'));
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    void loadPost();
  }, [loadPost]);

  // ── Config error ───────────────────────────────────────────────────────────
  if (!isSanityConfigured) {
    return <BlogErrorState context="article" />;
  }

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return <BlogPostSkeleton />;
  }

  // ── Not found ─────────────────────────────────────────────────────────────
  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center py-24">
        <SEO
          title="Post Not Found - A Space to Grow"
          description="The requested blog post could not be found."
        />
        <h1 className="text-4xl font-bold text-brand-dark mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-8">
          The story you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/blog"
          className="bg-brand-accent hover:bg-opacity-90 text-brand-dark font-medium py-3 px-8 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
        >
          Return to Blog
        </Link>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (error) {
    return <BlogErrorState error={error} onRetry={loadPost} context="article" />;
  }

  // ── Null guard (satisfies TypeScript after above checks) ───────────────────
  if (!post) return null;

  // ── Derived values ─────────────────────────────────────────────────────────
  const pageTitle = (post.seoTitle || post.title) + ' - A Space to Grow';
  const metaDescription = post.seoDescription || post.excerpt;
  const featuredImageUrl = getImageUrl(post.featuredImage, { width: 1200, height: 630 });
  const socialImageUrl = post.socialImage
    ? getImageUrl(post.socialImage, { width: 1200, height: 630 })
    : featuredImageUrl;

  const readingTime = calculateReadingTime(post.body);
  const dateLabel = formatFullDate(post.publishedAt);
  const isoDate = toISODateString(post.publishedAt);
  const authorImageUrl = post.author?.image
    ? getImageUrl(post.author.image, { width: 96, height: 96 })
    : null;

  return (
    <div className="w-full">
      <SEO
        title={pageTitle}
        description={metaDescription}
        ogImage={socialImageUrl}
        publishedAt={isoDate}
        canonicalPath={`/blog/${post.slug}`}
      />

      <article itemScope itemType="https://schema.org/Article">
        <div className="pt-8 pb-24">

          {/* Breadcrumb nav */}
          <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-6 mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li>
                <Link to="/" className="hover:text-brand-dark transition-colors">Home</Link>
              </li>
              <li aria-hidden="true" className="text-gray-300">/</li>
              <li>
                <Link to="/blog" className="inline-flex items-center gap-1.5 hover:text-brand-dark transition-colors">
                  <ArrowLeft size={14} aria-hidden="true" />
                  Back to Stories
                </Link>
              </li>
            </ol>
          </nav>

          {/* Article header */}
          <header className="max-w-4xl mx-auto px-6 mb-12">

            {/* Category badge */}
            {post.category?.title && (
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-[#E8F3E5] text-brand-dark text-xs font-bold tracking-wider rounded-md">
                  {post.category.title.toUpperCase()}
                </span>
              </div>
            )}

            {/* Title */}
            <h1
              itemProp="headline"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-8 leading-tight"
            >
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-500 mb-8 leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>

            {/* Author + date + reading time */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 border-b border-gray-200 pb-8">
              {/* Author */}
              <div className="flex items-center gap-3">
                {authorImageUrl ? (
                  <img
                    src={authorImageUrl}
                    alt={post.author?.image?.alt || post.author?.name || ''}
                    className="w-12 h-12 rounded-full object-cover"
                    itemProp="image"
                    width={48}
                    height={48}
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <span className="text-brand-dark font-bold">
                      {post.author?.name?.charAt(0) || '?'}
                    </span>
                  </div>
                )}
                <div itemProp="author" itemScope itemType="https://schema.org/Person">
                  <p className="font-bold text-brand-dark" itemProp="name">
                    {post.author?.name}
                  </p>
                  {post.author?.role && (
                    <p className="text-sm text-gray-500" itemProp="jobTitle">
                      {post.author.role}
                    </p>
                  )}
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-gray-200" aria-hidden="true" />

              {/* Published date */}
              <div className="flex items-center gap-2 text-sm font-medium">
                <Calendar size={18} className="text-gray-400" aria-hidden="true" />
                <time dateTime={isoDate} itemProp="datePublished">
                  {dateLabel}
                </time>
              </div>

              {/* Reading time */}
              {readingTime > 0 && (
                <>
                  <div className="hidden sm:block w-px h-10 bg-gray-200" aria-hidden="true" />
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <Clock size={18} className="text-gray-400" aria-hidden="true" />
                    {readingTime} min read
                  </div>
                </>
              )}
            </div>
          </header>

          {/* Featured image */}
          <div className="max-w-6xl mx-auto px-6 mb-16">
            <div className="rounded-[2rem] overflow-hidden aspect-[21/9] bg-gray-100 max-h-[600px]">
              {featuredImageUrl ? (
                <img
                  src={featuredImageUrl}
                  alt={post.featuredImage?.alt || post.title}
                  className="w-full h-full object-cover"
                  fetchPriority="high"
                  itemProp="image"
                  width={1200}
                  height={514}
                />
              ) : (
                <div className="w-full h-full bg-[#E8F3E5]" aria-hidden="true" />
              )}
            </div>
            {post.featuredImage?.caption && (
              <p className="mt-3 text-center text-sm text-gray-500 italic">
                {post.featuredImage.caption}
              </p>
            )}
          </div>

          {/* Article body */}
          <div className="max-w-3xl mx-auto px-6" itemProp="articleBody">
            <BlogPostBody value={post.body} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="max-w-3xl mx-auto px-6 mt-12">
              <div className="flex flex-wrap items-center gap-2">
                <Tag size={14} className="text-gray-400" aria-hidden="true" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#E8F3E5] text-brand-dark text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Article footer */}
          <div className="max-w-3xl mx-auto px-6 mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Share links */}
              <div className="flex items-center gap-4">
                <span className="font-bold text-brand-dark">Share this story:</span>
                <div className="flex gap-2">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#E8F3E5] hover:text-[#356b60] transition-colors text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on X (Twitter)"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#E8F3E5] hover:text-[#356b60] transition-colors text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#E8F3E5] hover:text-[#356b60] transition-colors text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                  </a>
                </div>
              </div>

              <Link
                to="/blog"
                className="bg-[#356b60] hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#356b60] focus-visible:ring-offset-2"
              >
                More Stories
              </Link>
            </div>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section
              aria-labelledby="related-posts-heading"
              className="max-w-7xl mx-auto px-6 mt-20"
            >
              <h2
                id="related-posts-heading"
                className="text-2xl font-bold text-brand-dark mb-8"
              >
                More Stories
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((related) => (
                  <BlogCard key={related._id} post={related} />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </div>
  );
}
