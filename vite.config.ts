import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Defaults to "/" for local dev and any custom-domain/user-site deploy.
  // The GitHub Pages workflow (.github/workflows/deploy.yml) sets
  // VITE_BASE_PATH to "/<repo-name>/" automatically at build time when
  // deploying a project site (https://<user>.github.io/<repo-name>/).
  base: process.env.VITE_BASE_PATH ?? "/",
  server: {
    port: 5173,
  },
});
