/**
 * Sanity Studio navigation structure for Space2Grow.
 *
 * Flat, distraction-free sidebar — like Medium's compose interface:
 *   Space2Grow Content
 *   ├── Blog Posts   (all posts, newest first)
 *   ├── ─── (divider)
 *   ├── Categories
 *   └── Authors
 *
 * Draft vs. published status is shown visually by Sanity itself —
 * no need for separate sub-folders that add navigation friction.
 */
import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Space2Grow Content')
    .items([
      // ── Blog Posts ────────────────────────────────────────────────
      S.listItem()
        .title('Blog Posts')
        .schemaType('post')
        .child(
          S.documentTypeList('post')
            .title('Blog Posts')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
        ),

      S.divider(),

      // ── Categories ────────────────────────────────────────────────
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),

      // ── Authors ───────────────────────────────────────────────────
      S.listItem()
        .title('Authors')
        .schemaType('author')
        .child(S.documentTypeList('author').title('Authors')),
    ]);

