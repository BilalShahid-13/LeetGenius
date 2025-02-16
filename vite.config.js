import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@google/generative-ai":
        "/node_modules/@google/generative-ai/dist/index.mjs",
    },
  },
  build: {
    rollupOptions: {
      input: {
        popup: "src/main.jsx",
        sidebar: "src/sidebar/index.jsx", // Only build sidebar
        // content: "public/content_script.jsx",
      },
      output: {
        entryFileNames: "[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "assets/style.css"; // Rename the CSS file
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  css: {
    postcss: "./postcss.config.js", // Ensure PostCSS processes Tailwind
  },
});
