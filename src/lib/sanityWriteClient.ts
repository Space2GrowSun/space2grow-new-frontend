/**
 * Write-capable Sanity client for the creator dashboard.
 *
 * NEVER import this in public-facing pages — it contains a write token.
 * Only used inside src/pages/dashboard/.
 */
import { createClient, type SanityClient } from '@sanity/client';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || 'production';
const apiVersion =
  (import.meta.env.VITE_SANITY_API_VERSION as string | undefined) || '2026-07-01';
const writeToken = import.meta.env.VITE_SANITY_WRITE_TOKEN as string | undefined;

export const isDashboardConfigured = Boolean(projectId && writeToken);

let _writeClient: SanityClient | null = null;

if (isDashboardConfigured) {
  _writeClient = createClient({
    projectId: projectId!,
    dataset,
    apiVersion,
    useCdn: false,       // always hit the API directly for writes
    token: writeToken,   // Editor-level token from sanity.io/manage
    perspective: 'raw',  // ensure draft documents are included in queries
  });
} else {
  console.warn(
    '[Dashboard] Missing VITE_SANITY_PROJECT_ID or VITE_SANITY_WRITE_TOKEN.\n' +
      'Add them to your .env file to enable the creator dashboard.',
  );
}

export const writeClient: SanityClient | null = _writeClient;

/** Slugify a title the same way the Sanity schema does. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 96);
}
