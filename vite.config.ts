import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ Vite automatically detects main.tsx, no need to override
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});