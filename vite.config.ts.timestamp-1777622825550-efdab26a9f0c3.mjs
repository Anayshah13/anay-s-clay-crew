// vite.config.ts
import { loadEnv, defineConfig } from "file:///C:/Users/Anay%20Shah/OneDrive/Desktop/codes/anay-s-clay-crew/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Anay%20Shah/OneDrive/Desktop/codes/anay-s-clay-crew/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { writeFileSync } from "node:fs";
import { componentTagger } from "file:///C:/Users/Anay%20Shah/OneDrive/Desktop/codes/anay-s-clay-crew/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\Anay Shah\\OneDrive\\Desktop\\codes\\anay-s-clay-crew";
function seoBuildFilesPlugin(mode) {
  let outDir = "dist";
  return {
    name: "seo-build-files",
    configResolved(c) {
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
      const root = path.resolve(__vite_injected_original_dirname, outDir);
      writeFileSync(path.join(root, "sitemap.xml"), sitemap, "utf8");
      writeFileSync(path.join(root, "robots.txt"), robots, "utf8");
    }
  };
}
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return void 0;
          if (id.includes("react-dom")) return "vendor-react";
          if (id.includes("node_modules/react/") || id.includes("node_modules\\react\\")) return "vendor-react";
          if (id.includes("/scheduler") || id.includes("\\scheduler")) return "vendor-react";
          if (id.includes("@radix-ui") || id.includes("@floating-ui")) return "vendor-react";
          if (id.includes("react-router") || id.includes("@remix-run/router")) return "vendor-router";
          if (id.includes("/gsap/") || id.includes("\\gsap\\")) return "vendor-gsap";
          if (id.includes("lucide-react")) return "vendor-lucide";
          if (id.includes("/three") || id.includes("\\three\\") || id.includes("@react-three/fiber") || id.includes("@react-three/drei")) return "vendor-three";
          return void 0;
        }
      }
    }
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    seoBuildFilesPlugin(mode)
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    },
    dedupe: ["react", "react-dom"]
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBbmF5IFNoYWhcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxjb2Rlc1xcXFxhbmF5LXMtY2xheS1jcmV3XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBbmF5IFNoYWhcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxjb2Rlc1xcXFxhbmF5LXMtY2xheS1jcmV3XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9BbmF5JTIwU2hhaC9PbmVEcml2ZS9EZXNrdG9wL2NvZGVzL2FuYXktcy1jbGF5LWNyZXcvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBsb2FkRW52LCBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyB3cml0ZUZpbGVTeW5jIH0gZnJvbSBcIm5vZGU6ZnNcIjtcclxuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XHJcblxyXG4vKiogV3JpdGUgc2l0ZW1hcC54bWwgYW5kIHJvYm90cy50eHQgaW50byB0aGUgYnVpbGQgb3V0cHV0IHVzaW5nIGBWSVRFX1NJVEVfVVJMYCAoc2VlIGAuZW52LmV4YW1wbGVgKS4gKi9cclxuZnVuY3Rpb24gc2VvQnVpbGRGaWxlc1BsdWdpbihtb2RlOiBzdHJpbmcpIHtcclxuICBsZXQgb3V0RGlyID0gXCJkaXN0XCI7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6IFwic2VvLWJ1aWxkLWZpbGVzXCIsXHJcbiAgICBjb25maWdSZXNvbHZlZChjOiB7IGJ1aWxkOiB7IG91dERpcjogc3RyaW5nIH0gfSkge1xyXG4gICAgICBvdXREaXIgPSBjLmJ1aWxkLm91dERpcjtcclxuICAgIH0sXHJcbiAgICBjbG9zZUJ1bmRsZSgpIHtcclxuICAgICAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCBcIlwiKTtcclxuICAgICAgY29uc3Qgc2l0ZSA9IChlbnYuVklURV9TSVRFX1VSTCB8fCBcImh0dHBzOi8vZXhhbXBsZS5jb21cIikucmVwbGFjZSgvXFwvKyQvLCBcIlwiKTtcclxuICAgICAgY29uc3Qgc2l0ZW1hcCA9IGA8P3htbCB2ZXJzaW9uPVwiMS4wXCIgZW5jb2Rpbmc9XCJVVEYtOFwiPz5cclxuPHVybHNldCB4bWxucz1cImh0dHA6Ly93d3cuc2l0ZW1hcHMub3JnL3NjaGVtYXMvc2l0ZW1hcC8wLjlcIj5cclxuICA8dXJsPlxyXG4gICAgPGxvYz4ke3NpdGV9LzwvbG9jPlxyXG4gICAgPGNoYW5nZWZyZXE+d2Vla2x5PC9jaGFuZ2VmcmVxPlxyXG4gICAgPHByaW9yaXR5PjEuMDwvcHJpb3JpdHk+XHJcbiAgPC91cmw+XHJcbiAgPHVybD5cclxuICAgIDxsb2M+JHtzaXRlfS9wcm9qZWN0czwvbG9jPlxyXG4gICAgPGNoYW5nZWZyZXE+bW9udGhseTwvY2hhbmdlZnJlcT5cclxuICAgIDxwcmlvcml0eT4wLjg8L3ByaW9yaXR5PlxyXG4gIDwvdXJsPlxyXG48L3VybHNldD5cclxuYDtcclxuICAgICAgY29uc3Qgcm9ib3RzID0gYFVzZXItYWdlbnQ6ICpcclxuQWxsb3c6IC9cclxuXHJcblNpdGVtYXA6ICR7c2l0ZX0vc2l0ZW1hcC54bWxcclxuYDtcclxuICAgICAgY29uc3Qgcm9vdCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIG91dERpcik7XHJcbiAgICAgIHdyaXRlRmlsZVN5bmMocGF0aC5qb2luKHJvb3QsIFwic2l0ZW1hcC54bWxcIiksIHNpdGVtYXAsIFwidXRmOFwiKTtcclxuICAgICAgd3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ocm9vdCwgXCJyb2JvdHMudHh0XCIpLCByb2JvdHMsIFwidXRmOFwiKTtcclxuICAgIH0sXHJcbiAgfTtcclxufVxyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcclxuICBzZXJ2ZXI6IHtcclxuICAgIGhvc3Q6IFwiOjpcIixcclxuICAgIHBvcnQ6IDgwODAsXHJcbiAgICBobXI6IHtcclxuICAgICAgb3ZlcmxheTogZmFsc2UsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XHJcbiAgICAgICAgICBpZiAoIWlkLmluY2x1ZGVzKFwibm9kZV9tb2R1bGVzXCIpKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwicmVhY3QtZG9tXCIpKSByZXR1cm4gXCJ2ZW5kb3ItcmVhY3RcIjtcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIm5vZGVfbW9kdWxlcy9yZWFjdC9cIikgfHwgaWQuaW5jbHVkZXMoXCJub2RlX21vZHVsZXNcXFxccmVhY3RcXFxcXCIpKSByZXR1cm4gXCJ2ZW5kb3ItcmVhY3RcIjtcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIi9zY2hlZHVsZXJcIikgfHwgaWQuaW5jbHVkZXMoXCJcXFxcc2NoZWR1bGVyXCIpKSByZXR1cm4gXCJ2ZW5kb3ItcmVhY3RcIjtcclxuICAgICAgICAgIC8qKiBSYWRpeCAvIEZsb2F0aW5nIFVJIG11c3Qgc2hhcmUgUmVhY3QncyBjaHVuayBvciBydW50aW1lIGhpdHMgdW5kZWZpbmVkIGZvcndhcmRSZWYgKi9cclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIkByYWRpeC11aVwiKSB8fCBpZC5pbmNsdWRlcyhcIkBmbG9hdGluZy11aVwiKSkgcmV0dXJuIFwidmVuZG9yLXJlYWN0XCI7XHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJyZWFjdC1yb3V0ZXJcIikgfHwgaWQuaW5jbHVkZXMoXCJAcmVtaXgtcnVuL3JvdXRlclwiKSkgcmV0dXJuIFwidmVuZG9yLXJvdXRlclwiO1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiL2dzYXAvXCIpIHx8IGlkLmluY2x1ZGVzKFwiXFxcXGdzYXBcXFxcXCIpKSByZXR1cm4gXCJ2ZW5kb3ItZ3NhcFwiO1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwibHVjaWRlLXJlYWN0XCIpKSByZXR1cm4gXCJ2ZW5kb3ItbHVjaWRlXCI7XHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCIvdGhyZWVcIikgfHwgaWQuaW5jbHVkZXMoXCJcXFxcdGhyZWVcXFxcXCIpIHx8XHJcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoXCJAcmVhY3QtdGhyZWUvZmliZXJcIikgfHwgaWQuaW5jbHVkZXMoXCJAcmVhY3QtdGhyZWUvZHJlaVwiKSkgcmV0dXJuIFwidmVuZG9yLXRocmVlXCI7XHJcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIiAmJiBjb21wb25lbnRUYWdnZXIoKSxcclxuICAgIHNlb0J1aWxkRmlsZXNQbHVnaW4obW9kZSksXHJcbiAgXS5maWx0ZXIoQm9vbGVhbikgYXMgaW1wb3J0KFwidml0ZVwiKS5QbHVnaW5PcHRpb25bXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcclxuICAgIH0sXHJcbiAgICBkZWR1cGU6IFtcInJlYWN0XCIsIFwicmVhY3QtZG9tXCJdLFxyXG4gIH0sXHJcbn0pKTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnWCxTQUFTLFNBQVMsb0JBQW9CO0FBQ3RaLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyx1QkFBdUI7QUFKaEMsSUFBTSxtQ0FBbUM7QUFPekMsU0FBUyxvQkFBb0IsTUFBYztBQUN6QyxNQUFJLFNBQVM7QUFDYixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixlQUFlLEdBQWtDO0FBQy9DLGVBQVMsRUFBRSxNQUFNO0FBQUEsSUFDbkI7QUFBQSxJQUNBLGNBQWM7QUFDWixZQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFDM0MsWUFBTSxRQUFRLElBQUksaUJBQWlCLHVCQUF1QixRQUFRLFFBQVEsRUFBRTtBQUM1RSxZQUFNLFVBQVU7QUFBQTtBQUFBO0FBQUEsV0FHWCxJQUFJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUtKLElBQUk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTVQsWUFBTSxTQUFTO0FBQUE7QUFBQTtBQUFBLFdBR1YsSUFBSTtBQUFBO0FBRVQsWUFBTSxPQUFPLEtBQUssUUFBUSxrQ0FBVyxNQUFNO0FBQzNDLG9CQUFjLEtBQUssS0FBSyxNQUFNLGFBQWEsR0FBRyxTQUFTLE1BQU07QUFDN0Qsb0JBQWMsS0FBSyxLQUFLLE1BQU0sWUFBWSxHQUFHLFFBQVEsTUFBTTtBQUFBLElBQzdEO0FBQUEsRUFDRjtBQUNGO0FBR0EsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsTUFDSCxTQUFTO0FBQUEsSUFDWDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGFBQWEsSUFBSTtBQUNmLGNBQUksQ0FBQyxHQUFHLFNBQVMsY0FBYyxFQUFHLFFBQU87QUFDekMsY0FBSSxHQUFHLFNBQVMsV0FBVyxFQUFHLFFBQU87QUFDckMsY0FBSSxHQUFHLFNBQVMscUJBQXFCLEtBQUssR0FBRyxTQUFTLHVCQUF1QixFQUFHLFFBQU87QUFDdkYsY0FBSSxHQUFHLFNBQVMsWUFBWSxLQUFLLEdBQUcsU0FBUyxhQUFhLEVBQUcsUUFBTztBQUVwRSxjQUFJLEdBQUcsU0FBUyxXQUFXLEtBQUssR0FBRyxTQUFTLGNBQWMsRUFBRyxRQUFPO0FBQ3BFLGNBQUksR0FBRyxTQUFTLGNBQWMsS0FBSyxHQUFHLFNBQVMsbUJBQW1CLEVBQUcsUUFBTztBQUM1RSxjQUFJLEdBQUcsU0FBUyxRQUFRLEtBQUssR0FBRyxTQUFTLFVBQVUsRUFBRyxRQUFPO0FBQzdELGNBQUksR0FBRyxTQUFTLGNBQWMsRUFBRyxRQUFPO0FBQ3hDLGNBQUksR0FBRyxTQUFTLFFBQVEsS0FBSyxHQUFHLFNBQVMsV0FBVyxLQUNoRCxHQUFHLFNBQVMsb0JBQW9CLEtBQUssR0FBRyxTQUFTLG1CQUFtQixFQUFHLFFBQU87QUFDbEYsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixTQUFTLGlCQUFpQixnQkFBZ0I7QUFBQSxJQUMxQyxvQkFBb0IsSUFBSTtBQUFBLEVBQzFCLEVBQUUsT0FBTyxPQUFPO0FBQUEsRUFDaEIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsSUFDQSxRQUFRLENBQUMsU0FBUyxXQUFXO0FBQUEsRUFDL0I7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
