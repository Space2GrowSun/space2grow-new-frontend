// TypeScript types for blog data returned from Sanity CMS.
// These match the shapes returned by the GROQ queries in src/lib/blogQueries.ts.

export interface SanityImageObject {
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alt?: string;
  caption?: string;
}

export interface SanityAuthorRef {
  name: string;
  role?: string;
  bio?: string;
  image?: SanityImageObject;
}

export interface SanityCategoryRef {
  title: string;
  slug: string;
  _id?: string;
}

/** Shape returned by ALL_POSTS_QUERY and RELATED_POSTS_QUERY (no body). */
export interface SanityPostCard {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: SanityImageObject;
  publishedAt: string;
  isFeatured?: boolean;
  tags?: string[];
  // Flattened author fields
  name: string;
  role?: string;
  image?: SanityImageObject;
  // Flattened category fields
  categoryTitle: string;
  categorySlug: string;
}

/** Shape returned by POST_BY_SLUG_QUERY (includes body). */
export interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: SanityImageObject;
  body: PortableTextBlock[];
  publishedAt: string;
  isFeatured?: boolean;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  socialImage?: SanityImageObject;
  author: SanityAuthorRef;
  category: SanityCategoryRef & { _id: string };
}

/** Shape returned by CATEGORIES_QUERY. */
export interface SanityCategory {
  _id: string;
  title: string;
  slug: string;
  description?: string;
}

// Portable Text block type (minimal — the full type comes from @portabletext/react)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PortableTextBlock = any;
