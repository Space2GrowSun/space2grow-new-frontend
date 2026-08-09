import { defineType, defineArrayMember } from 'sanity';

/**
 * Portable Text definition for the post body.
 *
 * Intentionally minimal — matches the Medium toolbar:
 *   Styles:      Paragraph · Heading · Sub-heading · Quote
 *   Formatting:  Bold · Italic
 *   Annotations: Link
 *   Blocks:      Inline image
 */
export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    // ── Text blocks ────────────────────────────────────────────────────
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Paragraph', value: 'normal' },
        { title: 'Heading', value: 'h2' },
        { title: 'Sub-heading', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet list', value: 'bullet' },
        { title: 'Numbered list', value: 'number' },
      ],
      marks: {
        // Keep only essentials — no underline (not a Medium affordance)
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
        annotations: [
          {
            title: 'Link',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                description:
                  'Paste a full web address (https://…), email (mailto:…), or a page path (/blog).',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                    allowRelative: true,
                  }).warning('Enter a valid URL, email address, or page path.'),
              },
              {
                title: 'Open in new tab',
                name: 'openInNewTab',
                type: 'boolean',
                description: 'Turn on for links to external websites.',
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),

    // ── Inline image blocks ────────────────────────────────────────────
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Image description',
          description: 'Briefly describe what is in the image (used by screen readers).',
          validation: (Rule) =>
            Rule.required().error('Please add a short description for this image.'),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption (optional)',
          description: 'Appears beneath the image in the article.',
        },
      ],
    }),
  ],
});
