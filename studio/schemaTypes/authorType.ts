import { defineField, defineType } from 'sanity';

/**
 * Author document — stores writer profile used across blog posts.
 */
export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      description: 'Click "Generate" to create automatically from the name.',
      options: { source: 'name', maxLength: 80 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'role',
      title: 'Role or job title (optional)',
      type: 'string',
      description: 'For example: Sustainability Officer, Trustee.',
    }),

    defineField({
      name: 'image',
      title: 'Photograph (optional)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Describe the photo for screen reader users.',
          // Required only when the image exists — enforced in the UI and
          // checked in the post body via blockContent validation.
          validation: (Rule) => Rule.required().error('Please add a short description of this photograph.'),
        },
      ],
    }),

    defineField({
      name: 'bio',
      title: 'Short biography (optional)',
      type: 'text',
      rows: 3,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },

  orderings: [
    {
      title: 'Name, A–Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
});
