import React from 'react';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { getImageUrl, getImageSrcSet } from '../../lib/sanityImage';
import type { PortableTextBlock } from '../../types/blog';

interface BlogPostBodyProps {
  value: PortableTextBlock[];
}

/**
 * Portable Text renderer for article body content.
 *
 * Applies Space2Grow brand styles directly on each element rather than
 * relying on the Tailwind Typography prose plugin. This ensures consistent
 * appearance without extra dependencies.
 *
 * Security: never uses dangerouslySetInnerHTML. All content comes from
 * Sanity's structured data and is rendered via typed React components.
 */

/** Validates a link href before rendering it. */
function isSafeHref(href: string | undefined): boolean {
  if (!href) return false;
  // Allow relative paths, https, http, mailto, tel
  return /^(\/|https?:|mailto:|tel:)/i.test(href.trim());
}

const components: PortableTextComponents = {
  // ── Block styles ───────────────────────────────────────────────────────────
  block: {
    normal: ({ children }) => (
      <p className="text-gray-700 leading-relaxed mb-6 text-[1.0625rem]">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mt-12 mb-4 leading-snug font-heading">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold text-brand-dark mt-10 mb-3 leading-snug font-heading">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-accent pl-6 my-8 italic text-gray-600 text-lg leading-relaxed">
        {children}
      </blockquote>
    ),
  },

  // ── List styles ────────────────────────────────────────────────────────────
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-6 mb-6 space-y-2 text-gray-700 text-[1.0625rem] leading-relaxed">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-6 mb-6 space-y-2 text-gray-700 text-[1.0625rem] leading-relaxed">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },

  // ── Inline marks ──────────────────────────────────────────────────────────
  marks: {
    strong: ({ children }) => <strong className="font-bold text-brand-dark">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <u className="underline underline-offset-2">{children}</u>,

    link: ({ children, value }) => {
      const href: string | undefined = value?.href;
      if (!isSafeHref(href)) return <>{children}</>;

      const openInNewTab = Boolean(value?.openInNewTab);
      const isExternal = /^https?:/.test(href!);

      return (
        <a
          href={href}
          target={openInNewTab || isExternal ? '_blank' : undefined}
          rel={openInNewTab || isExternal ? 'noopener noreferrer' : undefined}
          className="text-[#356b60] underline underline-offset-2 hover:text-brand-dark transition-colors"
        >
          {children}
        </a>
      );
    },
  },

  // ── Custom block types ─────────────────────────────────────────────────────
  types: {
    image: ({ value }) => {
      // Gracefully skip images with no asset
      if (!value?.asset) return null;

      const src = getImageUrl(value, { width: 800, quality: 85 });
      const srcSet = getImageSrcSet(value, [400, 800, 1200]);
      const alt: string = value.alt || '';
      const caption: string | undefined = value.caption;

      return (
        <figure className="my-10">
          <img
            src={src}
            srcSet={srcSet || undefined}
            sizes="(max-width: 768px) 100vw, 800px"
            alt={alt}
            className="w-full rounded-2xl object-cover shadow-sm"
            loading="lazy"
            width={800}
          />
          {caption && (
            <figcaption className="mt-3 text-center text-sm text-gray-500 italic">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

/**
 * Renders Portable Text article body with Space2Grow brand styles.
 */
export function BlogPostBody({ value }: BlogPostBodyProps) {
  if (!value || value.length === 0) {
    return (
      <p className="text-gray-500 italic">This article has no content yet.</p>
    );
  }

  return (
    <div className="max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}
