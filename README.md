# A Space to Grow - Community Garden Web App

A beautiful, responsive web application built for the "A Space to Grow" community garden. This project uses modern web technologies to present a polished user interface, complete with smooth animations, responsive design, dynamic media rendering, and a custom Express backend.

## Tech Stack

- **React 19**: Modern UI library using component-based architecture.
- **Vite 6**: Next-generation frontend tooling for incredibly fast build times and development server.
- **Tailwind CSS 4**: Utility-first CSS framework for rapid and responsive styling.
- **Express**: Custom Node.js backend server handling API requests and serving the production frontend.
- **Motion (framer-motion)**: Animation library for React to create smooth interactions.
- **React Markdown & Remark GFM**: Parses and renders rich markdown content and auto-links for the blog.
- **React Player**: Responsive embedded video player for blog posts.
- **Lucide React**: Beautiful and consistent icon set.

## Environment Variables

For integration with future databases or Content Management Systems (CMS), the backend expects certain environment variables. Create a `.env` file in the root directory (based on `.env.example`):

```bash
DATABASE_URL="your-database-url"
CMS_API_KEY="your-cms-api-key"
```

## Getting Started

Follow these steps to run the application on your local machine:

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher is recommended) along with npm (which comes bundled with Node.js).

### Installation

1. Clone this repository to your local machine (if you haven't already).
2. Open your terminal and navigate to the project directory:

   ```bash
   cd your-project-folder
   ```

3. Install the required dependencies using npm:

   ```bash
   npm install
   ```

### Running the Development Server

The development environment runs both the Express backend and the Vite frontend middleware concurrently:

```bash
npm run dev
```

This will start the server using `tsx`. Open your web browser and navigate to `http://localhost:3000`. 
The frontend is available at the root (`/`) and backend API endpoints are available under `/api/`.

### Building for Production

To create an optimized, production-ready full-stack build of the application:

```bash
npm run build
```

This command will compile the frontend assets and bundle the Express server into the `dist` directory. 

To start the production server locally:

```bash
npm run start
```

### Vercel Deployment

This application is configured for deployment on Vercel. A `vercel.json` file is included in the project root to ensure proper Single Page Application (SPA) routing, effectively rewriting all unknown routes back to `/index.html`. This prevents 404 errors when reloading pages like `/blog` or `/about` directly in the browser on Vercel.

### Linting / Type Checking

To verify the TypeScript code without going through a full build:

```bash
npm run lint
```
