import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        popup: resolve(__dirname, "src/popup/index.html"),
        background: resolve(__dirname, "src/assets/background.ts"),
        content: resolve(__dirname, "src/assets/content.ts"),
      },
      output: {
        // Share React across builds
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
        entryFileNames: "[name].js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: "[name]-[hash][extname]",
      },
    },
    emptyOutDir: true,
  },
});
