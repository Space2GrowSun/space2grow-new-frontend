/**
 * All GROQ queries for the Space2Grow blog.
 * Keep all queries centralised here — never scatter fetch strings across components.
 *
 * Conventions:
 * - Only published documents are returned (publishedAt <= now()).
 * - Listing queries never fetch the full body to keep payloads small.
 * - Image fields always include asset, hotspot, crop, alt, and caption.
 */

// ── Reusable field fragments ──────────────────────────────────────────────────

const IMAGE_FIELDS = `
  asset,
  hotspot,
  crop,
  alt,
  caption
`;

/** Fields flattened from the author reference — avoids deep nesting in components. */
const AUTHOR_FIELDS = `
  "name": author->name,
  "role": author->role,
  "image": author->image { ${IMAGE_FIELDS} }
`;

/** Fields flattened from the category reference. */
const CATEGORY_FIELDS = `
  "categoryTitle": category->title,
  "categorySlug": category->slug.current
`;

// ── Queries ───────────────────────────────────────────────────────────────────

/**
 * Returns all published posts, newest first.
 * Does NOT include the body — use POST_BY_SLUG_QUERY for the full article.
 */
export const ALL_POSTS_QUERY = `
  *[
    _type == "post"
    && defined(slug.current)
    && dateTime(publishedAt) <= dateTime(now())
  ] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "featuredImage": featuredImage { ${IMAGE_FIELDS} },
    publishedAt,
    isFeatured,
    tags,
    ${AUTHOR_FIELDS},
    ${CATEGORY_FIELDS}
  }
`;

/**
 * Returns the single most recent featured published post.
 * Used in the blog hero section.
 */
export const FEATURED_POST_QUERY = `
  *[
    _type == "post"
    && isFeatured == true
    && defined(slug.current)
    && dateTime(publishedAt) <= dateTime(now())
  ] | order(publishedAt desc)[0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "featuredImage": featuredImage { ${IMAGE_FIELDS} },
    publishedAt,
    isFeatured,
    tags,
    ${AUTHOR_FIELDS},
    ${CATEGORY_FIELDS}
  }
`;

/**
 * Returns a single published post by slug, including the full body.
 * @param $slug - the slug.current value from the URL parameter
 */
export const POST_BY_SLUG_QUERY = `
  *[
    _type == "post"
    && slug.current == $slug
    && dateTime(publishedAt) <= dateTime(now())
  ][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "featuredImage": featuredImage { ${IMAGE_FIELDS} },
    body,
    publishedAt,
    isFeatured,
    tags,
    seoTitle,
    seoDescription,
    "socialImage": socialImage { ${IMAGE_FIELDS} },
    "author": {
      "name": author->name,
      "role": author->role,
      "bio": author->bio,
      "image": author->image { ${IMAGE_FIELDS} }
    },
    "category": {
      "_id": category->_id,
      "title": category->title,
      "slug": category->slug.current
    }
  }
`;

/**
 * Returns up to three published posts in the same category, excluding the current post.
 * @param $categoryId    - the _id of the category document
 * @param $currentPostId - the _id of the post to exclude
 */
export const RELATED_POSTS_QUERY = `
  *[
    _type == "post"
    && category._ref == $categoryId
    && _id != $currentPostId
    && defined(slug.current)
    && dateTime(publishedAt) <= dateTime(now())
  ] | order(publishedAt desc)[0..2] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "featuredImage": featuredImage { ${IMAGE_FIELDS} },
    publishedAt,
    ${AUTHOR_FIELDS},
    ${CATEGORY_FIELDS}
  }
`;

/**
 * Returns all categories, alphabetically ordered.
 */
export const CATEGORIES_QUERY = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
`;
