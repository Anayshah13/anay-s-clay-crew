import { loadEnv, defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { writeFileSync } from "node:fs";
import { componentTagger } from "lovable-tagger";

/** Write sitemap.xml and robots.txt into the build output using `VITE_SITE_URL` (see `.env.example`). */
function seoBuildFilesPlugin(mode: string) {
  let outDir = "dist";
  return {
    name: "seo-build-files",
    configResolved(c: { build: { outDir: string } }) {
      outDir = c.build.outDir;
    },
    closeBundle() {
      const env = loadEnv(mode, process.cwd(), "");
      const site = (env.VITE_SITE_URL || "https://example.com").replace(/\/+$/, "");
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${site}/projects</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`;
      const robots = `User-agent: *
Allow: /

Sitemap: ${site}/sitemap.xml
`;
      const root = path.resolve(__dirname, outDir);
      writeFileSync(path.join(root, "sitemap.xml"), sitemap, "utf8");
      writeFileSync(path.join(root, "robots.txt"), robots, "utf8");
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    seoBuildFilesPlugin(mode),
  ].filter(Boolean) as import("vite").PluginOption[],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
