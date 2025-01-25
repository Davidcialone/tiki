import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import path from "path";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [],
  },
  resolve: {
    preserveSymlinks: true,
  },
  server: {
    port: 5174,
    proxy: {
      "/api": {
        target: "https://tiki-ew5j.onrender.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
  define: {
    "process.env.VITE_API_BASE_URL": JSON.stringify(
      "https://tiki-ermployee.vercel.app"
    ),
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  build: {
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
});
