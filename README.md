# Community Garden Web App

A beautiful, responsive single-page web application built for a community garden. This project uses modern web technologies to present a polished user interface, complete with smooth animations and responsive design.

## Tech Stack

- **React 19**: Modern UI library using component-based architecture.
- **Vite 6**: Next-generation frontend tooling for incredibly fast build times and development server.
- **Tailwind CSS 4**: Utility-first CSS framework for rapid and responsive styling.
- **Motion (framer-motion)**: Animation library for React to create smooth interactions (like the image gallery).
- **Lucide React**: Beautiful and consistent icon set.

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

Start the local development server to see the app in your browser:

```bash
npm run dev
```

This will run the Vite development server. Open your web browser and navigate to the URL provided in the terminal (usually `http://localhost:3000`).

### Building for Production

To create an optimized, production-ready build of the application:

```bash
npm run build
```

This command will output the compiled assets into the `dist` directory, ready to be deployed to any static hosting service.

### Linting / Type Checking

To verify the TypeScript code without going through a full build:

```bash
npm run lint
```
