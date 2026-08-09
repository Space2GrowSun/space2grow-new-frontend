/**
 * Sanity image URL builder helper.
 * Provides a typed, consistent way to generate responsive image URLs
 * from Sanity image objects throughout the blog.
 */
import imageUrlBuilder from '@sanity/image-url';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SanityImageSource = any;
import { sanityClient } from './sanityClient';

// The builder is safe to create with a null client — it will produce
// unusable (empty) URLs, but will not crash. Error states in components
// guard against this.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const builder = sanityClient ? imageUrlBuilder(sanityClient as any) : null;

/**
 * Returns an image URL builder instance for chaining.
 * Returns null when Sanity is not configured or source is missing.
 */
export function urlFor(source: SanityImageSource | null | undefined) {
  if (!builder || !source) return null;
  return builder.image(source);
}

interface ImageUrlOptions {
  width?: number;
  height?: number;
  quality?: number;
}

/**
 * Generates a responsive image URL with sensible defaults.
 *
 * @param source  - Sanity image object (from GROQ query result)
 * @param options - Optional width, height, and quality overrides
 * @returns       - Absolute image URL string, or empty string on failure
 */
export function getImageUrl(
  source: SanityImageSource | null | undefined,
  options: ImageUrlOptions = {},
): string {
  const ref = urlFor(source);
  if (!ref) return '';

  const { width, height, quality = 80 } = options;

  let url = ref.auto('format').quality(quality).fit('crop');

  if (width) url = url.width(width);
  if (height) url = url.height(height);

  return url.url();
}

/**
 * Generates a srcSet string for responsive images.
 * Provide an array of widths and the function returns a srcSet value.
 */
export function getImageSrcSet(
  source: SanityImageSource | null | undefined,
  widths: number[],
  quality = 75,
): string {
  const ref = urlFor(source);
  if (!ref) return '';

  return widths
    .map((w) => `${ref.auto('format').quality(quality).width(w).url()} ${w}w`)
    .join(', ');
}
