import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  let PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Example backend routes for CMS integration
  app.get("/api/posts", (req, res) => {
    res.json({ message: "Posts backend endpoint is ready for integration." });
  });
  
  app.get("/api/home", (req, res) => {
    res.json({ message: "Home content backend endpoint is ready for integration." });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Use * for Express v4
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const listen = (port: number) => {
    const server = app.listen(port, "0.0.0.0", () => {
      console.log(`\n  🚀 Space2Grow app running on http://localhost:${port}\n`);
    });

    server.on("error", (err: any) => {
      if (err.code === "EADDRINUSE") {
        console.warn(`Port ${port} is in use, trying http://localhost:${port + 1}...`);
        listen(port + 1);
      } else {
        console.error("Server error:", err);
      }
    });
  };

  listen(PORT);
}

startServer();
