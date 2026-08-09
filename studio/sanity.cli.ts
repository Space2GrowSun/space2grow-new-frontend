/**
 * Sanity Studio CLI configuration.
 * Used by the Sanity CLI for project identification and dataset selection.
 *
 * Set SANITY_STUDIO_PROJECT_ID in studio/.env before running:
 *   cd studio && npm run dev
 */
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
});
