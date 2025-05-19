import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
 
  optimizeDeps: {
    exclude: ["lucide-react"],

  },
  server: {
    proxy: {
      "/api": {
        target: "https://www.batbooks.ir/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
