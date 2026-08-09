/**
 * Read-only Sanity client for the public React frontend.
 *
 * Security rules:
 * - No write token is included or exposed.
 * - Only published content is requested (perspective: 'published').
 * - All configuration comes from VITE_ environment variables.
 * - An early warning is logged when required variables are absent.
 */
import { createClient, type SanityClient } from '@sanity/client';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || 'production';
const apiVersion =
  (import.meta.env.VITE_SANITY_API_VERSION as string | undefined) || '2026-07-01';

/** True when the required environment variables are present. */
export const isSanityConfigured = Boolean(projectId);

let _client: SanityClient | null = null;

if (isSanityConfigured) {
  _client = createClient({
    projectId: projectId!,
    dataset,
    apiVersion,
    useCdn: true,          // serve published content from the global CDN
    perspective: 'published', // never serve draft documents to the public site
  });
} else {
  // Warn clearly in development; production builds will surface error states.
  console.warn(
    '[Space2Grow] Sanity CMS is not configured.\n' +
      'Add VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET to your .env file.\n' +
      'Copy .env.example to .env to get started.',
  );
}

export const sanityClient: SanityClient | null = _client;
