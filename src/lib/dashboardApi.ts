/**
 * dashboardApi.ts
 *
 * Extended data-access layer for the Space2Grow admin dashboard.
 * All functions use the write-capable client so that mutations are possible.
 * NEVER import this in public-facing pages.
 */
import { writeClient } from './sanityWriteClient';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface DashboardPost {
  _id: string;
  _updatedAt: string;
  title: string;
  slug?: { current: string };
  excerpt?: string;
  publishedAt?: string;
  status: 'published' | 'scheduled' | 'draft' | 'review';
  isDraft: boolean;
  isScheduled: boolean;
  authorName?: string;
  authorImage?: string;
  categoryTitle?: string;
  categoryColor?: string;
  featuredImageUrl?: string;
}

export interface DashboardAuthor {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
  postCount: number;
}

export interface DashboardCategory {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  postCount: number;
}

export interface DashboardAsset {
  _id: string;
  _updatedAt: string;
  originalFilename: string;
  url: string;
  mimeType: string;
  size: number;
  metadata?: {
    dimensions?: { width: number; height: number };
    altText?: string;
  };
}

export interface DashboardStats {
  total: number;
  published: number;
  drafts: number;
  scheduled: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function requireClient() {
  if (!writeClient) throw new Error('Dashboard not configured — missing write token.');
  return writeClient;
}

function deriveStatus(doc: {
  publishedAt?: string;
  isDraft: boolean;
  isScheduled: boolean;
}): DashboardPost['status'] {
  if (doc.isDraft) return 'draft';
  if (doc.isScheduled) return 'scheduled';
  if (doc.publishedAt) return 'published';
  return 'draft';
}

// ── Queries ───────────────────────────────────────────────────────────────────

/** All posts (drafts + published) with metadata for the dashboard table. */
export async function getDashboardPosts(): Promise<DashboardPost[]> {
  const client = requireClient();
  const raw = await client.fetch<
    Array<{
      _id: string;
      _updatedAt: string;
      title: string;
      slug?: { current: string };
      excerpt?: string;
      publishedAt?: string;
      isDraft: boolean;
      scheduledAt?: string;
      authorName?: string;
      authorImageUrl?: string;
      categoryTitle?: string;
      featuredImageUrl?: string;
    }>
  >(
    `*[_type == "post"] | order(_updatedAt desc) {
      _id,
      _updatedAt,
      title,
      slug,
      excerpt,
      publishedAt,
      "isDraft": _id in path("drafts.**"),
      "scheduledAt": scheduledPublishAt,
      "authorName": author->name,
      "authorImageUrl": author->image.asset->url,
      "categoryTitle": coalesce(category->title, categories[0]->title),
      "featuredImageUrl": featuredImage.asset->url
    }`,
  );

  // Group by base ID so draft versions take precedence over published copies
  const map = new Map<string, (typeof raw)[0]>();
  for (const item of raw) {
    const baseId = item._id.replace(/^drafts\./, '');
    const existing = map.get(baseId);
    if (!existing || item.isDraft) {
      map.set(baseId, item);
    }
  }

  return Array.from(map.values()).map((r) => {
    const isScheduled = Boolean(r.scheduledAt && !r.publishedAt && !r.isDraft);
    return {
      ...r,
      status: deriveStatus({ publishedAt: r.publishedAt, isDraft: r.isDraft, isScheduled }),
      isScheduled,
      authorImage: r.authorImageUrl,
    };
  });
}

/** Dashboard stats (counts per status). */
export async function getDashboardStats(): Promise<DashboardStats> {
  const client = requireClient();
  const [total, published, scheduled] = await Promise.all([
    client.fetch<number>(`count(*[_type == "post"])`),
    client.fetch<number>(`count(*[_type == "post" && defined(publishedAt) && !(_id in path("drafts.**"))])`),
    client.fetch<number>(`count(*[_type == "post" && defined(scheduledPublishAt) && !(_id in path("drafts.**"))])`),
  ]);
  return {
    total,
    published,
    scheduled,
    drafts: total - published - scheduled,
  };
}

/** All authors with their post counts. */
export async function getDashboardAuthors(): Promise<DashboardAuthor[]> {
  const client = requireClient();
  return client.fetch<DashboardAuthor[]>(
    `*[_type == "author"] | order(name asc) {
      _id,
      name,
      role,
      bio,
      "imageUrl": image.asset->url,
      "postCount": count(*[_type == "post" && references(^._id)])
    }`,
  );
}

/** All categories with post counts. */
export async function getDashboardCategories(): Promise<DashboardCategory[]> {
  const client = requireClient();
  return client.fetch<DashboardCategory[]>(
    `*[_type == "category"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      "postCount": count(*[_type == "post" && references(^._id)])
    }`,
  );
}

/** All image assets uploaded to Sanity. */
export async function getDashboardAssets(): Promise<DashboardAsset[]> {
  const client = requireClient();
  return client.fetch<DashboardAsset[]>(
    `*[_type == "sanity.imageAsset"] | order(_updatedAt desc) {
      _id,
      _updatedAt,
      originalFilename,
      url,
      mimeType,
      size,
      metadata {
        dimensions { width, height },
        "altText": exif.ImageDescription
      }
    }`,
  );
}

/** Recent activity — last N updated posts. */
export async function getRecentActivity(limit = 5): Promise<DashboardPost[]> {
  const posts = await getDashboardPosts();
  return posts.slice(0, limit);
}

// ── Mutations ─────────────────────────────────────────────────────────────────

/** Hard-delete a post (both draft and published). */
export async function deletePost(id: string): Promise<void> {
  const client = requireClient();
  // Delete draft version if it exists
  const draftId = id.startsWith('drafts.') ? id : `drafts.${id}`;
  const baseId = id.startsWith('drafts.') ? id.replace('drafts.', '') : id;
  await Promise.allSettled([client.delete(draftId), client.delete(baseId)]);
}

/** Upload an image file to Sanity and return the asset document. */
export async function uploadAsset(file: File): Promise<DashboardAsset> {
  const client = requireClient();
  const asset = await client.assets.upload('image', file, {
    filename: file.name,
  });
  return {
    _id: asset._id,
    _updatedAt: asset._updatedAt,
    originalFilename: asset.originalFilename ?? file.name,
    url: asset.url,
    mimeType: asset.mimeType,
    size: asset.size,
    metadata: {
      dimensions: asset.metadata?.dimensions
        ? { width: asset.metadata.dimensions.width, height: asset.metadata.dimensions.height }
        : undefined,
    },
  };
}
