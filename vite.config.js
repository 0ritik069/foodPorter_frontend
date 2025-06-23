// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// 👇  backend ka address ek jagah pe store karo
const BACKEND_URL = "http://localhost:5000";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  /* ---------- Dev-server settings ---------- */
  server: {
    host: "0.0.0.0",   // LAN par bhi open ho jaye
    port: 5173,

    /* --- PROXY --- */
    proxy: {
      //  ⚠️  frontend se /api ... wale calls automatically
      //  http://localhost:5000 par forward ho jayenge
      "/api": {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false,       // self-signed https ke liye false
      },
    },
  },

  /* ---------- Build optimise ---------- */
  optimizeDeps: {
    include: ["axios"],   // (optional) ensure axios pre-bundles fine
  },
});
