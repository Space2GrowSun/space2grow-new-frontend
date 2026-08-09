import { defineField, defineType } from 'sanity';

/**
 * Post document — minimal Medium-style editing.
 *
 * Article tab:    Title · Cover image · Body
 * Publishing tab: Author · Category · Tags · Publish date · Slug
 */
export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',

  groups: [
    { name: 'article', title: 'Article', default: true },
    { name: 'publishing', title: 'Publishing' },
  ],

  // ── Field ordering displayed to editors ──────────────────────────
  orderings: [
    {
      title: 'Publication date, newest first',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Publication date, oldest first',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Title, A–Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],

  fields: [
    // ── ARTICLE — writing-first order ────────────────────────────────

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'article',
      description: 'The headline of your article.',
      validation: (Rule) =>
        Rule.required()
          .min(5)
          .max(100)
          .error('Title must be between 5 and 100 characters.'),
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      group: 'article',
      rows: 2,
      description: 'A brief 1-2 sentence summary shown on post list cards and search results.',
    }),


    defineField({
      name: 'featuredImage',
      title: 'Cover image',
      type: 'image',
      group: 'article',
      description: 'The main image shown at the top of your article.',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Image description',
          description: 'Briefly describe what is in the image (used by screen readers).',
          validation: (Rule) =>
            Rule.required().error('Please add a short image description.'),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption (optional)',
          description: 'Appears beneath the image in the article.',
        },
      ],
      validation: (Rule) => Rule.required().error('A cover image is required.'),
    }),

    defineField({
      name: 'body',
      title: 'Article content',
      type: 'blockContent',
      group: 'article',
      validation: (Rule) => Rule.required().error('Article content cannot be empty.'),
    }),

    // ── PUBLISHING ───────────────────────────────────────────────────

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'publishing',
      description: 'Who wrote this article? Add authors from the Authors section first.',
      validation: (Rule) => Rule.required().error('An author is required.'),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'publishing',
      description: 'Which topic does this article belong to?',
      validation: (Rule) => Rule.required().error('A category is required.'),
    }),

    defineField({
      name: 'tags',
      title: 'Tags (optional)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'publishing',
      description: 'Add keywords to help readers find related content.',
      options: {
        layout: 'tags',
      },
    }),

    defineField({
      name: 'publishedAt',
      title: 'Publish date',
      type: 'datetime',
      group: 'publishing',
      description: 'When was (or will) this article be published?',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error('A publish date is required.'),
    }),

    defineField({
      name: 'slug',
      title: 'Page address (URL)',
      type: 'slug',
      group: 'publishing',
      description:
        'The URL for this article. Click "Generate" to create it from the title. Avoid changing this after publishing.',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required().error('A page address is required.'),
    }),


  ],

  // ── Dashboard list preview ──────────────────────────────────────
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      authorName: 'author.name',
      categoryTitle: 'category.title',
      publishedAt: 'publishedAt',
    },
    prepare({ title, media, authorName, categoryTitle, publishedAt }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        : 'No date';

      return {
        title: title || 'Untitled',
        subtitle: [categoryTitle, authorName, date].filter(Boolean).join(' · '),
        media,
      };
    },
  },
});
