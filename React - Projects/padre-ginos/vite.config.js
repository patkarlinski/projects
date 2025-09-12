import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/public": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  // we say it is reac poject, use react type things
  plugins: [TanStackRouterVite(), react()],
  test: {
    environment: "happy-dom",
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
