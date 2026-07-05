### PR Summary

This pull request addresses several critical routing, content, and media rendering improvements for the "A Space to Grow" application:

**Routing & Infrastructure**
* **Vercel SPA Fix**: Added a `vercel.json` configuration file with a rewrite rule to redirect all unhandled paths to `/index.html`. This fixes the 404 error bug when reloading pages (other than the home page) in production on Vercel.

**Content & Data Updates**
* **Homepage Refinements**: Updated the establishment year to 2015 and corrected the garden's address to "St Peter's Way".
* **Image Replacements**: Swapped placeholder imagery for high-quality production images hosted on the R2 bucket across the homepage and blog articles (`posts.ts`).

**Blog & Media Enhancements**
* **Auto-Link & Markdown**: Integrated `remark-gfm` to properly parse and auto-link standard URLs in blog posts.
* **Video Embedding**: Implemented `react-player` within the markdown renderer. The application now intercepts raw video URLs (such as YouTube links) in the blog text and automatically mounts a fully-styled, responsive video player in its place.
* Fixed a related TypeScript error with `react-player` by using the correct `src` prop attribute.
