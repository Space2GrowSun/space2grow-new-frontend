import { defineField, defineType } from 'sanity';

/**
 * Category document — used to group and filter blog posts.
 */
export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category title',
      type: 'string',
      description: 'For example: Events, Community, Environment, News.',
      validation: (Rule) => Rule.required().min(1).max(80),
    }),

    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      description: 'Click "Generate" to create automatically from the title.',
      options: { source: 'title', maxLength: 80 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description (optional)',
      type: 'text',
      rows: 2,
      description: 'A short sentence about this category.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },

  orderings: [
    {
      title: 'Title, A–Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});
