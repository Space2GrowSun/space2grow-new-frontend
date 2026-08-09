import React, { useState, useEffect, useCallback } from 'react';
import SEO from '../components/SEO';
import { BlogHero, BlogHeroFallback } from '../components/blog/BlogHero';
import { BlogFilters } from '../components/blog/BlogFilters';
import { BlogGrid } from '../components/blog/BlogGrid';
import { BlogEmptyState } from '../components/blog/BlogEmptyState';
import { BlogErrorState } from '../components/blog/BlogErrorState';
import { BlogGridSkeleton, BlogHeroSkeleton } from '../components/blog/LoadingSkeleton';
import { getAllPosts, getFeaturedPost, getCategories } from '../lib/blogApi';
import { isSanityConfigured } from '../lib/sanityClient';
import type { SanityPostCard, SanityCategory } from '../types/blog';

const ALL_LABEL = 'All Stories';

/**
 * Blog listing page (/blog).
 * Reads published posts from Sanity CMS.
 * Preserves the existing Space2Grow hero + category filter + grid design.
 */
export default function Blog() {
  const [posts, setPosts] = useState<SanityPostCard[]>([]);
  const [featuredPost, setFeaturedPost] = useState<SanityPostCard | null>(null);
  const [categories, setCategories] = useState<SanityCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Filter state
  const [activeCategory, setActiveCategory] = useState<string>(ALL_LABEL);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // ── Data fetching ──────────────────────────────────────────────────────────
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [allPosts, featured, cats] = await Promise.all([
        getAllPosts(),
        getFeaturedPost(),
        getCategories(),
      ]);
      setPosts(allPosts);
      setFeaturedPost(featured);
      setCategories(cats);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load blog posts.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  // ── Filtering ──────────────────────────────────────────────────────────────
  const filteredPosts = posts.filter((post) => {
    // Category match
    const categoryMatch =
      activeCategory === ALL_LABEL ||
      post.categoryTitle?.toLowerCase() === activeCategory.toLowerCase();

    // Search match — case-insensitive, trims whitespace
    const q = searchQuery.trim().toLowerCase();
    const searchMatch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q);

    return categoryMatch && searchMatch;
  });

  const hasActiveFilters = activeCategory !== ALL_LABEL || searchQuery.trim().length > 0;

  const handleClearFilters = () => {
    setActiveCategory(ALL_LABEL);
    setSearchQuery('');
  };

  // ── Early config error ─────────────────────────────────────────────────────
  if (!isSanityConfigured) {
    return (
      <div className="w-full">
        <SEO
          title="Blog & News - A Space to Grow"
          description="Read our latest stories, event announcements, and community updates from A Space to Grow."
        />
        <BlogErrorState context="listing" />
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="w-full">
      <SEO
        title="Blog & News - A Space to Grow"
        description="Read our latest stories, event announcements, and community updates from A Space to Grow."
      />

      {/* Hero / Featured post */}
      {loading ? (
        <BlogHeroSkeleton />
      ) : featuredPost ? (
        <BlogHero post={featuredPost} />
      ) : (
        <BlogHeroFallback />
      )}

      {/* Main content */}
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-6 mb-24">

          {/* Error state */}
          {error && !loading && (
            <BlogErrorState error={error} onRetry={loadData} context="listing" />
          )}

          {/* Filters — shown only when we have data */}
          {!loading && !error && (
            <BlogFilters
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClear={handleClearFilters}
              totalResults={filteredPosts.length}
            />
          )}

          {/* Loading skeleton */}
          {loading && <BlogGridSkeleton />}

          {/* Empty state */}
          {!loading && !error && filteredPosts.length === 0 && (
            <BlogEmptyState
              hasActiveFilters={hasActiveFilters}
              onClearFilters={handleClearFilters}
            />
          )}

          {/* Post grid */}
          {!loading && !error && filteredPosts.length > 0 && (
            <BlogGrid posts={filteredPosts} />
          )}
        </div>
      </main>
    </div>
  );
}
