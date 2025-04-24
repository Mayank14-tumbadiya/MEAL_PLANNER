import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), 
  ],
  server: {
    proxy: {
      "/api/spoonacular": {  // Proxy for Spoonacular API
        target: "https://api.spoonacular.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/spoonacular/, ""), 
      },
      "/api/local": {  // Proxy for Local API (Backend)
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/local/, ""), 
      }
    }
  }
});
