/**
 * Data access layer for the Space2Grow blog.
 * All Sanity fetches are made here — never scattered across components.
 *
 * Each function:
 *  - Checks that Sanity is configured before fetching.
 *  - Wraps the request in try/catch and surfaces a clear error.
 *  - Returns typed data from the GROQ queries.
 */
import { sanityClient, isSanityConfigured } from './sanityClient';
import {
  ALL_POSTS_QUERY,
  FEATURED_POST_QUERY,
  POST_BY_SLUG_QUERY,
  RELATED_POSTS_QUERY,
  CATEGORIES_QUERY,
} from './blogQueries';
import type { SanityPostCard, SanityPost, SanityCategory } from '../types/blog';

// ── Error type ────────────────────────────────────────────────────────────────

/** Thrown when the Sanity environment variables are missing. */
export class SanityConfigError extends Error {
  constructor() {
    super(
      'Sanity CMS is not configured.\n' +
        'Copy .env.example to .env and add your VITE_SANITY_PROJECT_ID.',
    );
    this.name = 'SanityConfigError';
  }
}

// ── Private helper ────────────────────────────────────────────────────────────

function requireClient() {
  if (!isSanityConfigured || !sanityClient) {
    throw new SanityConfigError();
  }
  return sanityClient;
}

// ── Public functions ──────────────────────────────────────────────────────────

/** Returns all published posts ordered newest first (no body). */
export async function getAllPosts(): Promise<SanityPostCard[]> {
  const client = requireClient();
  try {
    return await client.fetch<SanityPostCard[]>(ALL_POSTS_QUERY);
  } catch (error) {
    console.error('[blogApi] getAllPosts failed:', error);
    throw new Error('Could not load blog posts. Please try again.');
  }
}

/**
 * Returns the newest published post marked as featured.
 * Returns null when no featured post exists.
 */
export async function getFeaturedPost(): Promise<SanityPostCard | null> {
  const client = requireClient();
  try {
    return await client.fetch<SanityPostCard | null>(FEATURED_POST_QUERY);
  } catch (error) {
    console.error('[blogApi] getFeaturedPost failed:', error);
    throw new Error('Could not load the featured post. Please try again.');
  }
}

/**
 * Returns a single published post by its slug, including the full body.
 * Returns null when the slug does not match any published post.
 */
export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  const client = requireClient();
  try {
    return await client.fetch<SanityPost | null>(POST_BY_SLUG_QUERY, { slug });
  } catch (error) {
    console.error(`[blogApi] getPostBySlug("${slug}") failed:`, error);
    throw new Error('Could not load this article. Please try again.');
  }
}

/**
 * Returns up to three published posts in the same category, excluding the current post.
 * Returns an empty array on failure rather than surfacing an error (related posts are optional).
 */
export async function getRelatedPosts(
  categoryId: string,
  currentPostId: string,
): Promise<SanityPostCard[]> {
  const client = requireClient();
  try {
    return await client.fetch<SanityPostCard[]>(RELATED_POSTS_QUERY, {
      categoryId,
      currentPostId,
    });
  } catch (error) {
    console.error('[blogApi] getRelatedPosts failed:', error);
    return []; // Non-critical — degrade gracefully
  }
}

/** Returns all categories ordered alphabetically. */
export async function getCategories(): Promise<SanityCategory[]> {
  const client = requireClient();
  try {
    return await client.fetch<SanityCategory[]>(CATEGORIES_QUERY);
  } catch (error) {
    console.error('[blogApi] getCategories failed:', error);
    return []; // Non-critical — listing still works without category filters
  }
}
