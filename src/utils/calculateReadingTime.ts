import type { PortableTextBlock } from '../types/blog';

const WORDS_PER_MINUTE = 200;

/**
 * Calculates an estimated reading time in minutes from Portable Text blocks.
 * Returns at least 1 minute.
 *
 * @param blocks - Array of Portable Text block objects from Sanity
 */
export function calculateReadingTime(blocks: PortableTextBlock[] | undefined | null): number {
  if (!blocks || blocks.length === 0) return 1;

  const wordCount = blocks
    .filter((block): block is PortableTextBlock =>
      block !== null && typeof block === 'object' && block._type === 'block',
    )
    .flatMap((block) =>
      (block.children ?? []).map((child: { text?: string }) => child.text ?? ''),
    )
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
