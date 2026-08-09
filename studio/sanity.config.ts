/**
 * Sanity Studio configuration for Space2Grow.
 *
 * Setup steps:
 *  1. Create a project at https://sanity.io/manage
 *  2. Copy studio/.env.example to studio/.env
 *  3. Set SANITY_STUDIO_PROJECT_ID in studio/.env
 *  4. Run: cd studio && npm install && npm run dev
 */
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { structure } from './structure/structure';

export default defineConfig({
  name: 'space2grow',
  title: 'Space2Grow Content',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    // Main content editing tool with the custom navigation structure
    structureTool({ structure }),

    // GROQ query explorer — useful during development
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
