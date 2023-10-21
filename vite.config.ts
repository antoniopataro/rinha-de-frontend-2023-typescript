import { defineConfig } from "vite";

import path from "path";

export default defineConfig({
  preview: {
    port: 3000,
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  server: {
    port: 3000,
  },
});
